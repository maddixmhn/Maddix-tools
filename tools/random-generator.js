export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🎲</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'تولید اعداد تصادفی','Random Generator')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'اعداد تصادفی، سکه، تاس، lotteries','Random numbers, coin flip, dice, lottery)')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="rng-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-rngtab="number">'+(f,'عدد','Number')+'</button>'+
      '<button data-rngtab="dice">'+(f,'تاس','Dice')+'</button>'+
      '<button data-rngtab="coin">'+(f,'سکه','Coin')+'</button>'+
      '<button data-rngtab="lottery">'+(f,'لاتاری','Lottery')+'</button>'+
    '</div>'+
    '<div class="rngtab-content" data-rngtab="number">'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:end">'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'از','From')+'</label><input id="rng-min" type="number" value="1" style="width:80px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تا','To')+'</label><input id="rng-max" type="number" value="100" style="width:80px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تعداد','Count')+'</label><input id="rng-count" type="number" value="1" min="1" max="100" style="width:70px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تکراری','Unique')+'</label>'+
          '<select id="rng-unique" style="padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none">'+
            '<option value="0">'+(f,'ممکن است تکرار شود','Allow repeats')+'</option>'+
            '<option value="1">'+(f,'بدون تکرار','No repeats')+'</option>'+
          '</select></div>'+
        '<button id="rng-generate" class="primary">'+(f,'تولید','Generate')+'</button>'+
      '</div>'+
      '<div id="rng-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-family:monospace;font-size:1.2rem;text-align:center;min-height:60px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap"></div>'+
    '</div>'+
    '<div class="rngtab-content" data-rngtab="dice" style="display:none">'+
      '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:end">'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تعداد تاس','Dice count')+'</label><input id="rng-dice-count" type="number" value="2" min="1" max="10" style="width:80px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تعداد وجه','Sides')+'</label><input id="rng-dice-sides" type="number" value="6" min="2" max="100" style="width:80px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<button id="rng-dice-roll" class="primary">'+(f,'ریختن تاس','Roll')+'</button>'+
      '</div>'+
      '<div id="rng-dice-result" style="padding:20px;background:var(--muted);border-radius:var(--radius);text-align:center;min-height:80px;font-size:2.5rem;line-height:1.5"></div>'+
    '</div>'+
    '<div class="rngtab-content" data-rngtab="coin" style="display:none">'+
      '<div style="text-align:center;padding:20px">'+
        '<div id="rng-coin-result" style="font-size:6rem;line-height:1;margin-bottom:16px">🪙</div>'+
        '<button id="rng-coin-flip" class="primary" style="padding:12px 32px;font-size:1rem">'+(f,'پرتاب سکه','Flip Coin')+'</button>'+
        '<div id="rng-coin-stats" style="margin-top:12px;font-size:.8125rem;color:var(--muted-foreground)">'+(f,'تعداد: ۰','Count: 0')+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="rngtab-content" data-rngtab="lottery" style="display:none">'+
      '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:end">'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تعداد اعداد','Numbers')+'</label><input id="rng-lotto-pick" type="number" value="6" min="1" max="20" style="width:70px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'حداکثر','Max')+'</label><input id="rng-lotto-max" type="number" value="49" min="1" max="1000" style="width:80px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<div><label style="font-size:.8125rem;font-weight:500;display:block;margin-bottom:4px">'+(f,'تعداد ست','Sets')+'</label><input id="rng-lotto-sets" type="number" value="1" min="1" max="20" style="width:70px;padding:8px 10px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none"></div>'+
        '<button id="rng-lotto-gen" class="primary">'+(f,'تولید','Generate')+'</button>'+
      '</div>'+
      '<div id="rng-lotto-result" style="padding:16px;background:var(--muted);border-radius:var(--radius);font-size:1.3rem;text-align:center;min-height:60px;line-height:2"></div>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  // Tabs
  document.querySelectorAll('#rng-tabs button').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('#rng-tabs button').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      document.querySelectorAll('.rngtab-content').forEach(function(el){el.style.display='none';});
      var t=document.querySelector('.rngtab-content[data-rngtab="'+btn.dataset.rngtab+'"]');
      if(t)t.style.display='block';
    });
  });
  // Number generator
  document.getElementById('rng-generate').addEventListener('click',function(){
    var min=parseInt(document.getElementById('rng-min').value)||0;
    var max=parseInt(document.getElementById('rng-max').value)||100;
    var count=Math.min(parseInt(document.getElementById('rng-count').value)||1,100);
    var unique=document.getElementById('rng-unique').value==='1';
    var result=document.getElementById('rng-result');
    if(min>max){var t=min;min=max;max=t;}
    var range=max-min+1;
    if(unique&&count>range){result.innerHTML='<span style="color:var(--warning)">'+(f,'محدوده کمتر از تعداد درخواستی','Range smaller than requested count')+'</span>';return;}
    var nums=[];
    if(unique){
      var pool=[];for(var i=min;i<=max;i++)pool.push(i);
      for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
      nums=pool.slice(0,count);
    }else{
      for(var i=0;i<count;i++)nums.push(Math.floor(Math.random()*(max-min+1))+min);
    }
    result.innerHTML=nums.map(function(n){return'<span style="display:inline-block;padding:8px 16px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-weight:700">'+n+'</span>';}).join('');
  });
  // Dice
  document.getElementById('rng-dice-roll').addEventListener('click',function(){
    var count=Math.min(parseInt(document.getElementById('rng-dice-count').value)||2,10);
    var sides=parseInt(document.getElementById('rng-dice-sides').value)||6;
    var result=document.getElementById('rng-dice-result');
    var dice=['⚀','⚁','⚂','⚃','⚄','⚅'];
    var total=0;var html='';
    for(var i=0;i<count;i++){
      var val=Math.floor(Math.random()*sides)+1;
      total+=val;
      html+='<span style="display:inline-block;margin:4px">'+(sides===6?dice[val-1]:'<span style="font-size:1.5rem;padding:8px 16px;background:var(--card);border-radius:var(--radius)">'+val+'</span>')+'</span>';
    }
    html+='<div style="margin-top:8px;font-size:1rem">'+(f,'جمع:','Total:')+' <strong>'+total+'</strong></div>';
    result.innerHTML=html;
  });
  // Coin flip
  var coinStats={heads:0,tails:0};
  document.getElementById('rng-coin-flip').addEventListener('click',function(){
    var result=Math.random()<0.5?'heads':'tails';
    coinStats[result]++;
    document.getElementById('rng-coin-result').textContent=result==='heads'?'👑':'🦅';
    document.getElementById('rng-coin-stats').textContent=(f,'شیر:','Heads:')+' '+coinStats.heads+' | '+(f,'خط:','Tails:')+' '+coinStats.tails+' | '+(f,'مجموع:','Total:')+' '+(coinStats.heads+coinStats.tails);
  });
  // Lottery
  document.getElementById('rng-lotto-gen').addEventListener('click',function(){
    var pick=parseInt(document.getElementById('rng-lotto-pick').value)||6;
    var max=parseInt(document.getElementById('rng-lotto-max').value)||49;
    var sets=Math.min(parseInt(document.getElementById('rng-lotto-sets').value)||1,20);
    var result=document.getElementById('rng-lotto-result');
    if(pick>max){result.innerHTML='<span style="color:var(--warning)">'+(f,'تعداد اعداد بیشتر از حداکثر است','Pick count exceeds max')+'</span>';return;}
    var html='';
    for(var s=0;s<sets;s++){
      var pool=[];for(var i=1;i<=max;i++)pool.push(i);
      for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
      var nums=pool.slice(0,pick).sort(function(a,b){return a-b;});
      html+='<div style="margin:4px 0">'+(sets>1?'<span style="font-size:.75rem;color:var(--muted-foreground)">#'+(s+1)+': </span>':'')+nums.map(function(n){return'<span style="display:inline-block;margin:2px;padding:6px 14px;background:var(--action);color:#fff;border-radius:9999px;font-weight:700;font-size:.9rem">'+n+'</span>';}).join('')+'</div>';
    }
    result.innerHTML=html;
  });
  // Initial generate
  document.getElementById('rng-generate').click();
}
