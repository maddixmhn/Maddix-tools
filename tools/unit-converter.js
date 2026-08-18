export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📐</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'مبدل واحد','Unit Converter')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تبدیل واحدهای طول، وزن، دما، مساحت، حجم، سرعت','Convert length, weight, temperature, area, volume, speed')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="uc-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-uctab="length">'+(f,'طول','Length')+'</button>'+
      '<button data-uctab="weight">'+(f,'وزن','Weight')+'</button>'+
      '<button data-uctab="temp">'+(f,'دما','Temp')+'</button>'+
      '<button data-uctab="area">'+(f,'مساحت','Area')+'</button>'+
      '<button data-uctab="volume">'+(f,'حجم','Volume')+'</button>'+
      '<button data-uctab="speed">'+(f,'سرعت','Speed')+'</button>'+
    '</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:end">'+
      '<div style="flex:1;min-width:140px"><label style="font-size:.75rem;font-weight:500;display:block;margin-bottom:4px;color:var(--muted-foreground)">'+(f,'از','From')+'</label><select id="uc-from" style="width:100%;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none"></select></div>'+
      '<div style="flex:1;min-width:140px"><label style="font-size:.75rem;font-weight:500;display:block;margin-bottom:4px;color:var(--muted-foreground)">'+(f,'به','To')+'</label><select id="uc-to" style="width:100%;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none"></select></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;align-items:end">'+
      '<div style="flex:1;min-width:140px"><label style="font-size:.75rem;font-weight:500;display:block;margin-bottom:4px;color:var(--muted-foreground)">'+(f,'مقدار','Value')+'</label><input id="uc-value" type="number" value="1" step="any" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
      '<div><button id="uc-swap" style="padding:8px 14px;margin-top:20px">⇄</button></div>'+
    '</div>'+
    '<div id="uc-result" style="padding:20px;background:var(--muted);border-radius:var(--radius);text-align:center"><span style="font-size:2rem;font-weight:700" id="uc-result-val"></span><div style="font-size:.875rem;color:var(--muted-foreground)" id="uc-result-label"></div></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var units={
    length:{m:{label:'Meter',base:1},km:{label:'Kilometer',base:1000},cm:{label:'Centimeter',base:.01},mm:{label:'Millimeter',base:.001},mi:{label:'Mile',base:1609.344},yd:{label:'Yard',base:.9144},ft:{label:'Foot',base:.3048},in:{label:'Inch',base:.0254},nm:{label:'Nautical Mile',base:1852}},
    weight:{kg:{label:'Kilogram',base:1},g:{label:'Gram',base:.001},mg:{label:'Milligram',base:1e-6},t:{label:'Metric Ton',base:1000},lb:{label:'Pound',base:.453592},oz:{label:'Ounce',base:.0283495},st:{label:'Stone',base:6.35029}},
    temp:{c:{label:'Celsius',base:'c'},f:{label:'Fahrenheit',base:'f'},k:{label:'Kelvin',base:'k'}},
    area:{m2:{label:'Square Meter',base:1},km2:{label:'Square km',base:1e6},ha:{label:'Hectare',base:10000},ac:{label:'Acre',base:4046.86},ft2:{label:'Square ft',base:.092903},in2:{label:'Square in',base:.00064516},mi2:{label:'Square mi',base:2589988}},
    volume:{l:{label:'Liter',base:1},ml:{label:'Milliliter',base:.001},m3:{label:'Cubic m',base:1000},gal:{label:'Gallon (US)',base:3.78541},qt:{label:'Quart',base:.946353},pt:{label:'Pint',base:.473176},cup:{label:'Cup',base:.236588},floz:{label:'Fluid oz',base:.0295735},tbsp:{label:'Tablespoon',base:.0147868},tsp:{label:'Teaspoon',base:.00492892}},
    speed:{mps:{label:'m/s',base:1},kph:{label:'km/h',base:.277778},mph:{label:'mph',base:.44704},kn:{label:'Knot',base:.514444},ftps:{label:'ft/s',base:.3048},mach:{label:'Mach',base:343}},
  };
  var tabBtns=document.querySelectorAll('#uc-tabs button');
  var fromSel=document.getElementById('uc-from');
  var toSel=document.getElementById('uc-to');
  var valInput=document.getElementById('uc-value');
  var resultVal=document.getElementById('uc-result-val');
  var resultLabel=document.getElementById('uc-result-label');
  var currentCat='length';
  if(!fromSel)return;
  function populate(cat){
    var u=units[cat];
    if(!u)return;
    var keys=Object.keys(u);
    fromSel.innerHTML=keys.map(function(k,i){return '<option value="'+k+'"'+(i===0?' selected':'')+'>'+u[k].label+' ('+k+')</option>';}).join('');
    toSel.innerHTML=keys.map(function(k,i){return '<option value="'+k+'"'+(i===1?' selected':'')+'>'+u[k].label+' ('+k+')</option>';}).join('');
  }
  function convert(){
    var cat=currentCat;
    var u=units[cat];
    if(!u)return;
    var from=fromSel.value;
    var to=toSel.value;
    var val=parseFloat(valInput.value);
    if(isNaN(val)){resultVal.textContent='-';resultLabel.textContent='';return;}
    var result;
    if(cat==='temp'){
      var celsius;
      if(from==='c')celsius=val;
      else if(from==='f')celsius=(val-32)*5/9;
      else if(from==='k')celsius=val-273.15;
      if(to==='c')result=celsius;
      else if(to==='f')result=celsius*9/5+32;
      else if(to==='k')result=celsius+273.15;
    }else{
      var baseVal=val*u[from].base;
      result=baseVal/u[to].base;
    }
    var formatted=result<1e-6?result.toExponential(4):result<1?result.toFixed(6):result<100?result.toFixed(4):result<1e6?result.toFixed(2):result.toExponential(3);
    resultVal.textContent=formatted;
    resultLabel.textContent=valInput.value+' '+u[from].label+' = '+formatted+' '+u[to].label;
  }
  tabBtns.forEach(function(btn){
    btn.addEventListener('click',function(){
      tabBtns.forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      currentCat=btn.dataset.uctab;
      populate(currentCat);
      convert();
    });
  });
  document.getElementById('uc-swap').addEventListener('click',function(){
    var t=fromSel.value;fromSel.value=toSel.value;toSel.value=t;convert();
  });
  fromSel.addEventListener('change',convert);
  toSel.addEventListener('change',convert);
  valInput.addEventListener('input',convert);
  populate('length');
}
