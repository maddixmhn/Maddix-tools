export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📁</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">MIME Types</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'مرجع انواع MIME بر اساس پسوند فایل','MIME type reference by file extension')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<input id="mime-search" type="text" placeholder="'+(f,'جستجوی پسوند یا MIME...','Search extension or MIME...')+'" style="flex:1;min-width:180px;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<select id="mime-cat" style="padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;cursor:pointer">'+
        '<option value="">'+(f,'همه','All')+'</option>'+
        '<option value="text">Text</option><option value="image">Image</option><option value="audio">Audio</option>'+
        '<option value="video">Video</option><option value="application">Application</option><option value="font">Font</option>'+
      '</select>'+
    '</div>'+
    '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
      '<thead><tr><th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f,'پسوند','Extension')+'</th>'+
      '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">MIME Type</th>'+
      '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f,'دسته','Category')+'</th></tr></thead><tbody id="mime-tbody"></tbody></table></div>'+
    '<div id="mime-count" style="margin-top:12px;padding:8px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground);text-align:center"></div>'+
  '</div>';
}
export function init(lang) {
  var db=[
    ['.html','text/html','text'],['.htm','text/html','text'],['.css','text/css','text'],['.js','text/javascript','text'],['.mjs','text/javascript','text'],['.json','application/json','application'],['.xml','application/xml','application'],['.csv','text/csv','text'],['.txt','text/plain','text'],['.md','text/markdown','text'],['.yaml','text/yaml','text'],['.yml','text/yaml','text'],
    ['.jpg','image/jpeg','image'],['.jpeg','image/jpeg','image'],['.png','image/png','image'],['.gif','image/gif','image'],['.svg','image/svg+xml','image'],['.webp','image/webp','image'],['.ico','image/x-icon','image'],['.bmp','image/bmp','image'],['.avif','image/avif','image'],['.tiff','image/tiff','image'],['.tif','image/tiff','image'],
    ['.mp3','audio/mpeg','audio'],['.wav','audio/wav','audio'],['.ogg','audio/ogg','audio'],['.flac','audio/flac','audio'],['.aac','audio/aac','audio'],['.wma','audio/x-ms-wma','audio'],['.m4a','audio/mp4','audio'],
    ['.mp4','video/mp4','video'],['.webm','video/webm','video'],['.avi','video/x-msvideo','video'],['.mov','video/quicktime','video'],['.mkv','video/x-matroska','video'],['.flv','video/x-flv','video'],['.wmv','video/x-ms-wmv','video'],
    ['.pdf','application/pdf','application'],['.zip','application/zip','application'],['.rar','application/vnd.rar','application'],['.7z','application/x-7z-compressed','application'],['.tar','application/x-tar','application'],['.gz','application/gzip','application'],['.bz2','application/x-bzip2','application'],
    ['.doc','application/msword','application'],['.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application'],['.xls','application/vnd.ms-excel','application'],['.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application'],['.ppt','application/vnd.ms-powerpoint','application'],['.pptx','application/vnd.openxmlformats-officedocument.presentationml.presentation','application'],
    ['.exe','application/x-msdownload','application'],['.dll','application/x-msdownload','application'],['.msi','application/x-msi','application'],['.apk','application/vnd.android.package-archive','application'],['.deb','application/x-debian-package','application'],['.rpm','application/x-rpm','application'],
    ['.ttf','font/ttf','font'],['.otf','font/otf','font'],['.woff','font/woff','font'],['.woff2','font/woff2','font'],['.eot','application/vnd.ms-fontobject','font'],
    ['.wasm','application/wasm','application'],['.bin','application/octet-stream','application'],['.iso','application/x-iso9660-image','application'],['.sql','application/sql','application'],['.sh','application/x-sh','text'],['.py','text/x-python','text'],['.java','text/x-java','text'],['.c','text/x-c','text'],['.cpp','text/x-c++','text'],['.h','text/x-c','text'],['.php','text/x-php','text'],['.rb','text/x-ruby','text'],['.go','text/x-go','text'],['.rs','text/x-rust','text'],['.ts','text/typescript','text'],['.tsx','text/typescript','text'],['.jsx','text/jsx','text'],
    ['.eps','application/postscript','image'],['.psd','image/vnd.adobe.photoshop','image'],['.ai','application/postscript','image'],
    ['.swf','application/x-shockwave-flash','application'],['.manifest','text/cache-manifest','text'],['.map','application/json','application'],
    ['.atom','application/atom+xml','application'],['.rss','application/rss+xml','application'],
    ['.srt','text/srt','text'],['.vtt','text/vtt','text'],
    ['.svgz','image/svg+xml','image'],['.crx','application/x-chrome-extension','application'],
  ];
  var tbody=document.getElementById('mime-tbody');
  var search=document.getElementById('mime-search');
  var cat=document.getElementById('mime-cat');
  var count=document.getElementById('mime-count');
  if(!tbody)return;
  function render(){
    var q=(search.value||'').toLowerCase();
    var c=cat.value;
    var html='';
    var visible=0;
    db.forEach(function(row){
      if(q&&row[0].indexOf(q)===-1&&row[1].indexOf(q)===-1)return;
      if(c&&row[2]!==c)return;
      visible++;
      html+='<tr><td style="padding:5px 10px;border-bottom:1px solid var(--border);font-family:monospace;font-weight:600">'+row[0]+'</td>'+
        '<td style="padding:5px 10px;border-bottom:1px solid var(--border);font-size:.75rem;word-break:break-all">'+row[1]+'</td>'+
        '<td style="padding:5px 10px;border-bottom:1px solid var(--border)"><span style="padding:1px 8px;border-radius:4px;font-size:.6875rem;background:var(--muted);color:var(--muted-foreground)">'+row[2]+'</span></td></tr>';
    });
    tbody.innerHTML=html;
    count.textContent=''+visible+' '+(lang==='fa','نوع MIME','MIME types');
  }
  search.addEventListener('input',render);
  cat.addEventListener('change',render);
  render();
}
