export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🌍</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">World Clock</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'زمان شهرهای مختلف جهان','Current time in cities around the world')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<input id="wc-search" type="text" placeholder="'+(f,'جستجوی شهر...','Search city...')+'" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<button id="wc-refresh" style="padding:8px 16px">'+(f,'بروزرسانی','Refresh')+'</button>'+
    '</div>'+
    '<div id="wc-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var cities=[
    {name:'Tehran',tz:'Asia/Tehran',flag:'🇮🇷'},{name:'Dubai',tz:'Asia/Dubai',flag:'🇦🇪'},{name:'Tokyo',tz:'Asia/Tokyo',flag:'🇯🇵'},{name:'Seoul',tz:'Asia/Seoul',flag:'🇰🇷'},{name:'Beijing',tz:'Asia/Shanghai',flag:'🇨🇳'},{name:'Hong Kong',tz:'Asia/Hong_Kong',flag:'🇭🇰'},{name:'Singapore',tz:'Asia/Singapore',flag:'🇸🇬'},{name:'Mumbai',tz:'Asia/Kolkata',flag:'🇮🇳'},{name:'Bangkok',tz:'Asia/Bangkok',flag:'🇹🇭'},{name:'Istanbul',tz:'Europe/Istanbul',flag:'🇹🇷'},{name:'Moscow',tz:'Europe/Moscow',flag:'🇷🇺'},{name:'London',tz:'Europe/London',flag:'🇬🇧'},{name:'Paris',tz:'Europe/Paris',flag:'🇫🇷'},{name:'Berlin',tz:'Europe/Berlin',flag:'🇩🇪'},{name:'Rome',tz:'Europe/Rome',flag:'🇮🇹'},{name:'Madrid',tz:'Europe/Madrid',flag:'🇪🇸'},{name:'Amsterdam',tz:'Europe/Amsterdam',flag:'🇳🇱'},{name:'Stockholm',tz:'Europe/Stockholm',flag:'🇸🇪'},{name:'New York',tz:'America/New_York',flag:'🇺🇸'},{name:'Los Angeles',tz:'America/Los_Angeles',flag:'🇺🇸'},{name:'Chicago',tz:'America/Chicago',flag:'🇺🇸'},{name:'Denver',tz:'America/Denver',flag:'🇺🇸'},{name:'Toronto',tz:'America/Toronto',flag:'🇨🇦'},{name:'Mexico City',tz:'America/Mexico_City',flag:'🇲🇽'},{name:'Sao Paulo',tz:'America/Sao_Paulo',flag:'🇧🇷'},{name:'Buenos Aires',tz:'America/Argentina/Buenos_Aires',flag:'🇦🇷'},{name:'Sydney',tz:'Australia/Sydney',flag:'🇦🇺'},{name:'Melbourne',tz:'Australia/Melbourne',flag:'🇦🇺'},{name:'Auckland',tz:'Pacific/Auckland',flag:'🇳🇿'},{name:'Jerusalem',tz:'Asia/Jerusalem',flag:'🇮🇱'},{name:'Karachi',tz:'Asia/Karachi',flag:'🇵🇰'},{name:'Kabul',tz:'Asia/Kabul',flag:'🇦🇫'},{name:'Baghdad',tz:'Asia/Baghdad',flag:'🇮🇶'},{name:'Riyadh',tz:'Asia/Riyadh',flag:'🇸🇦'},{name:'Cairo',tz:'Africa/Cairo',flag:'🇪🇬'},{name:'Lagos',tz:'Africa/Lagos',flag:'🇳🇬'},{name:'Nairobi',tz:'Africa/Nairobi',flag:'🇰🇪'},{name:'Cape Town',tz:'Africa/Johannesburg',flag:'🇿🇦'},{name:'Casablanca',tz:'Africa/Casablanca',flag:'🇲🇦'},{name:'Lisbon',tz:'Europe/Lisbon',flag:'🇵🇹'},{name:'Vienna',tz:'Europe/Vienna',flag:'🇦🇹'},{name:'Warsaw',tz:'Europe/Warsaw',flag:'🇵🇱'},{name:'Prague',tz:'Europe/Prague',flag:'🇨🇿'},{name:'Budapest',tz:'Europe/Budapest',flag:'🇭🇺'},{name:'Athens',tz:'Europe/Athens',flag:'🇬🇷'},{name:'Helsinki',tz:'Europe/Helsinki',flag:'🇫🇮'},{name:'Oslo',tz:'Europe/Oslo',flag:'🇳🇴'},{name:'Zurich',tz:'Europe/Zurich',flag:'🇨🇭'},{name:'Dublin',tz:'Europe/Dublin',flag:'🇮🇪'},{name:'Reykjavik',tz:'Atlantic/Reykjavik',flag:'🇮🇸'},{name:'Anchorage',tz:'America/Anchorage',flag:'🇺🇸'},{name:'Honolulu',tz:'Pacific/Honolulu',flag:'🇺🇸'},{name:'Kolkata',tz:'Asia/Kolkata',flag:'🇮🇳'},{name:'Jakarta',tz:'Asia/Jakarta',flag:'🇮🇩'},{name:'Manila',tz:'Asia/Manila',flag:'🇵🇭'},{name:'Hanoi',tz:'Asia/Ho_Chi_Minh',flag:'🇻🇳'},{name:'Taipei',tz:'Asia/Taipei',flag:'🇹🇼'},{name:'Kuala Lumpur',tz:'Asia/Kuala_Lumpur',flag:'🇲🇾'},{name:'Dhaka',tz:'Asia/Dhaka',flag:'🇧🇩'},{name:'Colombo',tz:'Asia/Colombo',flag:'🇱🇰'},{name:'Kathmandu',tz:'Asia/Kathmandu',flag:'🇳🇵'},{name:'Tashkent',tz:'Asia/Tashkent',flag:'🇺🇿'},{name:'Baku',tz:'Asia/Baku',flag:'🇦🇿'},{name:'Tbilisi',tz:'Asia/Tbilisi',flag:'🇬🇪'},{name:'Yerevan',tz:'Asia/Yerevan',flag:'🇦🇲'},{name:'Vancouver',tz:'America/Vancouver',flag:'🇨🇦'},{name:'Montreal',tz:'America/Montreal',flag:'🇨🇦'},{name:'Lima',tz:'America/Lima',flag:'🇵🇪'},{name:'Bogota',tz:'America/Bogota',flag:'🇨🇴'},{name:'Santiago',tz:'America/Santiago',flag:'🇨🇱'},{name:'Caracas',tz:'America/Caracas',flag:'🇻🇪'},
  ];
  var grid=document.getElementById('wc-grid');
  var search=document.getElementById('wc-search');
  if(!grid)return;
  function render(){
    var q=(search.value||'').toLowerCase();
    var now=new Date();
    var html='';
    var count=0;
    cities.forEach(function(c){
      if(q&&!c.name.toLowerCase().includes(q))return;
      count++;
      var time;
      try{
        time=new Intl.DateTimeFormat('en-US',{timeZone:c.tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now);
        var date=new Intl.DateTimeFormat('en-US',{timeZone:c.tz,weekday:'short',month:'short',day:'numeric'}).format(now);
      }catch(e){time='--:--:--';date='';}
      var offset;
      try{
        var tzDate=new Date();
        var tzOffset=-Intl.DateTimeFormat('en-US',{timeZone:c.tz,timeZoneName:'short'}).formatToParts(tzDate).find(function(p){return p.type==='timeZoneName';})?.value||'';
        offset=tzOffset;
      }catch(e){offset='';}
      html+='<div style="padding:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius)">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">'+
          '<div><span style="font-size:1.1rem">'+c.flag+'</span> <strong style="font-size:.9rem">'+c.name+'</strong></div>'+
          '<span style="font-size:.6875rem;padding:2px 8px;background:var(--muted);border-radius:4px;color:var(--muted-foreground)">'+offset+'</span>'+
        '</div>'+
        '<div style="font-size:1.6rem;font-weight:700;font-family:monospace;letter-spacing:1px">'+time+'</div>'+
        '<div style="font-size:.6875rem;color:var(--muted-foreground)">'+date+'</div>'+
      '</div>';
    });
    grid.innerHTML=html||'<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--muted-foreground)">'+(f,'شهری یافت نشد','No cities found')+'</div>';
  }
  search.addEventListener('input',render);
  document.getElementById('wc-refresh').addEventListener('click',render);
  setInterval(render,10000);
  render();
}
