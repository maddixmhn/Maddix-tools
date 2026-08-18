export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📱</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Nova-Proxy App</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'ابزار پروکسی محلی قدرتمند با GSA، Domain Fronting، TLS fragment، MITM (۷۸۹ ⭐)':'Powerful local proxy tool with GSA, Domain Fronting, TLS fragment, MITM (789 ⭐)')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--primary,#00c8ff22);color:var(--primary,#00c8ff);font-size:.75rem;font-weight:600">GSA</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--success,#22c55e22);color:var(--success,#22c55e);font-size:.75rem;font-weight:600">Domain Fronting</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--warning,#f59e0b22);color:var(--warning,#f59e0b);font-size:.75rem;font-weight:600">TLS Fragment</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--danger,#ef444422);color:var(--danger,#ef4444);font-size:.75rem;font-weight:600">ECH</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--warning,#f59e0b22);color:var(--warning,#f59e0b);font-size:.75rem;font-weight:600">QUIC</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--danger,#ef444422);color:var(--danger,#ef4444);font-size:.75rem;font-weight:600">MITM</span>'+
    '</div>'+
    '<div class="tab-bar" id="npa-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-npatab="overview">'+(f?'معرفی':'Overview')+'</button>'+
      '<button data-npatab="features">'+(f?'قابلیت‌ها':'Features')+'</button>'+
      '<button data-npatab="install">'+(f?'نصب':'Install')+'</button>'+
    '</div>'+
    '<div class="npatab-content" data-npatab="overview">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+(f?'نوا پروکسی اپ چیست؟':'What is Nova-Proxy App?')+'</h3>'+
        '<p style="font-size:.875rem;line-height:1.6;color:var(--text-dim,#aaa)">'+
          (f?'نوا پروکسی اپ یک ابزار پروکسی محلی قدرتمند است که با استفاده از Google Apps Script (GSA) با Domain Fronting، تکه‌تکه‌سازی TLS، تزریق ECH، بازپخش QUIC، MITM و مسیریابی هوشمند، راهی پیشرفته برای عبور از فیلترینگ سنگین فراهم می‌کند.':'Nova-Proxy App is a powerful local proxy tool that uses Google Apps Script (GSA) with Domain Fronting, TLS fragmentation, ECH injection, QUIC replay, MITM and smart routing to provide an advanced way to bypass heavy censorship.')+
        '</p>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:12px">'+
        ['🔒 '+(f?'GSA Domain Fronting':'GSA Domain Fronting'),'🧩 '+(f?'TLS Fragment':'TLS Fragment'),'🛡️ '+(f?'ECH تزریق':'ECH Injection'),'⚡ '+(f?'QUIC بازپخش':'QUIC Replay'),'🔍 '+(f?'MITM':'MITM'),'🌐 '+(f?'مسیریابی هوشمند':'Smart Routing'),'📡 '+(f?'پروکسی محلی':'Local Proxy'),'🎯 '+(f?'عبور از فیلترینگ سنگین':'Bypass heavy censorship')].map(function(s){ return '<div style="padding:10px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;font-size:.8125rem;color:var(--text,#ccc)">'+s+'</div>'; }).join('')+
      '</div>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
        '<a href="https://github.com/IRNova/Nova-Proxy-App" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:#333;color:#fff;text-decoration:none;font-size:.8125rem;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">🐙</span> GitHub</a>'+
      '</div>'+
    '</div>'+
    '<div class="npatab-content" data-npatab="features" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'قابلیت‌های کلیدی':'Key Features')+'</h3>'+
        '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
          '<thead><tr style="background:var(--bg-card,#1a1a2e)">'+
            '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'قابلیت':'Feature')+'</th>'+
            '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'توضیح':'Description')+'</th>'+
          '</tr></thead><tbody>'+
          [
            [(f?'GSA + Domain Fronting':'GSA + Domain Fronting'),(f?'استفاده از Google Apps Script با Domain Fronting برای مخفی کردن ترافیک':'Use Google Apps Script with Domain Fronting to hide traffic')],
            [(f?'TLS Fragment':'TLS Fragment'),(f?'تکه‌تکه کردن دست‌دهی TLS برای عبور از DPI':'Fragment TLS handshake to bypass DPI')],
            [(f?'ECH تزریق':'ECH Injection'),(f?'تزریق Encrypted Client Hello برای امنیت بیشتر':'Inject Encrypted Client Hello for extra security')],
            [(f?'QUIC بازپخش':'QUIC Replay'),(f?'بازپخش ترافیک QUIC برای عبور از فیلترینگ':'Replay QUIC traffic to bypass filtering')],
            [(f?'MITM':'MITM'),(f?'بازرسی و تغییر ترافیک در مسیر':'Inspect and modify traffic in transit')],
            [(f?'مسیریابی هوشمند':'Smart Routing'),(f?'مسیریابی خودکار بر اساس نوع ترافیک':'Auto routing based on traffic type')],
            [(f?'پروکسی محلی':'Local Proxy'),(f?'اجرا روی سیستم خودتان':'Runs on your own system')],
            [(f?'چند پلتفرم':'Cross-platform'),(f?'قابل اجرا روی ویندوز، لینوکس، مک':'Runs on Windows, Linux, macOS')],
          ].map(function(r){ return '<tr>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text,#ccc);font-weight:600">'+r[0]+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text-dim,#aaa)">'+r[1]+'</td>'+
          '</tr>'; }).join('')+
        '</tbody></table>'+
      '</div>'+
    '</div>'+
    '<div class="npatab-content" data-npatab="install" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'نصب Nova-Proxy App':'Install Nova-Proxy App')+'</h3>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">Go '+(f?'نصب با':'Install with')+'</div>'+
          '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:10px;font-family:monospace;font-size:.8125rem;color:var(--primary,#00c8ff);word-break:break-all">go install github.com/IRNova/Nova-Proxy-App@latest</div>'+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'دانلود باینری':'Download Binary')+'</div>'+
          '<div style="font-size:.8125rem;color:var(--text,#ccc)">'+(f?'از صفحه GitHub پروژه آخرین نسخه را دانلود کنید:':'Download the latest release from GitHub:')+'</div>'+
          '<a href="https://github.com/IRNova/Nova-Proxy-App/releases" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;padding:8px 16px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;text-decoration:none;font-size:.8125rem;font-weight:600">⬇ '+(f?'دانلود':'Download')+'</a>'+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'اجرا با Docker':'Run with Docker')+'</div>'+
          '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:10px;font-family:monospace;font-size:.8125rem;color:var(--primary,#00c8ff);word-break:break-all">docker pull irnova/nova-proxy-app<br>docker run -p 8080:8080 irnova/nova-proxy-app</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

export function init(lang) {
  var container = document.getElementById('content');
  container.addEventListener('click', function(e) {
    var target = e.target;
    var tab = target.closest('[data-npatab]');
    if (tab && tab.closest('#npa-tabs')) {
      container.querySelectorAll('#npa-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.npatab-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.npatab-content[data-npatab="'+tab.getAttribute('data-npatab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }
  });
}
