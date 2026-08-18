export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📊</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'مقایسه متن','Text Diff')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'مقایسه دو متن خط به خط','Compare two texts line by line')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">'+
      '<button id="diff-char" class="active" style="padding:6px 14px;border:1px solid var(--border);border-radius:var(--radius);background:var(--accent);color:var(--accent-foreground);font-size:.8125rem;cursor:pointer">'+(f,'حرف به حرف','Characters')+'</button>'+
      '<button id="diff-word" style="padding:6px 14px;border:1px solid var(--border);border-radius:var(--radius);background:transparent;color:var(--muted-foreground);font-size:.8125rem;cursor:pointer">'+(f,'کلمه به کلمه','Words')+'</button>'+
      '<button id="diff-line" style="padding:6px 14px;border:1px solid var(--border);border-radius:var(--radius);background:transparent;color:var(--muted-foreground);font-size:.8125rem;cursor:pointer">'+(f,'خط به خط','Lines')+'</button>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'متن A','Text A')+'</label>'+
      '<textarea id="diff-a" rows="8" style="width:100%;padding:10px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">Hello World\nThis is line one\nThis is line two\nThe end</textarea></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'متن B','Text B')+'</label>'+
      '<textarea id="diff-b" rows="8" style="width:100%;padding:10px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">Hello World\nThis is line X\nThis is line two\nThis is extra\nFinal line</textarea></div>'+
    '</div>'+
    '<div id="diff-output" style="padding:14px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;line-height:1.6;min-height:80px;white-space:pre-wrap;word-break:break-all"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var a=document.getElementById('diff-a');
  var b=document.getElementById('diff-b');
  var out=document.getElementById('diff-output');
  var mode='char';
  if(!a)return;
  document.getElementById('diff-char').addEventListener('click',function(){setMode('char');});
  document.getElementById('diff-word').addEventListener('click',function(){setMode('word');});
  document.getElementById('diff-line').addEventListener('click',function(){setMode('line');});
  function setMode(m){mode=m;document.querySelectorAll('#diff-char,#diff-word,#diff-line').forEach(function(el){el.style.background='transparent';el.style.color='var(--muted-foreground)';});var btn=document.getElementById('diff-'+m);if(btn){btn.style.background='var(--accent)';btn.style.color='var(--accent-foreground)';}diff();}
  function escape(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function diff(){
    var ta=a.value, tb=b.value;
    if(mode==='char') out.innerHTML = charDiff(ta, tb);
    else if(mode==='word') out.innerHTML = wordDiff(ta, tb);
    else out.innerHTML = lineDiff(ta, tb);
  }
  function charDiff(s1, s2){
    var i=0, len=Math.min(s1.length, s2.length);
    while(i<len && s1[i]===s2[i]) i++;
    var pre=escape(s1.slice(0,i));
    var s1rest=escape(s1.slice(i)), s2rest=escape(s2.slice(i));
    if(!s1rest&&!s2rest) return '<span style="color:var(--success)">✓ '+(f,'یکسان','Identical')+'</span>';
    return pre+'<span style="background:rgba(255,68,68,.25);border-radius:2px;padding:1px 2px">'+s1rest+'</span><span style="background:rgba(0,200,80,.25);border-radius:2px;padding:1px 2px">'+s2rest+'</span>';
  }
  function wordDiff(s1, s2){
    var w1=s1.split(/(\s+)/), w2=s2.split(/(\s+)/);
    var max=Math.max(w1.length, w2.length);
    var result='';
    for(var i=0;i<max;i++){
      if(i>=w1.length){result+='<span style="background:rgba(0,200,80,.3);border-radius:2px;padding:1px 2px">'+escape(w2[i])+'</span>';}
      else if(i>=w2.length){result+='<span style="background:rgba(255,68,68,.3);border-radius:2px;padding:1px 2px;text-decoration:line-through">'+escape(w1[i])+'</span>';}
      else if(w1[i]!==w2[i]){result+='<span style="background:rgba(255,68,68,.3);border-radius:2px;padding:1px 2px;text-decoration:line-through">'+escape(w1[i])+'</span><span style="background:rgba(0,200,80,.3);border-radius:2px;padding:1px 2px">'+escape(w2[i])+'</span>';}
      else result+=escape(w1[i]);
    }
    return result||'<span style="color:var(--success)">✓ '+(f,'یکسان','Identical')+'</span>';
  }
  function lineDiff(s1, s2){
    var l1=s1.split('\n'), l2=s2.split('\n');
    var max=Math.max(l1.length, l2.length);
    var result='';
    for(var i=0;i<max;i++){
      var num='<span style="color:var(--muted-foreground);display:inline-block;width:32px;text-align:right;margin-right:8px;font-size:.6875rem">'+(i+1)+'</span>';
      if(i>=l1.length) result+=num+'<span style="background:rgba(0,200,80,.25);border-radius:2px;display:block;padding:2px 4px;margin:1px 0">'+escape(l2[i])+'</span>';
      else if(i>=l2.length) result+=num+'<span style="background:rgba(255,68,68,.25);border-radius:2px;display:block;padding:2px 4px;margin:1px 0;text-decoration:line-through">'+escape(l1[i])+'</span>';
      else if(l1[i]!==l2[i]) result+=num+'<span style="background:rgba(255,68,68,.2);border-radius:2px;display:block;padding:2px 4px;margin:1px 0;text-decoration:line-through">'+escape(l1[i])+'</span>'+num+'<span style="background:rgba(0,200,80,.2);border-radius:2px;display:block;padding:2px 4px;margin:1px 0">'+escape(l2[i])+'</span>';
      else result+=num+'<span style="display:block;padding:2px 4px;margin:1px 0;color:var(--muted-foreground)">'+escape(l1[i])+'</span>';
    }
    return result||'<span style="color:var(--success)">✓ '+(f,'یکسان','Identical')+'</span>';
  }
  a.addEventListener('input',diff);
  b.addEventListener('input',diff);
  diff();
}
