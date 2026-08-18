export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔐</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'رمزنگاری کلاسیک':'Cipher Tools')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'ROT13, سزار, اتبش, ویژنر':'ROT13, Caesar, Atbash, Vigenère')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="cipher-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-cipher="caesar">Caesar</button>'+
      '<button data-cipher="rot13">ROT13</button>'+
      '<button data-cipher="atbash">Atbash</button>'+
      '<button data-cipher="vigenere">Vigenère</button>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'متن':'Text')+'</label>'+
      '<textarea id="cipher-input" rows="4" placeholder="'+(f?'متن را وارد کنید...':'Enter text...')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">Hello World</textarea>'+
    '</div>'+
    '<div id="cipher-key-group" style="margin-bottom:12px;display:none">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'کلید':'Key')+'</label>'+
      '<input id="cipher-key" type="text" placeholder="KEY" value="KEY" style="width:200px;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr">'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'Shift (Caesar)':'Shift (Caesar)')+'</label>'+
      '<input id="cipher-shift" type="range" min="1" max="25" value="3" style="width:200px"> <span id="cipher-shift-val" style="font-size:.875rem;font-weight:600">3</span>'+
    '</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">'+
      '<button id="cipher-encode" class="primary">'+(f?'رمزگذاری':'Encrypt')+'</button>'+
      '<button id="cipher-decode">'+(f?'رمزگشایی':'Decrypt')+'</button>'+
      '<button id="cipher-clear" style="background:transparent;color:var(--muted-foreground)">'+(f?'پاک کردن':'Clear')+'</button>'+
    '</div>'+
    '<div style="margin-bottom:8px;font-size:.8125rem;font-weight:500">'+(f?'نتیجه':'Result')+'</div>'+
    '<div id="cipher-output" style="padding:14px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.875rem;line-height:1.5;word-break:break-all;min-height:40px"></div>'+
  '</div>';
}
export function init(lang) {
  var f = lang === 'fa';
  var input = document.getElementById('cipher-input');
  var output = document.getElementById('cipher-output');
  var shiftEl = document.getElementById('cipher-shift');
  var shiftVal = document.getElementById('cipher-shift-val');
  var keyEl = document.getElementById('cipher-key');
  var keyGroup = document.getElementById('cipher-key-group');
  if (!input||!output) return;
  var current = 'caesar';
  function caesar(s, n, decode) {
    if (decode) n = 26 - n;
    return s.split('').map(function(c){
      if (c >= 'A' && c <= 'Z') return String.fromCharCode((c.charCodeAt(0)-65+n)%26+65);
      if (c >= 'a' && c <= 'z') return String.fromCharCode((c.charCodeAt(0)-97+n)%26+97);
      return c;
    }).join('');
  }
  function rot13(s) { return caesar(s, 13, false); }
  function atbash(s) {
    return s.split('').map(function(c){
      if (c >= 'A' && c <= 'Z') return String.fromCharCode(90-(c.charCodeAt(0)-65));
      if (c >= 'a' && c <= 'z') return String.fromCharCode(122-(c.charCodeAt(0)-97));
      return c;
    }).join('');
  }
  function vigenere(s, key, decode) {
    key = key.toUpperCase().replace(/[^A-Z]/g,'');
    if (!key.length) return s;
    var ki = 0;
    return s.split('').map(function(c){
      if (c >= 'A' && c <= 'Z') {
        var shift = key.charCodeAt(ki%key.length)-65;
        if (decode) shift = 26 - shift;
        ki++;
        return String.fromCharCode((c.charCodeAt(0)-65+shift)%26+65);
      }
      if (c >= 'a' && c <= 'z') {
        var shift = key.charCodeAt(ki%key.length)-65;
        if (decode) shift = 26 - shift;
        ki++;
        return String.fromCharCode((c.charCodeAt(0)-97+shift)%26+97);
      }
      return c;
    }).join('');
  }
  function update() {
    var text = input.value;
    var result = '';
    switch(current) {
      case 'caesar':
        var n = parseInt(shiftEl.value)||3;
        break;
    }
    output.textContent = result || (f?'نتیجه‌ای نیست':'No result');
  }
  function compute(mode) {
    var text = input.value;
    var result = '';
    switch(current) {
      case 'caesar':
        var n = parseInt(shiftEl.value)||3;
        result = caesar(text, n, mode==='decode');
        break;
      case 'rot13':
        result = rot13(text);
        break;
      case 'atbash':
        result = atbash(text);
        break;
      case 'vigenere':
        var key = keyEl ? keyEl.value : '';
        result = vigenere(text, key, mode==='decode');
        break;
    }
    output.textContent = result || (f?'نتیجه‌ای نیست':'No result');
  }
  document.querySelectorAll('#cipher-tabs button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#cipher-tabs button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      current = btn.dataset.cipher;
      shiftEl.style.display = (current==='caesar'?'':'none');
      shiftEl.previousElementSibling.style.display = (current==='caesar'?'':'none');
      shiftVal.style.display = (current==='caesar'?'':'none');
      keyGroup.style.display = (current==='vigenere'?'':'none');
      compute();
    });
  });
  document.getElementById('cipher-encode').addEventListener('click', function(){ compute('encode'); });
  document.getElementById('cipher-decode').addEventListener('click', function(){ compute('decode'); });
  document.getElementById('cipher-clear').addEventListener('click', function(){ input.value=''; output.textContent=''; });
  shiftEl.addEventListener('input', function(){
    shiftVal.textContent = shiftEl.value;
    compute();
  });
  keyEl.addEventListener('input', function(){ compute(); });
  input.addEventListener('input', function(){ compute(); });
  compute();
}
