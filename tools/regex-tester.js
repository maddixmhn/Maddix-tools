export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔬</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'تست Regex':'Regex Tester')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'تست و调试 عبارات منظم':'Test and debug regular expressions')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'الگو (Pattern)':'Pattern')+'</label>'+
      '<input id="rx-pattern" type="text" placeholder="[a-z]+" value="(https?://)?([\\w.-]+)\\.(com|org|net)" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr">'+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">'+
      '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="rx-flag-g" checked> g</label>'+
      '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="rx-flag-i"> i</label>'+
      '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="rx-flag-m"> m</label>'+
      '<label style="display:flex;align-items:center;gap:4px;font-size:.8125rem;cursor:pointer"><input type="checkbox" id="rx-flag-s"> s</label>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f?'متن آزمایشی':'Test Text')+'</label>'+
      '<textarea id="rx-text" rows="6" placeholder="'+(f?'متن را وارد کنید...':'Enter test text...')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">Visit https://example.com and http://test.org for more info. Contact admin@example.com</textarea>'+
    '</div>'+
    '<div id="rx-info" style="font-size:.8125rem;color:var(--muted-foreground);margin-bottom:8px"></div>'+
    '<div id="rx-output" style="padding:12px;background:var(--muted);border-radius:var(--radius);min-height:80px;font-family:monospace;font-size:.8125rem;line-height:1.6;white-space:pre-wrap;word-break:break-all"></div>'+
  '</div>';
}
export function init(lang) {
  var f = lang === 'fa';
  var el = { pattern:document.getElementById('rx-pattern'), text:document.getElementById('rx-text'), info:document.getElementById('rx-info'), out:document.getElementById('rx-output') };
  if (!el.pattern||!el.text||!el.info||!el.out) return;
  function test() {
    try {
      var flags = '';
      if (document.getElementById('rx-flag-g').checked) flags += 'g';
      if (document.getElementById('rx-flag-i').checked) flags += 'i';
      if (document.getElementById('rx-flag-m').checked) flags += 'm';
      if (document.getElementById('rx-flag-s').checked) flags += 's';
      var re = new RegExp(el.pattern.value, flags);
      var text = el.text.value;
      var matches = [];
      var m;
      var count = 0;
      while ((m = re.exec(text)) !== null) {
        matches.push(m);
        count++;
        if (!flags.includes('g')) break;
        if (m.index === re.lastIndex) re.lastIndex++;
        if (count > 1000) break;
      }
      if (matches.length === 0) {
        el.info.textContent = f?'هیچ نتیجه‌ای یافت نشد':'No matches found';
        el.out.innerHTML = '<span style="color:var(--muted-foreground)">'+escapeHtml(text)+'</span>';
        return;
      }
      el.info.textContent = (f?'تعداد نتایج: ':'Matches: ')+matches.length;
      var lastIdx = 0;
      var html = '';
      var allMatches = [];
      if (flags.includes('g')) {
        var re2 = new RegExp(el.pattern.value, flags);
        var m2;
        while ((m2 = re2.exec(text)) !== null) {
          allMatches.push({ index: m2.index, length: m2[0].length, text: m2[0] });
          if (m2.index === re2.lastIndex) re2.lastIndex++;
          if (allMatches.length > 1000) break;
        }
        var pos = 0;
        allMatches.forEach(function(match){
          html += escapeHtml(text.slice(pos, match.index));
          html += '<span style="background:rgba(0,200,80,.3);border-radius:2px;padding:1px 0">'+escapeHtml(match.text)+'</span>';
          pos = match.index + match.length;
        });
        html += escapeHtml(text.slice(pos));
        el.out.innerHTML = html;
      } else {
        el.out.innerHTML = '<span style="color:var(--muted-foreground)">'+(f?'نتایج:':'Results:')+'</span><br>';
        matches.forEach(function(match, i){
          el.out.innerHTML += '<div style="padding:4px 0;border-bottom:1px solid var(--border)">'+
            '<span style="color:var(--muted-foreground);font-size:.75rem">#'+(i+1)+' @'+match.index+': </span>'+
            '<span style="background:rgba(0,200,80,.3);border-radius:2px;padding:1px 4px">'+escapeHtml(match[0])+'</span>';
          if (match.length > 1) {
            el.out.innerHTML += ' <span style="font-size:.75rem;color:var(--muted-foreground)">groups: [';
            for (var j = 1; j < match.length; j++) {
              el.out.innerHTML += (j>1?', ':'')+'<span style="color:var(--foreground)">'+(match[j]||'<span style="color:#ff4444">undefined</span>')+'</span>';
            }
            el.out.innerHTML += ']</span>';
          }
          el.out.innerHTML += '</div>';
        });
      }
    } catch(e) {
      el.info.textContent = (f?'خطا در الگو: ':'Regex error: ')+e.message;
      el.out.innerHTML = '<span style="color:#ff4444">'+escapeHtml(e.message)+'</span>';
    }
  }
  function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  el.pattern.addEventListener('input', test);
  el.text.addEventListener('input', test);
  document.querySelectorAll('#rx-flag-g,#rx-flag-i,#rx-flag-m,#rx-flag-s').forEach(function(el){ el.addEventListener('change', test); });
  test();
}
