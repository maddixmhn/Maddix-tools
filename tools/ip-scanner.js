const LABELS = {
  fa: {
    title: 'اسکنر جامع آی‌پی', subtitle: 'اسکنر ترکیبی با قابلیت‌های پیشرفته - پشتیبانی از سورس‌های متعدد، آپلود فایل، و خروجی کانفیگ',
    sources: 'منابع آی‌پی', manual: 'ورودی دستی', fileUpload: 'آپلود فایل', cidr: 'رنج‌های CIDR',
    cfOfficial: 'کلودفلر رسمی', asn: 'ASN Sources', cmList: 'لیست CM', operators: 'اپراتورهای ایران',
    cdn: 'CDN Providers', fetchSources: 'دریافت منابع', fetching: 'دریافت...', refresh: 'تازه‌سازی',
    scanning: 'تنظیمات اسکن', ports: 'پورت‌ها', scanMethod: 'روش اسکن',
    methodHttp: 'HTTP Ping (تصویر)', methodFetch: 'Fetch Health Check', methodWebrtc: 'WebRTC Candidate',
    concurrency: 'همزمانی', count: 'تعداد آی‌پی', startScan: 'شروع اسکن', stopScan: 'توقف',
    results: 'نتایج', ip: 'آی‌پی', port: 'پورت', ping: 'پینگ', status: 'وضعیت', speed: 'سرعت',
    online: 'آنلاین', offline: 'آفلاین', ms: 'ms', mbps: 'Mbps', copy: 'کپی', copyAll: 'کپی همه',
    export: 'خروجی', exportConfig: 'خروجی کانفیگ', total: 'مجموع', alive: 'فعال', dead: 'غیرفعال',
    elapsed: 'زمان سپری شده', progress: 'پیشرفت', noResults: 'نتیجه‌ای یافت نشد',
    uploadFile: 'انتخاب فایل', uploadHint: 'فایل .txt با یک آی‌پی در هر خط',
    suffixSettings: 'تنظیمات سافیکس', addSuffix: 'افزودن سافیکس NovaProxy', addSubnet: 'افزودن /24',
    withPort: 'به همراه پورت', outputFormat: 'فرمت خروجی', configType: 'نوع کانفیگ',
    generate: 'تولید کانفیگ', uuid: 'UUID', sni: 'SNI', path: 'مسیر WebSocket',
    clash: 'Clash YAML', v2ray: 'V2Ray JSON', singbox: 'Sing-Box JSON', vless: 'VLESS Link',
    speedTest: 'تست سرعت', filter: 'فیلتر پینگ', clear: 'پاک کردن', download: 'دانلود',
    selectAll: 'انتخاب همه', deselectAll: 'لغو انتخاب', ipList: 'لیست آی‌پی',
  },
  en: {
    title: 'Universal IP Scanner', subtitle: 'Multi-source scanner with advanced features - file upload, config export, NovaProxy support',
    sources: 'IP Sources', manual: 'Manual Input', fileUpload: 'File Upload', cidr: 'CIDR Ranges',
    cfOfficial: 'Cloudflare Official', asn: 'ASN Sources', cmList: 'CM List', operators: 'Iran Operators',
    cdn: 'CDN Providers', fetchSources: 'Fetch Sources', fetching: 'Fetching...', refresh: 'Refresh',
    scanning: 'Scan Settings', ports: 'Ports', scanMethod: 'Scan Method',
    methodHttp: 'HTTP Ping (Image)', methodFetch: 'Fetch Health Check', methodWebrtc: 'WebRTC Candidate',
    concurrency: 'Concurrency', count: 'IP Count', startScan: 'Start Scan', stopScan: 'Stop',
    results: 'Results', ip: 'IP', port: 'Port', ping: 'Ping', status: 'Status', speed: 'Speed',
    online: 'Online', offline: 'Offline', ms: 'ms', mbps: 'Mbps', copy: 'Copy', copyAll: 'Copy All',
    export: 'Export', exportConfig: 'Config Export', total: 'Total', alive: 'Alive', dead: 'Dead',
    elapsed: 'Elapsed', progress: 'Progress', noResults: 'No results found',
    uploadFile: 'Choose File', uploadHint: '.txt file with one IP per line',
    suffixSettings: 'Suffix Settings', addSuffix: 'Add NovaProxy suffix', addSubnet: 'Add /24 subnet',
    withPort: 'Include port', outputFormat: 'Output Format', configType: 'Config Type',
    generate: 'Generate Config', uuid: 'UUID', sni: 'SNI', path: 'WebSocket Path',
    clash: 'Clash YAML', v2ray: 'V2Ray JSON', singbox: 'Sing-Box JSON', vless: 'VLESS Link',
    speedTest: 'Speed Test', filter: 'Ping Filter', clear: 'Clear', download: 'Download',
    selectAll: 'Select All', deselectAll: 'Deselect All', ipList: 'IP List',
  }
};

const IRAN_OPERATORS = {
  mci: { name: 'MCI (Hamrah-e Aval)', ranges: ['104.16.24.0/14', '172.67.10.0/15', '162.159.36.0/16'] },
  mtn: { name: 'MTN (Irancell)', ranges: ['108.162.192.0/18', '104.18.45.0/14', '172.64.50.0/14'] },
  ict: { name: 'ICT (Shatel)', ranges: ['104.16.0.0/12', '162.159.0.0/16'] },
};

const COMMON_PORTS = [80, 443, 8080, 8443, 2053, 2083, 2087, 2096, 853, 2052, 2082, 2086, 2095];

const CDN_SOURCES = {
  cloudflare: 'https://www.cloudflare.com/ips-v4/',
  gcore: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/gcore.json',
  fastly: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/fastly.json',
};

const CF_CIDRS = ['173.245.48.0/20','103.21.244.0/22','103.22.200.0/22','103.31.4.0/22','141.101.64.0/18','108.162.192.0/18','190.93.240.0/20','188.114.96.0/20','197.234.240.0/22','198.41.128.0/17','162.158.0.0/15','104.16.0.0/13','104.24.0.0/14','172.64.0.0/13','131.0.72.0/22'];

const ASN_URLS = {
  'AS13335': 'https://ipverse.net/asn-ip/13335/ipv4-aggregated.txt',
  'AS209242': 'https://ipverse.net/asn-ip/209242/ipv4-aggregated.txt',
  'AS24429': 'https://ipverse.net/asn-ip/24429/ipv4-aggregated.txt',
  'AS199524': 'https://ipverse.net/asn-ip/199524/ipv4-aggregated.txt',
};

function t(lang, key) {
  const k = key.split('.');
  let v = LABELS[lang] || LABELS.en;
  for (const p of k) v = v[p];
  return v || key;
}

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }

function cidrToRange(cidr) {
  const [ip, bits] = cidr.split('/');
  const b = parseInt(bits);
  const o = ip.split('.').map(Number);
  const n = ((o[0]<<24)+(o[1]<<16)+(o[2]<<8)+o[3])>>>0;
  const m = ~0 << (32 - b);
  return { start: n & m, end: n | (~m >>> 0) };
}

function randIPFromRange(start, end) {
  const n = start + Math.floor(Math.random() * (end - start + 1));
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
}

function ipToNum(ip) {
  const o = ip.split('.').map(Number);
  return ((o[0]<<24)+(o[1]<<16)+(o[2]<<8)+o[3])>>>0;
}

function numToIP(n) {
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
}

async function fetchCFRanges() {
  try {
    const r = await fetch('https://www.cloudflare.com/ips-v4/');
    const txt = await r.text();
    return txt.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  } catch { return CF_CIDRS; }
}

async function fetchASNRanges(asn) {
  try {
    const r = await fetch(ASN_URLS[asn]);
    const txt = await r.text();
    return txt.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#') && l.includes('/'));
  } catch { return []; }
}

async function fetchCMList() {
  try {
    const r = await fetch('https://raw.githubusercontent.com/cmliu/cmliu/main/CF-CIDR.txt');
    const txt = await r.text();
    return txt.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  } catch { return []; }
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

export default function render(lang) {
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const portsHtml = COMMON_PORTS.map(p => `<label style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:var(--bg-3);border-radius:8px;cursor:pointer;font-size:.85rem"><input type="checkbox" class="scan-port" value="${p}" ${[443,80,8080,2053,2083].includes(p)?'checked':''}><span>${p}</span></label>`).join('');

  return `<div dir="${dir}" id="scanner-root">
  <div class="panel">
    <div class="section-title">${isFa ? '📡 اسکنر ترکیبی آی‌پی' : '📡 Universal IP Scanner'}</div>
    <p class="subtle">${t(lang, 'subtitle')}</p>
  </div>

  <div class="grid two">
    <div class="panel">
      <h3 class="section-title">📦 ${t(lang, 'sources')}</h3>
      <div class="stack">
        <div><label class="label"><input type="checkbox" id="src-cf" checked> ${t(lang, 'cfOfficial')}</label></div>
        <div><label class="label" style="font-size:.85rem">${t(lang, 'asn')}</label>
          ${Object.keys(ASN_URLS).map(a => `<label style="display:inline-flex;align-items:center;gap:4px;margin:2px 6px 2px 0;font-size:.82rem"><input type="checkbox" class="src-asn" value="${a}"> ${a}</label>`).join('')}
        </div>
        <div><label class="label"><input type="checkbox" id="src-cm"> ${t(lang, 'cmList')}</label></div>
        <div><label class="label" style="font-size:.85rem">${t(lang, 'operators')}</label>
          ${Object.entries(IRAN_OPERATORS).map(([k,v]) => `<label style="display:inline-flex;align-items:center;gap:4px;margin:2px 6px 2px 0;font-size:.82rem"><input type="checkbox" class="src-op" value="${k}"> ${v.name}</label>`).join('')}
        </div>
        <button class="secondary-btn" id="fetchSourcesBtn" style="margin-top:8px">🔄 ${t(lang, 'fetchSources')}</button>
      </div>
    </div>

    <div class="panel">
      <h3 class="section-title">📝 ${t(lang, 'manual')}</h3>
      <textarea id="manualIPs" class="field" rows="4" placeholder="${isFa ? 'یک آی‌پی در هر خط' : 'One IP per line'}"></textarea>
      <div style="margin-top:8px">
        <label class="label">${t(lang, 'fileUpload')}</label>
        <input type="file" id="fileUpload" accept=".txt,.csv" style="font-size:.85rem">
        <p class="tiny" id="uploadCount"></p>
      </div>
      <div style="margin-top:8px">
        <label class="label">${t(lang, 'cidr')}</label>
        <textarea id="customCIDRs" class="field" rows="2" placeholder="1.1.1.0/24"></textarea>
      </div>
    </div>
  </div>

  <div class="panel">
    <h3 class="section-title">⚙️ ${t(lang, 'scanning')}</h3>
    <div class="grid two">
      <div>
        <label class="label">${t(lang, 'ports')}</label>
        <div style="display:flex;flex-wrap:wrap;gap:4px">${portsHtml}</div>
      </div>
      <div>
        <label class="label">${t(lang, 'scanMethod')}</label>
        <select id="scanMethod" class="field">
          <option value="http">${t(lang, 'methodHttp')}</option>
          <option value="fetch">${t(lang, 'methodFetch')}</option>
        </select>
        <div class="grid two" style="margin-top:8px">
          <div><label class="label">${t(lang, 'concurrency')}</label><input id="concurrency" class="field" type="number" value="20" min="1" max="100"></div>
          <div><label class="label">${t(lang, 'count')}</label><input id="ipCount" class="field" type="number" value="50" min="1" max="1000"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="primary-btn" id="startScanBtn">🚀 ${t(lang, 'startScan')}</button>
      <button class="danger-btn" id="stopScanBtn" style="display:none">⏹ ${t(lang, 'stopScan')}</button>
    </div>
  </div>

  <div id="progressArea" class="panel" style="display:none">
    <div class="flex" style="justify-content:space-between;align-items:center;margin-bottom:8px">
      <span><span id="progressLabel">${t(lang, 'progress')}</span>: <span id="progressCount">0/0</span></span>
      <span class="tiny"><span id="aliveCount">0</span> ${t(lang, 'alive')} · <span id="deadCount">0</span> ${t(lang, 'dead')} · <span id="elapsedTime">0s</span></span>
    </div>
    <div class="progress"><span id="progressBar" style="width:0%"></span></div>
  </div>

  <div class="panel" id="suffixPanel">
    <h3 class="section-title">🏷️ ${t(lang, 'suffixSettings')}</h3>
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <label style="display:flex;align-items:center;gap:4px;font-size:.9rem"><input type="checkbox" id="suffix-nova"> ${t(lang, 'addSuffix')}</label>
      <label style="display:flex;align-items:center;gap:4px;font-size:.9rem"><input type="checkbox" id="suffix-subnet"> ${t(lang, 'addSubnet')}</label>
      <label style="display:flex;align-items:center;gap:4px;font-size:.9rem"><input type="checkbox" id="suffix-port" checked> ${t(lang, 'withPort')}</label>
      <select id="suffixPort" class="field" style="width:auto;min-width:80px">
        ${COMMON_PORTS.map(p => `<option value="${p}">${p}</option>`).join('')}
      </select>
    </div>
  </div>

  <div class="panel" id="configPanel" style="display:none">
    <h3 class="section-title">🔧 ${t(lang, 'exportConfig')}</h3>
    <div class="grid two">
      <div>
        <label class="label">${t(lang, 'configType')}</label>
        <select id="configType" class="field">
          <option value="plain">${t(lang, 'ipList')}</option>
          <option value="vless">VLESS</option>
          <option value="clash">${t(lang, 'clash')}</option>
          <option value="singbox">${t(lang, 'singbox')}</option>
        </select>
      </div>
      <div class="grid two">
        <div><label class="label">${t(lang, 'uuid')}</label><input id="cfg-uuid" class="field" value="b9c40223-bbc5-4311-89d3-f1ed54bbca86"></div>
        <div><label class="label">SNI</label><input id="cfg-sni" class="field" value="nova2.altramax083.workers.dev"></div>
      </div>
    </div>
    <div style="margin-top:8px">
      <label class="label">${t(lang, 'path')}</label>
      <input id="cfg-path" class="field" value="/">
    </div>
    <button class="primary-btn" id="generateConfigBtn" style="margin-top:8px">⚡ ${t(lang, 'generate')}</button>
    <pre id="configOutput" class="out" style="margin-top:8px;display:none"></pre>
    <div class="button-row" style="margin-top:8px">
      <button class="secondary-btn" id="copyConfigBtn">📋 ${t(lang, 'copy')}</button>
      <button class="secondary-btn" id="downloadConfigBtn">💾 ${t(lang, 'download')}</button>
    </div>
  </div>

  <div class="section-title">${t(lang, 'results')}</div>
  <div class="table-card">
    <div class="table-scroll">
      <table>
        <thead><tr>
          <th>#</th><th>${t(lang, 'ip')}</th><th>${t(lang, 'port')}</th><th>${t(lang, 'ping')}</th><th>${t(lang, 'status')}</th><th></th>
        </tr></thead>
        <tbody id="resultsBody"></tbody>
      </table>
    </div>
    <div style="padding:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="secondary-btn" id="copyResultsBtn">📋 ${t(lang, 'copyAll')}</button>
      <button class="secondary-btn" id="clearResultsBtn">🗑️ ${t(lang, 'clear')}</button>
    </div>
  </div>
  <div id="scanner-noResults" class="panel" style="text-align:center;color:var(--text-3);padding:40px">${t(lang, 'noResults')}</div>
</div>`;
}

export function init(lang) {
  const isFa = lang === 'fa';
  let scanning = false;
  let stopFlag = false;
  let results = [];

  function statusHTML(ok) {
    return `<span class="status ${ok?'good':'bad'}">${ok ? t(lang,'online') : t(lang,'offline')}</span>`;
  }

  function formatIP(ip, port, ping) {
    let s = port ? `${ip}:${port}` : ip;
    if (document.getElementById('suffix-nova')?.checked) s += `#Nova-${Math.random().toString(36).slice(2,7)}`;
    if (document.getElementById('suffix-subnet')?.checked) s += '/24';
    return s;
  }

  function suffixIpPort(ip, port) {
    let out = port ? `${ip}:${port}` : ip;
    if (document.getElementById('suffix-nova')?.checked) out += `#Nova-${Math.random().toString(36).slice(2,7)}`;
    if (document.getElementById('suffix-subnet')?.checked) out += '/24';
    return out;
  }

  async function collectIPs() {
    const allIPs = new Set();
    const count = parseInt(document.getElementById('ipCount').value) || 50;

    if (document.getElementById('src-cf').checked) {
      const cidrs = await fetchCFRanges();
      const ips = generateIPsFromCIDRs(cidrs, Math.ceil(count * 0.4));
      ips.forEach(ip => allIPs.add(ip));
    }

    const asnChecks = document.querySelectorAll('.src-asn:checked');
    for (const cb of asnChecks) {
      const cidrs = await fetchASNRanges(cb.value);
      const ips = generateIPsFromCIDRs(cidrs, Math.ceil(count * 0.15));
      ips.forEach(ip => allIPs.add(ip));
    }

    if (document.getElementById('src-cm').checked) {
      const cidrs = await fetchCMList();
      const ips = generateIPsFromCIDRs(cidrs, Math.ceil(count * 0.15));
      ips.forEach(ip => allIPs.add(ip));
    }

    const opChecks = document.querySelectorAll('.src-op:checked');
    for (const cb of opChecks) {
      const ranges = IRAN_OPERATORS[cb.value]?.ranges || [];
      const ips = generateIPsFromCIDRs(ranges, Math.ceil(count * 0.1));
      ips.forEach(ip => allIPs.add(ip));
    }

    const customCIDRs = document.getElementById('customCIDRs').value.trim().split('\n').filter(l => l.trim());
    if (customCIDRs.length) {
      const ips = generateIPsFromCIDRs(customCIDRs, Math.ceil(count * 0.2));
      ips.forEach(ip => allIPs.add(ip));
    }

    const manualIPs = document.getElementById('manualIPs').value.trim().split('\n').map(l => l.trim()).filter(l => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(l));
    manualIPs.forEach(ip => allIPs.add(ip));

    const fileInput = document.getElementById('fileUpload');
    if (fileInput.files.length) {
      const txt = await fileInput.files[0].text();
      const fileIPs = txt.split('\n').map(l => l.trim()).filter(l => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(l));
      fileIPs.forEach(ip => allIPs.add(ip));
    }

    return shuffle([...allIPs]).slice(0, count);
  }

  async function pingIP(ip, port, method) {
    const url = `http://${ip}`;
    const start = performance.now();
    try {
      if (method === 'fetch') {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3000);
        await fetch(url, { mode: 'no-cors', signal: ctrl.signal });
        clearTimeout(t);
        return performance.now() - start;
      } else {
        return await new Promise((resolve) => {
          const img = new Image();
          const t = setTimeout(() => { img.src = ''; resolve(null); }, 3000);
          const start2 = performance.now();
          img.onload = () => { clearTimeout(t); resolve(performance.now() - start2); };
          img.onerror = () => { clearTimeout(t); resolve(performance.now() - start2); };
          img.src = `${url}/favicon.ico?t=${Date.now()}`;
        });
      }
    } catch { return null; }
  }

  async function startScan() {
    const btn = document.getElementById('startScanBtn');
    const stopBtn = document.getElementById('stopScanBtn');
    const progressArea = document.getElementById('progressArea');
    const progressBar = document.getElementById('progressBar');
    const progressCount = document.getElementById('progressCount');
    const aliveEl = document.getElementById('aliveCount');
    const deadEl = document.getElementById('deadCount');
    const elapsedEl = document.getElementById('elapsedTime');
    const tbody = document.getElementById('resultsBody');
    const noResults = document.getElementById('scanner-noResults');

    scanning = true;
    stopFlag = false;
    results = [];
    btn.style.display = 'none';
    stopBtn.style.display = '';
    progressArea.style.display = 'block';
    noResults.style.display = 'none';
    tbody.innerHTML = '';

    const method = document.getElementById('scanMethod').value;
    const concurrency = parseInt(document.getElementById('concurrency').value) || 20;
    const selectedPorts = [...document.querySelectorAll('.scan-port:checked')].map(cb => parseInt(cb.value));
    const ipList = await collectIPs();

    if (!ipList.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-3);padding:24px">${t(lang,'noResults')}</td></tr>`;
      scanning = false;
      btn.style.display = '';
      stopBtn.style.display = 'none';
      return;
    }

    const total = ipList.length * selectedPorts.length;
    let done = 0, alive = 0, dead = 0;
    const startTime = Date.now();

    async function processItem(ip, port) {
      if (stopFlag) return;
      const ping = await pingIP(ip, port, method);
      if (stopFlag) return;
      const ok = ping !== null && ping < 5000;
      if (ok) alive++; else dead++;
      done++;
      const row = document.createElement('tr');
      const idx = done;
      row.innerHTML = `<td>${idx}</td><td><code>${ip}</code></td><td>${port}</td><td>${ping ? Math.round(ping)+'ms' : '-'}</td><td>${statusHTML(ok)}</td><td><button class="secondary-btn" data-copy="${suffixIpPort(ip,port)}" style="font-size:.78rem;padding:4px 8px">${t(lang,'copy')}</button></td>`;
      tbody.appendChild(row);
      if (ok) results.push({ ip, port, ping });

      progressBar.style.width = `${(done/total*100).toFixed(1)}%`;
      progressCount.textContent = `${done}/${total}`;
      aliveEl.textContent = alive;
      deadEl.textContent = dead;
      elapsedEl.textContent = `${((Date.now()-startTime)/1000).toFixed(0)}s`;
    }

    const queue = [];
    for (const ip of ipList) {
      for (const port of selectedPorts) {
        queue.push([ip, port]);
      }
    }

    async function worker() {
      while (queue.length && !stopFlag) {
        const item = queue.shift();
        await processItem(item[0], item[1]);
      }
    }

    const workers = [];
    for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
      workers.push(worker());
    }
    await Promise.all(workers);

    scanning = false;
    btn.style.display = '';
    stopBtn.style.display = 'none';
    if (!results.length) noResults.style.display = '';

    document.getElementById('configPanel').style.display = results.length ? 'block' : 'none';
  }

  document.getElementById('startScanBtn').addEventListener('click', startScan);
  document.getElementById('stopScanBtn').addEventListener('click', () => { stopFlag = true; });
  document.getElementById('clearResultsBtn').addEventListener('click', () => {
    document.getElementById('resultsBody').innerHTML = '';
    document.getElementById('scanner-noResults').style.display = '';
    document.getElementById('configPanel').style.display = 'none';
    results = [];
  });

  document.getElementById('copyResultsBtn').addEventListener('click', () => {
    const txt = results.map(r => suffixIpPort(r.ip, r.port)).join('\n');
    navigator.clipboard.writeText(txt);
  });

  document.getElementById('resultsBody').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (btn) navigator.clipboard.writeText(btn.getAttribute('data-copy'));
  });

  document.getElementById('generateConfigBtn').addEventListener('click', () => {
    const type = document.getElementById('configType').value;
    const uuid = document.getElementById('cfg-uuid').value.trim();
    const sni = document.getElementById('cfg-sni').value.trim();
    const wspath = document.getElementById('cfg-path').value.trim() || '/';
    const suffixPort = parseInt(document.getElementById('suffixPort').value);
    const out = document.getElementById('configOutput');

    let txt = '';
    if (type === 'plain') {
      txt = results.map(r => suffixIpPort(r.ip, r.port || suffixPort)).join('\n');
    } else if (type === 'vless') {
      txt = results.map(r => {
        const addr = r.ip;
        const p = r.port || suffixPort;
        return `vless://${uuid}@${addr}:${p}?encryption=none&security=tls&sni=${sni}&fp=random&type=ws&host=${sni}&path=${encodeURIComponent(wspath)}#Maddix-${addr}`;
      }).join('\n\n');
    } else if (type === 'clash') {
      txt = 'proxies:\n' + results.map(r => {
        const addr = r.ip;
        const p = r.port || suffixPort;
        return `  - name: "Maddix-${addr}"\n    type: vless\n    server: ${addr}\n    port: ${p}\n    uuid: ${uuid}\n    network: ws\n    tls: true\n    servername: ${sni}\n    ws-opts:\n      path: "${wspath}"\n      headers:\n        Host: ${sni}`;
      }).join('\n');
    } else if (type === 'singbox') {
      txt = '[\n' + results.map((r, i) => {
        const addr = r.ip;
        const p = r.port || suffixPort;
        return `  {\n    "tag": "Maddix-${i}",\n    "type": "vless",\n    "server": "${addr}",\n    "server_port": ${p},\n    "uuid": "${uuid}",\n    "tls": {\n      "enabled": true,\n      "server_name": "${sni}"\n    },\n    "transport": {\n      "type": "ws",\n      "path": "${wspath}"\n    }\n  }`;
      }).join(',\n') + '\n]';
    }
    out.textContent = txt;
    out.style.display = 'block';
  });

  document.getElementById('copyConfigBtn').addEventListener('click', () => {
    const txt = document.getElementById('configOutput').textContent;
    if (txt) navigator.clipboard.writeText(txt);
  });

  document.getElementById('downloadConfigBtn').addEventListener('click', () => {
    const txt = document.getElementById('configOutput').textContent;
    if (!txt) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
    a.download = `maddix-scan-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
  });

  document.getElementById('fetchSourcesBtn').addEventListener('click', startScan);
  document.getElementById('fileUpload').addEventListener('change', (e) => {
    if (e.target.files.length) {
      document.getElementById('uploadCount').textContent = `${isFa ? 'فایل انتخاب شد' : 'File selected'}: ${e.target.files[0].name}`;
    }
  });
}
