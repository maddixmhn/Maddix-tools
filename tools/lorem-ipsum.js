export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📄</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Lorem Ipsum</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تولید متن placeholder','Generate placeholder text')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;align-items:end">'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'نوع','Type')+'</label>'+
        '<select id="lorem-type" style="padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none">'+
          '<option value="words">'+(f,'کلمات','Words')+'</option>'+
          '<option value="sentences" selected>'+(f,'جملات','Sentences')+'</option>'+
          '<option value="paragraphs">'+(f,'پاراگراف','Paragraphs')+'</option>'+
        '</select></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تعداد','Count')+'</label>'+
        '<input id="lorem-count" type="number" value="3" min="1" max="100" style="width:80px;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none"></div>'+
      '<div><button id="lorem-gen" class="primary" style="padding:8px 20px">'+(f,'تولید','Generate')+'</button></div>'+
      '<div><button id="lorem-copy" style="padding:8px 20px">'+(f,'کپی','Copy')+'</button></div>'+
    '</div>'+
    '<textarea id="lorem-output" rows="10" readonly style="width:100%;padding:14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:Georgia,serif;line-height:1.7;direction:ltr"></textarea>'+
  '</div>';
}
export function init(lang) {
  var words=['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat','duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];
  var type=document.getElementById('lorem-type');
  var count=document.getElementById('lorem-count');
  var output=document.getElementById('lorem-output');
  var genBtn=document.getElementById('lorem-gen');
  if(!output)return;
  function rand(n){return Math.floor(Math.random()*n);}
  function pick(arr){return arr[rand(arr.length)];}
  function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}
  function genWords(n){
    var result=[];
    for(var i=0;i<n;i++)result.push(pick(words));
    return result.join(' ');
  }
  function genSentences(n){
    var result=[];
    for(var i=0;i<n;i++){
      var wc=rand(8)+5;
      var sent=[];
      for(var j=0;j<wc;j++)sent.push(pick(words));
      sent[0]=capitalize(sent[0]);
      result.push(sent.join(' ')+'.');
    }
    return result.join(' ');
  }
  function genParagraphs(n){
    var result=[];
    for(var i=0;i<n;i++){
      var sc=rand(3)+3;
      var para='';
      for(var j=0;j<sc;j++){
        var wc=rand(10)+8;
        var sent=[];
        for(var k=0;k<wc;k++)sent.push(pick(words));
        sent[0]=capitalize(sent[0]);
        para+=sent.join(' ')+'. ';
      }
      result.push(para.trim());
    }
    return result.join('\n\n');
  }
  function generate(){
    var t=type.value;
    var c=parseInt(count.value)||3;
    var result='';
    switch(t){
      case 'words':result=genWords(c);break;
      case 'sentences':result=genSentences(c);break;
      case 'paragraphs':result=genParagraphs(c);break;
    }
    output.value=result;
  }
  genBtn.addEventListener('click',generate);
  document.getElementById('lorem-copy').addEventListener('click',function(){navigator.clipboard.writeText(output.value);});
  generate();
}
