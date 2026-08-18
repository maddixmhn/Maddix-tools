export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">💻</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">System Info</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'مشاهده اطلاعات مرورگر، صفحه و سیستم','View browser, screen, and system information')+'</p></div>'+
    '</div>'+
    '<div id="si-results" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;line-height:1.8"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var r=document.getElementById('si-results');
  if(!r)return;
  var nav=navigator;
  var scr=screen;
  var loc=location;
  var d=document;
  var info={
    'User Agent':nav.userAgent,
    'Platform':nav.platform,
    'Language':nav.language,
    'Languages':(nav.languages||[]).join(', '),
    'Cookie Enabled':nav.cookieEnabled?'Yes':'No',
    'Do Not Track':nav.doNotTrack||'Unspecified',
    'Hardware Concurrency':nav.hardwareConcurrency+' cores',
    'Device Memory':nav.deviceMemory?nav.deviceMemory+'GB':'Unknown',
    'Max Touch Points':nav.maxTouchPoints,
    'Online':nav.onLine?'Yes':'No',
    'Screen Size':scr.width+'x'+scr.height,
    'Available Size':scr.availWidth+'x'+scr.availHeight,
    'Color Depth':scr.colorDepth+'bit',
    'Pixel Ratio':window.devicePixelRatio,
    'Window Size':window.innerWidth+'x'+window.innerHeight,
    'Document Size':Math.max(d.body.scrollWidth,d.documentElement.scrollWidth)+'x'+Math.max(d.body.scrollHeight,d.documentElement.scrollHeight),
    'Scroll Position':window.scrollX+', '+window.scrollY,
    'URL':loc.href,
    'Protocol':loc.protocol,
    'Hostname':loc.hostname,
    'Port':loc.port||'(default)',
    'Pathname':loc.pathname,
    'Timezone':Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Timezone Offset':-new Date().getTimezoneOffset()/60+'h',
    'Locale':Intl.DateTimeFormat().resolvedOptions().locale,
    'Local Storage':typeof(Storage)!=='undefined'?'Available':'N/A',
    'Session Storage':typeof(Storage)!=='undefined'?'Available':'N/A',
    'Web Worker':typeof(Worker)!=='undefined'?'Supported':'N/A',
    'Service Worker':'serviceWorker' in nav?'Supported':'N/A',
    'WebSocket':typeof(WebSocket)!=='undefined'?'Supported':'N/A',
    'WebRTC':typeof(RTCPeerConnection)!=='undefined'?'Supported':'N/A',
    'WebGL':detectWebGL(),
    'Canvas':detectCanvas(),
    'CSS Grid':CSS&&CSS.supports&&CSS.supports('display','grid')?'Supported':'N/A',
    'CSS Variables':CSS&&CSS.supports&&CSS.supports('--a','0')?'Supported':'N/A',
    'Vendor':nav.vendor,
    'CPU Architecture':getCPU(),
  };
  function detectWebGL(){
    try{
      var c=d.createElement('canvas');
      var gl=c.getContext('webgl')||c.getContext('experimental-webgl');
      return gl?'Supported ('+gl.getParameter(gl.RENDERER)+')':'N/A';
    }catch(e){return 'N/A';}
  }
  function detectCanvas(){
    try{
      var c=d.createElement('canvas');
      return c.getContext('2d')?'Supported':'N/A';
    }catch(e){return 'N/A';}
  }
  function getCPU(){
    if(nav.deviceMemory)return nav.hardwareConcurrency+' cores, '+nav.deviceMemory+'GB RAM';
    return nav.hardwareConcurrency+' cores';
  }
  var html='<table style="width:100%;border-collapse:collapse;font-size:.75rem">';
  var keys=Object.keys(info);
  keys.forEach(function(key,i){
    html+='<tr'+(i%2===0?' style="background:rgba(128,128,128,.05)"':'')+'>'+
      '<td style="padding:5px 8px;border-bottom:1px solid var(--border);white-space:nowrap;font-weight:500;width:180px">'+key+'</td>'+
      '<td style="padding:5px 8px;border-bottom:1px solid var(--border);word-break:break-all">'+(info[key]||'<span style="color:var(--muted-foreground)">N/A</span>')+'</td></tr>';
  });
  html+='</table>';
  r.innerHTML=html;
}
