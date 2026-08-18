(function() {
'use strict';

const LS_KEY = 'maddixPrefs';

// ── State ──────────────────────────────────────────────
const state = {
  lang: 'en',
  theme: 'auto',
  isDark: false,
  isMobile: window.innerWidth < 768,
  activeTool: null,
  activeCategory: null,
  searchQuery: '',
  drawerOpen: false,
};

// ── i18n ────────────────────────────────────────────────
const i18n = {
  en: {
    brand: 'Maddix Tools',
    tagline: 'Browser-based security workstation',
    navHome: 'Home',
    navTools: 'Tools',
    navRouter: 'AI Router',
    navAbout: 'About',
    search: 'Search tools...',
    navGroupMain: 'Overview',
    navGroupCats: 'Categories',
    navAllTools: 'All tools',
    footer: 'Built by Nima Ha',
    categories: {
      'red-team': 'Red Team',
      'blue-team': 'Blue Team',
      recon: 'Network & Reconnaissance',
      payload: 'Payload Generation',
      system: 'System & Shell',
      crypto: 'Crypto & Encoding',
      config: 'Config & Manipulation',
      'nova-proxy': 'Nova Proxy',
      utility: 'Utilities',
    },
    tools: {
      'terminal-ngrok': 'Terminal + Ngrok',
      'terminal-ngrok-desc': 'Real browser terminal with WebSocket, multi-shell, and ngrok tunnel',
      'google-dorks': 'Google Dorks',
      'google-dorks-desc': '500+ Google dork queries across 31 categories for penetration testing',
      'osint-arsenal': 'OSINT Arsenal',
      'osint-arsenal-desc': '753+ OSINT tools in 50 categories with one-command installers',
      'fsociety-tools': 'Fsociety Toolkit',
      'fsociety-tools-desc': 'Complete fsociety command reference with 44 tools',
      'msf-commands': 'MSF & Kali Commands',
      'msf-commands-desc': 'Metasploit and Kali Linux command reference with payload generator',
      'tunnel-tools': 'Tunnel Tools',
      'tunnel-tools-desc': '15 tunnel/proxy tools: ngrok, Cloudflare Tunnel, bore, frp, chisel, and more',
      'ngrok-tunnel': 'Ngrok Tunnel',
      'ngrok-tunnel-desc': 'Termux bash script to expose local servers via ngrok public URLs',
      'scenario-builder': 'Scenario Builder',
      'scenario-builder-desc': 'Pick a project type & objective — get a phase-by-phase pentest scenario with tools',
      'env-wizard': 'Env Wizard',
      'env-wizard-desc': 'Build custom terminal environments with shell, tools, ngrok, and auth',
      'whois-lookup': 'WHOIS Lookup',
      'whois-lookup-desc': 'Domain WHOIS information lookup via public API',
      'subdomain-finder': 'Subdomain Finder',
      'subdomain-finder-desc': 'Discover subdomains using DNS brute force with 100 common names',
      'password-tools': 'Password Tools',
      'password-tools-desc': 'Password generator, strength analyzer, and HIBP breach checker',
      'qr-generator': 'QR Generator',
      'qr-generator-desc': 'Generate QR codes for text, URLs, WiFi, vCards, SMS, email, and phone',
      'text-tools': 'Text Tools',
      'text-tools-desc': 'Case conversion, sorting, dedup, stats, and text manipulation',
      'ip-scanner': 'IP Scanner',
      'ip-scanner-desc': 'Scan IP ranges, CIDR blocks, and ports with real-time progress',
      'ip-info': 'IP Info',
      'ip-info-desc': 'Lookup IP geolocation, ISP, ASN, and coordinates',
      'dns-lookup': 'DNS Lookup',
      'dns-lookup-desc': 'Query A, AAAA, MX, CNAME, TXT, NS, SOA records',
      'network-checker': 'Network Checker',
      'network-checker-desc': 'Check connectivity and latency to multiple services',
      'port-scanner': 'Port Scanner',
      'port-scanner-desc': 'Scan common TCP ports on any host',
      'cdn-scanner': 'CDN Scanner',
      'cdn-scanner-desc': 'Scan CDN ranges from 5 major providers',
      'reverse-shell': 'Reverse Shell',
      'reverse-shell-desc': 'One-liner reverse shell payloads for multiple languages',
      'xss-payloads': 'XSS Payloads',
      'xss-payloads-desc': 'Cross-site scripting payloads by category',
      'sqli-payloads': 'SQLi Payloads',
      'sqli-payloads-desc': 'SQL injection payloads for different databases',
      'lfi-payloads': 'LFI Payloads',
      'lfi-payloads-desc': 'Local file inclusion paths and wrappers',
      'msf-venom': 'MSF Venom',
      'msf-venom-desc': 'Generate msfvenom and Metasploit handler commands',
      'linux-cmds': 'Linux Commands',
      'linux-cmds-desc': 'Privilege escalation and enumeration commands',
      'powershell-cmds': 'PowerShell Commands',
      'powershell-cmds-desc': 'Active Directory enumeration and exploitation cmdlets',
      'tty-shell': 'TTY Shell',
      'tty-shell-desc': 'Spawn interactive TTY shells from limited environments',
      'file-transfer': 'File Transfer',
      'file-transfer-desc': 'PowerShell one-liner file transfer methods',
      'encoder': 'Encoder',
      'encoder-desc': 'Base64, Hex, and URL encode/decode',
      'hash-generator': 'Hash Generator',
      'hash-generator-desc': 'MD5, SHA1, SHA256, SHA512 hash generation',
      'aes-crypto': 'AES Crypto',
      'aes-crypto-desc': 'AES-256-GCM encryption/decryption with PBKDF2',
      'uuid-gen': 'UUID Generator',
      'uuid-gen-desc': 'Generate UUIDs with customizable options',
      'v2ray-config': 'V2Ray Config',
      'v2ray-config-desc': 'Generate V2Ray routing configurations',
      'sni-spoof': 'SNI Spoof',
      'sni-spoof-desc': 'Modify SNI in VMESS, VLESS, and Trojan links',
      'http-repeater': 'HTTP Repeater',
      'http-repeater-desc': 'Send custom HTTP requests and view responses',
      'obfuscated-files': 'Obfuscated Files',
      'obfuscated-files-desc': 'Encode files as Base64 for Bash, CMD, or PowerShell',
      'rss-feeds': 'RSS Feeds',
      'rss-feeds-desc': 'Security news feeds from ExploitDB, Cisco, CVE, and CXSecurity',
      'notepad': 'Notepad',
      'notepad-desc': 'Markdown notepad with localStorage persistence',
      'mega-scanner': 'Mega Scanner',
      'mega-scanner-desc': '7-in-1 unified scanner: IP, Port, CDN, DNS, Network, Speed, Geo',
      'v2ray-modifier': 'V2Ray Modifier',
      'v2ray-modifier-desc': 'Modify IPs and ports in VMESS, VLESS, WireGuard, Trojan configs',
      'network-diag': 'Network Diag',
      'network-diag-desc': 'Ping, traceroute, MTR, HTTP headers, speed test, packet loss',
      'dns-hunter': 'DNS Hunter',
      'dns-hunter-desc': 'DNS records, latency check, leak test, reverse DNS, CIDR scan',
      'cdn-finder': 'CDN Finder',
      'cdn-finder-desc': 'Find fast CDN edge IPs from Cloudflare, Gcore, Akamai, Google, Azure',
      'nova-install': 'NovaProxy Wizard',
      'nova-install-desc': 'Step-by-step NovaProxy deploy wizard for Cloudflare Workers',
      'nova-proxy-worker': 'Nova-Proxy Worker',
      'nova-proxy-worker-desc': 'Nova-Proxy: personal censorship-resistant proxy on Cloudflare Workers (2.2k★)',
      'nova-wizard': 'Nova Wizard',
      'nova-wizard-desc': 'Nova Wizard: local OAuth deployer for Nova Proxy on Cloudflare Workers',
      'nova-proxy-app': 'Nova-Proxy App',
      'nova-proxy-app-desc': 'Nova-Proxy local app: GSA, Domain Fronting, TLS fragment, MITM, smart routing',
      'nova-radar': 'NovaRadar',
      'nova-radar-desc': 'NovaRadar: Cloudflare IP scanner with TCP+TLS verification (Go+React)',
      'regex-tester': 'Regex Tester',
      'regex-tester-desc': 'Test and debug regular expressions in real-time',
      'cipher-tools': 'Cipher Tools',
      'cipher-tools-desc': 'ROT13, Caesar, Atbash, and Vigenère encryption',
      'port-reference': 'Port Reference',
      'port-reference-desc': '85 well-known TCP/UDP ports reference',
      'jwt-decoder': 'JWT Decoder',
      'jwt-decoder-desc': 'Decode JWT tokens client-side without sending to server',
      'json-formatter': 'JSON Formatter',
      'json-formatter-desc': 'Format, validate, minify, and diff JSON data',
      'http-status': 'HTTP Status Codes',
      'http-status-desc': 'Complete HTTP status code reference with search',
      'timestamp-converter': 'Timestamp Converter',
      'timestamp-converter-desc': 'Convert Unix timestamps to/from human-readable dates',
      'color-converter': 'Color Converter',
      'color-converter-desc': 'Convert between HEX, RGB, and HSL color formats',
      'markdown-preview': 'Markdown Preview',
      'markdown-preview-desc': 'Live Markdown editor with preview and formatting toolbar',
      'mac-address': 'MAC Address Tools',
      'mac-address-desc': 'Generate random MACs and lookup vendor by OUI prefix',
      'subnet-calculator': 'Subnet Calculator',
      'subnet-calculator-desc': 'Calculate CIDR, netmask, IP range, broadcast, and host count',
      'number-base': 'Number Base Converter',
      'number-base-desc': 'Convert between binary, octal, decimal, and hexadecimal',
      'image-base64': 'Image → Base64',
      'image-base64-desc': 'Convert images to Base64 data URIs via drag & drop',
      'lorem-ipsum': 'Lorem Ipsum',
      'lorem-ipsum-desc': 'Generate placeholder text (words, sentences, paragraphs)',
      'text-diff': 'Text Diff',
      'text-diff-desc': 'Compare two texts character-by-character, word-by-word, or line-by-line',
      'ascii-table': 'ASCII Table',
      'ascii-table-desc': 'Complete ASCII character reference (0-127) with search',
      'crontab-builder': 'Crontab Builder',
      'crontab-builder-desc': 'Generate and explain cron expressions with presets',
      'hash-identifier': 'Hash Identifier',
      'hash-identifier-desc': 'Identify hash types by pattern and length',
      'yaml-json': 'YAML ↔ JSON',
      'yaml-json-desc': 'Convert between YAML and JSON formats',
      'csv-viewer': 'CSV Viewer',
      'csv-viewer-desc': 'Parse and display CSV data as a sortable table',
      'email-extractor': 'Email Extractor',
      'email-extractor-desc': 'Extract email addresses from text with dedup and sort',
      'url-analyzer': 'URL Analyzer',
      'url-analyzer-desc': 'Parse and analyze URLs into components with encode/decode',
      'credit-card': 'Card Validator',
      'credit-card-desc': 'Validate credit cards and identify issuer via Luhn algorithm',
      'random-generator': 'Random Generator',
      'random-generator-desc': 'Random numbers, dice, coin flip, and lottery picks',
      'mime-types': 'MIME Types',
      'mime-types-desc': 'MIME type reference by file extension with search',
      'roman-numerals': 'Roman Numerals',
      'roman-numerals-desc': 'Convert between Roman and Arabic numerals',
      'html-entities': 'HTML Entities',
      'html-entities-desc': 'Encode and decode HTML entities',
      'date-calculator': 'Date Calculator',
      'date-calculator-desc': 'Days between dates, add/subtract days, age calculator',
      'system-info': 'System Info',
      'system-info-desc': 'View browser, screen, and system information',
      'case-converter': 'Case Converter',
      'case-converter-desc': 'Convert between UPPER, lower, Title, camelCase, snake_case and more',
      'emoji-picker': 'Emoji Picker',
      'emoji-picker-desc': 'Search and copy emojis by category (700+ emojis)',
      'unit-converter': 'Unit Converter',
      'unit-converter-desc': 'Convert length, weight, temperature, area, volume, speed',
      'world-clock': 'World Clock',
      'world-clock-desc': 'Current time in 70+ cities around the world',
      'pomodoro': 'Pomodoro Timer',
      'pomodoro-desc': 'Productivity timer with configurable focus/break intervals',
      'country-info': 'Country Info',
      'country-info-desc': 'Country information: capital, dial code, currency, language, flag',
      'qr-reader': 'QR Code Reader',
      'qr-reader-desc': 'Decode QR codes from images or using camera',
      'sql-formatter': 'SQL Formatter',
      'sql-formatter-desc': 'Format, beautify, minify SQL queries with keyword reference',
      'http-headers': 'HTTP Headers Reference',
      'http-headers-desc': 'Complete HTTP request/response headers reference with descriptions',
      'image-editor': 'Image Editor',
      'image-editor-desc': 'Edit images: resize, crop, filters (grayscale, sepia, blur), rotate, flip',
    },
    close: 'Close',
    loading: 'Loading...',
    langSwitch: 'فارسی',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeAuto: 'Auto',
  },
  fa: {
    brand: 'مادیکس تولز',
    tagline: 'ایستگاه کاری امنیتی مبتنی بر مرورگر',
    navHome: 'خانه',
    navTools: 'ابزارها',
    navRouter: 'روتر هوش مصنوعی',
    navAbout: 'درباره',
    search: 'جستجوی ابزارها...',
    navGroupMain: 'منوی اصلی',
    navGroupCats: 'دسته‌بندی‌ها',
    navAllTools: 'همه ابزارها',
    footer: 'ساخته شده توسط Nima Ha',
    categories: {
      'red-team': 'تیم قرمز',
      'blue-team': 'تیم آبی',
      recon: 'شبکه و شناسایی',
      payload: 'تولید پیلود',
      system: 'سیستم و شل',
      crypto: 'رمزنگاری و انکود',
      config: 'تنظیمات و دستکاری',
      'nova-proxy': 'نوا پروکسی',
      utility: 'ابزارهای کاربردی',
    },
    tools: {
      'terminal-ngrok': 'ترمینال + Ngrok',
      'terminal-ngrok-desc': 'ترمینال واقعی با WebSocket، شل‌های چندگانه و تونل ngrok',
      'google-dorks': 'گوگل دورک',
      'google-dorks-desc': '۵۰۰+ کوئری گوگل دورک در ۳۱ دسته برای تست نفوذ',
      'osint-arsenal': 'اسلحه‌خانه OSINT',
      'osint-arsenal-desc': 'بیش از ۷۵۳ ابزار OSINT در ۵۰ دسته با نصب یک‌دستوری',
      'fsociety-tools': 'ابزارهای Fsociety',
      'fsociety-tools-desc': 'راهنمای کامل ابزارهای fsociety با ۴۴ ابزار',
      'msf-commands': 'دستورات MSF و Kali',
      'msf-commands-desc': 'راهنمای دستورات Metasploit و Kali لینوکس با تولیدکننده پیلود',
      'tunnel-tools': 'ابزارهای تونل',
      'tunnel-tools-desc': '۱۵ ابزار تونل و پروکسی: ngrok، Cloudflare Tunnel، bore، frp، chisel و بیشتر',
      'ngrok-tunnel': 'تونل Ngrok',
      'ngrok-tunnel-desc': 'اسکریپت Bash ترموکس برای اتصال سرورهای محلی با URL عمومی ngrok',
      'scenario-builder': 'سازنده سناریو',
      'scenario-builder-desc': 'نوع پروژه و هدف را انتخاب کن — سناریوی مرحله‌به‌مرحله پنتست با ابزارها',
      'env-wizard': 'ویزارد محیط',
      'env-wizard-desc': 'ساخت محیط ترمینال سفارشی با شل، ابزار، ngrok و احراز هویت',
      'whois-lookup': 'جستجوی WHOIS',
      'whois-lookup-desc': 'جستجوی اطلاعات WHOIS دامنه با API عمومی',
      'subdomain-finder': 'یابنده ساب‌دامنه',
      'subdomain-finder-desc': 'کشف ساب‌دامنه با DNS brute force و ۱۰۰ اسم رایج',
      'password-tools': 'ابزارهای رمز عبور',
      'password-tools-desc': 'تولید کننده، تحلیل قدرت و بررسی نشت رمز عبور با HIBP',
      'qr-generator': 'تولید QR کد',
      'qr-generator-desc': 'تولید QR کد برای متن، URL، وای‌فای، مخاطب، SMS، ایمیل و تلفن',
      'text-tools': 'ابزارهای متن',
      'text-tools-desc': 'تبدیل حروف، مرتب‌سازی، حذف تکراری، آمار و دستکاری متن',
      'ip-scanner': 'اسکنر آی‌پی',
      'ip-scanner-desc': 'اسکن رنج آی‌پی، CIDR و پورت با نمایش پیشرفت',
      'ip-info': 'اطلاعات آی‌پی',
      'ip-info-desc': 'موقعیت، ISP، ASN و مختصات آی‌پی',
      'dns-lookup': 'جستجوی DNS',
      'dns-lookup-desc': 'پرس‌وجوی رکوردهای A، AAAA، MX، CNAME، TXT، NS، SOA',
      'network-checker': 'بررسی شبکه',
      'network-checker-desc': 'بررسی اتصال و تأخیر سرویس‌ها',
      'port-scanner': 'اسکنر پورت',
      'port-scanner-desc': 'اسکن پورت‌های رایج TCP',
      'cdn-scanner': 'اسکنر CDN',
      'cdn-scanner-desc': 'اسکن رنج CDN پنج ارائه‌دهنده بزرگ',
      'reverse-shell': 'شل معکوس',
      'reverse-shell-desc': 'پیلودهای یک خطی شل معکوس',
      'xss-payloads': 'پیلودهای XSS',
      'xss-payloads-desc': 'پیلودهای اسکریپت بین سایتی دسته‌بندی شده',
      'sqli-payloads': 'پیلودهای SQLi',
      'sqli-payloads-desc': 'پیلودهای تزریق SQL برای دیتابیس‌های مختلف',
      'lfi-payloads': 'پیلودهای LFI',
      'lfi-payloads-desc': 'مسیرهای LFI و wrapperها',
      'msf-venom': 'MSF Venom',
      'msf-venom-desc': 'تولید دستورات msfvenom و Metasploit',
      'linux-cmds': 'دستورات لینوکس',
      'linux-cmds-desc': 'دستورات افزایش دسترسی و اطلاعات سیستم',
      'powershell-cmds': 'دستورات PowerShell',
      'powershell-cmds-desc': 'دستورات Active Directory و اکسپلویت',
      'tty-shell': 'شل TTY',
      'tty-shell-desc': 'اجرای شل تعاملی TTY',
      'file-transfer': 'انتقال فایل',
      'file-transfer-desc': 'روش‌های انتقال فایل با PowerShell',
      'encoder': 'انکودر',
      'encoder-desc': 'انکود/دیکود Base64، Hex و URL',
      'hash-generator': 'تولید هش',
      'hash-generator-desc': 'تولید هش MD5، SHA1، SHA256، SHA512',
      'aes-crypto': 'رمزنگاری AES',
      'aes-crypto-desc': 'رمزنگاری/رمزگشایی AES-256-GCM با PBKDF2',
      'uuid-gen': 'تولید UUID',
      'uuid-gen-desc': 'تولید UUID با گزینه‌های قابل تنظیم',
      'v2ray-config': 'تنظیمات V2Ray',
      'v2ray-config-desc': 'تولید کانفیگ مسیریابی V2Ray',
      'sni-spoof': 'جعل SNI',
      'sni-spoof-desc': 'تغییر SNI در لینک‌های VMESS، VLESS و Trojan',
      'http-repeater': 'تکرارکننده HTTP',
      'http-repeater-desc': 'ارسال درخواست‌های HTTP سفارشی',
      'obfuscated-files': 'فایل‌های مبهم',
      'obfuscated-files-desc': 'رمزگذاری فایل به Base64 برای Bash، CMD یا PowerShell',
      'rss-feeds': 'خوراک خبری',
      'rss-feeds-desc': 'خوراک اخبار امنیتی از ExploitDB، Cisco، CVE و CXSecurity',
      'notepad': 'یادداشت',
      'notepad-desc': 'یادداشت مارک‌داون با ذخیره در مرورگر',
      'mega-scanner': 'اسکنر یکپارچه',
      'mega-scanner-desc': '۷ ابزار اسکن در یک ابزار - IP، پورت، CDN، DNS، شبکه، سرعت، جغرافیا',
      'v2ray-modifier': 'تغییر کانفیگ V2Ray',
      'v2ray-modifier-desc': 'تغییر آی‌پی و پورت در کانفیگ‌های VMESS، VLESS، WireGuard، Trojan',
      'network-diag': 'تشخیص شبکه',
      'network-diag-desc': 'پینگ، traceroute، MTR، هدر HTTP، تست سرعت، بررسی packet loss',
      'dns-hunter': 'DNS هانتر',
      'dns-hunter-desc': 'رکوردهای DNS، بررسی latency، تست نشت، Reverse DNS، اسکن CIDR',
      'cdn-finder': 'یابنده CDN',
      'cdn-finder-desc': 'یافتن IPهای سریع CDN از Cloudflare، Gcore، Akamai، Google، Azure',
      'nova-install': 'ویزارد NovaProxy',
      'nova-install-desc': 'راهنمای گام به گام استقرار NovaProxy روی Cloudflare Workers',
      'nova-proxy-worker': 'نوا پروکسی ورکر',
      'nova-proxy-worker-desc': 'نوا پروکسی: پروکسی ضدسانسور روی Cloudflare Workers (۲.۲k★)',
      'nova-wizard': 'نوا ویزارد',
      'nova-wizard-desc': 'نوا ویزارد: دیپلوی‌ر محلی OAuth برای نوا پروکسی روی Worker',
      'nova-proxy-app': 'نوا پروکسی اپ',
      'nova-proxy-app-desc': 'نرم‌افزار محلی نوا پروکسی: GSA، Domain Fronting، TLS fragment، MITM، مسیریابی هوشمند',
      'nova-radar': 'نوا رادار',
      'nova-radar-desc': 'نوا رادار: اسکنر IP کلاودفلر با تأیید TCP+TLS (Go+React)',
      'regex-tester': 'آزمایشگر Regex',
      'regex-tester-desc': 'تست و دیباگ عبارات منظم به صورت زنده',
      'cipher-tools': 'ابزارهای رمز',
      'cipher-tools-desc': 'رمزنگاری ROT13، سزار، اتبش و ویژنر',
      'port-reference': 'مرجع پورت‌ها',
      'port-reference-desc': '۸۵ پورت معروف TCP/UDP',
      'jwt-decoder': 'دیکدکننده JWT',
      'jwt-decoder-desc': 'دیکد توکن JWT در مرورگر بدون ارسال به سرور',
      'json-formatter': 'فرمت‌دهنده JSON',
      'json-formatter-desc': 'فرمت، اعتبارسنجی، مینی‌فای و مقایسه JSON',
      'http-status': 'کدهای وضعیت HTTP',
      'http-status-desc': 'مرجع کامل کدهای وضعیت HTTP با جستجو',
      'timestamp-converter': 'مبدل زمان',
      'timestamp-converter-desc': 'تبدیل Unix timestamp به تاریخ و بالعکس',
      'color-converter': 'مبدل رنگ',
      'color-converter-desc': 'تبدیل بین فرمت‌های HEX، RGB و HSL',
      'markdown-preview': 'پیش‌نمایش مارک‌داون',
      'markdown-preview-desc': 'ویرایشگر زنده مارک‌داون با نوار ابزار فرمت‌دهی',
      'mac-address': 'ابزارهای MAC',
      'mac-address-desc': 'تولید MAC تصادفی و جستجوی فروشنده با پیشوند OUI',
      'subnet-calculator': 'ماشین حساب سابنت',
      'subnet-calculator-desc': 'محاسبه CIDR، ماسک، رنج آی‌پی، برادکست و تعداد میزبان',
      'number-base': 'مبدل مبنا',
      'number-base-desc': 'تبدیل بین مبناهای ۲، ۸، ۱۰ و ۱۶',
      'image-base64': 'تصویر → Base64',
      'image-base64-desc': 'تبدیل تصویر به Base64 با کشیدن و رها کردن',
      'lorem-ipsum': 'لورم ایپسوم',
      'lorem-ipsum-desc': 'تولید متن placeholder (کلمه، جمله، پاراگراف)',
      'text-diff': 'مقایسه متن',
      'text-diff-desc': 'مقایسه دو متن حرف به حرف، کلمه به کلمه، یا خط به خط',
      'ascii-table': 'جدول ASCII',
      'ascii-table-desc': 'مرجع کامل کاراکترهای ASCII (۰-۱۲۷) با جستجو',
      'crontab-builder': 'سازنده Cron',
      'crontab-builder-desc': 'تولید و توضیح عبارات Cron با پیش‌تنظیمات',
      'hash-identifier': 'تشخیص هش',
      'hash-identifier-desc': 'تشخیص نوع هش از روی الگو و طول',
      'yaml-json': 'YAML ↔ JSON',
      'yaml-json-desc': 'تبدیل بین فرمت‌های YAML و JSON',
      'csv-viewer': 'نمایش CSV',
      'csv-viewer-desc': 'تجزیه و نمایش داده‌های CSV به صورت جدول',
      'email-extractor': 'استخراج ایمیل',
      'email-extractor-desc': 'استخراج آدرس‌های ایمیل از متن با حذف تکراری و مرتب‌سازی',
      'url-analyzer': 'تحلیل URL',
      'url-analyzer-desc': 'تجزیه URL به اجزای سازنده با encode/decode',
      'credit-card': 'اعتبارسنجی کارت',
      'credit-card-desc': 'اعتبارسنجی و شناسایی issuer کارت با الگوریتم Luhn',
      'random-generator': 'تولید اعداد تصادفی',
      'random-generator-desc': 'اعداد تصادفی، تاس، سکه و لاتاری',
      'mime-types': 'انواع MIME',
      'mime-types-desc': 'مرجع انواع MIME بر اساس پسوند فایل با جستجو',
      'roman-numerals': 'اعداد رومی',
      'roman-numerals-desc': 'تبدیل بین اعداد رومی و عربی',
      'html-entities': 'کدهای HTML',
      'html-entities-desc': 'انکود و دیکد کاراکترهای خاص HTML',
      'date-calculator': 'محاسبه تاریخ',
      'date-calculator-desc': 'فاصله بین دو تاریخ، جمع/تفریق روز، محاسبه سن',
      'system-info': 'اطلاعات سیستم',
      'system-info-desc': 'اطلاعات مرورگر، صفحه و سیستم',
      'case-converter': 'تبدیل حروف',
      'case-converter-desc': 'تبدیل بین انواع casing: بزرگ، کوچک، camelCase، snake_case و...',
      'emoji-picker': 'انتخاب ایموجی',
      'emoji-picker-desc': 'جستجو و کپی ایموجی در ۹ دسته (۷۰۰+ ایموجی)',
      'unit-converter': 'مبدل واحد',
      'unit-converter-desc': 'تبدیل واحدهای طول، وزن، دما، مساحت، حجم و سرعت',
      'world-clock': 'ساعت جهانی',
      'world-clock-desc': 'زمان فعلی در ۷۰+ شهر جهان',
      'pomodoro': 'تایمر پومودورو',
      'pomodoro-desc': 'تایمر بهره‌وری با زمان‌های قابل تنظیم فوکوس/استراحت',
      'country-info': 'اطلاعات کشورها',
      'country-info-desc': 'اطلاعات کشورها: پایتخت، کد تلفن، واحد پول، زبان، پرچم',
      'qr-reader': 'خواننده QR',
      'qr-reader-desc': 'خواندن QR کد از تصویر یا دوربین',
      'sql-formatter': 'فرمت‌ساز SQL',
      'sql-formatter-desc': 'فرمت، بهینه‌سازی و فشرده‌سازی کوئری‌های SQL با مرجع کلیدواژه‌ها',
      'http-headers': 'مرجع هدرهای HTTP',
      'http-headers-desc': 'مرجع کامل هدرهای درخواست و پاسخ HTTP با توضیحات',
      'image-editor': 'ویرایشگر تصویر',
      'image-editor-desc': 'ویرایش تصاویر: تغییر اندازه، برش، فیلترها (خاکستری، سپیا، محو)، چرخش',
    },
    close: 'بستن',
    loading: 'در حال بارگذاری...',
    langSwitch: 'English',
    themeLight: 'روشن',
    themeDark: 'تاریک',
    themeAuto: 'خودکار',
  },
};
function tr(key) { const keys = key.split('.'); let v = i18n[state.lang]; for (const k of keys) { v = v?.[k]; } return v ?? key; }

// ── Tool Registry ─────────────────────────────────────
const CATEGORIES = ['red-team', 'blue-team', 'recon', 'payload', 'system', 'crypto', 'config', 'nova-proxy', 'utility'];
const CATEGORY_EMOJI = { 'red-team':'🔴','blue-team':'🔵', recon:'🌐', payload:'💣', system:'🖥️', crypto:'🔐', config:'⚙️', 'nova-proxy':'🛡️', utility:'📦' };

const TOOLS = [
  // Red Team
  { id:'reverse-shell',  cat:'red-team' }, { id:'xss-payloads',   cat:'red-team' },
  { id:'sqli-payloads',  cat:'red-team' }, { id:'lfi-payloads',   cat:'red-team' },
  { id:'msf-venom',      cat:'red-team' }, { id:'msf-commands',   cat:'red-team' },
  { id:'fsociety-tools', cat:'red-team' },
  { id:'scenario-builder', cat:'red-team' },
  // Blue Team
  { id:'network-checker',cat:'blue-team' }, { id:'network-diag',  cat:'blue-team' },
  { id:'dns-hunter',     cat:'blue-team' }, { id:'cdn-finder',    cat:'blue-team' },
  { id:'cdn-scanner',    cat:'blue-team' }, { id:'dns-lookup',    cat:'blue-team' },
  { id:'http-repeater',  cat:'blue-team' }, { id:'rss-feeds',     cat:'blue-team' },
  { id:'notepad',        cat:'blue-team' },
  // Recon
  { id:'ip-scanner',     cat:'recon' },    { id:'ip-info',       cat:'recon' },
  { id:'port-scanner',   cat:'recon' },    { id:'mega-scanner',  cat:'recon' },
  { id:'google-dorks',   cat:'recon' },    { id:'sni-spoof',     cat:'recon' },
  { id:'osint-arsenal',  cat:'recon' },    { id:'whois-lookup',  cat:'recon' },
  { id:'subdomain-finder',cat:'recon' },
  // Payload
  { id:'linux-cmds',     cat:'payload' },  { id:'powershell-cmds',cat:'payload' },
  { id:'tty-shell',      cat:'payload' },  { id:'file-transfer', cat:'payload' },
  { id:'obfuscated-files',cat:'payload' },
  // System
  { id:'terminal-ngrok', cat:'system' }, { id:'env-wizard', cat:'system' },
  { id:'tunnel-tools',   cat:'system' },
  { id:'ngrok-tunnel',   cat:'system' },
  // Crypto
  { id:'encoder',        cat:'crypto' },   { id:'hash-generator',cat:'crypto' },
  { id:'aes-crypto',     cat:'crypto' },   { id:'uuid-gen',      cat:'crypto' },
  // Config
  // Nova Proxy
  { id:'nova-install',   cat:'nova-proxy' }, { id:'v2ray-config',  cat:'nova-proxy' },
  { id:'v2ray-modifier', cat:'nova-proxy' }, { id:'nova-proxy-worker', cat:'nova-proxy' },
  { id:'nova-wizard',    cat:'nova-proxy' }, { id:'nova-proxy-app', cat:'nova-proxy' },
  { id:'nova-radar',     cat:'nova-proxy' },
  // Utility
  { id:'spy-tools', cat:'utility' },
  { id:'password-tools', cat:'utility' }, { id:'qr-generator', cat:'utility' },
  { id:'text-tools', cat:'utility' },
  { id:'regex-tester', cat:'utility' }, { id:'cipher-tools', cat:'crypto' },
  { id:'port-reference', cat:'utility' },
  { id:'jwt-decoder', cat:'crypto' }, { id:'json-formatter', cat:'utility' },
  { id:'http-status', cat:'utility' },
  { id:'timestamp-converter', cat:'utility' }, { id:'color-converter', cat:'utility' },
  { id:'markdown-preview', cat:'utility' },
  { id:'mac-address', cat:'utility' }, { id:'subnet-calculator', cat:'recon' },
  { id:'number-base', cat:'utility' },
  { id:'image-base64', cat:'utility' }, { id:'lorem-ipsum', cat:'utility' },
  { id:'text-diff', cat:'utility' }, { id:'ascii-table', cat:'utility' },
  { id:'crontab-builder', cat:'utility' },
  { id:'hash-identifier', cat:'crypto' }, { id:'yaml-json', cat:'utility' },
  { id:'csv-viewer', cat:'utility' },
  { id:'email-extractor', cat:'utility' }, { id:'url-analyzer', cat:'utility' },
  { id:'credit-card', cat:'utility' },
  { id:'random-generator', cat:'utility' },
  { id:'mime-types', cat:'utility' }, { id:'roman-numerals', cat:'utility' },
  { id:'html-entities', cat:'utility' },
  { id:'date-calculator', cat:'utility' }, { id:'system-info', cat:'utility' },
  { id:'case-converter', cat:'utility' },
  { id:'emoji-picker', cat:'utility' }, { id:'unit-converter', cat:'utility' },
  { id:'world-clock', cat:'utility' }, { id:'pomodoro', cat:'utility' },
  { id:'country-info', cat:'utility' },
  { id:'qr-reader', cat:'utility' }, { id:'sql-formatter', cat:'utility' },
  { id:'http-headers', cat:'utility' }, { id:'image-editor', cat:'utility' },
];

const TOOL_MAP = {}; TOOLS.forEach(t => { TOOL_MAP[t.id] = t; });

const toolModules = {};
async function loadTool(id) {
  if (toolModules[id]) return toolModules[id];
  const mod = await import(`./tools/${id}.js`);
  toolModules[id] = mod;
  return mod;
}

// ── Render ─────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <nav id="navbar" style="position:sticky;top:0;z-index:100;height:var(--header);background:color-mix(in srgb,var(--page-bg) 92%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid var(--border);transition:transform .3s">
      <div class="topbar-inner">
        <div style="display:flex;align-items:center;gap:6px">
          <button id="hamburgerBtn" class="btn btn-icon btn-ghost jn-sidebar-hidden" aria-label="Menu" style="font-size:1.25rem;padding:6px">☰</button>
          <a href="#" id="logoBtn" style="display:inline-flex;align-items:center;gap:8px;padding:4px 8px;border-radius:8px;font-size:1.05rem;font-weight:600;text-decoration:none;color:var(--foreground);white-space:nowrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            <span class="tracking-tight"><span style="font-weight:700">Maddix</span> <span style="font-weight:300;opacity:.8">Tools</span></span>
          </a>
        </div>
        <button id="topbarSearchBtn" class="topbar-search" aria-label="${tr('search')}" title="${tr('search')}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span class="ts-label">${tr('search')}</span>
          <span class="topbar-kbd">⌘K</span>
        </button>
        <div class="topbar-actions">
          <div class="theme-switch" id="themeSwitch" role="switch" aria-checked="${state.isDark}" aria-label="Toggle theme" title="${state.lang==='fa'?'حالت تاریک/روشن':'Dark / light mode'}">
            <span class="theme-switch-icons">
              <svg class="theme-icon theme-icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              <svg class="theme-icon theme-icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </span>
            <span class="theme-switch-knob"></span>
          </div>
          <button id="langBtn" class="lang-btn" aria-label="${tr('langSwitch')}" title="${tr('langSwitch')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span id="langBtnText" style="font-weight:600">${state.lang==='fa'?'FA':'EN'}</span>
          </button>
          <a href="https://github.com/nima-ha/Maddix-tools" target="_blank" rel="noopener" class="btn btn-ghost jn-desktop-only" style="font-size:.8125rem;padding:.375rem .75rem;white-space:nowrap">GitHub</a>
        </div>
      </div>
    </nav>

    <div class="layout">
      <aside id="sidebar" class="sidebar" aria-label="Sidebar">
        <nav>
          <div class="side-group">${tr('navGroupMain')}</div>
          <a href="#" class="nav-link side-link" data-section="ai-router"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>${tr('navRouter')}</a>
          <a href="#" class="nav-link side-link" data-section="home"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>${tr('navHome')}</a>
          <a href="#" class="nav-link side-link" data-section="tools"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>${tr('navTools')}</a>
          <a href="#" class="nav-link side-link" data-section="about"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>${tr('navAbout')}</a>

          <div class="side-group">${tr('navGroupCats')}</div>
          <button type="button" class="side-cat" data-cat=""><span>${CATEGORY_EMOJI.all||'🧰'}</span><span class="side-cat-label">${tr('navAllTools')}</span><span class="side-cat-count">${TOOLS.length}</span></button>
          ${CATEGORIES.map(c => `<button type="button" class="side-cat" data-cat="${c}"><span>${CATEGORY_EMOJI[c]}</span><span class="side-cat-label">${tr('categories.'+c)}</span><span class="side-cat-count">${TOOLS.filter(t=>t.cat===c).length}</span></button>`).join('')}
        </nav>
      </aside>

    <main id="mainContent" class="main-content" style="padding-top:16px">
      <!-- AI Router Dashboard -->
      <section id="section-ai-router" class="section" style="padding:16px 0">
        <div id="aiRouterMount" style="width:100%"></div>
      </section>

      <!-- Home Section -->
      <section id="section-home" class="section" style="min-height:55vh;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left;padding:56px 4px">
        <div class="hero-chip" id="heroChip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span id="heroChipText">${state.lang==='fa'?'ایستگاه کاری امنیتی مبتنی بر مرورگر':'Browser-based security workstation'}</span></div>
        <h1 id="heroTitle" style="font-size:clamp(2.25rem,4vw,3rem);font-weight:900;margin:0 0 16px;letter-spacing:-.03em;display:flex;align-items:center;gap:14px;scroll-margin-top:calc(var(--header) + 2rem)"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--action)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>${tr('brand')}</h1>
        <p id="heroTagline" style="font-size:1.125rem;color:var(--muted-foreground);margin:0 0 32px;max-width:540px;line-height:1.7">${state.lang==='fa'?'مجموعه‌ای از ابزارهای شناسایی، تولید پیلود، رمزنگاری، شبکه و ابزارهای کاربردی — همگی مستقیم در مرورگر.':'A collection of recon, payload, crypto, networking and utility tools — right in your browser.'}</p>
        <div style="position:relative;width:100%;max-width:480px">
          <input id="searchInput" type="search" placeholder="${tr('search')}" style="width:100%;padding:12px 16px;border-radius:8px;border:1px solid var(--input);background:var(--card);color:var(--foreground);font-size:1rem;outline:none;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,.04)">
        </div>
      </section>

      <!-- Tools Section -->
      <section id="section-tools" class="section" style="padding:32px 0 16px">
        <div class="mono" style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted-foreground);margin-bottom:8px">${state.lang==='fa'?'ابزارها':'Tools'}</div>
        <h2 id="toolsSectionTitle" class="section-title" style="font-size:2.25rem;font-weight:900;letter-spacing:-.02em;margin:0 0 4px">${state.lang==='fa'?'ابزارها':'All Tools'}</h2>
        <p id="toolsSectionDesc" class="section-desc" style="color:var(--muted-foreground);margin:0 0 24px;font-size:.9375rem;max-width:600px">${state.lang==='fa'?'ابزارهای شبکه، پیلود، رمزنگاری و کاربردی را مرور کنید.':'Browse networking, payload, crypto and utility tools.'}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px" id="categoryFilters">
          <button class="btn cat-filter active" data-cat="">${state.lang==='fa'?'همه':'All'}</button>
          ${CATEGORIES.map(c => `<button class="btn cat-filter" data-cat="${c}">${CATEGORY_EMOJI[c]} ${tr('categories.'+c)}</button>`).join('')}
        </div>
        <div id="toolGrid" class="grid grid-cols-1" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))"></div>
        <div id="noResults" class="hidden" style="text-align:center;padding:48px 16px;color:var(--muted-foreground)">${state.lang==='fa'?'ابزاری یافت نشد':'No tools found'}</div>
      </section>

      <!-- About Section -->
      <section id="section-about" class="section" style="padding:32px 0">
        <div class="mono" style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted-foreground);margin-bottom:8px">${state.lang==='fa'?'اطلاعات':'About'}</div>
        <h2 class="section-title" id="aboutTitle" style="font-size:2.25rem;font-weight:900;letter-spacing:-.02em;margin:0 0 12px">${state.lang==='fa'?'درباره مادیکس تولز':'About Maddix Tools'}</h2>
        <p id="aboutDesc" style="color:var(--muted-foreground);max-width:640px;line-height:1.7;font-size:.9375rem">${state.lang==='fa'?'مادیکس تولز یک ایستگاه کاری امنیتی مبتنی بر مرورگر است. این مجموعه شامل ابزارهای شناسایی، تولید پیلود، رمزنگاری، شبکه و ابزارهای کاربردی می‌باشد.':'Maddix Tools is a browser-based security workstation. Includes reconnaissance, payload generation, cryptography, networking, and utility tools.'}</p>
        <p style="margin-top:16px;color:var(--muted-foreground)">${state.lang==='fa'?'ساخته شده توسط':'Built by'} <a href="https://github.com/nima-ha" target="_blank" rel="noopener" style="text-decoration:underline;color:var(--action)">Nima Ha</a></p>
      </section>
    </main>
    </div>

    <footer>${tr('footer')} &mdash; <a href="https://github.com/nima-ha/Maddix-tools" target="_blank" rel="noopener" style="text-decoration:underline">GitHub</a></footer>

    <!-- Mobile Menu -->
    <div id="mobileMenuOverlay" class="hidden" style="position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.4)"></div>
    <div id="mobileMenu" class="hidden" style="position:fixed;top:0;left:0;bottom:0;z-index:71;width:280px;background:var(--background);box-shadow:2px 0 12px rgba(0,0,0,.15);padding:16px;overflow-y:auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <span style="font-weight:600;font-size:1.125rem">${tr('navTools')}</span>
        <button id="mobileMenuClose" class="btn btn-icon btn-ghost">✕</button>
      </div>
      <nav style="display:flex;flex-direction:column;gap:2px">
        <div class="side-group" style="margin:0 4px 6px">${tr('navGroupMain')}</div>
        <a href="#" class="nav-link mobile-nav-link" data-section="home" style="display:flex;align-items:center;gap:10px;padding:10px 12px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>${tr('navHome')}</a>
        <a href="#" class="nav-link mobile-nav-link" data-section="ai-router" style="display:flex;align-items:center;gap:10px;padding:10px 12px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>${tr('navRouter')}</a>
        <a href="#" class="nav-link mobile-nav-link" data-section="tools" style="display:flex;align-items:center;gap:10px;padding:10px 12px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>${tr('navTools')}</a>
        <a href="#" class="nav-link mobile-nav-link" data-section="about" style="display:flex;align-items:center;gap:10px;padding:10px 12px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>${tr('navAbout')}</a>
        <div class="side-group" style="margin:14px 4px 6px">${tr('navGroupCats')}</div>
        ${CATEGORIES.map(c => `<button type="button" class="side-cat" data-cat="${c}" style="padding:8px 12px"><span>${CATEGORY_EMOJI[c]}</span><span class="side-cat-label">${tr('categories.'+c)}</span></button>`).join('')}
      </nav>
    </div>

    <!-- Tool Drawer -->
    <div id="drawerOverlay" class="hidden" style="position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.4);transition:opacity .35s ease"></div>
    <div id="drawer" class="hidden" style="position:fixed;bottom:0;left:0;right:0;z-index:61;background:var(--background);border-radius:var(--radius) var(--radius) 0 0;box-shadow:0 -4px 24px rgba(0,0,0,.15);display:flex;flex-direction:column;max-height:90vh;transition:transform .35s cubic-bezier(.32,.72,0,1)">
      <div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--border);flex-shrink:0">
        <span id="drawerEmoji" style="font-size:1.25rem"></span>
        <span id="drawerTitle" style="flex:1;font-size:1rem;font-weight:600"></span>
        <button id="drawerCloseBtn" class="btn btn-icon btn-ghost">✕</button>
      </div>
      <div id="drawerBody" style="flex:1;overflow-y:auto;padding:16px;min-height:200px"></div>
    </div>

    <!-- AI Assistant -->
    <div id="aiFab" aria-label="AI Assistant" style="position:fixed;bottom:20px;right:16px;z-index:90;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.5rem;box-shadow:0 8px 24px rgba(0,0,0,.3);border:none;outline:none;transition:transform .15s ease">🤖</div>
    <div id="aiPanel" class="hidden" style="position:fixed;bottom:16px;right:16px;z-index:91;width:min(92vw,380px);height:min(82vh,560px);display:flex;flex-direction:column;background:var(--card);border:1px solid var(--border);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--border);background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;flex-shrink:0">
        <span style="font-size:1.25rem">🤖</span>
        <div style="flex:1;min-width:0">
          <div id="aiTitle" style="font-weight:600;font-size:.9375rem">دستیار هوش مصنوعی</div>
          <div id="aiSub" style="font-size:.6875rem;opacity:.85">Grok · توسط xAI</div>
        </div>
        <button id="aiSettingsBtn" aria-label="Settings" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1rem;padding:4px">⚙️</button>
        <button id="aiCloseBtn" aria-label="Close" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1rem;padding:4px">✕</button>
      </div>
      <div id="aiMessages" style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:var(--background)"></div>
      <div id="aiSetup" class="hidden" style="padding:12px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:8px;background:var(--card);flex-shrink:0">
        <input id="aiKeyInput" type="password" autocomplete="off" spellcheck="false" placeholder="کلید API گروک (xAI)" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.8125rem;outline:none">
        <input id="aiModelInput" type="text" autocomplete="off" spellcheck="false" placeholder="Model (grok-4.5)" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.8125rem;outline:none">
        <div style="display:flex;gap:8px">
          <button id="aiSaveBtn" class="btn" style="flex:1;padding:.5rem 1rem;font-size:.8125rem;border-radius:8px;cursor:pointer">ذخیره</button>
          <button id="aiClearBtn" class="btn btn-ghost" style="padding:.5rem 1rem;font-size:.8125rem;border-radius:8px;cursor:pointer">پاک کردن گفتگو</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;padding:12px;border-top:1px solid var(--border);background:var(--card);flex-shrink:0">
        <input id="aiInput" type="text" autocomplete="off" spellcheck="false" placeholder="پیام خود را بنویسید..." style="flex:1;min-width:0;padding:9px 12px;border-radius:9999px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.875rem;outline:none;box-sizing:border-box">
        <button id="aiSendBtn" aria-label="Send" style="width:38px;height:38px;flex-shrink:0;border-radius:50%;border:none;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center">➤</button>
      </div>
    </div>

  `;

  bindEvents();
  renderToolGrid();
  applyDir();
  if (window.MaddixAI) window.MaddixAI.bind();
}

// ── Tool Grid ──────────────────────────────────────────
function renderToolGrid() {
  const grid = document.getElementById('toolGrid');
  const noRes = document.getElementById('noResults');
  let tools = TOOLS;
  if (state.activeCategory) tools = tools.filter(t => t.cat === state.activeCategory);
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    tools = tools.filter(tool => {
      const title = tr('tools.'+tool.id).toLowerCase();
      const desc = tr('tools.'+tool.id+'-desc').toLowerCase();
      return title.includes(q) || desc.includes(q) || tool.id.includes(q);
    });
  }
  if (tools.length === 0) { grid.innerHTML = ''; noRes.classList.remove('hidden'); return; }
  noRes.classList.add('hidden');
  grid.innerHTML = tools.map(tool => {
    const emoji = { 'red-team':'🔴','blue-team':'🔵',recon:'🌐',payload:'💣',system:'🖥️',crypto:'🔐',config:'⚙️',utility:'📦' }[tool.cat]||'🔧';
    return `<div class="jn-card tool-card" data-tool="${tool.id}" style="cursor:pointer;padding:16px;border-radius:var(--radius)">
      <span class="card-emoji">${emoji}</span>
      <h3 style="margin:0 0 4px;font-size:1rem;font-weight:600;padding-right:2rem">${tr('tools.'+tool.id)}</h3>
      <p style="margin:0;font-size:.8125rem;color:var(--muted-foreground);line-height:1.4;padding-right:2rem">${tr('tools.'+tool.id+'-desc')}</p>
    </div>`;
  }).join('');
  grid.querySelectorAll('.tool-card').forEach(el => {
    el.addEventListener('click', () => openTool(el.dataset.tool));
  });
}

// ── Open Tool ──────────────────────────────────────────
async function openTool(id) {
  const info = TOOL_MAP[id];
  if (!info) return;
  state.activeTool = id;
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const title = document.getElementById('drawerTitle');
  const emojiEl = document.getElementById('drawerEmoji');
  const body = document.getElementById('drawerBody');
  title.textContent = tr('tools.'+id);
  emojiEl.textContent = CATEGORY_EMOJI[info.cat]||'🔧';
  body.innerHTML = `<div style="text-align:center;padding:40px"><div class="jn-spinner"></div><p style="margin-top:12px;color:var(--muted-foreground)">${tr('loading')}</p></div>`;
  drawer.classList.remove('hidden');
  overlay.classList.remove('hidden');
  drawer.style.transform = 'translateY(100%)';
  overlay.style.opacity = '0';
  requestAnimationFrame(() => {
    drawer.style.transform = 'translateY(0)';
    overlay.style.opacity = '1';
  });
  try {
    const mod = await loadTool(id);
    const html = mod.default ? mod.default(state.lang) : '';
    body.innerHTML = `<div id="content" class="tool-content">${(typeof html === 'string') ? html : (html || '')}</div>`;
    if (mod.init && typeof mod.init === 'function') {
      setTimeout(() => mod.init(state.lang), 0);
    }
  } catch(e) {
    body.innerHTML = `<p style="color:var(--destructive);padding:20px">Error: ${e.message}</p>`;
  }
}

// Expose helpers so tools can call back into the app
window.Maddix = window.Maddix || {};
window.Maddix.openTool = openTool;
window.Maddix.closeDrawer = closeDrawer;

function closeDrawer() {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  drawer.style.transform = 'translateY(100%)'; overlay.style.opacity = '0';
  setTimeout(() => { drawer.classList.add('hidden'); overlay.classList.add('hidden'); }, 350);
  state.activeTool = null;
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.add('hidden');
  document.getElementById('mobileMenuOverlay')?.classList.add('hidden');
}

function syncSidebarCategories() {
  document.querySelectorAll('.side-cat').forEach(b => {
    b.classList.toggle('active', (b.dataset.cat||'') === (state.activeCategory||''));
  });
}

// ── Events ─────────────────────────────────────────────
function bindEvents() {
  // Theme toggle (switch)
  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) themeSwitch.addEventListener('click', () => {
    state.theme = state.isDark ? 'light' : 'dark';
    applyTheme();
    savePrefs();
  });

  // Lang toggle
  document.getElementById('langBtn').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'fa' : 'en';
    applyDir();
    rerender();
    savePrefs();
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderToolGrid();
  });

  // Category filters
  document.querySelectorAll('.cat-filter').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.cat-filter').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      state.activeCategory = el.dataset.cat || null;
      syncSidebarCategories();
      renderToolGrid();
    });
  });

  // Sidebar category buttons
  document.querySelectorAll('.side-cat').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.cat-filter').forEach(b => b.classList.remove('active'));
      const cat = el.dataset.cat || '';
      document.querySelectorAll('.cat-filter').forEach(b => { if ((b.dataset.cat||'') === cat) b.classList.add('active'); });
      state.activeCategory = cat || null;
      syncSidebarCategories();
      renderToolGrid();
      closeMobileMenu();
      const target = document.getElementById('section-tools');
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  // Topbar search button → open command palette
  const topbarSearchBtn = document.getElementById('topbarSearchBtn');
  if (topbarSearchBtn) topbarSearchBtn.addEventListener('click', () => openCmdPalette());

  // Nav links
  document.querySelectorAll('.nav-link').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = 'section-'+el.dataset.section;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  // Logo click
  document.getElementById('logoBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.scrollY === 0) {
      document.getElementById('section-home').scrollIntoView({ behavior:'smooth' });
    } else {
      window.scrollTo({ top:0, behavior:'smooth' });
    }
  });

  // Hamburger menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    if (menu) { menu.classList.remove('hidden'); if (overlay) overlay.classList.remove('hidden'); }
  });

  // Mobile menu close
  document.getElementById('mobileMenuClose')?.addEventListener('click', closeMobileMenu);
  document.getElementById('mobileMenuOverlay')?.addEventListener('click', closeMobileMenu);

  // Mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      const id = 'section-'+el.dataset.section;
      document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  // Drawer close
  document.getElementById('drawerCloseBtn').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const cp = document.getElementById('cmdPalette');
      if (cp && !cp.classList.contains('hidden')) { closeCmdPalette(); return; }
      closeDrawer();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleCmdPalette();
    }
  });

  // Command Palette
  function toggleCmdPalette() {
    const cp = document.getElementById('cmdPalette');
    if (!cp) return;
    if (cp.classList.contains('hidden')) { openCmdPalette(); }
    else { closeCmdPalette(); }
  }
  function openCmdPalette() {
    const cp = document.getElementById('cmdPalette');
    if (!cp) return;
    cp.classList.remove('hidden');
    const input = document.getElementById('cmdInput');
    if (input) { input.value = ''; input.placeholder = state.lang==='fa'?'جستجوی ابزارها...':'Search tools...'; setTimeout(() => input.focus(), 50); }
    renderCmdResults('');
    var tc = document.getElementById('cmdToolCount');
    if (tc) tc.textContent = TOOLS.length + (state.lang==='fa'?' ابزار':' tools');
  }
  function closeCmdPalette() {
    const cp = document.getElementById('cmdPalette');
    if (cp) cp.classList.add('hidden');
  }
  function renderCmdResults(q) {
    const container = document.getElementById('cmdResults');
    if (!container) return;
    const query = (q || '').toLowerCase();
    let results = TOOLS.filter(t => {
      const title = tr('tools.'+t.id).toLowerCase();
      const desc = tr('tools.'+t.id+'-desc').toLowerCase();
      return !query || title.includes(query) || desc.includes(query) || t.id.includes(query);
    });
    if (query && results.length === 0) {
      container.innerHTML = '<div style="padding:24px;text-align:center;color:var(--muted-foreground);font-size:.8125rem">'+(state.lang==='fa'?'نتیجه‌ای یافت نشد':'No results')+'</div>';
      return;
    }
    if (!query) results = TOOLS;
    container.innerHTML = results.slice(0, 20).map(t => {
      const emoji = CATEGORY_EMOJI[t.cat]||'🔧';
      return '<div class="cmd-result" data-id="'+t.id+'" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;transition:background .1s">'+
        '<span style="font-size:1.1rem">'+emoji+'</span>'+
        '<div style="flex:1"><div style="font-size:.8125rem;font-weight:500">'+tr('tools.'+t.id)+'</div><div style="font-size:.6875rem;color:var(--muted-foreground)">'+tr('tools.'+t.id+'-desc')+'</div></div>'+
        '<span style="font-size:.625rem;padding:2px 6px;background:var(--muted);border-radius:4px;color:var(--muted-foreground)">'+tr('categories.'+t.cat).split(' ').pop()+'</span>'+
      '</div>';
    }).join('');
    container.querySelectorAll('.cmd-result').forEach(el => {
      el.addEventListener('click', () => {
        closeCmdPalette();
        openTool(el.dataset.id);
      });
    });
  }
  const cmdInput = document.getElementById('cmdInput');
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => renderCmdResults(e.target.value));
    cmdInput.addEventListener('keydown', (e) => {
      var items = document.querySelectorAll('.cmd-result');
      if (e.key === 'Enter') {
        var sel = document.querySelector('.cmd-result.hover') || items[0];
        if (sel) { closeCmdPalette(); openTool(sel.dataset.id); }
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var idx = -1;
        items.forEach(function(el,i){ if (el.classList.contains('hover')) idx=i; });
        items.forEach(function(el){ el.classList.remove('hover'); el.style.background=''; el.style.color=''; });
        if (e.key === 'ArrowDown') idx = Math.min(idx+1, items.length-1);
        else idx = Math.max(idx-1, 0);
        if (items[idx]) { items[idx].classList.add('hover'); items[idx].style.background='var(--accent)'; items[idx].style.color='#fff'; items[idx].scrollIntoView({block:'nearest'}); }
      }
    });
  }
  document.getElementById('cmdPalette')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeCmdPalette();
  });

  // Mobile detection
  const onResize = () => {
    state.isMobile = window.innerWidth < 768;
  };
  window.addEventListener('resize', onResize);
}

// ── Theme ──────────────────────────────────────────────
function applyTheme() {
  const t = state.theme;
  let isDark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme:dark)').matches);
  state.isDark = isDark;
  document.documentElement.classList.toggle('dark', isDark);
  const sw = document.getElementById('themeSwitch');
  if (sw) sw.setAttribute('aria-checked', isDark ? 'true' : 'false');
}

// ── Dir ────────────────────────────────────────────────
function applyDir() {
  const dir = state.lang === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = state.lang;
  // Show/hide lang-specific elements
  document.querySelectorAll('[lang]').forEach(el => {
    el.style.display = el.getAttribute('lang') === state.lang ? '' : 'none';
  });
  if (window.MaddixAI) window.MaddixAI.setLang(state.lang);
}

// ── Prefs ──────────────────────────────────────────────
function savePrefs() {
  localStorage.setItem(LS_KEY, JSON.stringify({ theme:state.theme, lang:state.lang }));
}

function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    state.theme = p.theme || 'auto';
    state.lang = p.lang || 'en';
  } catch(e) {}
}

// ── Rerender ───────────────────────────────────────────
function rerender() {
  // Update only text nodes that change with language
  var heroTitle = document.getElementById('heroTitle');
  var heroSvg = heroTitle.querySelector('svg');
  if (heroSvg) {
    heroTitle.innerHTML = '';
    heroTitle.appendChild(heroSvg.cloneNode(true));
    heroTitle.appendChild(document.createTextNode(' '+tr('brand')));
  } else {
    heroTitle.textContent = tr('brand');
  }
  document.getElementById('heroTagline').textContent = tr('tagline');
  const heroChipText = document.getElementById('heroChipText');
  if (heroChipText) heroChipText.textContent = state.lang==='fa'?'ایستگاه کاری امنیتی مبتنی بر مرورگر':'Browser-based security workstation';
  document.getElementById('searchInput').placeholder = tr('search');
  const tsLabel = document.querySelector('#topbarSearchBtn .ts-label');
  if (tsLabel) tsLabel.textContent = tr('search');
  const sideGroups = document.querySelectorAll('#sidebar .side-group');
  if (sideGroups[0]) sideGroups[0].textContent = tr('navGroupMain');
  if (sideGroups[1]) sideGroups[1].textContent = tr('navGroupCats');
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(el => {
    const s = el.dataset.section;
    let label = '';
    if (s === 'home') label = tr('navHome');
    else if (s === 'tools') label = tr('navTools');
    else if (s === 'ai-router') label = tr('navRouter');
    else if (s === 'about') label = tr('navAbout');
    if (!label) return;
    const svg = el.querySelector('svg');
    if (svg) {
      el.innerHTML = '';
      el.appendChild(svg.cloneNode(true));
      el.appendChild(document.createTextNode(' '+label));
      el.dataset.section = s;
    } else {
      el.textContent = label;
    }
  });
  document.getElementById('langBtn').textContent = tr('langSwitch');
  document.querySelectorAll('.cat-filter').forEach(el => {
    const cat = el.dataset.cat;
    if (!cat) el.textContent = state.lang==='fa'?'همه':'All';
    else el.textContent = CATEGORY_EMOJI[cat]+' '+tr('categories.'+cat);
  });
  document.querySelectorAll('#sidebar .side-cat').forEach(el => {
    const cat = el.dataset.cat;
    const label = el.querySelector('.side-cat-label');
    const count = el.querySelector('.side-cat-count');
    if (label) label.textContent = cat ? tr('categories.'+cat) : tr('navAllTools');
    if (count) count.textContent = cat ? TOOLS.filter(t=>t.cat===cat).length : TOOLS.length;
  });
  document.querySelector('footer').innerHTML = tr('footer')+' &mdash; <a href="https://github.com/nima-ha/Maddix-tools" target="_blank" rel="noopener" style="text-decoration:underline">GitHub</a>';
  // About section
  const aboutTitle = document.getElementById('aboutTitle');
  const aboutDesc = document.getElementById('aboutDesc');
  if (aboutTitle) aboutTitle.textContent = state.lang==='fa'?'درباره مادیکس تولز':'About Maddix Tools';
  if (aboutDesc) aboutDesc.textContent = state.lang==='fa'?'مادیکس تولز یک ایستگاه کاری امنیتی مبتنی بر مرورگر است. شامل ابزارهای شناسایی، تولید پیلود، رمزنگاری، شبکه و اسکنر یکپارچه می‌باشد.':'Maddix Tools is a browser-based security workstation. Includes recon, payload, crypto, network, and unified scanner tools.';
  const toolsTitle = document.getElementById('toolsSectionTitle');
  const toolsDesc = document.getElementById('toolsSectionDesc');
  if (toolsTitle) toolsTitle.textContent = state.lang==='fa'?'ابزارها':'All Tools';
  if (toolsDesc) toolsDesc.textContent = state.lang==='fa'?'ابزارهای شبکه، پیلود، رمزنگاری و کاربردی را مرور کنید.':'Browse networking, payload, crypto and utility tools.';
  renderToolGrid();
  mountAiRouter();
}

// ── AI Router mount ────────────────────────────────────
async function mountAiRouter() {
  const mount = document.getElementById('aiRouterMount');
  if (!mount) return;
  try {
    const mod = await import('./tools/ai-router.js');
    if (mod.default) {
      mount.innerHTML = mod.default(state.lang);
      if (mod.init) setTimeout(() => mod.init(state.lang), 0);
    }
  } catch(e) {
    console.error('AI Router mount error:', e);
  }
}

// ── Boot ───────────────────────────────────────────────
function boot() {
  try {
    loadPrefs();
    state.isDark = state.theme === 'dark' || (state.theme === 'auto' && window.matchMedia('(prefers-color-scheme:dark)').matches);
    render();
    applyTheme();
  } catch(e) {
    console.error('Maddix boot error:', e);
  }
  // Always remove loading screen
  removeLoading();
  // Mount AI Router dashboard
  mountAiRouter();
  // Watch OS theme
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', () => {
    if (state.theme === 'auto') applyTheme();
  });
  // Scroll-aware nav highlight
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(el => {
          el.classList.toggle('active', entry.target.id === 'section-'+el.dataset.section);
        });
      }
    });
  }, { threshold:0.3 });
  ['ai-router','home','tools','about'].forEach(id => {
    const el = document.getElementById('section-'+id);
    if (el) observer.observe(el);
  });
}

function removeLoading() {
  const loading = document.getElementById('jn-loading');
  if (!loading) return;
  loading.classList.add('jn-loading-stage-1');
  setTimeout(() => {
    loading.classList.add('jn-loading-stage-2');
    setTimeout(() => {
      try { loading.remove(); } catch(e) {}
      const app = document.getElementById('app');
      if (app) app.classList.add('jn-app-enter');
    }, 250);
  }, 400);
}

document.addEventListener('DOMContentLoaded', boot);
if (document.readyState !== 'loading') boot();

})();
