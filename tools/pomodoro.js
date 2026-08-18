export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🍅</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Pomodoro Timer</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'تایمر بهره‌وری با روش Pomodoro','Productivity timer using the Pomodoro technique')+'</p></div>'+
    '</div>'+
    '<div style="text-align:center;padding:24px">'+
      '<div style="font-size:5rem;font-weight:700;font-family:monospace;letter-spacing:4px;line-height:1.2" id="pm-display">25:00</div>'+
      '<div style="font-size:.875rem;color:var(--muted-foreground);margin:8px 0" id="pm-phase">'+(f,'فوکوس','Focus')+'</div>'+
      '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:20px 0">'+
        '<button id="pm-start" class="primary" style="padding:10px 28px;font-size:1rem">'+(f,'شروع','Start')+'</button>'+
        '<button id="pm-pause" style="padding:10px 28px;font-size:1rem">'+(f,'توقف','Pause')+'</button>'+
        '<button id="pm-reset" style="padding:10px 28px;font-size:1rem">'+(f,'ریست','Reset')+'</button>'+
      '</div>'+
      '<div style="display:flex;gap:12px;justify-content:center;margin:16px 0;flex-wrap:wrap">'+
        '<div style="text-align:center"><div style="font-size:.6875rem;color:var(--muted-foreground)">'+(f,'فوکوس','Focus')+'</div><input id="pm-focus" type="number" value="25" min="1" max="120" style="width:60px;padding:6px 8px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;text-align:center;outline:none"></div>'+
        '<div style="text-align:center"><div style="font-size:.6875rem;color:var(--muted-foreground)">'+(f,'استراحت کوتاه','Short break')+'</div><input id="pm-short" type="number" value="5" min="1" max="30" style="width:60px;padding:6px 8px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;text-align:center;outline:none"></div>'+
        '<div style="text-align:center"><div style="font-size:.6875rem;color:var(--muted-foreground)">'+(f,'استراحت طولانی','Long break')+'</div><input id="pm-long" type="number" value="15" min="1" max="60" style="width:60px;padding:6px 8px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;text-align:center;outline:none"></div>'+
        '<div style="text-align:center"><div style="font-size:.6875rem;color:var(--muted-foreground)">'+(f,'تعداد','Intervals')+'</div><input id="pm-intervals" type="number" value="4" min="1" max="20" style="width:60px;padding:6px 8px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;text-align:center;outline:none"></div>'+
      '</div>'+
      '<div style="margin-top:12px;font-size:.8125rem;color:var(--muted-foreground)">'+
        '<span id="pm-completed">0</span> '+(f,'پومودورو کامل شده','pomodoros completed')+' &middot; '+
        '<span id="pm-count">1</span>/<span id="pm-total">4</span> '+(f,'دوره','cycles')+
      '</div>'+
      '<div style="margin-top:12px;height:6px;background:var(--muted);border-radius:3px;overflow:hidden;max-width:400px;margin-left:auto;margin-right:auto">'+
        '<div id="pm-progress" style="height:100%;width:0%;background:var(--action);border-radius:3px;transition:width .3s"></div>'+
      '</div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var display=document.getElementById('pm-display');
  var phase=document.getElementById('pm-phase');
  var progress=document.getElementById('pm-progress');
  var completed=document.getElementById('pm-completed');
  var countEl=document.getElementById('pm-count');
  var totalEl=document.getElementById('pm-total');
  if(!display)return;
  var state='stopped'; // running, paused, stopped
  var mode='focus'; // focus, short, long
  var timeLeft=25*60;
  var totalTime=25*60;
  var currentCount=0;
  var totalPomodoros=0;
  var timer=null;
  function getFocus(){return parseInt(document.getElementById('pm-focus').value)||25;}
  function getShort(){return parseInt(document.getElementById('pm-short').value)||5;}
  function getLong(){return parseInt(document.getElementById('pm-long').value)||15;}
  function getIntervals(){return parseInt(document.getElementById('pm-intervals').value)||4;}
  function formatTime(s){
    var m=Math.floor(s/60);
    var sec=s%60;
    return (m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  }
  function updateDisplay(){
    display.textContent=formatTime(timeLeft);
    progress.style.width=((1-timeLeft/totalTime)*100)+'%';
    var labels={focus:(f,'فوکوس','Focus'),short:(f,'استراحت کوتاه','Short Break'),long:(f,'استراحت طولانی','Long Break')};
    phase.textContent=labels[mode]||'';
    countEl.textContent=currentCount+1;
    totalEl.textContent=getIntervals();
    completed.textContent=totalPomodoros;
  }
  function tick(){
    if(state!=='running')return;
    timeLeft--;
    updateDisplay();
    if(timeLeft<=0){
      clearInterval(timer);timer=null;
      state='stopped';
      if(mode==='focus'){
        totalPomodoros++;
        currentCount++;
        if(currentCount>=getIntervals()){
          mode='long';
          currentCount=0;
        }else{mode='short';}
      }else{mode='focus';}
      timeLeft=getTimeForMode()*60;
      totalTime=timeLeft;
      updateDisplay();
      if(Notification.permission==='granted')new Notification('Maddix Tools',{body:mode==='focus'?'Focus time!':mode==='short'?'Short break!':'Long break!'});
    }
  }
  function getTimeForMode(){
    if(mode==='focus')return getFocus();
    if(mode==='short')return getShort();
    return getLong();
  }
  function startTimer(){
    if(state==='running')return;
    if(state==='stopped'){timeLeft=getTimeForMode()*60;totalTime=timeLeft;}
    state='running';
    timer=setInterval(tick,1000);
    document.getElementById('pm-start').textContent=f,'در حال اجرا...','Running...';
  }
  function pauseTimer(){
    if(state==='running'){clearInterval(timer);timer=null;state='paused';document.getElementById('pm-start').textContent=f,'ادامه','Resume';}
  }
  function resetTimer(){
    clearInterval(timer);timer=null;
    state='stopped';mode='focus';currentCount=0;totalPomodoros=0;
    timeLeft=getFocus()*60;totalTime=timeLeft;
    document.getElementById('pm-start').textContent=f,'شروع','Start';
    updateDisplay();
  }
  document.getElementById('pm-start').addEventListener('click',startTimer);
  document.getElementById('pm-pause').addEventListener('click',pauseTimer);
  document.getElementById('pm-reset').addEventListener('click',resetTimer);
  document.querySelectorAll('#pm-focus,#pm-short,#pm-long,#pm-intervals').forEach(function(el){
    el.addEventListener('change',function(){
      if(state==='stopped'){timeLeft=getTimeForMode()*60;totalTime=timeLeft;updateDisplay();}
    });
  });
  resetTimer();
}
