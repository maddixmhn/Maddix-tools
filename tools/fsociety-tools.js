const toolsData = [
  { category: "Information Gathering", icon: "🔍", name: {fa: "نقشه", en: "Nmap"}, desc: {fa: "اسکنر قدرتمند شبکه و کشف پورت", en: "Powerful network scanner and port discovery"}, install: "git clone https://github.com/nmap/nmap.git && cd nmap && ./configure && make && sudo make install", usage: "nmap -sV -sC -A <target>\nnmap -p- <target>\nnmap -sP <subnet>/24" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "Setoolkit", en: "Setoolkit"}, desc: {fa: "چارچوب مهندسی اجتماعی", en: "Social Engineering Toolkit framework"}, install: "git clone https://github.com/trustedsec/social-engineer-toolkit.git && cd social-engineer-toolkit && pip install -r requirements.txt && python setup.py", usage: "setoolkit\n1) Social-Engineering Attacks\n2) Website Attack Vectors\n3) Credential Harvester" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "HostToIP", en: "HostToIP"}, desc: {fa: "تبدیل نام دامنه به آدرس IP", en: "Convert domain names to IP addresses"}, install: "git clone https://github.com/cyberheartmi9/HostToIP.git && cd HostToIP && chmod +x HostToIP.sh", usage: "./HostToIP.sh\ndomain.com" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "WPScan", en: "WPScan"}, desc: {fa: "اسکنر امنیتی وردپرس", en: "WordPress security scanner"}, install: "git clone https://github.com/wpscanteam/wpscan.git && cd wpscan && gem install bundler && bundle install", usage: "wpscan --url https://target.com\nwpscan --url https://target.com --enumerate u\nwpscan --url https://target.com --api-token <key>" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "CMSmap", en: "CMSmap"}, desc: {fa: "اسکنر CMS (وردپرس، جوملا، دروپال)", en: "CMS scanner (WordPress, Joomla, Drupal)"}, install: "git clone https://github.com/Dionach/CMSmap.git && cd CMSmap && pip install -r requirements.txt", usage: "python cmsmap.py https://target.com\npython cmsmap.py -f https://target.com -i" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "XSStrike", en: "XSStrike"}, desc: {fa: "اسکنر پیشرفته XSS", en: "Advanced XSS detection scanner"}, install: "git clone https://github.com/s0md3v/XSStrike.git && cd XSStrike && pip install -r requirements.txt", usage: "python xsstrike.py -u https://target.com\npython xsstrike.py -u https://target.com?q=test --crawl" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "Doork", en: "Doork"}, desc: {fa: "اسکنر آسیب‌پذیری وب", en: "Web vulnerability scanner"}, install: "git clone https://github.com/AeonDave/doork.git && cd doork && bundle install", usage: "ruby doork.rb -t https://target.com" },
  { category: "Information Gathering", icon: "🔍", name: {fa: "Crips", en: "Crips"}, desc: {fa: "ابزار اطلاعات شبکه و IP", en: "Network and IP information tool"}, install: "git clone https://github.com/Manisso/Crips.git && cd Crips && chmod +x Crips.sh", usage: "crips\n1) IP Geolocation\n2) DNS Lookup" },

  { category: "Password Attacks", icon: "🔑", name: {fa: "Cupp", en: "Cupp"}, desc: {fa: "تولید کننده دیکشنری رمز عبور هوشمند", en: "Intelligent password dictionary generator"}, install: "git clone https://github.com/Mebus/cupp.git && cd cupp", usage: "python cupp.py -i\npython cupp.py -w <wordlist>" },
  { category: "Password Attacks", icon: "🔑", name: {fa: "BruteX", en: "BruteX"}, desc: {fa: "حمله بروت فورس خودکار", en: "Automated brute force attack tool"}, install: "git clone https://github.com/1N3/BruteX.git && cd BruteX && bash install.sh", usage: "brutex -t <target>\nbrutex -t <target> -p ssh\nbrutex -t <target> -p ftp" },

  { category: "Wireless Testing", icon: "📡", name: {fa: "Reaver", en: "Reaver"}, desc: {fa: "حمله WPS به شبکه‌های وای‌فای", en: "WPS attack against WiFi networks"}, install: "git clone https://github.com/t6x/reaver-wps-fork-t6x.git && cd reaver-wps-fork-t6x && ./configure && make && sudo make install", usage: "reaver -i wlan0mon -b <BSSID> -vv\nreaver -i wlan0mon -b <BSSID> -vv -K 1" },
  { category: "Wireless Testing", icon: "📡", name: {fa: "Pixiewps", en: "Pixiewps"}, desc: {fa: "ابزار محاسبه PIN WPS آفلاین", en: "Offline WPS PIN computation tool"}, install: "git clone https://github.com/wiire/pixiewps.git && cd pixiewps && make && sudo make install", usage: "pixiewps --pke <pke> --pkr <pkr> --e-hash1 <hash1> --e-hash2 <hash2>" },
  { category: "Wireless Testing", icon: "📡", name: {fa: "Bluepot", en: "Bluepot"}, desc: {fa: "هانی‌پات بلوتوث", en: "Bluetooth honeypot"}, install: "git clone https://github.com/andrewmichaelsmith/bluepot.git && cd bluepot && python setup.py", usage: "python bluepot.py" },

  { category: "Exploitation Tools", icon: "💥", name: {fa: "ATSCAN", en: "ATSCAN"}, desc: {fa: "اسکنر و اکسپلویت خودکار وب", en: "Automated web scanner and exploit tool"}, install: "git clone https://github.com/AlisamTechnology/ATSCAN.git && cd ATSCAN && perl Makefile.PL && make", usage: "perl atscan.pl --target https://target.com" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "sqlmap", en: "sqlmap"}, desc: {fa: "ابزار تست نفوذ SQL Injection خودکار", en: "Automated SQL injection penetration testing"}, install: "git clone https://github.com/sqlmapproject/sqlmap.git && cd sqlmap", usage: "python sqlmap.py -u 'https://target.com?id=1' --batch\npython sqlmap.py -u 'https://target.com?id=1' --dbs\npython sqlmap.py -u 'https://target.com?id=1' --tables -D <db>" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "Shellnoob", en: "Shellnoob"}, desc: {fa: "تولید و تبدیل شل کد", en: "Shellcode generation and conversion"}, install: "git clone https://github.com/reyammer/shellnoob.git && cd shellnoob && pip install -r requirements.txt", usage: "python shellnoob.py --x86-to-x64\npython shellnoob.py --generate linux x86 execve" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "Commix", en: "Commix"}, desc: {fa: "اکسپلویت خودکار Command Injection", en: "Automated command injection exploiter"}, install: "git clone https://github.com/commixproject/commix.git && cd commix", usage: "python commix.py -u 'https://target.com?cmd=test'\npython commix.py -u 'https://target.com?cmd=test' --os=linux" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "FTP Auto Bypass", en: "FTP Auto Bypass"}, desc: {fa: "دور زدن خودکار احراز هویت FTP", en: "Automated FTP authentication bypass"}, install: "git clone https://github.com/A1S0N/FTP-Auto-Bypass.git && cd FTP-Auto-Bypass", usage: "python ftp-bypass.py -t <target>" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "JBoss-Autopwn", en: "JBoss-Autopwn"}, desc: {fa: "اکسپلویت خودکار JBoss", en: "Automated JBoss exploitation"}, install: "git clone https://github.com/SpiderLabs/jboss-autopwn.git && cd jboss-autopwn && pip install -r requirements.txt", usage: "python jboss-autopwn.py -u https://target.com" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "Blind SQLI", en: "Blind SQLI"}, desc: {fa: "ابزار SQL Injection کور", en: "Blind SQL injection exploitation tool"}, install: "git clone git://github.com/savio-code/Blind-SQL-Injection.git && cd Blind-SQL-Injection", usage: "python blind_sqli.py -u 'https://target.com?id=1' --cookie 'session=x'" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "Android PIN Cracker", en: "Android PIN Cracker"}, desc: {fa: "شکستن PIN اندروید", en: "Android PIN brute force cracker"}, install: "git clone https://github.com/Pure-L0G1C/Android-PIN-Cracker.git && cd Android-PIN-Cracker", usage: "python cracker.py -p <password_hash_file>" },
  { category: "Exploitation Tools", icon: "💥", name: {fa: "Joomla SQLi Scanner", en: "Joomla SQLi Scanner"}, desc: {fa: "اسکنر SQL Injection جوملا", en: "Joomla SQL injection vulnerability scanner"}, install: "git clone https://github.com/L0c4lh34rtz/Joomla-SQLi-Scanner.git && cd Joomla-SQLi-Scanner", usage: "python joomla_sqli.py -t https://target.com" },

  { category: "Sniffing & Spoofing", icon: "👃", name: {fa: "Setoolkit (مهندسی اجتماعی)", en: "Setoolkit"}, desc: {fa: "ابزار مهندسی اجتماعی و فیشینگ", en: "Social engineering and phishing tool"}, install: "git clone https://github.com/trustedsec/social-engineer-toolkit.git && cd social-engineer-toolkit && pip install -r requirements.txt", usage: "setoolkit\n1) Social-Engineering Attacks\n2) Website Attack Vectors\n3) Credential Harvesting" },
  { category: "Sniffing & Spoofing", icon: "👃", name: {fa: "SSLstrip", en: "SSLstrip"}, desc: {fa: "حمله ربودن نشست SSL", en: "SSL session hijacking tool"}, install: "git clone https://github.com/moxie0/sslstrip.git && cd sslstrip && python setup.py", usage: "sslstrip -l 8080\nsslstrip -l 8080 -a" },
  { category: "Sniffing & Spoofing", icon: "👃", name: {fa: "pyPISHER", en: "pyPISHER"}, desc: {fa: "ابزار فیشینگ پیشرفته", en: "Advanced phishing framework"}, install: "git clone https://github.com/KasunPriyashan/pyPISHER.git && cd pyPISHER && pip install -r requirements.txt", usage: "python pisher.py" },
  { category: "Sniffing & Spoofing", icon: "👃", name: {fa: "SMTP Mailer", en: "SMTP Mailer"}, desc: {fa: "ابزار ارسال ایمیل جعلی", en: "Fake email sender tool"}, install: "git clone https://github.com/rajkumardusad/SMTP-Mailer.git && cd SMTP-Mailer", usage: "python mailer.py -e <email> -p <password> -t <target> -s <subject> -b <body>" },

  { category: "Web Hacking", icon: "🌐", name: {fa: "Drupal Hacking", en: "Drupal Hacking"}, desc: {fa: "اسکنر آسیب‌پذیری دروپال", en: "Drupal vulnerability scanner"}, install: "git clone https://github.com/SecurityFTW/Drupal-Hacking.git && cd Drupal-Hacking", usage: "python drupal-hack.py -u https://target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "Inurlbr", en: "Inurlbr"}, desc: {fa: "جستجوی پیشرفته با Google Dork", en: "Advanced Google dork search tool"}, install: "git clone https://github.com/googleinurl/SCANNER-INURLBR.git && cd SCANNER-INURLBR", usage: "php inurlbr.php --dork 'inurl:php?id=' --site target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "WordPress/Joomla Scanner", en: "WordPress/Joomla Scanner"}, desc: {fa: "اسکنر وردپرس و جوملا", en: "WordPress and Joomla scanner"}, install: "git clone https://github.com/rastating/wordpress-scanner.git && cd wordpress-scanner && gem install bundler && bundle install", usage: "ruby wp-scanner.rb -t https://target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "Gravity Form Scanner", en: "Gravity Form Scanner"}, desc: {fa: "اسکنر فرم‌های Gravity وردپرس", en: "WordPress Gravity Forms vulnerability scanner"}, install: "git clone https://github.com/00x0a/Gravity-Form-Scanner.git && cd Gravity-Form-Scanner", usage: "python gravity-scanner.py -u https://target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "File Upload Checker", en: "File Upload Checker"}, desc: {fa: "بررسی آسیب‌پذیری آپلود فایل", en: "File upload vulnerability checker"}, install: "git clone https://github.com/almandin/FileUploadChecker.git && cd FileUploadChecker", usage: "python fuc.py -u https://target.com/upload.php" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "WordPress Exploit Scanner", en: "WordPress Exploit Scanner"}, desc: {fa: "اسکنر اکسپلویت‌های وردپرس", en: "WordPress exploit detection scanner"}, install: "git clone https://github.com/Adastra-thw/WordPress-Exploit-Scanner.git && cd WordPress-Exploit-Scanner", usage: "python wp-exploit-scanner.py -t https://target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "Shell/Directory Finder", en: "Shell/Directory Finder"}, desc: {fa: "یابنده شل و دایرکتوری مخفی", en: "Hidden shell and directory finder"}, install: "git clone https://github.com/M4DM0e/Brute-Force-Directory-Scanner.git && cd Brute-Force-Directory-Scanner", usage: "python dir-scanner.py -u https://target.com -w wordlist.txt" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "Joomla RCE", en: "Joomla RCE"}, desc: {fa: "اکسپلویت اجرای کد از راه دور جوملا", en: "Joomla remote code execution exploit"}, install: "git clone https://github.com/Tuhinshubhra/JoomlaRCE.git && cd JoomlaRCE", usage: "python joomla_rce.py -u https://target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "Vbulletin RCE", en: "Vbulletin RCE"}, desc: {fa: "اکسپلویت اجرای کد از راه دور Vbulletin", en: "Vbulletin remote code execution exploit"}, install: "git clone https://github.com/Week4n/Vbulletin-RCE.git && cd Vbulletin-RCE", usage: "python vbrce.py -u https://target.com" },
  { category: "Web Hacking", icon: "🌐", name: {fa: "Arachni", en: "Arachni"}, desc: {fa: "اسکنر امنیتی وب پیشرفته", en: "Advanced web security scanner"}, install: "git clone https://github.com/Arachni/arachni.git && cd arachni && gem install arachni", usage: "arachni https://target.com\narachni_reporter <report>.afr" },

  { category: "Post Exploitation", icon: "🔧", name: {fa: "Shell Checker", en: "Shell Checker"}, desc: {fa: "بررسی شل‌های آپلود شده", en: "Uploaded shell status checker"}, install: "git clone https://github.com/8asher/Shell-Checker.git && cd Shell-Checker", usage: "python shell-checker.py -l shell_list.txt" },
  { category: "Post Exploitation", icon: "🔧", name: {fa: "POET", en: "POET"}, desc: {fa: "ابزار نفوذ پس از اکسپلویت", en: "Post-exploitation penetration tool"}, install: "git clone https://github.com/Wanetty/POET.git && cd POET && pip install -r requirements.txt", usage: "python poet.py --target https://target.com" },
  { category: "Post Exploitation", icon: "🔧", name: {fa: "Weeman", en: "Weeman"}, desc: {fa: "HTTP سرور فیشینگ", en: "HTTP phishing server tool"}, install: "git clone https://github.com/Hypsurus/weeman.git && cd weeman && chmod +x weeman.py", usage: "python weeman.py\nset url https://target.com\nrun" },

  { category: "Fscan", icon: "🛡️", name: {fa: "Get all sites on same server", en: "Get all sites on same server"}, desc: {fa: "یافتن تمام سایت‌های روی یک سرور", en: "Discover all sites hosted on same server"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n1) Get all sites" },
  { category: "Fscan", icon: "🛡️", name: {fa: "Get Joomla/WP sites", en: "Get Joomla/WP sites"}, desc: {fa: "یافتن سایت‌های جوملا و وردپرس", en: "Find Joomla and WordPress sites"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n2) CMS Detector" },
  { category: "Fscan", icon: "🛡️", name: {fa: "Control Panel Finder", en: "Control Panel Finder"}, desc: {fa: "یافتن پنل‌های مدیریت", en: "Admin control panel finder"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n3) Control Panel Finder" },
  { category: "Fscan", icon: "🛡️", name: {fa: "Zip Finder", en: "Zip Finder"}, desc: {fa: "جستجوی فایل‌های زیپ در سرور", en: "Search for zip files on server"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n4) Zip Finder" },
  { category: "Fscan", icon: "🛡️", name: {fa: "SQLi Scanner", en: "SQLi Scanner"}, desc: {fa: "اسکنر SQL Injection", en: "SQL injection scanner"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n5) SQLi Scanner" },
  { category: "Fscan", icon: "🛡️", name: {fa: "Port Scanner", en: "Port Scanner"}, desc: {fa: "اسکنر پورت", en: "Port scanner"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n6) Port Scanner" },
  { category: "Fscan", icon: "🛡️", name: {fa: "Bypass Cloudflare", en: "Bypass Cloudflare"}, desc: {fa: "دور زدن Cloudflare برای یافتن IP واقعی", en: "Bypass Cloudflare to find real IP"}, install: "git clone https://github.com/almandin/Fscan.git && cd Fscan", usage: "python fscan.py -t <target>\n7) Bypass Cloudflare" },
];

const catOrder = ["Information Gathering", "Password Attacks", "Wireless Testing", "Exploitation Tools", "Sniffing & Spoofing", "Web Hacking", "Post Exploitation", "Fscan"];

const catLabels = {
  fa: { "Information Gathering": "جمع‌آوری اطلاعات", "Password Attacks": "حملات رمز عبور", "Wireless Testing": "تست بی‌سیم", "Exploitation Tools": "ابزارهای بهره‌برداری", "Sniffing & Spoofing": "شنود و جعل", "Web Hacking": "هک وب", "Post Exploitation": "پس از بهره‌برداری", "Fscan": "هک خصوصی وب (Fscan)" },
  en: { "Information Gathering": "Information Gathering", "Password Attacks": "Password Attacks", "Wireless Testing": "Wireless Testing", "Exploitation Tools": "Exploitation Tools", "Sniffing & Spoofing": "Sniffing & Spoofing", "Web Hacking": "Web Hacking", "Post Exploitation": "Post Exploitation", "Fscan": "Private Web Hacking (Fscan)" }
};

const quickInstall = "mkdir -p ~/fsociety-tools && cd ~/fsociety-tools && \\\n" +
  "git clone https://github.com/nmap/nmap.git && \\\n" +
  "git clone https://github.com/trustedsec/social-engineer-toolkit.git && \\\n" +
  "git clone https://github.com/wpscanteam/wpscan.git && \\\n" +
  "git clone https://github.com/sqlmapproject/sqlmap.git && \\\n" +
  "git clone https://github.com/Dionach/CMSmap.git && \\\n" +
  "git clone https://github.com/s0md3v/XSStrike.git && \\\n" +
  "git clone https://github.com/commixproject/commix.git && \\\n" +
  "git clone https://github.com/1N3/BruteX.git && \\\n" +
  "git clone https://github.com/Mebus/cupp.git && \\\n" +
  "git clone https://github.com/t6x/reaver-wps-fork-t6x.git && \\\n" +
  "git clone https://github.com/Arachni/arachni.git && \\\n" +
  "echo 'All tools cloned successfully!'";

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderCard(tool, lang) {
  const isFa = lang === 'fa';
  const desc = isFa ? tool.desc.fa : tool.desc.en;
  const name = isFa ? tool.name.fa : tool.name.en;
  const label = isFa ? "نصب" : "Install";
  const copyLabel = isFa ? "کپی" : "Copy";
  const usageLabel = isFa ? "مثال‌های استفاده" : "Usage Examples";
  return `<div class="panel fs-tool-card" data-cat="${escapeHtml(tool.category)}" style="padding:16px;margin-bottom:12px;border-radius:var(--radius-sm);background:var(--bg-2);border:1px solid var(--border);transition:border-color .2s">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
        <span style="font-size:1.3rem;flex-shrink:0">${tool.icon}</span>
        <div>
          <div style="font-weight:600;font-size:.95rem;color:var(--accent)">${escapeHtml(name)}</div>
          <div style="font-size:.78rem;color:var(--muted-foreground);margin-top:2px">${escapeHtml(desc)}</div>
        </div>
      </div>
      <span class="chip" style="flex-shrink:0;font-size:.7rem;padding:2px 10px;border-radius:99px;background:var(--bg-3);color:var(--text-2)">${isFa ? catLabels.fa[tool.category] : tool.category}</span>
    </div>
    <details style="margin-top:10px">
      <summary style="cursor:pointer;font-size:.78rem;color:var(--text-2);user-select:none">${usageLabel}</summary>
      <pre style="margin:8px 0 0;padding:10px;background:var(--bg-3);border-radius:6px;overflow:auto;font-size:.75rem;line-height:1.5;white-space:pre-wrap;word-break:break-word;font-family:monospace">${escapeHtml(tool.usage)}</pre>
    </details>
    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
      <button class="secondary-btn fs-copy-install" data-install="${escapeHtml(tool.install)}" style="font-size:.78rem">${label}</button>
      <button class="secondary-btn fs-copy-cmd" data-cmd="${escapeHtml(tool.install)}" style="font-size:.78rem">${copyLabel}</button>
    </div>
  </div>`;
}

export default function render(lang) {
  const isFa = lang === 'fa';
  const categories = catOrder;
  const allLabel = isFa ? "همه" : "All";
  const searchPlaceholder = isFa ? "جستجوی ابزار..." : "Search tools...";
  const title = isFa ? "راهنمای ابزارهای fsociety" : "fsociety Toolkit Reference";
  const subtitle = isFa ? "مجموعه کاملی از ابزارهای هک و تست نفوذ" : "Complete collection of hacking & penetration testing tools";
  const quickLabel = isFa ? "نصب سریع همه ابزارها" : "Quick Install All Tools";
  const copyAllLabel = isFa ? "کپی دستور نصب همه" : "Copy All Install Cmd";
  const totalLabel = isFa ? "تعداد ابزارها" : "Total tools";

  const catBtns = categories.map((c, i) =>
    `<button class="tab${i === 0 ? ' active' : ''}" data-tab="fs-cat-${i}" data-cat="${escapeHtml(c)}" style="font-size:.78rem;padding:6px 14px">${isFa ? catLabels.fa[c] : c}</button>`
  ).join('');

  const toolCards = toolsData.map(t => renderCard(t, lang)).join('');

  return `
<div style="margin-bottom:16px">
  <h3>${title}</h3>
  <p style="color:var(--muted-foreground);font-size:.875rem;margin:4px 0 0">${subtitle}</p>
</div>
<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
  <input id="fs-search" type="text" placeholder="${searchPlaceholder}" style="flex:1;min-width:180px;padding:8px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-2);color:var(--text);font-size:.8rem" />
  <button class="primary" id="fs-install-all" style="font-size:.78rem;white-space:nowrap" title="${copyAllLabel}">📥 ${quickLabel}</button>
</div>
<div style="font-size:.75rem;color:var(--muted-foreground);margin-bottom:10px">${totalLabel}: ${toolsData.length}</div>
<div class="tabs" id="fs-tabs" style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px">
  ${catBtns}
</div>
<div id="fs-cards-container">
  ${toolCards}
</div>
<textarea id="fs-clipboard-helper" style="position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0" readonly></textarea>`;
}

export function init(lang) {
  const container = document.getElementById('content');
  const isFa = lang === 'fa';

  function filterTools() {
    const searchVal = (document.getElementById('fs-search').value || '').toLowerCase();
    const activeCat = container.querySelector('#fs-tabs .tab.active');
    const selectedCat = activeCat ? activeCat.getAttribute('data-cat') : null;
    const cards = container.querySelectorAll('.fs-tool-card');

    cards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const text = card.textContent.toLowerCase();
      const matchCat = !selectedCat || cat === selectedCat;
      const matchSearch = !searchVal || text.includes(searchVal);
      card.style.display = matchCat && matchSearch ? '' : 'none';
    });
  }

  container.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (tab && tab.closest('#fs-tabs')) {
      container.querySelectorAll('#fs-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterTools();
      return;
    }

    const installBtn = e.target.closest('.fs-copy-install');
    if (installBtn) {
      const cmd = installBtn.getAttribute('data-install');
      const ta = document.getElementById('fs-clipboard-helper');
      ta.value = cmd;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.select();
      document.execCommand('copy');
      ta.style.position = 'absolute';
      const orig = installBtn.textContent;
      installBtn.textContent = isFa ? '✅ کپی شد' : '✅ Copied';
      setTimeout(() => { installBtn.textContent = orig; }, 1500);
      return;
    }

    const copyBtn = e.target.closest('.fs-copy-cmd');
    if (copyBtn) {
      const cmd = copyBtn.getAttribute('data-cmd');
      const ta = document.getElementById('fs-clipboard-helper');
      ta.value = cmd;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.select();
      document.execCommand('copy');
      ta.style.position = 'absolute';
      const orig = copyBtn.textContent;
      copyBtn.textContent = isFa ? '✅ کپی شد' : '✅ Copied';
      setTimeout(() => { copyBtn.textContent = orig; }, 1500);
      return;
    }

    const installAll = e.target.closest('#fs-install-all');
    if (installAll) {
      const ta = document.getElementById('fs-clipboard-helper');
      ta.value = quickInstall;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.select();
      document.execCommand('copy');
      ta.style.position = 'absolute';
      const orig = installAll.innerHTML;
      installAll.innerHTML = isFa ? '📋 کپی شد!' : '📋 Copied!';
      setTimeout(() => { installAll.innerHTML = orig; }, 2000);
    }
  });

  container.addEventListener('input', (e) => {
    if (e.target.id === 'fs-search') {
      filterTools();
    }
  });
}
