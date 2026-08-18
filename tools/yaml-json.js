export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔄</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">YAML ↔ JSON</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تبدیل بین فرمت‌های YAML و JSON','Convert between YAML and JSON formats')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<button id="yj-json2yaml" class="primary" style="padding:8px 20px">JSON → YAML</button>'+
      '<button id="yj-yaml2json" style="padding:8px 20px">YAML → JSON</button>'+
      '<button id="yj-clear" style="padding:8px 20px;background:transparent;color:var(--muted-foreground)">'+(f,'پاک کردن','Clear')+'</button>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'ورودی','Input')+'</label>'+
        '<textarea id="yj-input" rows="12" style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr">{"name":"Maddix","version":1,"features":["tools","security","web"]}</textarea></div>'+
      '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'خروجی','Output')+'</label>'+
        '<textarea id="yj-output" rows="12" readonly style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--muted);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea></div>'+
    '</div>'+
    '<div style="margin-top:8px;padding:8px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground);text-align:center">'+
      (f,'JSON به YAML: کلیدهای غیررشته‌ای باید داخل "" باشند. YAML به JSON: فقط ساختارهای ساده پشتیبانی می‌شود.','JSON→YAML: Non-string keys need quotes. YAML→JSON: Simple structures only.')+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var input=document.getElementById('yj-input');
  var output=document.getElementById('yj-output');
  if(!input)return;
  function yamlEscape(s){
    if(/[:\{\}\[\],&\*\?\|<>=!%@`#]/.test(s)||/^\s/.test(s)||/\s$/.test(s)||s===''||s==='true'||s==='false'||s==='null'||s==='~'||/^\d/.test(s))return '"'+s.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
    return s;
  }
  function objToYaml(obj, indent){
    indent=indent||0;
    var pad='  '.repeat(indent);
    var result='';
    if(obj===null||obj===undefined) return pad+'null';
    if(typeof obj==='string') return pad+yamlEscape(obj);
    if(typeof obj==='number'||typeof obj==='boolean') return pad+obj;
    if(Array.isArray(obj)){
      if(obj.length===0) return pad+'[]';
      result='';
      obj.forEach(function(item,i){
        if(typeof item==='object'&&item!==null){
          result+=(i>0?'\n':'')+pad+'- '+objToYaml(item,indent+1).trim();
        } else {
          result+='\n'+pad+'- '+objToYaml(item,indent+1).trim();
        }
      });
      return result;
    }
    var keys=Object.keys(obj);
    if(keys.length===0) return pad+'{}';
    keys.forEach(function(key,i){
      var val=obj[key];
      var keyStr=/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)?key:'"'+key.replace(/"/g,'\\"')+'"';
      if(typeof val==='object'&&val!==null&&!Array.isArray(val)){
        var nested=objToYaml(val,indent+1);
        result+='\n'+pad+keyStr+':';
        if(Object.keys(val).length>0) result+='\n'+nested;else result+' {}';
      } else {
        result+='\n'+pad+keyStr+': '+objToYaml(val,0).trim();
      }
    });
    return result;
  }
  function jsonToYaml(){
    try{
      var obj=JSON.parse(input.value);
      var yaml=objToYaml(obj).trim();
      output.value=yaml||'{}';
    }catch(e){output.value=(f,'خطا:','Error: ')+e.message;}
  }
  function yamlToJson(){
    try{
      var yaml=input.value;
      var obj=parseYaml(yaml);
      output.value=JSON.stringify(obj,null,2);
    }catch(e){output.value=(f,'خطا:','Error: ')+e.message;}
  }
  function parseYaml(yaml){
    var lines=yaml.split('\n');
    var root={};
    var stack=[{obj:root,indent:-1}];
    var lastKey=null;
    var listMode=false;
    lines.forEach(function(line){
      if(/^\s*$/.test(line)||/^\s*#/.test(line))return;
      var m=line.match(/^(\s*)(-)?\s*(.*)/);
      var indent=Math.floor(m[1].length/2);
      var isListItem=m[2]==='-';
      var content=m[3].trim();
      while(indent<=stack[stack.length-1].indent)stack.pop();
      var current=stack[stack.length-1];
      if(isListItem){
        if(!Array.isArray(current.obj)){current.obj=[];current.obj._keys=current.obj._keys||[];}
        var item=parseYamlValue(content);
        current.obj.push(item);
        lastKey=current.obj.length-1;
      } else {
        var colonIdx=content.indexOf(':');
        if(colonIdx===-1)return;
        var key=content.slice(0,colonIdx).trim().replace(/^"(.*)"$/,'$1');
        var valStr=content.slice(colonIdx+1).trim();
        if(valStr===''){lastKey=key;var newObj={};current.obj[key]=newObj;stack.push({obj:newObj,indent:indent});}
        else {current.obj[key]=parseYamlValue(valStr);lastKey=key;}
      }
    });
    function parseYamlValue(s){
      if(s==='null'||s==='~')return null;
      if(s==='true')return true;
      if(s==='false')return false;
      if(/^\d+$/.test(s))return parseInt(s,10);
      if(/^\d+\.\d+$/.test(s))return parseFloat(s);
      if(/^"(.*)"$/.test(s))return s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');
      return s;
    }
    return root;
  }
  document.getElementById('yj-json2yaml').addEventListener('click',jsonToYaml);
  document.getElementById('yj-yaml2json').addEventListener('click',yamlToJson);
  document.getElementById('yj-clear').addEventListener('click',function(){input.value='';output.value='';});
}
