export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔢</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Number Base Converter</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تبدیل بین مبناهای ۲, ۸, ۱۰, ۱۶','Convert between binary, octal, decimal, and hexadecimal')+'</p></div>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">Bin (2)</label><input id="nb-bin" type="text" value="1100100" placeholder="0b1010" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr"></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">Oct (8)</label><input id="nb-oct" type="text" value="144" placeholder="0o12" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr"></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">Dec (10)</label><input id="nb-dec" type="text" value="100" placeholder="10" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr"></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">Hex (16)</label><input id="nb-hex" type="text" value="64" placeholder="0xFF" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;text-transform:uppercase;direction:ltr"></div>'+
    '</div>'+
    '<div style="padding:14px;background:var(--muted);border-radius:var(--radius);font-size:.8125rem;line-height:1.8" id="nb-details"></div>'+
  '</div>';
}
export function init(lang) {
  var el={bin:document.getElementById('nb-bin'),oct:document.getElementById('nb-oct'),dec:document.getElementById('nb-dec'),hex:document.getElementById('nb-hex'),det:document.getElementById('nb-details')};
  if(!el.bin)return;
  var active=null;
  function update(src){
    if(active===src)return;
    active=src;
    var val=el[src].value.trim();
    if(!val){el.bin.value=el.oct.value=el.dec.value=el.hex.value='';el.det.textContent='';return;}
    var dec=NaN;
    try{
      switch(src){
        case 'bin':dec=parseInt(val.replace(/^0b/,''),2);break;
        case 'oct':dec=parseInt(val.replace(/^0o/,''),8);break;
        case 'dec':dec=parseInt(val,10);break;
        case 'hex':dec=parseInt(val.replace(/^0x/,''),16);break;
      }
    }catch(e){dec=NaN;}
    if(isNaN(dec)){el.det.textContent=lang==='fa'?'مقدار نامعتبر':'Invalid value';return;}
    if(dec<0||dec>2147483647){el.det.textContent=lang==='fa'?'مقدار باید بین ۰ تا ۲۱۴۷۴۸۳۶۴۷ باشد':'Value must be between 0 and 2147483647';return;}
    el.bin.value=dec.toString(2);
    el.oct.value=dec.toString(8);
    el.dec.value=dec.toString(10);
    el.hex.value=dec.toString(16).toUpperCase();
    var binStr=dec.toString(2);
    var padded=('0'.repeat(8-((binStr.length-1)%8+1)))+binStr;
    var grouped=padded.replace(/(.{4})/g,'$1 ').trim();
    el.det.innerHTML=''+
      '<div><span style="color:var(--muted-foreground)">'+(lang==='fa'?'اعتبار','Value')+':</span> <strong>'+dec.toLocaleString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(lang==='fa','باینری','Binary')+':</span> <span style="font-family:monospace">'+grouped+'</span> <span style="color:var(--muted-foreground)">('+binStr.length+' '+(lang==='fa'?'بیت','bits')+')</span></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(lang==='fa','بایت‌ها','Bytes')+':</span> <span style="font-family:monospace">'+padded.replace(/(.{8})/g,'$1 ').trim()+'</span></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(lang==='fa','کد ASCII','ASCII')+':</span> <strong>'+(dec>=32&&dec<=126?String.fromCharCode(dec):(lang==='fa','قابل چاپ نیست','Not printable'))+'</strong></div>';
  }
  el.bin.addEventListener('input',function(){update('bin');});
  el.oct.addEventListener('input',function(){update('oct');});
  el.dec.addEventListener('input',function(){update('dec');});
  el.hex.addEventListener('input',function(){update('hex');});
  update('dec');
}
