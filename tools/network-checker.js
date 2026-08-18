export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  return `<div class="panel">
    <h3 class="section-title">${t('بررسی اتصال شبکه', 'Network Connectivity Checker')}</h3>
    <div class="stack">
      <button class="primary-btn" onclick="ncCheck()">${t('بررسی اتصال', 'Check Connectivity')}</button>
      <div id="nc-loading" style="display:none" class="subtle">${t('در حال بررسی...', 'Checking...')}</div>
      <div id="nc-result" style="display:none">
        <div class="table-card">
          <div class="table-scroll">
            <table>
              <thead><tr><th>${t('سرویس', 'Service')}</th><th>${t('وضعیت', 'Status')}</th><th>${t('زمان پاسخ', 'Latency')}</th></tr></thead>
              <tbody id="nc-tbody"></tbody>
            </table>
          </div>
        </div>
        <div class="button-row"><button class="secondary-btn" onclick="ncCheck()">${t('تازه‌سازی', 'Refresh')}</button></div>
      </div>
    </div>
  </div>`;
}

export function init() {
  const services = [
    { name: 'Google', url: 'https://www.google.com/favicon.ico' },
    { name: 'Cloudflare', url: 'https://www.cloudflare.com/favicon.ico' },
    { name: 'Irancell', url: 'https://www.irancell.ir/favicon.ico' },
    { name: 'MCI (Hamrahe Aval)', url: 'https://www.mci.ir/favicon.ico' },
    { name: 'Youtube', url: 'https://www.youtube.com/favicon.ico' },
    { name: 'Telegram', url: 'https://telegram.org/favicon.ico' },
    { name: 'GitHub', url: 'https://github.com/favicon.ico' },
  ];
  window.ncCheck = async function() {
    const loading = document.getElementById('nc-loading');
    const result = document.getElementById('nc-result');
    const tbody = document.getElementById('nc-tbody');
    loading.style.display = 'block';
    result.style.display = 'none';
    tbody.innerHTML = '';
    const rows = [];
    for (const svc of services) {
      const start = performance.now();
      let status = 'offline';
      let lat = '-';
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 5000);
        const r = await fetch(svc.url, { mode: 'no-cors', signal: ctrl.signal });
        clearTimeout(timer);
        lat = ((performance.now() - start) | 0) + 'ms';
        status = 'online';
      } catch(e) { status = 'offline'; }
      rows.push({ name: svc.name, status, lat });
    }
    tbody.innerHTML = rows.map(r =>
      '<tr><td>' + r.name + '</td><td><span class="status ' + (r.status === 'online' ? 'good' : 'bad') + '">' + (r.status === 'online' ? '\u2713 online' : '\u2717 offline') + '</span></td><td>' + r.lat + '</td></tr>'
    ).join('');
    result.style.display = 'block';
    loading.style.display = 'none';
  };
}
