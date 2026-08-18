export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📧</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'استخراج ایمیل','Email Extractor')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'استخراج آدرس‌های ایمیل از متن','Extract email addresses from text')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'متن','Text')+'</label>'+
      '<textarea id="ee-input" rows="6" placeholder="'+(f,'متن را وارد کنید...','Paste your text here...')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">Contact us at support@example.com or sales@company.org for more info.&#10;You can also reach ali@gmail.com, info@test.net, or admin@security.io.&#10;Invalid: test@, @domain.com, user@.com</textarea>'+
    '</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">'+
      '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px"><input type="checkbox" id="ee-unique" checked> '+(f,'حذف تکراری','Remove duplicates')+'</label>'+
      '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px"><input type="checkbox" id="ee-sort" checked> '+(f,'مرتب‌سازی','Sort')+'</label>'+
      '<button id="ee-copy" style="padding:6px 14px">'+(f,'کپی','Copy')+'</button>'+
    '</div>'+
    '<div style="padding:14px;background:var(--muted);border-radius:var(--radius);min-height:60px">'+
      '<div id="ee-count" style="font-size:.75rem;color:var(--muted-foreground);margin-bottom:6px"></div>'+
      '<div id="ee-result" style="font-family:monospace;font-size:.8125rem;line-height:1.6;word-break:break-all"></div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('ee-input');
  var result=document.getElementById('ee-result');
  var count=document.getElementById('ee-count');
  if(!input)return;
  var emailRegex=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}/g;
  function extract(){
    var text=input.value;
    var matches=text.match(emailRegex)||[];
    if(document.getElementById('ee-unique').checked){
      var seen={};matches=matches.filter(function(e){if(seen[e])return false;seen[e]=true;return true;});
    }
    if(document.getElementById('ee-sort').checked)matches.sort();
    count.textContent=matches.length+' '+(f,'ایمیل پیدا شد','email(s) found');
    result.textContent=matches.length?matches.join('\n'):(f,'ایمیلی یافت نشد','No emails found');
  }
  document.getElementById('ee-copy').addEventListener('click',function(){navigator.clipboard.writeText(result.textContent);});
  input.addEventListener('input',extract);
  document.getElementById('ee-unique').addEventListener('change',extract);
  document.getElementById('ee-sort').addEventListener('change',extract);
  extract();
}
