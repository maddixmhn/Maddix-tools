export default function(lang) {
  var f=lang==='fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🌏</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f,'اطلاعات کشورها','Country Info')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f,'اطلاعات کشورها: پایتخت، کد تلفن، واحد پول، زبان، پرچم','Country info: capital, dial code, currency, language, flag')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      '<input id="ci-search" type="text" placeholder="'+(f,'جستجوی کشور...','Search country...')+'" style="flex:1;min-width:180px;padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<select id="ci-continent" style="padding:10px 14px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none;cursor:pointer">'+
        '<option value="">'+(f,'همه قاره‌ها','All continents')+'</option>'+
        '<option value="Asia">Asia</option><option value="Africa">Africa</option><option value="Europe">Europe</option>'+
        '<option value="North America">N. America</option><option value="South America">S. America</option><option value="Oceania">Oceania</option>'+
      '</select>'+
    '</div>'+
    '<div id="ci-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px"></div>'+
  '</div>';
}
export function init(lang) {
  var f=lang==='fa';
  var countries=[
    {name:'Iran',flag:'🇮🇷',code:'IR',capital:'Tehran',dial:'+98',currency:'IRR',lang:'Persian',cont:'Asia'},{name:'United Arab Emirates',flag:'🇦🇪',code:'AE',capital:'Abu Dhabi',dial:'+971',currency:'AED',lang:'Arabic',cont:'Asia'},
    {name:'Saudi Arabia',flag:'🇸🇦',code:'SA',capital:'Riyadh',dial:'+966',currency:'SAR',lang:'Arabic',cont:'Asia'},{name:'Turkey',flag:'🇹🇷',code:'TR',capital:'Ankara',dial:'+90',currency:'TRY',lang:'Turkish',cont:'Asia'},
    {name:'Iraq',flag:'🇮🇶',code:'IQ',capital:'Baghdad',dial:'+964',currency:'IQD',lang:'Arabic',cont:'Asia'},{name:'Afghanistan',flag:'🇦🇫',code:'AF',capital:'Kabul',dial:'+93',currency:'AFN',lang:'Pashto',cont:'Asia'},
    {name:'Pakistan',flag:'🇵🇰',code:'PK',capital:'Islamabad',dial:'+92',currency:'PKR',lang:'Urdu',cont:'Asia'},{name:'India',flag:'🇮🇳',code:'IN',capital:'New Delhi',dial:'+91',currency:'INR',lang:'Hindi',cont:'Asia'},
    {name:'China',flag:'🇨🇳',code:'CN',capital:'Beijing',dial:'+86',currency:'CNY',lang:'Chinese',cont:'Asia'},{name:'Japan',flag:'🇯🇵',code:'JP',capital:'Tokyo',dial:'+81',currency:'JPY',lang:'Japanese',cont:'Asia'},
    {name:'South Korea',flag:'🇰🇷',code:'KR',capital:'Seoul',dial:'+82',currency:'KRW',lang:'Korean',cont:'Asia'},{name:'Russia',flag:'🇷🇺',code:'RU',capital:'Moscow',dial:'+7',currency:'RUB',lang:'Russian',cont:'Asia'},
    {name:'United Kingdom',flag:'🇬🇧',code:'GB',capital:'London',dial:'+44',currency:'GBP',lang:'English',cont:'Europe'},{name:'France',flag:'🇫🇷',code:'FR',capital:'Paris',dial:'+33',currency:'EUR',lang:'French',cont:'Europe'},
    {name:'Germany',flag:'🇩🇪',code:'DE',capital:'Berlin',dial:'+49',currency:'EUR',lang:'German',cont:'Europe'},{name:'Italy',flag:'🇮🇹',code:'IT',capital:'Rome',dial:'+39',currency:'EUR',lang:'Italian',cont:'Europe'},
    {name:'Spain',flag:'🇪🇸',code:'ES',capital:'Madrid',dial:'+34',currency:'EUR',lang:'Spanish',cont:'Europe'},{name:'Netherlands',flag:'🇳🇱',code:'NL',capital:'Amsterdam',dial:'+31',currency:'EUR',lang:'Dutch',cont:'Europe'},
    {name:'Switzerland',flag:'🇨🇭',code:'CH',capital:'Bern',dial:'+41',currency:'CHF',lang:'German',cont:'Europe'},{name:'Sweden',flag:'🇸🇪',code:'SE',capital:'Stockholm',dial:'+46',currency:'SEK',lang:'Swedish',cont:'Europe'},
    {name:'Norway',flag:'🇳🇴',code:'NO',capital:'Oslo',dial:'+47',currency:'NOK',lang:'Norwegian',cont:'Europe'},{name:'Denmark',flag:'🇩🇰',code:'DK',capital:'Copenhagen',dial:'+45',currency:'DKK',lang:'Danish',cont:'Europe'},
    {name:'Finland',flag:'🇫🇮',code:'FI',capital:'Helsinki',dial:'+358',currency:'EUR',lang:'Finnish',cont:'Europe'},{name:'Poland',flag:'🇵🇱',code:'PL',capital:'Warsaw',dial:'+48',currency:'PLN',lang:'Polish',cont:'Europe'},
    {name:'Portugal',flag:'🇵🇹',code:'PT',capital:'Lisbon',dial:'+351',currency:'EUR',lang:'Portuguese',cont:'Europe'},{name:'Greece',flag:'🇬🇷',code:'GR',capital:'Athens',dial:'+30',currency:'EUR',lang:'Greek',cont:'Europe'},
    {name:'Austria',flag:'🇦🇹',code:'AT',capital:'Vienna',dial:'+43',currency:'EUR',lang:'German',cont:'Europe'},{name:'Belgium',flag:'🇧🇪',code:'BE',capital:'Brussels',dial:'+32',currency:'EUR',lang:'Dutch',cont:'Europe'},
    {name:'Ireland',flag:'🇮🇪',code:'IE',capital:'Dublin',dial:'+353',currency:'EUR',lang:'English',cont:'Europe'},{name:'Ukraine',flag:'🇺🇦',code:'UA',capital:'Kyiv',dial:'+380',currency:'UAH',lang:'Ukrainian',cont:'Europe'},
    {name:'United States',flag:'🇺🇸',code:'US',capital:'Washington DC',dial:'+1',currency:'USD',lang:'English',cont:'North America'},{name:'Canada',flag:'🇨🇦',code:'CA',capital:'Ottawa',dial:'+1',currency:'CAD',lang:'English',cont:'North America'},
    {name:'Mexico',flag:'🇲🇽',code:'MX',capital:'Mexico City',dial:'+52',currency:'MXN',lang:'Spanish',cont:'North America'},{name:'Brazil',flag:'🇧🇷',code:'BR',capital:'Brasília',dial:'+55',currency:'BRL',lang:'Portuguese',cont:'South America'},
    {name:'Argentina',flag:'🇦🇷',code:'AR',capital:'Buenos Aires',dial:'+54',currency:'ARS',lang:'Spanish',cont:'South America'},{name:'Chile',flag:'🇨🇱',code:'CL',capital:'Santiago',dial:'+56',currency:'CLP',lang:'Spanish',cont:'South America'},
    {name:'Colombia',flag:'🇨🇴',code:'CO',capital:'Bogotá',dial:'+57',currency:'COP',lang:'Spanish',cont:'South America'},{name:'Peru',flag:'🇵🇪',code:'PE',capital:'Lima',dial:'+51',currency:'PEN',lang:'Spanish',cont:'South America'},
    {name:'Australia',flag:'🇦🇺',code:'AU',capital:'Canberra',dial:'+61',currency:'AUD',lang:'English',cont:'Oceania'},{name:'New Zealand',flag:'🇳🇿',code:'NZ',capital:'Wellington',dial:'+64',currency:'NZD',lang:'English',cont:'Oceania'},
    {name:'Egypt',flag:'🇪🇬',code:'EG',capital:'Cairo',dial:'+20',currency:'EGP',lang:'Arabic',cont:'Africa'},{name:'Nigeria',flag:'🇳🇬',code:'NG',capital:'Abuja',dial:'+234',currency:'NGN',lang:'English',cont:'Africa'},
    {name:'South Africa',flag:'🇿🇦',code:'ZA',capital:'Pretoria',dial:'+27',currency:'ZAR',lang:'Afrikaans',cont:'Africa'},{name:'Kenya',flag:'🇰🇪',code:'KE',capital:'Nairobi',dial:'+254',currency:'KES',lang:'Swahili',cont:'Africa'},
    {name:'Morocco',flag:'🇲🇦',code:'MA',capital:'Rabat',dial:'+212',currency:'MAD',lang:'Arabic',cont:'Africa'},{name:'Algeria',flag:'🇩🇿',code:'DZ',capital:'Algiers',dial:'+213',currency:'DZD',lang:'Arabic',cont:'Africa'},
    {name:'Israel',flag:'🇮🇱',code:'IL',capital:'Jerusalem',dial:'+972',currency:'ILS',lang:'Hebrew',cont:'Asia'},{name:'Qatar',flag:'🇶🇦',code:'QA',capital:'Doha',dial:'+974',currency:'QAR',lang:'Arabic',cont:'Asia'},
    {name:'Kuwait',flag:'🇰🇼',code:'KW',capital:'Kuwait City',dial:'+965',currency:'KWD',lang:'Arabic',cont:'Asia'},{name:'Oman',flag:'🇴🇲',code:'OM',capital:'Muscat',dial:'+968',currency:'OMR',lang:'Arabic',cont:'Asia'},
    {name:'Bahrain',flag:'🇧🇭',code:'BH',capital:'Manama',dial:'+973',currency:'BHD',lang:'Arabic',cont:'Asia'},{name:'Malaysia',flag:'🇲🇾',code:'MY',capital:'Kuala Lumpur',dial:'+60',currency:'MYR',lang:'Malay',cont:'Asia'},
    {name:'Singapore',flag:'🇸🇬',code:'SG',capital:'Singapore',dial:'+65',currency:'SGD',lang:'English',cont:'Asia'},{name:'Indonesia',flag:'🇮🇩',code:'ID',capital:'Jakarta',dial:'+62',currency:'IDR',lang:'Indonesian',cont:'Asia'},
    {name:'Philippines',flag:'🇵🇭',code:'PH',capital:'Manila',dial:'+63',currency:'PHP',lang:'Filipino',cont:'Asia'},{name:'Thailand',flag:'🇹🇭',code:'TH',capital:'Bangkok',dial:'+66',currency:'THB',lang:'Thai',cont:'Asia'},
    {name:'Vietnam',flag:'🇻🇳',code:'VN',capital:'Hanoi',dial:'+84',currency:'VND',lang:'Vietnamese',cont:'Asia'},{name:'Bangladesh',flag:'🇧🇩',code:'BD',capital:'Dhaka',dial:'+880',currency:'BDT',lang:'Bengali',cont:'Asia'},
    {name:'Nepal',flag:'🇳🇵',code:'NP',capital:'Kathmandu',dial:'+977',currency:'NPR',lang:'Nepali',cont:'Asia'},{name:'Sri Lanka',flag:'🇱🇰',code:'LK',capital:'Colombo',dial:'+94',currency:'LKR',lang:'Sinhala',cont:'Asia'},
    {name:'Czech Republic',flag:'🇨🇿',code:'CZ',capital:'Prague',dial:'+420',currency:'CZK',lang:'Czech',cont:'Europe'},{name:'Hungary',flag:'🇭🇺',code:'HU',capital:'Budapest',dial:'+36',currency:'HUF',lang:'Hungarian',cont:'Europe'},
    {name:'Romania',flag:'🇷🇴',code:'RO',capital:'Bucharest',dial:'+40',currency:'RON',lang:'Romanian',cont:'Europe'},{name:'Bulgaria',flag:'🇧🇬',code:'BG',capital:'Sofia',dial:'+359',currency:'BGN',lang:'Bulgarian',cont:'Europe'},
    {name:'Croatia',flag:'🇭🇷',code:'HR',capital:'Zagreb',dial:'+385',currency:'EUR',lang:'Croatian',cont:'Europe'},{name:'Serbia',flag:'🇷🇸',code:'RS',capital:'Belgrade',dial:'+381',currency:'RSD',lang:'Serbian',cont:'Europe'},
    {name:'Iceland',flag:'🇮🇸',code:'IS',capital:'Reykjavik',dial:'+354',currency:'ISK',lang:'Icelandic',cont:'Europe'},
  ];
  var grid=document.getElementById('ci-grid');
  var search=document.getElementById('ci-search');
  var cont=document.getElementById('ci-continent');
  if(!grid)return;
  function render(){
    var q=(search.value||'').toLowerCase();
    var c=cont.value;
    var html='';
    countries.forEach(function(co){
      if(q&&!co.name.toLowerCase().includes(q)&&!co.capital.toLowerCase().includes(q)&&!co.code.toLowerCase().includes(q))return;
      if(c&&co.cont!==c)return;
      html+='<div style="padding:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius)">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
          '<div><span style="font-size:1.5rem">'+co.flag+'</span> <strong style="font-size:.95rem">'+co.name+'</strong> <span style="font-size:.6875rem;color:var(--muted-foreground)">('+co.code+')</span></div>'+
        '</div>'+
        '<div style="font-size:.75rem;line-height:1.7">'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'پایتخت','Capital')+':</span> '+co.capital+'</div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'کد تلفن','Dial')+':</span> '+co.dial+'</div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'واحد پول','Currency')+':</span> '+co.currency+'</div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'زبان','Language')+':</span> '+co.lang+'</div>'+
          '<div><span style="color:var(--muted-foreground)">'+(f,'قاره','Continent')+':</span> '+co.cont+'</div>'+
        '</div></div>';
    });
    grid.innerHTML=html||'<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--muted-foreground)">'+(f,'کشوری یافت نشد','No countries found')+'</div>';
  }
  search.addEventListener('input',render);
  cont.addEventListener('change',render);
  render();
}
