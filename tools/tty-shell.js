export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  return `<div class="panel">
    <h3 class="section-title">${t('تکنیک‌های TTY Shell', 'TTY Shell Spawn Techniques')}</h3>
    <div class="stack">
      <div class="section-title">${t('مرحله ۱ - Python PTY', 'Step 1 - Python PTY Spawn')}</div>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-1')" id="ts-1">python3 -c 'import pty; pty.spawn("/bin/bash")'</pre>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-1b')" id="ts-1b">python -c 'import pty; pty.spawn("/bin/bash")'</pre>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-1c')" id="ts-1c">python3 -c 'import pty;pty.spawn("/bin/bash")'</pre>

      <div class="section-title">${t('مرحله ۲ - تنظیم TERM', 'Step 2 - Export TERM')}</div>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-2')" id="ts-2">export TERM=xterm</pre>

      <div class="section-title">${t('مرحله ۳ - stty raw', 'Step 3 - stty raw / fg')}</div>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-3')" id="ts-3">stty raw -echo; fg</pre>

      <div class="section-title">${t('مرحله ۴ - تنظیم ابعاد', 'Step 4 - stty rows/columns')}</div>
      <p class="subtle">${t('ابتدا در ترمینال محلی خود اجرا کنید:', 'First run in your local terminal:')}</p>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-4a')" id="ts-4a">stty size</pre>
      <p class="subtle">${t('سپس در shell راه دور:', 'Then in the remote shell:')}</p>
      <pre class="out" style="cursor:pointer" onclick="tsCopy('ts-4b')" id="ts-4b">stty rows 38 columns 116</pre>
    </div>
  </div>`;
}

export function init() {
  window.tsCopy = function(id) {
    navigator.clipboard.writeText(document.getElementById(id).textContent);
  };
}
