export default function(lang) {
  var isFa = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔑</span>'+
      '<div>'+
        '<h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(isFa?'ابزارهای رمز عبور':'Password Tools')+'</h2>'+
        '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(isFa?'تولید، تحلیل و بررسی رمز عبور':'Generate, analyze & check passwords')+'</p>'+
      '</div>'+
    '</div>'+

    '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px">'+
      '<button class="pt-tab active" data-tab="generator" style="padding:8px 16px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.8125rem;font-weight:500;transition:all .15s;color:var(--foreground)">⚡ '+(isFa?'تولید کننده':'Generator')+'</button>'+
      '<button class="pt-tab" data-tab="strength" style="padding:8px 16px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.8125rem;font-weight:500;transition:all .15s;color:var(--foreground)">📊 '+(isFa?'تحلیل قدرت':'Strength Check')+'</button>'+
      '<button class="pt-tab" data-tab="breach" style="padding:8px 16px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.8125rem;font-weight:500;transition:all .15s;color:var(--foreground)">🚨 '+(isFa?'بررسی نشت':'Breach Check')+'</button>'+
    '</div>'+

    '<!-- Generator -->'+
    '<div id="pt-generator" class="pt-panel">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">'+
        '<label style="display:flex;flex-direction:column;gap:4px;font-size:.8125rem">'+(isFa?'طول':'Length')+' <input id="pt-length" type="range" min="4" max="128" value="16" style="width:100%"><span id="pt-length-val" style="font-weight:600;font-family:monospace">16</span></label>'+
        '<label style="display:flex;flex-direction:column;gap:4px;font-size:.8125rem">'+(isFa?'تعداد':'Count')+' <input id="pt-count" type="range" min="1" max="20" value="5" style="width:100%"><span id="pt-count-val" style="font-weight:600;font-family:monospace">5</span></label>'+
      '</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">'+
        '<label style="display:flex;align-items:center;gap:6px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="pt-upper" checked> ABC</label>'+
        '<label style="display:flex;align-items:center;gap:6px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="pt-lower" checked> abc</label>'+
        '<label style="display:flex;align-items:center;gap:6px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="pt-digits" checked> 123</label>'+
        '<label style="display:flex;align-items:center;gap:6px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="pt-symbols" checked> !@#</label>'+
        '<label style="display:flex;align-items:center;gap:6px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="pt-ambiguous"> '+(isFa?'مبهم':'Ambiguous')+' <span style="color:var(--muted-foreground);font-size:.7rem">(il1Lo0O)</span></label>'+
      '</div>'+
      '<button id="pt-generate-btn" class="btn btn-primary" style="padding:10px 24px;border:none;border-radius:var(--radius);background:var(--action);color:#fff;font-size:.875rem;font-weight:500;cursor:pointer;margin-bottom:16px">⚡ '+(isFa?'تولید کن':'Generate')+'</button>'+
      '<div id="pt-passwords" style="font-family:monospace;font-size:.875rem;line-height:1.8;background:var(--muted);padding:12px;border-radius:var(--radius);word-break:break-all"></div>'+
    '</div>'+

    '<!-- Strength Checker -->'+
    '<div id="pt-strength" class="pt-panel" style="display:none">'+
      '<input id="pt-check-input" type="text" placeholder="'+(isFa?'رمز عبور خود را وارد کنید...':'Enter your password...')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:12px;font-family:monospace;direction:ltr">'+
      '<div id="pt-strength-bar" style="height:8px;background:var(--muted);border-radius:4px;overflow:hidden;margin-bottom:8px"><div id="pt-strength-fill" style="height:100%;width:0;border-radius:4px;transition:all .3s"></div></div>'+
      '<div id="pt-strength-text" style="font-size:.8125rem;margin-bottom:12px;color:var(--muted-foreground)"></div>'+
      '<div id="pt-strength-details" style="font-size:.75rem;line-height:1.6;color:var(--muted-foreground)"></div>'+
    '</div>'+

    '<!-- Breach Check -->'+
    '<div id="pt-breach" class="pt-panel" style="display:none">'+
      '<p style="margin:0 0 12px;font-size:.8125rem;color:var(--muted-foreground);line-height:1.5">'+(isFa?'با استفاده از Have I Been Pwned API (v3, k-anonymity) بررسی می‌کند که آیا رمز عبور شما در breaches نشت شده است. رمز عبور شما هرگز به سرور ارسال نمی‌شود.':'Uses HIBP v3 API (k-anonymity) — your password is never sent to the server.')+'</p>'+
      '<input id="pt-breach-input" type="password" placeholder="'+(isFa?'رمز عبور را وارد کنید...':'Enter password...')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:12px;font-family:monospace;direction:ltr">'+
      '<button id="pt-breach-btn" style="padding:10px 24px;border:none;border-radius:var(--radius);background:var(--action);color:#fff;font-size:.875rem;font-weight:500;cursor:pointer;margin-bottom:12px">🔍 '+(isFa?'بررسی کن':'Check')+'</button>'+
      '<div id="pt-breach-result" style="font-size:.8125rem;line-height:1.6;padding:12px;background:var(--muted);border-radius:var(--radius);min-height:40px"></div>'+
    '</div>'+

  '</div>';
}
export function init(lang) {
  var isFa = lang === 'fa';

  // Tab switching
  document.querySelectorAll('.pt-tab').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.pt-tab').forEach(function(b){ b.style.background = 'var(--card)'; b.style.borderColor = 'var(--border)'; });
      btn.style.background = 'var(--accent)'; btn.style.borderColor = 'var(--accent)'; btn.style.color = '#fff';
      document.querySelectorAll('.pt-panel').forEach(function(p){ p.style.display = 'none'; });
      var target = document.getElementById('pt-'+btn.dataset.tab);
      if (target) target.style.display = 'block';
    });
  });

  // Generator
  var lengthSlider = document.getElementById('pt-length');
  var countSlider = document.getElementById('pt-count');
  var lengthVal = document.getElementById('pt-length-val');
  var countVal = document.getElementById('pt-count-val');
  if (lengthSlider) lengthSlider.addEventListener('input', function(){ lengthVal.textContent = this.value; });
  if (countSlider) countSlider.addEventListener('input', function(){ countVal.textContent = this.value; });

  document.getElementById('pt-generate-btn').addEventListener('click', function(){
    var len = parseInt(lengthSlider.value) || 16;
    var count = parseInt(countSlider.value) || 5;
    var useUpper = document.getElementById('pt-upper').checked;
    var useLower = document.getElementById('pt-lower').checked;
    var useDigits = document.getElementById('pt-digits').checked;
    var useSymbols = document.getElementById('pt-symbols').checked;
    var noAmbiguous = !document.getElementById('pt-ambiguous').checked;
    var chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useDigits) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (noAmbiguous) chars = chars.replace(/[il1Lo0O]/g,'');
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
    var result = [];
    for (var c = 0; c < count; c++) {
      var pw = '';
      for (var i = 0; i < len; i++) {
        pw += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      result.push(pw);
    }
    document.getElementById('pt-passwords').innerHTML = result.map(function(p){
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border)"><span>'+p+'</span><span style="cursor:pointer;font-size:.7rem;color:var(--action)" onclick="navigator.clipboard.writeText(\''+p+'\')">📋</span></div>';
    }).join('');
  });

  // Strength checker
  var checkInput = document.getElementById('pt-check-input');
  if (checkInput) {
    checkInput.addEventListener('input', function(){
      var pw = this.value;
      var score = 0;
      var fill = document.getElementById('pt-strength-fill');
      var text = document.getElementById('pt-strength-text');
      var details = document.getElementById('pt-strength-details');
      if (!pw) { fill.style.width = '0'; text.textContent = ''; details.innerHTML = ''; return; }
      if (pw.length >= 8) score += 25;
      if (pw.length >= 12) score += 15;
      if (pw.length >= 16) score += 10;
      if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 15;
      if (/\d/.test(pw)) score += 10;
      if (/[^a-zA-Z0-9]/.test(pw)) score += 15;
      if (pw.length > 20) score += 10;
      if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(pw)) score += 10;
      if (pw.length >= 30) score += 10;
      score = Math.min(100, score);
      var colors = ['#ff4444','#ff8800','',',,#ffdd00','#88cc00','#00cc44'];
      var labels = isFa ? ['خیلی ضعیف','ضعیف','متوسط','قوی','خیلی قوی'] : ['Very Weak','Weak','Fair','Strong','Very Strong'];
      var idx = score < 30 ? 0 : score < 50 ? 1 : score < 65 ? 2 : score < 80 ? 3 : 4;
      fill.style.width = score+'%';
      fill.style.background = ['#ff4444','#ff8800','#ffdd00','#88cc00','#00cc44'][idx];
      text.textContent = labels[idx]+' ('+score+'/100)';
      text.style.color = ['#ff4444','#ff8800','#888800','#448800','#008844'][idx];
      var info = [];
      if (pw.length < 8) info.push(isFa?'حداقل ۸ کاراکتر نیاز است':'Minimum 8 characters');
      if (pw.length >= 8 && pw.length < 12) info.push(isFa?'طول خوب، بهتر است بیشتر شود':'Good length, consider longer');
      if (!/[a-z]/.test(pw)) info.push(isFa?'حرف کوچک اضافه کنید':'Add lowercase letter');
      if (!/[A-Z]/.test(pw)) info.push(isFa?'حرف بزرگ اضافه کنید':'Add uppercase letter');
      if (!/\d/.test(pw)) info.push(isFa?'عدد اضافه کنید':'Add digit');
      if (!/[^a-zA-Z0-9]/.test(pw)) info.push(isFa?'نماد اضافه کنید':'Add symbol');
      details.innerHTML = info.length ? info.map(function(i){ return '<div style="padding:2px 0">• '+i+'</div>'; }).join('') : '<span style="color:#00cc44">✓ '+(isFa?'رمز عبور قوی':'Strong password')+'</span>';
    });
  }

  // Breach check
  document.getElementById('pt-breach-btn').addEventListener('click', function(){
    var pw = document.getElementById('pt-breach-input').value;
    var result = document.getElementById('pt-breach-result');
    if (!pw) { result.textContent = isFa?'لطفاً رمز عبور را وارد کنید':'Please enter a password'; return; }
    result.innerHTML = '<span style="color:var(--muted-foreground)">'+(isFa?'در حال بررسی...':'Checking...')+'</span>';
    var sha1 = '';
    var buffer = new TextEncoder().encode(pw);
    crypto.subtle.digest('SHA-1', buffer).then(function(hash){
      sha1 = Array.from(new Uint8Array(hash)).map(function(b){ return b.toString(16).padStart(2,'0'); }).join('').toUpperCase();
      var prefix = sha1.slice(0, 5);
      var suffix = sha1.slice(5);
      return fetch('https://api.pwnedpasswords.com/range/'+prefix);
    }).then(function(r){ return r.text(); }).then(function(data){
      var lines = data.split('\n');
      var found = false;
      for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].split(':');
        if (parts[0] === suffix) {
          found = true;
          var count = parseInt(parts[1]) || 0;
          result.innerHTML = '<span style="color:#ff4444">🚨 '+(isFa?'این رمز عبور '+count+' بار نشت شده است!':'Password has been pwned '+count+' times!')+'</span>';
          break;
        }
      }
      if (!found) {
        result.innerHTML = '<span style="color:#00cc44">✅ '+(isFa?'رمز عبور در breaches یافت نشد.':'Password not found in known breaches.')+'</span>';
      }
    }).catch(function(err){
      result.textContent = (isFa?'خطا: ':'Error: ')+err.message;
    });
  });
}
