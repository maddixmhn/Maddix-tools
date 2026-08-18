export default function(lang) {
  var isFa = lang === 'fa';
  return (
    '<div style="padding:16px">'+
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
        '<span style="font-size:2rem">🌐</span>'+
        '<div>'+
          '<h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(isFa?'یابنده ساب‌دامنه':'Subdomain Finder')+'</h2>'+
          '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(isFa?'کشف ساب‌دامنه‌های یک دامنه':'Discover subdomains of a domain')+'</p>'+
        '</div>'+
      '</div>'+
      '<div style="display:flex;gap:8px;margin-bottom:16px">'+
        '<input id="sf-domain" type="text" placeholder="example.com" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;direction:ltr" dir="ltr">'+
        '<button id="sf-scan-btn" class="btn btn-primary" style="padding:10px 20px;border:none;border-radius:var(--radius);background:var(--action);color:#fff;font-size:.875rem;font-weight:500;cursor:pointer;white-space:nowrap">'+(isFa?'اسکن':'Scan')+'</button>'+
      '</div>'+
      '<div id="sf-status" style="margin-bottom:12px;font-size:.8125rem;color:var(--muted-foreground)"></div>'+
      '<div id="sf-result" style="padding:12px;background:var(--muted);border-radius:var(--radius);min-height:100px;font-family:monospace;font-size:.8125rem;line-height:1.6;overflow-y:auto;max-height:400px;direction:ltr">'+
        '<span style="color:var(--muted-foreground)">'+(isFa?'دامنه را وارد کنید و اسکن را بزنید':'Enter domain and click Scan')+'</span>'+
      '</div>'+
      '<div style="margin-top:12px;padding:8px 12px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground)">'+
        (isFa?'از DNS brute force با ۱۰۰ ساب‌دامنه رایج استفاده می‌کند':'Uses DNS brute force with 100 common subdomains')+
      '</div>'+
    '</div>'
  );
}
export function init(lang) {
  var isFa = lang === 'fa';
  var btn = document.getElementById('sf-scan-btn');
  var input = document.getElementById('sf-domain');
  var result = document.getElementById('sf-result');
  var status = document.getElementById('sf-status');
  if (!btn||!input||!result||!status) return;
  var common = ['www','mail','ftp','admin','blog','shop','api','dev','test','demo','app','web','portal','support','help','docs','status','cdn','static','assets','images','img','video','media','download','upload','files','backup','secure','login','auth','sso','account','billing','pay','payment','checkout','cart','store','m','mobile','wap','forum','community','wiki','kb','helpdesk','ticket','chat','live','stream','radio','tv','news','press','events','calendar','map','maps','weather','mail2','smtp','pop','imap','mx','ns1','ns2','ns3','ns4','dns','dns1','dns2','cpanel','whm','webmail','roundcube','phpmyadmin','mysql','db','database','sql','git','jenkins','jira','confluence','trello','slack','teams','zoom','meet','meeting','webinar','survey','forms','stage','staging','prod','production','preprod','beta','alpha','old','new','v2','v3','internal','corp','intranet','remote','vpn','proxy','gateway','firewall','router','switch'];
  function scan() {
    var domain = input.value.trim().toLowerCase();
    if (!domain) return;
    result.innerHTML = (isFa?'<span style="color:var(--muted-foreground)">در حال اسکن...</span>':'<span style="color:var(--muted-foreground)">Scanning...</span>');
    status.textContent = (isFa?'اسکن ۱۰۰ ساب‌دامنه...':'Scanning 100 subdomains...');
    var found = [];
    var checked = 0;
    var total = common.length;
    var active = 0;
    var MAX_CONCURRENT = 5;
    function checkNext() {
      while (active < MAX_CONCURRENT && checked < total) {
        (function(idx) {
          var sub = common[idx]+'.'+domain;
          active++;
          var url = 'https://dns.google/resolve?name='+encodeURIComponent(sub)+'&type=A';
          fetch(url)
            .then(function(r){ return r.json(); })
            .then(function(data){
              if (data && data.Answer && data.Answer.length > 0) {
                var ips = data.Answer.filter(function(a){ return a.type === 1; }).map(function(a){ return a.data; });
                if (ips.length > 0) found.push({ sub: sub, ips: ips });
              }
            })
            .catch(function(){})
            .finally(function(){
              checked++;
              active--;
              var pct = Math.round(checked/total*100);
              status.textContent = (isFa?'اسکن... ':'Scanning... ')+pct+'% ('+checked+'/'+total+') '+(isFa?'پیدا شد':'found')+': '+found.length;
              if (checked >= total && active === 0) {
                if (found.length === 0) {
                  result.innerHTML = '<span style="color:var(--muted-foreground)">'+(isFa?'ساب‌دامنه‌ای پیدا نشد':'No subdomains found')+'</span>';
                } else {
                  result.innerHTML = found.map(function(f){
                    return '<div style="padding:6px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;font-size:.8125rem"><span>'+f.sub+'</span><span style="color:var(--muted-foreground);font-size:.75rem">'+f.ips.join(', ')+'</span></div>';
                  }).join('');
                }
                status.textContent = (isFa?'اسکن کامل شد. ':'Scan complete. ')+found.length+' '+(isFa?'ساب‌دامنه':'subdomains');
                return;
              }
              checkNext();
            });
        })(checked);
      }
    }
    checkNext();
  }
  btn.addEventListener('click', scan);
  input.addEventListener('keydown', function(e){ if(e.key==='Enter') scan(); });
}
