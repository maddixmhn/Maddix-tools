const repoUrl = 'https://github.com/noob-hackers/tunnel';

const termuxSteps = [
  { c: 'apt-get update -y', dFa: 'به‌روزرسانی فهرست پکیج‌ها', dEn: 'Update package lists' },
  { c: 'apt-get upgrade -y', dFa: 'ارتقای پکیج‌های موجود', dEn: 'Upgrade installed packages' },
  { c: 'pkg install python -y', dFa: 'نصب پایتون ۳', dEn: 'Install Python 3' },
  { c: 'pkg install python2 -y', dFa: 'نصب پایتون ۲ (برای سازگاری)', dEn: 'Install Python 2 (for compatibility)' },
  { c: 'pkg install git -y', dFa: 'نصب Git', dEn: 'Install Git' },
  { c: 'pip install lolcat', dFa: 'نصب lolcat برای رنگ‌بندی خروجی', dEn: 'Install lolcat for colored output' },
  { c: 'git clone https://github.com/noob-hackers/tunnel', dFa: 'کلون کردن مخزن تونل', dEn: 'Clone the tunnel repository' },
  { c: 'cd $HOME', dFa: 'رفتن به پوشه خانگی', dEn: 'Go to home directory' },
  { c: 'ls', dFa: 'بررسی فایل‌ها', dEn: 'List files' },
  { c: 'cd tunnells', dFa: 'ورود به پوشه tunnells', dEn: 'Enter the tunnells folder' },
  { c: 'bash tunnel.sh', dFa: 'اجرای اسکریپت تونل', dEn: 'Run the tunnel script' },
];

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export default function render(lang) {
  const isFa = lang === 'fa';

  const stepList = termuxSteps.map((s, i) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px">
      <span style="flex-shrink:0;width:22px;height:22px;border-radius:50%;background:var(--bg-3);color:var(--text-2);font-size:.7rem;display:flex;align-items:center;justify-content:center;font-weight:700">${i + 1}</span>
      <div style="flex:1;min-width:0">
        <code data-copy="${escapeHtml(s.c)}" style="display:block;font-size:.78rem;cursor:pointer;word-break:break-all" title="${isFa ? 'برای کپی کلیک کن' : 'Click to copy'}">${escapeHtml(s.c)}</code>
        <div style="font-size:.68rem;color:var(--muted-foreground);margin-top:2px">${isFa ? s.dFa : s.dEn}</div>
      </div>
      <span style="flex-shrink:0;font-size:.85rem" title="${isFa ? 'برای کپی کلیک کن' : 'Click to copy'}">📋</span>
    </div>`).join('');

  const installAll = termuxSteps.map(s => s.c).join('\n');

  return `
<div style="padding:16px">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
    <span style="font-size:2rem">🌐</span>
    <div>
      <h2 style="margin:0;font-size:1.25rem;font-weight:600">${isFa ? 'تونل Ngrok' : 'Ngrok Tunnel'}</h2>
      <p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.8125rem">${isFa ? 'اسکریپت Bash برای اتصال سریع و موقت سرورهای محلی به اینترنت در ترموکس' : 'Bash script to quickly expose local servers to the internet via ngrok on Termux'}</p>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:16px">
    <div style="padding:12px;text-align:center;background:var(--bg-2);border:1px solid var(--border);border-radius:10px"><div style="font-size:1.3rem">📡</div><div style="font-size:.8rem;font-weight:600;margin-top:4px">${isFa ? 'Ngrok' : 'Ngrok'}</div></div>
    <div style="padding:12px;text-align:center;background:var(--bg-2);border:1px solid var(--border);border-radius:10px"><div style="font-size:1.3rem">📱</div><div style="font-size:.8rem;font-weight:600;margin-top:4px">${isFa ? 'ترموکس' : 'Termux'}</div></div>
    <div style="padding:12px;text-align:center;background:var(--bg-2);border:1px solid var(--border);border-radius:10px"><div style="font-size:1.3rem">🔗</div><div style="font-size:.8rem;font-weight:600;margin-top:4px">${isFa ? 'URL عمومی' : 'Public URL'}</div></div>
    <div style="padding:12px;text-align:center;background:var(--bg-2);border:1px solid var(--border);border-radius:10px"><div style="font-size:1.3rem">⚡</div><div style="font-size:.8rem;font-weight:600;margin-top:4px">${isFa ? 'نصب سریع' : 'Quick setup'}</div></div>
  </div>

  <div style="margin-bottom:16px;padding:14px;background:var(--bg-2);border:1px solid var(--border);border-radius:10px">
    <h3 style="margin:0 0 8px;font-size:.9375rem;font-weight:600">${isFa ? '💡 درباره ابزار' : '💡 About'} </h3>
    <p style="margin:0;font-size:.8rem;color:var(--muted-foreground);line-height:1.7">
      ${isFa
        ? 'این اسکریپت مبتنی بر Bash به شما اجازه می‌دهد سرورهای محلی خود را به‌سرعت و به‌طور موقت به دنیای خارج متصل کنید. با استفاده از Ngrok، اپلیکیشن‌های وب محلی (روی localhost) از طریق یک URL عمومی در دسترس قرار می‌گیرند — بسیار مفید برای تست و توسعه، به‌ویژه وقتی دیگران یا سرویس‌های خارجی به اپلیکیشن شما دسترسی نیاز دارند.'
        : 'This Bash-based script lets you quickly and temporarily expose your local servers to the outside world. Using Ngrok, local web apps (on localhost) become reachable via a public URL — ideal for testing and development, especially when others or external services need access to your app.'}
    </p>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px">
    <h3 style="margin:0;font-size:.9375rem;font-weight:600">⚙️ ${isFa ? 'دستورات نصب و راه‌اندازی در ترموکس' : 'Termux install & setup commands'}</h3>
    <button class="secondary-btn" id="ngrok-copy-all" data-copy="${escapeHtml(installAll)}" style="font-size:.75rem;white-space:nowrap">${isFa ? '📋 کپی همه' : '📋 Copy all'}</button>
  </div>
  <div style="margin-bottom:16px">${stepList}</div>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-bottom:16px">
    <div style="padding:14px;background:var(--bg-2);border:1px solid var(--border);border-radius:10px">
      <div style="font-size:.82rem;font-weight:600;margin-bottom:8px">🚀 ${isFa ? 'بعد از اجرا' : 'After running'}</div>
      <ul style="margin:0;padding-left:18px;font-size:.76rem;color:var(--muted-foreground);line-height:1.8">
        <li>${isFa ? 'اسکریپت لیست گزینه‌های تونل را نمایش می‌دهد (مثل ngrok, cloudflare و...)' : 'The script shows a list of tunnel options (ngrok, cloudflare, etc.)'}</li>
        <li>${isFa ? 'گزینه موردنظر را انتخاب کن تا لینک عمومی ساخته شود.' : 'Pick the option and a public link is generated.'}</li>
        <li>${isFa ? 'لینک را با دیگران به اشتراک بگذار تا به اپ شما دسترسی داشته باشند.' : 'Share the link so others can access your app.'}</li>
      </ul>
    </div>
    <div style="padding:14px;background:var(--bg-2);border:1px solid var(--border);border-radius:10px">
      <div style="font-size:.82rem;font-weight:600;margin-bottom:8px">✅ ${isFa ? 'پیش‌نیازها' : 'Requirements'}</div>
      <ul style="margin:0;padding-left:18px;font-size:.76rem;color:var(--muted-foreground);line-height:1.8">
        <li>${isFa ? 'ترموکس از فروشگاه (F-Droid یا Play Store)' : 'Termux (F-Droid or Play Store)'}</li>
        <li>${isFa ? 'اتصال اینترنت پایدار' : 'Stable internet connection'}</li>
        <li>${isFa ? 'اجازه ذخیره‌سازی: termux-setup-storage' : 'Storage permission: termux-setup-storage'}</li>
      </ul>
    </div>
  </div>

  <a href="${repoUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:var(--accent);text-decoration:none;border:1px solid var(--border);border-radius:8px;padding:8px 14px;margin-bottom:16px">${isFa ? 'مشاهده مخزن گیت‌هاب ↗' : 'View GitHub repo ↗'}</a>

  <div style="padding:12px 14px;background:var(--bg-2);border-radius:8px;font-size:.75rem;color:var(--muted-foreground);line-height:1.7">
    ⚠️ ${isFa ? 'نکته: این ابزار را فقط روی سیستم‌هایی که مالک آن‌ها هستید استفاده کنید. کاربرد آموزشی/تست مجاز است.' : 'Note: only use on systems you own. Educational/testing use is permitted.'}
  </div>
</div>`;
}

export function init(lang) {
  // copy handled globally via [data-copy]
}
