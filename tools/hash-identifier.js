export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔎</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Hash Identifier</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تشخیص نوع هش از روی الگو و طول','Identify hash types by pattern and length')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:16px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'هش مورد نظر','Hash to identify')+'</label>'+
      '<textarea id="hi-input" rows="3" placeholder="e10adc3949ba59abbe56e057f20f883e" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
    '</div>'+
    '<div id="hi-results" style="padding:16px;background:var(--muted);border-radius:var(--radius);min-height:60px"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('hi-input');
  var results=document.getElementById('hi-results');
  if(!input)return;
  var db=[
    {name:'MD5',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'Message Digest 5, 128-bit'},
    {name:'SHA-1',len:40,pattern:/^[0-9a-f]{40}$/i,desc:'Secure Hash Algorithm 1, 160-bit'},
    {name:'SHA-256',len:64,pattern:/^[0-9a-f]{64}$/i,desc:'Secure Hash Algorithm 2, 256-bit'},
    {name:'SHA-384',len:96,pattern:/^[0-9a-f]{96}$/i,desc:'SHA-2, 384-bit'},
    {name:'SHA-512',len:128,pattern:/^[0-9a-f]{128}$/i,desc:'SHA-2, 512-bit'},
    {name:'SHA-224',len:56,pattern:/^[0-9a-f]{56}$/i,desc:'SHA-2, 224-bit'},
    {name:'RIPEMD-128',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'RACE Integrity Primitives, 128-bit'},
    {name:'RIPEMD-160',len:40,pattern:/^[0-9a-f]{40}$/i,desc:'RIPEMD, 160-bit'},
    {name:'RIPEMD-256',len:64,pattern:/^[0-9a-f]{64}$/i,desc:'RIPEMD, 256-bit'},
    {name:'RIPEMD-320',len:80,pattern:/^[0-9a-f]{80}$/i,desc:'RIPEMD, 320-bit'},
    {name:'Whirlpool',len:128,pattern:/^[0-9a-f]{128}$/i,desc:'Whirlpool, 512-bit'},
    {name:'Tiger/160',len:40,pattern:/^[0-9a-f]{40}$/i,desc:'Tiger hash, 160-bit'},
    {name:'Tiger/192',len:48,pattern:/^[0-9a-f]{48}$/i,desc:'Tiger hash, 192-bit'},
    {name:'CRC32',len:8,pattern:/^[0-9a-f]{8}$/i,desc:'Cyclic Redundancy Check, 32-bit'},
    {name:'Adler32',len:8,pattern:/^[0-9a-f]{8}$/i,desc:'Adler-32 checksum'},
    {name:'MD2',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'Message Digest 2, 128-bit'},
    {name:'MD4',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'Message Digest 4, 128-bit'},
    {name:'HAVAL-128',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'HAVAL, 128-bit'},
    {name:'HAVAL-160',len:40,pattern:/^[0-9a-f]{40}$/i,desc:'HAVAL, 160-bit'},
    {name:'HAVAL-192',len:48,pattern:/^[0-9a-f]{48}$/i,desc:'HAVAL, 192-bit'},
    {name:'HAVAL-224',len:56,pattern:/^[0-9a-f]{56}$/i,desc:'HAVAL, 224-bit'},
    {name:'HAVAL-256',len:64,pattern:/^[0-9a-f]{64}$/i,desc:'HAVAL, 256-bit'},
    {name:'GOST',len:64,pattern:/^[0-9a-f]{64}$/i,desc:'GOST R 34.11-94, 256-bit'},
    {name:'SHA3-224',len:56,pattern:/^[0-9a-f]{56}$/i,desc:'SHA-3, 224-bit'},
    {name:'SHA3-256',len:64,pattern:/^[0-9a-f]{64}$/i,desc:'SHA-3, 256-bit'},
    {name:'SHA3-384',len:96,pattern:/^[0-9a-f]{96}$/i,desc:'SHA-3, 384-bit'},
    {name:'SHA3-512',len:128,pattern:/^[0-9a-f]{128}$/i,desc:'SHA-3, 512-bit'},
    {name:'LM Hash',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'Windows LM hash, two 8-char halves'},
    {name:'NTLM',len:32,pattern:/^[0-9a-f]{32}$/i,desc:'Windows NT hash, MD4'},
    {name:'MySQL 4.1',len:40,pattern:/^\*[0-9a-f]{40}$/i,desc:'MySQL hash prefixed with *'},
    {name:'MSSQL',len:40,pattern:/^0x[0-9a-f]{40}$/i,desc:'MSSQL hash with 0x prefix'},
    {name:'bcrypt',len:60,pattern:/^\$2[ayb]\$\d{2}\$[.\/0-9a-zA-Z]{53}$/,desc:'Bcrypt, $2a$/$2b$/$2y$ prefix'},
    {name:'bcrypt',len:59,pattern:/^\$2[ayb]\$\d{2}\$[.\/0-9a-zA-Z]{52}$/,desc:'Bcrypt (slight variation)'},
    {name:'SHA-512 crypt',len:106,pattern:/^\$6\$[\$\.\/0-9a-zA-Z]+\$[\.\/0-9a-zA-Z]{86}$/,desc:'Linux shadow SHA-512'},
    {name:'SHA-256 crypt',len:63,pattern:/^\$5\$[\$\.\/0-9a-zA-Z]+\$[\.\/0-9a-zA-Z]{43}$/,desc:'Linux shadow SHA-256'},
    {name:'MD5 crypt',len:34,pattern:/^\$1\$[\$\.\/0-9a-zA-Z]+\$[\.\/0-9a-zA-Z]{22}$/,desc:'Linux shadow MD5'},
    {name:'Blowfish',len:60,pattern:/^\$2[ayb]\$\d{2}\$[.\/0-9a-zA-Z]{53}$/,desc:'OpenBSD Blowfish'},
    {name:'Base64 (non-hash)',len:-1,pattern:/^[A-Za-z0-9+/=]+$/,desc:'Looks like base64'},
    {name:'Hex (non-hash)',len:-1,pattern:/^[0-9a-f]+$/i,desc:'Hex string - not necessarily a hash'},
  ];
  function identify(h){
    h=h.trim();
    if(!h)return '';
    var len=h.length;
    var results=[];
    db.forEach(function(entry){
      if(entry.len!==-1&&entry.len!==len)return;
      if(!entry.pattern.test(h))return;
      results.push({name:entry.name,desc:entry.desc});
    });
    return results;
  }
  function render(){
    var hash=input.value.trim();
    if(!hash){results.innerHTML='<span style="color:var(--muted-foreground)">'+(f,'هش را وارد کنید...','Enter a hash to identify...')+'</span>';return;}
    var matches=identify(hash);
    if(matches.length===0){
      results.innerHTML='<span style="color:var(--warning)">⚠️ '+(f,'هش شناسایی نشد. لطفاً مطمئن شوید مقدار صحیح است.','Hash not recognized. Please verify the input.')+'</span>'+
        '<div style="margin-top:8px;font-size:.75rem;color:var(--muted-foreground)">'+(f,'طول:','Length:')+' '+hash.length+' '+(f,'کاراکتر','chars')+'</div>';
      return;
    }
    var html='<div style="font-size:.8125rem;margin-bottom:8px;color:var(--success)">✅ '+(f,'تعداد نتایج:','Matches:')+' '+matches.length+'</div>';
    matches.forEach(function(m,i){
      html+='<div style="padding:8px 12px;margin:4px 0;background:var(--card);border-radius:var(--radius);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px">'+
        '<strong style="font-family:monospace;font-size:.875rem">'+(i+1)+'. '+m.name+'</strong>'+
        '<span style="font-size:.75rem;color:var(--muted-foreground)">'+m.desc+'</span>'+
      '</div>';
    });
    html+='<div style="margin-top:12px;padding:8px;background:var(--card);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground)">'+(f,'طول هش:','Hash length:')+' '+hash.length+' '+(f,'کاراکتر','chars')+'</div>';
    results.innerHTML=html;
  }
  input.addEventListener('input',render);
  render();
}
