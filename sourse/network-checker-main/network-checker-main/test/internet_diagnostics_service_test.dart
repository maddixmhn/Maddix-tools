import 'package:flutter_test/flutter_test.dart';
import 'package:rdnbenet/core/services/internet_diagnostics_service.dart';

void main() {
  group('InternetDiagnosticsService - Chabokan IP Parsing', () {
    test('fetchPublicIp with domestic: true queries chabokan and successfully parses the IP from JSON', () async {
      final result = await InternetDiagnosticsService.fetchPublicIp(domestic: true);
      
      expect(result.success, isTrue, reason: 'Failed to fetch public IP: ${result.details}');
      expect(result.message, startsWith('IP retrieved: '));
      
      final ip = result.message.replaceFirst('IP retrieved: ', '').trim();
      
      // Verify it's a valid IP address (not a JSON string!)
      final ipRegex = RegExp(
        r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$',
      );
      expect(ipRegex.hasMatch(ip), isTrue, reason: 'Extracted IP is not a valid IP: $ip');
      
      print('Successfully fetched and parsed domestic IP from Chabokan: $ip');
    });

    test('fetchPublicIp with domestic: false queries international endpoints in parallel and succeeds', () async {
      final result = await InternetDiagnosticsService.fetchPublicIp(domestic: false);
      
      expect(result.success, isTrue, reason: 'Failed to fetch public IP: ${result.details}');
      expect(result.message, startsWith('IP retrieved: '));
      
      final ip = result.message.replaceFirst('IP retrieved: ', '').trim();
      final ipRegex = RegExp(
        r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$',
      );
      expect(ipRegex.hasMatch(ip), isTrue, reason: 'Extracted IP is not a valid IP: $ip');
      
      print('Successfully fetched and parsed international IP in parallel: $ip');
    });
  });

  group('InternetDiagnosticsService - Connectivity Checks', () {
    test('checkDnsResolution completes and verifies multiple hostnames', () async {
      final result = await InternetDiagnosticsService.checkDnsResolution();
      print('DNS Resolution Details:\n${result.details}');
      expect(result.name, equals('DNS Resolution'));
      expect(result.details, contains('Tested Endpoints:'));
      expect(result.details, contains('one.one.one.one'));
      expect(result.details, contains('dns.google'));
    });

    test('checkIpv4Connectivity completes and verifies multiple resolvers', () async {
      final result = await InternetDiagnosticsService.checkIpv4Connectivity();
      print('IPv4 Connection Details:\n${result.details}');
      expect(result.name, equals('IPv4 Connectivity'));
      expect(result.details, contains('Tested Endpoints:'));
      expect(result.details, contains('Cloudflare DNS'));
      expect(result.details, contains('Google DNS'));
      expect(result.details, contains('Quad9 DNS'));
    });

    test('checkIpv6Connectivity completes and verifies multiple resolvers', () async {
      final result = await InternetDiagnosticsService.checkIpv6Connectivity();
      print('IPv6 Connection Details:\n${result.details}');
      expect(result.name, equals('IPv6 Connectivity'));
      expect(result.details, contains('Tested Endpoints:'));
      expect(result.details, contains('Cloudflare IPv6 DNS'));
      expect(result.details, contains('Google IPv6 DNS'));
      expect(result.details, contains('Quad9 IPv6 DNS'));
    });

    test('checkHttpsTraffic completes and verifies multiple HTTP endpoints', () async {
      final result = await InternetDiagnosticsService.checkHttpsTraffic();
      print('HTTPS Connection Details:\n${result.details}');
      expect(result.name, equals('HTTPS Traffic'));
      expect(result.details, contains('Tested Endpoints:'));
      expect(result.details, contains('https://www.cloudflare.com'));
      expect(result.details, contains('https://www.google.com'));
    });
  });

  group('InternetDiagnosticsService - CDN Parallel IP Scanner', () {
    test('scanCdnIps parses and returns scan result structure', () async {
      final result = await InternetDiagnosticsService.scanCdnIps(
        ['8.8.8.8', '1.1.1.1'],
        timeout: const Duration(milliseconds: 100),
      );
      
      expect(result.totalTested, equals(2));
      expect(result.reachable, isNotNull);
      expect(result.averageLatencyMs, isNotNull);
      expect(result.accessibilityRate, isNotNull);
    });
  });
}
