const LABELS = {
  fa: { title: 'تولید هش', input: 'ورودی', type: 'نوع هش', generate: 'تولید هش', output: 'خروجی', copy: 'کپی', copied: 'کپی شد', placeholder: 'متن را وارد کنید...' },
  en: { title: 'Hash Generator', input: 'Input', type: 'Hash Type', generate: 'Generate Hash', output: 'Output', copy: 'Copy', copied: 'Copied', placeholder: 'Enter text...' },
};

const HASH_TYPES = ['MD5', 'SHA1', 'SHA256', 'SHA512'];

export default function render(lang) {
  const t = LABELS[lang] || LABELS.en;
  const opts = HASH_TYPES.map(h => `<option value="${h}">${h}</option>`).join('');
  return `<div class="stack">
  <label class="label">${t.input}</label>
  <textarea class="field" id="hashInput" rows="4" spellcheck="false" placeholder="${t.placeholder}"></textarea>
  <label class="label">${t.type}</label>
  <select class="field" id="hashType">${opts}</select>
  <div class="button-row">
    <button class="primary-btn" id="hashGenerate">${t.generate}</button>
  </div>
  <label class="label">${t.output}</label>
  <div class="out" id="hashOutput"></div>
  <div class="button-row">
    <button class="secondary-btn" id="hashCopy">${t.copy}</button>
  </div>
</div>`;
}

export function init(lang) {
  const t = LABELS[lang] || LABELS.en;
  const input = document.getElementById('hashInput');
  const typeSel = document.getElementById('hashType');
  const genBtn = document.getElementById('hashGenerate');
  const output = document.getElementById('hashOutput');
  const copyBtn = document.getElementById('hashCopy');

  function md5(s) {
    function md5cycle(x, k) {
      let a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function cmn(q, a, b, x, s, t) { return add32(add32(a, q), add32(x, t)) << s | add32(add32(a, q), add32(x, t)) >>> (32 - s); }
    function ff(a, b, c, d, x, s, t) { return cmn(b & c | ~b & d, a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn(b & d | c & ~d, a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
    function add32(a, b) { return (a + b) & 0xFFFFFFFF; }

    const s = unescape(encodeURIComponent(s));
    const n = s.length;
    const m = [];
    for (let i = 0; i < n; i++) m[i >> 2] |= s.charCodeAt(i) << ((i % 4) * 8);
    m[n >> 2] |= 0x80 << ((n % 4) * 8);
    m[((n + 8) >> 6 << 4) + 14] = n * 8;
    const h = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476];
    for (let i = 0; i < m.length; i += 16) md5cycle(h, m.slice(i, i + 16));
    return h.map(v => ('00000000' + (v >>> 0).toString(16)).slice(-8)).join('');
  }

  async function generateHash(text, type) {
    if (type === 'MD5') return md5(text);
    const algo = { SHA1: 'SHA-1', SHA256: 'SHA-256', SHA512: 'SHA-512' }[type];
    const buf = new TextEncoder().encode(text);
    const hashBuf = await crypto.subtle.digest(algo, buf);
    return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  genBtn.addEventListener('click', async () => {
    const text = input.value;
    if (!text) return;
    output.textContent = 'Generating...';
    try {
      output.textContent = await generateHash(text, typeSel.value);
    } catch { output.textContent = 'Error generating hash'; }
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
