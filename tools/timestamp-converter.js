export default function(lang) {
  var f = lang === 'fa';
  var now = Math.floor(Date.now()/1000);
  var nowISO = new Date().toISOString().slice(0,19).replace('T',' ');
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">⏰</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'مبدل timestamp':'Timestamp Converter')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'تبدیل Unix timestamp به تاریخ و بالعکس':'Convert Unix timestamps to/from human-readable dates')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="ts-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-tstab="unix">Unix → '+(f?'تاریخ':'Date')+'</button>'+
      '<button data-tstab="date">'+(f?'تاریخ':'Date')+' → Unix</button>'+
      '<button data-tstab="now">'+(f?'هم اکنون':'Now')+'</button>'+
    '</div>'+
    '<div class="tstab-content" data-tstab="unix">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">Unix '+(f?'Timestamp':'Timestamp')+'</label>'+
      '<div style="display:flex;gap:8px">'+
        '<input id="ts-unix-input" type="number" value="'+now+'" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace">'+
        '<button id="ts-now-btn" style="white-space:nowrap">'+(f?'هم اکنون':'Now')+'</button>'+
      '</div>'+
      '<div id="ts-unix-results" style="margin-top:12px;padding:14px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:1.8"></div>'+
    '</div>'+
    '<div class="tstab-content" data-tstab="date" style="display:none">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'تاریخ و زمان':'Date & Time')+'</label>'+
      '<div style="display:flex;gap:8px">'+
        '<input id="ts-date-input" type="text" value="'+nowISO+'" style="flex:1;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace">'+
        '<button id="ts-to-unix-btn">'+(f?'تبدیل':'Convert')+'</button>'+
      '</div>'+
      '<div id="ts-date-results" style="margin-top:12px;padding:14px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:1.8"></div>'+
    '</div>'+
    '<div class="tstab-content" data-tstab="now" style="display:none">'+
      '<div style="padding:14px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:2" id="ts-now-results"></div>'+
      '<button id="ts-refresh-btn" class="primary" style="margin-top:8px">'+(f?'بروزرسانی':'Refresh')+'</button>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f = lang === 'fa';
  document.querySelectorAll('#ts-tabs button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#ts-tabs button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.tstab-content').forEach(function(el){ el.style.display='none'; });
      var tab = document.querySelector('.tstab-content[data-tstab="'+btn.dataset.tstab+'"]');
      if (tab) tab.style.display='block';
      if (btn.dataset.tstab==='now') renderNow();
    });
  });
  function fmtDate(d) {
    var opts = { weekday:'short', year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit', timeZoneName:'short' };
    return d.toLocaleDateString('en-US', opts);
  }
  function renderNow() {
    var n = document.getElementById('ts-now-results');
    if (!n) return;
    var d = new Date();
    n.innerHTML = ''+
      '<div><span style="color:var(--muted-foreground)">Unix (s):</span> <strong>'+Math.floor(d.getTime()/1000)+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Unix (ms):</span> <strong>'+d.getTime()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">ISO 8601:</span> <strong>'+d.toISOString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">UTC:</span> <strong>'+d.toUTCString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Local:</span> <strong>'+fmtDate(d)+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Date:</span> <strong>'+d.toLocaleDateString('en-CA')+'</strong></div>';
  }
  function convertUnix() {
    var val = parseInt(document.getElementById('ts-unix-input').value);
    var r = document.getElementById('ts-unix-results');
    if (isNaN(val)) { r.textContent = f?'مقدار نامعتبر':'Invalid value'; return; }
    var d = new Date(val * 1000);
    if (val > 1e12) d = new Date(val);
    r.innerHTML = ''+
      '<div><span style="color:var(--muted-foreground)">ISO 8601:</span> <strong>'+d.toISOString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">UTC:</span> <strong>'+d.toUTCString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Local:</span> <strong>'+fmtDate(d)+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Date (Y-m-d):</span> <strong>'+d.toLocaleDateString('en-CA')+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Time:</span> <strong>'+d.toLocaleTimeString('en-US')+'</strong></div>';
  }
  function convertDate() {
    var val = document.getElementById('ts-date-input').value.trim();
    var r = document.getElementById('ts-date-results');
    var d = new Date(val);
    if (isNaN(d.getTime())) { r.textContent = f?'فرمت تاریخ نامعتبر است. از YYYY-MM-DD HH:mm:ss استفاده کنید':'Invalid date format. Use YYYY-MM-DD HH:mm:ss'; return; }
    r.innerHTML = ''+
      '<div><span style="color:var(--muted-foreground)">Unix (seconds):</span> <strong>'+Math.floor(d.getTime()/1000)+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Unix (ms):</span> <strong>'+d.getTime()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">ISO 8601:</span> <strong>'+d.toISOString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">UTC:</span> <strong>'+d.toUTCString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">Local:</span> <strong>'+fmtDate(d)+'</strong></div>';
  }
  document.getElementById('ts-unix-input').addEventListener('input', convertUnix);
  document.getElementById('ts-now-btn').addEventListener('click', function(){
    document.getElementById('ts-unix-input').value = Math.floor(Date.now()/1000);
    convertUnix();
  });
  document.getElementById('ts-to-unix-btn').addEventListener('click', convertDate);
  document.getElementById('ts-refresh-btn').addEventListener('click', renderNow);
  renderNow();
  convertUnix();
}
