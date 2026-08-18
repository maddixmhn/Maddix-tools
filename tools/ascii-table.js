export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📜</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">ASCII Table</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'مرجع کامل کاراکترهای ASCII (۰-۱۲۷)','Complete ASCII character reference (0-127)')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;align-items:center">'+
      '<input id="ascii-search" type="text" placeholder="'+(f,'جستجوی کاراکتر...','Search character...')+'" style="flex:1;min-width:160px;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<div style="font-size:.8125rem;color:var(--muted-foreground)"><span id="ascii-count">128</span> '+(f,'کاراکتر','characters')+'</div>'+
    '</div>'+
    '<div style="overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse;font-size:.75rem">'+
        '<thead><tr>'+
          '<th style="padding:6px 8px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:50px">Dec</th>'+
          '<th style="padding:6px 8px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:50px">Hex</th>'+
          '<th style="padding:6px 8px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:50px">Bin</th>'+
          '<th style="padding:6px 8px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">Char</th>'+
          '<th style="padding:6px 8px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f,'نام','Name')+'</th>'+
        '</tr></thead><tbody id="ascii-tbody"></tbody></table></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var names=['NUL (null)','SOH (start heading)','STX (start text)','ETX (end text)','EOT (end transmis.)','ENQ (enquiry)','ACK (acknowledge)','BEL (bell)','BS  (backspace)','TAB (horizontal tab)','LF  (line feed)','VT  (vertical tab)','FF  (form feed)','CR  (carriage ret.)','SO  (shift out)','SI  (shift in)','DLE (data link esc)','DC1 (device ctrl 1)','DC2 (device ctrl 2)','DC3 (device ctrl 3)','DC4 (device ctrl 4)','NAK (neg. ack.)','SYN (synchronous)','ETB (end trans. blk)','CAN (cancel)','EM  (end of medium)','SUB (substitute)','ESC (escape)','FS  (file separ.)','GS  (group separ.)','RS  (record separ.)','US  (unit separ.)','SP  (space)','!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}','~','DEL'];
  var tbody=document.getElementById('ascii-tbody');
  var search=document.getElementById('ascii-search');
  if(!tbody)return;
  function render(q){
    var query=(q||'').toLowerCase();
    var visible=0;
    var html='';
    for(var i=0;i<128;i++){
      var name=names[i];
      var ch=i<33||i===127?(f,'غیرقابل چاپ','Ctrl'):String.fromCharCode(i);
      var chDisplay=i===32?'SP':i===9?'TAB':i===10?'LF':i===13?'CR':i===127?'DEL':String.fromCharCode(i);
      var nameLower=name.toLowerCase();
      if(query&&nameLower.indexOf(query)===-1&&chDisplay.toLowerCase().indexOf(query)===-1&&i.toString().indexOf(query)===-1)continue;
      visible++;
      html+='<tr>'+
        '<td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:monospace;color:var(--muted-foreground)">'+i+'</td>'+
        '<td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:monospace;color:var(--muted-foreground)">'+i.toString(16).toUpperCase().padStart(2,'0')+'</td>'+
        '<td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:monospace;font-size:.625rem;color:var(--muted-foreground)">'+i.toString(2).padStart(7,'0')+'</td>'+
        '<td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:monospace;font-size:1rem;font-weight:600">'+(i<33?('<span style="color:var(--info);font-size:.6875rem">'+ch+'</span>'):chDisplay==='DEL'?'<span style="color:#ff4444;font-size:.6875rem">DEL</span>':escapeHtml(chDisplay))+'</td>'+
        '<td style="padding:4px 8px;border-bottom:1px solid var(--border);color:var(--muted-foreground);font-size:.75rem">'+name+'</td>'+
      '</tr>';
    }
    tbody.innerHTML=html;
    document.getElementById('ascii-count').textContent=visible;
  }
  function escapeHtml(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
  search.addEventListener('input',function(){render(search.value);});
  render('');
}
