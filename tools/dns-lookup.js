export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const types = ['A', 'AAAA', 'MX', 'CNAME', 'TXT', 'NS', 'SOA'];
  return `<div class="panel">
    <h3 class="section-title">${t('جستجوی DNS', 'DNS Lookup')}</h3>
    <div class="stack">
      <div class="grid two">
        <div>
          <label class="label">${t('دامنه', 'Domain')}</label>
          <input id="dns-domain" class="field" type="text" placeholder="example.com">
        </div>
        <div>
          <label class="label">${t('نوع رکورد', 'Record Type')}</label>
          <select id="dns-type" class="field">
            ${types.map(tp => `<option value="${tp}">${tp}</option>`).join('')}
          </select>
        </div>
      </div>
      <button class="primary-btn" onclick="dnsLookup()">${t('جستجو', 'Lookup')}</button>
      <div id="dns-loading" style="display:none" class="subtle">${t('در حال جستجو...', 'Looking up...')}</div>
      <div id="dns-error" style="display:none;color:var(--danger)" class="subtle"></div>
      <div id="dns-result" style="display:none">
        <div class="table-card">
          <div class="table-scroll">
            <table>
              <thead><tr><th>${t('نوع', 'Type')}</th><th>${t('نام', 'Name')}</th><th>${t('مقدار', 'Value')}</th><th>TTL</th></tr></thead>
              <tbody id="dns-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

export function init() {
  window.dnsLookup = async function() {
    const domain = document.getElementById('dns-domain').value.trim();
    const type = document.getElementById('dns-type').value;
    const loading = document.getElementById('dns-loading');
    const errEl = document.getElementById('dns-error');
    const result = document.getElementById('dns-result');
    const tbody = document.getElementById('dns-tbody');
    loading.style.display = 'block';
    errEl.style.display = 'none';
    result.style.display = 'none';
    try {
      const r = await fetch('https://dns.google/resolve?name=' + encodeURIComponent(domain) + '&type=' + type);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      if (d.Status !== 0) throw new Error('DNS error: ' + (d.Comment || 'Unknown'));
      if (!d.Answer || !d.Answer.length) throw new Error('No records found');
      tbody.innerHTML = d.Answer.map(a => '<tr><td>' + a.type + '</td><td>' + escapeHtml(a.name) + '</td><td>' + escapeHtml(a.data) + '</td><td>' + a.TTL + '</td></tr>').join('');
      result.style.display = 'block';
    } catch(e) {
      errEl.textContent = e.message;
      errEl.style.display = 'block';
    }
    loading.style.display = 'none';
  };
  function escapeHtml(s) { return s.replace(/[&<>"]/g, function(m) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }
}
