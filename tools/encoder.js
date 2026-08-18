const LABELS = {
  fa: { title: 'رمزگذار/رمزگشا', base64: 'Base64', hex: 'Hex', url: 'URL', input: 'ورودی', output: 'خروجی', encode: 'رمزگذاری', decode: 'رمزگشایی', copy: 'کپی', clear: 'پاک کردن', copied: 'کپی شد' },
  en: { title: 'Encoder/Decoder', base64: 'Base64', hex: 'Hex', url: 'URL', input: 'Input', output: 'Output', encode: 'Encode', decode: 'Decode', copy: 'Copy', clear: 'Clear', copied: 'Copied' },
};

export default function render(lang) {
  const t = LABELS[lang] || LABELS.en;
  return `<div class="stack">
  <div class="tabs" id="encoderTabs">
    <button class="tab active" data-mode="base64">${t.base64}</button>
    <button class="tab" data-mode="hex">${t.hex}</button>
    <button class="tab" data-mode="url">${t.url}</button>
  </div>
  <div class="tab-pane active" id="encoderPane">
    <label class="label">${t.input}</label>
    <textarea class="field" id="encoderInput" rows="4" spellcheck="false"></textarea>
    <div class="button-row" style="margin:8px 0">
      <button class="primary-btn" id="encoderEncode">${t.encode}</button>
      <button class="secondary-btn" id="encoderDecode">${t.decode}</button>
      <button class="secondary-btn" id="encoderClear" style="color:var(--danger)">${t.clear}</button>
    </div>
    <label class="label">${t.output}</label>
    <div class="out" id="encoderOutput"></div>
    <div class="button-row" style="margin-top:8px">
      <button class="secondary-btn" id="encoderCopy">${t.copy}</button>
    </div>
  </div>
</div>`;
}

export function init(lang) {
  const t = LABELS[lang] || LABELS.en;
  const tabs = document.getElementById('encoderTabs');
  const panes = tabs.querySelectorAll('.tab');
  const input = document.getElementById('encoderInput');
  const output = document.getElementById('encoderOutput');
  const encodeBtn = document.getElementById('encoderEncode');
  const decodeBtn = document.getElementById('encoderDecode');
  const clearBtn = document.getElementById('encoderClear');
  const copyBtn = document.getElementById('encoderCopy');

  let mode = 'base64';

  function switchTab(m) {
    mode = m;
    panes.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === m);
    });
    input.value = '';
    output.textContent = '';
  }

  tabs.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (tab) switchTab(tab.dataset.mode);
  });

  function encode(str) {
    switch (mode) {
      case 'base64': return btoa(str);
      case 'hex': return Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
      case 'url': return encodeURIComponent(str);
      default: return str;
    }
  }

  function decode(str) {
    try {
      switch (mode) {
        case 'base64': return atob(str);
        case 'hex': return str.replace(/\s/g, '').match(/.{1,2}/g).map(b => String.fromCharCode(parseInt(b, 16))).join('');
        case 'url': return decodeURIComponent(str);
        default: return str;
      }
    } catch { return 'Error: invalid input'; }
  }

  encodeBtn.addEventListener('click', () => {
    output.textContent = encode(input.value);
  });

  decodeBtn.addEventListener('click', () => {
    output.textContent = decode(input.value);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    output.textContent = '';
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
