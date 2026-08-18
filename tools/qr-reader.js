export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">📖</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'خواننده QR':'QR Code Reader')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'QR کدها را از تصویر یا دوربین بخوانید':'Decode QR codes from images or camera')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="qr-reader-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-qrrtab="upload">'+(f?'آپلود تصویر':'Upload Image')+'</button>'+
      '<button data-qrrtab="camera">'+(f?'دوربین':'Camera')+'</button>'+
    '</div>'+
    '<div class="qr-reader-content" data-qrrtab="upload">'+
      '<div style="display:flex;flex-direction:column;align-items:center;gap:16px">'+
        '<div id="qr-upload-zone" style="width:100%;max-width:400px;min-height:200px;border:2px dashed var(--border);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;cursor:pointer;transition:border-color .2s;background:var(--bg-card,#1a1a2e)" onmouseover="this.style.borderColor=\'var(--primary,#00c8ff)\'" onmouseout="this.style.borderColor=\'var(--border)\'">'+
          '<span style="font-size:3rem">📁</span>'+
          '<span style="color:var(--muted-foreground);font-size:.875rem">'+(f?'کلیک کنید یا تصویر را بکشید':'Click or drag an image')+'</span>'+
          '<input id="qr-file-input" type="file" accept="image/*" style="display:none">'+
          '<button id="qr-choose-btn" style="padding:8px 20px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);cursor:pointer;font-size:.8125rem">'+(f?'انتخاب فایل':'Choose File')+'</button>'+
        '</div>'+
        '<div id="qr-preview" style="display:none;max-width:400px">'+
          '<img id="qr-preview-img" style="width:100%;border-radius:8px;border:1px solid var(--border)">'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="qr-reader-content" data-qrrtab="camera" style="display:none">'+
      '<div style="display:flex;flex-direction:column;align-items:center;gap:12px">'+
        '<video id="qr-video" style="width:100%;max-width:400px;border-radius:8px;border:1px solid var(--border);background:#000" playsinline autoplay></video>'+
        '<div style="display:flex;gap:8px">'+
          '<button id="qr-cam-start" style="padding:8px 20px;border:none;border-radius:8px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.8125rem;font-weight:600">'+(f?'شروع دوربین':'Start Camera')+'</button>'+
          '<button id="qr-cam-stop" style="padding:8px 20px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);cursor:pointer;font-size:.8125rem">'+(f?'توقف':'Stop')+'</button>'+
          '<button id="qr-capture" style="padding:8px 20px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);cursor:pointer;font-size:.8125rem">'+(f?'عکس':'Capture')+'</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div id="qr-result" style="display:none;margin-top:16px;padding:16px;background:var(--bg-card,#1a1a2e);border:1px solid var(--primary,#00c8ff44);border-radius:8px">'+
      '<div style="font-size:.8125rem;font-weight:600;color:var(--primary,#00c8ff);margin-bottom:8px">'+(f?'نتیجه:':'Result:')+'</div>'+
      '<div id="qr-result-text" style="font-size:.875rem;font-family:monospace;word-break:break-all;color:var(--text)"></div>'+
      '<div id="qr-actions" style="margin-top:10px;display:flex;gap:8px">'+
        '<button id="qr-copy-result" style="padding:6px 14px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.75rem;font-weight:600">'+(f?'کپی':'Copy')+'</button>'+
        '<a id="qr-open-result" target="_blank" rel="noopener" style="padding:6px 14px;border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.75rem;display:none">'+(f?'باز کردن':'Open')+'</a>'+
      '</div>'+
    '</div>'+
    '<div id="qr-error" style="display:none;margin-top:12px;padding:12px;background:rgba(255,68,68,.1);border:1px solid rgba(255,68,68,.3);border-radius:8px;color:var(--danger,#ff4444);font-size:.8125rem"></div>'+
  '</div>';
}
export function init(lang) {
  var f = lang === 'fa';
  var container = document.getElementById('content');
  var videoStream = null;
  var scanning = false;
  var scanTimer = null;

  function loadJsQR(callback) {
    if (typeof jsQR !== 'undefined') { callback(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
    s.onload = callback;
    s.onerror = function() {
      var errEl = document.getElementById('qr-error');
      if (errEl) { errEl.style.display = 'block'; errEl.textContent = f ? 'خطا در بارگذاری کتابخانه jsQR' : 'Failed to load jsQR library'; }
    };
    document.head.appendChild(s);
  }

  function decodeQR(data, width, height) {
    try {
      if (typeof jsQR === 'undefined') return null;
      var code = jsQR(data, width, height);
      return code ? code.data : null;
    } catch(e) { return null; }
  }

  function showResult(text, isUrl) {
    var res = document.getElementById('qr-result');
    var txt = document.getElementById('qr-result-text');
    var link = document.getElementById('qr-open-result');
    if (res && txt) { res.style.display = 'block'; txt.textContent = text; }
    if (link) {
      if (isUrl) { link.style.display = 'inline-block'; link.href = text; }
      else { link.style.display = 'none'; }
    }
  }

  function showError(msg) {
    var err = document.getElementById('qr-error');
    if (err) { err.style.display = 'block'; err.textContent = msg; }
  }

  function processImageFile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var result = decodeQR(imageData.data, imageData.width, imageData.height);
        if (result) {
          showResult(result, /^https?:\/\//i.test(result));
        } else {
          showError(f ? 'QR کدی در تصویر یافت نشد' : 'No QR code found in image');
        }
      };
      img.src = e.target.result;
      var preview = document.getElementById('qr-preview');
      var previewImg = document.getElementById('qr-preview-img');
      if (preview && previewImg) { preview.style.display = 'block'; previewImg.src = e.target.result; }
    };
    reader.readAsDataURL(file);
  }

  function scanCameraFrame() {
    if (!scanning) return;
    var video = document.getElementById('qr-video');
    if (!video || !video.videoWidth) { scanTimer = requestAnimationFrame(scanCameraFrame); return; }
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var result = decodeQR(imageData.data, imageData.width, imageData.height);
    if (result) {
      scanning = false;
      if (scanTimer) { cancelAnimationFrame(scanTimer); scanTimer = null; }
      if (videoStream) { videoStream.getTracks().forEach(function(t) { t.stop(); }); videoStream = null; }
      showResult(result, /^https?:\/\//i.test(result));
      return;
    }
    scanTimer = requestAnimationFrame(scanCameraFrame);
  }

  container.addEventListener('click', function(e) {
    var target = e.target;
    var tab = target.closest('[data-qrrtab]');
    if (tab && tab.closest('#qr-reader-tabs')) {
      container.querySelectorAll('#qr-reader-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.qr-reader-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.qr-reader-content[data-qrrtab="'+tab.getAttribute('data-qrrtab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }

    if (target.id === 'qr-choose-btn' || target.closest('#qr-upload-zone')) {
      var inp = document.getElementById('qr-file-input');
      if (inp) inp.click();
      return;
    }

    if (target.id === 'qr-cam-start') {
      loadJsQR(function() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
          videoStream = stream;
          var video = document.getElementById('qr-video');
          if (video) { video.srcObject = stream; }
          scanning = true;
          scanCameraFrame();
        }).catch(function() {
          showError(f ? 'دوربین در دسترس نیست' : 'Camera not available');
        });
      });
      return;
    }

    if (target.id === 'qr-cam-stop') {
      scanning = false;
      if (scanTimer) { cancelAnimationFrame(scanTimer); scanTimer = null; }
      if (videoStream) { videoStream.getTracks().forEach(function(t) { t.stop(); }); videoStream = null; }
      var video = document.getElementById('qr-video');
      if (video) video.srcObject = null;
      return;
    }

    if (target.id === 'qr-capture') {
      var video = document.getElementById('qr-video');
      if (!video || !video.videoWidth) return;
      scanning = false;
      if (scanTimer) { cancelAnimationFrame(scanTimer); scanTimer = null; }
      if (videoStream) { videoStream.getTracks().forEach(function(t) { t.stop(); }); videoStream = null; }
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      loadJsQR(function() {
        var result = decodeQR(imageData.data, imageData.width, imageData.height);
        if (result) { showResult(result, /^https?:\/\//i.test(result)); }
        else { showError(f ? 'QR کدی یافت نشد' : 'No QR code found'); }
      });
      return;
    }

    if (target.id === 'qr-copy-result') {
      var txt = document.getElementById('qr-result-text');
      if (txt) { navigator.clipboard.writeText(txt.textContent); target.textContent = f ? '✓ کپی شد' : '✓ Copied'; setTimeout(function() { target.textContent = f ? 'کپی' : 'Copy'; }, 1200); }
      return;
    }
  });

  var fileInput = document.getElementById('qr-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', function() {
      if (fileInput.files && fileInput.files[0]) {
        loadJsQR(function() { processImageFile(fileInput.files[0]); });
      }
    });
  }

  var uploadZone = document.getElementById('qr-upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function(e) { e.preventDefault(); uploadZone.style.borderColor = 'var(--primary,#00c8ff)'; });
    uploadZone.addEventListener('dragleave', function() { uploadZone.style.borderColor = 'var(--border)'; });
    uploadZone.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadZone.style.borderColor = 'var(--border)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        loadJsQR(function() { processImageFile(e.dataTransfer.files[0]); });
      }
    });
  }
}
