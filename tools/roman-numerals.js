export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🏛️</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Roman Numerals</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تبدیل بین اعداد رومی و عربی','Convert between Roman and Arabic numerals')+'</p></div>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'عدد عربی','Arabic')+'</label><input id="rn-arabic" type="number" value="2024" min="1" max="3999" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr"></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'رومی','Roman')+'</label><input id="rn-roman" type="text" value="MMXXIV" placeholder="MMXXIV" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;text-transform:uppercase;direction:ltr"></div>'+
    '</div>'+
    '<div id="rn-details" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.8125rem;line-height:1.8"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var arabic=document.getElementById('rn-arabic');
  var roman=document.getElementById('rn-roman');
  var details=document.getElementById('rn-details');
  if(!arabic)return;
  var valMap={M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  function toRoman(n){
    if(n<1||n>3999)return null;
    var result='';
    var pairs=[['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    for(var i=0;i<pairs.length;i++){while(n>=pairs[i][1]){result+=pairs[i][0];n-=pairs[i][1];}}
    return result;
  }
  function fromRoman(s){
    var str=s.toUpperCase().trim();
    if(!/^[IVXLCDM]+$/.test(str))return null;
    var total=0,i=0;
    var pairs=[['CM',900],['CD',400],['XC',90],['XL',40],['IX',9],['IV',4],['M',1000],['D',500],['C',100],['L',50],['X',10],['V',5],['I',1]];
    while(i<str.length){
      var matched=false;
      for(var j=0;j<pairs.length;j++){
        if(str.slice(i,i+pairs[j][0].length)===pairs[j][0]){total+=pairs[j][1];i+=pairs[j][0].length;matched=true;break;}
      }
      if(!matched)return null;
    }
    return total;
  }
  var active=null;
  function updateArabic(){
    if(active==='arabic')return;
    active='arabic';
    var val=parseInt(arabic.value);
    if(isNaN(val)||val<1){details.innerHTML='<span style="color:var(--warning)">'+(f,'لطفاً یک عدد بین ۱ تا ۳۹۹۹ وارد کنید','Enter a number between 1 and 3999')+'</span>';return;}
    if(val>3999){details.innerHTML='<span style="color:var(--warning)">'+(f,'اعداد بالای ۳۹۹۹ پشتیبانی نمی‌شود','Numbers above 3999 are not supported')+'</span>';return;}
    var r=toRoman(val);
    if(!r){details.innerHTML='<span style="color:var(--warning)">'+(f,'خطا در تبدیل','Conversion error')+'</span>';return;}
    roman.value=r;
    var parts=romanToParts(r);
    details.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'عربی','Arabic')+':</span> <strong>'+val+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'رومی','Roman')+':</span> <strong style="font-size:1.1rem">'+r+'</strong></div>'+
      '<div style="grid-column:1/-1"><span style="color:var(--muted-foreground)">'+(f,'تجزیه:','Breakdown:')+'</span> '+parts.join(' + ')+'</div>'+
    '</div>';
  }
  function updateRoman(){
    if(active==='roman')return;
    active='roman';
    var r=roman.value.trim();
    if(!r){details.innerHTML='';return;}
    var val=fromRoman(r);
    if(val===null||val<1||val>3999){details.innerHTML='<span style="color:var(--warning)">'+(f,'عدد رومی نامعتبر','Invalid Roman numeral')+'</span>';return;}
    arabic.value=val;
    var parts=romanToParts(r);
    details.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'رومی','Roman')+':</span> <strong style="font-size:1.1rem">'+r.toUpperCase()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'عربی','Arabic')+':</span> <strong>'+val+'</strong></div>'+
      '<div style="grid-column:1/-1"><span style="color:var(--muted-foreground)">'+(f,'تجزیه:','Breakdown:')+'</span> '+parts.join(' + ')+'</div>'+
    '</div>';
  }
  function romanToParts(r){
    var pairs=[['CM',900],['CD',400],['XC',90],['XL',40],['IX',9],['IV',4],['M',1000],['D',500],['C',100],['L',50],['X',10],['V',5],['I',1]];
    var parts=[];
    var s=r.toUpperCase();
    for(var i=0;i<pairs.length;i++){
      while(s.indexOf(pairs[i][0])===0){parts.push(pairs[i][0]+'('+pairs[i][1]+')');s=s.slice(pairs[i][0].length);}
    }
    return parts;
  }
  arabic.addEventListener('input',updateArabic);
  roman.addEventListener('input',updateRoman);
  updateArabic();
}
