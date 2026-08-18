const L = {
  fa: {
    title: 'ابزارهای تونل',
    subtitle: 'مرجع کامل ابزارهای تونل‌زنی و پروکسی معکوس',
    search: 'جستجوی ابزار...',
    install: 'نصب',
    usage: 'مثال',
    options: 'گزینه‌ها',
    copy: 'کپی',
    copied: 'کپی شد',
    category: 'دسته',
    compare: 'جدول مقایسه',
    useCases: 'موارد استفاده',
    tabWeb: 'وب سرور',
    tabSSH: 'SSH',
    tabTCP: 'TCP',
    tabGame: 'بازی',
    allTools: 'همه',
    tool: 'ابزار',
    size: 'حجم',
    platform: 'پلتفرم',
    auth: 'احراز',
    subdomain: 'زیردامنه',
    speed: 'سرعت',
    installSize: 'حجم نصب',
    bestWeb: 'بهترین ابزارها برای نمایش وب سرور لوکال:',
    bestSSH: 'بهترین ابزارها برای تونل SSH:',
    bestTCP: 'بهترین ابزارها برای تونل TCP:',
    bestGame: 'بهترین ابزارها برای سرور بازی:',
    clickCopy: 'روی دستور کلیک کنید تا کپی شود',
    desc: 'توضیحات',
  },
  en: {
    title: 'Tunnel Tools',
    subtitle: 'Complete reference for tunneling and reverse proxy tools',
    search: 'Search tools...',
    install: 'Install',
    usage: 'Usage',
    options: 'Options',
    copy: 'Copy',
    copied: 'Copied',
    category: 'Category',
    compare: 'Comparison Table',
    useCases: 'Use Cases',
    tabWeb: 'Web Server',
    tabSSH: 'SSH',
    tabTCP: 'TCP',
    tabGame: 'Game Server',
    allTools: 'All',
    tool: 'Tool',
    size: 'Size',
    platform: 'Platform',
    auth: 'Auth',
    subdomain: 'Subdomains',
    speed: 'Speed',
    installSize: 'Install Size',
    bestWeb: 'Best tools for exposing a local web server:',
    bestSSH: 'Best tools for SSH tunneling:',
    bestTCP: 'Best tools for TCP tunneling:',
    bestGame: 'Best tools for game server tunneling:',
    clickCopy: 'Click a command to copy',
    desc: 'Description',
  }
};

const TOOLS = [
  {
    id: 'ngrok',
    name: 'ngrok',
    desc: 'The most popular secure tunnel with dashboard, TCP/HTTP support and subdomains',
    install: [
      'npm install -g ngrok',
      'brew install ngrok/ngrok/ngrok',
      'winget install ngrok'
    ],
    usage: [
      'ngrok http 3000',
      'ngrok http 8080 --domain myapp.ngrok.io',
      'ngrok tcp 22'
    ],
    options: '--domain, --region (us/eu/ap/au/au), --auth, --basic-auth, --host-header',
    category: 'Freemium',
    installSize: '~15 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Token',
    subdomains: 'Yes (paid)',
    speed: 'Fast',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'cloudflared',
    name: 'Cloudflare Tunnel (cloudflared)',
    desc: 'Tunnel through Cloudflare network with built-in DDoS protection and zero-trust',
    install: [
      'winget install cloudflare.cloudflared',
      'brew install cloudflared',
      'curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe -o cloudflared.exe'
    ],
    usage: [
      'cloudflared tunnel --url http://localhost:3000',
      'cloudflared tunnel --url ssh://localhost:22',
      'cloudflared tunnel run --token <token>'
    ],
    options: '--url, --token, --config, --hostname, --ingress',
    category: 'Free',
    installSize: '~20 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Cloudflare Login',
    subdomains: 'Yes (custom)',
    speed: 'Fast',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'bore',
    name: 'bore',
    desc: 'Simple Rust-based CLI tunnel — minimal and fast, single binary',
    install: [
      'cargo install bore-cli',
      'brew install bore-cli',
      'curl -Ls https://github.com/ekzhang/bore/releases/latest | grep -o "bore-.*-x86_64.*" | head -1'
    ],
    usage: [
      'bore local 3000 --to bore.pub',
      'bore local 8080 --to bore.pub --port 12345',
      'bore local 22 --to my-server.com --secret mykey'
    ],
    options: '--to, --port, --secret, --min-port, --max-port',
    category: 'Open Source',
    installSize: '~3 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Optional (secret)',
    subdomains: 'No',
    speed: 'Medium',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'localtunnel',
    name: 'localtunnel',
    desc: 'Node.js tunnel that assigns a unique subdomain via localtunnel.me',
    install: [
      'npm install -g localtunnel',
      'npx localtunnel --port 3000'
    ],
    usage: [
      'lt --port 3000',
      'lt --port 8080 --subdomain myapp',
      'lt --port 3000 --local-host 127.0.0.1'
    ],
    options: '--port, --subdomain, --local-host, --print-requests',
    category: 'Free',
    installSize: '~5 MB',
    platform: 'Win / Mac / Linux (Node)',
    auth: 'None',
    subdomains: 'Yes',
    speed: 'Medium',
    useCases: ['web']
  },
  {
    id: 'serveo',
    name: 'serveo',
    desc: 'SSH-based tunnel with HTTP inspection and replay — no client install needed',
    install: [
      'ssh -R 80:localhost:3000 serveo.net',
      '# Install autossh for persistence:',
      'brew install autossh'
    ],
    usage: [
      'ssh -R 80:localhost:3000 serveo.net',
      'ssh -R 80:localhost:8080 serveo.net -o ServerAliveInterval=60',
      'ssh -R myalias:80:localhost:3000 serveo.net'
    ],
    options: '-R, -o ServerAliveInterval, custom subdomain prefix, HTTP inspect',
    category: 'Free',
    installSize: '0 (uses SSH)',
    platform: 'Any (SSH client)',
    auth: 'SSH key',
    subdomains: 'Yes (custom)',
    speed: 'Medium',
    useCases: ['web', 'ssh']
  },
  {
    id: 'localhostrun',
    name: 'localhost.run',
    desc: 'SSH-based tunnel — zero install, just SSH to localhost.run',
    install: [
      '# No install needed — uses built-in SSH',
      'ssh -R 80:localhost:3000 nokey@localhost.run'
    ],
    usage: [
      'ssh -R 80:localhost:3000 nokey@localhost.run',
      'ssh -R 80:localhost:8080 nokey@localhost.run',
      'ssh -R 80:localhost:3000 tunnel.us.localhost.run'
    ],
    options: '-R, -N, -f for background, region selection (us/.us)',
    category: 'Free',
    installSize: '0 (uses SSH)',
    platform: 'Any (SSH client)',
    auth: 'None (nokey)',
    subdomains: 'Random',
    speed: 'Medium',
    useCases: ['web']
  },
  {
    id: 'playit',
    name: 'playit.gg',
    desc: 'Game server tunneling with web dashboard, TCP/UDP support, and DDoS protection',
    install: [
      'curl -L https://playit.cloud/downloads/playit-linux-amd64 -o playit',
      'chmod +x playit && ./playit',
      '# Windows: download from playit.gg/download'
    ],
    usage: [
      './playit',
      './playit --secret <secret-key>',
      '# Config via web dashboard at playit.gg/account'
    ],
    options: '--secret, tunnel config via GUI/dashboard, protocol selection',
    category: 'Free (Premium)',
    installSize: '~10 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Dashboard account',
    subdomains: 'Yes (dashboard)',
    speed: 'Fast',
    useCases: ['game', 'tcp']
  },
  {
    id: 'frp',
    name: 'frp (Fast Reverse Proxy)',
    desc: 'Full-featured reverse proxy server-client with dashboard, encryption, and multiplexing',
    install: [
      '# Download from github.com/fatedier/frp/releases',
      'curl -LO https://github.com/fatedier/frp/releases/latest/download/frp_0.61.0_linux_amd64.tar.gz',
      'brew install frp'
    ],
    usage: [
      './frpc -c frpc.toml',
      '# frpc.toml: server_addr = "your-server.com"',
      'frps -c frps.toml  # run on server side'
    ],
    options: 'server_addr, server_port, token, type (tcp/http), custom_domains, encryption, compression',
    category: 'Open Source',
    installSize: '~12 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Token',
    subdomains: 'Yes (HTTP)',
    speed: 'Very Fast',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'chisel',
    name: 'chisel',
    desc: 'Fast TCP/UDP tunnel over HTTP with SOCKS5 proxy support — single binary',
    install: [
      'curl -LO https://github.com/jpillora/chisel/releases/latest/download/chisel_1.10.1_windows_amd64.gz',
      'go install github.com/jpillora/chisel@latest',
      'brew install chisel'
    ],
    usage: [
      '# Server: chisel server --port 8080 --reverse',
      'chisel server --port 8080 --reverse',
      '# Client: chisel client server-ip:8080 R:3000:localhost:3000',
      'chisel client server-ip:8080 R:8080:localhost:80'
    ],
    options: '--port, --reverse, --socks5, --auth, --keepalive, --proxy',
    category: 'Open Source',
    installSize: '~10 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Optional (user:pass)',
    subdomains: 'No',
    speed: 'Fast',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'rathole',
    name: 'rathole',
    desc: 'High-performance Rust-based reverse proxy with NAT traversal and encryption',
    install: [
      'cargo install rathole',
      '# Or download binary from github.com/rapiz1/rathole/releases',
      'curl -LO https://github.com/rapiz1/rathole/releases/latest/download/rathole-x86_64-linux.zip'
    ],
    usage: [
      '# Server: rathole --server server.toml',
      'rathole --server server.toml',
      '# Client: rathole --client client.toml',
      'rathole --client client.toml'
    ],
    options: '--server, --client, --config, bind_addr, remote_addr, token, encryption',
    category: 'Open Source',
    installSize: '~4 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Token',
    subdomains: 'No',
    speed: 'Very Fast',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'telebit',
    name: 'Telebit',
    desc: 'Encrypted tunnel with ACME/Let\'s Encrypt integration, auto-HTTPS, and REST API',
    install: [
      'npm install -g telebit',
      'curl -L https://get.telebit.cloud | bash'
    ],
    usage: [
      'telebit http 3000',
      'telebit http 8080 --hostname myapp.example.com',
      'telebit tcp 22'
    ],
    options: '--hostname, --port, --local-host, --acme (auto-HTTPS), --api-key',
    category: 'Open Source (Freemium)',
    installSize: '~8 MB',
    platform: 'Win / Mac / Linux (Node)',
    auth: 'Email/API key',
    subdomains: 'Yes (with ACME)',
    speed: 'Fast',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'pagekite',
    name: 'Pagekite',
    desc: 'Python-based tunnel with built-in HTTP/HTTPS, SSH, and custom protocol support',
    install: [
      'pip install pagekite',
      'brew install pagekite',
      'curl -L https://pagekite.net/pk/pagekite.py -o pagekite.py'
    ],
    usage: [
      'pagekite.py 3000 myapp.pagekite.me',
      'pagekite.py 8080 myapp.pagekite.me +uselocalcert',
      'pagekite.py 22 myssh.pagekite.me +rawserver'
    ],
    options: '+uselocalcert, +rawserver, +https, --clean, --signature, --allinterfaces',
    category: 'Freemium',
    installSize: '~3 MB',
    platform: 'Win / Mac / Linux (Python)',
    auth: 'Account signup',
    subdomains: 'Yes (custom)',
    speed: 'Medium',
    useCases: ['web', 'ssh', 'tcp']
  },
  {
    id: 'innertunnel',
    name: 'InnerTunnel',
    desc: 'Simple HTTP tunnel written in Go with minimal configuration',
    install: [
      'go install github.com/shuLhan/go-innertunnel@latest',
      '# Download from github.com/shuLhan/go-innertunnel/releases'
    ],
    usage: [
      'innertunnel server --addr :8080',
      'innertunnel client --server server-ip:8080 --local :3000',
      'innertunnel client --server server-ip:8080 --local :22 --name ssh'
    ],
    options: '--addr, --server, --local, --name, --key, --protocol (tcp/http)',
    category: 'Open Source',
    installSize: '~5 MB',
    platform: 'Win / Mac / Linux',
    auth: 'Pre-shared key',
    subdomains: 'No',
    speed: 'Medium',
    useCases: ['web', 'tcp']
  },
  {
    id: 'tunnelto',
    name: 'Tunnelto',
    desc: 'Rust-based tunnel with custom subdomain support and wildcard domains',
    install: [
      'brew install tunnelto',
      'curl -L https://github.com/agrinman/tunnelto/releases/latest/download/tunnelto-linux.tar.gz | tar xz'
    ],
    usage: [
      'tunnelto --port 3000',
      'tunnelto --port 8080 --subdomain myapp',
      'tunnelto --port 3000 --host example.com --tls'
    ],
    options: '--port, --subdomain, --host, --tls, --region (us/eu)',
    category: 'Free (Premium)',
    installSize: '~5 MB',
    platform: 'Win / Mac / Linux',
    auth: 'API key (optional)',
    subdomains: 'Yes (custom)',
    speed: 'Fast',
    useCases: ['web']
  },
  {
    id: 'expose',
    name: 'Expose',
    desc: 'PHP-based tunnel with shareable URLs, wildcard domains, and Laravel integration',
    install: [
      'composer global require beyondcode/expose',
      '# Or download from expose.dev',
      'brew install expose'
    ],
    usage: [
      'expose share http://localhost:3000',
      'expose share http://localhost:8080 --subdomain=myapp',
      'expose share http://localhost:3000 --domain=myapp.test'
    ],
    options: '--subdomain, --domain, --port, --auth, --server-host',
    category: 'Freemium',
    installSize: '~6 MB',
    platform: 'Win / Mac / Linux (PHP)',
    auth: 'Account (optional)',
    subdomains: 'Yes (custom)',
    speed: 'Medium',
    useCases: ['web']
  }
];

export default function render(lang) {
  const t = L[lang] || L.en;
  const isRtl = lang === 'fa';
  const rtlStyle = isRtl ? 'style="direction:rtl;text-align:right"' : '';
  const rtlInverse = isRtl ? 'style="direction:ltr;text-align:left"' : '';

  function card(tool) {
    const copyAttrs = `onclick="ttCopy(this,event)" data-copy`;
    return `<div class="tt-card" data-tool="${tool.id}" data-use="${tool.useCases.join(',')}" data-cat="${tool.category.toLowerCase()}">
      <div class="tt-card-header">
        <div class="tt-card-title-row">
          <span class="tt-card-name">${tool.name}</span>
          <span class="tt-badge ${tool.category.toLowerCase().replace(/[^a-z]/g,'')}">${tool.category}</span>
        </div>
        <p class="tt-card-desc">${tool.desc}</p>
      </div>
      <div class="tt-card-section">
        <div class="tt-section-label">${t.install}</div>
        ${tool.install.map(c => `<div class="tt-cmd-row"><code class="tt-cmd" ${copyAttrs} data-txt="${esc(c)}">${escHtml(c)}</code><button class="tt-copy-btn" ${copyAttrs} data-txt="${esc(c)}">${t.copy}</button></div>`).join('')}
      </div>
      <div class="tt-card-section">
        <div class="tt-section-label">${t.usage}</div>
        ${tool.usage.map(c => `<div class="tt-cmd-row"><code class="tt-cmd" ${copyAttrs} data-txt="${esc(c)}">${escHtml(c)}</code><button class="tt-copy-btn" ${copyAttrs} data-txt="${esc(c)}">${t.copy}</button></div>`).join('')}
      </div>
      <div class="tt-card-section tt-options-row">
        <span class="tt-section-label" style="margin:0">${t.options}:</span>
        <span class="tt-options-text">${escHtml(tool.options)}</span>
      </div>
    </div>`;
  }

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  const useCasesData = [
    { id: 'web', label: t.tabWeb, text: t.bestWeb, tools: TOOLS.filter(t2 => t2.useCases.includes('web')) },
    { id: 'ssh', label: t.tabSSH, text: t.bestSSH, tools: TOOLS.filter(t2 => t2.useCases.includes('ssh')) },
    { id: 'tcp', label: t.tabTCP, text: t.bestTCP, tools: TOOLS.filter(t2 => t2.useCases.includes('tcp')) },
    { id: 'game', label: t.tabGame, text: t.bestGame, tools: TOOLS.filter(t2 => t2.useCases.includes('game')) },
  ];

  return `<div id="tt-root" ${rtlStyle}>
<style>
#tt-root { font-family: system-ui,-apple-system,sans-serif; }
.tt-table-wrap { overflow-x:auto; margin-bottom:24px; border-radius:12px; border:1px solid var(--line,#e2e8f0); background:var(--card,#fff); }
.tt-table { width:100%; border-collapse:collapse; font-size:.8125rem; white-space:nowrap; }
.tt-table th { background:var(--muted,#f1f5f9); padding:10px 12px; text-align:start; font-weight:600; border-bottom:2px solid var(--line,#e2e8f0); }
.tt-table td { padding:8px 12px; border-bottom:1px solid var(--line,#e2e8f0); }
.tt-table tr:last-child td { border-bottom:none; }
.tt-table tr:hover td { background:var(--accent-bg,#eef2ff); }
.tt-tool-link { cursor:pointer; color:var(--accent,#6366f1); font-weight:600; text-decoration:none; }
.tt-tool-link:hover { text-decoration:underline; }
.tt-controls { display:flex; flex-wrap:wrap; gap:12px; margin-bottom:20px; align-items:center; }
.tt-search { flex:1; min-width:200px; padding:10px 14px; border-radius:8px; border:1px solid var(--input,#d1d5db); background:var(--card,#fff); color:inherit; font-size:.9rem; outline:none; }
.tt-search:focus { border-color:var(--accent,#6366f1); }
.tt-tabs { display:flex; flex-wrap:wrap; gap:6px; }
.tt-tab { padding:6px 14px; border-radius:6px; border:1px solid var(--line,#e2e8f0); background:var(--card,#fff); cursor:pointer; font-size:.8125rem; transition:all .15s; }
.tt-tab:hover { border-color:var(--accent,#6366f1); }
.tt-tab.active { background:var(--accent,#6366f1); color:#fff; border-color:var(--accent,#6366f1); }
.tt-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(380px,1fr)); gap:16px; margin-bottom:20px; }
.tt-card { border:1px solid var(--line,#e2e8f0); border-radius:12px; background:var(--card,#fff); overflow:hidden; transition:box-shadow .2s; }
.tt-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.08); }
.tt-card-header { padding:14px 16px 8px; }
.tt-card-title-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px; }
.tt-card-name { font-weight:700; font-size:1rem; }
.tt-badge { font-size:.7rem; padding:2px 8px; border-radius:999px; font-weight:600; }
.tt-badge.freemium { background:#fef9c3; color:#854d0e; }
.tt-badge.free { background:#dcfce7; color:#166534; }
.tt-badge.opensource { background:#e0f2fe; color:#075985; }
.tt-badge.freepremium { background:#f3e8ff; color:#6b21a8; }
.tt-card-desc { font-size:.8125rem; color:var(--muted-foreground,#64748b); margin:0; line-height:1.4; }
.tt-card-section { padding:6px 16px; }
.tt-section-label { font-size:.7rem; text-transform:uppercase; font-weight:600; letter-spacing:.04em; color:var(--muted-foreground,#94a3b8); margin-bottom:4px; }
.tt-cmd-row { display:flex; align-items:center; gap:6px; margin-bottom:4px; }
.tt-cmd { flex:1; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.775rem; padding:4px 8px; background:var(--muted,#f1f5f9); border-radius:4px; overflow-x:auto; white-space:nowrap; cursor:pointer; user-select:all; border:1px solid transparent; }
.tt-cmd:hover { border-color:var(--accent,#6366f1); }
.tt-copy-btn { font-size:.7rem; padding:2px 8px; border-radius:4px; border:1px solid var(--line,#e2e8f0); background:var(--card,#fff); cursor:pointer; white-space:nowrap; flex-shrink:0; }
.tt-copy-btn:hover { background:var(--accent,#6366f1); color:#fff; }
.tt-options-row { display:flex; gap:6px; align-items:flex-start; padding-bottom:12px; flex-wrap:wrap; }
.tt-options-text { font-size:.775rem; color:var(--muted-foreground,#64748b); font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
.tt-use-case-box { border:1px solid var(--line,#e2e8f0); border-radius:12px; padding:16px; margin-bottom:20px; background:var(--card,#fff); display:none; }
.tt-use-case-box.active { display:block; }
.tt-use-case-box p { margin:0 0 12px; font-size:.875rem; }
.tt-use-case-tools { display:flex; flex-wrap:wrap; gap:6px; }
.tt-use-case-tag { padding:4px 12px; border-radius:6px; background:var(--muted,#f1f5f9); font-size:.8rem; cursor:pointer; border:1px solid transparent; }
.tt-use-case-tag:hover { border-color:var(--accent,#6366f1); }
.tt-hidden { display:none !important; }
.tt-footer { font-size:.75rem; color:var(--muted-foreground,#94a3b8); text-align:center; padding:16px 0 0; }
</style>

<div class="tt-table-wrap">
<h3 style="margin:0;padding:12px 16px;font-size:.95rem;font-weight:600;border-bottom:1px solid var(--line,#e2e8f0)">${t.compare}</h3>
<table class="tt-table">
<thead><tr><th>${t.tool}</th><th>${t.installSize}</th><th>${t.platform}</th><th>${t.auth}</th><th>${t.subdomain}</th><th>${t.speed}</th></tr></thead>
<tbody>
${TOOLS.map(tool => `<tr>
  <td><span class="tt-tool-link" onclick="document.getElementById('tt-root').querySelector('[data-tool=\\'${tool.id}\\']').scrollIntoView({behavior:'smooth',block:'center'});document.getElementById('tt-root').querySelector('[data-tool=\\'${tool.id}\\']').style.boxShadow='0 0 0 2px var(--accent,#6366f1)';setTimeout(()=>{document.getElementById('tt-root').querySelector('[data-tool=\\'${tool.id}\\']').style.boxShadow=''},2000)">${escHtml(tool.name)}</span></td>
  <td>${escHtml(tool.installSize)}</td>
  <td>${escHtml(tool.platform)}</td>
  <td>${escHtml(tool.auth)}</td>
  <td>${escHtml(tool.subdomains)}</td>
  <td>${escHtml(tool.speed)}</td>
</tr>`).join('')}
</tbody>
</table>
</div>

<div class="tt-controls">
  <input class="tt-search" id="tt-search" type="text" placeholder="${t.search}" oninput="ttFilter()">
  <div class="tt-tabs">
    <button class="tt-tab active" data-ttab="all" onclick="ttTab(this)">${t.allTools}</button>
    ${useCasesData.map(u => `<button class="tt-tab" data-ttab="${u.id}" onclick="ttTab(this)">${u.label}</button>`).join('')}
  </div>
</div>

${useCasesData.map((u, i) => `<div class="tt-use-case-box ${i === 0 ? 'active' : ''}" id="tt-uc-${u.id}">
  <p>${u.text}</p>
  <div class="tt-use-case-tools">
    ${u.tools.map(t2 => `<span class="tt-use-case-tag" onclick="document.getElementById('tt-root').querySelector('[data-tool=\\'${t2.id}\\']').scrollIntoView({behavior:'smooth',block:'center'});document.getElementById('tt-root').querySelector('[data-tool=\\'${t2.id}\\']').style.boxShadow='0 0 0 2px var(--accent,#6366f1)';setTimeout(()=>{document.getElementById('tt-root').querySelector('[data-tool=\\'${t2.id}\\']').style.boxShadow=''},2000)">${escHtml(t2.name)}</span>`).join('')}
  </div>
</div>`).join('')}

<div class="tt-grid" id="tt-grid">
  ${TOOLS.map(card).join('')}
</div>

<div class="tt-footer">${t.clickCopy}</div>
</div>`;
}

export function init(lang) {
  const t = L[lang] || L.en;
  window.ttCopy = async function(el, e) {
    const txt = el.getAttribute('data-txt');
    if (!txt) return;
    try {
      await navigator.clipboard.writeText(txt);
      const btn = el.tagName === 'BUTTON' ? el : el.parentElement.querySelector('.tt-copy-btn');
      const original = btn.textContent;
      btn.textContent = t.copied;
      setTimeout(() => { btn.textContent = original; }, 1500);
    } catch(e2) {}
  };
  window.ttFilter = function() {
    const q = document.getElementById('tt-search').value.toLowerCase().trim();
    const activeTab = document.querySelector('.tt-tab.active')?.getAttribute('data-ttab') || 'all';
    document.querySelectorAll('.tt-card').forEach(card => {
      const name = card.querySelector('.tt-card-name').textContent.toLowerCase();
      const desc = card.querySelector('.tt-card-desc').textContent.toLowerCase();
      const cat = (card.getAttribute('data-cat') || '').toLowerCase();
      const use = (card.getAttribute('data-use') || '').split(',');
      const matchSearch = !q || name.includes(q) || desc.includes(q) || cat.includes(q);
      const matchTab = activeTab === 'all' || use.includes(activeTab);
      card.classList.toggle('tt-hidden', !(matchSearch && matchTab));
    });
  };
  window.ttTab = function(btn) {
    document.querySelectorAll('.tt-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.getAttribute('data-ttab');
    document.querySelectorAll('.tt-use-case-box').forEach(box => box.classList.remove('active'));
    if (tab !== 'all') {
      const uc = document.getElementById('tt-uc-' + tab);
      if (uc) uc.classList.add('active');
    }
    window.ttFilter();
  };
}
