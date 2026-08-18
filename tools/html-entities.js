export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔣</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">HTML Entities</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'انکود و دیکد HTML entities','Encode and decode HTML entities')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<button id="he-encode" class="primary" style="padding:8px 20px">Encode →</button>'+
      '<button id="he-decode" style="padding:8px 20px">Decode →</button>'+
      '<button id="he-clear" style="padding:8px 20px;background:transparent;color:var(--muted-foreground)">'+(f,'پاک کردن','Clear')+'</button>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'ورودی','Input')+'</label>'+
        '<textarea id="he-input" rows="8" style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"><b>Hello</b> & "World" <br> It\'s 5 < 10</textarea></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'خروجی','Output')+'</label>'+
        '<textarea id="he-output" rows="8" readonly style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--muted);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea></div>'+
    '</div>'+
    '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">'+
      '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px"><input type="checkbox" id="he-named"> '+(f,'فقط named entities (مثال: &amp;)','Named entities only')+'</label>'+
      '<button id="he-copy" style="padding:4px 12px;font-size:.75rem">'+(f,'کپی','Copy')+'</button>'+
    '</div>'+
    '<div style="margin-top:12px;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-size:.75rem;line-height:1.8" id="he-ref">'+
      '<div style="font-weight:500;margin-bottom:4px">'+(f,'Entities پرکاربرد','Common entities')+':</div>'+
      '<table style="width:100%"><tr><td>&amp;amp;</td><td>&amp;nbsp;</td><td>&amp;lt;</td><td>&amp;gt;</td><td>&amp;quot;</td><td>&amp;apos;</td><td>&amp;copy;</td><td>&amp;trade;</td></tr></table>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('he-input');
  var output=document.getElementById('he-output');
  if(!input)return;
  var namedEntities={'&':'amp','<':'lt','>':'gt','"':'quot',"'":"apos",'¢':'cent','£':'pound','¥':'yen','€':'euro','©':'copy','®':'reg','™':'trade','°':'deg','±':'plusmn','×':'times','÷':'divide','•':'bull','·':'middot','✓':'check','→':'rarr','←':'larr','↑':'uarr','↓':'darr','∞':'infin','♥':'hearts','★':'star','♪':'music','✓':'check','✕':'cross'};
  function encodeHTML(s, namedOnly){
    var result='';
    for(var i=0;i<s.length;i++){
      var ch=s[i];
      var code=s.charCodeAt(i);
      if(namedOnly&&namedEntities[ch]){result+='&'+namedEntities[ch]+';';}
      else if(ch==='&'){result+='&amp;';}
      else if(ch==='<'){result+='&lt;';}
      else if(ch==='>'){result+='&gt;';}
      else if(ch==='"'){result+='&quot;';}
      else if(ch==="'"){result+='&apos;';}
      else if(code>127&&code<256){result+='&#'+code+';';}
      else if(code>=256){result+='&#'+code+';';}
      else{result+=ch;}
    }
    return result;
  }
  function decodeHTML(s){
    var d=document.createElement('textarea');
    d.innerHTML=s;
    return d.value;
  }
  document.getElementById('he-encode').addEventListener('click',function(){
    var namedOnly=document.getElementById('he-named').checked;
    output.value=encodeHTML(input.value,namedOnly);
  });
  document.getElementById('he-decode').addEventListener('click',function(){
    output.value=decodeHTML(input.value);
  });
  document.getElementById('he-clear').addEventListener('click',function(){input.value='';output.value='';});
  document.getElementById('he-copy').addEventListener('click',function(){navigator.clipboard.writeText(output.value);});
}
