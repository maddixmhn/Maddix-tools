export default function render(lang) {
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = (fa, en) => isFa ? fa : en;

  return `<div dir="${dir}">
  <div class="panel">
    <div class="section-title">${t('تغییر آی‌پی کانفیگ', 'V2Ray Config Modifier')}</div>
    <p class="subtle">${t('تغییر آی‌پی و پورت در کانفیگ‌های V2Ray / VLESS / WireGuard / Trojan', 'Modify IPs and ports in V2Ray / VLESS / WireGuard / Trojan configs')}</p>
  </div>

  <div id="v2m-msg" class="panel" style="display:none;padding:12px;margin-bottom:12px;font-size:.9rem"></div>

  <div class="panel">
    <div class="stack">
      <div>
        <label class="label">${t('کانفیگ پایه (هر خط یک کانفیگ)', 'Base Configs (one per line)')}</label>
        <textarea id="v2m-base" class="field" rows="4" placeholder="vmess://... / vless://... / trojan://... / wireguard://..."></textarea>
      </div>

      <div>
        <label class="label">${t('نوع ورودی', 'Input Type')}</label>
        <select id="v2m-type" class="field">
          <option value="cidr">${t('رنج CIDR', 'CIDR Range')}</option>
          <option value="list">${t('لیست IP', 'IP List')}</option>
          <option value="configList">${t('لیست کانفیگ', 'Configs List')}</option>
          <option value="sniSpoof">${t('SNI Spoof', 'SNI Spoof')}</option>
        </select>
      </div>

      <div id="v2m-cidr">
        <label class="label">${t('رنج‌های IP (CIDR)', 'IP Ranges (CIDR)')}</label>
        <div class="flex" style="gap:8px;margin-bottom:8px;flex-wrap:wrap">
          <button class="chip" data-cdn="cloudflare">Cloudflare</button>
          <button class="chip" data-cdn="gcore">Gcore</button>
          <button class="chip" data-cdn="fastly">Fastly</button>
        </div>
        <textarea id="v2m-range" class="field" rows="3" placeholder="1.1.1.0/24"></textarea>
        <div style="margin-top:8px">
          <label class="label">${t('تعداد خروجی', 'Output Count')}: <span id="v2m-count-val">5000</span></label>
          <input type="range" class="field" min="100" max="50000" step="100" value="5000" id="v2m-count" style="padding:4px">
        </div>
      </div>

      <div id="v2m-list" style="display:none">
        <label class="label">${t('لیست IP (هر خط یک IP)', 'IP List (one per line)')}</label>
        <textarea id="v2m-ip-list" class="field" rows="5" placeholder="1.1.1.1"></textarea>
      </div>

      <div id="v2m-configList" style="display:none">
        <label class="label">${t('لیست کانفیگ (هر خط یک کانفیگ)', 'Configs List (one per line)')}</label>
        <textarea id="v2m-cfg-list" class="field" rows="5" placeholder="vmess://..."></textarea>
      </div>

      <div id="v2m-sni" style="display:none">
        <div class="grid two">
          <div><label class="label">${t('IP اسپوف', 'Spoof IP')}</label><input id="v2m-spoof-ip" class="field" type="text" value="127.0.0.1"></div>
          <div><label class="label">${t('پورت', 'Port')}</label><input id="v2m-spoof-port" class="field" type="number" value="40443"></div>
        </div>
      </div>

      <button class="primary-btn" id="v2m-generate">${t('تولید کانفیگ', 'Generate Configs')}</button>

      <div id="v2m-output-area" style="display:none">
        <pre id="v2m-output" class="out" style="min-height:100px;max-height:400px;overflow-y:auto"></pre>
        <div class="button-row" style="margin-top:8px">
          <button class="secondary-btn" id="v2m-copy">${t('کپی', 'Copy')}</button>
          <button class="secondary-btn" id="v2m-download">${t('دانلود', 'Download')}</button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

export function init(lang) {
  const isFa = lang === 'fa';
  const msg = (fa, en) => isFa ? fa : en;
  let generatedOutput = '';

  function showMsg(text, type) {
    const el = document.getElementById('v2m-msg');
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
    el.style.background = type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--warning)';
    el.style.color = '#fff';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
  }

  function ipToNum(ip) {
    return ip.split('.').reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0;
  }

  function numToIP(n) {
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  }

  function expandCIDR(cidr) {
    const [ip, bits] = cidr.split('/');
    const mask = ~0 << (32 - parseInt(bits));
    const start = ipToNum(ip) & mask;
    const end = start | (~mask >>> 0);
    return { start: numToIP(start), end: numToIP(end) };
  }

  function incrementIP(ipStr) {
    return numToIP(ipToNum(ipStr) + 1);
  }

  function isValidCIDR(c) {
    return /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(c);
  }

  function isValidIP(s) {
    return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(s) && s.split('.').every(n => +n >= 0 && +n <= 255);
  }

  function detectType(c) {
    if (c.startsWith('vmess://')) return 'vmess';
    if (c.startsWith('vless://')) return 'vless';
    if (c.startsWith('trojan://')) return 'trojan';
    if (c.startsWith('wireguard://')) return 'wireguard';
    return null;
  }

  function extractAddr(c) {
    const t = detectType(c);
    if (t === 'vmess') {
      try { return JSON.parse(atob(c.slice(8))).add; } catch { return null; }
    }
    if (t === 'vless') {
      const m = c.match(/vless:\/\/[^@]+@([^:]+):(\d+)/);
      return m ? m[1] : null;
    }
    if (t === 'trojan') {
      const m = c.match(/trojan:\/\/[^@]+@([^:]+):(\d+)/);
      return m ? m[1] : null;
    }
    if (t === 'wireguard') {
      const m = c.match(/wireguard:\/\/[^@]+@([^:]+):(\d+)/);
      return m ? m[1] : null;
    }
    return null;
  }

  function replaceInConfig(c, addr, port) {
    const t = detectType(c);
    const a = typeof addr === 'string' ? addr : addr;
    if (t === 'vmess') {
      try {
        const j = JSON.parse(atob(c.slice(8)));
        j.add = a;
        if (port) j.port = parseInt(port);
        return 'vmess://' + btoa(JSON.stringify(j));
      } catch { return c; }
    }
    if (t === 'vless') {
      const ad = a.includes(':') && !a.startsWith('[') ? '[' + a + ']' : a;
      return c.replace(/^(vless:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1, p2) => p1 + ad + ':' + (port || p2));
    }
    if (t === 'trojan') {
      return c.replace(/^(trojan:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1, p2) => p1 + a + ':' + (port || p2));
    }
    if (t === 'wireguard') {
      return c.replace(/^(wireguard:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1, p2) => p1 + a + ':' + (port || p2));
    }
    return c;
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.random() * (i + 1) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function toggleFields() {
    const v = document.getElementById('v2m-type').value;
    ['cidr', 'list', 'configList', 'sni'].forEach(id => {
      const el = document.getElementById('v2m-' + id);
      if (el) el.style.display = v === id ? 'block' : 'none';
    });
  }

  function generate() {
    const raw = document.getElementById('v2m-base').value.trim();
    if (!raw) {
      showMsg(msg('لطفا کانفیگ پایه را وارد کنید.', 'Please enter base configs.'), 'error');
      return;
    }
    const baseConfigs = raw.split('\n').map(l => l.trim()).filter(l => l && detectType(l));
    if (!baseConfigs.length) {
      showMsg(msg('کانفیگ معتبری یافت نشد.', 'No valid configs found.'), 'error');
      return;
    }

    const type = document.getElementById('v2m-type').value;
    let out = '';
    let count = 0;

    if (type === 'cidr') {
      const rangeText = document.getElementById('v2m-range').value.trim();
      const ranges = rangeText.split('\n').map(l => l.trim()).filter(Boolean);
      if (!ranges.length) {
        showMsg(msg('لطفا رنج CIDR را وارد کنید.', 'Please enter CIDR ranges.'), 'error');
        return;
      }
      for (const r of ranges) {
        if (!isValidCIDR(r)) {
          showMsg(msg('رنج نامعتبر: ' + r, 'Invalid CIDR: ' + r), 'error');
          return;
        }
      }
      const max = Math.min(parseInt(document.getElementById('v2m-count').value) || 5000, 50000);
      for (const cfg of baseConfigs) {
        if (count >= max) break;
        for (const r of ranges) {
          if (count >= max) break;
          const { start, end } = expandCIDR(r);
          let cur = start;
          const endNum = ipToNum(end);
          while (ipToNum(cur) <= endNum && count < max) {
            out += replaceInConfig(cfg, cur) + '\n\n';
            count++;
            cur = incrementIP(cur);
          }
        }
      }
    } else if (type === 'list') {
      const txt = document.getElementById('v2m-ip-list').value.trim();
      const ips = [...new Set((txt.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || []).filter(isValidIP))];
      if (!ips.length) {
        showMsg(msg('IP معتبری یافت نشد.', 'No valid IPs found.'), 'error');
        return;
      }
      for (const cfg of baseConfigs) {
        for (const ip of ips) {
          out += replaceInConfig(cfg, ip) + '\n\n';
          count++;
        }
      }
    } else if (type === 'configList') {
      const txt = document.getElementById('v2m-cfg-list').value.trim();
      const cfgs = txt.split('\n').map(l => l.trim()).filter(Boolean);
      if (!cfgs.length) {
        showMsg(msg('لطفا لیست کانفیگ را وارد کنید.', 'Please enter configs list.'), 'error');
        return;
      }
      for (const cfg of baseConfigs) {
        for (const tc of cfgs) {
          const a = extractAddr(tc);
          if (a) {
            out += replaceInConfig(cfg, a) + '\n\n';
            count++;
          }
        }
      }
    } else if (type === 'sni') {
      const ip = document.getElementById('v2m-spoof-ip').value.trim();
      const port = document.getElementById('v2m-spoof-port').value.trim();
      if (!ip || !port) {
        showMsg(msg('لطفا IP و پورت اسپوف را وارد کنید.', 'Please enter spoof IP and port.'), 'error');
        return;
      }
      for (const cfg of baseConfigs) {
        out += replaceInConfig(cfg, ip, port) + '\n\n';
        count++;
      }
    }

    generatedOutput = out;
    const area = document.getElementById('v2m-output-area');
    const pre = document.getElementById('v2m-output');
    if (out) {
      pre.textContent = out;
      area.style.display = 'block';
      showMsg(msg('تعداد کانفیگ تولید شده: ' + count, 'Generated ' + count + ' configs.'), 'success');
    } else {
      area.style.display = 'none';
      showMsg(msg('کانفیگی تولید نشد.', 'No configs generated.'), 'error');
    }
  }

  document.getElementById('v2m-type').addEventListener('change', toggleFields);
  document.getElementById('v2m-generate').addEventListener('click', generate);

  document.getElementById('v2m-copy').addEventListener('click', () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput.replace(/\n\n/g, '\n').trim());
      showMsg(msg('کپی شد.', 'Copied!'), 'success');
    }
  });

  document.getElementById('v2m-download').addEventListener('click', () => {
    if (!generatedOutput) return;
    const txt = generatedOutput.replace(/\n\n/g, '\n').trim();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
    a.download = 'modified_configs_' + new Date().toISOString().slice(0, 10) + '.txt';
    a.click();
  });

  document.getElementById('v2m-count').addEventListener('input', function() {
    document.getElementById('v2m-count-val').textContent = this.value;
  });

  document.querySelectorAll('[data-cdn]').forEach(btn => {
    btn.addEventListener('click', async function() {
      const service = this.dataset.cdn;
      const url = 'https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/' + service + '.json';
      this.textContent = '...';
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const d = await r.json();
        const ips = d.ipv4 || [];
        if (!ips.length) {
          showMsg(msg('رنجی یافت نشد.', 'No IP ranges found.'), 'error');
          return;
        }
        if (service !== 'gcore') {
          document.getElementById('v2m-range').value = shuffle([...ips]).slice(0, 4).join('\n');
        } else {
          document.getElementById('v2m-range').value = ips.join('\n');
        }
      } catch (e) {
        showMsg(msg('خطا در دریافت اطلاعات.', 'Failed to load CDN IPs.'), 'error');
      }
      this.textContent = service.charAt(0).toUpperCase() + service.slice(1);
    });
  });

  toggleFields();
}
