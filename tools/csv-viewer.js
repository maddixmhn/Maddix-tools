export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📊</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">CSV Viewer</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'نمایش داده‌های CSV به صورت جدول','Parse and display CSV data as a table')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center">'+
      '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px">'+(f,'محدودکننده:','Delimiter:')+
        '<select id="csv-delim" style="padding:6px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none">'+
          '<option value=",">Comma (,)</option>'+
          '<option value=";">Semicolon (;)</option>'+
          '<option value="\t">Tab</option>'+
          '<option value="|">Pipe (|)</option>'+
        '</select></label>'+
      '<label style="font-size:.8125rem;display:flex;align-items:center;gap:4px">'+
        '<input type="checkbox" id="csv-header" checked> '+(f,'ردیف اول هدر','First row is header')+'</label>'+
      '<button id="csv-parse" class="primary">'+(f,'بارگذاری','Parse')+'</button>'+
      '<button id="csv-clear">'+(f,'پاک کردن','Clear')+'</button>'+
    '</div>'+
    '<textarea id="csv-input" rows="8" placeholder="name,age,city&#10;Alice,30,New York&#10;Bob,25,London&#10;Charlie,35,Tehran" style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
    '<div style="margin-top:12px;overflow-x:auto" id="csv-table-container">'+
      '<div style="padding:16px;text-align:center;color:var(--muted-foreground);font-size:.875rem">'+(f,'CSV را وارد کنید و Parse را بزنید','Enter CSV data and click Parse')+'</div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('csv-input');
  var delim=document.getElementById('csv-delim');
  var headerCb=document.getElementById('csv-header');
  var container=document.getElementById('csv-table-container');
  if(!input)return;
  function parseCSV(text, delimChar, hasHeader){
    var rows=[];
    var inQuote=false;
    var row=[''];
    for(var i=0;i<text.length;i++){
      var ch=text[i];
      var next=text[i+1];
      if(inQuote){
        if(ch==='"'){if(next==='"'){row[row.length-1]+='"';i++;}else inQuote=false;}
        else row[row.length-1]+=ch;
      } else {
        if(ch==='"')inQuote=true;
        else if(ch===delimChar){row.push('');}
        else if(ch==='\n'){rows.push(row.slice());row=[''];if(next==='\r')i++;}
        else if(ch==='\r'){rows.push(row.slice());row=[''];if(next==='\n')i++;}
        else row[row.length-1]+=ch;
      }
    }
    if(row.length>1||row[0]!=='')rows.push(row);
    var headers=hasHeader&&rows.length>0?rows.shift():null;
    for(var j=0;j<rows.length;j++){
      while(headers&&rows[j].length<headers.length)rows[j].push('');
    }
    return {headers:headers,rows:rows};
  }
  function render(){
    var text=input.value;
    if(!text.trim()){container.innerHTML='<div style="padding:16px;text-align:center;color:var(--muted-foreground)">'+(f,'CSV را وارد کنید و Parse را بزنید','Enter CSV data and click Parse')+'</div>';return;}
    var d=delim.value;
    var hasHeader=headerCb.checked;
    try{
      var parsed=parseCSV(text,d,hasHeader);
      if(parsed.rows.length===0){container.innerHTML='<div style="padding:16px;text-align:center;color:var(--warning)">'+(f,'داده‌ای یافت نشد','No data found')+'</div>';return;}
      var html='<table style="width:100%;border-collapse:collapse;font-size:.8125rem">';
      if(parsed.headers){
        html+='<thead><tr>';
        parsed.headers.forEach(function(h){
          html+='<th style="padding:8px 10px;border:1px solid var(--border);background:var(--secondary);font-weight:600;white-space:nowrap">'+escapeHtml(h)+'</th>';
        });
        html+='</tr></thead>';
      }
      html+='<tbody>';
      parsed.rows.forEach(function(row,i){
        html+='<tr'+(i%2===1?' style="background:var(--muted)"':'')+'>';
        var cols=parsed.headers?parsed.headers.length:row.length;
        for(var j=0;j<cols;j++){
          html+='<td style="padding:6px 10px;border:1px solid var(--border)">'+escapeHtml(row[j]||'')+'</td>';
        }
        html+='</tr>';
      });
      html+='</tbody></table>';
      html+='<div style="margin-top:8px;font-size:.75rem;color:var(--muted-foreground);text-align:center">'+parsed.rows.length+' '+(f,'ردیف','rows')+(parsed.headers?' &middot; '+parsed.headers.length+' '+(f,'ستون','columns'):'')+'</div>';
      container.innerHTML=html;
    }catch(e){
      container.innerHTML='<div style="padding:16px;text-align:center;color:#ff4444">'+(f,'خطا:','Error:')+' '+e.message+'</div>';
    }
  }
  function escapeHtml(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
  document.getElementById('csv-parse').addEventListener('click',render);
  document.getElementById('csv-clear').addEventListener('click',function(){input.value='';container.innerHTML='<div style="padding:16px;text-align:center;color:var(--muted-foreground)">'+(f,'CSV را وارد کنید و Parse را بزنید','Enter CSV data and click Parse')+'</div>';});
  // Parse on input after 500ms debounce
  var timer;
  input.addEventListener('input',function(){clearTimeout(timer);timer=setTimeout(render,500);});
  delim.addEventListener('change',render);
  headerCb.addEventListener('change',render);
}
