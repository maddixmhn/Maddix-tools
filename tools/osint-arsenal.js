const REPO = 'https://github.com/rawfilejson/awesome-osint-arsenal';

const installScripts = [
  { file: 'install.sh', icon: '📦', use: 'Everything — 753+ tools in one go', useFa: 'همهچیز — ۷۵۳+ ابزار در یک فرمان' },
  { file: 'osint.sh', icon: '🔍', use: 'OSINT only (Sherlock, Maigret, Amass, …)', useFa: 'فقط OSINT (شرلوک، مایگره، آمس و...)', noSudo: false },
  { file: 'redteam.sh', icon: '⚔️', use: 'Red team (Sliver, BloodHound, Mimikatz, Nuclei, …)', useFa: 'تیم قرمز (Sliver، BloodHound، Mimikatz، Nuclei و...)' },
  { file: 'blueteam.sh', icon: '🛡️', use: 'Blue team (Wazuh, Sigma, Suricata, Velociraptor, …)', useFa: 'تیم آبی (Wazuh، Sigma، Suricata، Velociraptor و...)' },
  { file: 'forensics.sh', icon: '🔬', use: 'DFIR + RE (Volatility, Ghidra, radare2, …)', useFa: 'بازپزشکی دیجیتال + مهندسی معکوس (Volatility، Ghidra، radare2 و...)' },
  { file: 'hardware.sh', icon: '🔌', use: 'Hardware + SDR (binwalk, hackrf, openocd, …)', useFa: 'سختافزار + SDR (binwalk، hackrf، openocd و...)' },
  { file: 'labs.sh', icon: '🎓', use: 'Vulnerable apps for practice (DVWA, Juice Shop, …)', useFa: 'اپلیکیشنهای آسیبپذیر برای تمرین (DVWA، Juice Shop و...)' },
  { file: 'termux.sh', icon: '📱', use: 'Android (Termux subset, no sudo needed)', useFa: 'اندروید (زیرمجموعه ترموکس، بدون نیاز به sudo)' },
];

const categoryGroups = [
  { group: '🔭 Reconnaissance & Discovery', groupFa: '🔭 شناسایی و کشف', cats: ['Username & Social Media OSINT', 'Email OSINT Tools', 'Phone Number OSINT', 'Domain & IP OSINT', 'Geolocation & Maps OSINT', 'Image & Video OSINT', 'Facial Recognition & People Search', 'Social Media Monitoring'] },
  { group: '💥 Data Breaches & Leaks', groupFa: '💥 نشت داده و لیکها', cats: ['Data Breach & Leak Search Engines', 'WikiLeaks, DDoSecrets & Whistleblower Platforms', 'Password Cracking & Credential Tools'] },
  { group: '🕶️ Dark Web & Privacy', groupFa: '🕶️ دارک وب و حریم خصوصی', cats: ['Dark Web Search Engines & Tools', 'Anonymous & Privacy Tools'] },
  { group: '⚔️ Offensive Security', groupFa: '⚔️ امنیت تهاجمی', cats: ['Web Application OSINT & Scanning', 'Social Engineering & Phishing', 'Vulnerability Scanning & Exploitation', 'Network & Wireless Tools', 'Mobile Hacking & Phone Exploitation'] },
  { group: '🧠 Intelligence & Analysis', groupFa: '🧠 هوش و تحلیل', cats: ['AI-Powered OSINT & Free AI Tools', 'Financial & Corporate Intelligence', 'Vehicle, Property & Public Records', 'Metadata & Digital Forensics'] },
  { group: '👁️ Surveillance & Dorking', groupFa: '👁️ نظارت و دورک', cats: ['IP Camera & Webcam OSINT', 'Google Dorking Bible', 'Credential & Data Dorking', 'IP Tracking & Geolocation Links'] },
  { group: '🌐 Community & Platforms', groupFa: '🌐 انجمنها و پلتفرمها', cats: ['Telegram OSINT Bots & Channels', 'Russian OSINT & Person Lookup Services', 'Social Media Searcher Platforms'] },
  { group: '🧰 Toolkits & Frameworks', groupFa: '🧰 کیتها و فریمورکها', cats: ['Termux Hacking Toolkit (Complete)', 'Kali Linux OSINT Toolkit', 'All-in-One Hacking Frameworks', 'Wordlist Generation & Brute Force'] },
  { group: '🖥️ Hardware & Operating Systems', groupFa: '🖥️ سختافزار و سیستمعاملها', cats: ['Hardware Hacking Tools', 'OSINT Operating Systems'] },
  { group: '👨‍💻 Developer & Learning', groupFa: '👨‍💻 توسعهدهنده و یادگیری', cats: ['OSINT APIs & Developer Tools', 'Browser Extensions for OSINT', 'OSINT Learning Resources', 'Awesome OSINT GitHub Repos'] },
  { group: '⚡ Quick Reference', groupFa: '⚡ مرجع سریع', cats: ['One-Click Install Scripts', 'Top 50 Must-Have Tools'] },
  { group: '⚔️ Red Team & Blue Team', groupFa: '⚔️ تیم قرمز و تیم آبی', cats: ['Red Team & Offensive Security', 'Blue Team & Defensive Security', 'Threat Intel Platforms'] },
  { group: '🔬 Forensics, Hardware & Training', groupFa: '🔬 بازپزشکی، سختافزار و آموزش', cats: ['Digital Forensics & Reverse Engineering', 'Training, Labs & CTF', 'Bug Bounty Platforms'] },
  { group: '📚 Knowledge & Curated Additions', groupFa: '📚 دانش و افزودهها', cats: ['Learning Resources', 'Extra Tools (curated additions)'] },
  { group: '🇬🇪 Country-Specific OSINT', groupFa: '🇬🇪 OSINT کشور خاص', cats: ['Georgian OSINT Arsenal (500+ resources)'] },
];

const topTools = [
  {
    title: 'Username & Social Media', titleFa: 'نام کاربری و شبکههای اجتماعی', icon: '🎯',
    items: [
      { n: 'Sherlock', d: 'Find usernames across 400+ social networks', dFa: 'جستجوی نام کاربری در ۴۰۰+ شبکه اجتماعی', c: 'pip install sherlock-project' },
      { n: 'Maigret', d: 'Advanced Sherlock fork — 3000+ sites', dFa: 'نسخه پیشرفته شرلوک — ۳۰۰۰+ سایت', c: 'pip install maigret' },
      { n: 'Blackbird', d: 'Fast username search tool', dFa: 'ابزار سریع جستجوی نام کاربری', c: 'pip install blackbird-osint' },
      { n: 'NExfil', d: 'Find profiles by username', dFa: 'یافتن پروفایلها با نام کاربری', c: 'pip install nexfil' },
      { n: 'Holehe', d: 'Check if email is registered on 120+ sites', dFa: 'بررسی ثبت بودن ایمیل در ۱۲۰+ سایت', c: 'pip install holehe' },
      { n: 'WhatsMyName', d: 'Web-based username enumeration', dFa: 'بررسی نام کاربری آنلاین', c: 'whatsmyname.app' },
      { n: 'OSINT Framework', d: 'Visual map of all OSINT tools', dFa: 'نقشه بصری تمام ابزارهای OSINT', c: 'osintframework.com' },
    ],
  },
  {
    title: 'Email OSINT', titleFa: 'ایمیل', icon: '📧',
    items: [
      { n: 'h8mail', d: 'Email OSINT & breach hunting', dFa: 'OSINT ایمیل و شکار نشت', c: 'pip install h8mail' },
      { n: 'theHarvester', d: 'Email & domain harvester', dFa: 'جمعآوری ایمیل و دامنه', c: 'pip install theHarvester' },
      { n: 'EmailRep', d: 'Email reputation lookup', dFa: 'بررسی اعتبار ایمیل', c: 'emailrep.io' },
      { n: 'Hunter.io', d: 'Find professional emails', dFa: 'یافتن ایمیلهای کاری', c: 'hunter.io' },
      { n: 'Phonebook.cz', d: 'Email, domain & URL search', dFa: 'جستجوی ایمیل، دامنه و URL', c: 'phonebook.cz' },
      { n: 'Epieos', d: 'Get info linked to email', dFa: 'دریافت اطلاعات مرتبط با ایمیل', c: 'epieos.com' },
    ],
  },
  {
    title: 'Phone Number', titleFa: 'شماره تلفن', icon: '📱',
    items: [
      { n: 'PhoneInfoga', d: 'Advanced phone number scanner', dFa: 'اسکنر پیشرفته شماره تلفن', c: 'pip install phoneinfoga' },
      { n: 'Ignorant', d: 'Check phone registrations on sites', dFa: 'بررسی ثبت شماره در سایتها', c: 'pip install ignorant' },
      { n: 'Truecaller', d: 'Caller ID & spam lookup', dFa: 'شناسایی تماسگیرنده', c: 'truecaller.com' },
      { n: 'GetContact', d: 'See how a number is saved by others', dFa: 'مشاهده نحوه ذخیره شماره توسط دیگران', c: 'getcontact.com' },
      { n: 'SpyDialer', d: 'Free reverse phone lookup', dFa: 'جستجوی معکوس رایگان شماره', c: 'spydialer.com' },
    ],
  },
  {
    title: 'Domain & IP', titleFa: 'دامنه و آیپی', icon: '🌐',
    items: [
      { n: 'Amass', d: 'In-depth DNS enumeration', dFa: 'شمارش عمیق DNS', c: 'go install github.com/owasp-amass/amass/v4/...@master' },
      { n: 'Subfinder', d: 'Fast passive subdomain discovery', dFa: 'کشف سریع و غیرفعال زیردامنه', c: 'go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest' },
      { n: 'Sublist3r', d: 'Subdomain enumeration', dFa: 'شمارش زیردامنه', c: 'pip install sublist3r' },
      { n: 'Shodan', d: 'Internet-connected device search', dFa: 'جستجوی دستگاههای متصل', c: 'shodan.io' },
      { n: 'crt.sh', d: 'Certificate transparency search', dFa: 'جستجوی شفافیت گواهی', c: 'crt.sh' },
      { n: 'Nmap', d: 'Network scanner & mapper', dFa: 'اسکنر و نقشهساز شبکه', c: 'apt install nmap' },
      { n: 'VirusTotal', d: 'Domain/IP/file analysis', dFa: 'تحلیل دامنه/آیپی/فایل', c: 'virustotal.com' },
    ],
  },
  {
    title: 'Geolocation & Maps', titleFa: 'موقعیت مکانی و نقشه', icon: '🗺️',
    items: [
      { n: 'SunCalc', d: 'Sun position/time calculator from photos', dFa: 'محاسبه موقعیت خورشید از روی عکس', c: 'suncalc.org' },
      { n: 'Overpass Turbo', d: 'OpenStreetMap data query', dFa: 'پرسوجوی دادههای OpenStreetMap', c: 'overpass-turbo.eu' },
      { n: 'GeoSpy', d: 'AI-powered image geolocation', dFa: 'موقعیتیابی تصویر با هوش مصنوعی', c: 'geospy.ai' },
      { n: 'ShadowMap', d: 'Shadow analysis for time estimation', dFa: 'تحلیل سایه برای تخمین زمان', c: 'shadowmap.org' },
      { n: 'Sentinel Hub', d: 'Satellite imagery access', dFa: 'دسترسی به تصاویر ماهوارهای', c: 'sentinel-hub.com' },
      { n: 'Mapillary', d: 'Street-level imagery', dFa: 'تصاویر سطح خیابان', c: 'mapillary.com' },
    ],
  },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function(lang) {
  const f = lang === 'fa';
  const repoLink = '<a href="' + REPO + '" target="_blank" rel="noopener" style="color:var(--action);text-decoration:underline">' + (f ? 'مخزن در گیتهاب' : 'GitHub repository') + '</a>';

  let html = '<div style="padding:16px">';

  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">' +
    '<span style="font-size:2.2rem">🔍</span>' +
    '<div>' +
      '<h2 style="margin:0;font-size:1.25rem;font-weight:600">' + (f ? 'اسلحهخانه OSINT' : 'OSINT Arsenal') + '</h2>' +
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">' + (f ? 'بیش از ۷۵۳ ابزار، ۵۰ دستهبندی، نصبکننده چند توزیعی' : '753+ tools · 50 categories · multi-distro installers') + '</p>' +
    '</div>' +
  '</div>';

  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:20px">' +
    '<div class="jn-card" style="padding:12px;text-align:center"><div style="font-size:1.4rem">🛠️</div><div style="font-size:1.15rem;font-weight:700">753+</div><div style="font-size:.75rem;color:var(--muted-foreground)">' + (f ? 'ابزار' : 'Tools') + '</div></div>' +
    '<div class="jn-card" style="padding:12px;text-align:center"><div style="font-size:1.4rem">📂</div><div style="font-size:1.15rem;font-weight:700">50</div><div style="font-size:.75rem;color:var(--muted-foreground)">' + (f ? 'دستهبندی' : 'Categories') + '</div></div>' +
    '<div class="jn-card" style="padding:12px;text-align:center"><div style="font-size:1.4rem">💻</div><div style="font-size:1.15rem;font-weight:700">167+</div><div style="font-size:.75rem;color:var(--muted-foreground)">' + (f ? 'ابزار CLI' : 'CLI tools') + '</div></div>' +
    '<div class="jn-card" style="padding:12px;text-align:center"><div style="font-size:1.4rem">🤖</div><div style="font-size:1.15rem;font-weight:700">25+</div><div style="font-size:.75rem;color:var(--muted-foreground)">' + (f ? 'ابزار AI' : 'AI tools') + '</div></div>' +
    '<div class="jn-card" style="padding:12px;text-align:center"><div style="font-size:1.4rem">🌐</div><div style="font-size:1.15rem;font-weight:700">461+</div><div style="font-size:.75rem;color:var(--muted-foreground)">' + (f ? 'پلتفرم آنلاین' : 'Online platforms') + '</div></div>' +
  '</div>';

  html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">' + repoLink + '</div>';

  html += '<h3 style="font-size:1rem;font-weight:600;margin:0 0 12px">' + (f ? '⚙️ نصب سریع' : '⚙️ Quick install') + '</h3>';
  html += '<div style="margin-bottom:8px;padding:12px;background:var(--muted);border-radius:var(--radius)">' +
    '<div style="font-size:.8125rem;font-weight:600;margin-bottom:8px">' + (f ? 'همه ابزارها در یک فرمان' : 'Everything in one command') + '</div>' +
    '<code class="jn-click-copy" style="display:block;padding:8px 12px;background:var(--card);border-radius:6px;font-size:.78rem;cursor:pointer;white-space:pre-wrap">git clone ' + REPO + ' && cd awesome-osint-arsenal && sudo bash install.sh</code>' +
  '</div>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-bottom:8px">';
  installScripts.forEach(s => {
    html += '<div class="jn-card" style="padding:12px">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span>' + s.icon + '</span><code style="font-weight:600;font-size:.8125rem">' + s.file + '</code></div>' +
      '<div style="font-size:.75rem;color:var(--muted-foreground);margin-bottom:8px;line-height:1.5">' + (f ? s.useFa : s.use) + '</div>' +
      '<code class="jn-click-copy" style="display:block;padding:6px 10px;background:var(--muted);border-radius:6px;font-size:.72rem;cursor:pointer">sudo bash ' + s.file + '</code>' +
    '</div>';
  });
  html += '</div>';
  html += '<div style="margin-bottom:20px;padding:10px 12px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground)">' +
    (f ? 'بازه نصب: بهترین روی Kali / Debian / Ubuntu / Parrot / Mint / Pop!_OS — پشتیبانی جزئی روی Arch / Fedora — زیرمجموعه روی Termux (بدون sudo).' : 'Primary: Kali / Debian / Ubuntu / Parrot / Mint / Pop!_OS — partial on Arch / Fedora — Termux subset (no sudo).') +
  '</div>';

  html += '<h3 style="font-size:1rem;font-weight:600;margin:0 0 12px">' + (f ? '📂 دستهبندیها (۵۰ دسته)' : '📂 Categories (50)') + '</h3>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-bottom:20px">';
  categoryGroups.forEach(g => {
    html += '<div class="jn-card" style="padding:14px">' +
      '<div style="font-size:.8125rem;font-weight:600;margin-bottom:8px;color:var(--action)">' + (f ? g.groupFa : g.group) + '</div>' +
      g.cats.map(c => '<div style="font-size:.78rem;padding:3px 0;color:var(--muted-foreground)">• ' + esc(c) + '</div>').join('') +
    '</div>';
  });
  html += '</div>';

  html += '<h3 style="font-size:1rem;font-weight:600;margin:0 0 12px">' + (f ? '🔥 ابزارهای برتر' : '🔥 Top tools') + '</h3>';
  topTools.forEach(t => {
    html += '<div class="jn-card" style="padding:16px;margin-bottom:12px">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.2rem">' + t.icon + '</span><h4 style="margin:0;font-size:.9375rem;font-weight:600">' + (f ? t.titleFa : t.title) + '</h4></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px">';
    t.items.forEach(it => {
      const link = /^(https?:\/\/|pip install|go install|apt install|git clone|gem install|npm install)/.test(it.c) ? it.c : 'https://' + it.c;
      html += '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
        '<span style="font-weight:600;font-size:.8rem;min-width:130px">' + it.n + '</span>' +
        '<span style="flex:1;font-size:.75rem;color:var(--muted-foreground);min-width:160px">' + (f ? it.dFa : it.d) + '</span>' +
        '<a href="' + link + '" target="_blank" rel="noopener" style="font-size:.72rem;color:var(--action);text-decoration:none;border:1px solid var(--border);border-radius:6px;padding:3px 8px;white-space:nowrap">' + (f ? 'باز کردن' : 'Open') + '</a>' +
      '</div>';
    });
    html += '</div></div>';
  });

  html += '<div style="margin-top:8px;padding:14px;background:var(--muted);border-radius:var(--radius)">' +
    '<h4 style="margin:0 0 8px;font-size:.9375rem">' + (f ? '⚠️ نکته قانونی' : '⚠️ Legal notice') + '</h4>' +
    '<p style="margin:0;font-size:.78rem;color:var(--muted-foreground);line-height:1.6">' +
      (f ? 'این مخزن فقط برای تحقیقات امنیتی آموزشی و مجاز است. قبل از تست هر سیستمی که مال شما نیست، اجازه کتبی بگیرید.' : 'This repository is for educational and authorized security research only. Always obtain written permission before testing systems you do not own.') +
    '</p>' +
  '</div>';

  html += '</div>';
  return html;
}

export function init(lang) {
  const els = document.querySelectorAll('.jn-click-copy');
  for (let i = 0; i < els.length; i++) {
    (function(el) {
      el.addEventListener('click', function() {
        const txt = el.textContent.trim();
        navigator.clipboard.writeText(txt).catch(function() {});
      });
    })(els[i]);
  }
}
