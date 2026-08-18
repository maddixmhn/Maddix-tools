export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const providers = [
    { name: 'Cloudflare', ranges: ['1.0.0.0/24', '1.1.1.0/24', '104.16.0.0/12', '172.64.0.0/13'] },
    { name: 'Gcore', ranges: ['95.214.52.0/22', '185.128.80.0/22', '84.17.0.0/19'] },
    { name: 'Fastly', ranges: ['23.235.32.0/20', '104.156.80.0/20', '151.101.0.0/16'] },
    { name: 'Cloudfront', ranges: ['13.32.0.0/15', '54.192.0.0/16', '52.84.0.0/15'] },
    { name: 'Google', ranges: ['8.8.8.0/24', '8.8.4.0/24', '216.58.192.0/19'] },
  ];
  return `<div class="panel">
    <h3 class="section-title">${t('اسکنر CDN', 'CDN Scanner')}</h3>
    <div class="stack">
      <div>
        <label class="label">${t('ارائه‌دهنده‌های آماده', 'Preset Providers')}</label>
        <div class="chip-row">
          ${providers.map(p => `<button class="chip" onclick="csLoad('${p.name}')">${p.name}</button>`).join('')}
        </div>
      </div>
      <div>
        <label class="label">${t('رنج IP سفارشی', 'Custom IP Ranges (CIDR)')}</label>
        <textarea id="cs-ranges" class="field" rows="4" placeholder="1.1.1.0/24&#10;8.8.8.0/24"></textarea>
      </div>
      <button class="primary-btn" onclick="csScan()">${t('اسکن', 'Scan')}</button>
      <div id="cs-result" style="display:none">
        <div class="table-card">
          <div class="table-scroll">
            <table>
              <thead><tr><th>#</th><th>IP</th><th>${t('کپی', 'Copy')}</th></tr></thead>
              <tbody id="cs-tbody"></tbody>
            </table>
          </div>
        </div>
        <div class="subtle" id="cs-count"></div>
        <button class="secondary-btn" onclick="csCopyAll()">${t('کپی همه', 'Copy All')}</button>
      </div>
    </div>
  </div>`;
}

export function init() {
  const providers = [
    { name: 'Cloudflare', ranges: ['1.0.0.0/24', '1.1.1.0/24', '104.16.0.0/12', '172.64.0.0/13'] },
    { name: 'Gcore', ranges: ['95.214.52.0/22', '185.128.80.0/22', '84.17.0.0/19'] },
    { name: 'Fastly', ranges: ['23.235.32.0/20', '104.156.80.0/20', '151.101.0.0/16'] },
    { name: 'Cloudfront', ranges: ['13.32.0.0/15', '54.192.0.0/16', '52.84.0.0/15'] },
    { name: 'Google', ranges: ['8.8.8.0/24', '8.8.4.0/24', '216.58.192.0/19'] },
  ];
  let allIPs = [];

  function ipv4ToNum(ip) { return ip.split('.').reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0; }
  function numToIpv4(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }

  function expandCIDR(cidr) {
    const [ip, bits] = cidr.split('/');
    const mask = ~0 << (32 - parseInt(bits));
    const start = ipv4ToNum(ip) & mask;
    const end = start | (~mask >>> 0);
    const ips = [];
    for (let i = start; i <= end; i++) ips.push(numToIpv4(i));
    return ips;
  }

  window.csLoad = function(name) {
    const p = providers.find(x => x.name === name);
    if (p) document.getElementById('cs-ranges').value = p.ranges.join('\n');
  };

  window.csScan = function() {
    const input = document.getElementById('cs-ranges').value.trim();
    const cidrs = input.split('\n').filter(l => l.trim() && /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(l.trim()));
    if (!cidrs.length) return;
    allIPs = [];
    for (const c of cidrs) {
      try {
        const expanded = expandCIDR(c.trim());
        if (expanded.length > 65536) { allIPs.push(...expanded.slice(0, 65536)); break; }
        allIPs.push(...expanded);
      } catch(e) {}
    }
    const tbody = document.getElementById('cs-tbody');
    tbody.innerHTML = allIPs.slice(0, 1000).map((ip, i) =>
      '<tr><td>' + (i + 1) + '</td><td class="copy-cell" onclick="csCopyIP(\'' + ip + '\')">' + ip + '</td><td><button class="chip" onclick="csCopyIP(\'' + ip + '\')">' + '\ud83d\udccb' + '</button></td></tr>'
    ).join('');
    document.getElementById('cs-count').textContent = allIPs.length > 1000 ? 'Showing 1000 of ' + allIPs.length : 'Total: ' + allIPs.length;
    document.getElementById('cs-result').style.display = 'block';
  };

  window.csCopyIP = function(ip) { navigator.clipboard.writeText(ip); };
  window.csCopyAll = function() { navigator.clipboard.writeText(allIPs.join('\n')); };
}
