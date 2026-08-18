export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📝</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'ابزار متن':'Text Tools')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'دستکاری و تبدیل متن':'Manipulate & convert text')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">'+
      '<button class="ta" data-a="upper" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">UPPER</button>'+
      '<button class="ta" data-a="lower" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">lower</button>'+
      '<button class="ta" data-a="cap" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">Capitalize</button>'+
      '<button class="ta" data-a="camel" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">camelCase</button>'+
      '<button class="ta" data-a="snake" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">snake_case</button>'+
      '<button class="ta" data-a="kebab" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">kebab-case</button>'+
      '<button class="ta" data-a="rev" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">Reverse</button>'+
      '<button class="ta" data-a="stats" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">📊 Stats</button>'+
      '<button class="ta" data-a="sort" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">↕ Sort</button>'+
      '<button class="ta" data-a="dedup" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">⊘ Dedup</button>'+
      '<button class="ta" data-a="trim" style="padding:5px 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);cursor:pointer;font-size:.75rem">✂ Trim</button>'+
    '</div>'+
    '<textarea id="ti" rows="6" placeholder="'+(f?'متن را وارد کنید':'Enter text')+'" style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;margin-bottom:12px;direction:ltr"></textarea>'+
    '<div style="display:flex;gap:8px;margin-bottom:12px">'+
      '<button id="tcopy" style="padding:8px 16px;border:none;border-radius:var(--radius);background:var(--action);color:#fff;font-size:.8125rem;cursor:pointer">📋 '+(f?'کپی':'Copy')+'</button>'+
      '<button id="tclear" style="padding:8px 16px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;cursor:pointer">🗑 '+(f?'پاک':'Clear')+'</button>'+
    '</div>'+
    '<textarea id="to" rows="6" placeholder="'+(f?'خروجی':'Output')+'" readonly style="width:100%;padding:10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--muted);color:var(--foreground);font-size:.875rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
  '</div>';
}
export function init(lang) {
  var f = lang === 'fa';
  var inp = document.getElementById('ti');
  var out = document.getElementById('to');
  if (!inp||!out) return;
  document.querySelectorAll('.ta').forEach(function(b){
    b.addEventListener('click', function(){
      var a = b.dataset.a;
      var t = inp.value;
      if (!t) return;
      switch(a) {
        case 'upper': out.value = t.toUpperCase(); break;
        case 'lower': out.value = t.toLowerCase(); break;
        case 'cap': out.value = t.replace(/\b\w/g, function(c){ return c.toUpperCase(); }); break;
        case 'camel': out.value = t.replace(/[-_\s.]+(.)?/g, function(_,c){ return c?c.toUpperCase():''; }).replace(/^[A-Z]/,function(c){return c.toLowerCase();}); break;
        case 'snake': out.value = t.replace(/([A-Z])/g,'_$1').replace(/[-.\s]+/g,'_').replace(/^_/,'').toLowerCase(); break;
        case 'kebab': out.value = t.replace(/([A-Z])/g,'-$1').replace(/[_\s.]+/g,'-').replace(/^-/,'').toLowerCase(); break;
        case 'rev': out.value = t.split('').reverse().join(''); break;
        case 'stats': {
          var l = t.split('\n');
          var c = t.length;
          var w = t.trim() ? t.trim().split(/\s+/).length : 0;
          var ne = l.filter(function(x){return x.trim();}).length;
          var b = new TextEncoder().encode(t).length;
          out.value = 'Chars: '+c+'\nWords: '+w+'\nLines: '+l.length+'\nNon-empty: '+ne+'\nBytes: '+b;
          break;
        }
        case 'sort': out.value = t.split('\n').sort(function(a,b){return a.localeCompare(b);}).join('\n'); break;
        case 'dedup': { var s={}; out.value = t.split('\n').filter(function(x){return s[x]?false:(s[x]=true);}).join('\n'); break; }
        case 'trim': out.value = t.split('\n').map(function(x){return x.trim();}).join('\n'); break;
      }
    });
  });
  document.getElementById('tcopy').addEventListener('click', function(){
    if (out.value) navigator.clipboard.writeText(out.value).catch(function(){});
  });
  document.getElementById('tclear').addEventListener('click', function(){ inp.value=''; out.value=''; });
}
