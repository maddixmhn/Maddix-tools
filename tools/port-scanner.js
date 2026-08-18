export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const commonPorts = [
    { port: 80, service: 'HTTP' },
    { port: 443, service: 'HTTPS' },
    { port: 8080, service: 'HTTP-Alt' },
    { port: 8443, service: 'HTTPS-Alt' },
    { port: 22, service: 'SSH' },
    { port: 21, service: 'FTP' },
    { port: 3306, service: 'MySQL' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 6379, service: 'Redis' },
    { port: 27017, service: 'MongoDB' },
  ];
  return `<div class="panel">
    <h3 class="section-title">${t('اسکنر پورت', 'Port Scanner')}</h3>
    <div class="stack">
      <div>
        <label class="label">${t('میزبان', 'Host / IP')}</label>
        <input id="ps-host" class="field" type="text" placeholder="example.com">
      </div>
      <div>
        <label class="label">${t('پورت‌ها', 'Ports')}</label>
        <input id="ps-ports" class="field" type="text" placeholder="80,443,8080 or 1-1000">
      </div>
      <div>
        <label class="label">${t('پورت‌های رایج', 'Quick Select')}</label>
        <div class="chip-row">
          ${commonPorts.map(p => `<button class="chip" onclick="psAddPort(${p.port})">${p.port} (${p.service})</button>`).join('')}
        </div>
      </div>
      <p class="subtle tiny">${t('توجه: مرورگر فقط پورت‌های HTTP/HTTPS را اسکن می‌کند. بقیه به عنوان بسته شده نشان داده می‌شوند.', 'Note: Browser can only scan HTTP/HTTPS ports. Others will show as closed.')}</p>
      <button class="primary-btn" onclick="psScan()">${t('اسکن', 'Scan')}</button>
      <div id="ps-loading" style="display:none" class="subtle">${t('در حال اسکن...', 'Scanning...')}</div>
      <div id="ps-result" style="display:none">
        <div class="table-card">
          <div class="table-scroll">
            <table>
              <thead><tr><th>${t('پورت', 'Port')}</th><th>${t('سرویس', 'Service')}</th><th>${t('وضعیت', 'Status')}</th></tr></thead>
              <tbody id="ps-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

export function init() {
  const commonPorts = [
    { port: 80, service: 'HTTP' },
    { port: 443, service: 'HTTPS' },
    { port: 8080, service: 'HTTP-Alt' },
    { port: 8443, service: 'HTTPS-Alt' },
    { port: 22, service: 'SSH' },
    { port: 21, service: 'FTP' },
    { port: 3306, service: 'MySQL' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 6379, service: 'Redis' },
    { port: 27017, service: 'MongoDB' },
  ];
  function getService(port) {
    const p = commonPorts.find(x => x.port === port);
    return p ? p.service : 'Unknown';
  }
  function parsePorts(s) {
    const ports = new Set();
    s.split(',').forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [a, b] = part.split('-').map(Number);
        if (a && b) for (let i = a; i <= b; i++) ports.add(i);
      } else if (part) { const n = parseInt(part); if (n) ports.add(n); }
    });
    return [...ports];
  }
  window.psAddPort = function(p) {
    const el = document.getElementById('ps-ports');
    const cur = el.value.trim();
    el.value = cur ? cur + ',' + p : '' + p;
  };
  window.psScan = async function() {
    const host = document.getElementById('ps-host').value.trim();
    const portsStr = document.getElementById('ps-ports').value.trim();
    if (!host || !portsStr) return;
    const ports = parsePorts(portsStr);
    const loading = document.getElementById('ps-loading');
    const result = document.getElementById('ps-result');
    const tbody = document.getElementById('ps-tbody');
    loading.style.display = 'block';
    result.style.display = 'none';
    tbody.innerHTML = '';
    const rows = [];
    for (const port of ports) {
      const svc = getService(port);
      let status = 'closed';
      if ([80, 443, 8080, 8443].includes(port)) {
        try {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 3000);
          const url = (port === 443 || port === 8443 ? 'https' : 'http') + '://' + host + ':' + port;
          await fetch(url, { mode: 'no-cors', signal: ctrl.signal });
          clearTimeout(timer);
          status = 'open';
        } catch(e) { status = 'closed'; }
      }
      rows.push({ port, service: svc, status });
    }
    tbody.innerHTML = rows.map(r =>
      '<tr><td>' + r.port + '</td><td>' + r.service + '</td><td><span class="status ' + (r.status === 'open' ? 'good' : 'bad') + '">' + (r.status === 'open' ? '\u2713 open' : '\u2717 closed') + '</span></td></tr>'
    ).join('');
    result.style.display = 'block';
    loading.style.display = 'none';
  };
}
