const LABELS = {
  fa: { title: 'رمزنگاری AES', input: 'متن', password: 'رمز عبور', encrypt: 'رمزنگاری', decrypt: 'رمزگشایی', result: 'نتیجه', copy: 'کپی', copied: 'کپی شد', placeholder: 'متن مورد نظر را وارد کنید...', passPlaceholder: 'رمز عبور را وارد کنید...', errEncrypt: 'خطا در رمزنگاری', errDecrypt: 'خطا در رمزگشایی' },
  en: { title: 'AES Crypto', input: 'Text', password: 'Password / Key', encrypt: 'Encrypt', decrypt: 'Decrypt', result: 'Result', copy: 'Copy', copied: 'Copied', placeholder: 'Enter text...', passPlaceholder: 'Enter password...', errEncrypt: 'Encryption failed', errDecrypt: 'Decryption failed' },
};

export default function render(lang) {
  const t = LABELS[lang] || LABELS.en;
  return `<div class="stack">
  <label class="label">${t.input}</label>
  <textarea class="field" id="aesInput" rows="3" spellcheck="false" placeholder="${t.placeholder}"></textarea>
  <label class="label">${t.password}</label>
  <input class="field" type="password" id="aesPassword" placeholder="${t.passPlaceholder}">
  <div class="button-row">
    <button class="primary-btn" id="aesEncrypt">${t.encrypt}</button>
    <button class="secondary-btn" id="aesDecrypt">${t.decrypt}</button>
  </div>
  <label class="label">${t.result}</label>
  <div class="out" id="aesResult"></div>
  <div class="button-row">
    <button class="secondary-btn" id="aesCopy">${t.copy}</button>
  </div>
</div>`;
}

export function init(lang) {
  const t = LABELS[lang] || LABELS.en;
  const input = document.getElementById('aesInput');
  const password = document.getElementById('aesPassword');
  const result = document.getElementById('aesResult');
  const encryptBtn = document.getElementById('aesEncrypt');
  const decryptBtn = document.getElementById('aesDecrypt');
  const copyBtn = document.getElementById('aesCopy');

  function ab2b64(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  }

  function b642ab(s) {
    const bytes = atob(s).split('').map(c => c.charCodeAt(0));
    return new Uint8Array(bytes).buffer;
  }

  async function deriveKey(pass, salt) {
    const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }

  encryptBtn.addEventListener('click', async () => {
    const text = input.value;
    const pass = password.value;
    if (!text || !pass) return;
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(pass, salt);
      const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(text));
      const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
      result.textContent = ab2b64(combined);
    } catch { result.textContent = t.errEncrypt; }
  });

  decryptBtn.addEventListener('click', async () => {
    const data = input.value;
    const pass = password.value;
    if (!data || !pass) return;
    try {
      const raw = new Uint8Array(b642ab(data));
      const salt = raw.slice(0, 16);
      const iv = raw.slice(16, 28);
      const ciphertext = raw.slice(28);
      const key = await deriveKey(pass, salt);
      const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
      result.textContent = new TextDecoder().decode(plain);
    } catch { result.textContent = t.errDecrypt; }
  });

  copyBtn.addEventListener('click', async () => {
    if (!result.textContent) return;
    try {
      await navigator.clipboard.writeText(result.textContent);
      copyBtn.textContent = t.copied;
      setTimeout(() => { copyBtn.textContent = t.copy; }, 1500);
    } catch {}
  });
}
