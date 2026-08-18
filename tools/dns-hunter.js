export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const domains = [
    { label: 'Google', host: 'google.com' },
    { label: 'YouTube', host: 'youtube.com' },
    { label: 'GitHub', host: 'github.com' },
    { label: 'Cloudflare', host: 'cloudflare.com' },
    { label: 'Telegram', host: 'telegram.org' },
    { label: 'Twitter', host: 'twitter.com' },
  ];

  return `<div dir="${dir}">
  <div class="panel">
    <div class="section-title">${t('DNS هانتر', 'DNS Hunter')}</div>
    <p class="subtle">${t('اسکن رکوردهای DNS، تست نشت و بررسی latency', 'DNS record scanning, leak testing, and latency checks')}</p>
  </div>

  <div id="dh-tabs" class="flex" style="gap:4px;margin-bottom:12px;flex-wrap:wrap">
    <button class="chip active" data-dhtab="dns-records">${t('رکوردها', 'Records')}</button>
    <button class="chip" data-dhtab="dns-latency">${t('Latency', 'Latency')}</button>
    <button class="chip" data-dhtab="dns-leak">${t('نشت DNS', 'DNS Leak')}</button>
    <button class="chip" data-dhtab="reverse-dns">${t('PTR', 'Reverse DNS')}</button>
    <button class="chip" data-dhtab="cidr-scan">${t('CIDR Scanner', 'CIDR Scanner')}</button>
  </div>

  <div id="dns-records" class="dhtab-content">
    <div class="panel">
      <div class="grid two">
        <div>
          <label class="label">${t('دامنه', 'Domain')}</label>
          <input id="dh-domain" class="field" placeholder="example.com">
        </div>
        <div>
          <label class="label">${t('نوع رکورد', 'Record Type')}</label>
          <select id="dh-type" class="field">
            <option value="ALL">${t('همه', 'ALL')}</option>
            <option value="A">A</option><option value="AAAA">AAAA</option>
            <option value="MX">MX</option><option value="CNAME">CNAME</option>
            <option value="TXT">TXT</option><option value="NS">NS</option>
            <option value="SOA">SOA</option><option value="SRV">SRV</option>
            <option value="CAA">CAA</option>
          </select>
        </div>
      </div>
      <div class="flex" style="gap:8px;margin-top:8px;flex-wrap:wrap">
        <button class="chip" data-dnsprov="cloudflare">Cloudflare</button>
        <button class="chip" data-dnsprov="google">Google</button>
        <button class="chip" data-dnsprov="quad9">Quad9</button>
      </div>
      <button class="primary-btn" id="dh-lookup" style="margin-top:8px">${t('جستجو', 'Lookup')}</button>
      <div id="dh-records-result" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>${t('نوع', 'Type')}</th><th>${t('نام', 'Name')}</th><th>${t('مقدار', 'Value')}</th><th>TTL</th></tr></thead>
          <tbody id="dh-records-body"></tbody>
        </table></div>
      </div>
    </div>
  </div>

  <div id="dns-latency" class="dhtab-content" style="display:none">
    <div class="panel">
      <label class="label">${t('بررسی latency DNS', 'DNS Latency Check')}</label>
      <div class="flex" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">
        ${domains.map(d => `<label style="display:inline-flex;align-items:center;gap:4px;font-size:.85rem"><input type="checkbox" class="dh-lat-domain" value="${d.host}" checked> ${d.label}</label>`).join('')}
      </div>
      <button class="primary-btn" id="dh-latency-btn">${t('اندازه‌گیری', 'Measure')}</button>
      <div id="dh-latency-result" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>${t('دامنه', 'Domain')}</th><th>${t('Cloudflare', 'Cloudflare')}</th><th>${t('Google', 'Google')}</th><th>${t('Quad9', 'Quad9')}</th></tr></thead>
          <tbody id="dh-latency-body"></tbody>
        </table></div>
      </div>
    </div>
  </div>

  <div id="dns-leak" class="dhtab-content" style="display:none">
    <div class="panel">
      <p class="subtle">${t('تست نشت DNS تشخیص می‌دهد که آیا queryهای DNS شما به سرورهای غیرمنتظره ارسال می‌شوند', 'DNS leak test detects if your DNS queries leak to unexpected servers')}</p>
      <button class="primary-btn" id="dh-leak-btn">${t('شروع تست نشت', 'Start Leak Test')}</button>
      <div id="dh-leak-result" class="panel" style="margin-top:12px;display:none">
        <div id="dh-leak-status" class="status good" style="font-size:1.1rem;padding:16px;text-align:center"></div>
        <div id="dh-leak-details" class="table-scroll" style="margin-top:8px">
          <table><thead><tr><th>${t('پروایدر', 'Provider')}</th><th>${t('آی‌پی', 'IP')}</th><th>${t('نتیجه', 'Result')}</th></tr></thead>
            <tbody id="dh-leak-body"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div id="reverse-dns" class="dhtab-content" style="display:none">
    <div class="panel">
      <label class="label">${t('Reverse DNS - جستجوی PTR', 'Reverse DNS - PTR Lookup')}</label>
      <input id="dh-reverse-ip" class="field" placeholder="8.8.8.8">
      <button class="primary-btn" id="dh-reverse-btn" style="margin-top:8px">${t('جستجو', 'Lookup')}</button>
      <div id="dh-reverse-result" class="panel" style="margin-top:12px;display:none"></div>
    </div>
  </div>

  <div id="cidr-scan" class="dhtab-content" style="display:none">
    <div class="panel">
      <label class="label">${t('اسکن CIDR - Reverse DNS نمونه‌گیری', 'CIDR Scanner - Sampled Reverse DNS')}</label>
      <input id="dh-cidr-input" class="field" placeholder="1.1.1.0/24">
      <div class="flex" style="gap:8px;margin-top:8px">
        <label style="font-size:.85rem">${t('تعداد نمونه', 'Samples')}: <input id="dh-cidr-samples" type="number" class="field" value="20" min="1" max="100" style="width:80px"></label>
      </div>
      <button class="primary-btn" id="dh-cidr-btn" style="margin-top:8px">${t('اسکن', 'Scan')}</button>
      <div id="dh-cidr-result" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>IP</th><th>${t('PTR', 'PTR Record')}</th><th>${t('وضعیت', 'Status')}</th></tr></thead>
          <tbody id="dh-cidr-body"></tbody>
        </table></div>
      </div>
    </div>
  </div>
</div>`;
}

// Will be reassigned in init
async function dnsQuery(domain, type, provider) {
  const typeMap = { 'A': 1, 'AAAA': 28, 'MX': 15, 'CNAME': 5, 'TXT': 16, 'NS': 2, 'SOA': 6, 'SRV': 33, 'CAA': 257 };
  const providers = { cloudflare: 'https://cloudflare-dns.com/dns-query', google: 'https://dns.google/resolve', quad9: 'https://dns.quad9.net/dns-query' };
  const url = `${providers[provider]}?name=${encodeURIComponent(domain)}&type=${typeMap[type] || 1}`;
  const r = await fetch(url, { headers: { 'accept': 'application/dns-json' } });
  return r.json();
}

function typeName(t) {
  const map = { 1: 'A', 28: 'AAAA', 15: 'MX', 5: 'CNAME', 16: 'TXT', 2: 'NS', 6: 'SOA', 33: 'SRV', 257: 'CAA', 65: 'HTTPS', 64: 'SVCB', 43: 'DS', 48: 'DNSKEY' };
  return map[t] || 'TYPE' + t;
}

function ms(v) { return v !== null && v !== undefined ? `${Math.round(v)}ms` : '-'; }

function ipToNum(ip) { return ip.split('.').reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0; }
function numToIP(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
function cidrToRange(cidr) {
  const [ip, bits] = cidr.split('/');
  const mask = ~0 << (32 - parseInt(bits));
  const start = ipToNum(ip) & mask;
  return { start, end: start | (~mask >>> 0) };
}

export function init(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;

  // Tab switching
  document.querySelectorAll('[data-dhtab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-dhtab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.dhtab-content').forEach(el => el.style.display = 'none');
      const target = document.getElementById(btn.getAttribute('data-dhtab'));
      if (target) target.style.display = '';
    });
  });

  // DNS provider button style
  document.querySelectorAll('[data-dnsprov]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-dnsprov]').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  // DNS Records Lookup
  document.getElementById('dh-lookup').addEventListener('click', async () => {
    const domain = document.getElementById('dh-domain').value.trim();
    if (!domain) return;
    const type = document.getElementById('dh-type').value;
    const activeProv = document.querySelector('[data-dnsprov].active') || document.querySelector('[data-dnsprov]');
    if (activeProv) activeProv.classList.add('active');
    const provider = activeProv ? activeProv.getAttribute('data-dnsprov') : 'cloudflare';
    const resultDiv = document.getElementById('dh-records-result');
    const tbody = document.getElementById('dh-records-body');
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">${t('در حال جستجو...', 'Looking up...')}</td></tr>`;
    resultDiv.style.display = '';

    try {
      const types = type === 'ALL' ? ['A', 'AAAA', 'MX', 'CNAME', 'TXT', 'NS', 'SOA', 'SRV', 'CAA'] : [type];
      let allAnswers = [];
      for (const rt of types) {
        const data = await dnsQuery(domain, rt, provider);
        if (data.Answer) allAnswers.push(...data.Answer.map(a => ({ ...a, queryType: rt })));
      }

      if (!allAnswers.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">${t('رکوردی یافت نشد', 'No records found')}</td></tr>`;
        return;
      }

      tbody.innerHTML = allAnswers.map((a, i) => `<tr><td>${typeName(a.type)}</td><td style="font-size:.82rem">${a.name}</td><td style="font-size:.82rem">${a.data}</td><td>${a.TTL || '-'}</td></tr>`).join('');
    } catch (e) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--danger)">${t('خطا', 'Error')}: ${e.message}</td></tr>`;
    }
  });

  // DNS Latency
  document.getElementById('dh-latency-btn').addEventListener('click', async () => {
    const domains = [...document.querySelectorAll('.dh-lat-domain:checked')].map(cb => cb.value);
    if (!domains.length) return;
    const providers = ['cloudflare', 'google', 'quad9'];
    const provLabels = { cloudflare: 'Cloudflare', google: 'Google', quad9: 'Quad9' };
    const tbody = document.getElementById('dh-latency-body');
    const resultDiv = document.getElementById('dh-latency-result');
    resultDiv.style.display = '';
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">${t('در حال اندازه‌گیری...', 'Measuring...')}</td></tr>`;

    const rows = [];
    for (const domain of domains) {
      const row = { domain };
      for (const prov of providers) {
        const start = performance.now();
        try {
          const ctrl = new AbortController();
          const tmo = setTimeout(() => ctrl.abort(), 5000);
          const url = prov === 'cloudflare' ? `https://cloudflare-dns.com/dns-query?name=${domain}&type=A` :
                      prov === 'google' ? `https://dns.google/resolve?name=${domain}&type=A` :
                      `https://dns.quad9.net/dns-query?name=${domain}&type=A`;
          await fetch(url, { headers: { 'accept': 'application/dns-json' }, signal: ctrl.signal });
          clearTimeout(tmo);
          row[prov] = performance.now() - start;
        } catch { row[prov] = null; }
      }
      rows.push(row);
    }

    tbody.innerHTML = rows.map(r => `<tr><td>${r.domain}</td>
      <td style="color:${r.cloudflare && r.cloudflare < 100 ? 'var(--success)' : r.cloudflare < 300 ? 'var(--warning)' : 'var(--danger)'}">${ms(r.cloudflare)}</td>
      <td style="color:${r.google && r.google < 100 ? 'var(--success)' : r.google < 300 ? 'var(--warning)' : 'var(--danger)'}">${ms(r.google)}</td>
      <td style="color:${r.quad9 && r.quad9 < 100 ? 'var(--success)' : r.quad9 < 300 ? 'var(--warning)' : 'var(--danger)'}">${ms(r.quad9)}</td></tr>`).join('');
  });

  // DNS Leak Test
  document.getElementById('dh-leak-btn').addEventListener('click', async () => {
    const statusEl = document.getElementById('dh-leak-status');
    const tbody = document.getElementById('dh-leak-body');
    const resultDiv = document.getElementById('dh-leak-result');
    resultDiv.style.display = '';
    statusEl.textContent = t('در حال تست...', 'Testing...');
    statusEl.className = 'status good';

    const providers = [
      { name: 'Cloudflare', url: 'https://cloudflare-dns.com/dns-query' },
      { name: 'Google', url: 'https://dns.google/resolve' },
      { name: 'Quad9', url: 'https://dns.quad9.net/dns-query' },
    ];

    const testDomain = 'leaktest-' + Math.random().toString(36).slice(2, 8) + '.com';
    const results = [];

    for (const p of providers) {
      try {
        const r = await fetch(`${p.url}?name=${testDomain}&type=A`, { headers: { 'accept': 'application/dns-json' } });
        const data = await r.json();
        const ips = data.Answer ? data.Answer.map(a => a.data).join(', ') : '-';
        results.push({ provider: p.name, ip: ips, ok: data.Status === 0 });
      } catch {
        results.push({ provider: p.name, ip: '-', ok: false });
      }
    }

    const leaked = results.some(r => r.ip !== '-' && r.ok);
    statusEl.textContent = leaked ? t('نشت DNS تشخیص داده شد!', 'DNS Leak Detected!') : t('بدون نشت DNS', 'No DNS Leak');
    statusEl.className = `status ${leaked ? 'bad' : 'good'}`;

    tbody.innerHTML = results.map(r => `<tr>
      <td>${r.provider}</td>
      <td style="font-size:.82rem">${r.ip}</td>
      <td><span class="status ${r.ok ? 'good' : 'bad'}">${r.ok ? 'OK' : 'FAIL'}</span></td>
    </tr>`).join('');
  });

  // Reverse DNS
  document.getElementById('dh-reverse-btn').addEventListener('click', async () => {
    const ip = document.getElementById('dh-reverse-ip').value.trim();
    if (!ip) return;
    const resultDiv = document.getElementById('dh-reverse-result');
    resultDiv.textContent = t('در حال جستجو...', 'Looking up...');
    resultDiv.style.display = '';

    try {
      const parts = ip.split('.');
      const reversed = [...parts].reverse().join('.');
      const r = await fetch(`https://dns.google/resolve?name=${reversed}.in-addr.arpa&type=PTR`, { headers: { 'accept': 'application/dns-json' } });
      const data = await r.json();
      if (data.Answer && data.Answer.length) {
        resultDiv.innerHTML = `<div class="flex" style="justify-content:space-between;align-items:center">
          <span><strong>${ip}</strong> → <code>${data.Answer[0].data}</code></span>
          <button class="chip" onclick="navigator.clipboard.writeText('${data.Answer[0].data}')">${t('کپی', 'Copy')}</button>
        </div>`;
      } else {
        resultDiv.innerHTML = `<span class="status bad">${t('رکورد PTR یافت نشد', 'No PTR record found')}</span>`;
      }
    } catch (e) {
      resultDiv.innerHTML = `<span class="status bad">${t('خطا', 'Error')}: ${e.message}</span>`;
    }
  });

  // CIDR Scanner
  document.getElementById('dh-cidr-btn').addEventListener('click', async () => {
    const cidr = document.getElementById('dh-cidr-input').value.trim();
    const samples = parseInt(document.getElementById('dh-cidr-samples').value) || 20;
    if (!cidr || !cidr.includes('/')) return;
    const resultDiv = document.getElementById('dh-cidr-result');
    const tbody = document.getElementById('dh-cidr-body');
    resultDiv.style.display = '';
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--text-3)">${t('در حال اسکن...', 'Scanning...')}</td></tr>`;

    try {
      const range = cidrToRange(cidr);
      const total = range.end - range.start + 1;
      const count = Math.min(samples, total);
      const ips = new Set();
      while (ips.size < count) {
        const n = range.start + Math.floor(Math.random() * total);
        ips.add(numToIP(n));
      }

      const rows = [];
      for (const ip of [...ips]) {
        try {
          const parts = ip.split('.');
          const reversed = [...parts].reverse().join('.');
          const r = await fetch(`https://dns.google/resolve?name=${reversed}.in-addr.arpa&type=PTR`, { headers: { 'accept': 'application/dns-json' } });
          const data = await r.json();
          const ptr = data.Answer && data.Answer.length ? data.Answer[0].data : '-';
          rows.push({ ip, ptr, ok: ptr !== '-' });
        } catch {
          rows.push({ ip, ptr: '-', ok: false });
        }
      }

      tbody.innerHTML = rows.map(r => `<tr>
        <td><code>${r.ip}</code></td>
        <td style="font-size:.82rem">${r.ptr}</td>
        <td><span class="status ${r.ok ? 'good' : 'bad'}">${r.ok ? 'OK' : 'N/A'}</span></td>
      </tr>`).join('');
    } catch (e) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--danger)">${t('خطا', 'Error')}: ${e.message}</td></tr>`;
    }
  });
}
