const t = (fa, en) => (lang) => lang === 'fa' ? fa : en;

export default function render(lang) {
  const _ = (fa, en) => lang === 'fa' ? fa : en;
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];
  return `<div dir="${dir}">
  <div class="panel">
    <h3 class="section-title">${_('تکرارکننده HTTP', 'HTTP Repeater')}</h3>
    <div class="stack">
      <div class="grid two">
        <div>
          <label class="label">${_('متد', 'Method')}</label>
          <select id="hr-method" class="field">
            ${methods.map(m => `<option value="${m}"${m==='GET'?' selected':''}>${m}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="label">${_('پروتکل', 'Protocol')}</label>
          <select id="hr-proto" class="field">
            <option value="https://">HTTPS</option>
            <option value="http://">HTTP</option>
          </select>
        </div>
      </div>
      <div>
        <label class="label">${_('URL', 'URL')}</label>
        <input id="hr-url" class="field" type="text" placeholder="${_('example.com/api', 'example.com/api')}">
      </div>
      <div>
        <label class="label">${_('هدرها (key:value در هر خط)', 'Headers (key:value per line)')}</label>
        <textarea id="hr-headers" class="field" rows="4" spellcheck="false" placeholder="${_('Content-Type: application/json\nAuthorization: Bearer ...', 'Content-Type: application/json\nAuthorization: Bearer ...')}"></textarea>
      </div>
      <div id="hr-body-wrap">
        <label class="label">${_('بدنه درخواست', 'Request Body')}</label>
        <textarea id="hr-body" class="field" rows="4" spellcheck="false" placeholder='${_('{"key": "value"}', '{"key": "value"}')}'></textarea>
      </div>
      <div class="button-row">
        <button class="primary-btn" id="hr-send">${_('ارسال', 'Send')}</button>
        <button class="secondary-btn" id="hr-clear" style="color:var(--danger)">${_('پاک کردن', 'Clear')}</button>
      </div>
      <div id="hr-loading" style="display:none" class="subtle">${_('در حال ارسال...', 'Sending...')}</div>
      <div id="hr-result" style="display:none">
        <div id="hr-status" style="margin-bottom:8px"></div>
        <div id="hr-request-preview" style="display:none;margin-bottom:8px;padding:8px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-family:monospace;font-size:.8125rem;white-space:pre-wrap;word-break:break-all"></div>
        <div class="button-row" style="margin-bottom:8px">
          <button class="secondary-btn tiny" id="hr-copy-raw">${_('کپی پاسخ', 'Copy Response')}</button>
          <button class="secondary-btn tiny" id="hr-pretty-btn">${_('مرتب‌سازی JSON', 'Pretty JSON')}</button>
        </div>
        <div id="hr-stats" class="subtle" style="margin-bottom:8px;font-size:.75rem"></div>
        <div class="tabs" id="hr-tabs">
          <button class="tab active" data-tab="raw">${_('خام', 'Raw')}</button>
          <button class="tab" data-tab="preview">${_('پیش‌نمایش', 'Preview')}</button>
          <button class="tab" data-tab="headers">${_('هدرها', 'Headers')}</button>
          <button class="tab" data-tab="comments">${_('کامنت‌ها', 'Comments')}</button>
          <button class="tab" data-tab="forms">${_('فرم‌ها', 'Forms')}</button>
        </div>
        <div class="tab-pane active" id="hr-raw-pane">
          <pre class="out" id="hr-raw-out" style="min-height:100px;white-space:pre-wrap;word-break:break-all"></pre>
        </div>
        <div class="tab-pane" id="hr-preview-pane">
          <div id="hr-preview-out" style="min-height:100px;border:1px solid var(--border);border-radius:var(--radius);overflow:auto;background:#fff;color:#000"></div>
        </div>
        <div class="tab-pane" id="hr-headers-pane">
          <pre class="out" id="hr-headers-out" style="min-height:100px;white-space:pre-wrap;word-break:break-all"></pre>
        </div>
        <div class="tab-pane" id="hr-comments-pane">
          <pre class="out" id="hr-comments-out" style="min-height:100px;white-space:pre-wrap;word-break:break-all"></pre>
        </div>
        <div class="tab-pane" id="hr-forms-pane">
          <pre class="out" id="hr-forms-out" style="min-height:100px;white-space:pre-wrap;word-break:break-all"></pre>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

export function init(lang) {
  const _ = (fa, en) => lang === 'fa' ? fa : en;
  const methodEl = document.getElementById('hr-method');
  const protoEl = document.getElementById('hr-proto');
  const urlEl = document.getElementById('hr-url');
  const headersEl = document.getElementById('hr-headers');
  const bodyEl = document.getElementById('hr-body');
  const bodyWrap = document.getElementById('hr-body-wrap');
  const sendBtn = document.getElementById('hr-send');
  const clearBtn = document.getElementById('hr-clear');
  const copyRawBtn = document.getElementById('hr-copy-raw');
  const prettyBtn = document.getElementById('hr-pretty-btn');
  const statsEl = document.getElementById('hr-stats');
  const loadingEl = document.getElementById('hr-loading');
  const resultEl = document.getElementById('hr-result');
  const statusEl = document.getElementById('hr-status');
  const reqPreviewEl = document.getElementById('hr-request-preview');
  const rawOut = document.getElementById('hr-raw-out');
  const previewOut = document.getElementById('hr-preview-out');
  const headersOut = document.getElementById('hr-headers-out');
  const commentsOut = document.getElementById('hr-comments-out');
  const formsOut = document.getElementById('hr-forms-out');
  const tabsContainer = document.getElementById('hr-tabs');

  function toggleBody() {
    const val = methodEl.value;
    bodyWrap.style.display = ['POST', 'PUT', 'PATCH'].includes(val) ? 'block' : 'none';
  }
  toggleBody();
  methodEl.addEventListener('change', toggleBody);

  function parseHeaders(text) {
    const hdrs = {};
    if (!text.trim()) return hdrs;
    text.split('\n').forEach(l => {
      const idx = l.indexOf(':');
      if (idx > 0) {
        hdrs[l.slice(0, idx).trim()] = l.slice(idx + 1).trim();
      }
    });
    return hdrs;
  }

  function escapeHtml(s) {
    if (typeof s !== 'string') return String(s);
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function syntaxHighlightJson(text) {
    if (!text) return '';
    try {
      const parsed = JSON.parse(text);
      const json = JSON.stringify(parsed, null, 2);
      return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(
        /("(?:[^"\\]|\\.)*")\s*:/g,
        '<span style="color:var(--accent)">$1</span>:'
      ).replace(
        /"(?:[^"\\]|\\.)*"/g,
        '<span style="color:#22c55e">$&</span>'
      ).replace(
        /\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g,
        '<span style="color:#f59e0b">$1</span>'
      ).replace(
        /\b(true|false|null)\b/g,
        '<span style="color:#ef4444">$1</span>'
      );
    } catch {
      return escapeHtml(text);
    }
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function switchTab(tabId) {
    tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    resultEl.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const tabBtn = tabsContainer.querySelector(`[data-tab="${tabId}"]`);
    if (tabBtn) tabBtn.classList.add('active');
    const pane = document.getElementById('hr-' + tabId + '-pane');
    if (pane) pane.classList.add('active');
  }

  tabsContainer.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (tab) switchTab(tab.dataset.tab);
  });

  function extractComments(html) {
    const regex = /<!--([\s\S]*?)-->/g;
    const comments = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      comments.push(match[1].trim());
    }
    if (!comments.length) return _('هیچ کامنتی یافت نشد', 'No comments found');
    return comments.map((c, i) => `<!-- Comment ${i + 1} -->\n${c}`).join('\n\n---\n\n');
  }

  function extractForms(html) {
    const regex = /<\s*form[\s\S]*?<\/\s*form\s*>/gi;
    const forms = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      forms.push(match[0]);
    }
    if (!forms.length) return _('هیچ فرمی یافت نشد', 'No forms found');
    return forms.map((f, i) => `<!-- Form ${i + 1} -->\n${f}`).join('\n\n');
  }

  function buildRequestPreview(method, url, headers, body) {
    let preview = `${method} ${url} HTTP/1.1\n`;
    Object.entries(headers).forEach(([k, v]) => {
      preview += `${k}: ${v}\n`;
    });
    if (body) {
      preview += '\n' + body;
    }
    return preview;
  }

  async function sendRequest() {
    const method = methodEl.value;
    const proto = protoEl.value;
    const urlStr = urlEl.value.trim();
    if (!urlStr) {
      statusEl.innerHTML = `<span class="status bad">${_('لطفاً URL را وارد کنید', 'Please enter a URL')}</span>`;
      resultEl.style.display = 'block';
      reqPreviewEl.style.display = 'none';
      return;
    }
    const fullUrl = proto + urlStr;
    const headersText = headersEl.value.trim();
    const bodyText = bodyEl.value;
    const headers = parseHeaders(headersText);
    const opts = { method, headers };
    if (['POST', 'PUT', 'PATCH'].includes(method) && bodyText) {
      opts.body = bodyText;
    }
    loadingEl.style.display = 'block';
    resultEl.style.display = 'none';
    reqPreviewEl.style.display = 'none';
    try {
      const start = performance.now();
      const r = await fetch(fullUrl, opts);
      const elapsed = Math.round(performance.now() - start);
      const responseText = await r.text();
      const responseHeadersArr = [];
      r.headers.forEach((v, k) => responseHeadersArr.push(k + ': ' + v));
      const responseHeadersStr = responseHeadersArr.join('\n');
      const statusClass = r.ok ? 'good' : 'bad';
      const server = r.headers.get('server');
      const contentType = r.headers.get('content-type');
      const contentLen = responseText.length;
      const serverInfo = server ? ` &middot; Server: ${escapeHtml(server)}` : '';
      const ctInfo = contentType ? ` &middot; ${escapeHtml(contentType)}` : '';
      const sizeInfo = ` &middot; ${formatBytes(contentLen)}`;
      statusEl.innerHTML = `<span class="status ${statusClass}"><strong>${r.status} ${escapeHtml(r.statusText)}</strong></span><span class="tiny" style="margin-left:8px">${elapsed}ms${serverInfo}${ctInfo}${sizeInfo}</span>`;
      window._hrLastResponseText = responseText;
      const lines = responseText.split('\n').length;
      statsEl.innerHTML = `${_('خطوط', 'Lines')}: ${lines} | ${_('کاراکترها', 'Chars')}: ${responseText.length} | ${_('سایز', 'Size')}: ${formatBytes(contentLen)}`;
      rawOut.innerHTML = syntaxHighlightJson(responseText);
      const ct = (contentType || '').toLowerCase();
      if (ct.includes('text/html') || ct.includes('html')) {
        previewOut.innerHTML = responseText;
      } else {
        previewOut.textContent = responseText;
      }
      headersOut.textContent = responseHeadersStr;
      commentsOut.textContent = extractComments(responseText);
      formsOut.textContent = extractForms(responseText);
      reqPreviewEl.textContent = buildRequestPreview(method, fullUrl, headers, bodyText);
      reqPreviewEl.style.display = 'block';
      switchTab('raw');
      resultEl.style.display = 'block';
    } catch (e) {
      const errMsg = e.message || _('خطای ناشناخته', 'Unknown error');
      statusEl.innerHTML = `<span class="status bad">${_('خطا', 'Error')}: ${escapeHtml(errMsg)}</span>`;
      rawOut.textContent = `${_('خطا', 'Error')}: ${errMsg}\n\n${_('بررسی کنید:', 'Check:')}\n${_('- آیا URL معتبر است؟', '- Is the URL valid?')}\n${_('- آیا CORS اجازه می‌دهد؟', '- Does CORS allow it?')}\n${_('- آیا سرور در دسترس است؟', '- Is the server reachable?')}`;
      previewOut.textContent = '';
      headersOut.textContent = '';
      commentsOut.textContent = '';
      formsOut.textContent = '';
      reqPreviewEl.style.display = 'none';
      switchTab('raw');
      resultEl.style.display = 'block';
    }
    loadingEl.style.display = 'none';
  }

  let prettyMode = false;

  function togglePretty() {
    if (!window._hrLastResponseText) return;
    prettyMode = !prettyMode;
    prettyBtn.textContent = prettyMode ? _('حالت خام', 'Raw View') : _('مرتب‌سازی JSON', 'Pretty JSON');
    if (prettyMode) {
      try {
        const parsed = JSON.parse(window._hrLastResponseText);
        rawOut.textContent = JSON.stringify(parsed, null, 2);
      } catch {
        rawOut.textContent = window._hrLastResponseText;
      }
    } else {
      rawOut.innerHTML = syntaxHighlightJson(window._hrLastResponseText);
    }
  }

  prettyBtn.addEventListener('click', togglePretty);

  function clearResult() {
    resultEl.style.display = 'none';
    reqPreviewEl.style.display = 'none';
    statusEl.innerHTML = '';
    statsEl.innerHTML = '';
    rawOut.textContent = '';
    previewOut.textContent = '';
    headersOut.textContent = '';
    commentsOut.textContent = '';
    formsOut.textContent = '';
    urlEl.value = '';
    headersEl.value = '';
    bodyEl.value = '';
    copyRawBtn.textContent = _('کپی پاسخ', 'Copy Response');
    prettyMode = false;
    prettyBtn.textContent = _('مرتب‌سازی JSON', 'Pretty JSON');
    window._hrLastResponseText = '';
  }

  copyRawBtn.addEventListener('click', async () => {
    const text = rawOut.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyRawBtn.textContent = _('کپی شد', 'Copied!');
      setTimeout(() => {
        copyRawBtn.textContent = _('کپی پاسخ', 'Copy Response');
      }, 2000);
    } catch {
      copyRawBtn.textContent = _('خطا در کپی', 'Copy failed');
    }
  });

  sendBtn.addEventListener('click', sendRequest);
  clearBtn.addEventListener('click', clearResult);

  urlEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendRequest();
  });
}
