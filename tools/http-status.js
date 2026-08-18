export default function(lang) {
  var f = lang === 'fa';
  var codes = [
    [100,'Continue','info','1xx'], [101,'Switching Protocols','info','1xx'], [102,'Processing','info','1xx'], [103,'Early Hints','info','1xx'],
    [200,'OK','success','2xx'], [201,'Created','success','2xx'], [202,'Accepted','success','2xx'], [203,'Non-Authoritative','success','2xx'], [204,'No Content','success','2xx'], [205,'Reset Content','success','2xx'], [206,'Partial Content','success','2xx'], [207,'Multi-Status','success','2xx'], [208,'Already Reported','success','2xx'], [226,'IM Used','success','2xx'],
    [300,'Multiple Choices','warning','3xx'], [301,'Moved Permanently','warning','3xx'], [302,'Found','warning','3xx'], [303,'See Other','warning','3xx'], [304,'Not Modified','warning','3xx'], [305,'Use Proxy','warning','3xx'], [307,'Temporary Redirect','warning','3xx'], [308,'Permanent Redirect','warning','3xx'],
    [400,'Bad Request','destructive','4xx'], [401,'Unauthorized','destructive','4xx'], [402,'Payment Required','destructive','4xx'], [403,'Forbidden','destructive','4xx'], [404,'Not Found','destructive','4xx'], [405,'Method Not Allowed','destructive','4xx'], [406,'Not Acceptable','destructive','4xx'], [407,'Proxy Auth Required','destructive','4xx'], [408,'Request Timeout','destructive','4xx'], [409,'Conflict','destructive','4xx'], [410,'Gone','destructive','4xx'], [411,'Length Required','destructive','4xx'], [412,'Precondition Failed','destructive','4xx'], [413,'Payload Too Large','destructive','4xx'], [414,'URI Too Long','destructive','4xx'], [415,'Unsupported Media','destructive','4xx'], [416,'Range Not Satisfiable','destructive','4xx'], [417,'Expectation Failed','destructive','4xx'], [418,"I'm a Teapot",'destructive','4xx'], [421,'Misdirected Request','destructive','4xx'], [422,'Unprocessable','destructive','4xx'], [423,'Locked','destructive','4xx'], [424,'Failed Dependency','destructive','4xx'], [425,'Too Early','destructive','4xx'], [426,'Upgrade Required','destructive','4xx'], [428,'Precondition Required','destructive','4xx'], [429,'Too Many Requests','destructive','4xx'], [431,'Header Too Large','destructive','4xx'], [451,'Unavailable Legal','destructive','4xx'],
    [500,'Internal Server Error','destructive','5xx'], [501,'Not Implemented','destructive','5xx'], [502,'Bad Gateway','destructive','5xx'], [503,'Service Unavailable','destructive','5xx'], [504,'Gateway Timeout','destructive','5xx'], [505,'HTTP Version Not Supported','destructive','5xx'], [506,'Variant Also Negotiates','destructive','5xx'], [507,'Insufficient Storage','destructive','5xx'], [508,'Loop Detected','destructive','5xx'], [510,'Not Extended','destructive','5xx'], [511,'Network Auth Required','destructive','5xx'],
  ];
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📡</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">HTTP Status Codes</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'مرجع کامل کدهای وضعیت HTTP':'Complete HTTP status code reference')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<input id="http-search" type="text" placeholder="'+(f?'جستجوی کد یا نام...':'Search code or name...')+'" style="flex:1;min-width:180px;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<select id="http-cat-filter" style="padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;cursor:pointer">'+
        '<option value="">'+(f?'همه کدها':'All codes')+'</option>'+
        '<option value="1xx">1xx '+(f?'اطلاعاتی':'Informational')+'</option>'+
        '<option value="2xx">2xx '+(f?'موفقیت':'Success')+'</option>'+
        '<option value="3xx">3xx '+(f?'هدایت':'Redirection')+'</option>'+
        '<option value="4xx">4xx '+(f?'خطای کلاینت':'Client Error')+'</option>'+
        '<option value="5xx">5xx '+(f?'خطای سرور':'Server Error')+'</option>'+
      '</select>'+
    '</div>'+
    '<div style="overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
        '<thead><tr>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:80px">'+(f?'کد':'Code')+'</th>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'نام':'Name')+'</th>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground);width:60px">'+(f?'دسته':'Class')+'</th>'+
        '</tr></thead><tbody id="http-tbody">'+
        codes.map(function(c){ return '<tr data-code="'+c[0]+'" data-cat="'+c[3]+'" data-name="'+c[1].toLowerCase()+'">'+
          '<td style="padding:6px 10px;border-bottom:1px solid var(--border);font-weight:700;font-family:monospace"><span class="badge badge-'+c[2]+'" style="font-size:.75rem">'+c[0]+'</span></td>'+
          '<td style="padding:6px 10px;border-bottom:1px solid var(--border)">'+c[1]+'</td>'+
          '<td style="padding:6px 10px;border-bottom:1px solid var(--border)"><span style="font-size:.6875rem;color:var(--muted-foreground)">'+c[3]+'</span></td>'+
        '</tr>'; }).join('')+
        '</tbody></table></div>'+
    '<div style="margin-top:12px;padding:8px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground);text-align:center">'+(f?'تعداد: ':'Total: ')+codes.length+' '+(f?'کد':'codes')+'</div>'+
  '</div>';
}
export function init(lang) {
  var search = document.getElementById('http-search');
  var cat = document.getElementById('http-cat-filter');
  var tbody = document.getElementById('http-tbody');
  if (!tbody) return;
  function update() {
    var q = (search.value||'').toLowerCase();
    var c = cat.value;
    tbody.querySelectorAll('tr').forEach(function(row){
      var code = row.dataset.code;
      var name = row.dataset.name;
      var catVal = row.dataset.cat;
      row.style.display = (!q || code.indexOf(q) !== -1 || name.indexOf(q) !== -1) && (!c || catVal === c) ? '' : 'none';
    });
  }
  if (search) search.addEventListener('input', update);
  if (cat) cat.addEventListener('change', update);
}
