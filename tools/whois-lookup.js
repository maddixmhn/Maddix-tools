export default function(lang) {
  var isFa = lang === 'fa';
  return (
    '<div style="padding:16px">'+
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
        '<span style="font-size:2rem">🔍</span>'+
        '<div>'+
          '<h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(isFa?'WHOIS جستجوی':'WHOIS Lookup')+'</h2>'+
          '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(isFa?'اطلاعات دامنه و WHOIS':'Domain WHOIS information lookup')+'</p>'+
        '</div>'+
      '</div>'+
      '<div style="display:flex;gap:8px;margin-bottom:16px">'+
        '<input id="wi-domain" type="text" placeholder="'+(isFa?'example.com':'example.com')+'" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;direction:ltr" dir="ltr">'+
        '<button id="wi-lookup-btn" class="btn btn-primary" style="padding:10px 20px;border:none;border-radius:var(--radius);background:var(--action);color:#fff;font-size:.875rem;font-weight:500;cursor:pointer;white-space:nowrap">'+(isFa?'جستجو':'Lookup')+'</button>'+
      '</div>'+
      '<div id="wi-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);min-height:100px;font-family:monospace;font-size:.8125rem;line-height:1.6;white-space:pre-wrap;overflow-x:auto;direction:ltr">'+
        '<span style="color:var(--muted-foreground)">'+(isFa?'نام دامنه را وارد کنید و دکمه جستجو را بزنید':'Enter a domain name and click Lookup')+'</span>'+
      '</div>'+
      '<div style="margin-top:12px;padding:8px 12px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground)">'+
        (isFa?'توسط api.vercel.pizza قدرت گرفته':'Powered by api.vercel.pizza')+
      '</div>'+
    '</div>'
  );
}
export function init(lang) {
  var isFa = lang === 'fa';
  var btn = document.getElementById('wi-lookup-btn');
  var input = document.getElementById('wi-domain');
  var result = document.getElementById('wi-result');
  if (!btn || !input || !result) return;
  function lookup() {
    var domain = input.value.trim();
    if (!domain) return;
    result.textContent = (isFa?'در حال جستجو...':'Looking up...');
    fetch('https://api.vercel.pizza/whois?domain='+encodeURIComponent(domain))
      .then(function(r){ return r.text(); })
      .then(function(data){
        result.textContent = data || (isFa?'نتیجه‌ای یافت نشد':'No results found');
      })
      .catch(function(err){
        result.textContent = (isFa?'خطا: ':'Error: ')+err.message;
      });
  }
  btn.addEventListener('click', lookup);
  input.addEventListener('keydown', function(e){ if(e.key==='Enter') lookup(); });
}
