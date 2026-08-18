export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const commonPorts = [80,443,8080,8443,2053,2083,2087,2096,853,2052,2082,2086,2095];
  const portServices = { 80:'HTTP',443:'HTTPS',8080:'HTTP-Alt',8443:'HTTPS-Alt',22:'SSH',21:'FTP',3306:'MySQL',5432:'PostgreSQL',6379:'Redis',27017:'MongoDB' };
  
  return `<div dir="${dir}">
  <div class="panel">
    <div class="section-title">${t('اسکنر یکپارچه', 'Mega Scanner')}</div>
    <p class="subtle">${t('ترکیب ۷ ابزار اسکن در یک ابزار جامع - IP، پورت، CDN، DNS، شبکه، سرعت، جغرافیا', '7-in-1 unified scanner - IP, Port, CDN, DNS, Network, Speed, Geo')}</p>
  </div>

  <div class="flex" style="gap:4px;margin-bottom:12px;flex-wrap:wrap">
    <button class="chip active" data-mstab="ms-ip">${t('آی‌پی', 'IP')}</button>
    <button class="chip" data-mstab="ms-port">${t('پورت', 'Port')}</button>
    <button class="chip" data-mstab="ms-cdn">${t('CDN', 'CDN')}</button>
    <button class="chip" data-mstab="ms-dns">${t('DNS', 'DNS')}</button>
    <button class="chip" data-mstab="ms-net">${t('شبکه', 'Network')}</button>
    <button class="chip" data-mstab="ms-speed">${t('سرعت', 'Speed')}</button>
    <button class="chip" data-mstab="ms-geo">${t('جغرافیا', 'Geo')}</button>
  </div>

  <div id="ms-ip" class="mstab-content">
    <div class="panel">
      <h3 class="section-title">${t('اسکنر IP', 'IP Scanner')}</h3>
      <div class="grid two">
        <div>
          <label class="label">${t('منابع', 'Sources')}</label>
          <div class="stack">
            <label style="font-size:.85rem"><input type="checkbox" id="ms-src-cf" checked> Cloudflare</label>
            <label style="font-size:.85rem"><input type="checkbox" id="ms-src-gcore"> Gcore</label>
            <label style="font-size:.85rem"><input type="checkbox" id="ms-src-fastly"> Fastly</label>
          </div>
          <label class="label" style="margin-top:8px">${t('CIDR سفارشی', 'Custom CIDR')}</label>
          <textarea id="ms-custom-cidr" class="field" rows="2" placeholder="1.1.1.0/24"></textarea>
          <label class="label" style="margin-top:8px">${t('IP دستی', 'Manual IPs')}</label>
          <textarea id="ms-manual-ips" class="field" rows="2" placeholder="1.1.1.1"></textarea>
        </div>
        <div>
          <label class="label">${t('پورت‌ها', 'Ports')}</label>
          <div style="display:flex;flex-wrap:wrap;gap:4px">${commonPorts.map(p => `<label style="display:inline-flex;align-items:center;gap:4px;padding:2px 6px;background:var(--bg-3);border-radius:6px;font-size:.8rem"><input type="checkbox" class="ms-port" value="${p}" ${[443,80].includes(p)?'checked':''}> ${p}</label>`).join('')}</div>
          <div class="grid two" style="margin-top:8px">
            <div><label class="label">${t('همزمانی', 'Concurrency')}</label><input id="ms-conc" class="field" type="number" value="20" min="1" max="100"></div>
            <div><label class="label">${t('تعداد', 'Count')}</label><input id="ms-count" class="field" type="number" value="30" min="1" max="500"></div>
          </div>
        </div>
      </div>
      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="primary-btn" id="ms-ip-start">${t('شروع اسکن IP', 'Start IP Scan')}</button>
        <button class="danger-btn" id="ms-ip-stop" style="display:none">${t('توقف', 'Stop')}</button>
      </div>
      <div id="ms-ip-progress" class="panel" style="display:none;margin-top:8px">
        <div class="flex" style="justify-content:space-between;font-size:.85rem">
          <span>${t('پیشرفت', 'Progress')}: <span id="ms-ip-prog-count">0/0</span></span>
          <span><span id="ms-ip-alive">0</span> ${t('فعال', 'Alive')} · <span id="ms-ip-dead">0</span> ${t('غیرفعال', 'Dead')} · <span id="ms-ip-elapsed">0s</span></span>
        </div>
        <div class="progress" style="margin-top:4px"><span id="ms-ip-bar" style="width:0%"></span></div>
      </div>
      <div id="ms-ip-results" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>#</th><th>IP</th><th>${t('پورت', 'Port')}</th><th>${t('پینگ', 'Ping')}</th><th>${t('وضعیت', 'Status')}</th></tr></thead><tbody id="ms-ip-body"></tbody></table></div>
        <div style="padding:8px;display:flex;gap:8px">
          <button class="secondary-btn" id="ms-ip-copy">${t('کپی همه', 'Copy All')}</button>
          <button class="secondary-btn" id="ms-ip-clear">${t('پاک کردن', 'Clear')}</button>
        </div>
      </div>
    </div>
  </div>

  <div id="ms-port" class="mstab-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('اسکنر پورت', 'Port Scanner')}</h3>
      <div class="grid two">
        <div>
          <label class="label">${t('میزبان', 'Host')}</label>
          <input id="ms-phost" class="field" placeholder="example.com">
        </div>
        <div>
          <label class="label">${t('پورت‌ها', 'Ports')}</label>
          <input id="ms-pports" class="field" placeholder="80,443,8080">
        </div>
      </div>
      <div class="flex" style="gap:4px;flex-wrap:wrap;margin-top:8px">
        ${Object.entries(portServices).slice(0,8).map(([p,s]) => `<button class="chip" data-mspp="${p}">${p} (${s})</button>`).join('')}
      </div>
      <button class="primary-btn" id="ms-port-start" style="margin-top:8px">${t('اسکن پورت', 'Scan Ports')}</button>
      <div id="ms-port-result" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>${t('پورت', 'Port')}</th><th>${t('سرویس', 'Service')}</th><th>${t('وضعیت', 'Status')}</th><th>${t('زمان', 'Time')}</th></tr></thead><tbody id="ms-port-body"></tbody></table></div>
      </div>
    </div>
  </div>

  <div id="ms-cdn" class="mstab-content" style="display:none">
    <div class="panel">
      <div class="flex" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        <div style="background:rgba(0,255,179,.07);border:1px solid rgba(0,255,179,.18);color:var(--accent);padding:4px 14px;border-radius:20px;font-size:.72rem;font-family:monospace;letter-spacing:1px"><span id="ms-cdn-isp">${t('شناسایی ISP...', 'Detecting ISP...')}</span></div>
        <span style="font-size:.78rem;color:var(--text-2)" id="ms-cdn-ip">...</span>
      </div>
      <h3 class="section-title">${t('اسکنر پیشرفته CDN', 'Advanced CDN Scanner')}</h3>
      <h4 class="subtle" style="font-size:.82rem;margin:4px 0 8px">${t('انتخاب CDN', 'Select CDN')}</h4>
      <div class="flex" style="gap:8px;flex-wrap:wrap;margin-bottom:8px" id="ms-cdn-cards">
        <div class="cdn-card-ms on" data-cdnc="akamai" style="padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer;min-width:130px;flex:1;text-align:center;transition:all .2s;background:var(--bg-3)">
          <div style="font-size:.72rem;color:var(--text-2)">⚡ Akamai</div>
          <div class="subtle" style="font-size:.7rem">30% ${t('اینترنت', 'of internet')}</div>
        </div>
        <div class="cdn-card-ms" data-cdnc="google" style="padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer;min-width:130px;flex:1;text-align:center;transition:all .2s;background:var(--bg-3)">
          <div style="font-size:.72rem;color:var(--text-2)">🔵 Google CDN</div>
          <div class="subtle" style="font-size:.7rem">googleapis</div>
        </div>
        <div class="cdn-card-ms" data-cdnc="cloudfront" style="padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer;min-width:130px;flex:1;text-align:center;transition:all .2s;background:var(--bg-3)">
          <div style="font-size:.72rem;color:var(--text-2)">🟠 CloudFront</div>
          <div class="subtle" style="font-size:.7rem">AWS</div>
        </div>
        <div class="cdn-card-ms" data-cdnc="azure" style="padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer;min-width:130px;flex:1;text-align:center;transition:all .2s;background:var(--bg-3)">
          <div style="font-size:.72rem;color:var(--text-2)">🔷 Azure</div>
          <div class="subtle" style="font-size:.7rem">Microsoft</div>
        </div>
      </div>
      <div style="margin-bottom:8px">
        <label class="label" style="font-size:.78rem">🔒 ${t('SNI Hostname', 'SNI Hostname')}</label>
        <div id="ms-cdn-sni-list" class="flex" style="gap:4px;flex-wrap:wrap;margin-top:4px"></div>
        <div class="sni-output" id="ms-cdn-sni-sel" style="background:var(--bg-3);border:1px solid var(--border);border-radius:6px;padding:6px 10px;font-size:.78rem;font-family:monospace;margin-top:4px;color:var(--accent);user-select:all;cursor:text"></div>
      </div>
      <div class="flex" style="gap:6px;flex-wrap:wrap;margin-bottom:8px">
        <button class="chip" onclick="document.getElementById('ms-cdn-preset').value='quick';msCdnScan()">⚡ ${t('سریع', 'Quick')}</button>
        <button class="chip" onclick="document.getElementById('ms-cdn-preset').value='standard';msCdnScan()">🔍 ${t('استاندارد', 'Standard')}</button>
        <button class="chip" onclick="document.getElementById('ms-cdn-preset').value='deep';msCdnScan()">🔬 ${t('عمیق', 'Deep')}</button>
        <select id="ms-cdn-preset" style="display:none"><option value="quick">Quick</option><option value="standard">Standard</option><option value="deep">Deep</option></select>
      </div>
      <label class="label">${t('رنج‌های IP - کلیک کنید تا اضافه شود', 'IP Ranges - click to add')}</label>
      <div id="ms-cdn-ranges-wrap" class="flex" style="gap:4px;flex-wrap:wrap;margin-bottom:8px;max-height:120px;overflow-y:auto"></div>
      <div class="grid two">
        <div>
          <label class="label">${t('همزمانی', 'Concurrency')}</label>
          <input id="ms-cdn-conc" class="field" type="number" value="20" min="1" max="80">
        </div>
        <div>
          <label class="label">${t('حداکثر IP', 'Max IPs')}</label>
          <input id="ms-cdn-max" class="field" type="number" value="100" min="10" max="2000">
        </div>
      </div>
      <textarea id="ms-cdn-ipta" class="field" rows="2" placeholder="23.72.0.0/24"></textarea>
      <div class="flex" style="gap:8px;margin-top:8px;flex-wrap:wrap">
        <button class="primary-btn" id="ms-cdn-start">${t('شروع اسکن', 'Start CDN Scan')}</button>
        <button class="danger-btn" id="ms-cdn-stop" style="display:none">${t('توقف', 'Stop')}</button>
        <button class="chip" id="ms-cdn-add-all">${t('همه رنج‌ها', 'All Ranges')}</button>
        <button class="chip" id="ms-cdn-clear">🗑</button>
      </div>
      <div id="ms-cdn-progress" class="panel" style="display:none;margin-top:8px">
        <div class="flex" style="justify-content:space-between;font-size:.85rem">
          <span>${t('پیشرفت', 'Progress')}: <span id="ms-cdn-prog">0/0</span></span>
          <span><span class="status good" id="ms-cdn-alive">0</span> · <span class="status bad" id="ms-cdn-dead">0</span> · <span id="ms-cdn-best">-ms</span></span>
        </div>
        <div class="progress"><span id="ms-cdn-bar" style="width:0%"></span></div>
      </div>
      <div id="ms-cdn-results" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>#</th><th>IP</th><th>${t('CDN', 'CDN')}</th><th>${t('پینگ', 'Ping')}</th><th>${t('وضعیت', 'Status')}</th><th>${t('کیفیت', 'Quality')}</th></tr></thead><tbody id="ms-cdn-tbody"></tbody></table></div>
      </div>
      <div class="copy-section" id="ms-cdn-copy-section" style="margin-top:10px;display:none">
        <label class="label" style="font-size:.78rem">📋 ${t('IPهای زنده', 'Live IPs')}</label>
        <div id="ms-cdn-copy-box" style="background:var(--bg-3);border:1px solid var(--accent);border-radius:8px;padding:10px;font-family:monospace;font-size:.78rem;color:var(--accent);user-select:all;cursor:text;line-height:1.6"></div>
        <div class="flex" style="gap:8px;margin-top:6px">
          <button class="secondary-btn" id="ms-cdn-copy-btn">📋 ${t('کپی', 'Copy')}</button>
          <button class="secondary-btn" id="ms-cdn-dl-btn">💾 TXT</button>
        </div>
      </div>
    </div>
  </div>

  <div id="ms-dns" class="mstab-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('جستجوی DNS', 'DNS Lookup')}</h3>
      <div class="grid two">
        <div><label class="label">${t('دامنه', 'Domain')}</label><input id="ms-dns-domain" class="field" placeholder="example.com"></div>
        <div><label class="label">${t('نوع', 'Type')}</label><select id="ms-dns-type" class="field"><option value="ALL">ALL</option><option value="A">A</option><option value="AAAA">AAAA</option><option value="MX">MX</option><option value="CNAME">CNAME</option><option value="TXT">TXT</option><option value="NS">NS</option></select></div>
      </div>
      <button class="primary-btn" id="ms-dns-lookup" style="margin-top:8px">${t('جستجو', 'Lookup')}</button>
      <div id="ms-dns-result" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>${t('نوع', 'Type')}</th><th>${t('نام', 'Name')}</th><th>${t('مقدار', 'Value')}</th><th>TTL</th></tr></thead><tbody id="ms-dns-body"></tbody></table></div>
      </div>
    </div>
  </div>

  <div id="ms-net" class="mstab-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('بررسی شبکه', 'Network Checker')}</h3>
      <div class="flex" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">
        <label style="display:inline-flex;align-items:center;gap:4px;font-size:.85rem"><input type="checkbox" class="ms-net-target" value="1.1.1.1" checked> Cloudflare</label>
        <label style="display:inline-flex;align-items:center;gap:4px;font-size:.85rem"><input type="checkbox" class="ms-net-target" value="8.8.8.8" checked> Google DNS</label>
        <label style="display:inline-flex;align-items:center;gap:4px;font-size:.85rem"><input type="checkbox" class="ms-net-target" value="9.9.9.9"> Quad9</label>
        <label style="display:inline-flex;align-items:center;gap:4px;font-size:.85rem"><input type="checkbox" class="ms-net-target" value="github.com"> GitHub</label>
        <label style="display:inline-flex;align-items:center;gap:4px;font-size:.85rem"><input type="checkbox" class="ms-net-target" value="google.com"> Google</label>
      </div>
      <button class="primary-btn" id="ms-net-check">${t('بررسی', 'Check')}</button>
      <div id="ms-net-result" class="table-card" style="margin-top:12px;display:none">
        <div class="table-scroll"><table><thead><tr><th>${t('هدف', 'Target')}</th><th>${t('وضعیت', 'Status')}</th><th>${t('پینگ', 'Ping')}</th></tr></thead><tbody id="ms-net-body"></tbody></table></div>
      </div>
    </div>
  </div>

  <div id="ms-speed" class="mstab-content" style="display:none">
    <div class="panel" style="text-align:center">
      <h3 class="section-title">${t('تست سرعت', 'Speed Test')}</h3>
      <p class="subtle">${t('اندازه‌گیری پهنای باند با دانلود فایل آزمایشی', 'Measure bandwidth by downloading a test file')}</p>
      <div style="margin:24px 0">
        <div style="font-size:3rem;font-weight:700;color:var(--accent)" id="ms-speed-result">-</div>
        <div class="subtle">Mbps</div>
      </div>
      <div id="ms-speed-details" class="flex" style="justify-content:center;gap:24px;margin-bottom:16px">
        <div><span class="subtle">${t('پینگ', 'Ping')}:</span> <span id="ms-speed-ping">-</span></div>
        <div><span class="subtle">${t('jit', 'Jitter')}:</span> <span id="ms-speed-jitter">-</span></div>
      </div>
      <button class="primary-btn" id="ms-speed-start">${t('شروع تست', 'Start Test')}</button>
      <div id="ms-speed-progress" class="progress" style="margin-top:12px;display:none"><span id="ms-speed-bar" style="width:0%"></span></div>
    </div>
  </div>

  <div id="ms-geo" class="mstab-content" style="display:none">
    <div class="panel">
      <h3 class="section-title">${t('جستجوی IP (جغرافیا)', 'IP Geolocation')}</h3>
      <div class="flex" style="gap:8px">
        <input id="ms-geo-ip" class="field" placeholder="8.8.8.8" style="flex:1">
        <button class="primary-btn" id="ms-geo-lookup">${t('جستجو', 'Lookup')}</button>
      </div>
      <div id="ms-geo-result" class="grid two" style="margin-top:12px;display:none">
        <div class="panel"><strong>IP</strong><br><span id="ms-geo-ipv4"></span></div>
        <div class="panel"><strong>${t('کشور', 'Country')}</strong><br><span id="ms-geo-country"></span></div>
        <div class="panel"><strong>${t('شهر', 'City')}</strong><br><span id="ms-geo-city"></span></div>
        <div class="panel"><strong>ISP</strong><br><span id="ms-geo-isp"></span></div>
        <div class="panel"><strong>ASN</strong><br><span id="ms-geo-asn"></span></div>
        <div class="panel"><strong>${t('مختصات', 'Coords')}</strong><br><span id="ms-geo-coords"></span></div>
      </div>
    </div>
  </div>
</div>`;
}

function ipToNum(ip) { return ip.split('.').reduce((a,b)=>(a<<8)+parseInt(b),0)>>>0; }
function numToIP(n) { return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.'); }
function cidrToRange(cidr) {
  const [ip,bits]=cidr.split('/');
  const mask=~0<<(32-parseInt(bits));
  const start=ipToNum(ip)&mask;
  return{start,end:start|(~mask>>>0)};
}
function randIPFromRange(start,end) { return numToIP(start+Math.floor(Math.random()*(end-start+1))); }
function shuffle(a) { for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a; }
const s=(fa,en,lang)=>lang==='fa'?fa:en;

export function init(lang) {
  const t=(fa,en)=>lang==='fa'?fa:en;

  // Tab switching
  document.querySelectorAll('[data-mstab]').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('[data-mstab]').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      document.querySelectorAll('.mstab-content').forEach(x=>x.style.display='none');
      const el=document.getElementById(b.getAttribute('data-mstab'));
      if(el)el.style.display='';
    });
  });

  // ===== Tab 1: IP Scanner =====
  const commonPorts=[80,443,8080,8443,2053,2083,2087,2096,853,2052,2082,2086,2095];
  let msIpRunning=false,msIpStop=false,msIpResults=[];

  async function fetchCDNRanges(name) {
    try {
      if(name==='cloudflare'){const r=await fetch('https://www.cloudflare.com/ips-v4/');const t=await r.text();return t.split('\n').map(l=>l.trim()).filter(l=>l&&!l.startsWith('#'));}
      const r=await fetch(`https://raw.githubusercontent.com/seramo/cdn-ip-ranges/main/${name}.json`);
      const d=await r.json();return(d.ipv4||[]).slice(0,20);
    }catch{return [];}
  }

  async function msIpScan() {
    msIpRunning=true;msIpStop=false;msIpResults=[];
    const startBtn=document.getElementById('ms-ip-start'),stopBtn=document.getElementById('ms-ip-stop');
    const prog=document.getElementById('ms-ip-progress'),bar=document.getElementById('ms-ip-bar');
    const pcount=document.getElementById('ms-ip-prog-count'),aliveEl=document.getElementById('ms-ip-alive');
    const deadEl=document.getElementById('ms-ip-dead'),elapsedEl=document.getElementById('ms-ip-elapsed');
    const tbody=document.getElementById('ms-ip-body'),resDiv=document.getElementById('ms-ip-results');
    startBtn.style.display='none';stopBtn.style.display='';prog.style.display='';resDiv.style.display='';tbody.innerHTML='';

    const conc=parseInt(document.getElementById('ms-conc').value)||20;
    const count=parseInt(document.getElementById('ms-count').value)||30;
    const selectedPorts=[...document.querySelectorAll('.ms-port:checked')].map(c=>parseInt(c.value));
    
    let allIPs=new Set();
    if(document.getElementById('ms-src-cf').checked){(await fetchCDNRanges('cloudflare')).forEach(c=>{try{const r=cidrToRange(c);for(let i=0;i<Math.ceil(count*0.4);i++)allIPs.add(randIPFromRange(r.start,r.end));}catch{}});}
    if(document.getElementById('ms-src-gcore').checked){(await fetchCDNRanges('gcore')).forEach(c=>{try{const r=cidrToRange(c);for(let i=0;i<Math.ceil(count*0.2);i++)allIPs.add(randIPFromRange(r.start,r.end));}catch{}});}
    if(document.getElementById('ms-src-fastly').checked){(await fetchCDNRanges('fastly')).forEach(c=>{try{const r=cidrToRange(c);for(let i=0;i<Math.ceil(count*0.2);i++)allIPs.add(randIPFromRange(r.start,r.end));}catch{}});}
    const custom=document.getElementById('ms-custom-cidr').value.trim().split('\n').filter(l=>l.trim());
    custom.forEach(c=>{try{const r=cidrToRange(c.trim());for(let i=0;i<Math.ceil(count*0.3);i++)allIPs.add(randIPFromRange(r.start,r.end));}catch{}});
    const manual=document.getElementById('ms-manual-ips').value.trim().split('\n').map(l=>l.trim()).filter(l=>/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(l));
    manual.forEach(ip=>allIPs.add(ip));

    const ipList=shuffle([...allIPs]).slice(0,count);
    if(!ipList.length){tbody.innerHTML=`<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-3)">${t('آی‌پی‌ای یافت نشد','No IPs found')}</td></tr>`;msIpRunning=false;startBtn.style.display='';stopBtn.style.display='none';return;}

    const total=ipList.length*selectedPorts.length;
    let done=0,alive=0,dead=0,startTime=Date.now();

    async function check(ip,port){
      if(msIpStop)return null;
      const s=performance.now();
      try{
        const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),3000);
        await fetch(`http://${ip}`,{mode:'no-cors',signal:ctrl.signal});
        clearTimeout(tmo);
        return performance.now()-s;
      }catch{return null;}
    }

    const queue=[];
    for(const ip of ipList)for(const port of selectedPorts)queue.push([ip,port]);

    async function worker(){
      while(queue.length&&!msIpStop){
        const[ip,port]=queue.shift();
        if(msIpStop)return;
        const ping=await check(ip,port);
        if(msIpStop)return;
        const ok=ping!==null;
        if(ok)alive++;else dead++;
        done++;
        const row=document.createElement('tr');
        row.innerHTML=`<td>${done}</td><td><code>${ip}</code></td><td>${port}</td><td>${ping?Math.round(ping)+'ms':'-'}</td><td><span class="status ${ok?'good':'bad'}">${ok?t('فعال','Alive'):t('غیرفعال','Dead')}</span></td>`;
        tbody.appendChild(row);
        if(ok)msIpResults.push({ip,port,ping});
        bar.style.width=`${(done/total*100).toFixed(1)}%`;
        pcount.textContent=`${done}/${total}`;
        aliveEl.textContent=alive;deadEl.textContent=dead;
        elapsedEl.textContent=`${((Date.now()-startTime)/1000).toFixed(0)}s`;
      }
    }

    const workers=[];
    for(let i=0;i<Math.min(conc,queue.length);i++)workers.push(worker());
    await Promise.all(workers);

    msIpRunning=false;startBtn.style.display='';stopBtn.style.display='none';
  }

  document.getElementById('ms-ip-start').addEventListener('click',msIpScan);
  document.getElementById('ms-ip-stop').addEventListener('click',()=>{msIpStop=true;});
  document.getElementById('ms-ip-copy').addEventListener('click',()=>{
    const txt=msIpResults.map(r=>`${r.ip}:${r.port}`).join('\n');
    if(txt)navigator.clipboard.writeText(txt);
  });
  document.getElementById('ms-ip-clear').addEventListener('click',()=>{
    document.getElementById('ms-ip-body').innerHTML='';
    document.getElementById('ms-ip-results').style.display='none';
    msIpResults=[];
  });

  // ===== Tab 2: Port Scanner =====
  document.querySelectorAll('[data-mspp]').forEach(b=>{
    b.addEventListener('click',()=>{
      const inp=document.getElementById('ms-pports');
      const vals=inp.value?inp.value.split(',').map(v=>v.trim()).filter(Boolean):[];
      const p=b.getAttribute('data-mspp');
      if(!vals.includes(p))vals.push(p);
      inp.value=vals.join(',');
    });
  });

  document.getElementById('ms-port-start').addEventListener('click',async()=>{
    const host=document.getElementById('ms-phost').value.trim();
    if(!host)return;
    const portsStr=document.getElementById('ms-pports').value.trim();
    const ports=portsStr?portsStr.split(',').map(p=>parseInt(p.trim())).filter(p=>!isNaN(p)):[80,443];
    const tbody=document.getElementById('ms-port-body');
    const resDiv=document.getElementById('ms-port-result');
    resDiv.style.display='';tbody.innerHTML=`<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">${t('در حال اسکن...','Scanning...')}</td></tr>`;

    const portSvc={80:'HTTP',443:'HTTPS',8080:'HTTP-Alt',8443:'HTTPS-Alt',22:'SSH',21:'FTP',3306:'MySQL',5432:'PostgreSQL',6379:'Redis',27017:'MongoDB'};
    const rows=[];
    for(const port of ports){
      const s=performance.now();
      try{
        const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),3000);
        await fetch(`https://${host}:${port}`,{mode:'no-cors',signal:ctrl.signal});
        clearTimeout(tmo);
        rows.push({port,service:portSvc[port]||'Unknown',status:'open',time:performance.now()-s});
      }catch{
        const s2=performance.now();
        try{
          const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),2000);
          await fetch(`http://${host}:${port}`,{mode:'no-cors',signal:ctrl.signal});
          clearTimeout(tmo);
          rows.push({port,service:portSvc[port]||'Unknown',status:'open',time:performance.now()-s2});
        }catch{
          rows.push({port,service:portSvc[port]||'Unknown',status:'closed',time:null});
        }
      }
    }
    tbody.innerHTML=rows.map(r=>`<tr><td>${r.port}</td><td>${r.service}</td><td><span class="status ${r.status==='open'?'good':'bad'}">${r.status}</span></td><td>${r.time?Math.round(r.time)+'ms':'-'}</td></tr>`).join('');
  });

  // ===== Tab 3: CDN Scanner (Advanced) =====
  const CDN_DATA = {
    akamai:{name:'Akamai',snis:['a248.e.akamai.net','a77.net.akamai.net','a104.net.akamai.net','ds-aksb.akamaized.net'],ranges:['2.16.0.0/24','2.17.0.0/24','2.18.0.0/24','2.19.0.0/24','2.20.0.0/24','23.32.0.0/24','23.48.0.0/24','23.58.0.0/24','23.72.0.0/24','23.192.0.0/24','104.64.0.0/24','184.24.0.0/24','184.84.0.0/24','92.122.0.0/24','72.246.0.0/24']},
    google:{name:'Google',snis:['fonts.googleapis.com','ajax.googleapis.com','storage.googleapis.com','www.gstatic.com','accounts.google.com'],ranges:['34.143.0.0/24','34.160.0.0/24','64.233.160.0/24','74.125.0.0/24','142.250.0.0/24','172.217.0.0/24','216.58.192.0/24','35.201.0.0/24','66.249.80.0/24']},
    cloudfront:{name:'CloudFront',snis:['d1.cloudfront.net','d2.cloudfront.net','aws.cloudfront.net','s3.amazonaws.com'],ranges:['13.32.0.0/24','13.35.0.0/24','52.46.0.0/24','54.192.0.0/24','54.230.0.0/24','99.84.0.0/24','130.176.0.0/24','143.204.0.0/24','205.251.192.0/24']},
    azure:{name:'Azure',snis:['ajax.aspnetcdn.com','az416426.vo.msecnd.net','cdn.office.net','static.azureedge.net'],ranges:['13.107.4.0/24','23.96.0.0/24','40.64.0.0/24','52.224.0.0/24','104.208.0.0/24','137.116.0.0/24','168.61.0.0/24']},
  };
  let selCDN=new Set(['akamai']);
  let selSNI='';
  let cdnRunning=false,cdnStop=false,cdnResults=[];

  async function detectISP() {
    try {
      const r=await fetch('https://ipapi.co/json/',{signal:AbortSignal.timeout(5000)});
      const d=await r.json();
      if(d.ip){document.getElementById('ms-cdn-isp').textContent=d.org||d.asn||'ISP';document.getElementById('ms-cdn-ip').textContent=d.ip;}
    }catch{
      try{
        const r=await fetch('https://ip-api.com/json/',{signal:AbortSignal.timeout(4000)});
        const d=await r.json();
        if(d.query){document.getElementById('ms-cdn-isp').textContent=d.org||d.isp||'ISP';document.getElementById('ms-cdn-ip').textContent=d.query;}
      }catch{document.getElementById('ms-cdn-isp').textContent='ISP?';}
    }
  }

  function renderCDNCards(){
    document.querySelectorAll('[data-cdnc]').forEach(el=>el.classList.toggle('on',selCDN.has(el.getAttribute('data-cdnc'))));
    renderCDNRanges();
    renderSNIsCDN();
  }

  function renderCDNRanges(){
    const wrap=document.getElementById('ms-cdn-ranges-wrap');
    wrap.innerHTML='';
    selCDN.forEach(key=>{
      if(!CDN_DATA[key])return;
      CDN_DATA[key].ranges.forEach(c=>{
        const chip=document.createElement('span');
        chip.style.cssText='padding:4px 8px;border:1px solid var(--border);border-radius:6px;font-size:.72rem;font-family:monospace;cursor:pointer;background:var(--bg-3);transition:all.15s';
        chip.textContent=c+' '+key;
        chip.onclick=()=>{
          const ta=document.getElementById('ms-cdn-ipta');
          const lines=ta.value.split('\n').map(l=>l.trim()).filter(Boolean);
          if(lines.includes(c)){ta.value=lines.filter(l=>l!==c).join('\n');chip.style.borderColor='var(--border)';}
          else{ta.value+=(ta.value?'\n':'')+c;chip.style.borderColor='var(--accent)';}
        };
        wrap.appendChild(chip);
      });
    });
  }

  function renderSNIsCDN(){
    const list=document.getElementById('ms-cdn-sni-list');
    list.innerHTML='';
    selCDN.forEach(key=>{
      if(!CDN_DATA[key])return;
      CDN_DATA[key].snis.forEach(sni=>{
        const el=document.createElement('span');
        el.style.cssText='padding:3px 8px;border:1px solid '+(sni===selSNI?'var(--accent)':'var(--border)')+';border-radius:5px;font-size:.72rem;font-family:monospace;cursor:pointer;background:'+(sni===selSNI?'rgba(0,255,179,.1)':'var(--bg-3)')+';color:'+(sni===selSNI?'var(--accent)':'var(--text-2)');
        el.textContent=sni;
        el.onclick=()=>{selSNI=sni;renderSNIsCDN();document.getElementById('ms-cdn-sni-sel').textContent=sni;};
        list.appendChild(el);
      });
    });
    if(!selSNI||!document.querySelector('#ms-cdn-sni-list span')){const f=list.querySelector('span');if(f)f.click();}
  }

  document.querySelectorAll('[data-cdnc]').forEach(el=>{
    el.addEventListener('click',()=>{
      const key=el.getAttribute('data-cdnc');
      if(selCDN.has(key)){if(selCDN.size>1)selCDN.delete(key);}
      else selCDN.add(key);
      renderCDNCards();
    });
  });

  detectISP();
  renderCDNCards();

  async function msCdnScan(){
    const preset=document.getElementById('ms-cdn-preset').value;
    const conc=parseInt(document.getElementById('ms-cdn-conc').value)||20;
    const maxIP=parseInt(document.getElementById('ms-cdn-max').value)||100;
    const ta=document.getElementById('ms-cdn-ipta');
    let cidrs=ta.value.split('\n').map(l=>l.trim()).filter(l=>l&&/^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(l));

    if(!cidrs.length&&maxIP>0){
      cidrs=[];
      selCDN.forEach(key=>{if(CDN_DATA[key])CDN_DATA[key].ranges.slice(0,preset==='quick'?1:preset==='standard'?5:10).forEach(c=>cidrs.push(c));});
    }
    if(!cidrs.length)return;

    const ipCount=preset==='quick'?Math.min(50,maxIP):preset==='standard'?Math.min(150,maxIP):Math.min(500,maxIP);
    let allIPs=[];
    for(const c of cidrs){
      try{
        const r=cidrToRange(c);
        const total=r.end-r.start+1;
        const need=Math.ceil(ipCount/cidrs.length);
        if(total>need){const s=new Set();while(s.size<need&&s.size<total)s.add(randIPFromRange(r.start,r.end));allIPs.push(...s);}
        else for(let i=r.start;i<=r.end;i++)allIPs.push(numToIP(i));
      }catch{}
    }
    allIPs=[...new Set(allIPs)].slice(0,ipCount);
    if(!allIPs.length)return;

    const startBtn=document.getElementById('ms-cdn-start'),stopBtn=document.getElementById('ms-cdn-stop');
    const prog=document.getElementById('ms-cdn-progress'),bar=document.getElementById('ms-cdn-bar');
    const progEl=document.getElementById('ms-cdn-prog'),aliveEl=document.getElementById('ms-cdn-alive');
    const deadEl=document.getElementById('ms-cdn-dead'),bestEl=document.getElementById('ms-cdn-best');
    const tbody=document.getElementById('ms-cdn-tbody'),resDiv=document.getElementById('ms-cdn-results');
    const copySec=document.getElementById('ms-cdn-copy-section'),copyBox=document.getElementById('ms-cdn-copy-box');
    cdnRunning=true;cdnStop=false;cdnResults=[];
    startBtn.style.display='none';stopBtn.style.display='';prog.style.display='';resDiv.style.display='';copySec.style.display='none';
    tbody.innerHTML='';

    const total=allIPs.length;let done=0,alive=0,dead=0,best=9999,startTime=Date.now();
    async function testIP(ip){
      if(cdnStop)return null;
      const s=performance.now();
      try{const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),4000);await fetch(`http://${ip}`,{mode:'no-cors',signal:ctrl.signal});clearTimeout(tmo);return performance.now()-s;}
      catch{return null;}
    }
    const queue=[...allIPs];
    async function workerCDN(){
      while(queue.length&&!cdnStop){
        const ip=queue.shift();if(cdnStop)return;
        const ping=await testIP(ip);if(cdnStop)return;
        const ok=ping!==null;
        if(ok){alive++;if(ping<best)best=ping;}else dead++;
        done++;
        const q=ok?ping<200?'عالی':ping<500?'خوب':'ضعیف':'—';
        const row=document.createElement('tr');
        row.innerHTML=`<td>${done}</td><td><code>${ip}</code></td><td style="font-size:.72rem">${[...selCDN].find(k=>CDN_DATA[k]?.ranges.some(r=>ip.startsWith(r.split('/')[0].split('.').slice(0,2).join('.'))))||'-'}</td><td>${ping?Math.round(ping)+'ms':'-'}</td><td><span class="status ${ok?'good':'bad'}">${ok?t('باز','Open'):t('بسته','Closed')}</span></td><td>${q}</td>`;
        tbody.appendChild(row);
        if(ok)cdnResults.push({ip,ping});
        bar.style.width=`${(done/total*100).toFixed(1)}%`;
        progEl.textContent=`${done}/${total}`;
        aliveEl.textContent=alive;deadEl.textContent=dead;
        bestEl.textContent=best<9999?best+'ms':'-';
      }
    }
    const workers=[];
    for(let i=0;i<Math.min(conc,queue.length);i++)workers.push(workerCDN());
    await Promise.all(workers);
    cdnRunning=false;startBtn.style.display='';stopBtn.style.display='none';

    if(cdnResults.length){
      copySec.style.display='';
      copyBox.textContent=cdnResults.map(r=>r.ip).join('\n')+(selSNI?' # SNI: '+selSNI:'');
    }
  }

  window.msCdnScan=msCdnScan;

  document.getElementById('ms-cdn-start').addEventListener('click',msCdnScan);
  document.getElementById('ms-cdn-stop').addEventListener('click',()=>{cdnStop=true;});
  document.getElementById('ms-cdn-copy-btn').addEventListener('click',()=>{
    navigator.clipboard.writeText(document.getElementById('ms-cdn-copy-box').textContent);
  });
  document.getElementById('ms-cdn-dl-btn').addEventListener('click',()=>{
    const txt=document.getElementById('ms-cdn-copy-box').textContent;
    if(!txt)return;
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download='cdn-ips.txt';a.click();
  });
  document.getElementById('ms-cdn-add-all').addEventListener('click',()=>{
    const ta=document.getElementById('ms-cdn-ipta');
    const lines=new Set(ta.value.split('\n').map(l=>l.trim()).filter(Boolean));
    selCDN.forEach(key=>{if(CDN_DATA[key])CDN_DATA[key].ranges.forEach(c=>lines.add(c));});
    ta.value=[...lines].join('\n');
  });
  document.getElementById('ms-cdn-clear').addEventListener('click',()=>{document.getElementById('ms-cdn-ipta').value='';});

  // ===== Tab 4: DNS =====
  async function dnsQuery(domain,type,provider='cloudflare'){
    const typeMap={'A':1,'AAAA':28,'MX':15,'CNAME':5,'TXT':16,'NS':2,'SOA':6};
    const url=`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${typeMap[type]||1}`;
    const r=await fetch(url,{headers:{'accept':'application/dns-json'}});
    return r.json();
  }
  function typeName(t){const map={1:'A',28:'AAAA',15:'MX',5:'CNAME',16:'TXT',2:'NS',6:'SOA'};return map[t]||'TYPE'+t;}

  document.getElementById('ms-dns-lookup').addEventListener('click',async()=>{
    const domain=document.getElementById('ms-dns-domain').value.trim();
    if(!domain)return;
    const type=document.getElementById('ms-dns-type').value;
    const tbody=document.getElementById('ms-dns-body');
    const resDiv=document.getElementById('ms-dns-result');
    resDiv.style.display='';tbody.innerHTML=`<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">${t('در حال جستجو...','Looking up...')}</td></tr>`;
    try{
      const types=type==='ALL'?['A','AAAA','MX','CNAME','TXT','NS','SOA']:[type];
      let allAnswers=[];
      for(const rt of types){const data=await dnsQuery(domain,rt);if(data.Answer)allAnswers.push(...data.Answer.map(a=>({...a,queryType:rt})));}
      tbody.innerHTML=allAnswers.length?allAnswers.map(a=>`<tr><td>${typeName(a.type)||a.queryType}</td><td style="font-size:.82rem">${a.name}</td><td style="font-size:.82rem">${a.data}</td><td>${a.TTL||'-'}</td></tr>`).join(''):`<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">${t('رکوردی یافت نشد','No records')}</td></tr>`;
    }catch(e){tbody.innerHTML=`<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--danger)">${t('خطا','Error')}: ${e.message}</td></tr>`;}
  });

  // ===== Tab 5: Network Check =====
  document.getElementById('ms-net-check').addEventListener('click',async()=>{
    const targets=[...document.querySelectorAll('.ms-net-target:checked')].map(c=>c.value);
    if(!targets.length)return;
    const tbody=document.getElementById('ms-net-body');
    const resDiv=document.getElementById('ms-net-result');
    resDiv.style.display='';tbody.innerHTML=`<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--text-3)">${t('در حال بررسی...','Checking...')}</td></tr>`;
    const rows=[];
    for(const target of targets){
      const start=performance.now();
      try{
        const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),5000);
        await fetch(`http://${target}`,{mode:'no-cors',signal:ctrl.signal});
        clearTimeout(tmo);
        rows.push({target,ok:true,time:performance.now()-start});
      }catch{
        try{
          const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),3000);
          await fetch(`https://${target}`,{mode:'no-cors',signal:ctrl.signal});
          clearTimeout(tmo);
          rows.push({target,ok:true,time:performance.now()-start});
        }catch{rows.push({target,ok:false,time:null});}
      }
    }
    tbody.innerHTML=rows.map(r=>`<tr><td>${r.target}</td><td><span class="status ${r.ok?'good':'bad'}">${r.ok?t('آنلاین','Online'):t('آفلاین','Offline')}</span></td><td>${r.time?Math.round(r.time)+'ms':'-'}</td></tr>`).join('');
  });

  // ===== Tab 6: Speed Test =====
  document.getElementById('ms-speed-start').addEventListener('click',async()=>{
    const btn=document.getElementById('ms-speed-start');
    const bar=document.getElementById('ms-speed-bar');
    const prog=document.getElementById('ms-speed-progress');
    const speedEl=document.getElementById('ms-speed-result');
    const pingEl=document.getElementById('ms-speed-ping');
    const jitterEl=document.getElementById('ms-speed-jitter');
    btn.disabled=true;prog.style.display='';
    const sizes=[1024*100,1024*500,1024*1024,1024*2048];
    const urls=['https://www.cloudflare.com/favicon.ico','https://www.google.com/favicon.ico','https://github.com/favicon.ico','https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js'];
    let totalBits=0,totalTime=0,pings=[];
    for(let i=0;i<urls.length;i++){
      bar.style.width=`${((i+1)/urls.length*100).toFixed(0)}%`;
      const start=performance.now();
      try{
        const ctrl=new AbortController();const tmo=setTimeout(()=>ctrl.abort(),5000);
        const r=await fetch(urls[i],{cache:'no-store',signal:ctrl.signal});
        const blob=await r.blob();
        clearTimeout(tmo);
        const elapsed=performance.now()-start;
        totalBits+=blob.size*8;totalTime+=elapsed;
        pings.push(elapsed);
      }catch{}
    }
    prog.style.display='none';btn.disabled=false;
    const mbps=totalTime>0?((totalBits/totalTime)*1000/1024/1024).toFixed(2):'0';
    speedEl.textContent=mbps;
    const avgPing=pings.length?Math.round(pings.reduce((a,b)=>a+b,0)/pings.length):0;
    pingEl.textContent=`${avgPing}ms`;
    jitterEl.textContent=pings.length>1?`${Math.round(Math.abs(pings[1]-pings[0]))}ms`:'-';
  });

  // ===== Tab 7: Geo IP =====
  document.getElementById('ms-geo-lookup').addEventListener('click',async()=>{
    const ip=document.getElementById('ms-geo-ip').value.trim()||'';
    const resDiv=document.getElementById('ms-geo-result');
    resDiv.style.display='';
    try{
      const r=await fetch(ip?`https://ipapi.co/${ip}/json/`:'https://ipapi.co/json/');
      const d=await r.json();
      document.getElementById('ms-geo-ipv4').textContent=d.ip||'-';
      document.getElementById('ms-geo-country').textContent=`${d.country_name||'-'} (${d.country_code||'-'})`;
      document.getElementById('ms-geo-city').textContent=d.city||'-';
      document.getElementById('ms-geo-isp').textContent=d.org||d.isp||'-';
      document.getElementById('ms-geo-asn').textContent=d.asn||'-';
      document.getElementById('ms-geo-coords').textContent=d.latitude&&d.longitude?`${d.latitude}, ${d.longitude}`:'-';
    }catch{
      document.getElementById('ms-geo-ipv4').textContent='-';
      document.getElementById('ms-geo-country').textContent=t('خطا در دریافت اطلاعات','Fetch error');
    }
  });
}
