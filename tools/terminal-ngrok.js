export default function render(lang) {
  const isFa = lang === 'fa';
  const t = (fa, en) => isFa ? fa : en;
  const dir = isFa ? 'rtl' : 'ltr';

  return `<div style="display:flex;flex-direction:column;gap:0;direction:${dir}">
    <style>
      #real-terminal-root * { box-sizing:border-box }
      #real-terminal-root .rt-toolbar { display:flex;align-items:center;gap:8px;padding:6px 12px;background:#1a1b26;border:1px solid #2a2b3e;border-radius:8px 8px 0 0;flex-wrap:wrap }
      #real-terminal-root .rt-status { display:flex;align-items:center;gap:6px;font-size:12px;font-family:monospace }
      #real-terminal-root .rt-dot { width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0 }
      #real-terminal-root .rt-dot.online { background:#00ff41;box-shadow:0 0 6px #00ff4180 }
      #real-terminal-root .rt-dot.offline { background:#ff3333;box-shadow:0 0 6px #ff333380 }
      #real-terminal-root .rt-dot.reconnecting { background:#ffd700;box-shadow:0 0 6px #ffd70080;animation:rt-pulse 1.5s infinite }
      @keyframes rt-pulse { 0%,to{opacity:1} 50%{opacity:.4} }
      #real-terminal-root .rt-toolbar select { background:#0f0f1a;color:#c0caf5;border:1px solid #2a2b3e;padding:4px 8px;border-radius:4px;font-family:monospace;font-size:12px;cursor:pointer;outline:none }
      #real-terminal-root .rt-toolbar select:focus { border-color:#7aa2f7 }
      #real-terminal-root .rt-toolbar button { background:#0f0f1a;color:#c0caf5;border:1px solid #2a2b3e;padding:4px 10px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px;transition:all .15s;white-space:nowrap }
      #real-terminal-root .rt-toolbar button:hover { background:#2a2b3e;border-color:#3a3b4e }
      #real-terminal-root .rt-toolbar button.danger:hover { border-color:#ff3333;color:#ff3333 }
      #real-terminal-root .rt-container { border:1px solid #2a2b3e;border-top:none;border-radius:0 0 8px 8px;overflow:hidden;background:#0a0a0f;position:relative }
      #real-terminal-root #xterm-container { height:400px;padding:4px }
      #real-terminal-root #xterm-container .xterm { height:100% }
      #real-terminal-root #xterm-container .xterm-viewport { scrollbar-width:thin;scrollbar-color:#2a2b3e transparent }
      #real-terminal-root .rt-fallback { display:none;height:400px;background:#0a0a0f;padding:12px;font-family:'Courier New',Courier,monospace;font-size:13px;line-height:1.5;overflow-y:auto;white-space:pre-wrap;word-break:break-all;color:#00ff41 }
      #real-terminal-root .rt-fallback textarea { width:100%;min-height:60px;background:#111;color:#00ff41;border:1px solid #1a3a1a;border-radius:4px;padding:8px;font-family:monospace;font-size:13px;outline:none;resize:vertical }
      #real-terminal-root .rt-fallback textarea:focus { border-color:#00ff41 }
      #real-terminal-root .rt-fallback-input-row { display:flex;gap:8px;margin-top:8px }
      #real-terminal-root .rt-fallback-input-row input { flex:1;background:#111;color:#00ff41;border:1px solid #1a3a1a;border-radius:4px;padding:6px 8px;font-family:monospace;font-size:13px;outline:none }
      #real-terminal-root .rt-fallback-input-row input:focus { border-color:#00ff41 }
      #real-terminal-root .rt-fallback-input-row button { background:#1a3a1a;color:#00ff41;border:1px solid #00ff41;border-radius:4px;padding:6px 12px;cursor:pointer;font-family:monospace;font-size:12px }
      #real-terminal-root .rt-banner { display:none;padding:8px 12px;background:#1a1b26;border:1px solid #2a2b3e;border-top:none;font-size:11px;font-family:monospace;color:#ffd700 }
      #real-terminal-root .rt-fullscreen { position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;background:#0a0a0f;border:none;border-radius:0 }
      #real-terminal-root .rt-fullscreen .rt-toolbar { border-radius:0 }
      #real-terminal-root .rt-fullscreen .rt-container { border-radius:0;flex:1;display:flex;flex-direction:column }
      #real-terminal-root .rt-fullscreen #xterm-container { flex:1;height:auto }
    </style>

    <div class="rt-toolbar">
      <div class="rt-status">
        <span class="rt-dot offline" id="rt-statusDot"></span>
        <span id="rt-statusText" style="color:#c0caf5">${t('قطع', 'Disconnected')}</span>
      </div>
      <select id="rt-shellSelector" title="${t('نوع شل', 'Shell type')}">
        <option value="auto">${t('تشخیص خودکار', 'Auto detect')}</option>
        <option value="cmd">cmd</option>
        <option value="powershell">powershell</option>
        <option value="pwsh">pwsh</option>
        <option value="wsl">wsl</option>
        <option value="bash">bash</option>
        <option value="zsh">zsh</option>
        <option value="sh">sh</option>
        <option value="fish">fish</option>
      </select>
      <span id="rt-currentShell" style="font-size:11px;color:#565f89;font-family:monospace"></span>
      <div style="margin-left:auto;display:flex;gap:6px">
        <button id="rt-clearBtn" title="${t('پاک کردن ترمینال', 'Clear terminal')}">${t('پاک کردن', 'Clear')}</button>
        <button id="rt-disconnectBtn" class="danger" title="${t('قطع / اتصال مجدد', 'Disconnect / Reconnect')}">${t('قطع', 'Disconnect')}</button>
        <button id="rt-fullscreenBtn" title="${t('تمام صفحه', 'Toggle fullscreen')}">⛶</button>
      </div>
    </div>

    <div class="rt-container" id="rt-container">
      <div id="xterm-container"></div>
      <div class="rt-fallback" id="rt-fallback">
        <div id="rt-fallback-output" style="height:300px;overflow-y:auto;padding:4px 0"></div>
        <div class="rt-fallback-input-row">
          <span style="color:#00ff41;font-family:monospace;font-size:13px;user-select:none;line-height:32px">$</span>
          <input id="rt-fallback-input" type="text" spellcheck="false" autocomplete="off" dir="ltr" placeholder="${t('دستور را تایپ کنید...', 'Type a command...')}" />
          <button id="rt-fallback-send">${t('ارسال', 'Send')}</button>
        </div>
      </div>
    </div>

    <div class="rt-banner" id="rt-banner">
      <span>⚠️ </span>
      <span id="rt-banner-text">${t('xterm.js بارگذاری نشد. از حالت متنی استفاده می‌شود.', 'xterm.js could not be loaded. Using fallback text terminal.')}</span>
    </div>
  </div>`;
}

export function init(lang) {
  const isFa = lang === 'fa';
  const t = (fa, en) => isFa ? fa : en;

  const els = {
    statusDot: document.getElementById('rt-statusDot'),
    statusText: document.getElementById('rt-statusText'),
    shellSelector: document.getElementById('rt-shellSelector'),
    currentShell: document.getElementById('rt-currentShell'),
    clearBtn: document.getElementById('rt-clearBtn'),
    disconnectBtn: document.getElementById('rt-disconnectBtn'),
    fullscreenBtn: document.getElementById('rt-fullscreenBtn'),
    container: document.getElementById('rt-container'),
    xtermContainer: document.getElementById('xterm-container'),
    fallback: document.getElementById('rt-fallback'),
    fallbackOutput: document.getElementById('rt-fallback-output'),
    fallbackInput: document.getElementById('rt-fallback-input'),
    fallbackSend: document.getElementById('rt-fallback-send'),
    banner: document.getElementById('rt-banner'),
    bannerText: document.getElementById('rt-banner-text'),
  };

  let ws = null;
  let terminal = null;
  let fitAddon = null;
  let reconnectTimer = null;
  let reconnectAttempt = 0;
  const MAX_RECONNECT_DELAY = 30000;
  let isFullscreen = false;
  let useFallback = false;
  let fallbackLines = [];
  let currentShell = '';
  let intentionalClose = false;

  // ── Status helpers ──────────────────────────────────
  function setStatus(mode, text) {
    els.statusDot.className = 'rt-dot ' + mode;
    els.statusText.textContent = text;
  }

  function logToFallback(msg, color = '#00ff41') {
    const line = document.createElement('div');
    line.style.color = color;
    line.style.fontFamily = 'monospace';
    line.style.fontSize = '13px';
    line.style.lineHeight = '1.5';
    line.style.whiteSpace = 'pre-wrap';
    line.style.wordBreak = 'break-all';
    line.style.padding = '1px 0';
    line.textContent = msg;
    els.fallbackOutput.appendChild(line);
    els.fallbackOutput.scrollTop = els.fallbackOutput.scrollHeight;
  }

  // ── Shell selector ─────────────────────────────────
  function fetchShells() {
    fetch('/api/shells')
      .then(r => r.json())
      .then(data => {
        const shells = data.shells || data;
        if (Array.isArray(shells) && shells.length > 0) {
          els.shellSelector.innerHTML = '<option value="auto">' + t('تشخیص خودکار', 'Auto detect') + '</option>';
          shells.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id || s;
            opt.textContent = s.name || s;
            els.shellSelector.appendChild(opt);
          });
        }
      })
      .catch(() => {});
  }

  // ── WebSocket connection ────────────────────────────
  function connect() {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return;
    }
    intentionalClose = false;
    setStatus('reconnecting', t('در حال اتصال...', 'Connecting...'));

    try {
      ws = new WebSocket('ws://' + location.host + '/terminal');
    } catch (e) {
      setStatus('offline', t('خطا در اتصال', 'Connection error'));
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      reconnectAttempt = 0;
      setStatus('online', t('متصل', 'Connected'));
      if (els.shellSelector.value !== 'auto') {
        ws.send(JSON.stringify({ type: 'shell', shell: els.shellSelector.value }));
      }
      if (useFallback) {
        logToFallback(t('🔗 به سرور متصل شد.', '🔗 Connected to server.'), '#00d4ff');
      }
    };

    ws.onmessage = (e) => {
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        if (terminal && !useFallback) {
          terminal.write(e.data);
        } else if (useFallback) {
          logToFallback(e.data);
        }
        return;
      }

      switch (msg.type) {
        case 'output':
          if (terminal && !useFallback) {
            terminal.write(msg.data);
          } else if (useFallback) {
            logToFallback(msg.data);
          }
          break;
        case 'info':
          if (terminal && !useFallback) {
            terminal.writeln('\x1b[36m[INFO]\x1b[0m ' + (msg.message || ''));
          } else if (useFallback) {
            logToFallback('[INFO] ' + (msg.message || ''), '#00d4ff');
          }
          break;
        case 'error':
          if (terminal && !useFallback) {
            terminal.writeln('\x1b[31m[ERROR]\x1b[0m ' + (msg.message || ''));
          } else if (useFallback) {
            logToFallback('[ERROR] ' + (msg.message || ''), '#ff3333');
          }
          break;
        case 'exit':
          if (terminal && !useFallback) {
            terminal.writeln('\x1b[33m[Process exited with code ' + msg.code + ']\x1b[0m');
          } else if (useFallback) {
            logToFallback('[Process exited with code ' + msg.code + ']', '#ffd700');
          }
          break;
        case 'shell':
          if (msg.name) {
            currentShell = msg.name;
            els.currentShell.textContent = msg.name;
          }
          break;
      }
    };

    ws.onclose = () => {
      setStatus('offline', t('قطع', 'Disconnected'));
      if (!intentionalClose) {
        scheduleReconnect();
      }
    };

    ws.onerror = () => {
      setStatus('offline', t('خطا', 'Error'));
    };
  }

  function scheduleReconnect() {
    if (intentionalClose) return;
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempt), MAX_RECONNECT_DELAY);
    setStatus('reconnecting', t('اتصال مجدد...', 'Reconnecting...'));
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => {
      reconnectAttempt++;
      connect();
    }, delay);
  }

  function disconnect() {
    intentionalClose = true;
    clearTimeout(reconnectTimer);
    if (ws) {
      ws.close();
      ws = null;
    }
    setStatus('offline', t('قطع', 'Disconnected'));
  }

  function reconnect() {
    disconnect();
    setTimeout(connect, 300);
  }

  // ── Switch fallback mode ────────────────────────────
  function enableFallback() {
    useFallback = true;
    els.xtermContainer.style.display = 'none';
    els.fallback.style.display = 'block';
    els.banner.style.display = 'block';
    if (terminal) {
      try { terminal.dispose(); } catch(e) {}
      terminal = null;
      fitAddon = null;
    }
    logToFallback(t('⚠️ حالت متنی - xterm.js در دسترس نیست', '⚠️ Text mode - xterm.js unavailable'), '#ffd700');
    logToFallback(t('دستورات به صورت خط به خط ارسال می‌شوند.', 'Commands are sent line by line.'), '#888');
  }

  // ── Initialize xterm.js ─────────────────────────────
  function initXterm() {
    if (typeof Terminal === 'undefined') {
      enableFallback();
      return;
    }

    try {
      terminal = new Terminal({
        cursorBlink: true,
        cursorStyle: 'block',
        cols: 80,
        rows: 24,
        theme: {
          background: '#0a0a0f',
          foreground: '#c0caf5',
          cursor: '#7aa2f7',
          cursorAccent: '#0a0a0f',
          selectionBackground: '#2a2b4e',
          black: '#1d202f',
          red: '#f7768e',
          green: '#9ece6a',
          yellow: '#e0af68',
          blue: '#7aa2f7',
          magenta: '#bb9af7',
          cyan: '#7dcfff',
          white: '#a9b1d6',
          brightBlack: '#414868',
          brightRed: '#f7768e',
          brightGreen: '#9ece6a',
          brightYellow: '#e0af68',
          brightBlue: '#7aa2f7',
          brightMagenta: '#bb9af7',
          brightCyan: '#7dcfff',
          brightWhite: '#c0caf5',
        },
        fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
        fontSize: 13,
        lineHeight: 1.4,
        allowTransparency: true,
        scrollback: 5000,
      });

      if (typeof FitAddon !== 'undefined') {
        fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
      }

      if (typeof WebLinksAddon !== 'undefined') {
        terminal.loadAddon(new WebLinksAddon());
      }

      terminal.open(els.xtermContainer);

      if (fitAddon) {
        setTimeout(() => fitAddon.fit(), 100);
      }

      terminal.writeln('\x1b[36m[Maddix Terminal]\x1b[0m ' + t('در حال اتصال...', 'Connecting...'));
      terminal.writeln('');

      terminal.onData(data => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'input', data: data }));
        }
      });

      setTimeout(() => {
        if (fitAddon) fitAddon.fit();
      }, 500);

    } catch (e) {
      enableFallback();
    }
  }

  // ── Load xterm.js from CDN ──────────────────────────
  function loadXtermCDN(callback) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/xterm/css/xterm.min.css';
    document.head.appendChild(css);

    let loaded = 0;
    const total = 3;
    let hasError = false;

    function onLoad() {
      loaded++;
      if (loaded >= total) {
        if (!hasError && typeof Terminal !== 'undefined') {
          callback(true);
        } else {
          callback(false);
        }
      }
    }

    function onError() {
      hasError = true;
      callback(false);
    }

    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/xterm/lib/xterm.min.js';
    script1.onload = onLoad;
    script1.onerror = onError;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/xterm-addon-fit/lib/xterm-addon-fit.min.js';
    script2.onload = onLoad;
    script2.onerror = onError;
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://cdn.jsdelivr.net/npm/xterm-addon-web-links/lib/xterm-addon-web-links.min.js';
    script3.onload = onLoad;
    script3.onerror = onError;
    document.head.appendChild(script3);

    setTimeout(() => {
      if (loaded < total && !hasError) {
        hasError = true;
        callback(false);
      }
    }, 15000);
  }

  // ── UI Event handlers ───────────────────────────────
  // Shell selector
  els.shellSelector.addEventListener('change', () => {
    const val = els.shellSelector.value;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'shell', shell: val }));
    }
  });

  // Clear
  els.clearBtn.addEventListener('click', () => {
    if (terminal && !useFallback) {
      terminal.clear();
    } else if (useFallback) {
      els.fallbackOutput.innerHTML = '';
    }
  });

  // Disconnect / Reconnect
  els.disconnectBtn.addEventListener('click', () => {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      disconnect();
      els.disconnectBtn.textContent = t('اتصال', 'Reconnect');
    } else {
      els.disconnectBtn.textContent = t('قطع', 'Disconnect');
      connect();
    }
  });

  // Fullscreen
  els.fullscreenBtn.addEventListener('click', () => {
    if (!isFullscreen) {
      els.container.parentElement.classList.add('rt-fullscreen');
      isFullscreen = true;
      setTimeout(() => {
        if (fitAddon) fitAddon.fit();
      }, 200);
    } else {
      els.container.parentElement.classList.remove('rt-fullscreen');
      isFullscreen = false;
      setTimeout(() => {
        if (fitAddon) fitAddon.fit();
      }, 200);
    }
  });

  document.addEventListener('fullscreenchange', () => {
    setTimeout(() => {
      if (fitAddon) fitAddon.fit();
    }, 200);
  });

  // Window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (fitAddon && !isFullscreen) fitAddon.fit();
    }, 300);
  });

  // Fallback mode input
  els.fallbackSend.addEventListener('click', sendFallbackCmd);
  els.fallbackInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendFallbackCmd();
  });

  function sendFallbackCmd() {
    const cmd = els.fallbackInput.value;
    if (!cmd.trim()) return;
    els.fallbackInput.value = '';
    if (ws && ws.readyState === WebSocket.OPEN) {
      logToFallback('$ ' + cmd, '#7aa2f7');
      ws.send(JSON.stringify({ type: 'input', data: cmd + '\n' }));
    } else {
      logToFallback(t('⚠️ سرور قطع است', '⚠️ Server disconnected'), '#ff3333');
    }
  }

  // ── Boot ────────────────────────────────────────────
  fetchShells();
  loadXtermCDN((success) => {
    if (success) {
      initXterm();
    } else {
      enableFallback();
    }
    connect();
  });
}
