export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔗</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'ابزار MAC':'MAC Address Tools')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'تولید MAC random و جستجوی فروشنده با OUI':'Generate random MACs and lookup vendor by OUI prefix')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="mac-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-mactab="generator">'+(f,'تولید','Generator')+'</button>'+
      '<button data-mactab="lookup">'+(f,'جستجوی OUI','OUI Lookup')+'</button>'+
    '</div>'+
    '<div class="mactab-content" data-mactab="generator">'+
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">'+
        '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem"><input type="radio" name="mac-type" value="random" checked> '+(f,'تصادفی','Random')+'</label>'+
        '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem"><input type="radio" name="mac-type" value="unicast"> '+(f,'Unicast','Unicast')+'</label>'+
        '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem"><input type="radio" name="mac-type" value="multicast"> '+(f,'Multicast','Multicast')+'</label>'+
        '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem"><input type="radio" name="mac-type" value="local"> '+(f,'محلی','Local')+'</label>'+
      '</div>'+
      '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">'+
        '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px">'+(f,'تعداد:','Count:')+' <select id="mac-count" style="padding:6px 8px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none">'+
          [1,5,10,25,50].map(function(n){return '<option'+(n===5?' selected':'')+'>'+n+'</option>';}).join('')+'</select></label>'+
        '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px">'+(f,'فرمت:','Format:')+' <select id="mac-format" style="padding:6px 8px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none">'+
          '<option value="colon">AA:BB:CC:DD:EE:FF</option><option value="hyphen">AA-BB-CC-DD-EE-FF</option><option value="dot">AABB.CCDD.EEFF</option><option value="none">AABBCCDDEEFF</option><option value="cisco">aaaa.bbbb.cccc</option></select></label>'+
        '<button id="mac-generate" class="primary">'+(f,'تولید','Generate')+'</button><button id="mac-copy-all">'+(f,'کپی همه','Copy All')+'</button>'+
      '</div>'+
      '<pre id="mac-output" style="margin:0;padding:14px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;line-height:1.7;min-height:80px;white-space:pre-wrap"></pre>'+
    '</div>'+
    '<div class="mactab-content" data-mactab="lookup" style="display:none">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'پیشوند MAC (۶ کاراکتر اول)','MAC Prefix (first 6 chars)')+'</label>'+
      '<div style="display:flex;gap:8px">'+
        '<input id="mac-oui" type="text" placeholder="00:1A:2B or 001A2B" maxlength="8" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;text-transform:uppercase">'+
        '<button id="mac-lookup-btn" class="primary">'+(f,'جستجو','Lookup')+'</button>'+
      '</div>'+
      '<div id="mac-lookup-result" style="margin-top:12px;padding:14px;background:var(--muted);border-radius:var(--radius);font-size:.8125rem;line-height:1.6;min-height:40px"></div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var vendors = { '00037F':'Atmel','000A5E':'Cisco','000C29':'VMware','001378':'Intel','00155D':'Microsoft','0017C8':'Huawei','001A11':'Google','001C42':'HP','001E49':'Samsung','002128':'Dell','002268':'IBM','002590':'Apple','0050B6':'D-Link','005056':'VMware','00904F':'Nortel','009C02':'Apple','080007':'Apple','080020':'Sun','080028':'PCS','080046':'Intel','08005A':'IBM','08008F':'Bay Networks','0C4DE9':'HP','10005A':'IBM','14DAE9':'D-Link','1CB72C':'Cisco','20FDF1':'Raspberry Pi','28B2BD':'Intel','2C27D7':'Huawei','3C0754':'Cisco','3CD92B':'Hewlett Packard','406186':'Cisco','4473D2':'Sony','4C5F70':'Amazon','506B8F':'Cisco','508569':'Cisco','508A42':'Xiaomi','54A050':'Apple','585076':'Dell','5C5188':'Intel','606720':'Cisco','64A3CB':'Asus','68A3C4':'Apple','6C2E85':'HTC','6C3C8C':'MSI','6CF049':'Zyxel','709AFE':'IBM','747E2D':'LG','78C5E5':'Cisco','7CC3A1':'TP-Link','7CFF4D':'Raspberry Pi','80A1D7':'Samsung','8C8590':'Cisco','9017AC':'Microsoft','94DBC9':'Intel','98D6F7':'Xiaomi','9C2E70':'Apple','9C8E99':'ASRock','A0369F':'Intel','A0CEA1':'Nintendo','A4C361':'Palo Alto','AC1F6B':'HP','B06E2B':'Intel','BC6778':'Microsoft','BCF685':'Sony','C025A5':'Fortinet','C8D15E':'Alcatel-Lucent','CC46D6':'Cisco','D0FF50':'Cisco','D47B75':'Synology','DC7144':'Netgear','E0ACA4':'Lenovo','E45F01':'Google','E8FC60':'Intel','F0DEF1':'Cisco','F8C091':'HP','FCAA14':'Apple','0050C2':'Cisco','001217':'Apple','000B5F':'Motorola','00800F':'Intel','00E04C':'Nortel','008096':'Intel','080030':'DEC','08003E':'MIPS','080044':'Toshiba','0000E8':'IBM','00000C':'Cisco','0000F8':'Siemens','000043':'IBM','00002D':'IBM','000020':'Toshiba','0000E2':'Acer','0000A0':'HP','0000D2':'Asus','0000A7':'Intel','0000F3':'Dell','0000F1':'Dell','0000C9':'Apple','000045':'Cisco' };
  document.querySelectorAll('#mac-tabs button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#mac-tabs button').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      document.querySelectorAll('.mactab-content').forEach(function(el){el.style.display='none';});
      var t=document.querySelector('.mactab-content[data-mactab="'+btn.dataset.mactab+'"]');
      if(t)t.style.display='block';
    });
  });
  function randByte(){return Math.floor(Math.random()*256);}
  function fmtMac(octets, fmt){
    var s=octets.map(function(b){return b.toString(16).toUpperCase().padStart(2,'0');});
    switch(fmt){
      case 'hyphen': return s.join('-');
      case 'dot': return s.slice(0,2).join('')+'.'+s.slice(2,4).join('')+'.'+s.slice(4,6).join('');
      case 'none': return s.join('');
      case 'cisco': return s.join('').toLowerCase().replace(/(.{4})/g,'$1.').slice(0,14);
      default: return s.join(':');
    }
  }
  function genMac(type){
    var o=[randByte(),randByte(),randByte(),randByte(),randByte(),randByte()];
    if(type==='unicast') o[0]=o[0]&0xFE;
    else if(type==='multicast') o[0]=o[0]|0x01;
    else if(type==='local') o[0]=(o[0]&0xFC)|0x02;
    return o;
  }
  document.getElementById('mac-generate').addEventListener('click', function(){
    var count=parseInt(document.getElementById('mac-count').value);
    var type=document.querySelector('input[name="mac-type"]:checked').value;
    var fmt=document.getElementById('mac-format').value;
    var out=[];
    for(var i=0;i<count;i++) out.push(fmtMac(genMac(type),fmt));
    document.getElementById('mac-output').textContent=out.join('\n');
  });
  document.getElementById('mac-copy-all').addEventListener('click', function(){
    var t=document.getElementById('mac-output').textContent;
    if(t)navigator.clipboard.writeText(t);
  });
  document.getElementById('mac-lookup-btn').addEventListener('click', function(){
    var prefix=document.getElementById('mac-oui').value.replace(/[^0-9a-fA-F]/g,'').toUpperCase().slice(0,6);
    var r=document.getElementById('mac-lookup-result');
    if(prefix.length<6){r.innerHTML='<span style="color:var(--warning)">'+(f?'لطفاً ۶ کاراکتر اول MAC را وارد کنید (مثلاً 001A2B یا 00:1A:2B)':'Please enter first 6 chars of MAC (e.g. 001A2B or 00:1A:2B)')+'</span>';return;}
    var vendor=vendors[prefix];
    if(vendor) r.innerHTML='<span style="color:var(--success)">'+(f,'فروشنده:','Vendor:')+'</span> <strong>'+vendor+'</strong> &middot; <span style="color:var(--muted-foreground)"><a href="https://www.wireshark.org/tools/oui-lookup.html" target="_blank" rel="noopener" style="text-decoration:underline">'+(f,'جستجوی کامل OUI','Full OUI lookup')+'</a></span>';
    else r.innerHTML='<span style="color:var(--warning)">'+(f,'پیشوند در دیتابیس محلی یافت نشد. دیتابیس شامل '+Object.keys(vendors).length+' فروشنده معروف است.','Prefix not found in local DB. DB has '+Object.keys(vendors).length+' well-known vendors.')+'</span>';
  });
  document.getElementById('mac-generate').click();
}
