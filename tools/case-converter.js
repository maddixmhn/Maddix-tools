export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔤</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'تبدیل حروف','Case Converter')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تبدیل بین انواع casing مختلف','Convert between different text casing styles')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<textarea id="cc-input" rows="4" placeholder="'+(f,'متن را وارد کنید...','Enter your text...')+'" style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">the quick brown fox jumps over the lazy dog</textarea>'+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">'+
      '<button data-case="upper" class="primary" style="padding:6px 14px">UPPER CASE</button>'+
      '<button data-case="lower" style="padding:6px 14px">lower case</button>'+
      '<button data-case="title" style="padding:6px 14px">Title Case</button>'+
      '<button data-case="sentence" style="padding:6px 14px">Sentence case</button>'+
      '<button data-case="camel" style="padding:6px 14px">camelCase</button>'+
      '<button data-case="pascal" style="padding:6px 14px">PascalCase</button>'+
      '<button data-case="snake" style="padding:6px 14px">snake_case</button>'+
      '<button data-case="kebab" style="padding:6px 14px">kebab-case</button>'+
      '<button data-case="toggle" style="padding:6px 14px">tOGGLE cASE</button>'+
      '<button data-case="invert" style="padding:6px 14px">Invert</button>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'نتیجه','Result')+'</label>'+
      '<textarea id="cc-output" rows="3" readonly style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--muted);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
    '</div>'+
    '<div style="display:flex;gap:8px">'+
      '<button id="cc-copy" style="padding:6px 14px">'+(f,'کپی','Copy')+'</button>'+
      '<span id="cc-stats" style="font-size:.75rem;color:var(--muted-foreground);align-self:center"></span>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('cc-input');
  var output=document.getElementById('cc-output');
  var stats=document.getElementById('cc-stats');
  if(!input)return;
  function convert(type){
    var text=input.value;
    var result='';
    switch(type){
      case 'upper':result=text.toUpperCase();break;
      case 'lower':result=text.toLowerCase();break;
      case 'title':result=text.replace(/\w\S*/g,function(w){return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();});break;
      case 'sentence':result=text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,function(c){return c.toUpperCase();});break;
      case 'camel':result=text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,function(m,c){return c.toUpperCase();});break;
      case 'pascal':result=text.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(.)/g,function(m,c){return c.toUpperCase();});break;
      case 'snake':result=text.replace(/\s+/g,'_').replace(/-/g,'_').toLowerCase();break;
      case 'kebab':result=text.replace(/\s+/g,'-').replace(/_/g,'-').toLowerCase();break;
      case 'toggle':result=text.split('').map(function(c){return c===c.toUpperCase()?c.toLowerCase():c.toUpperCase();}).join('');break;
      case 'invert':result=text.split('').reverse().join('');break;
    }
    output.value=result;
    var chars=result.length;
    var words=result.trim()?result.trim().split(/\s+/).length:0;
    stats.textContent=chars+' '+(f,'کاراکتر','chars')+' · '+words+' '+(f,'کلمه','words');
  }
  document.querySelectorAll('[data-case]').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-case]').forEach(function(b){b.style.background='';b.style.color='';});
      btn.style.background='var(--action)';btn.style.color='#fff';
      convert(btn.dataset.case);
    });
  });
  document.getElementById('cc-copy').addEventListener('click',function(){navigator.clipboard.writeText(output.value);});
  input.addEventListener('input',function(){var active=document.querySelector('[data-case].primary')||document.querySelector('[data-case]');if(active)convert(active.dataset.case);});
  convert('upper');
}
