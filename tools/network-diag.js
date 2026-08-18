const TARGETS = [
  { label: 'Cloudflare DNS', host: '1.1.1.1' },
  { label: 'Google DNS', host: '8.8.8.8' },
  { label: 'Quad9', host: '9.9.9.9' },
  { label: 'OpenDNS', host: '208.67.222.222' },
  { label: 'Cloudflare', host: 'one.one.one.one' },
];

const PACKET_COUNT = 10;

function s(lang, fa, en) { return lang === 'fa' ? fa : en; }

async function fetchTiming(url, timeout = 5000) {
  const start = performance.now();
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    await fetch(url, { mode: 'no-cors', signal: ctrl.signal });
    clearTimeout(t);
    return performance.now() - start;
  } catch {
    return null;
  }
}

async function imagePing(url, timeout = 5000) {
  return new Promise((resolve) => {
    const img = new Image();
    const t = setTimeout(() => { img.src = ''; resolve(null); }, timeout);
    const start = performance.now();
    img.onload = () => { clearTimeout(t); resolve(performance.now() - start); };
    img.onerror = () => { clearTimeout(t); resolve(performance.now() - start); };
    img.src = `${url}?t=${Date.now()}`;
  });
}

function ms(v) { return v !== null ? `${Math.round(v)}ms` : '-'; }

function statusBadge(ok) {
  return `<span class="status ${ok ? 'good' : 'bad'}">${ok ? 'Online' : 'Offline'}</span>`;
}

function now() {
  return new Date().toLocaleTimeString();
}

export default function render(lang) {
  const t = (fa, en) => s(lang, fa, en);
  const targetsOpts = TARGETS.map((tr, i) => `<option value="${i}">${tr.label} (${tr.host})</option>`).join('');

  return `<div dir="${t('rtl', 'ltr')}" id="netdiag-root">
  <div class="panel">
    <div class="section-title">${t('🌐 عیب‌یابی شبکه', '🌐 Network Diagnostics')}</div>
    <p class="subtle">${t('ابزار ترکیبی عیب‌یابی شبکه شامل پینگ، traceroute، MTR، هدر HTTP، تست سرعت و تست packet loss', 'Comprehensive network diagnostics: Ping, Traceroute, MTR, HTTP Headers, Speed Test, Packet Loss')}</p>
  </div>

  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
    <button class="secondary-btn diag-tab" data-tab="ping" style="flex:1;min-width:100px">${t('📶 پینگ', '📶 Ping')}</button>
    <button class="secondary-btn diag-tab" data-tab="traceroute" style="flex:1;min-width:100px">${t('🗺️ Traceroute', '🗺️ Traceroute')}</button>
    <button class="secondary-btn diag-tab" data-tab="mtr" style="flex:1;min-width:100px">${t('📊 MTR', '📊 MTR')}</button>
    <button class="secondary-btn diag-tab" data-tab="headers" style="flex:1;min-width:100px">${t('📋 HTTP Headers', '📋 HTTP Headers')}</button>
    <button class="secondary-btn diag-tab" data-tab="speed" style="flex:1;min-width:100px">${t('🚀 Speed Test', '🚀 Speed Test')}</button>
    <button class="secondary-btn diag-tab" data-tab="loss" style="flex:1;min-width:100px">${t('📉 Packet Loss', '📉 Packet Loss')}</button>
  </div>

  <div id="diag-ping" class="diag-section">
    <div class="panel">
      <h3 class="section-title">📶 ${t('بررسی پینگ', 'Ping Check')}</h3>
      <div class="grid two">
        <div>
          <label class="label">${t('میزبان یا IP', 'Hostname / IP')}</label>
          <input id="ping-host" class="field" value="1.1.1.1">
        </div>
        <div>
          <label class="label">${t('تعداد', 'Count')}</label>
          <input id="ping-count" class="field" type="number" value="4" min="1" max="20">
        </div>
      </div>
      <div class="button-row">
        <button class="primary-btn" id="ping-btn">🚀 ${t('شروع پینگ', 'Start Ping')}</button>
        <button class="danger-btn" id="ping-stop-btn" style="display:none">⏹ ${t('توقف', 'Stop')}</button>
      </div>
      <div id="ping-out" class="out" style="margin-top:8px;max-height:300px;overflow:auto"></div>
    </div>
  </div>

  <div id="diag-traceroute" class="diag-section" style="display:none">
    <div class="panel">
      <h3 class="section-title">🗺️ ${t('Traceroute (شبیه‌سازی شده)', 'Traceroute (Simulated)')}</h3>
      <p class="subtle">${t('تخمین مسیر با استفاده از WebRTC و زمان‌بندی درخواست‌های متوالی', 'Estimates route using WebRTC + sequential fetch timing')}</p>
      <div>
        <label class="label">${t('میزبان مقصد', 'Destination Host')}</label>
        <input id="trace-host" class="field" value="8.8.8.8">
      </div>
      <div class="button-row">
        <button class="primary-btn" id="trace-btn">🚀 ${t('شروع Traceroute', 'Start Traceroute')}</button>
      </div>
      <div id="trace-out" class="out" style="margin-top:8px;max-height:350px;overflow:auto"></div>
    </div>
  </div>

  <div id="diag-mtr" class="diag-section" style="display:none">
    <div class="panel">
      <h3 class="section-title">📊 ${t('MTR (ترکیب پینگ و مسیر)', 'MTR (Ping + Route Combined)')}</h3>
      <p class="subtle">${t('پینگ همزمان به چندین هدف و نمایش آمار', 'Concurrent ping to multiple targets with statistics')}</p>
      <div>
        <label class="label">${t('اهداف', 'Targets')}</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${TARGETS.map((tr, i) => `<label style="display:inline-flex;align-items:center;gap:4px;font-size:.82rem;padding:4px 8px;background:var(--bg-3);border-radius:6px;cursor:pointer"><input type="checkbox" class="mtr-target" value="${i}" ${i < 3 ? 'checked' : ''}> ${tr.label}</label>`).join('')}
        </div>
      </div>
      <div style="margin-top:8px">
        <label class="label">${t('تعداد پینگ', 'Pings')}</label>
        <input id="mtr-count" class="field" type="number" value="5" min="1" max="20" style="width:100px">
      </div>
      <div class="button-row">
        <button class="primary-btn" id="mtr-btn">🚀 ${t('شروع MTR', 'Start MTR')}</button>
        <button class="danger-btn" id="mtr-stop-btn" style="display:none">⏹ ${t('توقف', 'Stop')}</button>
      </div>
      <div id="mtr-out" class="out" style="margin-top:8px;max-height:400px;overflow:auto"></div>
    </div>
  </div>

  <div id="diag-headers" class="diag-section" style="display:none">
    <div class="panel">
      <h3 class="section-title">📋 ${t('بررسی هدر HTTP', 'HTTP Headers Check')}</h3>
      <p class="subtle">${t('دریافت هدرهای پاسخ، کد وضعیت و زمان پاسخ از سرور', 'Fetches response headers, status code, and timing from a server')}</p>
      <div>
        <label class="label">URL</label>
        <input id="headers-url" class="field" value="https://www.google.com">
      </div>
      <div class="button-row">
        <button class="primary-btn" id="headers-btn">🚀 ${t('دریافت هدرها', 'Fetch Headers')}</button>
      </div>
      <div id="headers-out" class="out" style="margin-top:8px;max-height:400px;overflow:auto"></div>
    </div>
  </div>

  <div id="diag-speed" class="diag-section" style="display:none">
    <div class="panel">
      <h3 class="section-title">🚀 ${t('تست سرعت پهنای باند', 'Bandwidth Speed Test')}</h3>
      <p class="subtle">${t('اندازه‌گیری سرعت دانلود با درخواست‌های تدریجی', 'Download speed test using progressively larger requests')}</p>
      <div>
        <label class="label">${t('سرور تست', 'Test Server')}</label>
        <select id="speed-server" class="field">
          <option value="https://www.cloudflare.com/cdn-cgi/trace">Cloudflare (trace)</option>
          <option value="https://www.google.com/generate_204">Google (generate_204)</option>
          <option value="https://1.1.1.1">Cloudflare DNS</option>
        </select>
      </div>
      <div class="button-row">
        <button class="primary-btn" id="speed-btn">🚀 ${t('شروع تست سرعت', 'Start Speed Test')}</button>
      </div>
      <div id="speed-out" class="out" style="margin-top:8px;min-height:100px"></div>
    </div>
  </div>

  <div id="diag-loss" class="diag-section" style="display:none">
    <div class="panel">
      <h3 class="section-title">📉 ${t('تست Packet Loss', 'Packet Loss Test')}</h3>
      <p class="subtle">${t('ارسال درخواست‌های متوالی و محاسبه درصد شکست', 'Sends multiple consecutive requests and calculates failure percentage')}</p>
      <div class="grid two">
        <div>
          <label class="label">${t('میزبان', 'Host')}</label>
          <input id="loss-host" class="field" value="1.1.1.1">
        </div>
        <div>
          <label class="label">${t('تعداد بسته', 'Packets')}</label>
          <input id="loss-count" class="field" type="number" value="${PACKET_COUNT}" min="5" max="100">
        </div>
      </div>
      <div class="button-row">
        <button class="primary-btn" id="loss-btn">🚀 ${t('شروع تست', 'Start Test')}</button>
      </div>
      <div id="loss-out" class="out" style="margin-top:8px;min-height:120px"></div>
    </div>
  </div>
</div>`;
}

export function init(lang) {
  const t = (fa, en) => s(lang, fa, en);

  document.querySelectorAll('.diag-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diag-section').forEach(s => s.style.display = 'none');
      const tab = btn.getAttribute('data-tab');
      const sec = document.getElementById(`diag-${tab}`);
      if (sec) sec.style.display = '';
      document.querySelectorAll('.diag-tab').forEach(b => b.classList.remove('primary-btn'));
      document.querySelectorAll('.diag-tab').forEach(b => b.classList.add('secondary-btn'));
      btn.classList.remove('secondary-btn');
      btn.classList.add('primary-btn');
    });
  });

  document.querySelectorAll('.diag-tab')[0]?.classList.remove('secondary-btn');
  document.querySelectorAll('.diag-tab')[0]?.classList.add('primary-btn');

  let pingStopped = false;
  document.getElementById('ping-btn').addEventListener('click', async () => {
    const host = document.getElementById('ping-host').value.trim();
    const count = parseInt(document.getElementById('ping-count').value) || 4;
    const out = document.getElementById('ping-out');
    const btn = document.getElementById('ping-btn');
    const stopBtn = document.getElementById('ping-stop-btn');
    pingStopped = false;
    btn.style.display = 'none';
    stopBtn.style.display = '';
    out.innerHTML = '';
    for (let i = 0; i < count; i++) {
      if (pingStopped) break;
      const line = document.createElement('div');
      line.style.padding = '4px 0';
      const start = performance.now();
      const msVal = await imagePing(`http://${host}/favicon.ico`, 3000);
      if (pingStopped) break;
      const ok = msVal !== null;
      const elapsed = msVal !== null ? performance.now() - start : null;
      line.innerHTML = `<span style="font-size:.82rem;color:var(--text-3)">${now()}</span> ${statusBadge(ok)} <code>${host}</code> ${msVal !== null ? `<span style="color:var(--accent)">${Math.round(msVal)}ms</span>` : '<span style="color:var(--danger)">timeout</span>'}`;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
      if (i < count - 1) await new Promise(r => setTimeout(r, 300));
    }
    btn.style.display = '';
    stopBtn.style.display = 'none';
  });

  document.getElementById('ping-stop-btn').addEventListener('click', () => { pingStopped = true; });

  document.getElementById('trace-btn').addEventListener('click', async () => {
    const host = document.getElementById('trace-host').value.trim();
    const out = document.getElementById('trace-out');
    const btn = document.getElementById('trace-btn');
    btn.disabled = true;
    btn.textContent = t('در حال بررسی...', 'Tracing...');
    out.innerHTML = '';
    const hops = [];
    const maxHops = 15;
    const header = document.createElement('div');
    header.innerHTML = `<div class="grid three" style="font-weight:600;font-size:.82rem;padding:6px 0;border-bottom:1px solid var(--border);margin-bottom:6px">
      <span>#</span><span>${t('آی‌پی', 'IP')}</span><span>${t('تاخیر', 'Latency')}</span>
    </div>`;
    out.appendChild(header);
    for (let hop = 1; hop <= maxHops; hop++) {
      const start = performance.now();
      const rtt = await fetchTiming(`http://${host}/`, 2000);
      const hopIP = `${host}`;
      const elapsed = rtt !== null ? Math.round(rtt) : '***';
      const row = document.createElement('div');
      row.className = 'grid three';
      row.style.cssText = 'padding:4px 0;font-size:.85rem;border-bottom:1px solid var(--border);align-items:center';
      row.innerHTML = `<span style="color:var(--text-3)">${hop}</span><span><code>${rtt !== null ? host : '(timeout)'}</code></span><span>${rtt !== null ? `<span style="color:var(--accent)">${elapsed}ms</span>` : '<span style="color:var(--danger)">*</span>'}</span>`;
      out.appendChild(row);
      out.scrollTop = out.scrollHeight;
      if (rtt === null) break;
      if (hop < maxHops) await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
    }
    const footer = document.createElement('div');
    footer.style.cssText = 'margin-top:8px;font-size:.78rem;color:var(--text-3);padding:6px;background:var(--bg-3);border-radius:6px';
    footer.textContent = t('توجه: traceroute در مرورگر محدود است و hops واقعی را نشان نمی‌دهد', 'Note: Browser traceroute is simulated and does not reflect actual network hops');
    out.appendChild(footer);
    btn.disabled = false;
    btn.textContent = t('🚀 شروع Traceroute', '🚀 Start Traceroute');
  });

  let mtrStopped = false;
  document.getElementById('mtr-btn').addEventListener('click', async () => {
    const count = parseInt(document.getElementById('mtr-count').value) || 5;
    const out = document.getElementById('mtr-out');
    const btn = document.getElementById('mtr-btn');
    const stopBtn = document.getElementById('mtr-stop-btn');
    mtrStopped = false;
    btn.style.display = 'none';
    stopBtn.style.display = '';
    const checkedTargets = [...document.querySelectorAll('.mtr-target:checked')].map(cb => TARGETS[parseInt(cb.value)]);
    if (!checkedTargets.length) {
      out.textContent = t('لطفا حداقل یک هدف انتخاب کنید', 'Please select at least one target');
      btn.style.display = '';
      stopBtn.style.display = 'none';
      return;
    }
    const results = {};
    checkedTargets.forEach(tr => { results[tr.host] = []; });
    out.innerHTML = '';
    const headerRow = document.createElement('div');
    headerRow.className = 'grid';
    headerRow.style.cssText = 'grid-template-columns:auto repeat(' + checkedTargets.length + ',1fr);font-weight:600;font-size:.82rem;padding:6px 0;border-bottom:1px solid var(--border);margin-bottom:6px;gap:8px';
    headerRow.innerHTML = `<span>#</span>${checkedTargets.map(tr => `<span style="text-align:center">${tr.label}</span>`).join('')}`;
    out.appendChild(headerRow);
    for (let i = 0; i < count; i++) {
      if (mtrStopped) break;
      const row = document.createElement('div');
      row.className = 'grid';
      row.style.cssText = 'grid-template-columns:auto repeat(' + checkedTargets.length + ',1fr);padding:4px 0;border-bottom:1px solid var(--border);gap:8px;align-items:center';
      row.innerHTML = `<span style="color:var(--text-3);font-size:.82rem">${i + 1}</span>`;
      for (const tr of checkedTargets) {
        const start = performance.now();
        const rtt = await imagePing(`http://${tr.host}/favicon.ico`, 2000);
        if (mtrStopped) break;
        results[tr.host].push(rtt);
        const cell = document.createElement('span');
        cell.style.textAlign = 'center';
        cell.style.fontSize = '.82rem';
        if (rtt !== null) {
          cell.innerHTML = `<span style="color:var(--accent)">${Math.round(rtt)}ms</span>`;
        } else {
          cell.innerHTML = `<span style="color:var(--danger)">*</span>`;
        }
        row.appendChild(cell);
      }
      if (mtrStopped) break;
      out.appendChild(row);
      out.scrollTop = out.scrollHeight;
      if (i < count - 1) await new Promise(r => setTimeout(r, 200));
    }
    const stats = document.createElement('div');
    stats.style.cssText = 'margin-top:10px;padding:8px;background:var(--bg-3);border-radius:8px';
    let statsHtml = '<div class="grid" style="grid-template-columns:repeat(' + checkedTargets.length + ',1fr);gap:8px;font-size:.82rem">';
    for (const tr of checkedTargets) {
      const vals = results[tr.host].filter(v => v !== null);
      const loss = ((results[tr.host].length - vals.length) / results[tr.host].length * 100).toFixed(0);
      const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
      let jitter = 0;
      if (vals.length > 1) {
        const diffs = [];
        for (let k = 1; k < vals.length; k++) diffs.push(Math.abs(vals[k] - vals[k - 1]));
        jitter = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      }
      statsHtml += `<div style="text-align:center;padding:4px"><strong>${tr.label}</strong><br><span style="color:var(--accent)">${t('میانگین', 'Avg')}: ${Math.round(avg)}ms</span><br><span style="color:var(--text-3)">${t('جیتر', 'Jitter')}: ${Math.round(jitter)}ms</span><br>${t('اتلاف', 'Loss')}: <span style="color:${loss > 10 ? 'var(--danger)' : 'var(--good)'}">${loss}%</span></div>`;
    }
    statsHtml += '</div>';
    stats.innerHTML = statsHtml;
    out.appendChild(stats);
    btn.style.display = '';
    stopBtn.style.display = 'none';
  });

  document.getElementById('mtr-stop-btn').addEventListener('click', () => { mtrStopped = true; });

  document.getElementById('headers-btn').addEventListener('click', async () => {
    const url = document.getElementById('headers-url').value.trim();
    const out = document.getElementById('headers-out');
    const btn = document.getElementById('headers-btn');
    btn.disabled = true;
    btn.textContent = t('در حال دریافت...', 'Fetching...');
    out.innerHTML = '';
    const start = performance.now();
    try {
      const resp = await fetch(url, { method: 'HEAD', mode: 'cors' });
      const timing = performance.now() - start;
      let html = `<div class="table-card"><table><thead><tr><th>${t('کلید', 'Key')}</th><th>${t('مقدار', 'Value')}</th></tr></thead><tbody>`;
      html += `<tr><td><strong>Status</strong></td><td><span class="status ${resp.ok ? 'good' : 'bad'}">${resp.status} ${resp.statusText}</span></td></tr>`;
      html += `<tr><td><strong>${t('زمان پاسخ', 'Response Time')}</strong></td><td style="color:var(--accent)">${Math.round(timing)}ms</td></tr>`;
      resp.headers.forEach((v, k) => {
        const col = k.toLowerCase();
        if (['set-cookie', 'authorization', 'x-api-key'].includes(col)) return;
        html += `<tr><td style="white-space:nowrap"><code>${k}</code></td><td style="word-break:break-all;font-size:.82rem">${v}</td></tr>`;
      });
      html += '</tbody></table></div>';
      out.innerHTML = html;
    } catch (e) {
      out.innerHTML = `<div style="color:var(--danger);padding:12px">${t('خطا در اتصال', 'Connection error')}: ${e.message}</div>`;
    }
    btn.disabled = false;
    btn.textContent = t('🚀 دریافت هدرها', '🚀 Fetch Headers');
  });

  document.getElementById('speed-btn').addEventListener('click', async () => {
    const server = document.getElementById('speed-server').value;
    const out = document.getElementById('speed-out');
    const btn = document.getElementById('speed-btn');
    btn.disabled = true;
    btn.textContent = t('در حال تست...', 'Testing...');
    out.innerHTML = `<div style="text-align:center;padding:20px"><div class="progress"><span id="speed-progress-bar" style="width:0%"></span></div><p class="tiny" style="margin-top:8px">${t('در حال اندازه‌گیری...', 'Measuring...')}</p></div>`;
    const sizes = [100, 500, 1000, 2000, 5000];
    let totalBits = 0;
    let totalTime = 0;
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      const url = `${server}${server.includes('?') ? '&' : '?'}_=${Date.now()}&s=${size}`;
      const start = performance.now();
      try {
        const ctrl = new AbortController();
        const t2 = setTimeout(() => ctrl.abort(), 10000);
        const resp = await fetch(url, { mode: 'no-cors', signal: ctrl.signal });
        clearTimeout(t2);
        const elapsed = performance.now() - start;
        if (resp.ok || resp.type === 'opaque') {
          const bits = size * 8 * 1024;
          totalBits += bits;
          totalTime += elapsed;
        }
      } catch {}
      const pct = ((i + 1) / sizes.length * 100).toFixed(0);
      const bar = document.getElementById('speed-progress-bar');
      if (bar) bar.style.width = `${pct}%`;
    }
    const mbps = totalTime > 0 ? (totalBits / totalTime / 1000).toFixed(2) : '0';
    const isFast = parseFloat(mbps) > 5;
    const isMedium = parseFloat(mbps) > 1;
    out.innerHTML = `
      <div style="text-align:center;padding:16px">
        <div style="font-size:2.5rem;font-weight:700;color:${isFast ? 'var(--good)' : isMedium ? 'var(--accent)' : 'var(--danger)'}">${mbps} <span style="font-size:1rem">Mbps</span></div>
        <div class="progress" style="margin:12px 0;height:12px"><span style="width:${Math.min(parseFloat(mbps) * 10, 100)}%;background:${isFast ? 'var(--good)' : isMedium ? 'var(--accent)' : 'var(--danger)'}"></span></div>
        <p class="tiny">${t('تست بر اساس درخواست‌های تدریجی', 'Measured via progressive fetch requests')}</p>
        <p class="tiny" style="color:var(--text-3)">${t('دقت محدود - برای تخمین تقریبی', 'Limited accuracy - rough estimate only')}</p>
      </div>`;
    btn.disabled = false;
    btn.textContent = t('🚀 شروع تست سرعت', '🚀 Start Speed Test');
  });

  document.getElementById('loss-btn').addEventListener('click', async () => {
    const host = document.getElementById('loss-host').value.trim();
    const count = parseInt(document.getElementById('loss-count').value) || PACKET_COUNT;
    const out = document.getElementById('loss-out');
    const btn = document.getElementById('loss-btn');
    btn.disabled = true;
    btn.textContent = t('در حال تست...', 'Testing...');
    out.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'grid three';
    header.style.cssText = 'font-weight:600;font-size:.82rem;padding:6px 0;border-bottom:1px solid var(--border);margin-bottom:6px';
    header.innerHTML = `<span>#</span><span>${t('تاخیر', 'Latency')}</span><span>${t('وضعیت', 'Status')}</span>`;
    out.appendChild(header);
    const latencies = [];
    for (let i = 0; i < count; i++) {
      const row = document.createElement('div');
      row.className = 'grid three';
      row.style.cssText = 'padding:4px 0;border-bottom:1px solid var(--border);font-size:.85rem;align-items:center';
      row.innerHTML = `<span style="color:var(--text-3)">${i + 1}</span>`;
      const start = performance.now();
      const rtt = await imagePing(`http://${host}/favicon.ico`, 3000);
      const elapsed = performance.now() - start;
      latencies.push(rtt);
      if (rtt !== null) {
        row.innerHTML += `<span style="color:var(--accent)">${Math.round(rtt)}ms</span>`;
        row.innerHTML += `<span class="status good">OK</span>`;
      } else {
        row.innerHTML += `<span style="color:var(--text-3)">-</span>`;
        row.innerHTML += `<span class="status bad">${t('شکست', 'Lost')}</span>`;
      }
      out.appendChild(row);
      out.scrollTop = out.scrollHeight;
      if (i < count - 1) await new Promise(r => setTimeout(r, 150));
    }
    const success = latencies.filter(v => v !== null);
    const lossPct = ((count - success.length) / count * 100).toFixed(1);
    const avgLat = success.length ? success.reduce((a, b) => a + b, 0) / success.length : 0;
    let jitter = 0;
    if (success.length > 1) {
      const diffs = [];
      for (let k = 1; k < success.length; k++) diffs.push(Math.abs(success[k] - success[k - 1]));
      jitter = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    }
    const stats = document.createElement('div');
    stats.style.cssText = 'margin-top:10px;padding:12px;background:var(--bg-3);border-radius:8px';
    const lossOk = parseFloat(lossPct) < 5;
    stats.innerHTML = `<div class="grid two" style="font-size:.85rem">
      <div><strong>${t('Packet Loss', 'Packet Loss')}:</strong> <span style="color:${lossOk ? 'var(--good)' : 'var(--danger)'};font-weight:600">${lossPct}%</span></div>
      <div><strong>${t('میانگین تاخیر', 'Avg Latency')}:</strong> <span style="color:var(--accent)">${Math.round(avgLat)}ms</span></div>
      <div><strong>${t('جیتر', 'Jitter')}:</strong> <span style="color:var(--accent)">${Math.round(jitter)}ms</span></div>
      <div><strong>${t('موفق', 'Success')}:</strong> <span style="color:var(--good)">${success.length}/${count}</span></div>
    </div>`;
    out.appendChild(stats);
    btn.disabled = false;
    btn.textContent = t('🚀 شروع تست', '🚀 Start Test');
  });
}
