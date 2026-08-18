export default function(lang) {
  var f = lang === 'fa';
  var allHeaders = getAllHeaders();
  var cats = ['general','request','response','entity','security','cors','auth','cache','content','other'];
  var catNames = {
    general: f?'عمومی':'General',
    request: f?'درخواست':'Request',
    response: f?'پاسخ':'Response',
    entity: f?'موجودیت':'Entity',
    security: f?'امنیت':'Security',
    cors: 'CORS',
    auth: f?'احراز هویت':'Authentication',
    cache: f?'ذخیره':'Cache',
    content: f?'محتوا':'Content',
    other: f?'سایر':'Other'
  };
  var catColors = {
    general:'var(--primary,#3b82f6)', request:'var(--success,#22c55e)', response:'var(--warning,#f59e0b)',
    entity:'var(--text-dim,#888)', security:'var(--danger,#ef4444)', cors:'var(--primary,#3b82f6)',
    auth:'var(--warning,#f59e0b)', cache:'var(--success,#22c55e)', content:'var(--text-dim,#888)', other:'var(--text-dim,#888)'
  };

  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🌐</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">HTTP Headers Reference</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'مرجع کامل هدرهای HTTP درخواست و پاسخ':'Complete HTTP request and response headers reference')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<input id="http-h-search" type="text" placeholder="'+(f?'جستجوی هدرها...':'Search headers...')+'" style="flex:1;min-width:180px;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<select id="http-h-cat-filter" style="padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;cursor:pointer">'+
        '<option value="">'+(f?'همه دسته‌ها':'All categories')+'</option>'+
        cats.map(function(c){ return '<option value="'+c+'">'+catNames[c]+'</option>'; }).join('')+
      '</select>'+
    '</div>'+
    '<div style="overflow-x:auto;border-radius:8px;border:1px solid var(--border,#333)">'+
      '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
        '<thead><tr style="background:var(--bg-card,#1a1a2e)">'+
          '<th style="padding:10px 12px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);white-space:nowrap">'+(f?'هدر':'Header')+'</th>'+
          '<th style="padding:10px 12px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'توضیح':'Description')+'</th>'+
          '<th style="padding:10px 12px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);white-space:nowrap">'+(f?'نوع':'Type')+'</th>'+
          '<th style="padding:10px 12px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);white-space:nowrap">'+(f?'دسته':'Category')+'</th>'+
        '</tr></thead><tbody id="http-h-tbody">'+
        allHeaders.map(function(h){
          return '<tr data-hname="'+h[0].toLowerCase()+'" data-hcat="'+h[3]+'" data-hdesc="'+(h[1]+' '+h[2]).toLowerCase()+'">'+
            '<td style="padding:8px 12px;border-bottom:1px solid var(--border,#2a2a3e)"><code style="font-family:monospace;font-size:.8rem;color:var(--primary,#00c8ff);background:rgba(0,200,255,.1);padding:2px 6px;border-radius:4px">'+h[0]+'</code>'+
            (h[4] ? ' <span style="font-size:.6875rem;color:var(--text-dim,#666)">→ '+h[4]+'</span>' : '')+
            '</td>'+
            '<td style="padding:8px 12px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text,#ccc)">'+(f?h[2]:h[1])+'</td>'+
            '<td style="padding:8px 12px;border-bottom:1px solid var(--border,#2a2a3e)"><span style="font-size:.6875rem;padding:2px 8px;border-radius:4px;background:'+catColors[h[3]]+'22;color:'+catColors[h[3]]+'">'+h[4].toUpperCase()+'</span></td>'+
            '<td style="padding:8px 12px;border-bottom:1px solid var(--border,#2a2a3e);color:var(--text-dim,#888);font-size:.6875rem">'+catNames[h[3]]+'</td>'+
          '</tr>';
        }).join('')+
        '</tbody></table>'+
    '</div>'+
    '<div style="margin-top:12px;padding:8px;background:var(--bg-card,#1a1a2e);border-radius:6px;font-size:.75rem;color:var(--text-dim,#888);text-align:center">'+(f?'تعداد: ':'Total: ')+allHeaders.length+' '+(f?'هدر':'headers')+'</div>'+
  '</div>';
}

function getAllHeaders() {
  return [
    // General headers
    ['Date','Date and time of message origin','تاریخ و زمان ایجاد پیام','general','general'],
    ['Connection','Connection management option','گزینه مدیریت اتصال','general','general'],
    ['Via','Intermediate protocol/recipient','پروتکل/گیرنده واسط','general','general'],
    ['Cache-Control','Directives for caching mechanisms','دستورالعمل‌های مکانیزم ذخیره','cache','general'],
    ['Pragma','Implementation-specific directives','دستورالعمل‌های خاص پیاده‌سازی','cache','general'],
    ['Trailer','List of headers in trailer','لیست هدرهای ترایلر','general','general'],
    ['Transfer-Encoding','Transfer coding applied','کدگذاری انتقال اعمال شده','general','general'],
    ['Upgrade','Upgrade protocol request','درخواست ارتقاء پروتکل','general','general'],
    ['Warning','Additional information about status','اطلاعات اضافی درباره وضعیت','general','general'],

    // Request headers
    ['Host','Target host and port','میزبان و پورت مقصد','request','request'],
    ['User-Agent','Client user agent string','رشته عامل کاربر کلاینت','request','request'],
    ['Accept','Media types client can process','انواع رسانه قابل پردازش توسط کلاینت','content','request'],
    ['Accept-Charset','Character sets client accepts','مجموعه کاراکترهای قابل قبول کلاینت','content','request'],
    ['Accept-Encoding','Encodings client can decode','کدگذاری‌های قابل رمزگشایی کلاینت','content','request'],
    ['Accept-Language','Natural languages preferred','زبان‌های طبیعی ترجیحی','content','request'],
    ['Referer','Previous page address','آدرس صفحه قبلی','request','request'],
    ['Origin','Origin of the request (CORS)','مبدأ درخواست (CORS)','cors','request'],
    ['Authorization','Authentication credentials','اعتبارنامه احراز هویت','auth','request'],
    ['Proxy-Authorization','Proxy authentication','احراز هویت پروکسی','auth','request'],
    ['From','User email address','آدرس ایمیل کاربر','request','request'],
    ['Expect','Expected server behavior','رفتار مورد انتظار سرور','request','request'],
    ['Max-Forwards','Max forwarding (TRACE)','حداکثر ارسال (TRACE)','request','request'],
    ['Cookie','Stored HTTP cookies','کوکی‌های ذخیره شده HTTP','request','request'],
    ['DNT','Do Not Track preference','ترجیح ردیابی نکردن','request','request'],
    ['X-Requested-With','AJAX request identifier','شناسه درخواست AJAX','request','request'],
    ['Forwarded','Proxy forwarding info','اطلاعات ارسال پروکسی','request','request'],
    ['X-Forwarded-For','Original client IP','IP اصلی کلاینت','request','request'],
    ['X-Forwarded-Proto','Original protocol (http/https)','پروتکل اصلی (http/https)','request','request'],
    ['X-Forwarded-Host','Original host header','هدر میزبان اصلی','request','request'],
    ['TE','Transfer encodings accepted','کدگذاری‌های انتقال قابل قبول','request','request'],

    // Response headers
    ['Server','Server software information','اطلاعات نرم‌افزار سرور','response','response'],
    ['Location','Redirect target URL','URL مقصد هدایت','response','response'],
    ['Retry-After','Retry delay after rate limit','تأخیر تلاش مجدد بعد از محدودیت','response','response'],
    ['Age','Response age in seconds','سن پاسخ بر حسب ثانیه','response','response'],
    ['Vary','Vary based on request headers','تغییر بر اساس هدرهای درخواست','response','response'],
    ['Allow','Allowed HTTP methods','متدهای HTTP مجاز','response','response'],
    ['Accept-Ranges','Range request support','پشتیبانی از درخواست محدوده','response','response'],
    ['Set-Cookie','Send cookies from server','ارسال کوکی از سرور','response','response'],
    ['WWW-Authenticate','Authentication challenge','چالش احراز هویت','auth','response'],
    ['Proxy-Authenticate','Proxy authentication challenge','چالش احراز هویت پروکسی','auth','response'],
    ['X-Powered-By','Server technology details','جزئیات فناوری سرور','response','response'],

    // Security headers
    ['Strict-Transport-Security','HSTS policy enforcement','اعمال خط‌مشی HSTS','security','response'],
    ['Content-Security-Policy','Content security policy','خط‌مشی امنیت محتوا','security','response'],
    ['Content-Security-Policy-Report-Only','CSP report only mode','حالت گزارش فقط CSP','security','response'],
    ['X-Content-Type-Options','MIME type sniffing prevention','جلوگیری از تشخیص نوع MIME','security','response'],
    ['X-Frame-Options','Clickjacking protection','محافظت از کلیک‌ربایی','security','response'],
    ['X-XSS-Protection','Cross-site scripting filter','فیلتر اسکریپت بین سایتی','security','response'],
    ['X-DNS-Prefetch-Control','DNS prefetch control','کنترل پیش‌واکشی DNS','security','response'],
    ['Expect-CT','Certificate transparency','شفافیت گواهی','security','response'],
    ['Public-Key-Pins','Public key pinning (deprecated)','پین کردن کلید عمومی (منسوخ)','security','response'],
    ['Permissions-Policy','Browser permissions policy','خط‌مشی مجوزهای مرورگر','security','response'],
    ['Referrer-Policy','Referrer policy control','کنترل خط‌مشی ارجاع‌دهنده','security','response'],
    ['Cross-Origin-Embedder-Policy','Cross-origin embedding','جاسازی بین مبدأ','security','response'],
    ['Cross-Origin-Opener-Policy','Cross-origin opener','بازکننده بین مبدأ','security','response'],
    ['Cross-Origin-Resource-Policy','Cross-origin resource','منبع بین مبدأ','security','response'],

    // CORS headers
    ['Access-Control-Allow-Origin','Allowed origins','مبدأهای مجاز','cors','response'],
    ['Access-Control-Allow-Methods','Allowed HTTP methods','متدهای HTTP مجاز','cors','response'],
    ['Access-Control-Allow-Headers','Allowed request headers','هدرهای درخواست مجاز','cors','response'],
    ['Access-Control-Expose-Headers','Exposable response headers','هدرهای پاسخ قابل نمایش','cors','response'],
    ['Access-Control-Max-Age','Preflight cache duration','مدت ذخیره پیش‌پرواز','cors','response'],
    ['Access-Control-Allow-Credentials','Credentials flag for CORS','پرچم اعتبارنامه برای CORS','cors','response'],
    ['Access-Control-Request-Method','Preflight request method','متد درخواست پیش‌پرواز','cors','request'],
    ['Access-Control-Request-Headers','Preflight request headers','هدرهای درخواست پیش‌پرواز','cors','request'],
    ['Timing-Allow-Origin','Resource timing origins','مبدأهای زمان‌بندی منبع','cors','response'],

    // Cache headers
    ['ETag','Entity tag for caching','برچسب موجودیت برای ذخیره','cache','response'],
    ['If-None-Match','Conditional request (ETag)','درخواست شرطی (ETag)','cache','request'],
    ['If-Match','Conditional request (match)','درخواست شرطی (تطبیق)','cache','request'],
    ['If-Modified-Since','Conditional request (date)','درخواست شرطی (تاریخ)','cache','request'],
    ['If-Unmodified-Since','Conditional request (not modified)','درخواست شرطی (تغییر نکرده)','cache','request'],
    ['If-Range','Partial range conditional','محدوده جزئی شرطی','cache','request'],
    ['Range','Request partial content','درخواست محتوای جزئی','cache','request'],
    ['Content-Range','Partial content range','محدوده محتوای جزئی','cache','response'],
    ['Expires','Expiration date/time','تاریخ/زمان انقضا','cache','response'],
    ['Last-Modified','Last modification date','تاریخ آخرین تغییر','cache','response'],

    // Content/Entity headers
    ['Content-Type','Media type of resource','نوع رسانه منبع','content','entity'],
    ['Content-Length','Body size in bytes','اندازه بدنه بر حسب بایت','content','entity'],
    ['Content-Encoding','Encoding applied to body','کدگذاری اعمال شده روی بدنه','content','entity'],
    ['Content-Language','Natural language of content','زبان طبیعی محتوا','content','entity'],
    ['Content-Location','Alternate resource location','مکان جایگزین منبع','content','entity'],
    ['Content-Disposition','Presentation style','سبک نمایش','content','entity'],
    ['Content-MD5','MD5 checksum (deprecated)','چک‌سام MD5 (منسوخ)','content','entity'],
    ['Content-Description','Description of content','توضیح محتوا','content','entity'],
    ['Content-ID','Content identifier','شناسه محتوا','content','entity'],
    ['Content-Transfer-Encoding','Encoding for transport','کدگذاری برای انتقال','content','entity'],
    ['Content-Base','Base URL for relative URLs','URL پایه برای URLهای نسبی','content','entity'],
    ['Content-Version','Version of content','نسخه محتوا','content','entity'],
    ['MIME-Version','MIME protocol version','نسخه پروتکل MIME','content','entity'],
    ['Slug','Document name (Atom)','نام سند (Atom)','content','entity'],
    ['Digest','Message digest of body','خلاصه پیام بدنه','content','entity'],
    ['Want-Digest','Request message digest','درخواست خلاصه پیام','content','request'],

    // Other headers
    ['Alt-Svc','Alternative services','خدمات جایگزین','other','response'],
    ['Clear-Site-Data','Clear browsing data','پاک کردن داده مرورگر','other','response'],
    ['Link','Linked resources relations','روابط منابع پیوندی','other','entity'],
    ['Refresh','Refresh/redirect directive','دستورالعمل تازه‌سازی/هدایت','other','response'],
    ['SourceMap','Source map link','لینک نقشه منبع','other','response'],
    ['X-Robots-Tag','Search engine directives','دستورالعمل‌های موتور جستجو','other','response'],
    ['X-Frame-Options','Frame options for old browsers','گزینه فریم برای مرورگرهای قدیمی','security','response'],
    ['Timing-Allow-Origin','Resource timing for JS','زمان‌بندی منبع برای JS','cors','response'],
    ['X-Permitted-Cross-Domain-Policies','Flash cross-domain policy','خط‌مشی بین دامنه فلش','security','response'],
    ['Report-To','Reporting endpoint group','گروه نقطه پایانی گزارش','other','response'],
    ['NEL','Network Error Logging','ثبت خطای شبکه','other','response'],
    ['Feature-Policy','Feature policy (deprecated)','خط‌مشی ویژگی (منسوخ)','security','response'],
    ['Tk','Tracking status header','هدر وضعیت ردیابی','other','response'],
    ['P3P','Platform for Privacy Preferences','پلتفرم ترجیحات حریم خصوصی','other','response'],
    ['X-UA-Compatible','IE compatibility mode','حالت سازگاری IE','other','response'],
    ['Set-Cookie2','Cookies (obsolete)','کوکی‌ها (منسوخ)','other','response'],
    ['Device-Memory','Client device memory','حافظه دستگاه کلاینت','other','request'],
    ['Viewport-Width','Viewport width (DPX)','عرض نمای دید','other','request'],
    ['Save-Data','Data saving preference','ترجیح ذخیره داده','other','request'],
    ['Downlink','Connection speed (Mbps)','سرعت اتصال (Mbps)','other','request'],
    ['ECT','Effective connection type','نوع اتصال مؤثر','other','request'],
    ['RTT','Round-trip time (ms)','زمان رفت و برگشت','other','request'],
  ];
}

export function init(lang) {
  var search = document.getElementById('http-h-search');
  var cat = document.getElementById('http-h-cat-filter');
  var tbody = document.getElementById('http-h-tbody');
  if (!tbody) return;
  function update() {
    var q = (search ? search.value : '').toLowerCase();
    var c = cat ? cat.value : '';
    tbody.querySelectorAll('tr').forEach(function(row){
      var hname = row.dataset.hname;
      var hdesc = row.dataset.hdesc;
      var hcat = row.dataset.hcat;
      var match = !q || hname.indexOf(q) !== -1 || hdesc.indexOf(q) !== -1;
      var catMatch = !c || hcat === c;
      row.style.display = match && catMatch ? '' : 'none';
    });
  }
  if (search) search.addEventListener('input', update);
  if (cat) cat.addEventListener('change', update);
}
