export default function(lang) {
  var f = lang === 'fa';
  var stats = [
    [(f?'پلتفرم':'Platform'),'Go + React (TypeScript)',(f?'Go + React (TypeScript)':'Go + React (TypeScript)')],
    [(f?'مجوز':'License'),'MIT',(f?'MIT':'MIT')],
    [(f?'ستاره‌ها':'Stars'),'181 ⭐',(f?'۱۸۱ ⭐':'181 ⭐')],
    [(f?'تعداد Forks':'Forks'),'14',(f?'۱۴':'14')],
    [(f?'به‌روزرسانی':'Updated'),(f?'خرداد ۱۴۰۵':'Jun 2026'),(f?'خرداد ۱۴۰۵':'Jun 2026')],
    [(f?'زبان اصلی':'Main Language'),'Kotlin (Desktop)',(f?'Kotlin (Desktop)':'Kotlin (Desktop)')],
  ];
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📡</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">NovaRadar</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'اسکنر IP کلاودفلر دسکتاپ با تأیید دو مرحله‌ای TCP+TLS (۱۸۱ ⭐)':'Desktop Cloudflare IP scanner with dual TCP+TLS verification (181 ⭐)')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="nr-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-nrtab="overview">'+(f?'معرفی':'Overview')+'</button>'+
      '<button data-nrtab="install">'+(f?'نصب':'Install')+'</button>'+
      '<button data-nrtab="usage">'+(f?'استفاده':'Usage')+'</button>'+
    '</div>'+
    '<div class="nrtab-content" data-nrtab="overview">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+(f?'نوا رادار چیست؟':'What is NovaRadar?')+'</h3>'+
        '<p style="font-size:.875rem;line-height:1.6;color:var(--text-dim,#aaa)">'+
          (f?'نوا رادار یک اسکنر IP دسکتاپ است که با Go + React ساخته شده. محدوده IPهای کلاودفلر را از چندین منبع قابل انتخاب اسکن می‌کند، تأیید دو مرحله‌ای واقعی (TCP + TLS handshake) انجام می‌دهد و Workerهای معتبر با سرعت بالا خروجی می‌دهد.':'NovaRadar is a desktop IP scanner built with Go + React. It scans Cloudflare IP ranges from multiple selectable sources, performs real two-phase verification (TCP + TLS handshake), and outputs valid, high-speed workers.')+
        '</p>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-bottom:12px">'+
        ['🌐 '+(f?'اسکن IP از چند منبع':'Multi-source IP scanning'),'🔍 '+(f?'تأیید TCP + TLS':'TCP + TLS verification'),'⚡ '+(f?'خروجی Workerهای سریع':'Fast worker output'),'🖥️ '+(f?'رابط دسکتاپ Go+React':'Go+React desktop UI'),'📊 '+(f?'نمایش نتایج با tabs':'Tabbed results view'),'💾 '+(f?'ذخیره نتایج':'Save/export results')].map(function(s){ return '<div style="padding:10px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;font-size:.8125rem;color:var(--text,#ccc)">'+s+'</div>'; }).join('')+
      '</div>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
        '<a href="https://github.com/IRNova/NovaRadar" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:#333;color:#fff;text-decoration:none;font-size:.8125rem;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">🐙</span> GitHub</a>'+
        '<a href="https://github.com/IRNova/NovaRadar/releases" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:var(--primary,#00c8ff);color:#000;text-decoration:none;font-size:.8125rem;font-weight:600;display:inline-flex;align-items:center;gap:6px">⬇ '+(f?'دانلود':'Download')+'</a>'+
      '</div>'+
      '<div style="margin-top:16px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'آمار پروژه':'Project Stats')+'</h3>'+
        '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
          '<tbody>'+
          stats.map(function(r){ return '<tr>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text-dim,#aaa);width:120px;font-weight:600">'+r[0]+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text,#ccc)">'+(f?r[2]:r[1])+'</td>'+
          '</tr>'; }).join('')+
        '</tbody></table>'+
      '</div>'+
    '</div>'+
    '<div class="nrtab-content" data-nrtab="install" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'روش‌های نصب':'Installation Methods')+'</h3>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'دانلود باینری (پیشنهادی)':'Download Binary (Recommended)')+'</div>'+
          '<div style="font-size:.8125rem;color:var(--text,#ccc);margin-bottom:6px">'+(f?'آخرین نسخه را از بخش Releases دانلود کنید:':'Download the latest version from Releases:')+'</div>'+
          '<a href="https://github.com/IRNova/NovaRadar/releases" target="_blank" rel="noopener" style="padding:8px 16px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;text-decoration:none;font-size:.8125rem;font-weight:600;display:inline-block">⬇ '+(f?'دانلود NovaRadar':'Download NovaRadar')+'</a>'+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'ساخت از سورس':'Build from Source')+'</div>'+
          '<div style="font-size:.8125rem;color:var(--text,#ccc);margin-bottom:6px">'+(f?'پیش‌نیاز: Go 1.21+ و Node.js 18+':'Prerequisites: Go 1.21+ and Node.js 18+')+'</div>'+
          '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:10px;font-family:monospace;font-size:.8125rem;color:var(--primary,#00c8ff);word-break:break-all">git clone https://github.com/IRNova/NovaRadar.git<br>cd NovaRadar<br>go build -o novaradar ./cmd/novaradar<br>./novaradar</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="nrtab-content" data-nrtab="usage" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'راهنمای استفاده':'Usage Guide')+'</h3>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'مراحل استفاده':'How to Use')+'</div>'+
          '<ol style="margin:0;padding-left:16px;line-height:1.8;font-size:.8125rem;color:var(--text-dim,#aaa)">'+
            '<li>'+(f?'برنامه NovaRadar را اجرا کنید':'Launch NovaRadar')+'</li>'+
            '<li>'+(f?'یک یا چند منبع IP را انتخاب کنید (Cloudflare Main، CF IPv4، CF IPv6، ...)':'Select one or more IP sources (Cloudflare Main, CF IPv4, CF IPv6, ...)')+'</li>'+
            '<li>'+(f?'روی Start Scan کلیک کنید':'Click Start Scan')+'</li>'+
            '<li>'+(f?'منتظر بمانید تا اسکن کامل شود (TCP + TLS verification)':'Wait for scan to complete (TCP + TLS verification)')+'</li>'+
            '<li>'+(f?'نتایج را در تب‌های مختلف مشاهده کنید':'View results in different tabs')+'</li>'+
            '<li>'+(f?'IPهای معتبر را ذخیره یا کپی کنید':'Save or copy valid IPs')+'</li>'+
          '</ol>'+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'نکات مهم':'Important Tips')+'</div>'+
          '<ul style="margin:0;padding-left:16px;line-height:1.8;font-size:.8125rem;color:var(--text-dim,#aaa)">'+
            '<li>'+(f?'از منابع مختلف برای نتایج بهتر استفاده کنید':'Use multiple sources for better results')+'</li>'+
            '<li>'+(f?'تأیید دو مرحله‌ای (TCP+TLS) دقت بالایی دارد':'Dual verification (TCP+TLS) ensures high accuracy')+'</li>'+
            '<li>'+(f?'نتایج را می‌توانید برای استفاده در نوا پروکسی ذخیره کنید':'Results can be saved for use in Nova Proxy')+'</li>'+
          '</ul>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

export function init(lang) {
  var container = document.getElementById('content');
  container.addEventListener('click', function(e) {
    var target = e.target;
    var tab = target.closest('[data-nrtab]');
    if (tab && tab.closest('#nr-tabs')) {
      container.querySelectorAll('#nr-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.nrtab-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.nrtab-content[data-nrtab="'+tab.getAttribute('data-nrtab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }
  });
}
