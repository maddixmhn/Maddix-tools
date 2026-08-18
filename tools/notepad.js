export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  return `<div class="panel">
    <h3 class="section-title">${t('یادداشت مارک‌داون', 'Markdown Notepad')}</h3>
    <div class="stack">
      <textarea id="np-content" class="field" rows="12" placeholder="${t('متن خود را بنویسید...', 'Type your notes here...')}" style="min-height:200px;font-family:var(--font-mono);font-size:.88rem"></textarea>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div class="subtle" id="np-stats">${t('کاراکتر', 'Characters')}: 0 | ${t('کلمات', 'Words')}: 0</div>
        <div class="button-row">
          <button class="secondary-btn" onclick="npSave()">${t('ذخیره', 'Save')}</button>
          <button class="secondary-btn" onclick="npLoad()">${t('بارگذاری', 'Load')}</button>
          <button class="secondary-btn" onclick="npFullscreen()">${t('تمام‌صفحه', 'Full Screen')}</button>
          <button class="danger-btn" onclick="npClear()">${t('پاک کردن', 'Clear')}</button>
        </div>
      </div>
      <div class="subtle" style="font-size:.78rem">${t('ذخیره خودکار در localStorage', 'Auto-saved to localStorage')}</div>
    </div>
  </div>`;
}

export function init() {
  const ta = document.getElementById('np-content');
  const stats = document.getElementById('np-stats');
  function updateStats() {
    const t = ta.value;
    const chars = t.length;
    const words = t.trim() ? t.trim().split(/\s+/).length : 0;
    stats.textContent = '\u{1F4DD} Characters: ' + chars + ' | Words: ' + words;
  }
  function autoSave() {
    localStorage.setItem('mt-notepad', ta.value);
    updateStats();
  }
  window.npSave = function() { localStorage.setItem('mt-notepad', ta.value); };
  window.npLoad = function() { ta.value = localStorage.getItem('mt-notepad') || ''; updateStats(); };
  window.npClear = function() { ta.value = ''; autoSave(); };
  window.npFullscreen = function() {
    if (!document.fullscreenElement) {
      ta.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  ta.addEventListener('input', autoSave);
  npLoad();
}
