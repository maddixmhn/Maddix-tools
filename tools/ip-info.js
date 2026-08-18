const i18n = {
  fa: {
    title: 'اطلاعات آی‌پی',
    loading: 'در حال دریافت اطلاعات...',
    ipAddress: 'آدرس آی‌پی',
    country: 'کشور',
    city: 'شهر',
    isp: 'ارائه‌دهنده اینترنت',
    org: 'سازمان',
    asn: 'ASN',
    coordinates: 'مختصات',
    timezone: 'منطقه زمانی',
    refresh: 'تازه‌سازی',
    error: 'خطا',
    errMsg: 'خطا در دریافت اطلاعات آی‌پی',
    unknown: 'نامشخص',
  },
  en: {
    title: 'IP Information',
    loading: 'Fetching IP information...',
    ipAddress: 'IP Address',
    country: 'Country',
    city: 'City',
    isp: 'ISP',
    org: 'Organization',
    asn: 'ASN',
    coordinates: 'Coordinates',
    timezone: 'Timezone',
    refresh: 'Refresh',
    error: 'Error',
    errMsg: 'Failed to fetch IP information',
    unknown: 'Unknown',
  },
};

function t(lang, key) {
  return i18n[lang]?.[key] ?? key;
}

function getLoadingHTML(lang) {
  return `<div style="display:flex;align-items:center;gap:12px;padding:24px 0">
    <div class="ip-spinner"></div>
    <span class="subtle">${t(lang, 'loading')}</span>
  </div>`;
}

function getErrorHTML(lang, msg) {
  return `<div class="status bad" style="padding:12px;margin:12px 0">
    <span>${t(lang, 'error')}: ${msg || t(lang, 'errMsg')}</span>
  </div>`;
}

function getResultHTML(lang, data) {
  const rows = [
    [t(lang, 'ipAddress'), data.ip, true],
    [t(lang, 'country'), data.country],
    [t(lang, 'city'), data.city],
    [t(lang, 'isp'), data.isp],
    [t(lang, 'asn'), data.asn],
    [t(lang, 'coordinates'), data.coords],
    [t(lang, 'timezone'), data.timezone],
  ];

  let html = '<div class="grid two">';
  for (const [label, value, mono] of rows) {
    const val = value || `<span style="color:var(--text-3)">${t(lang, 'unknown')}</span>`;
    if (mono) {
      html += `<div><div class="label">${label}</div><div class="out" style="margin-top:0">${val}</div></div>`;
    } else {
      html += `<div><div class="label">${label}</div><div class="subtle">${val}</div></div>`;
    }
  }
  html += '</div>';
  return html;
}

function formatGeoData(d) {
  return {
    ip: d.query || null,
    country: d.country || null,
    city: d.city || null,
    isp: d.isp || d.org || null,
    asn: d.as || null,
    coords: (d.lat != null && d.lon != null) ? `${d.lat}, ${d.lon}` : null,
    timezone: d.timezone || null,
  };
}

async function fetchIPInfo() {
  try {
    const r = await fetch('https://ip-api.com/json/');
    const d = await r.json();
    if (d.status === 'success' && d.query) {
      return formatGeoData(d);
    }
  } catch (e) {}

  let ip = null;
  const fallbacks = [
    'https://api.ipify.org?format=json',
    'https://api.my-ip.io/ip.json',
  ];
  for (const url of fallbacks) {
    try {
      const r = await fetch(url);
      const d = await r.json();
      ip = d.ip;
      if (ip) break;
    } catch (e) {}
  }
  if (!ip) throw new Error('Could not determine IP address');

  try {
    const r = await fetch(`https://ip-api.com/json/${ip}`);
    const d = await r.json();
    if (d.status === 'success') {
      return formatGeoData(d);
    }
  } catch (e) {}

  return { ip, country: null, city: null, isp: null, asn: null, coords: null, timezone: null };
}

let currentLang = 'en';

async function loadIPInfo() {
  const resultDiv = document.getElementById('ip-info-result');
  if (!resultDiv) return;
  resultDiv.innerHTML = getLoadingHTML(currentLang);
  try {
    const data = await fetchIPInfo();
    resultDiv.innerHTML = getResultHTML(currentLang, data);
  } catch (e) {
    resultDiv.innerHTML = getErrorHTML(currentLang, e.message);
  }
}

export default function render(lang) {
  currentLang = lang === 'fa' ? 'fa' : 'en';
  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  return `<div class="panel" dir="${dir}" data-ip-info>
  <div class="section-title">🖥️ ${t(lang, 'title')}</div>
  <div id="ip-info-result">${getLoadingHTML(lang)}</div>
  <div style="display:flex;gap:10px;margin-top:12px">
    <button class="primary-btn" id="ip-refresh-btn">🔄 ${t(lang, 'refresh')}</button>
  </div>
  <style>
    @keyframes ip-spin{to{transform:rotate(360deg)}}
    .ip-spinner{width:24px;height:24px;border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;animation:ip-spin .8s linear infinite;flex:0 0 24px}
  </style>
</div>`;
}

export function init(lang) {
  currentLang = lang === 'fa' ? 'fa' : 'en';
  const refreshBtn = document.getElementById('ip-refresh-btn');
  if (refreshBtn) {
    const newBtn = refreshBtn.cloneNode(true);
    refreshBtn.parentNode.replaceChild(newBtn, refreshBtn);
    newBtn.addEventListener('click', loadIPInfo);
  }
  loadIPInfo();
}
