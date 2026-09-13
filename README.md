# 🎓 پلتفرم آموزش هوشمند ایران
### AI Education Platform Iran

پلتفرم آموزش هوشمند فارسی‌زبان برای دانش‌آموزان، معلمان، مدیران مدارس و ادمین سیستم.

![Status](https://img.shields.io/badge/status-prototype-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4)
![Vite](https://img.shields.io/badge/Vite-6-646cff)

---

## ✨ ویژگی‌ها

### 👨‍🎓 داشبورد دانش‌آموز
- 🤖 دستیار هوشمند (AI Tutor)
- 📝 مدیریت تکالیف
- 📊 آزمون‌ها و نتایج
- 🎴 فلش‌کارت
- 📅 برنامه مطالعه هوشمند
- 📈 تحلیل پیشرفت

### 👨‍🏫 داشبورد معلم
- 🏫 مدیریت کلاس‌ها
- ✨ آزمون‌ساز هوشمند AI
- 📊 تحلیل عملکرد کلاس
- 💬 دستیار معلم

### 🏢 داشبورد مدیر مدرسه
- 👥 مدیریت معلمان و دانش‌آموزان
- 💳 مدیریت اشتراک
- 📈 گزارش عملکرد مدرسه
- 📊 آمار و مصرف

### 🛡️ داشبورد ادمین سیستم
- 🏗️ مدیریت مستأجران و مدارس
- 👤 مدیریت کاربران
- 🧠 مصرف AI
- 🚩 Feature Flags
- 🖥️ سلامت سیستم

---

## 🚀 شروع سریع

### نصب

```bash
npm install
```

### اجرای لوکال

```bash
npm run dev
```

### ساخت نسخه Production

```bash
npm run build
```

### پیش‌نمایش Production

```bash
npm run preview
```

---

## 🌐 Deploy

### Vercel (سریع‌ترین)

1. این ریپازیتوری را fork یا clone کنید
2. وارد [vercel.com](https://vercel.com) شوید
3. **New Project** → Import Git Repository
4. Vercel خودکار Vite را تشخیص می‌دهد
5. **Deploy** را بزنید

### Cloudflare Pages

1. وارد [dash.cloudflare.com](https://dash.cloudflare.com) شوید
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. تنظیمات:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Save and Deploy**

📖 راهنمای کامل: [DEPLOY.md](./DEPLOY.md)

---

## 🗺️ نقشه راه

- [x] Prototype فرانت‌اند (React + Tailwind + RTL)
- [x] ۴ داشبورد مجزا برای ۴ نقش
- [x] Role-based routing
- [x] **Mock Backend** (localStorage + API Client)
- [x] **Tenant Isolation** کامل
- [x] **Role-Based Access Control**
- [x] **Data Persistence** (داده‌ها ذخیره می‌شوند)
- [x] **AI Integration** (Mock)
- [ ] Backend واقعی (FastAPI + PostgreSQL)
- [ ] Authentication واقعی (JWT)
- [ ] Telegram Bot Adapter
- [ ] AI Gateway واقعی (OpenAI/Gemini)
- [ ] تست‌های کامل

📊 مشاهده نقشه راه کامل: از داخل پروژه → sidebar → **نقشه راه پروژه**

---

## 🏗️ معماری

```
┌─────────────────────────────────────────┐
│           Channel Adapters              │
│  (Telegram / Bale / Web / Android)      │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Frontend (React + Vite)          │
│  Student / Teacher / Admin / Platform   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│          API Layer (FastAPI)            │
│  Auth / Identity / Tenant / Permission  │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Domain Services                 │
│  AI / RAG / Education / Subscription    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│    PostgreSQL + Redis + Vector Store    │
└─────────────────────────────────────────┘
```

---

## 🔐 امنیت

- ✅ Role-based access control
- ✅ Tenant isolation
- ✅ Server-side permission checks
- ✅ No secrets in code
- ✅ Environment variables only
- ✅ HTTPS required

---

## 📚 مستندات

- [DEPLOY.md](./DEPLOY.md) — راهنمای deploy
- [ARCHITECTURE.md](./ARCHITECTURE.md) — معماری سیستم
- [SECURITY.md](./SECURITY.md) — سیاست‌های امنیتی

---

## 🛠️ Tech Stack

| لایه | تکنولوژی |
|------|-----------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS 3 |
| Build | Vite 6 |
| Routing | React Router 6 |
| Icons | Lucide React |
| Font | Vazirmatn (فارسی) |
| Direction | RTL |

---

## 📄 لایسنس

MIT

---

<div dir="rtl">

## 🇮🇷 پلتفرم آموزش هوشمند ایران

ساخته شده با ❤️ برای آموزش بهتر

</div>
