export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">'+
      '<span style="font-size:2rem">📝</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Markdown Preview</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'ویرایشگر زنده مارک‌داون':'Live Markdown editor with preview')+'</p></div>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;min-height:400px">'+
      '<div style="display:flex;flex-direction:column">'+
        '<div style="display:flex;justify-content:space-between;margin-bottom:6px">'+
          '<span style="font-size:.8125rem;font-weight:500">'+(f,'مارک‌داون','Markdown')+'</span>'+
          '<div style="display:flex;gap:4px">'+
            '<button class="md-tool" data-wrap="**" style="padding:2px 8px;font-size:.75rem;border:1px solid var(--border);border-radius:4px;cursor:pointer;background:var(--muted);color:var(--muted-foreground)"><strong>B</strong></button>'+
            '<button class="md-tool" data-wrap="*" style="padding:2px 8px;font-size:.75rem;border:1px solid var(--border);border-radius:4px;cursor:pointer;background:var(--muted);color:var(--muted-foreground)"><em>I</em></button>'+
            '<button class="md-tool" data-wrap="`" style="padding:2px 8px;font-size:.75rem;border:1px solid var(--border);border-radius:4px;cursor:pointer;background:var(--muted);color:var(--muted-foreground)">&lt;/&gt;</button>'+
            '<button class="md-tool" data-wrap="[","](url)" style="padding:2px 8px;font-size:.75rem;border:1px solid var(--border);border-radius:4px;cursor:pointer;background:var(--muted);color:var(--muted-foreground)">🔗</button>'+
            '<button id="md-clear" style="padding:2px 8px;font-size:.75rem;border:1px solid var(--border);border-radius:4px;cursor:pointer;background:transparent;color:var(--muted-foreground)">🗑</button>'+
          '</div>'+
        '</div>'+
        '<textarea id="md-input" style="flex:1;width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:none;font-family:ui-monospace,monospace;line-height:1.6;min-height:350px;direction:ltr">'+
'# Markdown Preview\n\n'+
'## Typography\n'+
'**Bold**, *Italic*, ~~Strikethrough~~, `inline code`\n\n'+
'## Lists\n'+
'- Item one\n'+
'- Item two\n'+
'  - Nested item\n'+
'1. Ordered first\n'+
'2. Ordered second\n\n'+
'## Code Block\n'+
'```javascript\n'+
'function hello() {\n'+
'  console.log("Hello World!");\n'+
'}\n'+
'```\n\n'+
'## Table\n'+
'| Name | Type | Default |\n'+
'|------|------|--------|\n'+
'| port | number | 3000 |\n'+
'| host | string | localhost |\n\n'+
'> Blockquote example\n\n'+
'---\n\n'+
'[Visit GitHub](https://github.com)</textarea>'+
      '</div>'+
      '<div style="display:flex;flex-direction:column">'+
        '<div style="font-size:.8125rem;font-weight:500;margin-bottom:6px">'+(f,'پیش‌نمایش','Preview')+'</div>'+
        '<div id="md-preview" style="flex:1;padding:12px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);color:var(--foreground);overflow-y:auto;line-height:1.7;font-size:.875rem;min-height:350px"></div>'+
      '</div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var input = document.getElementById('md-input');
  var preview = document.getElementById('md-preview');
  if (!input||!preview) return;
  function render() {
    preview.innerHTML = mdToHtml(input.value);
  }
  // Toolbar buttons
  document.querySelectorAll('.md-tool').forEach(function(btn){
    btn.addEventListener('click', function(){
      var wrap = btn.dataset.wrap;
      var start = input.selectionStart, end = input.selectionEnd;
      var selected = input.value.slice(start, end);
      var before = input.value.slice(0, start);
      var after = input.value.slice(end);
      if (wrap.indexOf(',') !== -1) {
        var parts = wrap.split(',');
        input.value = before + parts[0] + selected + parts[1] + after;
      } else {
        input.value = before + wrap + selected + wrap + after;
      }
      input.focus();
      render();
    });
  });
  document.getElementById('md-clear').addEventListener('click', function(){ input.value=''; render(); });
  input.addEventListener('input', render);
  function mdToHtml(md) {
    var html = md
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      // Code blocks (fenced)
      .replace(/```(\w*)\n([\s\S]*?)```/g, function(m,lang,code){
        return '<pre style="padding:12px;background:var(--muted);border-radius:var(--radius);overflow-x:auto;font-size:.8125rem;line-height:1.5"><code>'+
          code.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</code></pre>';
      })
      // Inline code
      .replace(/`([^`]+)`/g, '<code style="background:var(--muted);padding:1px 5px;border-radius:4px;font-size:.85em">$1</code>')
      // Headings
      .replace(/^###### (.+)$/gm,'<h6 style="margin:12px 0 6px;font-size:.85rem">$1</h6>')
      .replace(/^##### (.+)$/gm,'<h5 style="margin:12px 0 6px;font-size:.9rem">$1</h5>')
      .replace(/^#### (.+)$/gm,'<h4 style="margin:14px 0 6px;font-size:1rem;font-weight:600">$1</h4>')
      .replace(/^### (.+)$/gm,'<h3 style="margin:16px 0 8px;font-size:1.1rem;font-weight:600">$1</h3>')
      .replace(/^## (.+)$/gm,'<h2 style="margin:18px 0 8px;font-size:1.25rem;font-weight:600">$1</h2>')
      .replace(/^# (.+)$/gm,'<h1 style="margin:20px 0 10px;font-size:1.5rem;font-weight:700">$1</h1>')
      // Strikethrough
      .replace(/~~(.+?)~~/g,'<del style="opacity:.6">$1</del>')
      // Bold + Italic combined
      .replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" style="max-width:100%;border-radius:var(--radius);margin:8px 0">')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:var(--action);text-decoration:underline">$1</a>')
      // Horizontal rule
      .replace(/^---$/gm,'<hr style="border:none;border-top:1px solid var(--border);margin:16px 0">')
      // Blockquotes
      .replace(/^&gt; (.+)$/gm,'<blockquote style="border-left:3px solid var(--action);padding:4px 12px;margin:8px 0;background:var(--muted);border-radius:0 var(--radius) var(--radius) 0;color:var(--muted-foreground)">$1</blockquote>')
      // Tables
      .replace(/\|(.+)\|[\s\S]*?\|(.+)\|/g, function(m){
        var rows = m.split('\n').filter(function(r){ return r.trim(); });
        if (rows.length<2) return m;
        var html = '<table style="width:100%;border-collapse:collapse;font-size:.8125rem;margin:8px 0"><thead><tr>';
        rows[0].split('|').filter(Boolean).forEach(function(c){ html += '<th style="padding:6px 8px;border:1px solid var(--border);background:var(--muted);font-weight:600">'+c.trim()+'</th>'; });
        html += '</tr></thead><tbody>';
        for (var i=2; i<rows.length; i++) {
          html += '<tr>';
          rows[i].split('|').filter(Boolean).forEach(function(c){ html += '<td style="padding:6px 8px;border:1px solid var(--border)">'+c.trim()+'</td>'; });
          html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
      })
      // Unordered lists
      .replace(/^(\s*)[-*]\s+(.+)$/gm, function(m,indent,item){
        var depth = Math.floor(indent.length/2);
        var tag = depth===0 ? 'ul' : 'ul';
        return '<li style="margin:2px 0;padding-left:'+(depth*16+8)+'px">'+item+'</li>';
      })
      // Ordered lists
      .replace(/^(\s*)\d+\.\s+(.+)$/gm, function(m,indent,item){
        var depth = Math.floor(indent.length/2);
        return '<li style="margin:2px 0;padding-left:'+(depth*16+8)+'px;list-style-type:decimal">'+item+'</li>';
      })
      // Paragraphs (double newline)
      .replace(/\n\n+/g, '</p><p style="margin:8px 0">')
      // Line breaks
      .replace(/\n/g, '<br>');
    return '<p style="margin:8px 0">'+html+'</p>';
  }
  render();
}
