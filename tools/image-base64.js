export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🖼️</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Image → Base64</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تبدیل تصویر به Base64 data URI','Convert images to Base64 data URIs')+'</p></div>'+
    '</div>'+
    '<div id="img-dropzone" style="border:2px dashed var(--border);border-radius:var(--radius);padding:40px 20px;text-align:center;cursor:pointer;transition:border-color .2s;margin-bottom:16px">'+
      '<div style="font-size:3rem;margin-bottom:8px">📁</div>'+
      '<div style="font-size:.875rem;color:var(--muted-foreground)">'+(f,'تصویر را بکشید و رها کنید یا کلیک کنید','Drop an image here or click to select')+'</div>'+
      '<input id="img-file-input" type="file" accept="image/*" style="display:none">'+
    '</div>'+
    '<div id="img-preview-area" style="display:none;margin-bottom:16px">'+
      '<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">'+
        '<img id="img-preview" style="max-width:120px;max-height:120px;border-radius:var(--radius);border:1px solid var(--border)">'+
        '<div style="font-size:.8125rem;line-height:1.8">'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'نام فایل','Filename')+':</span> <strong id="img-name"></strong></div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'نوع','Type')+':</span> <strong id="img-type"></strong></div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'سایز','Size')+':</span> <strong id="img-size"></strong></div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'Base64 طول','Base64 length')+':</span> <strong id="img-b64len"></strong></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div id="img-output-area" style="display:none">'+
      '<div style="display:flex;gap:8px;margin-bottom:8px">'+
        '<button id="img-copy-datauri" class="primary">'+(f,'کپی Data URI','Copy Data URI')+'</button>'+
        '<button id="img-copy-base64">'+(f,'کپی Base64 خام','Copy Raw Base64')+'</button>'+
        '<button id="img-clear">'+(f,'پاک کردن','Clear')+'</button>'+
      '</div>'+
      '<textarea id="img-output" rows="6" readonly style="width:100%;padding:12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.75rem;outline:none;resize:vertical;font-family:monospace;word-break:break-all;direction:ltr"></textarea>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var dz=document.getElementById('img-dropzone');
  var fi=document.getElementById('img-file-input');
  var pa=document.getElementById('img-preview-area');
  var pi=document.getElementById('img-preview');
  var nm=document.getElementById('img-name');
  var ty=document.getElementById('img-type');
  var sz=document.getElementById('img-size');
  var bl=document.getElementById('img-b64len');
  var oa=document.getElementById('img-output-area');
  var ot=document.getElementById('img-output');
  if(!dz)return;
  function handleFile(file){
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(e){
      var dataUri=e.target.result;
      var base64=dataUri.split(',')[1];
      pi.src=dataUri;
      nm.textContent=file.name;
      ty.textContent=file.type||(f,'نامشخص','Unknown');
      sz.textContent=file.size<1024?file.size+' B':file.size<1048576?(file.size/1024).toFixed(1)+' KB':(file.size/1048576).toFixed(2)+' MB';
      bl.textContent=base64.length.toLocaleString()+' chars';
      ot.value=dataUri;
      pa.style.display='block';
      oa.style.display='block';
    };
    reader.readAsDataURL(file);
  }
  dz.addEventListener('click',function(){fi.click();});
  dz.addEventListener('dragover',function(e){e.preventDefault();dz.style.borderColor='var(--action)';});
  dz.addEventListener('dragleave',function(){dz.style.borderColor='var(--border)';});
  dz.addEventListener('drop',function(e){
    e.preventDefault();
    dz.style.borderColor='var(--border)';
    if(e.dataTransfer.files.length)handleFile(e.dataTransfer.files[0]);
  });
  fi.addEventListener('change',function(){
    if(fi.files.length)handleFile(fi.files[0]);
  });
  document.getElementById('img-copy-datauri').addEventListener('click',function(){
    navigator.clipboard.writeText(ot.value);
  });
  document.getElementById('img-copy-base64').addEventListener('click',function(){
    navigator.clipboard.writeText(ot.value.split(',')[1]||'');
  });
  document.getElementById('img-clear').addEventListener('click',function(){
    pa.style.display='none';oa.style.display='none';ot.value='';fi.value='';pi.src='';
  });
}
