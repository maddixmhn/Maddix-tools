export default function render(lang) {
  const isFa = lang === 'fa';
  return `
<div style="margin-bottom:16px">
  <h3>${isFa ? 'فایل‌های مبهم‌سازی شده' : 'Obfuscated Files or Information'}</h3>
  <p style="color:var(--muted-foreground);font-size:.875rem;margin:0 0 12px">${isFa ? 'فایل یا اسکریپت خود را به Base64 encode کنید و با فرمت‌های مختلف روی سیستم هدف بازتولید کنید.' : 'Base64-encode your file or script to reproduce it on the target system via different methods.'}</p>
</div>
<div class="field">
  <label>${isFa ? 'محتوای فایل / اسکریپت' : 'File / Script Content'}</label>
  <textarea id="obf-input" rows="6" placeholder='${isFa ? 'محتوای فایل یا اسکریپت خود را وارد کنید...' : 'Paste your file or script content here...'}'></textarea>
</div>
<div class="field">
  <label>${isFa ? 'نام فایل خروجی' : 'Output File Name'}</label>
  <input id="obf-filename" placeholder="shell.php, exploit.ps1, ..." />
</div>
<div class="field">
  <label>${isFa ? 'فرمت خروجی' : 'Output Format'}</label>
  <select id="obf-format">
    <option value="bash">Base64 - Bash</option>
    <option value="cmd">Base64 - CMD</option>
    <option value="powershell">Base64 - PowerShell</option>
  </select>
</div>
<div style="display:flex;gap:8px;margin:12px 0">
  <button class="primary" id="obf-encode-btn">${isFa ? 'رمزگذاری' : 'Encode'}</button>
</div>
<div class="field">
  <label>${isFa ? 'خروجی' : 'Output'}</label>
  <textarea id="obf-output" rows="6" readonly placeholder="${isFa ? 'خروجی در اینجا نمایش داده می‌شود...' : 'The result will appear here...'}"></textarea>
</div>
<div style="display:flex;gap:8px;margin:12px 0">
  <button id="obf-copy-btn">${isFa ? 'کپی' : 'Copy'}</button>
  <button id="obf-clear-btn">${isFa ? 'پاک کردن' : 'Clear'}</button>
</div>`;
}

export function init(lang) {
  const input = document.getElementById('obf-input');
  const filename = document.getElementById('obf-filename');
  const format = document.getElementById('obf-format');
  const output = document.getElementById('obf-output');
  const encodeBtn = document.getElementById('obf-encode-btn');
  const copyBtn = document.getElementById('obf-copy-btn');
  const clearBtn = document.getElementById('obf-clear-btn');

  function randomStr(len) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let r = '';
    for (let i = 0; i < len; i++) r += chars[Math.floor(Math.random() * chars.length)];
    return r;
  }

  function encode() {
    const text = input.value;
    const name = filename.value || 'output';
    const mode = format.value;
    if (!text) return;
    try {
      const b64 = btoa(unescape(encodeURIComponent(text)));
      switch (mode) {
        case 'bash':
          output.value = `echo -n '${b64}' | base64 -d > ${name}`;
          break;
        case 'cmd': {
          const r = randomStr(10);
          output.value = `echo|set /p="${b64}" >> ${r}\r\ncertutil -decode ${r} ${name}\r\ndel /Q ${r}`;
          break;
        }
        case 'powershell': {
          const r = randomStr(10);
          output.value = `$${r} = [System.Convert]::FromBase64String("${b64}")\r\n[System.IO.File]::WriteAllBytes("${name}", $${r})\r\nRemove-Variable ${r}`;
          break;
        }
      }
    } catch(e) {
      output.value = 'Error: ' + e.message;
    }
  }

  encodeBtn.onclick = encode;
  copyBtn.onclick = () => { if (output.value) navigator.clipboard.writeText(output.value); };
  clearBtn.onclick = () => { output.value = ''; };
}
