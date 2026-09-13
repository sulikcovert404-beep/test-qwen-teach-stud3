# 🚀 راهنمای Deploy سریع — پلتفرم آموزش هوشمند ایران

## 📋 پیش‌نیازها

- اکانت GitHub
- اکانت Vercel (رایگان) یا Cloudflare (رایگان)
- Node.js 18+ (برای تست لوکال)

---

## 🎯 روش ۱: Deploy روی Vercel (سریع‌ترین — ۵ دقیقه)

### مرحله ۱: پروژه را روی GitHub بگذارید

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-edu-iran.git
git push -u origin main
```

### مرحله ۲: Import در Vercel

1. وارد [vercel.com](https://vercel.com) شوید (با GitHub)
2. روی **"Add New..."** → **"Project"** کلیک کنید
3. ریپازیتوری خود را پیدا و **Import** کنید
4. Vercel به صورت خودکار Vite را تشخیص می‌دهد
5. روی **"Deploy"** کلیک کنید

### مرحله ۳: تست کنید

بعد از ۱-۲ دقیقه، Vercel یک URL مثل این می‌دهد:
```
https://ai-edu-iran.vercel.app
```

آن را باز کنید و تست کنید! ✅

---

## 🎯 روش ۲: Deploy روی Cloudflare Pages

### مرحله ۱: وارد Cloudflare شوید

1. وارد [dash.cloudflare.com](https://dash.cloudflare.com) شوید
2. از منوی چپ: **"Workers & Pages"** → **"Create application"**
3. تب **"Pages"** → **"Connect to Git"**

### مرحله ۲: تنظیمات Build

```
Framework preset:     Vite
Build command:        npm run build
Build output directory: dist
Root directory:       /
```

### مرحله ۳: Deploy

روی **"Save and Deploy"** کلیک کنید.

URL نهایی:
```
https://ai-edu-iran.pages.dev
```

---

## 🌐 روش ۳: دامنه سفارشی (مثلاً app.yoursite.ir)

### در Vercel:

1. **Settings** → **Domains** → دامنه خود را وارد کنید
2. یک رکورد CNAME در Cloudflare DNS بسازید:
   ```
   Type: CNAME
   Name: app
   Target: cname.vercel-dns.com
   Proxy: Proxied (نارنجی)
   ```
3. SSL/TLS در Cloudflare: **Full (strict)**

### در Cloudflare Pages:

1. **Custom domains** → **Set up a custom domain**
2. دامنه را وارد کنید
3. Cloudflare خودکار DNS را تنظیم می‌کند

---

## 🤖 اتصال به Telegram Bot

بعد از deploy، برای اتصال به `@teachschool_bot`:

### ۱. در BotFather:

```
/myapps
→ Select your bot
→ Edit Web App URL
→ https://app.yoursite.ir/mini-app/
```

### ۲. Menu Button:

```
/setmenubutton
→ Select your bot
→ URL: https://app.yoursite.ir/mini-app/
→ Text: ورود به پنل
```

### ۳. Allowed Domains:

در BotFather، دامنه خود را به لیست دامنه‌های مجاز اضافه کنید.

---

## 🔐 نکات امنیتی مهم

- ❌ **هرگز** Token یا Secret را در کد قرار ندهید
- ✅ از **Environment Variables** استفاده کنید
- ✅ فایل `.env` را در `.gitignore` بگذارید
- ✅ HTTPS اجباری (Vercel/Cloudflare خودکار انجام می‌دهند)

### Environment Variables نمونه:

```env
VITE_API_URL=https://your-backend.com/api/v1
VITE_TELEGRAM_BOT_USERNAME=teachschool_bot
VITE_APP_ENV=production
```

---

## 🧪 تست لوکال (قبل از Deploy)

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# ساخت نسخه production
npm run build

# پیش‌نمایش نسخه production
npm run preview
```

---

## 📊 چک‌لیست بعد از Deploy

- [ ] صفحه ورود باز می‌شود
- [ ] هر ۴ نقش قابل ورود هستند
- [ ] داشبورد مربوط به نقش نمایش داده می‌شود
- [ ] Sidebar و navigation کار می‌کند
- [ ] با refresh صفحه، route حفظ می‌شود
- [ ] روی موبایل درست نمایش داده می‌شود
- [ ] RTL و فونت فارسی درست است
- [ ] دکمه خروج کار می‌کند
- [ ] Telegram Web App باز می‌شود

---

## 🆘 مشکلات رایج

### مشکل: بعد از refresh، صفحه 404 می‌دهد

**علت:** SPA routing تنظیم نشده

**راه‌حل:**
- **Vercel:** فایل `vercel.json` با rewrites (خودکار انجام شده)
- **Cloudflare:** فایل `public/_redirects` با محتوای `/*  /index.html  200`

### مشکل: فونت فارسی لود نمی‌شود

**علت:** مشکل CORS یا network

**راه‌حل:** بررسی کنید که Google Fonts در `index.html` درست لود می‌شود

### مشکل: Telegram Web App باز نمی‌شود

**علت:** دامنه در BotFather ثبت نشده

**راه‌حل:** در BotFather → `/myapps` → دامنه را اضافه کنید

---

## 📞 پشتیبانی

- مستندات Vercel: https://vercel.com/docs
- مستندات Cloudflare Pages: https://developers.cloudflare.com/pages
- مستندات Telegram Web Apps: https://core.telegram.org/bots/webapps

---

## 🎉 موفق باشید!

پس از deploy موفق، پروژه شما آنلاین است و آماده تست!
