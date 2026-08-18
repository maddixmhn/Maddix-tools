export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🌐</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'ماشین حساب Subnet','Subnet Calculator')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'محاسبه CIDR، ماسک، رنج آی‌پی، برادکست و تعداد میزبان','Calculate CIDR, netmask, IP range, broadcast, and host count')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<input id="subnet-input" type="text" value="192.168.1.0/24" placeholder="192.168.1.0/24" style="flex:1;min-width:200px;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace">'+
      '<select id="subnet-quick" style="padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;cursor:pointer">'+
        '<option value="">'+(f,'انتخاب سریع','Quick select')+'</option>'+
        '<option value="10.0.0.0/8">10.0.0.0/8 (Class A)</option>'+
        '<option value="172.16.0.0/12">172.16.0.0/12 (Class B)</option>'+
        '<option value="192.168.0.0/16">192.168.0.0/16 (Class C)</option>'+
        '<option value="192.168.1.0/24">192.168.1.0/24</option>'+
        '<option value="192.168.1.0/28">192.168.1.0/28</option>'+
        '<option value="192.168.1.0/30">192.168.1.0/30</option>'+
      '</select>'+
    '</div>'+
    '<div id="subnet-results" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.8125rem;line-height:1.8"></div>'+
    '<div style="margin-top:12px;display:grid;grid-template-columns:repeat(9,1fr);gap:2px;border-radius:6px;overflow:hidden" id="subnet-bits"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('subnet-input');
  var quick=document.getElementById('subnet-quick');
  var results=document.getElementById('subnet-results');
  var bits=document.getElementById('subnet-bits');
  if(!input)return;
  quick.addEventListener('change',function(){
    if(quick.value){input.value=quick.value;calc();quick.value='';}
  });
  input.addEventListener('input',calc);
  function ip2bin(s){return s.split('.').map(function(n){var b=parseInt(n).toString(2);return '00000000'.slice(b.length)+b;}).join('');}
  function bin2ip(b){var p=[];for(var i=0;i<32;i+=8)p.push(parseInt(b.slice(i,i+8),2));return p.join('.');}
  function calc(){
    var v=input.value.trim();
    var parts=v.split('/');
    if(parts.length!==2){results.textContent=f?'فرمت نامعتبر. از CIDR استفاده کنید (مثلاً 192.168.1.0/24)':'Invalid format. Use CIDR (e.g. 192.168.1.0/24)';bits.innerHTML='';return;}
    var ipStr=parts[0],cidr=parseInt(parts[1]);
    if(isNaN(cidr)||cidr<0||cidr>32){results.textContent=f,'CIDR نامعتبر. محدوده ۰-۳۲','Invalid CIDR. Range 0-32';bits.innerHTML='';return;}
    var octs=ipStr.split('.').map(Number);
    if(octs.length!==4||octs.some(isNaN)||octs.some(function(n){return n<0||n>255;})){results.textContent=f,'آی‌پی نامعتبر','Invalid IP';bits.innerHTML='';return;}
    var bin=ip2bin(ipStr);
    var networkBits=bin.slice(0,cidr)+'0'.repeat(32-cidr);
    var broadcastBits=bin.slice(0,cidr)+'1'.repeat(32-cidr);
    var netIp=bin2ip(networkBits);
    var broadcastIp=bin2ip(broadcastBits);
    var maskBin='1'.repeat(cidr)+'0'.repeat(32-cidr);
    var maskIp=bin2ip(maskBin);
    var wildcardBin='0'.repeat(cidr)+'1'.repeat(32-cidr);
    var wildcardIp=bin2ip(wildcardBin);
    var firstIp=bin2ip(networkBits.slice(0,31)+'1');
    var lastIp=bin2ip(broadcastBits.slice(0,31)+'0');
    var hosts=Math.pow(2,32-cidr)-2;
    if(cidr>=31)hosts=Math.pow(2,32-cidr);
    var classType='';
    var firstOct=octs[0];
    if(firstOct<128)classType='A';else if(firstOct<192)classType='B';else if(firstOct<224)classType='C';else if(firstOct<240)classType='D (Multicast)';else classType='E (Reserved)';
    var isPrivate=false;
    if(firstOct===10)isPrivate=true;else if(firstOct===172&&octs[1]>=16&&octs[1]<=31)isPrivate=true;else if(firstOct===192&&octs[1]===168)isPrivate=true;
    var binFormatted=bin.slice(0,8)+'.'+bin.slice(8,16)+'.'+bin.slice(16,24)+'.'+bin.slice(24,32);
    var networkFormatted=networkBits.slice(0,8)+'.'+networkBits.slice(8,16)+'.'+networkBits.slice(16,24)+'.'+networkBits.slice(24,32);
    results.innerHTML=''+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'شبکه','Network')+':</span> <strong>'+netIp+'/'+cidr+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'کلاس','Class')+':</span> <strong>'+classType+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'ماسک','Netmask')+':</span> <strong>'+maskIp+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'وایلدکارد','Wildcard')+':</span> <strong>'+wildcardIp+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'برادکست','Broadcast')+':</span> <strong>'+broadcastIp+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'خصوصی؟','Private?')+':</span> <strong>'+((isPrivate?(f,'بله','Yes'):(f,'خیر','No')))+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'اولین میزبان','First Host')+':</span> <strong>'+firstIp+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'آخرین میزبان','Last Host')+':</span> <strong>'+lastIp+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'تعداد میزبان','Total Hosts')+':</span> <strong style="color:var(--success)">'+hosts.toLocaleString()+'</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">'+(f,'آی‌پی باینری','IP Binary')+':</span> <span style="font-family:monospace;font-size:.6875rem">'+binFormatted+'</span></div>'+
      '</div>';
    // Binary visualization
    var bHtml='';
    for(var i=0;i<32;i++){
      var isNet=i<cidr;
      var bit=networkBits[i];
      bHtml+='<div style="text-align:center;padding:6px 2px;font-family:monospace;font-size:.6875rem;background:'+(isNet?'var(--action)':'var(--muted)')+';color:'+(isNet?'#fff':'var(--foreground)')+';'+(i%8===7?'':'')+'">'+bit+'<div style="font-size:.5625rem;opacity:.6;margin-top:2px">'+(32-i)+'</div></div>';
    }
    bits.innerHTML=bHtml;
  }
  calc();
}
