export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📱</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'QR کد':'QR Code Generator')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'QR کد از متن،URL،وای‌فای':'Generate QR codes from text, URL, WiFi')+'</p></div>'+
    '</div>'+
    '<select id="qr-type" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:12px">'+
      '<option value="text">'+(f?'متن':'Plain Text')+'</option>'+
      '<option value="url">URL</option>'+
      '<option value="wifi">'+(f?'وای‌فای':'WiFi')+'</option>'+
      '<option value="vcard">vCard</option>'+
      '<option value="sms">SMS</option>'+
      '<option value="email">Email</option>'+
      '<option value="phone">'+(f?'تلفن':'Phone')+'</option>'+
    '</select>'+
    '<div id="qr-fields"><textarea id="qr-text" rows="3" placeholder="'+(f?'متن یا URL':'Enter text or URL')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea></div>'+
    '<button id="qr-gen-btn" style="padding:10px 24px;border:none;border-radius:var(--radius);background:var(--action);color:#fff;font-size:.875rem;cursor:pointer;margin:12px 0">📱 '+(f?'تولید':'Generate')+'</button>'+
    '<div id="qr-out" style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px;background:var(--muted);border-radius:var(--radius);min-height:180px">'+
      '<div id="qr-img-wrap" style="background:#fff;padding:12px;border-radius:8px;display:none"><img id="qr-img" crossorigin="anonymous"></div>'+
      '<div id="qr-err" style="color:var(--muted-foreground);font-size:.8125rem"></div>'+
    '</div>'+
    '<a id="qr-dl" style="display:none;padding:8px 16px;background:var(--action);color:#fff;border-radius:var(--radius);text-decoration:none;font-size:.8125rem;margin-top:8px;text-align:center;cursor:pointer">⬇️ PNG</a>'+
  '</div>';
}
export function init(lang) {
  var f = lang === 'fa';
  var t = document.getElementById('qr-type');
  var fd = document.getElementById('qr-fields');
  var btn = document.getElementById('qr-gen-btn');
  var wrap = document.getElementById('qr-img-wrap');
  var img = document.getElementById('qr-img');
  var err = document.getElementById('qr-err');
  var dl = document.getElementById('qr-dl');
  if (!t||!btn||!wrap||!img||!err||!dl) return;
  function upd() {
    var v = t.value;
    var h = '';
    if (v==='text'||v==='url') h = '<textarea id="qr-text" rows="3" placeholder="'+(f?'متن یا URL':'Enter text or URL')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>';
    else if (v==='wifi') h = '<input id="qr-ws" placeholder="SSID" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:8px;direction:ltr">'+
      '<input id="qr-wp" type="password" placeholder="'+(f?'رمز':'Password')+'" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:8px;direction:ltr">'+
      '<select id="qr-we" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"><option value="WPA">WPA/WPA2</option><option value="WEP">WEP</option><option value="">'+(f?'بدون رمز':'None')+'</option></select>';
    else if (v==='vcard') h = '<input id="qr-vn" placeholder="'+(f?'نام':'Name')+'" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:8px;direction:ltr">'+
      '<input id="qr-vt" placeholder="'+(f?'تلفن':'Phone')+'" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;margin-bottom:8px;direction:ltr">'+
      '<input id="qr-ve" placeholder="Email" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;direction:ltr">';
    else h = '<input id="qr-text" type="text" placeholder="'+(f?'مقدار':'Value')+'" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;direction:ltr">';
    fd.innerHTML = h;
  }
  t.addEventListener('change', upd);
  upd();
  btn.addEventListener('click', function(){
    var v = t.value;
    var txt = '';
    var el = document.getElementById('qr-text');
    if (v==='text'||v==='url') { txt = el ? el.value.trim() : ''; if (v==='url' && txt && !txt.match(/^https?:\/\//i)) txt = 'https://'+txt; }
    else if (v==='wifi') { var s=document.getElementById('qr-ws'),p=document.getElementById('qr-wp'),e=document.getElementById('qr-we'); txt='WIFI:T:'+(e?e.value:'WPA')+';S:'+(s?s.value:'')+';P:'+(p?p.value:'')+';;'; }
    else if (v==='vcard') { var n=document.getElementById('qr-vn'),t2=document.getElementById('qr-vt'),em=document.getElementById('qr-ve'); txt='BEGIN:VCARD\nVERSION:3.0\nFN:'+(n?n.value:'')+'\nTEL:'+(t2?t2.value:'')+'\nEMAIL:'+(em?em.value:'')+'\nEND:VCARD'; }
    else if (v==='sms') { txt='sms:'+(el?el.value.trim():''); }
    else if (v==='email') { txt='mailto:'+(el?el.value.trim():''); }
    else if (v==='phone') { txt='tel:'+(el?el.value.trim():''); }
    if (!txt) { err.textContent = f?'اطلاعات را وارد کنید':'Enter info'; wrap.style.display='none'; dl.style.display='none'; return; }
    err.textContent = f?'در حال تولید...':'Generating...';
    wrap.style.display='none'; dl.style.display='none';
    var i = new Image();
    i.crossOrigin = 'Anonymous';
    i.onload = function(){ wrap.style.display='block'; err.textContent=''; dl.style.display='block'; dl.href=i.src; };
    i.onerror = function(){ err.innerHTML = '<span style="color:#ff4444">'+(f?'خطا':'Error')+'</span>'; };
    i.src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(txt);
    img.src = i.src;
  });
}
