# Maddix Tools

## Run locally

با Node.js (ترمینال واقعی + ابزارهای WebSocket):
```
node server.js
```

بدون Node.js (فقط فایل‌های استاتیک، پایتون کافیه):
```
python server.py
```

Then open http://localhost:3000

## Deploy to Cloudflare Pages

### روش 1 - Drag & Drop (ساده‌ترین):
1. برو به https://dash.cloudflare.com
2. منوی سمت چپ → **Workers & Pages**
3. کلیک **Create application** → **Pages** → **Upload assets**
4. اسم پروژه: `maddix-tools`
5. تمام فایل‌های پروژه (index.html, styles.css, app.js, tools/, _redirects, package.json) را بکش و رها کن
6. کلیک **Deploy**
7. بعد از دیپلوی، می‌تونی دامنه اختصاصی بدی: Settings → Custom domains → `maddix-tools.yourdomain.com`

### روش 2 - Wrangler CLI:
```bash
npx wrangler login
npx wrangler pages deploy . --project-name maddix-tools
```

### روش 3 - GitHub + Vercel (سریع):
```bash
git init
git add .
git commit -m "Maddix Tools initial"
git remote add origin https://github.com/mohammadmehrani/Maddix-tools.git
git push -u origin main
```
بعد در https://vercel.com/new امپورت کن.

## ساختار
- `index.html` - شل اصلی
- `styles.css` - استایل کامل با تم تاریک/روشن
- `app.js` - SPA روتینگ و منطق اصلی
- `tools/` - 23 ابزار مجزا
- `_redirects` - کانفیگ SPA برای Cloudflare Pages
- `server.js` - سرور لوکال (Node)
- `server.py` - سرور لوکال بدون Node (پایتون)
- `ai-assistant.js` - ویدجت دستیار هوش مصنوعی (گروک) با پاسخ فارسی
- `api/grok.js` - پروکسی گروک برای Vercel
- `functions/api/grok.js` - پروکسی گروک برای Cloudflare Pages

## دستیار هوش مصنوعی (گروک)
ویدجت 🤖 پایین-راست صفحه. کلید API گروک را از ⚙️ داخل خود چت وارد کن (در localStorage ذخیره می‌شود). وقتی سایت فارسی است، سیستم‌پرامپت همیشه پاسخ فارسی را تحمیل می‌کند. درخواست از `/api/grok` می‌رود (پروکسی برای رفع CORS)؛ اگر پروکسی نبود مستقیم به `api.x.ai` می‌رود.
