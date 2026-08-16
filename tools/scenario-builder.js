// Maddix Tools — Security Scenario Builder
// Lets the user pick a project type + objective and produces a
// phase-by-phase pentest scenario (templates, no API needed).

const PROJECTS = [
  {
    id: 'webapp',
    icon: '🌐',
    name: 'Web Application',
    nameFa: 'اپلیکیشن وب',
    desc: 'Web app & API security assessment',
    descFa: 'ارزیابی امنیتی اپلیکیشن وب و API',
    phases: [
      {
        name: 'Reconnaissance', nameFa: 'شناسایی',
        tasks: [
          { t: 'Map the target scope: root domain, subdomains, IPs, tech stack', tFa: 'محدوده هدف را مشخص کن: دامنه اصلی، زیردامنهها، IPها و تکنولوژی', tools: ['subdomain-finder', 'whois-lookup', 'ip-info'] },
          { t: 'Fingerprint the stack (Wappalyzer, headers, error pages)', tFa: 'شناسایی پشته فناوری (Wappalyzer، هدرها، صفحات خطا)', tools: ['http-headers', 'url-analyzer'] },
          { t: 'Crawl the app & collect endpoints, params, assets', tFa: 'خزش اپلیکیشن و جمعآوری اندپوینتها، پارامترها و داراییها', tools: ['google-dorks'] },
        ],
      },
      {
        name: 'Discovery & Scanning', nameFa: 'کشف و اسکن',
        tasks: [
          { t: 'Run directory/file brute force (ffuf, dirb)', tFa: 'نیروی وحشیانه دایرکتوریها و فایلها (ffuf، dirb)', tools: ['google-dorks'] },
          { t: 'Scan for exposed endpoints: /admin, /api, /backup, .git', tFa: 'اسکن برای اندپوینتهای در معرض: /admin، /api، /backup، .git', tools: ['url-analyzer'] },
          { t: 'Check misconfigs: CORS, security headers, TLS', tFa: 'بررسی پیکربندی اشتباه: CORS، هدرهای امنیتی، TLS', tools: ['http-headers', 'network-checker'] },
        ],
      },
      {
        name: 'Vulnerability Analysis', nameFa: 'تحلیل آسیبپذیری',
        tasks: [
          { t: 'Test injection points: SQLi, XSS, LFI, SSRF, XXE', tFa: 'تست نقاط تزریق: SQLi، XSS، LFI، SSRF، XXE', tools: ['sqli-payloads', 'xss-payloads', 'lfi-payloads'] },
          { t: 'Test authentication & session logic, IDOR, privilege escalation', tFa: 'تست منطق احراز هویت و نشست، IDOR و افزایش امتیاز', tools: ['jwt-decoder'] },
          { t: 'Scan with automated tools (Nuclei, Burp Active Scan)', tFa: 'اسکن با ابزارهای خودکار (Nuclei، اسکن فعال برپ)', tools: ['http-repeater'] },
        ],
      },
      {
        name: 'Exploitation', nameFa: 'بهرهبرداری',
        tasks: [
          { t: 'Craft & validate payloads for confirmed bugs', tFa: 'ساخت و تأیید پیلودها برای اشکالهای تأییدشده', tools: ['sqli-payloads', 'xss-payloads', 'lfi-payloads'] },
          { t: 'Chain issues to reach auth bypass or RCE', tFa: 'زنجیرهکردن نقاط ضعف برای دور زدن احراز هویت یا RCE', tools: ['reverse-shell'] },
          { t: 'Document PoC with minimal impact', tFa: 'مستندسازی PoC با حداقل اثر مخرب', tools: ['notepad'] },
        ],
      },
      {
        name: 'Post-Exploitation & Reporting', nameFa: 'پس از بهرهبرداری و گزارش',
        tasks: [
          { t: 'Clean up artifacts & restore state', tFa: 'پاکسازی ردپا و بازیابی وضعیت', tools: [] },
          { t: 'Write findings with severity, impact & remediation', tFa: 'نوشتن یافتهها با شدت، اثر و راهکار رفع', tools: ['markdown-preview'] },
          { t: 'Deliver a professional report + timeline', tFa: 'تحویل گزارش حرفهای + جدول زمانی', tools: [] },
        ],
      },
    ],
  },
  {
    id: 'network',
    icon: '🖧',
    name: 'Network & Infrastructure',
    nameFa: 'شبکه و زیرساخت',
    desc: 'Internal/external network pentest',
    descFa: 'تست نفوذ شبکه داخلی/خارجی',
    phases: [
      {
        name: 'Reconnaissance', nameFa: 'شناسایی',
        tasks: [
          { t: 'Map the network: live hosts, ranges, VLANs', tFa: 'نقشه شبکه: هاستهای زنده، محدودهها، VLANها', tools: ['ip-scanner', 'ip-info'] },
          { t: 'Enumerate open ports & services across hosts', tFa: 'شمارش پورتهای باز و سرویسها روی هاستها', tools: ['port-scanner', 'port-reference'] },
          { t: 'Identify OS & versions for all services', tFa: 'شناسایی سیستمعامل و نسخه همه سرویسها', tools: ['network-diag'] },
        ],
      },
      {
        name: 'Vulnerability Analysis', nameFa: 'تحلیل آسیبپذیری',
        tasks: [
          { t: 'Map services to known CVEs & default creds', tFa: 'تطبیق سرویسها با CVEهای شناختهشده و رمزهای پیشفرض', tools: ['port-reference'] },
          { t: 'Test SMB, RDP, SNMP, SSH config weaknesses', tFa: 'تست ضعفهای پیکربندی SMB، RDP، SNMP و SSH', tools: ['network-checker'] },
          { t: 'Check for weak protocols, legacy services', tFa: 'بررسی پروتکلهای ضعیف و سرویسهای قدیمی', tools: ['network-diag'] },
        ],
      },
      {
        name: 'Exploitation', nameFa: 'بهرهبرداری',
        tasks: [
          { t: 'Exploit vulnerable services (Metasploit modules)', tFa: 'بهرهبرداری از سرویسهای آسیبپذیر (ماژولهای Metasploit)', tools: ['msf-commands', 'msf-venom'] },
          { t: 'Attempt credential attacks against exposed services', tFa: 'تلاش برای حمله رمز عبور روی سرویسهای در معرض', tools: ['password-tools'] },
          { t: 'Pivot if a foothold is gained', tFa: 'پیشروی در صورت کسب جای پا', tools: ['reverse-shell', 'tunnel-tools'] },
        ],
      },
      {
        name: 'Post-Exploitation', nameFa: 'پس از بهرهبرداری',
        tasks: [
          { t: 'Enumerate domain/local privileges & persistence', tFa: 'شمارش امتیازات دامنه/محلی و پایدارسازی', tools: ['fsociety-tools'] },
          { t: 'Lateral movement to high-value targets', tFa: 'حرکت جانبی به اهداف با ارزش', tools: ['reverse-shell'] },
          { t: 'Exfiltrate PoC data carefully & log everything', tFa: 'استخراج داده PoC با دقت و ثبت همهچیز', tools: ['notepad'] },
        ],
      },
      {
        name: 'Reporting', nameFa: 'گزارشدهی',
        tasks: [
          { t: 'Produce network map + finding summary', tFa: 'تولید نقشه شبکه + خلاصه یافتهها', tools: [] },
          { t: 'Prioritize remediation by risk & business impact', tFa: 'اولویتبندی رفع بر اساس ریسک و اثر تجاری', tools: ['markdown-preview'] },
        ],
      },
    ],
  },
  {
    id: 'osint',
    icon: '🕵️',
    name: 'OSINT Investigation',
    nameFa: 'تحقیق OSINT',
    desc: 'Open-source intelligence gathering',
    descFa: 'جمعآوری اطلاعات منبعباز',
    phases: [
      {
        name: 'Target Definition', nameFa: 'تعریف هدف',
        tasks: [
          { t: 'Define target(s): person, org, domain, handle, email', tFa: 'تعریف هدف: شخص، سازمان، دامنه، نام کاربری، ایمیل', tools: ['osint-arsenal'] },
          { t: 'Set legal scope & data protection boundaries', tFa: 'تعیین محدوده قانونی و مرزهای حفاظت از داده', tools: [] },
        ],
      },
      {
        name: 'Passive Collection', nameFa: 'جمعآوری غیرفعال',
        tasks: [
          { t: 'Enumerate usernames, emails & phone numbers', tFa: 'شمارش نامهای کاربری، ایمیلها و شماره تلفنها', tools: ['osint-arsenal', 'email-extractor'] },
          { t: 'Search breaches, dumps & leak databases', tFa: 'جستجو در نشتهای داده و پایگاههای لیک', tools: ['google-dorks'] },
          { t: 'Gather metadata from public documents/images', tFa: 'جمعآوری متادیتا از اسناد و تصاویر عمومی', tools: ['osint-arsenal'] },
        ],
      },
      {
        name: 'Domain & Infrastructure OSINT', nameFa: 'OSINT دامنه و زیرساخت',
        tasks: [
          { t: 'WHOIS, DNS records, certificate transparency', tFa: 'WHOIS، رکوردهای DNS، شفافیت گواهی', tools: ['whois-lookup', 'dns-lookup'] },
          { t: 'Subdomain discovery & related infrastructure', tFa: 'کشف زیردامنهها و زیرساختهای مرتبط', tools: ['subdomain-finder', 'ip-info'] },
          { t: 'Cloud footprints, buckets, exposed services', tFa: 'ردپای کلود، باکتهای ذخیرهسازی و سرویسهای در معرض', tools: ['google-dorks'] },
        ],
      },
      {
        name: 'Correlation & Analysis', nameFa: 'همبستگی و تحلیل',
        tasks: [
          { t: 'Correlate identities across platforms & geolocation', tFa: 'همبستگی هویتها در پلتفرمها و موقعیتیابی جغرافیایی', tools: ['osint-arsenal'] },
          { t: 'Build a timeline of events & relationships', tFa: 'ساخت جدول زمانی رویدادها و روابط', tools: ['markdown-preview'] },
        ],
      },
      {
        name: 'Deliverable', nameFa: 'تحویل',
        tasks: [
          { t: 'Produce a structured intelligence report', tFa: 'تولید گزارش اطلاعاتی ساختاریافته', tools: ['markdown-preview', 'notepad'] },
          { t: 'Document sources, confidence & gaps', tFa: 'مستندسازی منابع، سطح اطمینان و شکافها', tools: [] },
        ],
      },
    ],
  },
  {
    id: 'wireless',
    icon: '📶',
    name: 'Wireless / Wi-Fi',
    nameFa: 'شبکه بیسیم',
    desc: 'Wi-Fi security assessment',
    descFa: 'ارزیابی امنیت وایفای',
    phases: [
      {
        name: 'Reconnaissance', nameFa: 'شناسایی',
        tasks: [
          { t: 'Enumerate nearby networks: SSID, BSSID, channel, encryption', tFa: 'شمارش شبکههای اطراف: SSID، BSSID، کانال، رمزنگاری', tools: ['network-diag'] },
          { t: 'Identify WEP/WPA2/WPA3/enterprise networks', tFa: 'شناسایی شبکههای WEP/WPA2/WPA3 و سازمانی', tools: [] },
        ],
      },
      {
        name: 'Analysis', nameFa: 'تحلیل',
        tasks: [
          { t: 'Capture handshakes & probe traffic', tFa: 'ضبط دستدادنها و ترافیک پروب', tools: [] },
          { t: 'Check for weak configurations: WPS, default creds, rogue APs', tFa: 'بررسی پیکربندی ضعیف: WPS، رمز پیشفرض، AP جعلی', tools: ['network-checker'] },
        ],
      },
      {
        name: 'Exploitation', nameFa: 'بهرهبرداری',
        tasks: [
          { t: 'Attempt WPA2 PSK crack with captured handshake (dictionary)', tFa: 'تلاش برای شکستن WPA2 PSK با دستدادهٔ ضبطشده (دیکشنری)', tools: ['password-tools'] },
          { t: 'Test client attacks: deauth, evil twin, PMKID', tFa: 'تست حملات کلاینت: deauth، ایول تویین، PMKID', tools: [] },
        ],
      },
      {
        name: 'Post-Exploitation & Report', nameFa: 'پس از بهرهبرداری و گزارش',
        tasks: [
          { t: 'If joined the network, pivot to internal assessment', tFa: 'در صورت اتصال به شبکه، پیشروی به ارزیابی داخلی', tools: ['ip-scanner', 'port-scanner'] },
          { t: 'Report findings with signal evidence', tFa: 'گزارش یافتهها با شواهد سیگنال', tools: ['markdown-preview'] },
        ],
      },
    ],
  },
  {
    id: 'ad',
    icon: '🏛️',
    name: 'Active Directory',
    nameFa: 'اکتیو دایرکتوری',
    desc: 'AD security assessment',
    descFa: 'ارزیابی امنیتی اکتیو دایرکتوری',
    phases: [
      {
        name: 'Reconnaissance', nameFa: 'شناسایی',
        tasks: [
          { t: 'Enumerate domain: trusts, forests, DCs, users, groups, GPOs', tFa: 'شمارش دامنه: تراستها، جنگلها، DCها، کاربران، گروهها، GPOها', tools: ['fsociety-tools'] },
          { t: 'Identify domain controllers, DNS, SMB shares', tFa: 'شناسایی کنترلکنندههای دامنه، DNS و اشتراکهای SMB', tools: ['dns-lookup', 'network-checker'] },
        ],
      },
      {
        name: 'Vulnerability Analysis', nameFa: 'تحلیل آسیبپذیری',
        tasks: [
          { t: 'Check for common misconfigs: Kerberoasting, AS-REP roast, unconstrained delegation', tFa: 'بررسی پیکربندیهای اشتباه رایج: Kerberoasting، AS-REP roast، تفویض بدون محدودیت', tools: ['msf-commands'] },
          { t: 'Analyze ACLs, privileges & password policies', tFa: 'تحلیل ACLها، امتیازات و سیاستهای رمز عبور', tools: [] },
        ],
      },
      {
        name: 'Exploitation', nameFa: 'بهرهبرداری',
        tasks: [
          { t: 'Attempt credential harvesting: LLMNR, NTLM relay, pass-the-hash', tFa: 'تلاش برای جمعآوری رمزها: LLMNR، NTLM relay، pass-the-hash', tools: ['fsociety-tools'] },
          { t: 'Privilege escalation to DA/EA via misconfigs', tFa: 'افزایش امتیاز به DA/EA از طریق پیکربندیهای اشتباه', tools: ['reverse-shell'] },
        ],
      },
      {
        name: 'Post-Exploitation & Report', nameFa: 'پس از بهرهبرداری و گزارش',
        tasks: [
          { t: 'Assess persistence & detection coverage', tFa: 'ارزیابی پایدارسازی و پوشش شناسایی', tools: [] },
          { t: 'Deliver full AD attack path report', tFa: 'تحویل گزارش کامل مسیر حمله AD', tools: ['markdown-preview'] },
        ],
      },
    ],
  },
  {
    id: 'social',
    icon: '🎭',
    name: 'Social Engineering',
    nameFa: 'مهندسی اجتماعی',
    desc: 'Phishing & social engineering tests',
    descFa: 'تست فیشینگ و مهندسی اجتماعی',
    phases: [
      {
        name: 'Planning', nameFa: 'برنامهریزی',
        tasks: [
          { t: 'Define target audience & approved testing window', tFa: 'تعریف مخاطب هدف و بازه تست مجاز', tools: [] },
          { t: 'Choose vector: email, phone, USB drop, physical', tFa: 'انتخاب بردار: ایمیل، تلفن، USB، فیزیکی', tools: [] },
        ],
      },
      {
        name: 'Preparation', nameFa: 'آمادهسازی',
        tasks: [
          { t: 'Recon targets: names, roles, org structure, habits', tFa: 'شناسایی اهداف: نامها، نقشها، ساختار سازمان، عادات', tools: ['osint-arsenal', 'email-extractor'] },
          { t: 'Build realistic lure + infrastructure (domain, landing)', tFa: 'ساخت طعمه واقعگرایانه + زیرساخت (دامنه، صفحه فرود)', tools: ['env-wizard', 'ngrok-tunnel'] },
        ],
      },
      {
        name: 'Execution', nameFa: 'اجرا',
        tasks: [
          { t: 'Launch campaign with tracking & sandbox detection bypass', tFa: 'اجرای کمپین با ردیابی و دور زدن سندباکس', tools: ['tunnel-tools'] },
          { t: 'Monitor opens, clicks, credential submission', tFa: 'پایش باز شدن، کلیکها و ارسال رمزها', tools: [] },
        ],
      },
      {
        name: 'Analysis & Report', nameFa: 'تحلیل و گزارش',
        tasks: [
          { t: 'Aggregate metrics: phish rate, click rate, report rate', tFa: 'تجمیع معیارها: نرخ فیشینگ، کلیک، گزارشدهی', tools: ['markdown-preview'] },
          { t: 'Deliver recommendations + training follow-up', tFa: 'تحویل توصیهها + پیگیری آموزشی', tools: [] },
        ],
      },
    ],
  },
  {
    id: 'mobile',
    icon: '📱',
    name: 'Mobile App',
    nameFa: 'اپلیکیشن موبایل',
    desc: 'Android/iOS app security assessment',
    descFa: 'ارزیابی امنیتی اپلیکیشن اندروید/آیاواس',
    phases: [
      {
        name: 'Setup & Recon', nameFa: 'راهاندازی و شناسایی',
        tasks: [
          { t: 'Install app, configure proxy interception (Burp/mitmproxy)', tFa: 'نصب اپ و تنظیم پروکسی رهگیری (Burp/mitmproxy)', tools: ['http-repeater'] },
          { t: 'Map app surface: screens, APIs, deep links, storage', tFa: 'نقشه سطح اپ: صفحهها، APIها، دیپلینکها، ذخیرهسازی', tools: ['url-analyzer'] },
        ],
      },
      {
        name: 'Analysis', nameFa: 'تحلیل',
        tasks: [
          { t: 'Test API auth, session, IDOR, injection (same as web)', tFa: 'تست احراز هویت API، نشست، IDOR، تزریق (مثل وب)', tools: ['sqli-payloads', 'jwt-decoder'] },
          { t: 'Check insecure storage: keys, tokens, logs, backups', tFa: 'بررسی ذخیرهسازی ناامن: کلیدها، توکنها، لاگها، بکاپها', tools: ['aes-crypto'] },
          { t: 'Verify certificate pinning & TLS implementation', tFa: 'تأیید پینینگ گواهی و پیادهسازی TLS', tools: ['http-headers'] },
        ],
      },
      {
        name: 'Exploitation & Report', nameFa: 'بهرهبرداری و گزارش',
        tasks: [
          { t: 'Exploit confirmed API/storage issues with PoCs', tFa: 'بهرهبرداری از مشکلات تأییدشده API/ذخیرهسازی با PoC', tools: ['http-repeater'] },
          { t: 'Deliver report: mobile-specific risk & fix guidance', tFa: 'تحویل گزارش: ریسک ویژه موبایل و راهنمای رفع', tools: ['markdown-preview'] },
        ],
      },
    ],
  },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function(lang) {
  const f = lang === 'fa';
  let html = '<div style="padding:16px">';

  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">' +
    '<span style="font-size:2.2rem">🎬</span>' +
    '<div>' +
      '<h2 style="margin:0;font-size:1.25rem;font-weight:600">' + (f ? 'سازنده سناریوی پنتست' : 'Pentest Scenario Builder') + '</h2>' +
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">' + (f ? 'نوع پروژه و هدف را انتخاب کن — سناریوی مرحله‌به‌مرحله با ابزارها' : 'Pick your project type & objective — get a phase-by-phase scenario with tools') + '</p>' +
    '</div>' +
  '</div>';

  // Project selection cards
  html += '<h3 style="font-size:.8125rem;font-weight:600;color:var(--muted-foreground);margin:0 0 10px">' +
    (f ? '۱) نوع پروژه را انتخاب کن' : '1) Select your project type') + '</h3>';
  html += '<div id="scn-projects" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-bottom:20px">';
  PROJECTS.forEach(p => {
    html += '<button type="button" class="scn-project" data-id="' + p.id + '" style="display:flex;align-items:flex-start;gap:10px;padding:14px;border:1px solid var(--border);border-radius:10px;background:var(--card);color:var(--foreground);cursor:pointer;text-align:left;font-family:inherit;transition:border-color .15s,background .15s">' +
      '<span style="font-size:1.5rem;line-height:1">' + p.icon + '</span>' +
      '<span style="min-width:0">' +
        '<span style="display:block;font-weight:600;font-size:.875rem">' + (f ? p.nameFa : p.name) + '</span>' +
        '<span style="display:block;font-size:.72rem;color:var(--muted-foreground);margin-top:2px;line-height:1.4">' + (f ? p.descFa : p.desc) + '</span>' +
      '</span>' +
    '</button>';
  });
  html += '</div>';

  // Objective select
  html += '<h3 style="font-size:.8125rem;font-weight:600;color:var(--muted-foreground);margin:0 0 10px">' +
    (f ? '۲) هدف از این ارزیابی چیست؟' : '2) What is the objective of this assessment?') + '</h3>';
  html += '<select id="scn-goal" style="width:100%;max-width:520px;padding:10px 12px;border:1px solid var(--input);border-radius:8px;background:var(--card);color:var(--foreground);font-size:.875rem;margin-bottom:20px">' +
    '<option value="compliance">' + (f ? 'تست نفوذ کامل (کاملترین پوشش)' : 'Full pentest (most complete coverage)') + '</option>' +
    '<option value="redteam">' + (f ? 'شبیهسازی حمله (تیم قرمز)' : 'Attack simulation (red team)') + '</option>' +
    '<option value="vulnscan">' + (f ? 'اسکن سریع آسیبپذیری' : 'Quick vulnerability scan') + '</option>' +
    '<option value="awareness">' + (f ? 'آگاهیبخشی و آموزش' : 'Awareness & training') + '</option>' +
  '</select>';

  // Generate button
  html += '<button id="scn-generate" class="btn" style="background:var(--action);color:var(--action-foreground);border:none;padding:.625rem 1.5rem;font-weight:600;border-radius:8px;margin-bottom:20px">' +
    (f ? '🎬 ساخت سناریو' : '🎬 Generate scenario') + '</button>';

  // Output container
  html += '<div id="scn-output"></div>';

  html += '<div style="margin-top:16px;padding:14px;background:var(--muted);border-radius:var(--radius)">' +
    '<h4 style="margin:0 0 8px;font-size:.875rem">' + (f ? '⚠️ نکته قانونی' : '⚠️ Legal notice') + '</h4>' +
    '<p style="margin:0;font-size:.78rem;color:var(--muted-foreground);line-height:1.6">' +
      (f ? 'فقط روی سیستمهایی تست کن که مجوز کتبی داری. این ابزار قالب آموزشی است و جایگزین روششناسی رسمی نیست.' : 'Only test systems you have written authorization for. This is an educational template, not a replacement for official methodology.') +
    '</p>' +
  '</div>';

  html += '</div>';
  return html;
}

function buildScenario(project, goal, f) {
  const goalTitles = {
    compliance: f ? 'تست نفوذ کامل' : 'Full Penetration Test',
    redteam: f ? 'شبیهسازی حمله (تیم قرمز)' : 'Red Team Attack Simulation',
    vulnscan: f ? 'اسکن سریع آسیبپذیری' : 'Quick Vulnerability Scan',
    awareness: f ? 'آگاهیبخشی و آموزش' : 'Awareness & Training',
  };
  const goalDesc = {
    compliance: f ? 'پوشش کامل چرخه تست نفوذ با مستندسازی رسمی برای انطباق.' : 'Full pentest cycle with formal documentation for compliance.',
    redteam: f ? 'شبیهسازی واقعگرایانه حمله با تمرکز روی زنجیره و پایش دفاعی.' : 'Realistic attack simulation focused on kill chain and blue-team detection.',
    vulnscan: f ? 'اسکن و تریاژ سریع برای یافتن ریسکهای اصلی در زمان کوتاه.' : 'Fast scan & triage to surface high-risk issues quickly.',
    awareness: f ? 'سناریوی ساده برای آموزش و افزایش آگاهی تیم، بدون بهرهبرداری عمیق.' : 'Simple scenario to train and raise team awareness, no deep exploitation.',
  };
  const desc = {
    compliance: '🟢 ' + goalDesc.compliance,
    redteam: '🔴 ' + goalDesc.redteam,
    vulnscan: '🟡 ' + goalDesc.vulnscan,
    awareness: '🔵 ' + goalDesc.awareness,
  };

  const legal = f ? 'مجوز: فقط با اجازه کتبی. قبل از شروع، محدوده و قوانین را امضا کن.' : 'Authorization: written permission only. Sign scope & rules before starting.';

  let h = '<div style="animation:fadeIn .25s ease">';
  h += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">' +
    '<span style="font-size:2rem">' + project.icon + '</span>' +
    '<div style="flex:1;min-width:200px">' +
      '<div style="font-size:.6875rem;font-family:ui-monospace,Menlo,monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground);margin-bottom:2px">' + (f ? 'سناریوی' : 'Scenario') + ' · ' + goalTitles[goal] + '</div>' +
      '<h3 style="margin:0;font-size:1.25rem;font-weight:700">' + (f ? project.nameFa : project.name) + '</h3>' +
    '</div>' +
    '<span style="font-size:.72rem;color:var(--muted-foreground);background:var(--muted);border-radius:6px;padding:4px 10px">' + desc[goal] + '</span>' +
  '</div>';

  h += '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">';
  project.phases.forEach((ph, idx) => {
    h += '<div class="scn-phase" style="border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--card)">' +
      '<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--muted);cursor:pointer" data-phase-toggle="' + idx + '">' +
        '<span style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:var(--action);color:var(--action-foreground);font-size:.75rem;font-weight:700">' + (idx + 1) + '</span>' +
        '<span style="font-weight:600;font-size:.9375rem">' + (f ? ph.nameFa : ph.name) + '</span>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="margin-left:auto;transition:transform .2s" data-phase-chevron="' + idx + '"><path d="m6 9 6 6 6-6"/></svg>' +
      '</div>' +
      '<div class="scn-phase-body" data-phase-body="' + idx + '" style="padding:4px 16px 16px;display:flex;flex-direction:column;gap:10px">';
    ph.tasks.forEach(task => {
      h += '<div style="padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--background)">' +
        '<div style="font-size:.84375rem;line-height:1.5;margin-bottom:8px">' + (f ? task.tFa : task.t) + '</div>';
      if (task.tools.length) {
        h += '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
          task.tools.map(tid => {
            const name = (f && { 'subdomain-finder': 'یاب زیردامنه', 'whois-lookup': 'استعلام WHOIS', 'ip-info': 'اطلاعات IP', 'http-headers': 'هدرهای HTTP', 'url-analyzer': 'تحلیل URL', 'google-dorks': 'دورک گوگل', 'network-checker': 'بررسی شبکه', 'sqli-payloads': 'پیلودهای SQLi', 'xss-payloads': 'پیلودهای XSS', 'lfi-payloads': 'پیلودهای LFI', 'jwt-decoder': 'رمزگشای JWT', 'http-repeater': 'تکرارگر HTTP', 'reverse-shell': 'شل معکوس', 'notepad': 'یادداشت', 'markdown-preview': 'پیشنمایش مارکداون', 'ip-scanner': 'اسکنر IP', 'port-scanner': 'اسکنر پورت', 'port-reference': 'مرجع پورت', 'network-diag': 'تشخیص شبکه', 'msf-commands': 'دستورات MSF', 'msf-venom': 'MSF Venom', 'password-tools': 'ابزار رمز عبور', 'tunnel-tools': 'ابزار تونل', 'fsociety-tools': 'کیت Fsociety', 'dns-lookup': 'استعلام DNS', 'osint-arsenal': 'اسلحهخانه OSINT', 'email-extractor': 'استخراج ایمیل', 'env-wizard': 'جادوگر محیط', 'ngrok-tunnel': 'تونل Ngrok', 'aes-crypto': 'رمزنگاری AES', 'tty-shell': 'شل TTY' }[tid] : tid);
            return '<a href="#" data-scn-tool="' + tid + '" style="font-size:.72rem;padding:3px 10px;border:1px solid var(--border);border-radius:6px;background:var(--muted);color:var(--foreground);text-decoration:none">🔧 ' + name + '</a>';
          }).join('') +
        '</div>';
      }
      h += '</div>';
    });
    h += '</div></div>';
  });
  h += '</div>';

  h += '<div style="padding:12px 16px;border:1px solid var(--border);border-left:3px solid var(--warning);border-radius:8px;background:var(--muted);font-size:.78rem;color:var(--muted-foreground)">' + legal + '</div>';

  h += '<button id="scn-download" class="btn btn-ghost" style="margin-top:16px">' + (f ? '⬇️ دانلود سناریو (TXT)' : '⬇️ Download scenario (TXT)') + '</button>';
  h += '</div>';
  return h;
}

function openTool(id) {
  if (window.Maddix && typeof window.Maddix.openTool === 'function') {
    window.Maddix.openTool(id);
  }
}

export function init(lang) {
  const f = lang === 'fa';

  // Project selection
  document.querySelectorAll('#scn-projects .scn-project').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('#scn-projects .scn-project').forEach(b => {
        b.style.borderColor = 'var(--border)';
        b.style.background = 'var(--card)';
      });
      el.style.borderColor = 'var(--action)';
      el.style.background = 'color-mix(in srgb,var(--action) 8%,var(--card))';
      el.dataset.selected = '1';
    });
  });

  // Generate
  const genBtn = document.getElementById('scn-generate');
  if (genBtn) genBtn.addEventListener('click', () => {
    const selected = document.querySelector('#scn-projects .scn-project[data-selected="1"]');
    if (!selected) {
      const out = document.getElementById('scn-output');
      if (out) out.innerHTML = '<div style="padding:16px;border:1px solid var(--destructive);border-radius:8px;color:var(--destructive);font-size:.84375rem">' +
        (f ? '⚠️ اول یک نوع پروژه انتخاب کن.' : '⚠️ Please select a project type first.') + '</div>';
      return;
    }
    const project = PROJECTS.find(p => p.id === selected.dataset.id);
    const goal = document.getElementById('scn-goal').value;
    const out = document.getElementById('scn-output');
    if (out) {
      out.innerHTML = buildScenario(project, goal, f);
      wireOutput(f, project, goal);
    }
  });
}

function wireOutput(f, project, goal) {
  // Phase accordions — first one open
  document.querySelectorAll('.scn-phase-body').forEach((el, idx) => {
    el.style.display = idx === 0 ? 'flex' : 'none';
    const chev = document.querySelector('[data-phase-chevron="' + idx + '"]');
    if (idx === 0 && chev) chev.style.transform = 'rotate(180deg)';
    const toggle = document.querySelector('[data-phase-toggle="' + idx + '"]');
    if (toggle) toggle.addEventListener('click', () => {
      const isOpen = el.style.display === 'flex';
      el.style.display = isOpen ? 'none' : 'flex';
      if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
    });
  });

  // Tool links
  document.querySelectorAll('[data-scn-tool]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openTool(el.dataset.scnTool);
    });
  });

  // Download
  const dl = document.getElementById('scn-download');
  if (dl) dl.addEventListener('click', () => {
    const lines = [];
    const goalTitles = { compliance: f ? 'تست نفوذ کامل' : 'Full Penetration Test', redteam: f ? 'تیم قرمز' : 'Red Team', vulnscan: f ? 'اسکن سریع' : 'Quick Scan', awareness: f ? 'آگاهیبخشی' : 'Awareness' };
    lines.push('=== ' + (f ? 'سناریوی پنتست: ' : 'Pentest scenario: ') + (f ? project.nameFa : project.name) + ' ===');
    lines.push((f ? 'هدف: ' : 'Goal: ') + goalTitles[goal]);
    lines.push('');
    project.phases.forEach((ph, i) => {
      lines.push((i + 1) + '. ' + (f ? ph.nameFa : ph.name));
      ph.tasks.forEach(task => lines.push('   - ' + (f ? task.tFa : task.t)));
      lines.push('');
    });
    lines.push(f ? '⚠️ فقط با اجازه کتبی!' : '⚠️ Authorized use only!');
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'scenario-' + project.id + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
