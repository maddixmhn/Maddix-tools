export default function(lang) {
  var isFa = lang === 'fa';
  var faDesc = ['تحليل ترافيك شبكه', 'شنود بسته ها در خط فرمان', 'شنود و MITM در شبكه', 'اسكنر شبكه و كشف سرويس', 'شنود پروتكل هاي احراز', 'پروكسي MITM', 'شنود جلسات وب', 'شنود وايرلس', 'Keylogger با پايتون', 'رديابي دستگاه ها', 'شنود ايميل SMTP', 'آنتی ويروس متن باز'];
  var enDesc = ['Network traffic analysis', 'CLI packet sniffer', 'Network sniffing and MITM', 'Network scanner and discovery', 'Windows auth sniffer', 'Interactive MITM proxy', 'Android session hijacking', 'Wireless sniffing suite', 'Python keylogger', 'Device tracking', 'SMTP email interception', 'Open source antivirus'];
  var cmds = ['wireshark', 'tcpdump -i eth0', 'sudo bettercap', 'nmap -sV -sC target', 'sudo responder -I eth0', 'mitmproxy', 'droidsheep', 'airodump-ng wlan0', 'python3 keylogger.py', 'snoopy', 'sudo tcpdump port 25', 'clamscan /target'];
  var names = ['Wireshark', 'TCPDump', 'BetterCAP', 'Nmap', 'Responder', 'MITMProxy', 'DroidSheep', 'Aircrack-ng', 'Keylogger', 'Snoopy', 'SMTP Log', 'ClamAV'];
  var emojis = ['📡','🎧','📸','🔍','🎙️','🕸️','📱','📻','🖥️','👁️','📨','📂'];
  var descs = isFa ? faDesc : enDesc;
  var cards = '';
  for (var i = 0; i < names.length; i++) {
    cards += '<div class="jn-card" style="padding:16px;border-radius:var(--radius)">'+
      '<div style="display:flex;align-items:flex-start;gap:10px">'+
        '<span style="font-size:1.5rem;flex-shrink:0">'+emojis[i]+'</span>'+
        '<div>'+
          '<h3 style="margin:0;font-size:.9375rem;font-weight:600">'+names[i]+'</h3>'+
          '<p style="margin:4px 0 8px;font-size:.8125rem;color:var(--muted-foreground)">'+descs[i]+'</p>'+
          '<code class="jn-click-copy" style="display:block;padding:6px 10px;background:var(--muted);border-radius:6px;font-size:.75rem;cursor:pointer">'+cmds[i]+' <span style="font-size:.7rem;opacity:.6">'+'📋'+'</span></code>'+
        '</div>'+
      '</div>'+
    '</div>';
  }
  return (
    '<div style="padding:16px">'+
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">'+
        '<span style="font-size:2rem">🕵️</span>'+
        '<div>'+
          '<h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(isFa?'ابزارهاي جاسوسي':'Spy Tools')+'</h2>'+
          '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(isFa?'مجموعه ابزارهاي جاسوسي و شنود':'Espionage and surveillance tools')+'</p>'+
        '</div>'+
      '</div>'+
      '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">'+cards+'</div>'+
      '<div style="margin-top:24px;padding:16px;background:var(--muted);border-radius:var(--radius)">'+
        '<h3 style="margin:0 0 8px;font-size:1rem">'+(isFa?'نكته قانوني':'Legal Notice')+'</h3>'+
        '<p style="margin:0;font-size:.8125rem;color:var(--muted-foreground);line-height:1.6">'+
          (isFa?'اين ابزارها فقط براي تست نفوذ مجاز و آموزش امنيت سايبري قابل استفاده هستند.':'These tools are for authorized penetration testing and cybersecurity education only.')+
        '</p>'+
      '</div>'+
    '</div>'
  );
}
export function init(lang){
  var els = document.querySelectorAll('.jn-click-copy');
  for (var i = 0; i < els.length; i++) {
    (function(el){
      el.addEventListener('click', function(){
        var txt = el.textContent.replace('📋','').trim();
        navigator.clipboard.writeText(txt).catch(function(){});
      });
    })(els[i]);
  }
}
