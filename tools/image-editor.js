export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🎨</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">Image Editor</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'ویرایش تصاویر: برش، تغییر اندازه، فیلترها و چرخش':'Edit images: crop, resize, filters, and rotate')+'</p></div>'+
    '</div>'+
    '<div style="display:flex;gap:16px;flex-wrap:wrap">'+
      '<div style="flex:1;min-width:280px">'+
        '<div id="img-upload-zone" style="border:2px dashed var(--border,#444);border-radius:12px;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;cursor:pointer;transition:border-color .2s;background:var(--bg-card,#1a1a2e)" onmouseover="this.style.borderColor=\'var(--primary,#00c8ff)\'" onmouseout="this.style.borderColor=\'var(--border)\'">'+
          '<span style="font-size:3rem">🖼️</span>'+
          '<span style="color:var(--muted-foreground);font-size:.875rem">'+(f?'کلیک کنید یا تصویر را بکشید':'Click or drag an image')+'</span>'+
          '<input id="img-file-input" type="file" accept="image/*" style="display:none">'+
          '<button id="img-choose-btn" style="padding:8px 20px;border:1px solid var(--border,#444);border-radius:8px;background:transparent;color:var(--text);cursor:pointer;font-size:.8125rem">'+(f?'انتخاب فایل':'Choose File')+'</button>'+
        '</div>'+
        '<div id="img-controls" style="display:none;margin-top:12px">'+
          '<div class="tab-bar" id="img-tabs" style="margin-bottom:12px">'+
            '<button class="active" data-imgtab="resize">'+(f?'تغییر اندازه':'Resize')+'</button>'+
            '<button data-imgtab="crop">'+(f?'برش':'Crop')+'</button>'+
            '<button data-imgtab="filter">'+(f?'فیلتر':'Filter')+'</button>'+
            '<button data-imgtab="rotate">'+(f?'چرخش':'Rotate')+'</button>'+
          '</div>'+

          '<div class="imgtab-content" data-imgtab="resize">'+
            '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'عرض:':'Width:')+'</label>'+
              '<input id="img-resize-w" type="number" value="800" min="1" max="10000" style="width:80px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'ارتفاع:':'Height:')+'</label>'+
              '<input id="img-resize-h" type="number" value="600" min="1" max="10000" style="width:80px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">'+
                '<input id="img-keep-ratio" type="checkbox" checked> '+(f?'حفظ نسبت':'Keep ratio')+
              '</label>'+
              '<button id="img-resize-btn" style="padding:7px 16px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.8125rem;font-weight:600">'+(f?'اعمال':'Apply')+'</button>'+
            '</div>'+
          '</div>'+

          '<div class="imgtab-content" data-imgtab="crop" style="display:none">'+
            '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">X:</label>'+
              '<input id="img-crop-x" type="number" value="0" min="0" style="width:60px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">Y:</label>'+
              '<input id="img-crop-y" type="number" value="0" min="0" style="width:60px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'عرض:':'W:')+'</label>'+
              '<input id="img-crop-w" type="number" value="400" min="1" style="width:60px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
              '<label style="font-size:.8125rem;color:var(--text-dim,#888)">'+(f?'ارتفاع:':'H:')+'</label>'+
              '<input id="img-crop-h" type="number" value="400" min="1" style="width:60px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
              '<button id="img-crop-btn" style="padding:7px 16px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.8125rem;font-weight:600">'+(f?'برش':'Crop')+'</button>'+
            '</div>'+
          '</div>'+

          '<div class="imgtab-content" data-imgtab="filter" style="display:none">'+
            '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
              '<button class="img-filter-btn" data-filter="grayscale" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'خاکستری':'Grayscale')+'</button>'+
              '<button class="img-filter-btn" data-filter="sepia" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'سپیا':'Sepia')+'</button>'+
              '<button class="img-filter-btn" data-filter="invert" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'معکوس':'Invert')+'</button>'+
              '<button class="img-filter-btn" data-filter="brightness" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'روشنایی':'Brightness')+'</button>'+
              '<button class="img-filter-btn" data-filter="contrast" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'کنتراست':'Contrast')+'</button>'+
              '<button class="img-filter-btn" data-filter="blur" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'محو':'Blur')+'</button>'+
              '<button class="img-filter-btn" data-filter="sharpen" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'شارپ':'Sharpen')+'</button>'+
              '<button class="img-filter-btn" data-filter="threshold" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'آستانه':'Threshold')+'</button>'+
              '<button class="img-filter-btn" data-filter="pixelate" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">'+(f?'پیکسلی':'Pixelate')+'</button>'+
            '</div>'+
          '</div>'+

          '<div class="imgtab-content" data-imgtab="rotate" style="display:none">'+
            '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
              '<button id="img-rotate-cw" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">↻ 90° '+(f?'راست':'CW')+'</button>'+
              '<button id="img-rotate-ccw" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">↺ 90° '+(f?'چپ':'CCW')+'</button>'+
              '<button id="img-flip-h" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">↔ '+(f?'افقی':'Flip H')+'</button>'+
              '<button id="img-flip-v" style="padding:7px 14px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.75rem">↕ '+(f?'عمودی':'Flip V')+'</button>'+
              '<div style="display:flex;gap:6px;align-items:center;margin-left:8px">'+
                '<label style="font-size:.8125rem;color:var(--text-dim,#888)">°</label>'+
                '<input id="img-rotate-angle" type="number" value="45" min="-360" max="360" style="width:60px;padding:6px 8px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none">'+
                '<button id="img-rotate-angle-btn" style="padding:7px 14px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.75rem;font-weight:600">'+(f?'چرخش':'Rotate')+'</button>'+
              '</div>'+
            '</div>'+
          '</div>'+

          '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">'+
            '<button id="img-reset-btn" style="padding:7px 16px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text);cursor:pointer;font-size:.8125rem">↺ '+(f?'بازنشانی':'Reset')+'</button>'+
            '<button id="img-download-btn" style="padding:7px 16px;border:none;border-radius:6px;background:var(--success,#22c55e);color:#000;cursor:pointer;font-size:.8125rem;font-weight:600">⬇ '+(f?'دانلود':'Download')+'</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div style="flex:1;min-width:280px">'+
        '<div id="img-canvas-wrap" style="background:var(--bg-card,#1a1a2e);border-radius:12px;border:1px solid var(--border,#333);padding:12px;min-height:200px;display:flex;align-items:center;justify-content:center;overflow:hidden">'+
          '<div style="text-align:center;color:var(--text-dim,#666);font-size:.875rem" id="img-placeholder">'+(f?'تصویری بارگذاری نشده':'No image loaded')+'</div>'+
          '<canvas id="img-canvas" style="display:none;max-width:100%;max-height:500px"></canvas>'+
        '</div>'+
        '<div id="img-info" style="display:none;margin-top:8px;padding:8px;background:var(--bg-card,#1a1a2e);border-radius:6px;font-size:.75rem;color:var(--text-dim,#888);text-align:center"></div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

export function init(lang) {
  var f = lang === 'fa';
  var container = document.getElementById('content');
  var originalImg = null;
  var currentImg = null;
  var canvas = document.getElementById('img-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;

  function loadImage(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        originalImg = img;
        currentImg = img;
        renderImage(img);
        document.getElementById('img-controls').style.display = 'block';
        document.getElementById('img-upload-zone').style.display = 'none';
        var info = document.getElementById('img-info');
        if (info) {
          info.style.display = 'block';
          info.textContent = (f?'ابعاد: ':'Dimensions: ')+img.width+' x '+img.height;
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function renderImage(img) {
    if (!canvas || !ctx) return;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    canvas.style.display = 'block';
    var ph = document.getElementById('img-placeholder');
    if (ph) ph.style.display = 'none';
    var info = document.getElementById('img-info');
    if (info) { info.style.display = 'block'; info.textContent = (f?'ابعاد: ':'Dimensions: ')+img.width+' x '+img.height; }
  }

  function getCurrentCanvasImage() {
    if (!canvas) return null;
    var img = new Image();
    img.src = canvas.toDataURL('image/png');
    return img;
  }

  container.addEventListener('click', function(e) {
    var target = e.target;

    var tab = target.closest('[data-imgtab]');
    if (tab && tab.closest('#img-tabs')) {
      container.querySelectorAll('#img-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.imgtab-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.imgtab-content[data-imgtab="'+tab.getAttribute('data-imgtab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }

    if (target.id === 'img-choose-btn' || target.closest('#img-upload-zone')) {
      var inp = document.getElementById('img-file-input');
      if (inp) inp.click();
      return;
    }

    if (target.id === 'img-resize-btn') {
      if (!currentImg || !canvas || !ctx) return;
      var w = parseInt(document.getElementById('img-resize-w').value);
      var h = parseInt(document.getElementById('img-resize-h').value);
      if (!w || !h || w < 1 || h < 1) return;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(currentImg, 0, 0, w, h);
      currentImg = getCurrentCanvasImage();
      var info = document.getElementById('img-info');
      if (info) info.textContent = (f?'ابعاد: ':'Dimensions: ')+w+' x '+h;
      return;
    }

    if (target.id === 'img-crop-btn') {
      if (!currentImg || !canvas || !ctx) return;
      var x = parseInt(document.getElementById('img-crop-x').value) || 0;
      var y = parseInt(document.getElementById('img-crop-y').value) || 0;
      var w = parseInt(document.getElementById('img-crop-w').value) || 100;
      var h = parseInt(document.getElementById('img-crop-h').value) || 100;
      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      var tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(tempCanvas, 0, 0);
      currentImg = getCurrentCanvasImage();
      var info = document.getElementById('img-info');
      if (info) info.textContent = (f?'ابعاد: ':'Dimensions: ')+w+' x '+h;
      return;
    }

    if (target.classList.contains('img-filter-btn')) {
      if (!canvas || !ctx) return;
      var filter = target.getAttribute('data-filter');
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      if (filter === 'grayscale') {
        for (var i = 0; i < data.length; i += 4) {
          var gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
          data[i] = data[i+1] = data[i+2] = gray;
        }
      } else if (filter === 'sepia') {
        for (var i = 0; i < data.length; i += 4) {
          var r = data[i], g = data[i+1], b = data[i+2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
      } else if (filter === 'invert') {
        for (var i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i+1] = 255 - data[i+1];
          data[i+2] = 255 - data[i+2];
        }
      } else if (filter === 'brightness') {
        var factor = 1.3;
        for (var i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * factor);
          data[i+1] = Math.min(255, data[i+1] * factor);
          data[i+2] = Math.min(255, data[i+2] * factor);
        }
      } else if (filter === 'contrast') {
        var contrast = 1.5;
        for (var i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, ((data[i] / 255 - 0.5) * contrast + 0.5) * 255));
          data[i+1] = Math.min(255, Math.max(0, ((data[i+1] / 255 - 0.5) * contrast + 0.5) * 255));
          data[i+2] = Math.min(255, Math.max(0, ((data[i+2] / 255 - 0.5) * contrast + 0.5) * 255));
        }
      } else if (filter === 'blur') {
        var w = canvas.width, h = canvas.height;
        var copy = new Uint8ClampedArray(data);
        for (var y = 1; y < h - 1; y++) {
          for (var x = 1; x < w - 1; x++) {
            var idx = (y * w + x) * 4;
            for (var c = 0; c < 3; c++) {
              var sum = 0;
              for (var dy = -1; dy <= 1; dy++)
                for (var dx = -1; dx <= 1; dx++)
                  sum += copy[((y + dy) * w + (x + dx)) * 4 + c];
              data[idx + c] = sum / 9;
            }
          }
        }
      } else if (filter === 'sharpen') {
        var w = canvas.width, h = canvas.height;
        var copy = new Uint8ClampedArray(data);
        var kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
        for (var y = 1; y < h - 1; y++) {
          for (var x = 1; x < w - 1; x++) {
            var idx = (y * w + x) * 4;
            for (var c = 0; c < 3; c++) {
              var sum = 0, ki = 0;
              for (var dy = -1; dy <= 1; dy++)
                for (var dx = -1; dx <= 1; dx++)
                  sum += copy[((y + dy) * w + (x + dx)) * 4 + c] * kernel[ki++];
              data[idx + c] = Math.min(255, Math.max(0, sum));
            }
          }
        }
      } else if (filter === 'threshold') {
        var threshold = 128;
        for (var i = 0; i < data.length; i += 4) {
          var gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
          var val = gray >= threshold ? 255 : 0;
          data[i] = data[i+1] = data[i+2] = val;
        }
      } else if (filter === 'pixelate') {
        var size = 8;
        var w = canvas.width, h = canvas.height;
        for (var y = 0; y < h; y += size) {
          for (var x = 0; x < w; x += size) {
            var idx = (y * w + x) * 4;
            var pr = data[idx], pg = data[idx+1], pb = data[idx+2];
            for (var dy = 0; dy < size && y + dy < h; dy++)
              for (var dx = 0; dx < size && x + dx < w; dx++) {
                var pi = ((y + dy) * w + (x + dx)) * 4;
                data[pi] = pr; data[pi+1] = pg; data[pi+2] = pb;
              }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      currentImg = getCurrentCanvasImage();
      return;
    }

    if (target.id === 'img-rotate-cw') {
      if (!canvas || !ctx) return;
      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.height;
      tempCanvas.height = canvas.width;
      var tempCtx = tempCanvas.getContext('2d');
      tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
      tempCtx.rotate(Math.PI / 2);
      tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
      ctx.drawImage(tempCanvas, 0, 0);
      currentImg = getCurrentCanvasImage();
      return;
    }

    if (target.id === 'img-rotate-ccw') {
      if (!canvas || !ctx) return;
      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.height;
      tempCanvas.height = canvas.width;
      var tempCtx = tempCanvas.getContext('2d');
      tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
      tempCtx.rotate(-Math.PI / 2);
      tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
      ctx.drawImage(tempCanvas, 0, 0);
      currentImg = getCurrentCanvasImage();
      return;
    }

    if (target.id === 'img-flip-h') {
      if (!canvas || !ctx) return;
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
      currentImg = getCurrentCanvasImage();
      return;
    }

    if (target.id === 'img-flip-v') {
      if (!canvas || !ctx) return;
      ctx.save();
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
      currentImg = getCurrentCanvasImage();
      return;
    }

    if (target.id === 'img-rotate-angle-btn') {
      if (!canvas || !ctx) return;
      var angle = parseInt(document.getElementById('img-rotate-angle').value) || 0;
      var radians = angle * Math.PI / 180;
      var tempCanvas = document.createElement('canvas');
      var maxDim = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      tempCanvas.width = maxDim;
      tempCanvas.height = maxDim;
      var tempCtx = tempCanvas.getContext('2d');
      tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
      tempCtx.rotate(radians);
      tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
      canvas.width = maxDim;
      canvas.height = maxDim;
      ctx.drawImage(tempCanvas, 0, 0);
      currentImg = getCurrentCanvasImage();
      return;
    }

    if (target.id === 'img-reset-btn') {
      if (originalImg) {
        currentImg = originalImg;
        renderImage(originalImg);
      }
      return;
    }

    if (target.id === 'img-download-btn') {
      if (!canvas) return;
      var link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      return;
    }
  });

  var fileInput = document.getElementById('img-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', function() {
      if (fileInput.files && fileInput.files[0]) loadImage(fileInput.files[0]);
    });
  }

  var uploadZone = document.getElementById('img-upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function(e) { e.preventDefault(); uploadZone.style.borderColor = 'var(--primary,#00c8ff)'; });
    uploadZone.addEventListener('dragleave', function() { uploadZone.style.borderColor = 'var(--border)'; });
    uploadZone.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadZone.style.borderColor = 'var(--border)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
    });
  }

  var keepRatio = document.getElementById('img-keep-ratio');
  var resizeW = document.getElementById('img-resize-w');
  var resizeH = document.getElementById('img-resize-h');
  if (keepRatio && resizeW && resizeH) {
    var ratioLocked = false;
    resizeW.addEventListener('input', function() {
      if (keepRatio.checked && currentImg && !ratioLocked) {
        ratioLocked = true;
        resizeH.value = Math.round(resizeW.value * currentImg.height / currentImg.width);
        ratioLocked = false;
      }
    });
    resizeH.addEventListener('input', function() {
      if (keepRatio.checked && currentImg && !ratioLocked) {
        ratioLocked = true;
        resizeW.value = Math.round(resizeH.value * currentImg.width / currentImg.height);
        ratioLocked = false;
      }
    });
  }
}
