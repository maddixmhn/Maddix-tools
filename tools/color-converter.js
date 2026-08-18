export default function(lang) {
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🎨</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Color Converter</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">HEX, RGB, HSL conversion</p></div>'+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:12px">'+
      '<div style="flex:1;min-width:160px"><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">HEX</label><div style="display:flex;gap:4px"><span style="padding:10px 4px;opacity:.5">#</span><input id="clr-hex" value="6366f1" style="flex:1;padding:10px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;text-transform:uppercase"></div></div>'+
      '<div style="flex:1;min-width:160px"><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">RGB</label><input id="clr-rgb" value="99,102,241" style="width:100%;padding:10px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace"></div>'+
      '<div style="flex:1;min-width:160px"><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">HSL</label><input id="clr-hsl" value="239,80%,67%" style="width:100%;padding:10px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace"></div>'+
    '</div>'+
    '<div style="margin-top:16px;display:flex;gap:16px;align-items:center;flex-wrap:wrap">'+
      '<div id="clr-preview" style="width:72px;height:72px;border-radius:var(--radius);border:2px solid var(--border);background:#6366f1;flex-shrink:0"></div>'+
      '<div style="font-size:.8125rem;line-height:1.8">'+
        '<div><span style="color:var(--muted-foreground)">Name:</span> <strong id="clr-name">Indigo</strong></div>'+
        '<div><span style="color:var(--muted-foreground)">Complement:</span> <span id="clr-comp" style="display:inline-flex;align-items:center;gap:6px"><span id="clr-comp-preview" style="display:inline-block;width:18px;height:18px;border-radius:4px;background:#f16366;border:1px solid var(--border);vertical-align:middle"></span><strong id="clr-comp-hex">#F16366</strong></span></div>'+
      '</div>'+
    '</div>'+
    '<div style="margin-top:16px"><div style="display:flex;gap:2px;border-radius:6px;overflow:hidden;height:28px" id="clr-gradient"></div></div>'+
  '</div>';
}
export function init(lang) {
  var hex = document.getElementById('clr-hex');
  var rgb = document.getElementById('clr-rgb');
  var hsl = document.getElementById('clr-hsl');
  var preview = document.getElementById('clr-preview');
  var cname = document.getElementById('clr-name');
  var compHex = document.getElementById('clr-comp-hex');
  var compPrev = document.getElementById('clr-comp-preview');
  var grad = document.getElementById('clr-gradient');
  if (!hex) return;
  var cNames = {'000000':'Black','ffffff':'White','ff0000':'Red','00ff00':'Lime','0000ff':'Blue','ffff00':'Yellow','ff00ff':'Magenta','00ffff':'Cyan','c0c0c0':'Silver','808080':'Gray','800000':'Maroon','808000':'Olive','008000':'Green','800080':'Purple','008080':'Teal','000080':'Navy','6366f1':'Indigo','f44336':'Red','e91e63':'Pink','9c27b0':'Purple','673ab7':'Deep Purple','3f51b5':'Indigo','2196f3':'Blue','03a9f4':'Light Blue','00bcd4':'Cyan','009688':'Teal','4caf50':'Green','8bc34a':'Light Green','cddc39':'Lime','ffeb3b':'Yellow','ffc107':'Amber','ff9800':'Orange','ff5722':'Deep Orange','795548':'Brown','9e9e9e':'Grey','607d8b':'Blue Grey'};
  function toHex(r,g,b){ return ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase(); }
  function parseHex(h){
    h=h.replace('#','').trim();
    if (h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    if (h.length!==6&&h.length!==8) return null;
    var r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
    return isNaN(r)||isNaN(g)||isNaN(b)?null:{r,g,b};
  }
  function rgb2hsl(r,g,b){
    r/=255;g/=255;b/=255;
    var M=Math.max(r,g,b),m=Math.min(r,g,b),d=M-m;
    var h,s,l=(M+m)/2;
    if(d===0) h=0;else if(M===r) h=((g-b)/d+(g<b?6:0))/6;else if(M===g) h=((b-r)/d+2)/6;else h=((r-g)/d+4)/6;
    s=l>0.5?d/(2-M-m):d/(M+m);
    return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
  }
  function hsl2rgb(h,s,l){
    s/=100;l/=100;
    var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;
    var r,g,b;
    if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else[r,g,b]=[c,0,x];
    return {r:Math.round((r+m)*255),g:Math.round((g+m)*255),b:Math.round((b+m)*255)};
  }
  function setColor(r,g,b){
    var hx=toHex(r,g,b),hs=rgb2hsl(r,g,b);
    hex.value=hx; rgb.value=r+','+g+','+b; hsl.value=hs.h+','+hs.s+'%,'+hs.l+'%';
    preview.style.background='#'+hx;
    cname.textContent=cNames[hx]||cNames[hx.slice(0,6)]||'Unknown';
    var cr=255-r,cg=255-g,cb=255-b,chx=toHex(cr,cg,cb);
    compHex.textContent='#'+chx; compPrev.style.background='#'+chx;
    if(grad){
      var html='';
      for(var i=0;i<24;i++){var t=i/23;html+='<div style="flex:1;background:rgb('+Math.round(r+(255-r)*t)+','+Math.round(g+(255-g)*t)+','+Math.round(b+(255-b)*t)+')"></div>';}
      grad.innerHTML=html;
    }
  }
  var timer;
  function deb(fn){ clearTimeout(timer);timer=setTimeout(fn,80); }
  hex.addEventListener('input',function(){
    deb(function(){
      var p=parseHex(hex.value);
      if(p) setColor(p.r,p.g,p.b);
    });
  });
  rgb.addEventListener('input',function(){
    deb(function(){
      var p=rgb.value.split(',').map(Number);
      if(p.length>=3&&!p.some(isNaN)) setColor(Math.max(0,Math.min(255,p[0])),Math.max(0,Math.min(255,p[1])),Math.max(0,Math.min(255,p[2])));
    });
  });
  hsl.addEventListener('input',function(){
    deb(function(){
      var p=hsl.value.replace(/%/g,'').split(',').map(Number);
      if(p.length>=3&&!p.some(isNaN)){var c=hsl2rgb(((p[0]%360)+360)%360,Math.max(0,Math.min(100,p[1])),Math.max(0,Math.min(100,p[2])));setColor(c.r,c.g,c.b);}
    });
  });
  setColor(99,102,241);
}
