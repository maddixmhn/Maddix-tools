import 'dart:async';

import 'package:flutter/foundation.dart';

import '../../core/services/akamai_ip_scanner.dart';

class AkamaiScanController extends ChangeNotifier {
  // Scan configuration
  AkamaiScanConfig _config = const AkamaiScanConfig();
  AkamaiScanConfig get config => _config;

  // Input text for IPs/subnets
  String _inputText = '';
  String get inputText => _inputText;

  // Parsed IPs
  List<String> _parsedIps = [];
  List<String> get parsedIps => _parsedIps;
  int get parsedIpCount => _parsedIps.length;

  // Scan state
  bool _isScanning = false;
  bool get isScanning => _isScanning;

  bool _isPreparingScan = false;
  bool get isPreparingScan => _isPreparingScan;

  int _scannedCount = 0;
  int get scannedCount => _scannedCount;

  int _openCount = 0;
  int get openCount => _openCount;

  int get closedCount => _scannedCount - _openCount;

  double get progress =>
      _parsedIps.isNotEmpty ? _scannedCount / _parsedIps.length : 0;

  // Open IPs (sorted by latency)
  List<AkamaiScanResult> _openIps = [];
  List<AkamaiScanResult> get openIps => _openIps;

  // Stream subscription for cancellation
  StreamSubscription? _scanSubscription;
  AkamaiIpScanner? _scanner;

  /// Update the IP input text and parse IPs
  void updateInput(String text) {
    _inputText = text;
    _parsedIps = AkamaiIpScanner.parseIpInput(text);
    notifyListeners();
  }


  /// Update scan configuration
  void updateConfig({
    int? port,
    Duration? timeout,
    int? maxWorkers,
  }) {
    _config = _config.copyWith(
      port: port,
      timeout: timeout,
      maxWorkers: maxWorkers,
    );
    notifyListeners();
  }

  /// Start scanning all parsed IPs
  Future<void> startScan() async {
    if (_isScanning || _isPreparingScan || _parsedIps.isEmpty) return;

    _isPreparingScan = true;
    _isScanning = true;
    _scannedCount = 0;
    _openCount = 0;
    _openIps = [];
    notifyListeners();

    _scanner = AkamaiIpScanner(config: _config);

    _scanSubscription = _scanner!.scanIps(_parsedIps).listen(
      (progress) {
        _isPreparingScan = false;
        _scannedCount = progress.completed;
        _openCount = progress.openCount;
        _openIps = progress.openIps.toList()
          ..sort((a, b) => (a.latencyMs ?? double.infinity)
              .compareTo(b.latencyMs ?? double.infinity));

        notifyListeners();
      },
      onDone: () {
        _isScanning = false;
        _scanSubscription = null;
        _scanner = null;
        notifyListeners();
      },
      onError: (error) {
        debugPrint('Akamai scan error: $error');
        _isScanning = false;
        _isPreparingScan = false;
        _scanSubscription = null;
        _scanner = null;
        notifyListeners();
      },
    );
  }

  /// Stop the current scan
  void stopScan() {
    _scanner?.cancel();
    _scanSubscription?.cancel();
    _scanSubscription = null;
    _scanner = null;
    _isScanning = false;
    _isPreparingScan = false;
    notifyListeners();
  }

  /// Reset all results
  void resetResults() {
    _scannedCount = 0;
    _openCount = 0;
    _openIps = [];
    notifyListeners();
  }

  /// Clear input and results
  void clearAll() {
    _inputText = '';
    _parsedIps = [];
    _scannedCount = 0;
    _openCount = 0;
    _openIps = [];
    notifyListeners();
  }

  /// Copy open IPs to clipboard format
  String getOpenIpsText() {
    return _openIps.map((r) => r.ip).join('\n');
  }

  /// Copy open IPs with details
  String getOpenIpsDetailedText() {
    final buffer = StringBuffer();
    buffer.writeln('# Akamai Port Scan Results');
    buffer.writeln('# Port: ${_config.port}');
    buffer.writeln('# Total scanned: $_scannedCount');
    buffer.writeln('# Open ports: ${_openIps.length}');
    buffer.writeln('# Timestamp: ${DateTime.now().toIso8601String()}');
    buffer.writeln('');

    for (final result in _openIps) {
      final latency = result.latencyMs?.toStringAsFixed(2) ?? 'N/A';
      buffer.writeln('${result.ip} | Latency: ${latency}ms');
    }

    return buffer.toString();
  }

  @override
  void dispose() {
    _scanner?.cancel();
    _scanSubscription?.cancel();
    super.dispose();
  }
}
