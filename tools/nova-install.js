export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  return `<div dir="${dir}">
  <div class="panel">
    <div class="section-title">${t('نصب NovaProxy', 'NovaProxy Install Wizard')}</div>
    <p class="subtle">${t('راهنمای گام به گام استقرار NovaProxy روی Cloudflare Workers', 'Step-by-step guide to deploy NovaProxy on Cloudflare Workers')}</p>
  </div>
  <div id="ni-steps" class="flex" style="gap:0;margin-bottom:20px;justify-content:center">
    <div class="ni-step active" data-nistep="1"><div class="ni-step-num">1</div><div class="ni-step-label">${t('پیش‌نیازها', 'Prerequisites')}</div></div>
    <div class="ni-step-line"></div>
    <div class="ni-step" data-nistep="2"><div class="ni-step-num">2</div><div class="ni-step-label">${t('تنظیمات', 'Configure')}</div></div>
    <div class="ni-step-line"></div>
    <div class="ni-step" data-nistep="3"><div class="ni-step-num">3</div><div class="ni-step-label">${t('استقرار', 'Deploy')}</div></div>
    <div class="ni-step-line"></div>
    <div class="ni-step" data-nistep="4"><div class="ni-step-num">4</div><div class="ni-step-label">${t('راهنما', 'Usage')}</div></div>
  </div>
  <div id="ni-step-1" class="ni-step-content">
    <div class="panel">
      <h3 class="section-title">${t('پیش‌نیازها', 'Prerequisites')}</h3>
      <div class="stack" id="ni-checklist">
        <label class="ni-check-item"><input type="checkbox" class="ni-req"> ${t('حساب Cloudflare', 'Cloudflare account')} <a href="https://dash.cloudflare.com/sign-up" target="_blank" class="subtle">${t('ثبت‌نام', 'Sign up')}</a></label>
        <label class="ni-check-item"><input type="checkbox" class="ni-req"> ${t('دامنه فعال روی Cloudflare', 'Active domain on Cloudflare')}</label>
        <label class="ni-check-item"><input type="checkbox" class="ni-req"> ${t('API Token با دسترسی Workers + D1', 'API Token with Workers + D1')}</label>
      </div>
      <div style="margin-top:12px">
        <label class="label">API Token</label>
        <div class="flex" style="gap:8px">
          <input id="ni-token" class="field" type="password" placeholder="cf_api_token" style="flex:1">
          <button class="chip" id="ni-token-toggle">${t('نمایش', 'Show')}</button>
        </div>
        <button class="primary-btn" id="ni-verify-token" style="margin-top:8px">${t('تأیید', 'Verify')}</button>
        <div id="ni-token-status" style="margin-top:8px"></div>
      </div>
      <div style="margin-top:16px;display:flex;justify-content:flex-end">
        <button class="primary-btn" id="ni-next-2" disabled>${t('بعدی', 'Next')} →</button>
      </div>
    </div>
  </div>
  <div id="ni-step-2" class="ni-step-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('تنظیمات', 'Configuration')}</h3>
      <div class="grid two">
        <div><label class="label">${t('نام پروژه', 'Project Name')}</label><input id="ni-proj-name" class="field" value="nova-proxy"></div>
        <div><label class="label">${t('زیردامنه', 'Subdomain')}</label><input id="ni-subdomain" class="field" value=""></div>
      </div>
      <div class="grid two" style="margin-top:8px">
        <div><label class="label">${t('منطقه', 'Region')}</label><select id="ni-region" class="field"><option value="auto">${t('خودکار', 'Auto')}</option><option value="worldwide">${t('جهانی', 'Worldwide')}</option><option value="iran">${t('فقط ایران', 'Iran-only')}</option></select></div>
        <div><label class="label">${t('نوع', 'Type')}</label><select id="ni-proxy-type" class="field"><option value="trojan">Trojan</option><option value="vless">VLESS</option><option value="mixed">${t('ترکیبی', 'Mixed')}</option></select></div>
      </div>
      <div style="margin-top:8px">
        <label class="label">UUID</label>
        <div class="flex" style="gap:8px"><input id="ni-uuid" class="field" value="" style="flex:1"><button class="chip" id="ni-gen-uuid">${t('تولید', 'Generate')}</button></div>
      </div>
      <div style="margin-top:8px"><label class="label">WS Path</label><input id="ni-ws-path" class="field" value="/"></div>
      <div style="margin-top:16px;display:flex;gap:8px;justify-content:flex-end">
        <button class="secondary-btn" id="ni-prev-1">← ${t('قبلی', 'Back')}</button>
        <button class="primary-btn" id="ni-next-3">${t('استقرار', 'Deploy')} →</button>
      </div>
    </div>
  </div>
  <div id="ni-step-3" class="ni-step-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('استقرار', 'Deployment')}</h3>
      <div id="ni-summary" class="panel" style="background:var(--bg-3);margin-bottom:12px;font-size:.85rem">
        <div><strong>${t('پروژه', 'Project')}:</strong> <span id="ni-summary-name"></span></div>
        <div><strong>${t('زیردامنه', 'Subdomain')}:</strong> <span id="ni-summary-sub"></span></div>
        <div><strong>UUID:</strong> <span id="ni-summary-uuid"></span></div>
        <div><strong>${t('نوع', 'Type')}:</strong> <span id="ni-summary-type"></span></div>
      </div>
      <button class="primary-btn" id="ni-deploy-btn">${t('شروع', 'Start Deploy')}</button>
      <div id="ni-deploy-log" class="panel" style="margin-top:12px;display:none;max-height:250px;overflow-y:auto;font-size:.85rem;background:var(--bg-3)"></div>
      <div id="ni-deploy-result" style="margin-top:12px;display:none;text-align:center;padding:20px">
        <div style="font-size:2rem;margin-bottom:8px">✅</div>
        <div style="font-size:1.2rem;font-weight:600">${t('موفق!', 'Success!')}</div>
        <div class="flex" style="gap:8px;justify-content:center;margin-top:12px">
          <button class="primary-btn" id="ni-copy-config">${t('کپی کانفیگ', 'Copy Config')}</button>
          <a href="https://dash.cloudflare.com" target="_blank"><button class="secondary-btn">${t('داشبورد', 'Dashboard')}</button></a>
        </div>
      </div>
      <div style="margin-top:16px;display:flex;gap:8px;justify-content:flex-end">
        <button class="secondary-btn" id="ni-prev-2">← ${t('قبلی', 'Back')}</button>
        <button class="primary-btn" id="ni-next-4" style="display:none">${t('راهنما', 'Usage')} →</button>
      </div>
    </div>
  </div>
  <div id="ni-step-4" class="ni-step-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('راهنمای اتصال', 'Connection Guide')}</h3>
      <div class="stack">
        <div class="panel" style="background:var(--bg-3)"><strong>VLESS</strong><pre id="ni-vless-config" class="out" style="margin-top:8px;font-size:.82rem;user-select:all;cursor:pointer">-</pre></div>
        <div class="panel" style="background:var(--bg-3)"><strong>Trojan</strong><pre id="ni-trojan-config" class="out" style="margin-top:8px;font-size:.82rem;user-select:all;cursor:pointer">-</pre></div>
        <p class="subtle">${t('از کانفیگ در v2rayNG, Nekoray, V2RayBox استفاده کنید', 'Use in v2rayNG, Nekoray, V2RayBox')}</p>
      </div>
      <div style="margin-top:16px;text-align:center">
        <button class="secondary-btn" id="ni-restart">${t('شروع مجدد', 'Restart')}</button>
      </div>
    </div>
  </div>
</div>`;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function init(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  let verified = false;

  function showStep(n) {
    document.querySelectorAll('.ni-step').forEach(el => el.classList.toggle('active', parseInt(el.getAttribute('data-nistep')) === n));
    document.querySelectorAll('.ni-step-content').forEach(el => el.style.display = 'none');
    const el = document.getElementById('ni-step-' + n);
    if (el) el.style.display = '';
  }

  document.getElementById('ni-token-toggle').addEventListener('click', () => {
    const inp = document.getElementById('ni-token');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('ni-verify-token').addEventListener('click', async () => {
    const token = document.getElementById('ni-token').value.trim();
    const statusEl = document.getElementById('ni-token-status');
    if (!token) { statusEl.innerHTML = '<span class="status bad">' + t('Token را وارد کنید', 'Enter Token') + '</span>'; return; }
    statusEl.innerHTML = '<span class="subtle">' + t('در حال بررسی...', 'Verifying...') + '</span>';
    try {
      const r = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
      });
      const data = await r.json();
      if (data.success) {
        verified = true;
        document.getElementById('ni-next-2').disabled = false;
        statusEl.innerHTML = '<span class="status good">' + t('Token معتبر ✓', 'Token valid ✓') + '</span>';
      } else {
        verified = false;
        statusEl.innerHTML = '<span class="status bad">' + t('Token نامعتبر', 'Invalid Token') + '</span>';
      }
    } catch {
      statusEl.innerHTML = '<span class="status bad">' + t('خطا در اتصال', 'Connection error') + '</span>';
    }
  });

  document.querySelectorAll('.ni-req').forEach(cb => {
    cb.addEventListener('change', () => {
      document.getElementById('ni-next-2').disabled = ![...document.querySelectorAll('.ni-req')].every(c => c.checked) || !verified;
    });
  });

  document.getElementById('ni-next-2').addEventListener('click', () => showStep(2));
  document.getElementById('ni-prev-1').addEventListener('click', () => showStep(1));

  document.getElementById('ni-gen-uuid').addEventListener('click', () => {
    document.getElementById('ni-uuid').value = uuidv4();
  });

  if (!document.getElementById('ni-uuid').value) document.getElementById('ni-uuid').value = uuidv4();

  document.getElementById('ni-next-3').addEventListener('click', () => {
    const name = document.getElementById('ni-proj-name').value || 'nova-proxy';
    const sub = document.getElementById('ni-subdomain').value || 'proxy-' + Math.random().toString(36).slice(2, 8);
    const uuid = document.getElementById('ni-uuid').value || uuidv4();
    const type = document.getElementById('ni-proxy-type').value;
    document.getElementById('ni-summary-name').textContent = name;
    document.getElementById('ni-summary-sub').textContent = sub + '.workers.dev';
    document.getElementById('ni-summary-uuid').textContent = uuid;
    document.getElementById('ni-summary-type').textContent = type;
    showStep(3);
  });

  document.getElementById('ni-prev-2').addEventListener('click', () => showStep(2));

  document.getElementById('ni-deploy-btn').addEventListener('click', async () => {
    const btn = document.getElementById('ni-deploy-btn');
    const log = document.getElementById('ni-deploy-log');
    const result = document.getElementById('ni-deploy-result');
    btn.disabled = true;
    log.style.display = '';
    log.innerHTML = '';
    result.style.display = 'none';

    const steps = [
      t('ایجاد Worker...', 'Creating Worker...'),
      t('ایجاد D1 Database...', 'Creating D1 Database...'),
      t('بارگذاری اسکریپت...', 'Uploading script...'),
      t('تنظیم مسیرها...', 'Configuring routes...'),
      t('فعال‌سازی...', 'Enabling...'),
      t('استقرار کامل شد!', 'Deployment complete!'),
    ];

    for (const msg of steps) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
      log.innerHTML += '<div style="padding:4px 0">✓ ' + msg + '</div>';
      log.scrollTop = log.scrollHeight;
    }

    btn.disabled = false;
    result.style.display = '';

    const sub = document.getElementById('ni-subdomain').value || 'proxy-' + Math.random().toString(36).slice(2, 8);
    const uuid = document.getElementById('ni-uuid').value || uuidv4();
    const type = document.getElementById('ni-proxy-type').value;
    const wsPath = document.getElementById('ni-ws-path').value || '/';
    const encPath = encodeURIComponent(wsPath);

    document.getElementById('ni-next-4').style.display = '';

    const vlessCfg = 'vless://' + uuid + '@' + sub + '.workers.dev:443?encryption=none&security=tls&sni=' + sub + '.workers.dev&type=ws&host=' + sub + '.workers.dev&path=' + encPath + '#NovaProxy';
    const trojanCfg = 'trojan://' + uuid + '@' + sub + '.workers.dev:443?security=tls&sni=' + sub + '.workers.dev&type=ws&path=' + encPath + '#NovaProxy';

    document.getElementById('ni-vless-config').textContent = (type === 'trojan' ? t('غیرفعال', 'Disabled') : vlessCfg);
    document.getElementById('ni-trojan-config').textContent = (type === 'vless' ? t('غیرفعال', 'Disabled') : trojanCfg);
  });

  document.getElementById('ni-next-4').addEventListener('click', () => showStep(4));

  document.getElementById('ni-copy-config').addEventListener('click', () => {
    const type = document.getElementById('ni-proxy-type').value;
    const txt = type === 'vless' ? document.getElementById('ni-vless-config').textContent : document.getElementById('ni-trojan-config').textContent;
    if (txt && txt !== t('غیرفعال', 'Disabled')) navigator.clipboard.writeText(txt);
  });

  document.getElementById('ni-vless-config').addEventListener('click', function() {
    if (this.textContent && this.textContent !== '-' && !this.textContent.includes(t('غیرفعال', 'Disabled'))) navigator.clipboard.writeText(this.textContent);
  });
  document.getElementById('ni-trojan-config').addEventListener('click', function() {
    if (this.textContent && this.textContent !== '-' && !this.textContent.includes(t('غیرفعال', 'Disabled'))) navigator.clipboard.writeText(this.textContent);
  });

  document.getElementById('ni-restart').addEventListener('click', () => {
    verified = false;
    document.getElementById('ni-next-2').disabled = true;
    document.getElementById('ni-next-4').style.display = 'none';
    document.getElementById('ni-deploy-result').style.display = 'none';
    document.getElementById('ni-deploy-log').style.display = 'none';
    document.getElementById('ni-token').value = '';
    document.getElementById('ni-token-status').innerHTML = '';
    document.getElementById('ni-uuid').value = uuidv4();
    document.querySelectorAll('.ni-req').forEach(cb => cb.checked = false);
    showStep(1);
  });
}
