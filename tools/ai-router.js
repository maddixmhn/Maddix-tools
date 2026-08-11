// ─────────────────────────────────────────────────────────────
//  AI Router — 9Router-style dashboard (client-side)
//  Providers, 3-tier fallback, usage/quota, format translator,
//  and a live test console via the /api/ai-router proxy.
// ─────────────────────────────────────────────────────────────

const PROVIDERS = [
  { id:'openai',    name:'OpenAI',       tier:'sub',   icon:'🤖', models:['gpt-4o','gpt-4o-mini','gpt-4.1'],        baseUrl:'https://api.openai.com/v1/chat/completions',                              format:'openai',    costIn:2.50,  costOut:10.00, quota:5e6 },
  { id:'anthropic', name:'Anthropic',    tier:'sub',   icon:'🟠', models:['claude-sonnet-4-5','claude-opus-4-1'],   baseUrl:'https://api.anthropic.com/v1/messages',                                  format:'anthropic', costIn:3.00,  costOut:15.00, quota:5e6 },
  { id:'gemini',    name:'Gemini',       tier:'sub',   icon:'💎', models:['gemini-2.5-pro','gemini-2.5-flash'],     baseUrl:'https://generativelanguage.googleapis.com/v1beta/models/',              format:'gemini',    costIn:1.25,  costOut:10.00, quota:5e6 },
  { id:'xai',       name:'xAI Grok',     tier:'sub',   icon:'🛰️', models:['grok-4.5'],                              baseUrl:'https://api.x.ai/v1/chat/completions',                                   format:'openai',    costIn:2.00,  costOut:10.00, quota:5e6 },
  { id:'deepseek',  name:'DeepSeek',     tier:'cheap', icon:'🐋', models:['deepseek-chat','deepseek-reasoner'],      baseUrl:'https://api.deepseek.com/v1/chat/completions',                           format:'openai',    costIn:0.27,  costOut:1.10,  quota:5e6 },
  { id:'mistral',   name:'Mistral',      tier:'cheap', icon:'🌀', models:['mistral-large-latest','mistral-small-latest'],baseUrl:'https://api.mistral.ai/v1/chat/completions',                        format:'openai',    costIn:0.30,  costOut:0.90,  quota:5e6 },
  { id:'openrouter',name:'OpenRouter',    tier:'cheap', icon:'🌐', models:['openai/gpt-4o-mini','meta-llama/llama-3.3-70b-instruct','anthropic/claude-sonnet-4'],baseUrl:'https://openrouter.ai/api/v1/chat/completions',          format:'openai',    costIn:0.25,  costOut:1.00,  quota:1e7 },
  { id:'glm',       name:'GLM',          tier:'cheap', icon:'📘', models:['glm-4.7','glm-4.5'],                       baseUrl:'https://open.bigmodel.cn/api/paas/v4/chat/completions',                   format:'openai',    costIn:0.60,  costOut:2.00,  quota:5e6 },
  { id:'minimax',   name:'MiniMax',      tier:'cheap', icon:'🧠', models:['MiniMax-M2.7'],                            baseUrl:'https://api.minimax.chat/v1/text/chatcompletion_v2',                      format:'openai',    costIn:0.20,  costOut:1.10,  quota:5e6 },
  { id:'kimi',      name:'Kimi',         tier:'cheap', icon:'🦊', models:['kimi-k2'],                                 baseUrl:'https://api.moonshot.cn/v1/chat/completions',                            format:'openai',    costIn:0.20,  costOut:1.20,  quota:5e6 },
  { id:'groq',      name:'Groq',         tier:'free',  icon:'⚡', models:['llama-3.3-70b-versatile','llama-3.1-8b-instant','mixtral-8x7b-32768'],baseUrl:'https://api.groq.com/openai/v1/chat/completions', costIn:0.59, costOut:0.79, quota:1e6 },
  { id:'qwen',      name:'Qwen',         tier:'free',  icon:'🎋', models:['qwen2.5-72b-instruct'],                    baseUrl:'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',     format:'openai',    costIn:0.10,  costOut:0.40,  quota:2e6 },
  { id:'nvidia',    name:'NVIDIA NIM',   tier:'free',  icon:'🟩', models:['meta/llama-3.1-405b-instruct'],            baseUrl:'https://integrate.api.nvidia.com/v1/chat/completions',                    format:'openai',    costIn:0.10,  costOut:0.30,  quota:2e6 },
  { id:'cerebras',  name:'Cerebras',     tier:'free',  icon:'🟪', models:['llama-3.3-70b'],                            baseUrl:'https://api.cerebras.ai/v1/chat/completions',                           format:'openai',    costIn:0.10,  costOut:0.10,  quota:2e6 },
  { id:'github',    name:'GitHub Models',tier:'free',  icon:'🐙', models:['gpt-4o','gpt-4o-mini','o3-mini'],          baseUrl:'https://models.github.ai/inference/v1/chat/completions',                  format:'openai',    costIn:0.00,  costOut:0.00,  quota:2e7 },
  { id:'cloudflare',name:'Cloudflare AI',tier:'free',  icon:'🟠', models:['@cf/meta/llama-3.3-70b-instruct-fp8-fast'],baseUrl:'https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/ai/v1/chat/completions',format:'openai', costIn:0.00, costOut:0.00, quota:1e7 },
];

const LS_KEY = 'maddixAiRouter';
const TIER_LABEL = { sub:{fa:'سابسکریپشن',en:'Subscription'}, cheap:{fa:'ارزان',en:'Cheap'}, free:{fa:'رایگان',en:'FREE'} };

function defaultState() {
  return { keys:{}, models:{}, enabled:{}, chain:[], usage:{}, month:'', totalRequests:0, totalTokens:0, totalCost:0 };
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
    if (raw && typeof raw === 'object') {
      const st = Object.assign(defaultState(), raw);
      // month rollover → reset monthly counters
      const key = monthKey();
      if (st.month !== key) { st.month = key; st.totalRequests = 0; st.totalTokens = 0; st.totalCost = 0; st.usage = {}; }
      return st;
    }
  } catch(e) {}
  return Object.assign(defaultState(), { month: monthKey() });
}

function saveState(st) { try { localStorage.setItem(LS_KEY, JSON.stringify(st)); } catch(e) {} }

function monthKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Format translator ────────────────────────────────────
function normalizeMessages(messages, format) {
  const out = [];
  (messages || []).forEach(m => {
    if (format === 'anthropic') {
      if (m.system) out.push({ role:'system', content:m.system });
      (m.messages || []).forEach(x => out.push({ role:x.role==='assistant'?'assistant':'user', content:x.content }));
    } else if (format === 'gemini') {
      (m.contents || []).forEach(c => {
        const role = c.role === 'model' ? 'assistant' : 'user';
        const text = (c.parts || []).map(p => p.text || '').join('');
        if (text) out.push({ role, content:text });
      });
    } else {
      if (m.role && m.content) out.push({ role:m.role, content:m.content });
    }
  });
  return out;
}

function denormalizeMessages(messages, format) {
  if (format === 'anthropic') {
    const system = messages.filter(m => m.role === 'system').map(m => m.content).join('\n');
    const rest = messages.filter(m => m.role !== 'system').map(m => ({ role:m.role, content:m.content }));
    return { system: system || undefined, messages: rest };
  }
  if (format === 'gemini') {
    const contents = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts:[{ text:m.content }] }));
    return { contents };
  }
  return messages;
}

// ── Provider request builders ───────────────────────────
function buildRequest(p, key, model, messages) {
  if (p.format === 'anthropic') {
    const denorm = denormalizeMessages(messages, 'anthropic');
    const body = { model, max_tokens: 4096, messages: denorm.messages };
    if (denorm.system) body.system = denorm.system;
    return {
      url: p.baseUrl,
      headers: { 'Content-Type':'application/json', 'x-api-key':key, 'anthropic-version':'2023-06-01' },
      body,
    };
  }
  if (p.format === 'gemini') {
    return {
      url: p.baseUrl + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(key),
      headers: { 'Content-Type':'application/json' },
      body: denormalizeMessages(messages, 'gemini'),
    };
  }
  return {
    url: p.baseUrl,
    headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + key },
    body: { model, messages, stream:false, temperature:0.7 },
  };
}

function normalizeResponse(p, data) {
  let content = '', usage = { prompt_tokens:0, completion_tokens:0 };
  if (p.format === 'anthropic') {
    content = (data.content || []).map(c => c.text || '').join('');
    usage = { prompt_tokens: data.usage?.input_tokens || 0, completion_tokens: data.usage?.output_tokens || 0 };
  } else if (p.format === 'gemini') {
    content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    usage = { prompt_tokens: data.usageMetadata?.promptTokenCount || 0, completion_tokens: data.usageMetadata?.candidatesTokenCount || 0 };
  } else {
    content = data.choices?.[0]?.message?.content || '';
    usage = { prompt_tokens: data.usage?.prompt_tokens || 0, completion_tokens: data.usage?.completion_tokens || 0 };
  }
  return { content, usage };
}

// ── Render ──────────────────────────────────────────────
export default function render(lang) {
  const f = lang === 'fa';
  const T = (fa, en) => f ? fa : en;
  const st = loadState();

  const stats = { active: PROVIDERS.filter(p => st.enabled[p.id]).length, req: st.totalRequests, tokens: st.totalTokens, cost: st.totalCost };
  const tierCount = { sub:0, cheap:0, free:0 };
  PROVIDERS.forEach(p => { if (st.enabled[p.id]) tierCount[p.tier]++; });

  const statCards = [
    { icon:'🟢', label:T('پروایدر فعال','Active providers'), value: stats.active },
    { icon:'📨', label:T('درخواست (ماه)','Requests (month)'), value: stats.req },
    { icon:'🔤', label:T('توکن (ماه)','Tokens (month)'), value: formatNum(stats.tokens) },
    { icon:'💰', label:T('هزینه تخمینی','Est. cost'), value: '$' + stats.cost.toFixed(2) },
  ].map(c => `<div style="flex:1;min-width:150px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:12px;text-align:center">
      <div style="font-size:1.3rem">${c.icon}</div>
      <div style="font-size:1.25rem;font-weight:700;margin-top:4px">${c.value}</div>
      <div style="font-size:.72rem;color:var(--muted-foreground);margin-top:2px">${c.label}</div>
    </div>`).join('');

  const tierBadges = [
    { key:'sub', icon:'💳', label:T('سابسکریپشن','Subscription'), count: tierCount.sub, color:'#f59e0b' },
    { key:'cheap', icon:'🏷️', label:T('ارزان','Cheap'), count: tierCount.cheap, color:'#3b82f6' },
    { key:'free', icon:'🎁', label:T('رایگان','FREE'), count: tierCount.free, color:'#22c55e' },
  ].map(t => `<div style="flex:1;min-width:130px;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:12px;text-align:center">
      <div style="font-size:1.1rem">${t.icon} ${t.label}</div>
      <div style="font-size:1.6rem;font-weight:800;color:${t.color};margin-top:2px">${t.count}</div>
      <div style="font-size:.7rem;color:var(--muted-foreground)">${T('پروایدر فعال','active providers')}</div>
    </div>`).join('');

  return `
<div id="aiRouterRoot" style="padding:4px 0">
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px">
    <span style="font-size:2rem">🔀</span>
    <div style="flex:1;min-width:220px">
      <h2 style="margin:0;font-size:1.4rem;font-weight:800;letter-spacing:-.02em">AI Router <span style="color:var(--accent)">·</span> ${T('یک روتر، همه پروایدرها','One router, all providers')}</h2>
      <p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.8125rem">${T('گیتوی هوشمند بین ابزارهای شما و پروایدرهای AI — fallback سه‌لایه، صفر قطعی', 'Smart gateway between your tools and AI providers — 3-tier fallback, zero downtime')}</p>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <span style="background:var(--muted);border-radius:999px;padding:4px 10px;font-size:.75rem;font-weight:700">16 ${T('پروایدر','providers')}</span>
      <span style="background:var(--muted);border-radius:999px;padding:4px 10px;font-size:.75rem;font-weight:700">3 ${T('لایه','tiers')}</span>
      <a href="https://github.com/decolua/9router" target="_blank" rel="noopener" style="background:var(--muted);border-radius:999px;padding:4px 10px;font-size:.75rem;font-weight:700;text-decoration:none;color:var(--foreground)">GitHub ↗</a>
    </div>
  </div>

  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">${statCards}</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">${tierBadges}</div>

  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:8px" id="arTabs">
    <button class="ar-tab active" data-panel="overview" style="padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card);font-size:.8125rem;font-weight:600;cursor:pointer">📊 ${T('مرور','Overview')}</button>
    <button class="ar-tab" data-panel="providers" style="padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card);font-size:.8125rem;font-weight:600;cursor:pointer">🧩 ${T('پروایدرها','Providers')}</button>
    <button class="ar-tab" data-panel="router" style="padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card);font-size:.8125rem;font-weight:600;cursor:pointer">🔀 ${T('مسیریاب','Router')}</button>
    <button class="ar-tab" data-panel="usage" style="padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card);font-size:.8125rem;font-weight:600;cursor:pointer">📈 ${T('مصرف','Usage')}</button>
    <button class="ar-tab" data-panel="translator" style="padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card);font-size:.8125rem;font-weight:600;cursor:pointer">🔄 ${T('مترجم فرمت','Translator')}</button>
  </div>

  <div id="arPanel-overview" class="ar-panel">${overviewHtml(f, st)}</div>
  <div id="arPanel-providers" class="ar-panel" style="display:none">${providersHtml(f, st)}</div>
  <div id="arPanel-router" class="ar-panel" style="display:none">${routerHtml(f, st)}</div>
  <div id="arPanel-usage" class="ar-panel" style="display:none">${usageHtml(f, st)}</div>
  <div id="arPanel-translator" class="ar-panel" style="display:none">${translatorHtml(f)}</div>
</div>`;
}

// ── Panel builders ──────────────────────────────────────
function overviewHtml(f, st) {
  const T = (fa, en) => f ? fa : en;
  const enabled = PROVIDERS.filter(p => st.enabled[p.id]);
  const list = enabled.length
    ? enabled.map(p => {
        const key = st.keys[p.id] ? '✓' : '·';
        const m = st.models[p.id] || p.models[0];
        const u = st.usage[p.id];
        const pct = u ? Math.min(100, Math.round((u.tokens / p.quota) * 100)) : 0;
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--card);border:1px solid var(--border);border-radius:10px;margin-bottom:6px">
          <span style="font-size:1.2rem">${p.icon}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:.8125rem;font-weight:600">${p.name} <span style="font-size:.65rem;color:var(--muted-foreground)">${key ? '· API' : ''}</span></div>
            <div style="font-size:.68rem;color:var(--muted-foreground);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m}</div>
          </div>
          <span style="font-size:.68rem;color:${tierColor(p.tier)};font-weight:700">${TIER_LABEL[p.tier][f?'fa':'en']}</span>
          <div style="width:70px;height:6px;border-radius:99px;background:var(--muted);overflow:hidden"><div style="height:100%;width:${pct}%;background:${tierColor(p.tier)}"></div></div>
        </div>`;
      }).join('')
    : `<div style="padding:24px;text-align:center;color:var(--muted-foreground);font-size:.8125rem">${T('هنوز پروایدری فعال نشده — از تب «پروایدرها» شروع کن','No active providers yet — start from the Providers tab')}</div>`;

  return `
    <div style="padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:12px">
      <h3 style="margin:0 0 10px;font-size:.9375rem;font-weight:700">${T('پروایدرهای فعال','Active providers')}</h3>
      ${list}
    </div>
    <div style="padding:14px;background:var(--card);border:1px solid var(--border);border-radius:12px">
      <h3 style="margin:0 0 8px;font-size:.9375rem;font-weight:700">⚡ ${T('Fallback سه‌لایه','3-Tier Fallback')}</h3>
      <p style="margin:0;font-size:.78rem;color:var(--muted-foreground);line-height:1.7">
        ${T('مسیریاب به‌صورت خودکار از پروایدرهای سابسکریپشن شروع می‌کند؛ وقتی کوتا تمام شد به لایه ارزان و در نهایت رایگان می‌رود — بدون قطعی.', 'The router automatically starts with Subscription providers; when quota runs out it falls back to Cheap, then FREE — zero downtime.')}
      </p>
      <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
        <span style="font-size:.72rem;padding:3px 10px;border-radius:99px;background:#fef3c7;color:#92400e">💳 Sub → Cheap → FREE</span>
        <span style="font-size:.72rem;padding:3px 10px;border-radius:99px;background:#dcfce7;color:#166534">⚡ ${T('پایان کوتا = جابه‌جایی خودکار','quota out = auto switch')}</span>
      </div>
    </div>`;
}

function providersHtml(f, st) {
  const T = (fa, en) => f ? fa : en;
  const cards = PROVIDERS.map(p => {
    const key = st.keys[p.id] || '';
    const model = st.models[p.id] || p.models[0];
    const enabled = !!st.enabled[p.id];
    const u = st.usage[p.id];
    const pct = u ? Math.min(100, Math.round((u.tokens / p.quota) * 100)) : 0;
    const modelsOpts = p.models.map(m => `<option value="${esc(m)}" ${m === model ? 'selected' : ''}>${esc(m)}</option>`).join('');
    return `
    <div style="background:var(--card);border:1px solid ${enabled ? tierColor(p.tier) : 'var(--border)'};border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;opacity:${enabled ? 1 : .55}">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:1.4rem">${p.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:.85rem;font-weight:700">${p.name}</div>
          <div style="font-size:.65rem;color:${tierColor(p.tier)};font-weight:700">${TIER_LABEL[p.tier][f?'fa':'en']} · $${p.costIn}/$${p.costOut} ${T('هر میلیون','per M')}</div>
        </div>
        <label style="display:inline-flex;align-items:center;gap:5px;font-size:.72rem;cursor:pointer">
          <input type="checkbox" class="ar-enable" data-pid="${p.id}" ${enabled ? 'checked' : ''} style="accent-color:var(--accent)"> ${T('فعال','On')}
        </label>
      </div>
      <select class="ar-model" data-pid="${p.id}" style="width:100%;padding:7px 9px;border-radius:8px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.75rem;outline:none">${modelsOpts}</select>
      <input type="password" class="ar-key" data-pid="${p.id}" placeholder="${T('کلید API...','API key...')}" value="${esc(key)}" style="width:100%;box-sizing:border-box;padding:7px 9px;border-radius:8px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.75rem;outline:none" autocomplete="off" spellcheck="false">
      <div style="height:5px;border-radius:99px;background:var(--muted);overflow:hidden"><div style="height:100%;width:${pct}%;background:${tierColor(p.tier)}"></div></div>
      <div style="font-size:.65rem;color:var(--muted-foreground);display:flex;justify-content:space-between"><span>${T('مصرف ماه','month usage')}</span><span>${pct}%</span></div>
    </div>`;
  }).join('');

  return `
    <div style="margin-bottom:10px;font-size:.78rem;color:var(--muted-foreground)">${T('کلیدها فقط در مرورگر شما (localStorage) ذخیره می‌شوند.','Keys are stored only in your browser (localStorage).')}</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px">${cards}</div>`;
}

function routerHtml(f, st) {
  const T = (fa, en) => f ? fa : en;
  const enabled = PROVIDERS.filter(p => st.enabled[p.id]);
  const chain = buildChain(st, enabled);

  const chainList = chain.map((p, i) => `
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--card);border:1px solid var(--border);border-radius:10px;margin-bottom:6px" data-ar-chain-pid="${p.id}">
      <span style="font-size:.72rem;font-weight:800;color:var(--muted-foreground);width:18px;text-align:center">${i+1}</span>
      <span style="font-size:1.15rem">${p.icon}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:.8125rem;font-weight:600">${p.name}</div>
        <div style="font-size:.65rem;color:var(--muted-foreground)">${st.models[p.id] || p.models[0]}</div>
      </div>
      <span style="font-size:.65rem;color:${tierColor(p.tier)};font-weight:700">${TIER_LABEL[p.tier][f?'fa':'en']}</span>
      <button class="ar-chain-up" data-pid="${p.id}" title="${T('بالا','Up')}" style="border:1px solid var(--border);background:var(--muted);border-radius:6px;cursor:pointer;padding:2px 7px;font-size:.75rem">↑</button>
      <button class="ar-chain-down" data-pid="${p.id}" title="${T('پایین','Down')}" style="border:1px solid var(--border);background:var(--muted);border-radius:6px;cursor:pointer;padding:2px 7px;font-size:.75rem">↓</button>
    </div>`).join('') || `<div style="padding:16px;text-align:center;color:var(--muted-foreground);font-size:.8125rem">${T('ابتدا پروایدرها را فعال کن','Enable some providers first')}</div>`;

  return `
    <div style="display:grid;grid-template-columns:1fr;gap:12px">
      <div style="padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px">
        <h3 style="margin:0 0 4px;font-size:.9375rem;font-weight:700">🔗 ${T('زنجیره Fallback','Fallback Chain')}</h3>
        <p style="margin:0 0 10px;font-size:.75rem;color:var(--muted-foreground)">${T('ترتیب پروایدرها را با ↑ ↓ تنظیم کن. مسیریاب به همین ترتیب امتحان می‌کند.','Reorder providers with ↑ ↓. The router tries them in this order.')}</p>
        <div id="arChainList">${chainList}</div>
      </div>
      <div style="padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px">
        <h3 style="margin:0 0 10px;font-size:.9375rem;font-weight:700">🧪 ${T('کنسول تست','Test Console')}</h3>
        <textarea id="arTestPrompt" rows="3" placeholder="${T('پیام تست را بنویس...','Write a test prompt...')}" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.8125rem;outline:none;resize:vertical"></textarea>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
          <button id="arTestRun" style="padding:9px 18px;border-radius:10px;border:none;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;font-size:.8125rem;font-weight:700;cursor:pointer">🚀 ${T('اجرای زنجیره','Run chain')}</button>
          <span id="arTestStatus" style="align-self:center;font-size:.78rem;color:var(--muted-foreground)"></span>
        </div>
        <div id="arTestLog" style="margin-top:10px;font-size:.75rem;font-family:ui-monospace,monospace;white-space:pre-wrap;line-height:1.6"></div>
      </div>
    </div>`;
}

function usageHtml(f, st) {
  const T = (fa, en) => f ? fa : en;
  const enabled = PROVIDERS.filter(p => st.enabled[p.id]);
  const rows = enabled.map(p => {
    const u = st.usage[p.id];
    const tokens = u ? u.tokens : 0;
    const cost = u ? u.cost : 0;
    const req = u ? u.requests : 0;
    const pct = Math.min(100, Math.round((tokens / p.quota) * 100));
    const reset = daysToMonthEnd();
    return `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:1.3rem">${p.icon}</span>
        <div style="flex:1;min-width:140px">
          <div style="font-size:.85rem;font-weight:700">${p.name}</div>
          <div style="font-size:.68rem;color:var(--muted-foreground)">${T('ریست','reset')} ${reset} ${T('روز دیگر','days')}</div>
        </div>
        <div style="text-align:center;min-width:70px"><div style="font-size:.95rem;font-weight:700">${formatNum(tokens)}</div><div style="font-size:.62rem;color:var(--muted-foreground)">${T('توکن','tokens')}</div></div>
        <div style="text-align:center;min-width:60px"><div style="font-size:.95rem;font-weight:700">$${cost.toFixed(2)}</div><div style="font-size:.62rem;color:var(--muted-foreground)">${T('هزینه','cost')}</div></div>
        <div style="text-align:center;min-width:50px"><div style="font-size:.95rem;font-weight:700">${req}</div><div style="font-size:.62rem;color:var(--muted-foreground)">${T('درخواست','req')}</div></div>
        <div style="width:110px;height:8px;border-radius:99px;background:var(--muted);overflow:hidden"><div style="height:100%;width:${pct}%;background:${pct > 85 ? 'var(--destructive)' : tierColor(p.tier)}"></div></div>
        <span style="font-size:.68rem;color:var(--muted-foreground);min-width:42px;text-align:right">${pct}%</span>
      </div>
    </div>`;
  }).join('') || `<div style="padding:24px;text-align:center;color:var(--muted-foreground);font-size:.8125rem">${T('پروایدر فعالی نیست','No active providers')}</div>`;

  const now = new Date();
  return `
    <div style="padding:14px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap">
      <div style="flex:1;min-width:150px;text-align:center"><div style="font-size:1.2rem;font-weight:800">${st.totalRequests}</div><div style="font-size:.68rem;color:var(--muted-foreground)">${T('مجموع درخواست‌ها','total requests')}</div></div>
      <div style="flex:1;min-width:150px;text-align:center"><div style="font-size:1.2rem;font-weight:800">${formatNum(st.totalTokens)}</div><div style="font-size:.68rem;color:var(--muted-foreground)">${T('مجموع توکن‌ها','total tokens')}</div></div>
      <div style="flex:1;min-width:150px;text-align:center"><div style="font-size:1.2rem;font-weight:800">$${st.totalCost.toFixed(2)}</div><div style="font-size:.68rem;color:var(--muted-foreground)">${T('مجموع هزینه','total cost')}</div></div>
      <div style="flex:1;min-width:150px;text-align:center"><div style="font-size:1.2rem;font-weight:800">${daysToMonthEnd()}</div><div style="font-size:.68rem;color:var(--muted-foreground)">${T('روز تا ریست ماهانه','days to monthly reset')}</div></div>
    </div>
    ${rows}`;
}

function translatorHtml(f) {
  const T = (fa, en) => f ? fa : en;
  const fmtLabel = { openai:'OpenAI', anthropic:'Anthropic', gemini:'Gemini' };
  const opts = Object.keys(fmtLabel).map(k => `<option value="${k}">${fmtLabel[k]}</option>`).join('');
  const example = JSON.stringify({ messages:[{ role:'system', content:'You are helpful.' }, { role:'user', content:'Hello' }] }, null, 2);
  return `
    <div style="padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px">
      <h3 style="margin:0 0 6px;font-size:.9375rem;font-weight:700">🔄 ${T('تبدیل بین فرمت‌های پروایدر','Convert between provider formats')}</h3>
      <p style="margin:0 0 12px;font-size:.75rem;color:var(--muted-foreground)">${T('فرمت پیام را بین OpenAI / Anthropic / Gemini تبدیل کن.','Convert message format between OpenAI / Anthropic / Gemini.')}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        <select id="arTransFrom" style="padding:8px 10px;border-radius:8px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.78rem;outline:none">${opts}</select>
        <span style="align-self:center;font-size:.85rem">→</span>
        <select id="arTransTo" style="padding:8px 10px;border-radius:8px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.78rem;outline:none">${opts}</select>
        <button id="arTransBtn" style="padding:8px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;font-size:.78rem;font-weight:700;cursor:pointer">${T('تبدیل','Convert')}</button>
      </div>
      <textarea id="arTransInput" rows="7" spellcheck="false" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid var(--input);background:var(--background);color:var(--foreground);font-size:.75rem;outline:none;font-family:ui-monospace,monospace;direction:ltr;text-align:left">${esc(example)}</textarea>
      <div style="font-size:.68rem;color:var(--muted-foreground);margin:6px 0 10px">${T('خروجی به‌صورت خودکار در پایین نمایش داده می‌شود.','Output is shown below automatically.')}</div>
      <pre id="arTransOutput" style="margin:0;padding:12px;background:var(--background);border:1px solid var(--border);border-radius:10px;font-size:.75rem;font-family:ui-monospace,monospace;white-space:pre-wrap;word-break:break-word;color:var(--muted-foreground);direction:ltr;text-align:left">—</pre>
    </div>`;
}

// ── Init ────────────────────────────────────────────────
export function init(lang) {
  const f = lang === 'fa';
  const T = (fa, en) => f ? fa : en;
  const root = document.getElementById('aiRouterRoot');
  if (!root) return;
  const st = loadState();

  // Tabs
  root.querySelectorAll('.ar-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('.ar-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      root.querySelectorAll('.ar-panel').forEach(p => p.style.display = 'none');
      const panel = root.querySelector('#arPanel-' + btn.dataset.panel);
      if (panel) panel.style.display = '';
    });
  });

  // Providers: enable / model / key
  root.querySelectorAll('.ar-enable').forEach(cb => {
    cb.addEventListener('change', () => {
      st.enabled[cb.dataset.pid] = cb.checked;
      saveState(st);
      rerenderRoot(root, f, st);
    });
  });
  root.querySelectorAll('.ar-model').forEach(sel => {
    sel.addEventListener('change', () => { st.models[sel.dataset.pid] = sel.value; saveState(st); });
  });
  root.querySelectorAll('.ar-key').forEach(inp => {
    inp.addEventListener('change', () => { st.keys[inp.dataset.pid] = inp.value.trim(); saveState(st); });
  });

  // Chain reorder
  root.querySelectorAll('.ar-chain-up').forEach(btn => {
    btn.addEventListener('click', () => moveChain(root, st, btn.dataset.pid, -1, f));
  });
  root.querySelectorAll('.ar-chain-down').forEach(btn => {
    btn.addEventListener('click', () => moveChain(root, st, btn.dataset.pid, 1, f));
  });

  // Test console
  const runBtn = document.getElementById('arTestRun');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      runChain(root, st, f);
    });
  }

  // Translator
  const transBtn = document.getElementById('arTransBtn');
  if (transBtn) {
    transBtn.addEventListener('click', () => {
      const from = document.getElementById('arTransFrom').value;
      const to = document.getElementById('arTransTo').value;
      const out = document.getElementById('arTransOutput');
      try {
        const parsed = JSON.parse(document.getElementById('arTransInput').value);
        const msgs = normalizeMessages(parsed.messages || parsed, from);
        const result = denormalizeMessages(msgs, to);
        out.textContent = JSON.stringify(to === 'anthropic' ? { system: result.system || undefined, messages: result.messages } : result, null, 2);
        out.style.color = 'var(--foreground)';
      } catch(e) {
        out.textContent = 'Error: ' + e.message;
        out.style.color = 'var(--destructive)';
      }
    });
  }
}

function rerenderRoot(root, f, st) {
  const active = root.querySelector('.ar-tab.active')?.dataset.panel || 'overview';
  root.querySelectorAll('.ar-panel').forEach(p => p.style.display = 'none');
  const panels = { overview: overviewHtml, providers: providersHtml, router: routerHtml, usage: usageHtml, translator: translatorHtml };
  Object.keys(panels).forEach(k => {
    const el = root.querySelector('#arPanel-' + k);
    if (el) {
      el.innerHTML = panels[k](f, st);
      el.style.display = (k === active) ? '' : 'none';
    }
  });
  init(lang);
}

function buildChain(st, enabled) {
  if (st.chain && st.chain.length) {
    const ordered = st.chain.map(id => PROVIDERS.find(p => p.id === id)).filter(Boolean).filter(p => st.enabled[p.id]);
    const rest = enabled.filter(p => !ordered.find(x => x.id === p.id));
    return ordered.concat(rest);
  }
  const order = { sub:0, cheap:1, free:2 };
  return enabled.slice().sort((a, b) => order[a.tier] - order[b.tier] || a.name.localeCompare(b.name));
}

function moveChain(root, st, pid, dir, f) {
  const enabled = PROVIDERS.filter(p => st.enabled[p.id]);
  const chain = buildChain(st, enabled);
  const idx = chain.findIndex(p => p.id === pid);
  const ni = idx + dir;
  if (idx < 0 || ni < 0 || ni >= chain.length) return;
  const tmp = chain[idx]; chain[idx] = chain[ni]; chain[ni] = tmp;
  st.chain = chain.map(p => p.id);
  saveState(st);
  rerenderRoot(root, f, st);
}

async function runChain(root, st, f) {
  const T = (fa, en) => f ? fa : en;
  const log = document.getElementById('arTestLog');
  const status = document.getElementById('arTestStatus');
  const prompt = (document.getElementById('arTestPrompt')?.value || '').trim();
  if (!prompt) { if (status) status.textContent = T('پیام بنویس','write a prompt first'); return; }
  if (!log) return;
  const enabled = PROVIDERS.filter(p => st.enabled[p.id] && st.keys[p.id]);
  if (!enabled.length) { log.textContent = T('پروایدر فعال با کلید پیدا نشد','no enabled provider with a key'); return; }
  const chain = buildChain(st, enabled);
  const messages = [{ role:'user', content:prompt }];
  log.textContent = '';
  let tried = [];
  for (const p of chain) {
    const model = st.models[p.id] || p.models[0];
    log.textContent += '→ ' + p.name + ' (' + model + ') ... ';
    if (status) status.textContent = T('در حال امتحان','trying') + ' ' + p.name;
    try {
      const req = buildRequest(p, st.keys[p.id], model, messages);
      const resp = await fetch('/api/ai-router', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(req),
      });
      const data = await resp.json();
      if (!resp.ok) {
        log.textContent += '✗ ' + (data.error || ('HTTP ' + resp.status)) + '\n';
        tried.push(p.id);
        continue;
      }
      const norm = normalizeResponse(p, data);
      if (!norm.content) { log.textContent += '✗ empty\n'; tried.push(p.id); continue; }
      // record usage
      recordUsage(st, p.id, norm.usage);
      log.textContent += '✓ answered by ' + p.name + ' (' + formatNum(norm.usage.prompt_tokens) + ' in / ' + formatNum(norm.usage.completion_tokens) + ' out)\n';
      log.textContent += '---\n' + norm.content + '\n';
      if (status) status.textContent = '';
      return;
    } catch(e) {
      log.textContent += '✗ ' + e.message + '\n';
      tried.push(p.id);
    }
  }
  if (status) status.textContent = T('همه پروایدرها ناموفق','all providers failed');
  if (tried.length) log.textContent += '\n' + T('پروکسی در دسترس نیست؟ اگر روی سرور لوکال هستی server.js/server.py را اجرا کن.','Proxy unavailable? If on a local server, run server.js/server.py.') + '\n';
}

function recordUsage(st, pid, usage) {
  const p = PROVIDERS.find(x => x.id === pid);
  if (!p) return;
  const inTok = usage.prompt_tokens || 0, outTok = usage.completion_tokens || 0;
  const cost = (inTok / 1e6) * p.costIn + (outTok / 1e6) * p.costOut;
  const u = st.usage[pid] = st.usage[pid] || { requests:0, tokens:0, cost:0 };
  u.requests++; u.tokens += inTok + outTok; u.cost += cost;
  st.totalRequests++; st.totalTokens += inTok + outTok; st.totalCost += cost;
  const key = monthKey();
  if (st.month !== key) { st.month = key; st.totalRequests = 0; st.totalTokens = 0; st.totalCost = 0; st.usage = {}; }
  saveState(st);
}

function formatNum(n) {
  if (n >= 1e9) return (n/1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1) + 'K';
  return String(n);
}

function daysToMonthEnd() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return last - now.getDate();
}

function tierColor(t) {
  return t === 'sub' ? '#f59e0b' : t === 'cheap' ? '#3b82f6' : '#22c55e';
}
