export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🛡️</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Nova-Proxy Worker</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'پروکسی شخصی ضدسانسور روی Cloudflare Workers (۲,۱۷۲ ⭐)':'Personal censorship-resistant proxy on Cloudflare Workers (2,172 ⭐)')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--primary,#00c8ff22);color:var(--primary,#00c8ff);font-size:.75rem;font-weight:600">VLESS</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--success,#22c55e22);color:var(--success,#22c55e);font-size:.75rem;font-weight:600">Trojan</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--warning,#f59e0b22);color:var(--warning,#f59e0b);font-size:.75rem;font-weight:600">Shadowsocks</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--primary,#3b82f622);color:var(--primary,#3b82f6);font-size:.75rem;font-weight:600">gRPC</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--primary,#3b82f622);color:var(--primary,#3b82f6);font-size:.75rem;font-weight:600">WARP</span>'+
      '<span style="padding:4px 12px;border-radius:20px;background:var(--danger,#ef444422);color:var(--danger,#ef4444);font-size:.75rem;font-weight:600">ECH</span>'+
    '</div>'+
    '<div class="tab-bar" id="npw-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-npwtab="overview">'+(f?'معرفی':'Overview')+'</button>'+
      '<button data-npwtab="features">'+(f?'قابلیت‌ها':'Features')+'</button>'+
      '<button data-npwtab="deploy">'+(f?'نصب':'Deploy')+'</button>'+
      '<button data-npwtab="quick">'+(f?'شروع سریع':'Quick Start')+'</button>'+
    '</div>'+
    '<div class="npwtab-content" data-npwtab="overview">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+'Nova-Proxy'+(f?' چیست؟':' Overview')+'</h3>'+
        '<p style="font-size:.875rem;line-height:1.6;color:var(--text-dim,#aaa)">'+
           (f?'نوا پروکسی یک پروکسی شخصی همه‌کاره برای دور زدن سانسور است که کاملاً روی Cloudflare Workers — در سطح رایگان — اجرا می‌شود. این ابزار یک پروکسی قدرتمند (VLESS، Trojan، Shadowsocks روی WebSocket/gRPC/XHTTP) را با یک داشبورد مدیریت دوزبانه کامل ترکیب می‌کند، همه در یک Worker قابل استقرار.':
          'Nova Proxy is a personal, all-in-one censorship-circumvention proxy that runs entirely on Cloudflare Workers — the free tier. It combines a powerful proxy (VLESS, Trojan, Shadowsocks over WebSocket/gRPC/XHTTP) with a full bilingual admin dashboard, all in a single deployable Worker.')+
        '</p>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:12px">'+
        ['★ '+(f?'بدون زیرساخت':'Zero infrastructure')+' — '+(f?'نیاز به VPS ندارد':'no VPS needed'),'🌍 '+(f?'IP تمیز به تفکیک ISP':'Per-ISP clean-IP'),'👥 '+(f?'چند کاربره':'Multi-user'),'🤖 '+(f?'ربات تلگرام':'Telegram bot'),'🔗 '+(f?'زنجیره پروکسی':'Proxy chaining'),'🛡️ '+(f?'رمزنگاری پیشرفته':'Advanced evasion'),'🧩 '+(f?'حالت Backend':'Backend mode'),'📊 '+(f?'داشبورد مدیریت':'Admin dashboard')].map(function(s){ return '<div style="padding:10px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;font-size:.8125rem;color:var(--text,#ccc)">'+s+'</div>'; }).join('')+
      '</div>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">'+
        '<a href="https://github.com/IRNova/Nova-Proxy" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:#333;color:#fff;text-decoration:none;font-size:.8125rem;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">🐙</span> GitHub</a>'+
        '<a href="https://novaproxy.online" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:var(--primary,#00c8ff);color:#000;text-decoration:none;font-size:.8125rem;font-weight:600;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">🌐</span> '+(f?'وبسایت':'Website')+'</a>'+
        '<a href="https://t.me/irnova_proxy" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:#0088cc;color:#fff;text-decoration:none;font-size:.8125rem;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">✈️</span> Telegram</a>'+
        '<a href="https://www.youtube.com/@novaproxyir" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:#ff0000;color:#fff;text-decoration:none;font-size:.8125rem;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">▶️</span> YouTube</a>'+
      '</div>'+
    '</div>'+
    '<div class="npwtab-content" data-npwtab="features" style="display:none">'+
      '<div style="overflow-x:auto">'+
        '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
          '<thead><tr style="background:var(--bg-card,#1a1a2e)">'+
            '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'ویژگی':'Feature')+'</th>'+
            '<th style="padding:8px 10px;text-align:center;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:60px">v1</th>'+
            '<th style="padding:8px 10px;text-align:center;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:60px">v2</th>'+
            '<th style="padding:8px 10px;text-align:center;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:60px">v3</th>'+
          '</tr></thead><tbody>'+
          [
            [(f?'اشتراک خودکار':'Auto subscription link'),1,1,1],
            [(f?'Base64':'Base64'),1,1,1],
            [(f?'Clash/Mihomo':'Clash / Mihomo'),1,1,1],
            [(f?'sing-box':'sing-box'),1,1,1],
            [(f?'Load Balancing':'Load Balancing'),1,1,1],
            [(f?'بررسی سلامت':'Health Check'),1,1,1],
            [(f?'تست پینگ':'Ping test'),1,1,1],
            [(f?'QR کد':'QR Code'),1,1,1],
            [(f?'DoH پروکسی':'DoH proxy'),1,1,1],
            [(f?'DNS رمزنگاری':'DNS encryption'),1,1,1],
            [(f?'DNS Load Balance/Failover':'DNS LB/Failover'),1,1,1],
            [(f?'مسیریابی GeoIP/GeoSite':'Routing GeoIP/GeoSite'),0,1,1],
            [(f?'IPv6':'IPv6'),0,1,1],
            [(f?'AdBlock/PornBlock':'AdBlock/PornBlock'),0,1,1],
            [(f?'Trojan لینک مستقیم':'Trojan direct link'),0,1,1],
            [(f?'SOCKS5 گلوبال':'Global SOCKS5 mode'),0,1,1],
            [(f?'اسکنر IP تمیز':'Clean IP scanner'),0,1,1],
            [(f?'ربات مدیریت تلگرام':'Telegram bot'),0,1,1],
            [(f?'Quantumult X':'Quantumult X'),0,1,1],
            [(f?'داشبورد ادمین (RTL)':'Admin dashboard RTL'),0,1,1],
            [(f?'VLESS/Trojan/Shadowsocks':'VLESS/Trojan/SS'),0,1,1],
            [(f?'gRPC/XHTTP':'gRPC/XHTTP'),0,1,1],
            [(f?'زنجیره SOCKS5/HTTP':'SOCKS5/HTTP chain'),0,1,1],
            [(f?'TLS 1.3/1.2':'TLS 1.3/1.2'),0,1,1],
            [(f?'TLS fragment/SNI fragment':'TLS/SNI fragment'),0,1,1],
            [(f?'IP تمیز به تفکیک ISP':'Per-ISP clean-IP'),0,1,1],
            [(f?'ذخیره KV':'KV storage'),0,1,1],
            [(f?'ورود با رمز':'Password login'),0,1,1],
            [(f?'Token/MD5':'Token auth MD5'),0,1,1],
            [(f?'دارک مود':'Dark mode'),0,1,1],
            [(f?'دوزبانه (EN+FA)':'Bilingual EN+FA'),0,0,1],
            [(f?'Backend mode VLESS+UDP':'Backend mode'),0,0,1],
            [(f?'ECH':'ECH'),0,0,1],
            [(f?'هر کاربر لینک اختصاصی':'Per-user link'),0,0,1],
            [(f?'2FA (TOTP)':'2FA TOTP'),0,0,1],
            [(f?'WARP':'WARP support'),0,0,1],
            [(f?'پشتیبان‌گیری':'Backup & Restore'),0,0,1],
            [(f?'پایگاه D1':'D1 database'),0,0,1],
            [(f?'نصب یک کلیکی':'One-click deploy'),0,0,1],
          ].map(function(r){ return '<tr>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text,#ccc)">'+r[0]+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);text-align:center">'+(r[1]?'<span style="color:var(--success,#22c55e)">✓</span>':'<span style="color:var(--text-dim,#444)">—</span>')+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);text-align:center">'+(r[2]?'<span style="color:var(--success,#22c55e)">✓</span>':'<span style="color:var(--text-dim,#444)">—</span>')+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border,#2a2a3e);text-align:center">'+(r[3]?'<span style="color:var(--success,#22c55e)">✓</span>':'<span style="color:var(--text-dim,#444)">—</span>')+'</td>'+
          '</tr>'; }).join('')+
        '</tbody></table>'+
      '</div>'+
      '<div style="margin-top:12px;padding:8px;background:var(--bg-card,#1a1a2e);border-radius:6px;font-size:.75rem;color:var(--text-dim,#888);text-align:center">'+(f?'۳۸ ویژگی در نسخه‌های مختلف':'38 features across versions')+'</div>'+
    '</div>'+
    '<div class="npwtab-content" data-npwtab="deploy" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+(f?'پیش‌نیازها':'Prerequisites')+'</h3>'+
        '<ul style="margin:0;padding-left:20px;line-height:2;font-size:.875rem;color:var(--text-dim,#aaa)">'+
          '<li>'+(f?'حساب Cloudflare (رایگان) با Workers فعال':'Cloudflare account (free) with Workers enabled')+'</li>'+
          '<li>'+(f?'یک KV Namespace (ساخت خودکار توسط Deploy یا دستی با Wrangler)':'A KV namespace (auto by Deploy or manually via Wrangler)')+'</li>'+
          '<li>'+(f?':Node.js v18+ و Wrangler CLI برای تست محلی (اختیاری)':'Node.js v18+ and Wrangler CLI for local testing (optional)')+'</li>'+
        '</ul>'+
      '</div>'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+(f?'روش‌های نصب':'Installation Methods')+'</h3>'+
        '<div style="display:flex;flex-direction:column;gap:10px">'+
          '<div style="padding:12px;background:rgba(0,200,255,.05);border:1px solid var(--primary,#00c8ff44);border-radius:8px">'+
            '<div style="font-weight:600;font-size:.875rem;color:var(--primary,#00c8ff);margin-bottom:4px">🖥️ '+(f?'نصب ویزارد دسکتاپ':'Nova Wizard (Desktop)')+'</div>'+
            '<div style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'نرم‌افزار دسکتاپ با رابط گرافیکی — بدون نیاز به دانش فنی. دانلود از':'The official desktop installer with a graphical interface. Download from')+' <a href="https://github.com/IRNova/Nova-Wizard" target="_blank" rel="noopener" style="color:var(--primary,#00c8ff)">GitHub</a></div>'+
          '</div>'+
          '<div style="padding:12px;background:rgba(0,200,255,.05);border:1px solid var(--primary,#00c8ff44);border-radius:8px">'+
            '<div style="font-weight:600;font-size:.875rem;color:var(--primary,#00c8ff);margin-bottom:4px">🌐 '+(f?'نصب تحت وب':'Web Installer')+'</div>'+
            '<div style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'از وبسایت رسمی مراجعه کنید:':'Visit the official website:')+' <a href="https://novaproxy.online/install" target="_blank" rel="noopener" style="color:var(--primary,#00c8ff)">novaproxy.online/install</a></div>'+
          '</div>'+
          '<div style="padding:12px;background:rgba(0,200,255,.05);border:1px solid var(--primary,#00c8ff44);border-radius:8px">'+
            '<div style="font-weight:600;font-size:.875rem;color:var(--primary,#00c8ff);margin-bottom:4px">🐙 '+(f?'یک کلیک روی GitHub':'One-click Deploy to Cloudflare')+'</div>'+
            '<div style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'از صفحه GitHub پروژه دکمه Deploy را بزنید:':'Click the Deploy button on the GitHub page:')+' <a href="https://github.com/IRNova/Nova-Proxy" target="_blank" rel="noopener" style="color:var(--primary,#00c8ff)">github.com/IRNova/Nova-Proxy</a></div>'+
          '</div>'+
          '<div style="padding:12px;background:rgba(0,200,255,.05);border:1px solid var(--primary,#00c8ff44);border-radius:8px">'+
            '<div style="font-weight:600;font-size:.875rem;color:var(--primary,#00c8ff);margin-bottom:4px">📱 '+(f?'اندروید (به زودی)':'Android (Coming Soon)')+'</div>'+
            '<div style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'اپلیکیشن اندروید با ویزارد داخلی برای نصب یک کلیکی':'Android app with built-in wizard for one-click installation')+'</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+(f?'حالت Backend (VLESS + UDP)':'Backend Mode (VLESS + UDP)')+'</h3>'+
        '<p style="font-size:.8125rem;color:var(--text-dim,#888);margin-bottom:8px">'+(f?'برای تماس صوتی/تصویری و UDP به یک VPS نیاز دارید. با دستور زیر نصب کنید:':'For voice/video calls and UDP, you need a VPS. Install with:')+'</p>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:10px;font-family:monospace;font-size:.8125rem;color:var(--primary,#00c8ff);word-break:break-all">bash <(curl -fsSL https://raw.githubusercontent.com/IRNova/Tools/main/nova-backend.sh)</div>'+
      '</div>'+
    '</div>'+
    '<div class="npwtab-content" data-npwtab="quick" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'شروع سریع با Nova-Proxy':'Quick Start with Nova-Proxy')+'</h3>'+
        '<div style="counter-reset:step">'+
          step(f,1,(f?'حساب Cloudflare بسازید یا وارد شوید':'Create or log in to your Cloudflare account'),'https://dash.cloudflare.com')+
          step(f,2,(f?'به صفحه Nova-Proxy بروید و Deploy بزنید':'Go to Nova-Proxy page and click Deploy'),'https://github.com/IRNova/Nova-Proxy')+
          step(f,3,(f?'یک KV namespace بسازید (یا بگذارید خودکار ساخته شود)':'Create a KV namespace (or let it auto-create)'),null)+
          step(f,4,(f?'Worker را دیپلوی کنید و منتظر بمانید تا آماده شود':'Deploy the Worker and wait for it to be ready'),null)+
          step(f,5,(f?'دامنه خود را به Cloudflare اضافه کنید (اختیاری)':'Add your domain to Cloudflare (optional)'),null)+
          step(f,6,(f?'به داشبورد ادمین وارد شوید و تنظیمات را انجام دهید':'Log into the admin dashboard and configure settings'),null)+
          step(f,7,(f?'لینک اشتراک را در کلاینت خود (v2rayNG، Sing-box، Clash) وارد کنید':'Add the subscription link to your client (v2rayNG, Sing-box, Clash)'),null)+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

function step(f, num, text, link) {
  var n = '<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--primary,#00c8ff);color:#000;font-size:.75rem;font-weight:700;margin-right:8px;flex-shrink:0">'+num+'</span>';
  var t = '<span style="font-size:.875rem;color:var(--text,#ccc)">'+text+'</span>';
  if (link) t += ' <a href="'+link+'" target="_blank" rel="noopener" style="color:var(--primary,#00c8ff);font-size:.75rem;text-decoration:none">↗</a>';
  return '<div style="display:flex;align-items:center;gap:4px;margin-bottom:10px;padding:8px 12px;background:rgba(0,200,255,.03);border-radius:6px">'+n+t+'</div>';
}

export function init(lang) {
  var container = document.getElementById('content');
  container.addEventListener('click', function(e) {
    var target = e.target;
    var tab = target.closest('[data-npwtab]');
    if (tab && tab.closest('#npw-tabs')) {
      container.querySelectorAll('#npw-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.npwtab-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.npwtab-content[data-npwtab="'+tab.getAttribute('data-npwtab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }
  });
}
