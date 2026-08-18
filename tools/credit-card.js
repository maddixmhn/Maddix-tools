export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">💳</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'اعتبارسنجی کارت','Credit Card Validator')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'اعتبارسنجی و شناسایی issuer کارت با الگوریتم Luhn','Validate and identify card issuer using Luhn algorithm')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:16px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'شماره کارت','Card Number')+'</label>'+
      '<div style="display:flex;gap:8px">'+
        '<input id="cc-input" type="text" value="4111111111111111" placeholder="4111 1111 1111 1111" maxlength="23" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr">'+
      '</div>'+
    '</div>'+
    '<div id="cc-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.8125rem;line-height:1.8;margin-bottom:16px"></div>'+
    '<div style="padding:12px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-size:.75rem;line-height:1.6;color:var(--muted-foreground)">'+
      '<div style="font-weight:500;margin-bottom:4px">'+(f,'issuerهای پشتیبانی شده','Supported issuers')+':</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">'+
        '<div>Visa: 4</div><div>Mastercard: 51-55, 2221-2720</div>'+
        '<div>Amex: 34, 37</div><div>Diners: 300-305, 36, 38, 39</div>'+
        '<div>Discover: 6011, 622126-622925, 644-649, 65</div><div>JCB: 3528-3589</div>'+
        '<div>Maestro: 5018, 5020, 5038, 56-69</div><div>Verve: 506099-506198</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var input=document.getElementById('cc-input');
  var result=document.getElementById('cc-result');
  if(!input)return;
  function luhnCheck(num){
    var sum=0,alt=false;
    for(var i=num.length-1;i>=0;i--){
      var d=parseInt(num[i],10);
      if(isNaN(d))return false;
      if(alt){d*=2;if(d>9)d-=9;}
      sum+=d;alt=!alt;
    }
    return sum%10===0;
  }
  function identify(num){
    var s=num.replace(/\D/g,'');
    var len=s.length;
    if(/^4/.test(s)&&(len===13||len===16||len===19))return{name:'Visa',color:'#1a1f71'};
    if(/^5[1-5]/.test(s)&&len===16)return{name:'Mastercard',color:'#eb001b'};
    if(/^2(?:2[2-9][0-9]|2[3-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720[0-9])/.test(s)&&len===16)return{name:'Mastercard',color:'#eb001b'};
    if(/^3[47]/.test(s)&&len===15)return{name:'American Express',color:'#2e77bc'};
    if(/^3(?:0[0-5]|[68][0-9])/.test(s)&&len===14)return{name:'Diners Club',color:'#004481'};
    if(/^6011/.test(s)||/^65/.test(s)||/^64[4-9]/.test(s)||/^622(1[2-9][6-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5])/.test(s))return{name:'Discover',color:'#ff6600'};
    if(/^35(2[8-9]|[3-8][0-9])/.test(s)&&len===16)return{name:'JCB',color:'#0b7b31'};
    if(/^(5018|5020|5038|56|57|58|59|60|61|62|63|64|65|66|67|68|69)/.test(s)&&len>=12&&len<=19)return{name:'Maestro',color:'#cc0000'};
    if(/^506(0|1)[0-9]/.test(s)&&len>=16&&len<=19)return{name:'Verve',color:'#193c71'};
    if(/^4026/.test(s)||/^417500/.test(s)||/^4508/.test(s)||/^4844/.test(s)||/^4913/.test(s)||/^4917/.test(s))return{name:'Visa Electron',color:'#1a1f71'};
    if(/^62/.test(s)&&len===16)return{name:'UnionPay',color:'#d80027'};
    return null;
  }
  function formatCard(num){
    var s=num.replace(/\D/g,'');
    var parts=[];
    for(var i=0;i<s.length;i+=4)parts.push(s.slice(i,i+4));
    return parts.join(' ');
  }
  function validate(){
    var raw=input.value.trim();
    var digits=raw.replace(/\D/g,'');
    if(!digits){result.innerHTML='<span style="color:var(--muted-foreground)">'+(lang==='fa'?'شماره کارت را وارد کنید':'Enter a card number')+'</span>';return;}
    var issuer=identify(digits);
    var valid=luhnCheck(digits);
    var formatted=formatCard(digits);
    var html='<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">'+
      '<div style="text-align:center;min-width:80px"><div style="font-size:2rem">'+(valid?'✅':'❌')+'</div><div style="font-size:.75rem;font-weight:600;color:'+(valid?'var(--success)':'#ff4444')+'">'+(valid?(lang==='fa'?'معتبر':'Valid'):(lang==='fa'?'نامعتبر':'Invalid'))+'</div></div>';
    if(issuer)html+='<div><div style="font-size:.75rem;color:var(--muted-foreground)">'+(lang==='fa','issuer','Issuer')+'</div><div style="font-size:1.1rem;font-weight:700;color:'+issuer.color+'">'+issuer.name+'</div></div>';
    html+='<div><div style="font-size:.75rem;color:var(--muted-foreground)">'+(lang==='fa'?'شماره فرمت شده':'Formatted')+'</div><div style="font-family:monospace;font-size:1rem;font-weight:600">'+formatted+'</div></div>'+
      '<div><div style="font-size:.75rem;color:var(--muted-foreground)">'+(lang==='fa'?'طول':'Length')+'</div><div style="font-size:1.1rem;font-weight:600">'+digits.length+' '+(lang==='fa'?'رقم':'digits')+'</div></div>'+
    '</div>';
    if(!valid&&issuer)html+='<div style="margin-top:8px;padding:8px;background:var(--card);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground)">'+(lang==='fa'?'توجه: Luhn چک پاس نشد. احتمالاً شماره تست است.':'Note: Luhn check failed. Likely a test number.')+'</div>';
    result.innerHTML=html;
  }
  input.addEventListener('input',function(){
    var cursor=input.selectionStart;
    var raw=input.value.replace(/[^0-9]/g,'');
    var formatted='';
    for(var i=0;i<raw.length;i++){if(i>0&&i%4===0)formatted+=' ';formatted+=raw[i];}
    input.value=formatted;
    validate();
  });
  validate();
}
