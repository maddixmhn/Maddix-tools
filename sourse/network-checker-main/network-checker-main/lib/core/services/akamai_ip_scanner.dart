import 'dart:async';
import 'dart:io';

/// Result of an Akamai IP port scan
class AkamaiScanResult {
  final String ip;
  final int port;
  final bool isOpen;
  final double? latencyMs;
  final String? errorMessage;
  final DateTime timestamp;

  AkamaiScanResult({
    required this.ip,
    required this.port,
    required this.isOpen,
    this.latencyMs,
    this.errorMessage,
    DateTime? timestamp,
  }) : timestamp = timestamp ?? DateTime.now();

  Map<String, dynamic> toMap() => {
        'ip': ip,
        'port': port,
        'isOpen': isOpen,
        'latencyMs': latencyMs,
        'errorMessage': errorMessage,
        'timestamp': timestamp.toIso8601String(),
      };
}

/// Configuration for the Akamai port scanner
class AkamaiScanConfig {
  final int port;
  final Duration timeout;
  final int maxWorkers;

  const AkamaiScanConfig({
    this.port = 443,
    this.timeout = const Duration(seconds: 2),
    this.maxWorkers = 100,
  });

  AkamaiScanConfig copyWith({
    int? port,
    Duration? timeout,
    int? maxWorkers,
  }) {
    return AkamaiScanConfig(
      port: port ?? this.port,
      timeout: timeout ?? this.timeout,
      maxWorkers: maxWorkers ?? this.maxWorkers,
    );
  }
}

/// Fast TCP port scanner for Akamai IPs (masscan-like behavior)
class AkamaiIpScanner {
  final AkamaiScanConfig config;
  bool _cancelled = false;

  AkamaiIpScanner({AkamaiScanConfig? config})
      : config = config ?? const AkamaiScanConfig();

  /// Cancel the current scan
  void cancel() {
    _cancelled = true;
  }

  /// Fast TCP connect test — connect and immediately destroy
  Future<AkamaiScanResult> testPort(String ip) async {
    final stopwatch = Stopwatch()..start();

    try {
      final socket = await Socket.connect(
        ip,
        config.port,
        timeout: config.timeout,
      );

      stopwatch.stop();
      final latency = stopwatch.elapsedMilliseconds.toDouble();

      // Immediately destroy — no TLS, no HTTP, pure port check
      socket.destroy();

      return AkamaiScanResult(
        ip: ip,
        port: config.port,
        isOpen: true,
        latencyMs: latency,
      );
    } on SocketException catch (e) {
      return AkamaiScanResult(
        ip: ip,
        port: config.port,
        isOpen: false,
        errorMessage: e.message,
      );
    } on TimeoutException {
      return AkamaiScanResult(
        ip: ip,
        port: config.port,
        isOpen: false,
        errorMessage: 'Connection timed out',
      );
    } catch (e) {
      return AkamaiScanResult(
        ip: ip,
        port: config.port,
        isOpen: false,
        errorMessage: e.toString(),
      );
    }
  }

  /// Parse IP ranges and individual IPs from input text
  /// Supports: CIDR notation (e.g., 2.16.0.0/13) and individual IPs
  static List<String> parseIpInput(String input) {
    final ips = <String>[];
    final lines = input.split('\n');

    for (var line in lines) {
      line = line.trim();
      if (line.isEmpty || line.startsWith('#')) continue;

      if (line.contains('/')) {
        // CIDR notation - parse subnet
        try {
          ips.addAll(_generateIpsFromSubnet(line));
        } catch (_) {
          // Skip invalid subnet
        }
      } else {
        // Single IP
        if (_isValidIp(line)) {
          ips.add(line);
        }
      }
    }

    return ips;
  }

  /// Generate list of IPs from a subnet in CIDR notation
  static List<String> _generateIpsFromSubnet(String subnet) {
    final parts = subnet.split('/');
    if (parts.length != 2) return [];

    final ipStr = parts[0];
    final prefixLength = int.tryParse(parts[1]);
    if (prefixLength == null || prefixLength < 0 || prefixLength > 32) {
      return [];
    }

    final ipParts = ipStr.split('.');
    if (ipParts.length != 4) return [];

    final octets = ipParts.map((p) => int.tryParse(p)).toList();
    if (octets.any((o) => o == null || o < 0 || o > 255)) return [];

    // Calculate network address
    int ipInt = 0;
    for (var i = 0; i < 4; i++) {
      ipInt = (ipInt << 8) | octets[i]!;
    }

    // Calculate number of hosts
    final hostBits = 32 - prefixLength;
    final numHosts = 1 << hostBits;

    // Network mask
    final netmask = ~((1 << hostBits) - 1) & 0xFFFFFFFF;
    final networkAddr = ipInt & netmask;

    // Generate IPs (excluding network and broadcast addresses for /31 and larger)
    final ips = <String>[];
    final start = prefixLength >= 31 ? 0 : 1;
    final end = prefixLength >= 31 ? numHosts : numHosts - 1;

    for (var i = start; i < end; i++) {
      final addr = networkAddr + i;
      final ip =
          '${(addr >> 24) & 0xFF}.${(addr >> 16) & 0xFF}.${(addr >> 8) & 0xFF}.${addr & 0xFF}';
      ips.add(ip);
    }

    return ips;
  }

  /// Validate an IP address
  static bool _isValidIp(String ip) {
    final parts = ip.split('.');
    if (parts.length != 4) return false;

    for (final part in parts) {
      final num = int.tryParse(part);
      if (num == null || num < 0 || num > 255) return false;
    }

    return true;
  }

  /// Scan multiple IPs concurrently with high-rate batching
  /// Returns a stream of progress updates as results complete
  Stream<AkamaiScanProgress> scanIps(List<String> ips) {
    final controller = StreamController<AkamaiScanProgress>();
    _cancelled = false;
    _runScan(ips, controller);
    return controller.stream;
  }

  Future<void> _runScan(
    List<String> ips,
    StreamController<AkamaiScanProgress> controller,
  ) async {
    if (ips.isEmpty) {
      await controller.close();
      return;
    }

    int completed = 0;
    int openCount = 0;
    final total = ips.length;
    final results = <AkamaiScanResult>[];

    // Create batches for controlled concurrency
    final batches = <List<String>>[];
    for (var i = 0; i < ips.length; i += config.maxWorkers) {
      batches.add(
        ips.sublist(
          i,
          i + config.maxWorkers > ips.length
              ? ips.length
              : i + config.maxWorkers,
        ),
      );
    }

    try {
      for (final batch in batches) {
        if (controller.isClosed || _cancelled) break;

        // Run batch in parallel
        final futures = batch.map((ip) => testPort(ip));
        final batchResults = await Future.wait(futures);

        for (final result in batchResults) {
          if (controller.isClosed || _cancelled) break;

          completed++;
          if (result.isOpen) {
            openCount++;
            results.add(result);
          }

          controller.add(AkamaiScanProgress(
            result: result,
            completed: completed,
            total: total,
            openCount: openCount,
            openIps: List.unmodifiable(results),
          ));
        }
      }
    } catch (e) {
      if (!controller.isClosed) {
        controller.addError(e);
      }
    } finally {
      if (!controller.isClosed) {
        await controller.close();
      }
    }
  }
}

/// Progress information for Akamai IP scans
class AkamaiScanProgress {
  final AkamaiScanResult? result;
  final int completed;
  final int total;
  final int openCount;
  final List<AkamaiScanResult> openIps;

  AkamaiScanProgress({
    this.result,
    required this.completed,
    required this.total,
    required this.openCount,
    required this.openIps,
  });

  double get progress => total > 0 ? completed / total : 0;
  int get remaining => total - completed;
  bool get isComplete => completed >= total;
  int get closedCount => completed - openCount;
}
