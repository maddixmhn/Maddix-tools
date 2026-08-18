export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🧙</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Nova Wizard</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'دیپلوی‌ر محلی OAuth برای نوا پروکسی روی Cloudflare Workers (۴۷ ⭐)':'Local OAuth deployer for Nova Proxy on Cloudflare Workers (47 ⭐)')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="nw-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-nwtab="overview">'+(f?'معرفی':'Overview')+'</button>'+
      '<button data-nwtab="install">'+(f?'نصب':'Install')+'</button>'+
      '<button data-nwtab="guide">'+(f?'راهنما':'Guide')+'</button>'+
    '</div>'+
    '<div class="nwtab-content" data-nwtab="overview">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 8px;font-size:1rem;color:var(--text,#eee)">'+(f?'نوا ویزارد چیست؟':'What is Nova Wizard?')+'</h3>'+
        '<p style="font-size:.875rem;line-height:1.6;color:var(--text-dim,#aaa)">'+
          (f?'نوا ویزارد یک ابزار دسکتاپ است که فرآیند استقرار نوا پروکسی روی Cloudflare Workers را کاملاً خودکار می‌کند. بدون نیاز به API Token یا سرور شخص ثالث — فقط یک کلیک و پروکسی شخصی شما آماده است.':'Nova Wizard is a desktop tool that automates the deployment of Nova Proxy on Cloudflare Workers. No API tokens, no third-party servers — just one click and your private proxy is up.')+
        '</p>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-bottom:12px">'+
        ['🔑 '+(f?'احراز هویت OAuth':'OAuth authentication'),'☁️ '+(f?'استقرار خودکار روی Worker':'Auto-deploy to Workers'),'🔌 '+(f?'بدون نیاز به API Token':'No API token needed'),'🖥️ '+(f?'رابط گرافیکی دسکتاپ':'Desktop GUI'),'⚡ '+(f?'یک کلیک':'One-click deploy'),'🔒 '+(f?'امن و خصوصی':'Secure & private')].map(function(s){ return '<div style="padding:12px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;font-size:.8125rem;color:var(--text,#ccc)">'+s+'</div>'; }).join('')+
      '</div>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
        '<a href="https://github.com/IRNova/Nova-Wizard" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:#333;color:#fff;text-decoration:none;font-size:.8125rem;display:inline-flex;align-items:center;gap:6px"><span style="font-size:1.1rem">🐙</span> GitHub</a>'+
        '<a href="https://github.com/IRNova/Nova-Wizard/releases" target="_blank" rel="noopener" style="padding:10px 20px;border:none;border-radius:8px;background:var(--primary,#00c8ff);color:#000;text-decoration:none;font-size:.8125rem;font-weight:600;display:inline-flex;align-items:center;gap:6px">⬇ '+(f?'دانلود':'Download')+'</a>'+
      '</div>'+
    '</div>'+
    '<div class="nwtab-content" data-nwtab="install" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px;margin-bottom:12px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'نصب و راه‌اندازی':'Installation & Setup')+'</h3>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">'+(f?'پیش‌نیازها':'Prerequisites')+'</div>'+
          '<ul style="margin:0;padding-left:16px;line-height:1.8;font-size:.8125rem;color:var(--text-dim,#aaa)">'+
            '<li>'+(f?'حساب Cloudflare (رایگان)':'Cloudflare account (free)')+'</li>'+
            '<li>'+(f?'ویندوز ۱۰/۱۱ یا لینوکس (Ubuntu/Debian)':'Windows 10/11 or Linux (Ubuntu/Debian)')+'</li>'+
            '<li>'+(f?'.NET Runtime 8.0 (نصب خودکار در صورت نیاز)':'.NET Runtime 8.0 (auto-installed if needed)')+'</li>'+
          '</ul>'+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px;margin-bottom:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">Windows</div>'+
          '<div style="font-size:.8125rem;color:var(--text,#ccc);margin-bottom:6px">'+(f?'آخرین نسخه را از بخش Releases دانلود کنید:':'Download the latest version from Releases:')+'</div>'+
          '<a href="https://github.com/IRNova/Nova-Wizard/releases" target="_blank" rel="noopener" style="padding:8px 16px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;text-decoration:none;font-size:.8125rem;font-weight:600;display:inline-block">⬇ Nova-Wizard.exe</a>'+
        '</div>'+
        '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:12px">'+
          '<div style="font-weight:600;font-size:.8125rem;color:var(--primary,#00c8ff);margin-bottom:6px">Linux</div>'+
          '<div style="background:rgba(0,0,0,.3);border-radius:6px;padding:10px;font-family:monospace;font-size:.8125rem;color:var(--primary,#00c8ff);word-break:break-all">wget https://github.com/IRNova/Nova-Wizard/releases/latest/download/Nova-Wizard-linux-x64.tar.gz<br>tar -xzf Nova-Wizard-linux-x64.tar.gz<br>./Nova-Wizard</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="nwtab-content" data-nwtab="guide" style="display:none">'+
      '<div style="background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;padding:16px">'+
        '<h3 style="margin:0 0 12px;font-size:1rem;color:var(--text,#eee)">'+(f?'راهنمای استفاده':'Usage Guide')+'</h3>'+
        '<div style="counter-reset:step">'+
          ['','','','','',''].map(function(_,i){
            var steps = f ? [
              (f?'نرم‌افزار را اجرا کنید و روی "Login with Cloudflare" کلیک کنید':'Run the app and click "Login with Cloudflare"'),
              (f?'در مرورگر با حساب Cloudflare خود وارد شوید و مجوز دهید':'Log in to your Cloudflare account in the browser and authorize'),
              (f?'ویزارد به‌طور خودکار Worker را ایجاد و استقرار می‌دهد':'The wizard automatically creates and deploys the Worker'),
              (f?'بعد از اتمام، لینک پروکسی شما نمایش داده می‌شود':'After completion, your proxy link is displayed'),
              (f?'لینک را کپی کنید و در کلاینت خود (v2rayNG، Sing-box، ...) وارد کنید':'Copy the link and add it to your client (v2rayNG, Sing-box, ...)'),
              (f?'پروکسی شما فعال است! از اینترنت آزاد لذت ببرید 🎉':'Your proxy is live! Enjoy the free internet 🎉'),
            ] : [
              'Run the app and click "Login with Cloudflare"',
              'Log in to your Cloudflare account in the browser and authorize',
              'The wizard automatically creates and deploys the Worker',
              'After completion, your proxy link is displayed',
              'Copy the link and add it to your client (v2rayNG, Sing-box, ...)',
              'Your proxy is live! Enjoy the free internet 🎉',
            ];
            var n = '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--primary,#00c8ff);color:#000;font-size:.8125rem;font-weight:700;margin-right:10px;flex-shrink:0">'+(i+1)+'</span>';
            return '<div style="display:flex;align-items:center;gap:4px;margin-bottom:10px;padding:10px 14px;background:rgba(0,200,255,.03);border-radius:6px">'+n+'<span style="font-size:.875rem;color:var(--text,#ccc)">'+steps[i]+'</span></div>';
          }).join('')+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

export function init(lang) {
  var container = document.getElementById('content');
  container.addEventListener('click', function(e) {
    var target = e.target;
    var tab = target.closest('[data-nwtab]');
    if (tab && tab.closest('#nw-tabs')) {
      container.querySelectorAll('#nw-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.nwtab-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.nwtab-content[data-nwtab="'+tab.getAttribute('data-nwtab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }
  });
}
