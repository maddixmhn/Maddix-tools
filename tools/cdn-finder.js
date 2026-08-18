const PROVIDER_RANGES = {
  akamai: ['23.0.0.0/12','23.32.0.0/11','23.40.0.0/14','23.48.0.0/14','23.52.0.0/14','23.56.0.0/13','23.64.0.0/14','23.72.0.0/13','23.80.0.0/12','23.192.0.0/11','23.224.0.0/13','23.248.0.0/14','23.252.0.0/14','23.192.0.0/11'],
  google: ['8.8.8.0/24','8.8.4.0/24','8.34.0.0/15','8.35.0.0/16','23.236.0.0/14','23.251.0.0/16','34.0.0.0/15','34.2.0.0/15','34.3.0.0/16','34.4.0.0/14','34.8.0.0/13','34.16.0.0/12','34.32.0.0/11','34.64.0.0/10','34.128.0.0/10','35.128.0.0/12','35.184.0.0/13','35.192.0.0/14','35.196.0.0/15','35.200.0.0/13','35.208.0.0/12','35.224.0.0/12','35.240.0.0/13'],
  cloudfront: ['13.32.0.0/15','13.33.0.0/16','13.34.0.0/15','13.35.0.0/16','13.224.0.0/14','13.224.0.0/14','13.225.0.0/16','13.226.0.0/15','13.248.0.0/15','13.249.0.0/16','52.84.0.0/15','54.192.0.0/16','54.230.0.0/16','54.239.128.0/18','54.239.192.0/19'],
  azure: ['13.64.0.0/11','13.96.0.0/13','13.104.0.0/14','20.0.0.0/10','20.32.0.0/12','20.36.0.0/14','20.40.0.0/13','20.48.0.0/12','20.60.0.0/13','20.64.0.0/10','20.128.0.0/14','20.132.0.0/13','20.140.0.0/13','20.144.0.0/12','20.160.0.0/11','20.192.0.0/10']
};

function ipToNum(ip) { return ip.split('.').reduce((a,b)=>(a<<8)+parseInt(b),0)>>>0; }
function numToIP(n) { return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.'); }
function cidrToRange(cidr) {
  const [ip, bits] = cidr.split('/');
  const mask = ~0 << (32 - parseInt(bits));
  const start = ipToNum(ip) & mask;
  const end = start | (~mask >>> 0);
  return { start, end };
}
function randIPFromRange(start, end) {
  const n = start + Math.floor(Math.random() * (end - start + 1));
  return numToIP(n);
}
function generateIPsFromCIDRs(cidrs, count) {
  const ranges = cidrs.map(c => { try { return cidrToRange(c); } catch { return null; } }).filter(Boolean);
  if (!ranges.length) return [];
  const ips = new Set();
  let attempts = 0;
  while (ips.size < count && attempts < count * 100) {
    const r = ranges[Math.floor(Math.random() * ranges.length)];
    ips.add(randIPFromRange(r.start, r.end));
    attempts++;
  }
  return [...ips];
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }

const FETCH_SOURCES = {
  cloudflare: 'https://www.cloudflare.com/ips-v4/',
  gcore: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/gcore.json',
  fastly: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/fastly.json'
};

const PROVIDERS = [
  { id: 'cloudflare', label: 'Cloudflare', remote: true },
  { id: 'gcore', label: 'Gcore', remote: true },
  { id: 'fastly', label: 'Fastly', remote: true },
  { id: 'akamai', label: 'Akamai', remote: false },
  { id: 'google', label: 'Google Cloud CDN', remote: false },
  { id: 'cloudfront', label: 'Amazon CloudFront', remote: false },
  { id: 'azure', label: 'Azure CDN', remote: false },
  { id: 'custom', label: 'Custom CIDR', remote: false }
];

export default function render(lang) {
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = (fa, en) => isFa ? fa : en;

  const providerRadios = PROVIDERS.map(p =>
    `<label style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:var(--bg-3);border-radius:8px;cursor:pointer;font-size:.85rem"><input type="radio" name="cf-provider" value="${p.id}" ${p.id==='cloudflare'?'checked':''}>${p.label}</label>`
  ).join('');

  return `<div dir="${dir}">
  <div class="panel">
    <div class="section-title">${t('یابنده IP های CDN', 'CDN IP Finder')}</div>
    <p class="subtle">${t('پیدا کردن آی‌پی‌های edge CDN که در ایران مسدود نشده‌اند', 'Find CDN edge IPs not blocked in Iran')}</p>
  </div>

  <div class="panel">
    <div class="section-title">${t('منبع CDN', 'CDN Source')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">${providerRadios}</div>
    <div id="cf-custom-area" style="display:none;margin-top:8px">
      <label class="label">${t('CIDR سفارشی (هر خط یک رنج)', 'Custom CIDRs (one per line)')}</label>
      <textarea id="cf-custom-cidrs" class="field" rows="3" placeholder="1.1.1.0/24&#10;8.8.8.0/24"></textarea>
    </div>
    <div class="flex" style="gap:8px;margin-top:10px;flex-wrap:wrap">
      <div><label class="label">${t('تعداد IP', 'IP Count')}: <span id="cf-count-val">500</span></label><input type="range" class="field" min="50" max="5000" step="50" value="500" id="cf-ip-count" style="padding:4px;width:200px"></div>
      <div><label class="label">${t('همزمانی', 'Concurrency')}</label><input id="cf-concurrency" class="field" type="number" value="30" min="1" max="100" style="width:80px"></div>
      <div style="display:flex;align-items:flex-end"><button class="primary-btn" id="cf-scan-btn">${t('شروع اسکن', 'Start Scan')}</button></div>
    </div>
  </div>

  <div class="panel" id="cf-suffix-panel">
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <label style="display:flex;align-items:center;gap:4px;font-size:.9rem"><input type="checkbox" id="cf-suffix-nova"> ${t('افزودن NovaProxy', 'Add NovaProxy suffix')}</label>
      <label style="display:flex;align-items:center;gap:4px;font-size:.9rem"><input type="checkbox" id="cf-suffix-subnet"> ${t('افزودن /24', 'Add /24 subnet')}</label>
      <label style="display:flex;align-items:center;gap:4px;font-size:.9rem"><input type="checkbox" id="cf-suffix-port" checked> ${t('به همراه پورت', 'With port')}</label>
      <select id="cf-suffix-port-val" class="field" style="width:auto;min-width:80px">
        <option value="443">443</option>
        <option value="80">80</option>
        <option value="8080">8080</option>
        <option value="8443">8443</option>
        <option value="2053">2053</option>
        <option value="2083">2083</option>
        <option value="2096">2096</option>
      </select>
    </div>
  </div>

  <div id="cf-progress-area" class="panel" style="display:none">
    <div class="flex" style="justify-content:space-between;align-items:center;margin-bottom:8px">
      <span>${t('پیشرفت', 'Progress')}: <span id="cf-progress-count">0/0</span></span>
      <span class="tiny">${t('موفق', 'Good')}: <span id="cf-good-count">0</span> · ${t('ناموفق', 'Bad')}: <span id="cf-bad-count">0</span> · <span id="cf-elapsed">0s</span></span>
    </div>
    <div class="progress"><span id="cf-progress-bar" style="width:0%"></span></div>
  </div>

  <div class="table-card" id="cf-results-area" style="display:none">
    <div class="table-scroll">
      <table>
        <thead><tr>
          <th>#</th><th>IP</th><th>${t('پینگ', 'Ping')}</th><th>${t('TLS', 'TLS')}</th><th>${t('وضعیت', 'Status')}</th><th></th>
        </tr></thead>
        <tbody id="cf-tbody"></tbody>
      </table>
    </div>
    <div style="padding:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="secondary-btn" id="cf-copy-all">${t('کپی همه', 'Copy All')}</button>
      <button class="secondary-btn" id="cf-export-plain">${t('خروجی لیست IP', 'Export IP List')}</button>
      <button class="secondary-btn" id="cf-export-vless">${t('خروجی VLESS', 'Export VLESS')}</button>
      <button class="secondary-btn" id="cf-clear">${t('پاک کردن', 'Clear')}</button>
    </div>
  </div>

  <div class="panel" id="cf-output-panel" style="display:none">
    <pre id="cf-output" class="out" style="min-height:80px;max-height:300px;overflow-y:auto"></pre>
    <div class="button-row" style="margin-top:8px">
      <button class="secondary-btn" id="cf-output-copy">${t('کپی', 'Copy')}</button>
      <button class="secondary-btn" id="cf-output-download">${t('دانلود', 'Download')}</button>
    </div>
  </div>
</div>`;
}

export function init(lang) {
  const isFa = lang === 'fa';
  const t = (fa, en) => isFa ? fa : en;
  let results = [];
  let scanning = false;
  let stopFlag = false;

  function suffixIP(ip, port) {
    let out = port ? `${ip}:${port}` : ip;
    if (document.getElementById('cf-suffix-nova').checked) out += `#Nova-${Math.random().toString(36).slice(2,7)}`;
    if (document.getElementById('cf-suffix-subnet').checked) out += '/24';
    return out;
  }

  function statusHTML(ok) {
    return `<span class="status ${ok?'good':'bad'}">${ok ? t('فعال','Online') : t('غیرفعال','Offline')}</span>`;
  }

  async function fetchRemoteCIDRs(providerId) {
    const url = FETCH_SOURCES[providerId];
    if (!url) return [];
    try {
      const r = await fetch(url);
      if (!r.ok) return [];
      if (providerId === 'cloudflare') {
        const txt = await r.text();
        return txt.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
      }
      const d = await r.json();
      return d.ipv4 || d.prefixes || [];
    } catch { return []; }
  }

  async function getCIDRs() {
    const sel = document.querySelector('input[name="cf-provider"]:checked');
    if (!sel) return [];
    const id = sel.value;
    if (id === 'custom') {
      return document.getElementById('cf-custom-cidrs').value.trim().split('\n').map(l => l.trim()).filter(l => /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(l));
    }
    if (id === 'cloudflare' || id === 'gcore' || id === 'fastly') {
      return await fetchRemoteCIDRs(id);
    }
    return PROVIDER_RANGES[id] || [];
  }

  async function pingIP(ip) {
    const start = performance.now();
    try {
      const ctrl = new AbortController();
      const tOut = setTimeout(() => ctrl.abort(), 3000);
      await fetch(`http://${ip}/`, { mode: 'no-cors', signal: ctrl.signal });
      clearTimeout(tOut);
      return performance.now() - start;
    } catch { return null; }
  }

  function tlsPing(ip) {
    return new Promise((resolve) => {
      const img = new Image();
      const tOut = setTimeout(() => { img.src = ''; resolve(null); }, 3000);
      const start = performance.now();
      img.onload = () => { clearTimeout(tOut); resolve(performance.now() - start); };
      img.onerror = () => { clearTimeout(tOut); resolve(performance.now() - start); };
      img.src = `https://${ip}/favicon.ico?t=${Date.now()}`;
    });
  }

  async function startScan() {
    if (scanning) return;
    const btn = document.getElementById('cf-scan-btn');
    const progressArea = document.getElementById('cf-progress-area');
    const progressBar = document.getElementById('cf-progress-bar');
    const progressCount = document.getElementById('cf-progress-count');
    const goodEl = document.getElementById('cf-good-count');
    const badEl = document.getElementById('cf-bad-count');
    const elapsedEl = document.getElementById('cf-elapsed');
    const tbody = document.getElementById('cf-tbody');
    const resultsArea = document.getElementById('cf-results-area');
    const outputPanel = document.getElementById('cf-output-panel');

    scanning = true;
    stopFlag = false;
    results = [];
    btn.textContent = t('در حال اسکن...', 'Scanning...');
    progressArea.style.display = 'block';
    resultsArea.style.display = 'none';
    outputPanel.style.display = 'none';
    tbody.innerHTML = '';
    progressBar.style.width = '0%';

    const count = parseInt(document.getElementById('cf-ip-count').value) || 500;
    const concurrency = parseInt(document.getElementById('cf-concurrency').value) || 30;

    let cidrs = await getCIDRs();
    if (!cidrs.length) {
      btn.textContent = t('شروع اسکن', 'Start Scan');
      scanning = false;
      return;
    }

    let ips = generateIPsFromCIDRs(cidrs, count);
    if (!ips.length) {
      btn.textContent = t('شروع اسکن', 'Start Scan');
      scanning = false;
      return;
    }

    ips = shuffle(ips).slice(0, count);
    const total = ips.length;
    let done = 0, good = 0, bad = 0;
    const startTime = Date.now();

    async function processIP(ip) {
      if (stopFlag) return;
      const ping = await pingIP(ip);
      if (stopFlag) return;
      let tlsTime = null;
      if (ping !== null) {
        tlsTime = await tlsPing(ip);
      }
      if (stopFlag) return;
      const ok = ping !== null && ping < 5000;
      if (ok) good++; else bad++;
      done++;

      const row = document.createElement('tr');
      row.innerHTML = `<td>${done}</td><td><code>${ip}</code></td><td>${ping !== null ? Math.round(ping)+'ms' : '-'}</td><td>${tlsTime !== null ? Math.round(tlsTime)+'ms' : '-'}</td><td>${statusHTML(ok)}</td><td><button class="secondary-btn" data-copy="${suffixIP(ip,443)}" style="font-size:.78rem;padding:4px 8px">${t('کپی','Copy')}</button></td>`;
      tbody.appendChild(row);
      if (ok) results.push({ ip, ping, tls: tlsTime });

      progressBar.style.width = `${(done/total*100).toFixed(1)}%`;
      progressCount.textContent = `${done}/${total}`;
      goodEl.textContent = good;
      badEl.textContent = bad;
      elapsedEl.textContent = `${((Date.now()-startTime)/1000).toFixed(0)}s`;
    }

    const queue = [...ips];
    async function worker() {
      while (queue.length && !stopFlag) {
        const ip = queue.shift();
        await processIP(ip);
      }
    }

    const workers = [];
    for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
      workers.push(worker());
    }
    await Promise.all(workers);

    scanning = false;
    btn.textContent = t('شروع اسکن', 'Start Scan');
    if (results.length) resultsArea.style.display = '';
  }

  function exportPlain() {
    const port = document.getElementById('cf-suffix-port-val').value;
    return results.map(r => suffixIP(r.ip, document.getElementById('cf-suffix-port').checked ? port : null)).join('\n');
  }

  function exportVLESS() {
    const uuid = 'b9c40223-bbc5-4311-89d3-f1ed54bbca86';
    const sni = 'nova2.altramax083.workers.dev';
    const path = '/';
    const port = document.getElementById('cf-suffix-port-val').value;
    return results.map(r => {
      const p = document.getElementById('cf-suffix-port').checked ? port : 443;
      let ip = r.ip;
      if (document.getElementById('cf-suffix-subnet').checked) ip += '/24';
      let out = `vless://${uuid}@${ip}:${p}?encryption=none&security=tls&sni=${sni}&fp=random&type=ws&host=${sni}&path=${encodeURIComponent(path)}`;
      if (document.getElementById('cf-suffix-nova').checked) out += `#Nova-${Math.random().toString(36).slice(2,7)}`;
      return out;
    }).join('\n\n');
  }

  function showOutput(text) {
    const panel = document.getElementById('cf-output-panel');
    const pre = document.getElementById('cf-output');
    if (text) {
      pre.textContent = text;
      panel.style.display = '';
    } else {
      panel.style.display = 'none';
    }
  }

  document.querySelectorAll('input[name="cf-provider"]').forEach(rb => {
    rb.addEventListener('change', function() {
      document.getElementById('cf-custom-area').style.display = this.value === 'custom' ? '' : 'none';
    });
  });

  document.getElementById('cf-ip-count').addEventListener('input', function() {
    document.getElementById('cf-count-val').textContent = this.value;
  });

  document.getElementById('cf-scan-btn').addEventListener('click', startScan);

  document.getElementById('cf-copy-all').addEventListener('click', () => {
    if (!results.length) return;
    navigator.clipboard.writeText(results.map(r => suffixIP(r.ip, document.getElementById('cf-suffix-port').checked ? document.getElementById('cf-suffix-port-val').value : null)).join('\n'));
  });

  document.getElementById('cf-tbody').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (btn) navigator.clipboard.writeText(btn.getAttribute('data-copy'));
  });

  document.getElementById('cf-export-plain').addEventListener('click', () => {
    showOutput(exportPlain());
  });

  document.getElementById('cf-export-vless').addEventListener('click', () => {
    showOutput(exportVLESS());
  });

  document.getElementById('cf-clear').addEventListener('click', () => {
    document.getElementById('cf-tbody').innerHTML = '';
    document.getElementById('cf-results-area').style.display = 'none';
    document.getElementById('cf-output-panel').style.display = 'none';
    document.getElementById('cf-progress-area').style.display = 'none';
    results = [];
  });

  document.getElementById('cf-output-copy').addEventListener('click', () => {
    const txt = document.getElementById('cf-output').textContent;
    if (txt) navigator.clipboard.writeText(txt);
  });

  document.getElementById('cf-output-download').addEventListener('click', () => {
    const txt = document.getElementById('cf-output').textContent;
    if (!txt) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
    a.download = `cdn-finder-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
  });
}
