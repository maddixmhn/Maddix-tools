const LABELS = {
  fa: { title: 'تولید UUID', generate: 'تولید', copy: 'کپی', copied: 'کپی شد', count: 'تعداد', dashes: 'با خط تیره', history: 'تاریخچه', empty: 'هنوز UUIDی تولید نشده' },
  en: { title: 'UUID Generator', generate: 'Generate', copy: 'Copy', copied: 'Copied', count: 'Count', dashes: 'With dashes', history: 'History', empty: 'No UUIDs generated yet' },
};

function uuidV4(dashes) {
  if (dashes && crypto.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  if (dashes) return h.slice(0,8) + '-' + h.slice(8,12) + '-' + h.slice(12,16) + '-' + h.slice(16,20) + '-' + h.slice(20);
  return h;
}

export default function render(lang) {
  const t = LABELS[lang] || LABELS.en;
  return `<div class="stack">
  <div class="grid two">
    <div>
      <label class="label">${t.count}</label>
      <input class="field" type="number" id="uuidCount" value="1" min="1" max="10">
    </div>
    <div style="display:flex;align-items:flex-end;gap:8px;padding-bottom:7px">
      <input type="checkbox" id="uuidDashes" checked>
      <label for="uuidDashes" class="label" style="margin:0">${t.dashes}</label>
    </div>
  </div>
  <div class="button-row">
    <button class="primary-btn" id="uuidGenerate">${t.generate}</button>
  </div>
  <div class="out" id="uuidOutput" style="font-size:1.4rem;text-align:center;font-family:var(--font-mono);letter-spacing:.04em;word-break:break-all"></div>
  <div class="button-row">
    <button class="secondary-btn" id="uuidCopy">${t.copy}</button>
  </div>
  <hr style="border:none;border-top:1px solid var(--line);margin:8px 0">
  <label class="label">${t.history}</label>
  <div class="out" id="uuidHistory" style="font-size:.82rem"><span class="faded">${t.empty}</span></div>
</div>`;
}

export function init(lang) {
  const t = LABELS[lang] || LABELS.en;
  const countInput = document.getElementById('uuidCount');
  const dashesCheck = document.getElementById('uuidDashes');
  const genBtn = document.getElementById('uuidGenerate');
  const output = document.getElementById('uuidOutput');
  const historyDiv = document.getElementById('uuidHistory');
  const copyBtn = document.getElementById('uuidCopy');
  const history = [];

  genBtn.addEventListener('click', () => {
    const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 10);
    const dashes = dashesCheck.checked;
    const uuids = [];
    for (let i = 0; i < count; i++) uuids.push(uuidV4(dashes));
    const text = uuids.join('\n');
    output.textContent = text;
    history.unshift(...uuids);
    if (history.length > 50) history.splice(50);
    historyDiv.innerHTML = history.map(u => `<div>${u}</div>`).join('');
  });

  copyBtn.addEventListener('click', async () => {
    if (!output.textContent) return;
    try {
      await navigator.clipboard.writeText(output.textContent);
      copyBtn.textContent = t.copied;
      setTimeout(() => { copyBtn.textContent = t.copy; }, 1500);
    } catch {}
  });
}
