export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔑</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">JWT Decoder</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'دیکد توکن JWT بدون ارسال به سرور':'Decode JWT tokens client-side')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:16px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'توکن JWT':'JWT Token')+'</label>'+
      '<textarea id="jwt-input" rows="3" placeholder="eyJhbGciOiJIUzI1NiIs..." style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
    '</div>'+
    '<div id="jwt-header" style="margin-bottom:12px;display:none">'+
      '<div style="font-size:.8125rem;font-weight:500;margin-bottom:6px">'+(f?'هدر':'Header')+'</div>'+
      '<pre id="jwt-header-pre" style="margin:0;padding:12px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.75rem;line-height:1.5;overflow-x:auto;white-space:pre-wrap;word-break:break-all"></pre>'+
    '</div>'+
    '<div id="jwt-payload" style="margin-bottom:12px;display:none">'+
      '<div style="font-size:.8125rem;font-weight:500;margin-bottom:6px">'+(f?'بدنه':'Payload')+'</div>'+
      '<pre id="jwt-payload-pre" style="margin:0;padding:12px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.75rem;line-height:1.5;overflow-x:auto;white-space:pre-wrap;word-break:break-all"></pre>'+
    '</div>'+
    '<div id="jwt-info" style="font-size:.8125rem;color:var(--muted-foreground);padding:8px;display:none"></div>'+
  '</div>';
}
export function init(lang) {
  var input = document.getElementById('jwt-input');
  if (!input) return;
  function decode() {
    var h = document.getElementById('jwt-header');
    var hp = document.getElementById('jwt-header-pre');
    var p = document.getElementById('jwt-payload');
    var pp = document.getElementById('jwt-payload-pre');
    var info = document.getElementById('jwt-info');
    var val = input.value.trim();
    if (!val) { h.style.display='none'; p.style.display='none'; info.style.display='none'; return; }
    var parts = val.split('.');
    if (parts.length !== 3) { info.style.display='block'; info.textContent=lang==='fa'?'فرمت JWT نامعتبر است. الگوی مورد انتظار: header.payload.signature':'Invalid JWT format. Expected: header.payload.signature'; h.style.display='none'; p.style.display='none'; return; }
    try {
      var header = JSON.parse(atob(parts[0].replace(/-/g,'+').replace(/_/g,'/')));
      var payload = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
      hp.textContent = JSON.stringify(header, null, 2);
      pp.textContent = JSON.stringify(payload, null, 2);
      h.style.display='block'; p.style.display='block';
      var sig = parts[2].substring(0,20)+'...';
      info.style.display='block';
      info.innerHTML = '<span style="color:var(--success)">'+(lang==='fa'?'✅ توکن معتبر است':'✅ Valid token')+'</span> &middot; '+
        (lang==='fa'?'الگوریتم: ':'Algorithm: ')+'<strong>'+(header.alg||'unknown')+'</strong> &middot; '+
        (lang==='fa'?'نوع: ':'Type: ')+'<strong>'+(header.typ||'JWT')+'</strong> &middot; '+
        (lang==='fa'?'امضا: ':'Signature: ')+'<span style="font-family:monospace;font-size:.6875rem">'+sig+'</span>';
    } catch(e) {
      info.style.display='block'; info.textContent=(lang==='fa'?'خطا در دیکد: ':'Decode error: ')+e.message;
      h.style.display='none'; p.style.display='none';
    }
  }
  input.addEventListener('input', decode);
}
