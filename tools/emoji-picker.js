export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">😊</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'انتخاب ایموجی','Emoji Picker')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'جستجو و کپی ایموجی','Search and copy emojis')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:12px">'+
      '<input id="emoji-search" type="text" placeholder="'+(f,'جستجوی ایموجی... (مثال: heart, smile, flag)','Search emoji...')+'" style="width:100%;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
    '</div>'+
    '<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">'+
      '<button class="emoji-cat active" data-ecat="smileys">😀</button><button class="emoji-cat" data-ecat="people">🧑</button><button class="emoji-cat" data-ecat="animals">🐱</button><button class="emoji-cat" data-ecat="food">🍕</button><button class="emoji-cat" data-ecat="travel">✈️</button><button class="emoji-cat" data-ecat="activities">⚽</button><button class="emoji-cat" data-ecat="objects">💡</button><button class="emoji-cat" data-ecat="symbols">❤️</button><button class="emoji-cat" data-ecat="flags">🏁</button>'+
    '</div>'+
    '<div id="emoji-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr));gap:4px;padding:8px;background:var(--muted);border-radius:var(--radius);max-height:400px;overflow-y:auto;min-height:100px"></div>'+
    '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">'+
      '<div style="font-size:.75rem;color:var(--muted-foreground)"><span id="emoji-count">0</span> '+(f,'ایموجی','emojis')+'</div>'+
      '<div id="emoji-selected" style="padding:6px 12px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-size:1.3rem;min-width:40px;text-align:center"></div>'+
      '<button id="emoji-copy-btn" style="padding:4px 12px;font-size:.75rem">'+(f,'کپی','Copy')+'</button>'+
    '</div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var emojis={
    smileys:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥴','😵','🤯','🥳','🥺','😢','😭','😤','😠','😡','🤬','💀','☠️','💩','🤡','👹','👺','👻','👽','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾'],
    people:['👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','🦷','👅','👄','👁️','👀','🧑','👨','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🤦','🤷','👮','🕵️','💂','🥷','👷','🫅','🤴','👸','👳','👲','🧕','🤵','👰','🤰','🫃','🫄','👼','🎅','🤶','🦸','🦹','🧙','🧚','🧛','🧜','🧝','🧞','🧟','🧌','💆','💇','🚶','🧍','🧎','🏃','💃','🕺','🕴️','👯','🧖','🧗','🤸','⛹️','🏋️','🚴','🚵','🤼','🤽','🤾','🤺','⛷️','🏂','🏄','🚣','🏊','🤿'],
    animals:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🪸','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿️','🦔','🐾','🐉','🐲'],
    food:['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🫘','🥐','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🦴','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','🫖','☕','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🫗','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🍽️','🥣','🥡','🥢','🧂'],
    travel:['🌍','🌎','🌏','🌐','🗺️','🧭','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🧱','🪨','🪵','🛖','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','⛩️','🕋','⛲','⛺','🌁','🌃','🏙️','🌄','🌅','🌆','🌇','🌉','🗾','🎠','🎡','🎢','💈','🎪','🚂','🚃','🚄','🚅','🚆','🚇','🚈','🚉','🚊','🚝','🚞','🚋','🚌','🚍','🚎','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗','🚘','🚙','🛻','🚚','🚛','🚜','🏎️','🏍️','🛵','🛺','🚲','🛴','🛹','🛼','🚏','🛣️','🛤️','⛽','🛳️','⛵','🛶','🚤','🛟','🛥️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰️','🚀','🛸'],
    activities:['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽','🛷','⛸️','🥌','🎿','⛷️','🏂','🪂','🏋️','🤼','🤸','🤺','⛹️','🤾','🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚵','🚴','🎯','🎳','🎮','🕹️','🎲','♟️','🎭','🎨','🧩','🎪','🎬','🎤','🎧','🎼','🎹','🥁','🪘','🎷','🎺','🪗','🎸','🪕','🎻','🎙️','📻','📯','🎵','🎶','🎚️','🎛️','🎤','🎧','📻','🎷','🎸','🎹','🎺','🎻','🥁'],
    objects:['👓','🕶️','🥽','🥼','🦺','👔','👕','👖','🧣','🧤','🧥','🧦','👗','👘','🥻','🩱','🩲','🩳','👙','👚','👛','👜','👝','🛍️','🎒','🩴','👞','👟','🥾','🥿','👠','👡','🩰','👢','👑','👒','🎩','🎓','🧢','🪖','⛑️','📿','💄','💍','💎','🔇','🔈','🔉','🔊','📢','📣','📯','🔔','🔕','🎼','🎵','🎶','💻','🖥️','🖨️','⌨️','🖱️','🖲️','🕹️','🗄️','🗃️','📀','💿','📼','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️','🎚️','🎛️','🧭','⏱️','⏲️','⏰','🕰️','⌚','📡','🔋','🪫','🔌','💡','🔦','🕯️','🪔','🧯','🗑️','🛢️','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🪛','🔧','🔨','⚒️','🛠️','⛏️','🪚','🔩','⚙️','🧲','🪤','💣','🧨','🪓','🔪','🗡️','⚔️','🛡️','🚬','⚰️','🪦','⚱️','🏺','🧿','🪬','🪄','🔮','📿','💈','⚗️','🔭','🔬','🕳️','🩻','🩹','🩺','💊','💉','🩸','🧬','🦠','🧫','🧪','🌡️','🧹','🪠','🧺','🧻','🚽','🚰','🚿','🛁','🛀','🧼','🪥','🪒','🧽','🪣','🧴','🛎️','🔑','🗝️','🚪','🪑','🛋️','🛏️','🛌','🧸','🪆','🖼️','🪞','🪟','🛠️','🪤','🪚','🛒'],
    symbols:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚕️','♻️','⚜️','🔱','📵','🔞','☢️','☣️','⬆️','⬇️','⬅️','➡️','↗️','↘️','↙️','↖️','↕️','↔️','🔄','◀️','▶️','🔼','🔽','⏩','⏪','⏫','⏬','⏭️','⏮️','⏸️','⏯️','⏹️','⏺️','⏏️','🎦','🔅','🔆','📶','📳','📴','♿','🚹','🚺','🚻','🚼','🚾','🛂','🛃','🛄','🛅','⚠️','🚸','⛔','🚫','🚳','🚭','🚯','🚱','🚷','📵','🔞','☢️','☣️','💢','💬','💭','🗯️','♠️','♣️','♥️','♦️','🃏','🀄','🎴','🔴','🟠','🟡','🟢','🔵','🟣','🟤','⚫','⚪','🔘','🟥','🟧','🟨','🟩','🟦','🟪','🟫','⬛','⬜'],
    flags:['🏳️','🏴','🏁','🚩','🎌','🏴‍☠️','🇺🇳','🇦🇫','🇦🇱','🇩🇿','🇦🇩','🇦🇴','🇦🇬','🇦🇷','🇦🇲','🇦🇺','🇦🇹','🇦🇿','🇧🇸','🇧🇭','🇧🇩','🇧🇧','🇧🇾','🇧🇪','🇧🇿','🇧🇯','🇧🇹','🇧🇴','🇧🇦','🇧🇼','🇧🇷','🇧🇳','🇧🇬','🇧🇫','🇧🇮','🇰🇭','🇨🇲','🇨🇦','🇨🇻','🇨🇫','🇹🇩','🇨🇱','🇨🇳','🇨🇴','🇰🇲','🇨🇬','🇨🇩','🇨🇷','🇭🇷','🇨🇺','🇨🇾','🇨🇿','🇩🇰','🇩🇯','🇩🇲','🇩🇴','🇪🇨','🇪🇬','🇸🇻','🇬🇶','🇪🇷','🇪🇪','🇸🇿','🇪🇹','🇫🇯','🇫🇮','🇫🇷','🇬🇦','🇬🇲','🇬🇪','🇩🇪','🇬🇭','🇬🇷','🇬🇩','🇬🇹','🇬🇳','🇬🇼','🇬🇾','🇭🇹','🇭🇳','🇭🇺','🇮🇸','🇮🇳','🇮🇩','🇮🇷','🇮🇶','🇮🇪','🇮🇱','🇮🇹','🇯🇲','🇯🇵','🇯🇴','🇰🇿','🇰🇪','🇰🇮','🇰🇼','🇰🇬','🇱🇦','🇱🇻','🇱🇧','🇱🇸','🇱🇷','🇱🇾','🇱🇮','🇱🇹','🇱🇺','🇲🇬','🇲🇼','🇲🇾','🇲🇻','🇲🇱','🇲🇹','🇲🇭','🇲🇷','🇲🇺','🇲🇽','🇫🇲','🇲🇩','🇲🇨','🇲🇳','🇲🇪','🇲🇦','🇲🇿','🇲🇲','🇳🇦','🇳🇷','🇳🇵','🇳🇱','🇳🇿','🇳🇮','🇳🇪','🇳🇬','🇰🇵','🇲🇰','🇳🇴','🇴🇲','🇵🇰','🇵🇼','🇵🇸','🇵🇦','🇵🇬','🇵🇾','🇵🇪','🇵🇭','🇵🇱','🇵🇹','🇶🇦','🇷🇴','🇷🇺','🇷🇼','🇰🇳','🇱🇨','🇻🇨','🇼🇸','🇸🇲','🇸🇹','🇸🇦','🇸🇳','🇷🇸','🇸🇨','🇸🇱','🇸🇬','🇸🇰','🇸🇮','🇸🇧','🇸🇴','🇿🇦','🇰🇷','🇸🇸','🇪🇸','🇱🇰','🇸🇩','🇸🇷','🇸🇪','🇨🇭','🇸🇾','🇹🇼','🇹🇯','🇹🇿','🇹🇭','🇹🇱','🇹🇬','🇹🇴','🇹🇹','🇹🇳','🇹🇷','🇹🇲','🇹🇻','🇺🇬','🇺🇦','🇦🇪','🇬🇧','🇺🇸','🇺🇾','🇺🇿','🇻🇺','🇻🇦','🇻🇪','🇻🇳','🇾🇪','🇿🇲','🇿🇼'],
  };
  var search=document.getElementById('emoji-search');
  var grid=document.getElementById('emoji-grid');
  var count=document.getElementById('emoji-count');
  var selected=document.getElementById('emoji-selected');
  var allEmojis=[];
  Object.keys(emojis).forEach(function(k){allEmojis=allEmojis.concat(emojis[k].map(function(e){return{emoji:e,cat:k};}));});
  var currentCat='smileys';
  document.querySelectorAll('.emoji-cat').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.emoji-cat').forEach(function(b){b.classList.remove('active');b.style.background='';b.style.color='';});
      btn.classList.add('active');btn.style.background='var(--action)';btn.style.color='#fff';
      currentCat=btn.dataset.ecat;
      renderGrid();
    });
  });
  function renderGrid(){
    var q=(search.value||'').toLowerCase();
    var catEmojis=emojis[currentCat]||[];
    var filtered=catEmojis.filter(function(e){
      return !q||e.toLowerCase().includes(q);
    });
    count.textContent=filtered.length;
    if(filtered.length===0){grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--muted-foreground);font-size:.875rem">'+(f,'ایموجی‌ای یافت نشد','No emojis found')+'</div>';return;}
    grid.innerHTML=filtered.map(function(e){
      return '<div class="emoji-item" data-e="'+e+'" style="display:flex;align-items:center;justify-content:center;font-size:1.6rem;padding:6px;border-radius:6px;cursor:pointer;transition:background .1s" title="'+e+'">'+e+'</div>';
    }).join('');
    grid.querySelectorAll('.emoji-item').forEach(function(el){
      el.addEventListener('click',function(){
        var em=el.dataset.e;
        selected.textContent=em;
        navigator.clipboard.writeText(em);
        el.style.background='var(--action)';
        setTimeout(function(){el.style.background='';},200);
      });
      el.addEventListener('mouseenter',function(){el.style.background='var(--accent)';});
      el.addEventListener('mouseleave',function(){el.style.background='';});
    });
  }
  document.getElementById('emoji-copy-btn').addEventListener('click',function(){
    if(selected.textContent)navigator.clipboard.writeText(selected.textContent);
  });
  search.addEventListener('input',renderGrid);
  // Style first cat button
  var firstCat=document.querySelector('.emoji-cat');
  if(firstCat){firstCat.classList.add('active');firstCat.style.background='var(--action)';firstCat.style.color='#fff';}
  renderGrid();
}
