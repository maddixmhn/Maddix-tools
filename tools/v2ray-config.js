const b64 = { encode: s => btoa(s), decode: s => atob(s) };
const ipaddr = {
  isValid(ip) {
    if (this.IPv4.isValid(ip)) return true;
    if (this.IPv6.isValid(ip)) return true;
    return false;
  },
  parse(ip) {
    if (this.IPv4.isValid(ip)) return this.IPv4.parse(ip);
    return this.IPv6.parse(ip);
  },
  parseCIDR(cidr) {
    let parts = cidr.split('/');
    let ip = this.parse(parts[0]);
    let bits = parseInt(parts[1]);
    return [ip, bits];
  },
  IPv4: {
    isValid(ip) { return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split('.').every(n => +n >= 0 && +n <= 255); },
    parse(ip) { return new this(ip.split('.').map(Number)); },
    octetsToNumeric(o) { return ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0; },
    numericToOctets(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]; },
    cidrRange(ip, bits) {
      let mask = ~0 << (32 - bits);
      let start = this.octetsToNumeric(ip.octets) & mask;
      let end = start | (~mask >>> 0);
      return { start, end };
    }
  },
  IPv6: {
    isValid(ip) { return /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:)*:[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4})*$|^::$/.test(ip); },
    parse(ip) { return new this(ip); }
  }
};
function IPv4(octets) { this.octets = octets; this.kind = () => 'ipv4'; this.toString = () => octets.join('.'); this.match = function(r) { return true; }; }
function IPv6(parts) { this.parts = parts; this.kind = () => 'ipv6'; this.toString = () => parts.join(':'); this.match = function(r) { return true; }; }
IPv4.prototype = new IPv4([]);
IPv6.prototype = new IPv6([]);
ipaddr.IPv4.prototype = IPv4.prototype;
ipaddr.IPv6.prototype = IPv6.prototype;

function shuffleArray(a) { for (let i = a.length - 1; i > 0; i--) { let j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }

function detechConfigType(c) {
  if (c.startsWith('vmess://')) return 'vmess';
  if (c.startsWith('vless://')) return 'vless';
  if (c.startsWith('trojan://')) return 'trojan';
  if (c.startsWith('wireguard://')) return 'wireguard';
  return null;
}

function extractAddrFromConfig(c) {
  let t = detechConfigType(c);
  if (t === 'vmess') {
    try { return JSON.parse(b64.decode(c.slice(8))).add; } catch(e) { return null; }
  }
  if (t === 'vless') {
    let m = c.match(/vless:\/\/[^@]+@([^:]+):(\d+)/);
    return m ? m[1] : null;
  }
  if (t === 'trojan') {
    let m = c.match(/trojan:\/\/[^@]+@([^:]+):(\d+)/);
    return m ? m[1] : null;
  }
  if (t === 'wireguard') {
    let m = c.match(/wireguard:\/\/[^@]+@([^:]+):(\d+)/);
    return m ? m[1] : null;
  }
  return null;
}

function isValidCIDR(c) {
  return /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(c) || /^[0-9a-fA-F:]+\/\d{1,3}$/.test(c);
}

function incIP(ip) {
  if (ip.kind() === 'ipv4') {
    let n = ipaddr.IPv4.octetsToNumeric(ip.octets) + 1;
    let o = ipaddr.IPv4.numericToOctets(n);
    return new IPv4(o);
  }
  if (ip.kind() === 'ipv6') {
    let p = ip.parts.map(x => BigInt(parseInt(x, 16) || 0));
    let i = p.length - 1;
    while (i >= 0) { p[i]++; if (p[i] > 0xFFFFn) { p[i] = 0n; i--; } else break; }
    return new IPv6(p.map(x => x.toString(16)));
  }
  return ip;
}

function replaceIPInConfig(c, addr, port) {
  let t = detechConfigType(c);
  let a = typeof addr === 'string' ? addr : addr.toString();
  if (t === 'vmess') {
    try {
      let j = JSON.parse(b64.decode(c.slice(8)));
      j.add = a;
      if (port) j.port = parseInt(port);
      return 'vmess://' + b64.encode(JSON.stringify(j));
    } catch(e) { return c; }
  }
  if (t === 'vless') {
    a = a.includes(':') && !a.startsWith('[') ? '[' + a + ']' : a;
    return c.replace(/^(vless:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1, p2) => p1 + a + ':' + (port || p2));
  }
  if (t === 'trojan') {
    return c.replace(/^(trojan:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1, p2) => p1 + a + ':' + (port || p2));
  }
  if (t === 'wireguard') {
    return c.replace(/^(wireguard:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1, p2) => p1 + a + ':' + (port || p2));
  }
  return c;
}

const CDN_URLS = {
  cloudflare: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/cloudflare.json',
  gcore: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/gcore.json',
  fastly: 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/fastly.json',
};

export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  return `<div class="panel">
    <h3 class="section-title">${t('تغییر کانفیگ V2Ray', 'V2Ray Config Modifier')}</h3>
    <div class="stack">
      <div>
        <label class="label">${t('نوع ورودی', 'Input Type')}</label>
        <select id="v2-type" class="field" onchange="v2ToggleFields()">
          <option value="cidr">${t('رنج CIDR', 'CIDR Range')}</option>
          <option value="list">${t('لیست IP', 'IP List')}</option>
          <option value="configList">${t('لیست کانفیگ', 'Config List')}</option>
          <option value="sniSpoof">${t('SNI Spoof', 'SNI Spoof')}</option>
        </select>
      </div>
      <div>
        <label class="label">${t('کانفیگ پایه', 'Base Config')}</label>
        <textarea id="v2-base" class="field" rows="4" placeholder="vmess://... / vless://... / trojan://... / wireguard://..."></textarea>
      </div>
      <div id="v2-cidr">
        <label class="label">${t('رنج IP (CIDR)', 'IP Ranges (CIDR)')}</label>
        <div class="chip-row" style="margin-bottom:8px">
          <button class="chip" onclick="v2LoadCDN('cloudflare')">Cloudflare</button>
          <button class="chip" onclick="v2LoadCDN('gcore')">Gcore</button>
          <button class="chip" onclick="v2LoadCDN('fastly')">Fastly</button>
        </div>
        <textarea id="v2-range" class="field" rows="3" placeholder="1.1.1.0/24"></textarea>
        <label class="label" style="margin-top:8px">${t('تعداد خروجی', 'Output Count')}: <span id="v2-count-val">5000</span></label>
        <input type="range" class="field" min="100" max="50000" step="100" value="5000" id="v2-count" oninput="document.getElementById('v2-count-val').textContent=this.value" style="padding:4px">
      </div>
      <div id="v2-list" style="display:none">
        <label class="label">${t('لیست IP', 'IP List')}</label>
        <textarea id="v2-ip-list" class="field" rows="5" placeholder="1.1.1.1&#10;8.8.8.8"></textarea>
      </div>
      <div id="v2-config-list" style="display:none">
        <label class="label">${t('لیست کانفیگ', 'Config List')}</label>
        <textarea id="v2-cfg-list" class="field" rows="5" placeholder="vmess://...&#10;vless://..."></textarea>
      </div>
      <div id="v2-sni" style="display:none">
        <div class="grid two">
          <div><label class="label">${t('IP اسپوف', 'Spoof IP')}</label><input id="v2-spoof-ip" class="field" type="text" value="127.0.0.1"></div>
          <div><label class="label">${t('پورت', 'Port')}</label><input id="v2-spoof-port" class="field" type="number" value="40443"></div>
        </div>
      </div>
      <button class="primary-btn" onclick="v2Generate()">${t('تولید کانفیگ', 'Generate Configs')}</button>
      <div id="v2-output-area" style="display:none">
        <pre id="v2-output" class="out" style="min-height:100px"></pre>
        <div class="button-row">
          <button class="secondary-btn" onclick="v2Copy()">${t('کپی', 'Copy')}</button>
          <button class="secondary-btn" onclick="v2Download()">${t('دانلود', 'Download')}</button>
        </div>
      </div>
    </div>
  </div>`;
}

export function init() {
  window.v2ToggleFields = function() {
    const v = document.getElementById('v2-type').value;
    ['cidr','list','configList','sni'].forEach(id => {
      document.getElementById('v2-' + id).style.display = id === v ? 'block' : 'none';
    });
  };
  window.v2LoadCDN = async function(service) {
    try {
      const r = await fetch(CDN_URLS[service]);
      const d = await r.json();
      const ips = d.ipv4 || [];
      if (!ips.length) return;
      const val = service === 'gcore' ? ips.join('\n') : shuffleArray([...ips]).slice(0, 4).join('\n');
      document.getElementById('v2-range').value = val;
    } catch(e) { alert('Failed to load CDN IPs'); }
  };
  window.v2Generate = function() {
    const base = document.getElementById('v2-base').value.trim().split('\n').filter(l => l.trim() && detechConfigType(l.trim()));
    if (!base.length) return;
    const type = document.getElementById('v2-type').value;
    let out = '';
    if (type === 'cidr') {
      const ranges = document.getElementById('v2-range').value.trim().split('\n').filter(l => l.trim());
      const max = parseInt(document.getElementById('v2-count').value);
      if (!ranges.every(r => isValidCIDR(r.trim()))) return;
      let c = 0;
      for (const cfg of base) {
        for (const r of ranges) {
          const [ip, bits] = ipaddr.parseCIDR(r.trim());
          let cur = ip;
          while (c < max) {
            out += replaceIPInConfig(cfg.trim(), cur) + '\n\n';
            c++;
            cur = incIP(cur);
          }
          if (c >= max) break;
        }
        if (c >= max) break;
      }
    } else if (type === 'list') {
      const ips = [...new Set((document.getElementById('v2-ip-list').value.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || []).filter(ip => ipaddr.isValid(ip)))];
      for (const cfg of base) for (const ip of ips) out += replaceIPInConfig(cfg.trim(), ipaddr.parse(ip)) + '\n\n';
    } else if (type === 'configList') {
      const cfgs = document.getElementById('v2-cfg-list').value.trim().split('\n').filter(l => l.trim());
      for (const cfg of base) for (const tc of cfgs) { const a = extractAddrFromConfig(tc.trim()); if (a) out += replaceIPInConfig(cfg.trim(), a) + '\n\n'; }
    } else if (type === 'sni') {
      const ip = document.getElementById('v2-spoof-ip').value.trim();
      const port = document.getElementById('v2-spoof-port').value.trim();
      for (const cfg of base) out += replaceIPInConfig(cfg.trim(), ip, port) + '\n\n';
    }
    const area = document.getElementById('v2-output-area');
    const pre = document.getElementById('v2-output');
    if (out) { pre.textContent = out; area.style.display = 'block'; } else area.style.display = 'none';
  };
  window.v2Copy = function() {
    const t = document.getElementById('v2-output').textContent;
    navigator.clipboard.writeText(t.replace(/\n\n/g, '\n').trim());
  };
  window.v2Download = function() {
    const t = document.getElementById('v2-output').textContent.replace(/\n\n/g, '\n').trim();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([t], { type: 'text/plain' }));
    a.download = 'modified_configs_' + new Date().toISOString().slice(0, 10) + '.txt';
    a.click();
  };
}
