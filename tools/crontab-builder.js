export default function(lang) {
  var f=lang==='fa';
  var presets=[
    {label:'Every minute',expr:'* * * * *'},
    {label:'Every 5 min',expr:'*/5 * * * *'},
    {label:'Every 15 min',expr:'*/15 * * * *'},
    {label:'Every 30 min',expr:'*/30 * * * *'},
    {label:'Every hour',expr:'0 * * * *'},
    {label:'Every 2 hours',expr:'0 */2 * * *'},
    {label:'Every 6 hours',expr:'0 */6 * * *'},
    {label:'Midnight daily',expr:'0 0 * * *'},
    {label:'Daily 9 AM',expr:'0 9 * * *'},
    {label:'Weekly (Sun)',expr:'0 0 * * 0'},
    {label:'Monthly 1st',expr:'0 0 1 * *'},
    {label:'Weekdays 9-5',expr:'0 9-17 * * 1-5'},
    {label:'Every Monday 8 AM',expr:'0 8 * * 1'},
    {label:'Quarterly',expr:'0 0 1 */3 *'},
    {label:'Yearly',expr:'0 0 1 1 *'},
    {label:'Every 10 min 9-5',expr:'*/10 9-17 * * 1-5'},
    {label:'Every Sunday Midnight',expr:'0 0 * * 0'},
    {label:'Reboot',expr:'@reboot'},
    {label:'Hourly',expr:'@hourly'},
    {label:'Daily',expr:'@daily'},
    {label:'Weekly',expr:'@weekly'},
    {label:'Monthly',expr:'@monthly'},
    {label:'Yearly',expr:'@yearly'},
  ];
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">⏱️</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'ساخت Cron','Crontab Builder')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تولید و توضیح عبارات Cron','Generate and explain cron expressions')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;align-items:end">'+
      '<div style="flex:1;min-width:200px">'+
        '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">Cron '+(f,'عبارت','Expression')+'</label>'+
        '<input id="cron-expr" type="text" value="*/5 * * * *" placeholder="* * * * *" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none;font-family:monospace;direction:ltr">'+
      '</div>'+
      '<div>'+
        '<label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'پیش‌تنظیم','Preset')+'</label>'+
        '<select id="cron-preset" style="padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;cursor:pointer">'+
          '<option value="">'+(f,'انتخاب...','Select preset...')+'</option>'+
          presets.map(function(p){return '<option value="'+p.expr+'">'+p.label+'</option>';}).join('')+
        '</select></div>'+
    '</div>'+
    '<div id="cron-desc" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:.875rem;line-height:1.6;margin-bottom:16px"></div>'+
    '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:16px">'+
      '<div><label style="font-size:.6875rem;font-weight:500;display:block;margin-bottom:2px;color:var(--muted-foreground)">'+(f,'دقیقه','Minute')+'</label><div id="cron-min" style="padding:8px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;text-align:center">*/5</div></div>'+
      '<div><label style="font-size:.6875rem;font-weight:500;display:block;margin-bottom:2px;color:var(--muted-foreground)">'+(f,'ساعت','Hour')+'</label><div id="cron-hour" style="padding:8px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;text-align:center">*</div></div>'+
      '<div><label style="font-size:.6875rem;font-weight:500;display:block;margin-bottom:2px;color:var(--muted-foreground)">'+(f,'روز ماه','Day')+'</label><div id="cron-dom" style="padding:8px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;text-align:center">*</div></div>'+
      '<div><label style="font-size:.6875rem;font-weight:500;display:block;margin-bottom:2px;color:var(--muted-foreground)">'+(f,'ماه','Month')+'</label><div id="cron-month" style="padding:8px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;text-align:center">*</div></div>'+
      '<div><label style="font-size:.6875rem;font-weight:500;display:block;margin-bottom:2px;color:var(--muted-foreground)">'+(f,'روز هفته','Weekday')+'</label><div id="cron-wday" style="padding:8px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;text-align:center">*</div></div>'+
    '</div>'+
    '<div style="padding:12px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-size:.8125rem;line-height:1.8" id="cron-help"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var expr=document.getElementById('cron-expr');
  var preset=document.getElementById('cron-preset');
  var desc=document.getElementById('cron-desc');
  var min=document.getElementById('cron-min');
  var hour=document.getElementById('cron-hour');
  var dom=document.getElementById('cron-dom');
  var month=document.getElementById('cron-month');
  var wday=document.getElementById('cron-wday');
  var help=document.getElementById('cron-help');
  if(!expr)return;
  var months={1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',7:'Jul',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'};
  var days={0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'};
  preset.addEventListener('change',function(){
    if(preset.value){expr.value=preset.value;parse();preset.value='';}
  });
  expr.addEventListener('input',parse);
  function parseField(val,type){
    if(val==='*'||val==='?') return (f,'هر','every')+' '+type;
    if(val.startsWith('*/')) return (f,'هر','every')+' '+val.slice(2)+' '+type;
    if(val.indexOf(',')!==-1){var parts=val.split(',');return parts.map(function(p){return parseField(p,type);}).join(', ');}
    if(val.indexOf('-')!==-1){var range=val.split('-');return (f,'از','from')+' '+range[0]+' '+('to')+' '+range[1];}
    return val;
  }
  function parse(){
    var v=expr.value.trim();
    if(v==='@reboot'){desc.innerHTML='<strong style="color:var(--success)">'+(f,'اجرا در هنگام راه‌اندازی سیستم','Runs on system startup')+'</strong>';min.textContent='-';hour.textContent='-';dom.textContent='-';month.textContent='-';wday.textContent='-';return;}
    if(v==='@yearly'||v==='@annually'){expr.value='0 0 1 1 *';v=expr.value;}
    else if(v==='@monthly'){expr.value='0 0 1 * *';v=expr.value;}
    else if(v==='@weekly'){expr.value='0 0 * * 0';v=expr.value;}
    else if(v==='@daily'||v==='@midnight'){expr.value='0 0 * * *';v=expr.value;}
    else if(v==='@hourly'){expr.value='0 * * * *';v=expr.value;}
    var parts=v.split(/\s+/);
    if(parts.length!==5){desc.textContent=f,'فرمت cron نامعتبر. فرمت: دقیقه ساعت روز_ماه ماه روز_هفته','Invalid cron format. Format: minute hour day month weekday';return;}
    var labels=[(f,'دقیقه','minute'),(f,'ساعت','hour'),(f,'روز','day'),(f,'ماه','month'),(f,'روز هفته','weekday')];
    var fieldEls=[min,hour,dom,month,wday];
    var descParts=[];
    for(var i=0;i<5;i++){
      fieldEls[i].textContent=parts[i];
      if(parts[i]==='*') descParts.push((f,'هر','every')+' '+labels[i]);
      else if(parts[i].startsWith('*/')) descParts.push((f,'هر','every')+' '+parts[i].slice(2)+' '+labels[i]);
      else if(parts[i].indexOf(',')!==-1){
        var items=parts[i].split(',').map(function(p){return p;}).join(', ');
        descParts.push(items+' '+(f,'در','at')+' '+labels[i]);
      } else descParts.push(parts[i]+' '+(f,'در','at')+' '+labels[i]);
    }
    var summary='';
    if(parts[0]!=='*'||parts[1]!=='*'||parts[2]!=='*'||parts[3]!=='*'||parts[4]!=='*'){
      summary+=(f,'اجرا در','Runs at')+' ';
      if(parts[0]!=='*') summary+=parts[0]+' '+(f,'دقیقه','min')+' ';
      if(parts[1]!=='*') summary+=parts[1]+' '+(f,'ساعت','hr')+' ';
      if(parts[2]!=='*'||parts[3]!=='*'){
        if(parts[2]!=='*') summary+=(f,'روز','day')+' '+parts[2]+' ';
        if(parts[3]!=='*') summary+=(f,'ماه','month')+' '+parts[3]+' ';
      }
      if(parts[4]!=='*'){
        var wd=parts[4];
        summary+=(f,'روز','on')+' '+wd;
        if(days[wd]) summary+=' ('+days[wd]+')';
      }
    } else {
      summary=(f,'هر دقیقه','Every minute');
    }
    desc.innerHTML='<strong style="color:var(--success)">'+summary+'</strong>';
    help.innerHTML=''+
      '<div style="font-weight:500;margin-bottom:6px">'+(f,'راهنمای سریع','Quick Guide')+':</div>'+
      '<table style="width:100%;font-size:.75rem">'+
        '<tr><td style="padding:2px 6px;color:var(--muted-foreground)">*</td><td>'+(f,'همه مقادیر','Any value')+'</td></tr>'+
        '<tr><td style="padding:2px 6px;color:var(--muted-foreground)">,</td><td>'+(f,'چند مقدار (مثال: ۱,۳,۵)','Multiple values (e.g. 1,3,5)')+'</td></tr>'+
        '<tr><td style="padding:2px 6px;color:var(--muted-foreground)">-</td><td>'+(f,'محدوده (مثال: ۱-۵)','Range (e.g. 1-5)')+'</td></tr>'+
        '<tr><td style="padding:2px 6px;color:var(--muted-foreground)">*/N</td><td>'+(f,'هر N واحد','Every N units')+'</td></tr>'+
        '<tr><td style="padding:2px 6px;color:var(--muted-foreground)">@reboot</td><td>'+(f,'در هنگام راه‌اندازی','At startup')+'</td></tr>'+
      '</table>';
  }
  parse();
}
