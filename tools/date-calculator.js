export default function(lang) {
  var f=lang==='fa';
  var today=new Date().toISOString().slice(0,10);
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📅</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'محاسبه تاریخ','Date Calculator')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'محاسبه فاصله بین دو تاریخ، جمع و تفریق روز','Calculate days between dates, add/subtract days')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="dc-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-dctab="diff">'+(f,'فاصله','Diff')+'</button>'+
      '<button data-dctab="addsub">'+(f,'جمع/تفریق','Add/Sub')+'</button>'+
      '<button data-dctab="age">'+(f,'سن','Age')+'</button>'+
    '</div>'+
    '<div class="dctab-content" data-dctab="diff">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تاریخ شروع','Start date')+'</label><input id="dc-start" type="date" value="'+(new Date(Date.now()-864e5*7).toISOString().slice(0,10))+'" style="width:100%;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تاریخ پایان','End date')+'</label><input id="dc-end" type="date" value="'+today+'" style="width:100%;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
      '</div>'+
      '<div id="dc-diff-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:1.8"></div>'+
    '</div>'+
    '<div class="dctab-content" data-dctab="addsub" style="display:none">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تاریخ','Date')+'</label><input id="dc-base" type="date" value="'+today+'" style="width:100%;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'مقدار','Amount')+'</label><input id="dc-amount" type="number" value="14" style="width:100%;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
      '</div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">'+
        '<button id="dc-add-days" class="primary">+'+(f,'روز','days')+'</button>'+
        '<button id="dc-sub-days">-'+(f,'روز','days')+'</button>'+
        '<button id="dc-add-months">+'+(f,'ماه','months')+'</button>'+
        '<button id="dc-sub-months">-'+(f,'ماه','months')+'</button>'+
        '<button id="dc-add-years">+'+(f,'سال','years')+'</button>'+
        '<button id="dc-sub-years">-'+(f,'سال','years')+'</button>'+
      '</div>'+
      '<div id="dc-add-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:1.8"></div>'+
    '</div>'+
    '<div class="dctab-content" data-dctab="age" style="display:none">'+
      '<div style="margin-bottom:12px">'+
        '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تاریخ تولد','Birth date')+'</label>'+
        '<input id="dc-birth" type="date" value="1990-01-01" style="padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '</div>'+
      '<div id="dc-age-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:1.8"></div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  document.querySelectorAll('#dc-tabs button').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('#dc-tabs button').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      document.querySelectorAll('.dctab-content').forEach(function(el){el.style.display='none';});
      var t=document.querySelector('.dctab-content[data-dctab="'+btn.dataset.dctab+'"]');
      if(t)t.style.display='block';
      if(btn.dataset.dctab==='diff')calcDiff();
      else if(btn.dataset.dctab==='age')calcAge();
    });
  });
  function daysBetween(a,b){
    var ms=Math.abs(new Date(b)-new Date(a));
    return Math.floor(ms/86400000);
  }
  function calcDiff(){
    var s=document.getElementById('dc-start').value;
    var e=document.getElementById('dc-end').value;
    var r=document.getElementById('dc-diff-result');
    if(!s||!e){r.innerHTML='';return;}
    var d1=new Date(s),d2=new Date(e);
    var days=daysBetween(d1,d2);
    var weeks=Math.floor(days/7);
    var months=(d2.getFullYear()-d1.getFullYear())*12+(d2.getMonth()-d1.getMonth());
    if(d2.getDate()<d1.getDate())months--;
    var years=Math.floor(months/12);
    var remMonths=months%12;
    if(years<0){years=0;remMonths=0;}
    r.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'روز','Days')+':</span> <strong style="font-size:1.5rem;color:var(--success)">'+days.toLocaleString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'هفته','Weeks')+':</span> <strong>'+weeks+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'ماه','Months')+':</span> <strong>'+months+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'سال','Years')+':</span> <strong>'+(months/12).toFixed(1)+'</strong></div>'+
      '<div style="grid-column:1/-1;padding:8px;background:var(--card);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground)">'+(f,'اگر','If')+' '+days+' '+(f,'روز را به ساعت تبدیل کنیم','days were converted to hours')+': <strong>'+(days*24).toLocaleString()+'h</strong> / '+(f,'دقیقه','minutes')+': <strong>'+(days*1440).toLocaleString()+'m</strong></div>'+
    '</div>';
  }
  function calcAddSub(type,amount){
    var base=document.getElementById('dc-base').value;
    var r=document.getElementById('dc-add-result');
    if(!base){r.innerHTML='';return;}
    var d=new Date(base);
    var orig=d.toString();
    if(type==='days')d.setDate(d.getDate()+amount);
    else if(type==='months')d.setMonth(d.getMonth()+amount);
    else if(type==='years')d.setFullYear(d.getFullYear()+amount);
    var sign=amount>=0?'+':'';
    r.innerHTML='<div><span style="color:var(--muted-foreground)">'+(f,'تاریخ اولیه','Original')+':</span> <strong>'+base+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'عملیات','Operation')+':</span> <strong>'+sign+amount+' '+(type)+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'نتیجه','Result')+':</span> <strong style="font-size:1.2rem;color:var(--success)">'+d.toISOString().slice(0,10)+'</strong></div>'+
      '<div style="font-size:.75rem;color:var(--muted-foreground)">'+d.toDateString()+'</div>';
  }
  function calcAge(){
    var birth=document.getElementById('dc-birth').value;
    var r=document.getElementById('dc-age-result');
    if(!birth){r.innerHTML='';return;}
    var b=new Date(birth);
    var now=new Date();
    var years=now.getFullYear()-b.getFullYear();
    var months=now.getMonth()-b.getMonth();
    var days=now.getDate()-b.getDate();
    if(days<0){months--;days+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(months<0){years--;months+=12;}
    var nextBirthday=new Date(now.getFullYear(),b.getMonth(),b.getDate());
    if(nextBirthday<now)nextBirthday.setFullYear(nextBirthday.getFullYear()+1);
    var daysUntil=daysBetween(now,nextBirthday);
    var totalDays=daysBetween(birth,now);
    r.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
      '<div style="grid-column:1/-1;text-align:center;padding:12px;background:var(--card);border-radius:var(--radius);margin-bottom:4px"><span style="font-size:2.5rem;font-weight:700">'+years+'</span><span style="color:var(--muted-foreground)"> '+(f,'سال','years')+'</span></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'ماه','Months')+':</span> <strong>'+months+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'روز','Days')+':</span> <strong>'+days+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'مجموع روزها','Total days')+':</span> <strong>'+totalDays.toLocaleString()+'</strong></div>'+
      '<div><span style="color:var(--muted-foreground)">'+(f,'تا تولد بعدی','Next birthday')+':</span> <strong>'+daysUntil+' '+(f,'روز','days')+'</strong></div>'+
    '</div>';
  }
  document.getElementById('dc-start').addEventListener('change',calcDiff);
  document.getElementById('dc-end').addEventListener('change',calcDiff);
  document.getElementById('dc-base').addEventListener('change',function(){calcAddSub('days',0);});
  document.getElementById('dc-amount').addEventListener('change',function(){calcAddSub('days',0);});
  var amt=function(){return parseInt(document.getElementById('dc-amount').value)||0;};
  document.getElementById('dc-add-days').addEventListener('click',function(){calcAddSub('days',amt());});
  document.getElementById('dc-sub-days').addEventListener('click',function(){calcAddSub('days',-amt());});
  document.getElementById('dc-add-months').addEventListener('click',function(){calcAddSub('months',amt());});
  document.getElementById('dc-sub-months').addEventListener('click',function(){calcAddSub('months',-amt());});
  document.getElementById('dc-add-years').addEventListener('click',function(){calcAddSub('years',amt());});
  document.getElementById('dc-sub-years').addEventListener('click',function(){calcAddSub('years',-amt());});
  document.getElementById('dc-birth').addEventListener('change',calcAge);
  calcDiff();
}
