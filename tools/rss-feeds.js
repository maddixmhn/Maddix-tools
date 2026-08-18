function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

const SOURCES = {
  exploitdb: {
    label: { en: 'ExploitDB', fa: 'اکسپلویت‌دی‌بی' },
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.exploit-db.com%2Frss.xml&api_key=spbf63tt7rvx2r0wh2x6yoz00ssjyztpceqqkdj3&order_dir=desc&count=50',
    type: 'rss2json'
  },
  cisco: {
    label: { en: 'Cisco Advisories', fa: 'اخطارهای سیسکو' },
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftools.cisco.com%2Fsecurity%2Fcenter%2Fpsirtrss20%2FCiscoSecurityAdvisory.xml&api_key=spbf63tt7rvx2r0wh2x6yoz00ssjyztpceqqkdj3&count=20',
    type: 'rss2json'
  },
  cxbugs: {
    label: { en: 'CX Bugs', fa: 'باگ‌های CX' },
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcxsecurity.com%2Fwlb%2Frss%2Fvulnerabilities%2F&api_key=cpe1hekkfknhpeqov1hvcojojd9csg01yqybwsaw&count=50',
    type: 'rss2json'
  },
  cxexploit: {
    label: { en: 'CX Exploit', fa: 'اکسپلویت‌های CX' },
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcxsecurity.com%2Fwlb%2Frss%2Fexploit%2F&api_key=cpe1hekkfknhpeqov1hvcojojd9csg01yqybwsaw&count=50',
    type: 'rss2json'
  },
  cxdorks: {
    label: { en: 'CX Dorks', fa: 'درک‌های CX' },
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcxsecurity.com%2Fwlb%2Frss%2Fdorks%2F&api_key=cpe1hekkfknhpeqov1hvcojojd9csg01yqybwsaw&count=50',
    type: 'rss2json'
  }
};

function getTagColor(tag) {
  switch (tag) {
    case 'webapps': return '#1677ff';
    case 'local': return '#eb2f96';
    case 'dos': return '#fa8c16';
    case 'remote': return '#52c41a';
    default: return '#666';
  }
}

function getSeverityColor(s) {
  switch (s) {
    case 'Critical': return '#f5222d';
    case 'High': return '#eb2f96';
    case 'Medium': return '#fa8c16';
    case 'Low': return '#a0d911';
    case 'Informational': return '#1677ff';
    default: return '#666';
  }
}

function getCvssColor(cvss) {
  if (cvss >= 9.0) return '#820014';
  if (cvss >= 7.0) return '#f5222d';
  if (cvss >= 4.0) return '#fa8c16';
  return '#52c41a';
}

function getSeverityText(cvss) {
  if (cvss >= 9.0) return 'CRITICAL';
  if (cvss >= 7.0) return 'HIGH';
  if (cvss >= 4.0) return 'MEDIUM';
  if (cvss >= 0.1) return 'LOW';
  return 'UNKNOWN';
}

export default function render(lang) {
  const isFa = lang === 'fa';
  return `
<div>
  <h3>${isFa ? 'خوراک اخبار امنیتی' : 'Security Feeds & CVE Search'}</h3>
  <p style="color:var(--muted-foreground);font-size:.875rem;margin:0 0 12px">${isFa ? 'آخرین اکسپلویت‌ها، اخبار سیسکو و جستجوی CVE' : 'Latest exploits, Cisco advisories, and CVE search.'}</p>
  <div class="rss-tabs" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
    <button class="rss-tab active" data-source="exploitdb">${isFa ? 'اکسپلویت‌دی‌بی' : 'ExploitDB'}</button>
    <button class="rss-tab" data-source="cisco">Cisco</button>
    <button class="rss-tab" data-source="cve">${isFa ? 'جستجوی CVE' : 'CVE Search'}</button>
    <button class="rss-tab" data-source="cxbugs">CX ${isFa ? 'باگ' : 'Bugs'}</button>
    <button class="rss-tab" data-source="cxexploit">CX ${isFa ? 'اکسپلویت' : 'Exploit'}</button>
    <button class="rss-tab" data-source="cxdorks">CX Dorks</button>
  </div>
  <div id="rss-content">
    <div style="text-align:center;padding:32px 0;color:var(--muted-foreground)">${isFa ? 'در حال بارگذاری...' : 'Loading...'}</div>
  </div>
</div>`;
}

export function init(lang) {
  const isFa = lang === 'fa';

  function bindTabs() {
    document.querySelectorAll('.rss-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.rss-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const source = tab.dataset.source;
        if (source === 'cve') {
          renderCVESearch();
        } else {
          renderFeed(source);
        }
      };
    });
  }

  async function renderFeed(source) {
    const container = document.getElementById('rss-content');
    if (!container) return;
    container.innerHTML = `<div style="text-align:center;padding:32px 0;color:var(--muted-foreground)"><span class="jn-spinner"></span></div>`;
    const src = SOURCES[source];
    if (!src) return;
    try {
      const res = await fetch(src.url);
      const data = await res.json();
      if (data.status !== 'ok') throw new Error(data.message || 'API error');
      let html = '';
      data.items.forEach(item => {
        let tagsHtml = '';
        if (source === 'exploitdb' && item.title) {
          const m = item.title.match(/^([a-zA-Z]+)/);
          if (m) {
            const tc = getTagColor(m[1]);
            tagsHtml += `<span style="display:inline-block;padding:1px 8px;border-radius:4px;background:${tc}22;color:${tc};font-size:.75rem;font-weight:600;margin-right:4px">${m[1]}</span>`;
          }
        }
        if (source === 'cisco' && item.content) {
          const sm = item.content.match(/(\s{2,})([a-zA-Z]+)/);
          if (sm) {
            const sc = getSeverityColor(sm[2].trim());
            tagsHtml += `<span style="display:inline-block;padding:1px 8px;border-radius:4px;background:${sc}22;color:${sc};font-size:.75rem;font-weight:600;margin-right:4px">${sm[2].trim()}</span>`;
          }
          const cm = item.content.match(/CVE-(\d{4})-(\d{4,5})/);
          if (cm) {
            tagsHtml += `<span style="display:inline-block;padding:1px 8px;border-radius:4px;background:#2f54eb22;color:#2f54eb;font-size:.75rem;margin-right:4px">${cm[0]}</span>`;
          }
        }
        if ((source === 'cxbugs' || source === 'cxexploit') && item.content) {
          const rm = item.content.match(/Risk:\s*(\w+)/);
          if (rm) {
            const sc = getSeverityColor(rm[1]);
            tagsHtml += `<span style="display:inline-block;padding:1px 8px;border-radius:4px;background:${sc}22;color:${sc};font-size:.75rem;font-weight:600;margin-right:4px">${rm[1]}</span>`;
          }
        }
        if (item.author && source !== 'exploitdb' && source !== 'cisco') {
          tagsHtml += `<span style="display:inline-block;padding:1px 8px;border-radius:4px;background:#2f54eb22;color:#2f54eb;font-size:.75rem;margin-right:4px">${escapeHtml(item.author)}</span>`;
        }
        if (item.pubDate) {
          const d = item.pubDate.slice(item.pubDate.indexOf('20'), item.pubDate.lastIndexOf('0') - 8);
          if (d && d.length > 6) {
            tagsHtml += `<span style="display:inline-block;padding:1px 8px;border-radius:4px;background:#6661;color:var(--muted-foreground);font-size:.75rem;margin-right:4px">${escapeHtml(d)}</span>`;
          }
        }
        const desc = item.description || item.title || '';
        const link = item.link || '#';
        html += `<div style="padding:10px;border-bottom:1px solid var(--border);display:flex;flex-wrap:wrap;align-items:center;gap:8px">
          <a href="${link}" target="_blank" rel="noopener" style="flex:1;min-width:200px;color:var(--foreground);text-decoration:none">${escapeHtml(desc)}</a>
          <div style="display:flex;gap:4px;flex-wrap:wrap">${tagsHtml}</div>
        </div>`;
      });
      container.innerHTML = html || `<div style="text-align:center;padding:32px 0;color:var(--muted-foreground)">${isFa ? 'موردی یافت نشد' : 'No items found'}</div>`;
    } catch (e) {
      container.innerHTML = `<div style="text-align:center;padding:32px 0;color:var(--danger)">${isFa ? 'خطا در دریافت اطلاعات' : 'Error fetching feed'}: ${escapeHtml(e.message)}</div>`;
    }
  }

  function renderCVESearch() {
    const container = document.getElementById('rss-content');
    if (!container) return;
    container.innerHTML = `
      <div class="field">
        <label>CVE ID</label>
        <div style="display:flex;gap:8px">
          <input id="cve-input" value="CVE-2017-0146" style="flex:1" />
          <button class="primary" id="cve-search-btn">${isFa ? 'جستجو' : 'Search'}</button>
        </div>
      </div>
      <div id="cve-result"></div>`;
    document.getElementById('cve-search-btn').onclick = searchCVE;
    document.getElementById('cve-input').onkeydown = (e) => { if (e.key === 'Enter') searchCVE(); };
  }

  async function searchCVE() {
    const input = document.getElementById('cve-input');
    const result = document.getElementById('cve-result');
    if (!input || !result) return;
    const cveId = input.value.trim();
    if (!cveId) return;
    result.innerHTML = `<div style="text-align:center;padding:32px 0"><span class="jn-spinner"></span></div>`;
    try {
      const url = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://cve.circl.lu/api/cve/' + cveId)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data || data.error) throw new Error(data.error || 'CVE not found');
      const cvss = data.cvss || 0;
      const cvssColor = getCvssColor(cvss);
      const severity = getSeverityText(cvss);
      const severityColor = cvss >= 9.0 ? '#820014' : cvss >= 7.0 ? '#f5222d' : cvss >= 4.0 ? '#fa8c16' : '#52c41a';
      const published = data.Published ? data.Published.slice(0, 10) : 'N/A';
      const modified = data.Modified ? data.Modified.slice(0, 10) : 'N/A';
      let html = `
        <div style="margin-top:16px">
          <div style="display:grid;grid-template-columns:auto 1fr;gap:8px 16px;font-size:.875rem">
            <span style="color:var(--muted-foreground)">CVE ID</span><span><strong>${escapeHtml(data.id || cveId)}</strong></span>
            <span style="color:var(--muted-foreground)">${isFa ? 'منتشر شده' : 'Published'}</span><span>${published}</span>
            <span style="color:var(--muted-foreground)">${isFa ? 'آخرین ویرایش' : 'Modified'}</span><span>${modified}</span>
            <span style="color:var(--muted-foreground)">CVSS</span><span style="color:${cvssColor};font-weight:700">${cvss}</span>
            <span style="color:var(--muted-foreground)">${isFa ? 'شدت' : 'Severity'}</span><span style="color:${severityColor};font-weight:700">${severity}</span>
          </div>
          <p style="margin-top:12px;font-size:.875rem">${escapeHtml(data.summary || 'No summary')}</p>
        </div>`;
      if (data.references && data.references.length) {
        html += `<div style="margin-top:16px">
          <strong style="font-size:.875rem">${isFa ? 'منابع' : 'References'}</strong>
          <ul style="margin:8px 0 0;padding-left:20px">`;
        data.references.forEach(ref => {
          html += `<li style="font-size:.8125rem;margin-bottom:4px"><a href="${escapeHtml(ref)}" target="_blank" rel="noopener">${escapeHtml(ref)}</a></li>`;
        });
        html += '</ul></div>';
      }
      result.innerHTML = html;
    } catch (e) {
      result.innerHTML = `<div style="text-align:center;padding:32px 0;color:var(--danger)">${isFa ? 'CVE یافت نشد یا خطا در ارتباط' : 'CVE not found or connection error'}: ${escapeHtml(e.message)}</div>`;
    }
  }

  bindTabs();
  renderFeed('exploitdb');
}
