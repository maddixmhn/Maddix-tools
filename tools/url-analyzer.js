export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔗</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">URL Analyzer</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تجزیه و تحلیل URLها به اجزای سازنده','Parse and analyze URLs into components')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:16px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">URL</label>'+
      '<div style="display:flex;gap:8px">'+
        '<input id="url-input" type="text" value="https://admin:secret@api.example.com:8443/path/to/resource?id=123&name=test#section1" placeholder="https://example.com/path" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr">'+
        '<button id="url-encode-btn" style="padding:8px 12px;font-size:.75rem">'+(f,'Encode','Encode')+'</button>'+
        '<button id="url-decode-btn" style="padding:8px 12px;font-size:.75rem">'+(f,'Decode','Decode')+'</button>'+
      '</div>'+
    '</div>'+
    '<div id="url-parts" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.8125rem;line-height:1.8"></div>'+
    '<div style="margin-top:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'پارامترهای Query','Query Parameters')+'</label>'+
      '<div id="url-params" style="padding:12px;background:var(--muted);border-radius:var(--radius);min-height:40px;font-size:.8125rem"></div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('url-input');
  var parts=document.getElementById('url-parts');
  var params=document.getElementById('url-params');
  if(!input)return;
  function analyze(){
    var urlStr=input.value.trim();
    if(!urlStr){parts.innerHTML='<span style="color:var(--muted-foreground)">'+(f,'URL را وارد کنید','Enter a URL')+'</span>';params.innerHTML='';return;}
    try{
      var u=new URL(urlStr);
      var html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
      function row(label,val,mono){
        html+='<div><span style="color:var(--muted-foreground)">'+label+':</span></div><div'+(mono?' style="font-family:monospace"':'')+'><strong>'+(val||'<span style="color:var(--muted-foreground)">-</span>')+'</strong></div>';
      }
      row('Protocol','<span style="color:var(--info)">'+u.protocol.replace(':','')+'</span>');
      row('Hostname',u.hostname,true);
      row('Port',u.port||'(default)');
      row('Pathname',u.pathname,true);
      row('Hash',u.hash||'-',true);
      row('Username',u.username||'-',true);
      row('Password',u.password?'***** (hidden)':'-');
      row('Origin',u.origin,true);
      row('HREF',u.href,true);
      html+='</div>';
      parts.innerHTML=html;
      // Query params
      var sp=new URLSearchParams(u.search);
      var qHtml='';
      if([...sp].length===0){qHtml='<span style="color:var(--muted-foreground)">'+(f,'پارامتری وجود ندارد','No query parameters')+'</span>';}
      else{
        qHtml='<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
          '<thead><tr><th style="padding:6px 8px;border-bottom:1px solid var(--border);text-align:left;color:var(--muted-foreground)">'+(f,'کلید','Key')+'</th>'+
          '<th style="padding:6px 8px;border-bottom:1px solid var(--border);text-align:left;color:var(--muted-foreground)">'+(f,'مقدار','Value')+'</th></tr></thead><tbody>';
        sp.forEach(function(val,key){
          qHtml+='<tr><td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:monospace;font-weight:500">'+key+'</td><td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:monospace;word-break:break-all">'+val+'</td></tr>';
        });
        qHtml+='</tbody></table>';
      }
      params.innerHTML=qHtml;
    }catch(e){
      parts.innerHTML='<span style="color:#ff4444">'+(f,'URL نامعتبر','Invalid URL')+': '+e.message+'</span>';
      params.innerHTML='';
    }
  }
  document.getElementById('url-encode-btn').addEventListener('click',function(){
    input.value=encodeURIComponent(input.value.trim());analyze();
  });
  document.getElementById('url-decode-btn').addEventListener('click',function(){
    try{input.value=decodeURIComponent(input.value.trim());}catch(e){}
    analyze();
  });
  input.addEventListener('input',analyze);
  analyze();
}
