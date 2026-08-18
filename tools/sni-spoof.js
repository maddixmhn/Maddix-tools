export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  return `<div class="panel">
    <h3 class="section-title">${t('تغییر SNI کانفیگ', 'SNI Spoof')}</h3>
    <div class="stack">
      <div>
        <label class="label">${t('کانفیگ', 'Config String')}</label>
        <textarea id="ss-config" class="field" rows="3" placeholder="vmess://... / vless://... / trojan://..."></textarea>
      </div>
      <div class="grid two">
        <div>
          <label class="label">${t('SNI/Address جدید', 'New SNI/Address')}</label>
          <input id="ss-sni" class="field" type="text" placeholder="example.com">
        </div>
        <div>
          <label class="label">${t('پورت جدید (اختیاری)', 'New Port (optional)')}</label>
          <input id="ss-port" class="field" type="number" placeholder="443">
        </div>
      </div>
      <button class="primary-btn" onclick="ssSpoof()">${t('اعمال تغییر', 'Apply')}</button>
      <div id="ss-output-area" style="display:none">
        <pre id="ss-output" class="out"></pre>
        <button class="secondary-btn" onclick="ssCopy()">${t('کپی', 'Copy')}</button>
      </div>
    </div>
  </div>`;
}

export function init() {
  function detect(s) {
    if (s.startsWith('vmess://')) return 'vmess';
    if (s.startsWith('vless://')) return 'vless';
    if (s.startsWith('trojan://')) return 'trojan';
    return null;
  }
  function modify(s, sni, port) {
    const t = detect(s);
    if (t === 'vmess') {
      try {
        const b64 = s.slice(8);
        const json = JSON.parse(atob(b64));
        json.add = sni;
        if (port) json.port = parseInt(port);
        return 'vmess://' + btoa(JSON.stringify(json));
      } catch(e) { return null; }
    }
    if (t === 'vless') {
      const a = sni.includes(':') && !sni.startsWith('[') ? '[' + sni + ']' : sni;
      return s.replace(/^(vless:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1) => p1 + a + ':' + (port || RegExp.$2));
    }
    if (t === 'trojan') {
      return s.replace(/^(trojan:\/\/[^@]+@)[^:]+:(\d+)/, (_, p1) => p1 + sni + ':' + (port || RegExp.$2));
    }
    return null;
  }
  window.ssSpoof = function() {
    const cfg = document.getElementById('ss-config').value.trim();
    const sni = document.getElementById('ss-sni').value.trim();
    const port = document.getElementById('ss-port').value.trim();
    if (!cfg || !sni) return;
    const r = modify(cfg, sni, port || null);
    const area = document.getElementById('ss-output-area');
    const pre = document.getElementById('ss-output');
    if (r) { pre.textContent = r; area.style.display = 'block'; }
  };
  window.ssCopy = function() {
    navigator.clipboard.writeText(document.getElementById('ss-output').textContent);
  };
}
