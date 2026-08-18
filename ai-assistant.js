(function() {
'use strict';

const PREFS_KEY = 'maddixAiPrefs';
let prefs = { key: '', model: 'grok-4.5' };
let history = [];
let busy = false;
let currentLang = 'fa';

function loadPrefs() {
  try { prefs = Object.assign({ key: '', model: 'grok-4.5' }, JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')); } catch(e) {}
}
function savePrefs() {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch(e) {}
}
function t(fa, en) { return currentLang === 'fa' ? fa : en; }

function systemPrompt() {
  if (currentLang === 'fa') {
    return 'تو دستیار هوش مصنوعی مادیکس تولز هستی و با مدل گروک (xAI) کار می‌کنی. مهم‌ترین قانون: همیشه به زبان فارسی روان، طبیعی و دقیق پاسخ بده، حتی اگر کاربر به انگلیسی سوال بپرسد. پاسخ‌ها را خلاصه، مفید و مرتب نگه دار.';
  }
  return 'You are the Maddix Tools AI assistant powered by Grok (xAI). Always respond in clear, helpful English.';
}

function el(id) { return document.getElementById(id); }

function openPanel() {
  const p = el('aiPanel');
  if (p) p.classList.remove('hidden');
  const i = el('aiInput');
  if (i) setTimeout(() => i.focus(), 60);
}
function closePanel() {
  const p = el('aiPanel');
  if (p) p.classList.add('hidden');
}
function showSetup(show) {
  const s = el('aiSetup');
  if (s) s.classList.toggle('hidden', !show);
}
function toggleSetup() {
  const s = el('aiSetup');
  if (s) s.classList.toggle('hidden');
}

function setLang(lang) {
  currentLang = lang === 'fa' ? 'fa' : 'en';
  const panel = el('aiPanel');
  if (panel) panel.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  const title = el('aiTitle'); if (title) title.textContent = t('دستیار هوش مصنوعی', 'AI Assistant');
  const sub = el('aiSub'); if (sub) sub.textContent = 'Grok · ' + t('توسط xAI', 'by xAI');
  const input = el('aiInput'); if (input) input.placeholder = t('پیام خود را بنویسید...', 'Type your message...');
  const keyInput = el('aiKeyInput'); if (keyInput) keyInput.placeholder = t('کلید API گروک (xAI)', 'Grok API Key (xAI)');
  const modelInput = el('aiModelInput'); if (modelInput) modelInput.placeholder = 'Model (grok-4.5)';
  const saveBtn = el('aiSaveBtn'); if (saveBtn) saveBtn.textContent = t('ذخیره', 'Save');
  const clearBtn = el('aiClearBtn'); if (clearBtn) clearBtn.textContent = t('پاک کردن گفتگو', 'Clear chat');
}

function addBubble(role, text) {
  const wrap = el('aiMessages');
  if (!wrap) return;
  const div = document.createElement('div');
  div.className = 'ai-bubble ' + (role === 'user' ? 'ai-user' : 'ai-bot');
  div.style.cssText = 'max-width:84%;padding:8px 12px;border-radius:14px;white-space:pre-wrap;word-break:break-word;font-size:.85rem;line-height:1.55;' +
    (role === 'user'
      ? 'align-self:flex-end;background:#7c3aed;color:#fff;border-bottom-right-radius:4px;'
      : 'align-self:flex-start;background:var(--muted);color:var(--foreground);border-bottom-left-radius:4px;');
  div.textContent = text;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function renderHistory() {
  const wrap = el('aiMessages');
  if (!wrap) return;
  wrap.innerHTML = '';
  if (history.length === 0) {
    const hint = document.createElement('div');
    hint.style.cssText = 'text-align:center;color:var(--muted-foreground);font-size:.8125rem;padding:24px 8px;line-height:1.8';
    hint.textContent = t('سلام! من دستیار هوش مصنوعی مادیکس تولز هستم و همیشه به فارسی پاسخ می‌دهم. هر سوالی داری بپرس.', 'Hi! I\'m the Maddix Tools AI assistant. Ask me anything.');
    wrap.appendChild(hint);
    return;
  }
  history.forEach(m => addBubble(m.role, m.content));
}

async function grokRequest(messages) {
  const payload = { model: prefs.model || 'grok-4.5', key: prefs.key, messages: messages };
  let res = await fetch('/api/grok', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.status === 404) {
    res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + prefs.key },
      body: JSON.stringify({ model: prefs.model || 'grok-4.5', messages: messages, stream: false, temperature: 0.7, max_tokens: 1200 })
    });
  }
  let json = null;
  try { json = await res.json(); } catch(e) {}
  if (!res.ok) {
    const msg = (json && (json.error && (json.error.message || json.error.code))) || (json && json.error) || ('HTTP ' + res.status);
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
  const reply = json && json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
  if (!reply) throw new Error(t('پاسخ خالی دریافت شد.', 'Empty reply from model.'));
  return reply;
}

async function send() {
  const input = el('aiInput');
  if (!input || busy) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  history.push({ role: 'user', content: text });
  renderHistory();
  addBubble('bot', '…');
  busy = true;
  const sendBtn = el('aiSendBtn'); if (sendBtn) sendBtn.disabled = true;
  try {
    if (!prefs.key) {
      history.push({ role: 'assistant', content: t('کلید API گروک تنظیم نشده است. روی دکمه ⚙️ بزن و کلید خود را وارد کن.', 'Grok API key is not set. Click ⚙️ and add your key.') });
      openPanel();
      showSetup(true);
      return;
    }
    const reply = await grokRequest([{ role: 'system', content: systemPrompt() }].concat(history));
    history.push({ role: 'assistant', content: reply });
  } catch (err) {
    history.push({ role: 'assistant', content: '⚠️ ' + t('خطا: ', 'Error: ') + err.message });
  } finally {
    busy = false;
    const btn = el('aiSendBtn'); if (btn) btn.disabled = false;
    renderHistory();
  }
}

function bind() {
  loadPrefs();
  const fab = el('aiFab');
  const panel = el('aiPanel');
  if (!fab || !panel) return;
  if (fab.dataset.bound) return;
  fab.dataset.bound = '1';

  fab.addEventListener('click', () => {
    if (panel.classList.contains('hidden')) openPanel();
    else closePanel();
  });
  const closeBtn = el('aiCloseBtn'); if (closeBtn) closeBtn.addEventListener('click', closePanel);
  const settingsBtn = el('aiSettingsBtn'); if (settingsBtn) settingsBtn.addEventListener('click', toggleSetup);
  const saveBtn = el('aiSaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const k = el('aiKeyInput');
    const m = el('aiModelInput');
    if (k) prefs.key = k.value.trim();
    if (m && m.value.trim()) prefs.model = m.value.trim();
    savePrefs();
    showSetup(false);
  });
  const clearBtn = el('aiClearBtn');
  if (clearBtn) clearBtn.addEventListener('click', () => { history = []; renderHistory(); });
  const sendBtn = el('aiSendBtn'); if (sendBtn) sendBtn.addEventListener('click', send);
  const input = el('aiInput');
  if (input) input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  const keyInput = el('aiKeyInput'); if (keyInput) keyInput.value = prefs.key;
  const modelInput = el('aiModelInput'); if (modelInput) modelInput.value = prefs.model;
  setLang(document.documentElement.lang || 'fa');
  renderHistory();
}

window.MaddixAI = { bind, setLang, open: openPanel, close: closePanel, send };

document.addEventListener('DOMContentLoaded', () => setTimeout(bind, 0));
if (document.readyState !== 'loading') setTimeout(bind, 0);

})();
