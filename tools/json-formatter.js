export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📋</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">JSON Formatter</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'فرمت، اعتبارسنجی، مینی‌فای و مقایسه JSON':'Format, validate, minify, and compare JSON')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="json-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-jsontab="format">'+(f?'فرمت':'Format')+'</button>'+
      '<button data-jsontab="minify">'+(f?'مینی‌فای':'Minify')+'</button>'+
      '<button data-jsontab="diff">'+(f?'مقایسه':'Diff')+'</button>'+
    '</div>'+
    '<div class="jsontab-content" data-jsontab="format">'+
      '<textarea id="json-input" rows="8" placeholder=\'{"name":"Maddix","version":1}\' style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">'+
        '<button id="json-format-btn" class="primary">'+(f?'فرمت کردن':'Format')+'</button>'+
        '<button id="json-validate-btn">'+(f?'اعتبارسنجی':'Validate')+'</button>'+
        '<button id="json-copy-btn">'+(f?'کپی':'Copy')+'</button>'+
      '</div>'+
    '</div>'+
    '<div class="jsontab-content" data-jsontab="minify" style="display:none">'+
      '<textarea id="json-min-input" rows="8" placeholder=\'{"name":"Maddix","version":1}\' style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">'+
        '<button id="json-minify-btn" class="primary">'+(f?'مینی‌فای':'Minify')+'</button>'+
        '<button id="json-min-copy-btn">'+(f?'کپی':'Copy')+'</button>'+
      '</div>'+
    '</div>'+
    '<div class="jsontab-content" data-jsontab="diff" style="display:none">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
        '<div><div style="font-size:.75rem;font-weight:500;margin-bottom:4px;color:var(--muted-foreground)">'+(f?'JSON اول':'First JSON')+'</div>'+
        '<textarea id="json-diff-a" rows="6" style="width:100%;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.75rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea></div>'+
        '<div><div style="font-size:.75rem;font-weight:500;margin-bottom:4px;color:var(--muted-foreground)">'+(f?'JSON دوم':'Second JSON')+'</div>'+
        '<textarea id="json-diff-b" rows="6" style="width:100%;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.75rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea></div>'+
      '</div>'+
      '<button id="json-diff-btn" class="primary" style="margin-top:8px">'+(f?'مقایسه':'Compare')+'</button>'+
    '</div>'+
    '<div id="json-output" style="margin-top:12px;padding:14px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.8rem;line-height:1.5;min-height:60px;white-space:pre-wrap;word-break:break-all"></div>'+
  '</div>';
}
export function init(lang) {
  // Tabs
  document.querySelectorAll('#json-tabs button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#json-tabs button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.jsontab-content').forEach(function(el){ el.style.display='none'; });
      var tab = document.querySelector('.jsontab-content[data-jsontab="'+btn.dataset.jsontab+'"]');
      if (tab) tab.style.display='block';
      document.getElementById('json-output').textContent='';
    });
  });
  var out = document.getElementById('json-output');
  function fmt() {
    try {
      var obj = JSON.parse(document.getElementById('json-input').value);
      out.innerHTML = syntaxHighlight(JSON.stringify(obj, null, 2));
    } catch(e) { out.textContent='Error: '+e.message; }
  }
  function validate() {
    try { JSON.parse(document.getElementById('json-input').value); out.textContent=lang==='fa'?'✅ JSON معتبر است':'✅ Valid JSON'; out.style.color='var(--success)'; } catch(e) { out.textContent='❌ '+e.message; out.style.color='#ff4444'; }
  }
  document.getElementById('json-format-btn').addEventListener('click', fmt);
  document.getElementById('json-validate-btn').addEventListener('click', validate);
  document.getElementById('json-copy-btn').addEventListener('click', function(){ navigator.clipboard.writeText(out.textContent); });
  document.getElementById('json-minify-btn').addEventListener('click', function(){
    try {
      var obj = JSON.parse(document.getElementById('json-min-input').value);
      out.textContent = JSON.stringify(obj);
    } catch(e) { out.textContent='Error: '+e.message; }
  });
  document.getElementById('json-min-copy-btn').addEventListener('click', function(){ navigator.clipboard.writeText(out.textContent); });
  document.getElementById('json-diff-btn').addEventListener('click', function(){
    try {
      var a = JSON.parse(document.getElementById('json-diff-a').value);
      var b = JSON.parse(document.getElementById('json-diff-b').value);
      var diff = deepDiff(a, b);
      out.innerHTML = diff.length ? diff.join('<br>') : (lang==='fa'?'✅ یکسان هستند':'✅ Identical');
    } catch(e) { out.textContent='Error: '+e.message; }
  });
  function syntaxHighlight(json) {
    return json.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/("(?:[^"\\]|\\.)*")(\s*:)?/g, function(m,k,v){
      if (v) return '<span style="color:#569cd6">'+k+'</span>:';
      return /true|false/.test(k)?'<span style="color:#569cd6">'+k+'</span>':/<digit>/.test(k)?'<span style="color:#b5cea8">'+k+'</span>':'<span style="color:#ce9178">'+k+'</span>';
    }).replace(/\b(true|false|null)\b/g,'<span style="color:#569cd6">$1</span>').replace(/\b(\d+\.?\d*)\b/g,'<span style="color:#b5cea8">$1</span>');
  }
  function deepDiff(a, b, path) {
    path = path || '';
    var diffs = [];
    if (typeof a !== typeof b) { diffs.push('<span style="color:var(--warning)">'+path+': '+typeof a+' → '+typeof b+'</span>'); return diffs; }
    if (a === null && b !== null) { diffs.push('<span style="color:var(--warning)">'+path+': null → value</span>'); return diffs; }
    if (b === null && a !== null) { diffs.push('<span style="color:var(--warning)">'+path+': value → null</span>'); return diffs; }
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) diffs.push('<span style="color:var(--info)">'+path+': length '+a.length+' → '+b.length+'</span>');
      for (var i = 0; i < Math.max(a.length, b.length); i++) {
        if (i >= a.length) diffs.push('<span style="color:var(--success)">'+path+'['+i+']: <span style="color:var(--success)">+ added</span>');
        else if (i >= b.length) diffs.push('<span style="color:#ff4444">'+path+'['+i+']: removed');
        else diffs = diffs.concat(deepDiff(a[i], b[i], path+'['+i+']'));
      }
      return diffs;
    }
    if (typeof a === 'object') {
      var keys = Object.keys(a).concat(Object.keys(b).filter(function(k){ return !(k in a); }));
      keys.forEach(function(k){
        if (!(k in b)) diffs.push('<span style="color:#ff4444">'+path+'.'+k+': removed');
        else if (!(k in a)) diffs.push('<span style="color:var(--success)">'+path+'.'+k+': <span style="color:var(--success)">+ added</span>');
        else diffs = diffs.concat(deepDiff(a[k], b[k], path+'.'+k));
      });
      return diffs;
    }
    if (a !== b) diffs.push('<span style="color:var(--warning)">'+path+': '+JSON.stringify(a)+' → '+JSON.stringify(b)+'</span>');
    return diffs;
  }
}
