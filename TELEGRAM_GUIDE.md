# 🤖 راهنمای تبدیل به بات تلگرام

## ✅ پاسخ کوتاه: بله، کاملاً امکان‌پذیر است!

این پروژه از ابتدا با معماری **API-First** و **Omnichannel** طراحی شده است. فرانت‌اند فعلی فقط یک Client است و می‌تواند به عنوان Telegram Web App کار کند.

---

## 🎯 آنچه الان دارید (آماده است)

✅ فرانت‌اند کامل با ۴ داشبورد  
✅ Role-based routing  
✅ Telegram Web App ready  
✅ Mini App page (/mini-app)  
✅ Responsive & RTL design  
✅ معماری API-First  

---

## 🔧 آنچه نیاز دارید (باید ساخته شود)

### ۱. Backend API (ضروری)
- **FastAPI** (Python)
- **PostgreSQL** (Database)
- **Redis** (Cache)
- **JWT Authentication**

### ۲. Telegram Bot (ضروری)
- **python-telegram-bot** یا **aiogram**
- **Bot Token** از @BotFather
- **Webhook** یا **Polling**

### ۳. Server (ضروری)
- **VPS** (Hetzner, DigitalOcean, یا سرور داخلی)
- حداقل: 2 CPU, 4GB RAM, 40GB SSD
- هزینه: €5-20/ماه

### ۴. AI Gateway (اختیاری)
- **OpenAI API** یا **Google Gemini** یا **Qwen**
- هزینه: $10-50/ماه (بسته به مصرف)

---

## 🏗️ معماری سیستم

```
┌─────────────────────────────────────────┐
│           Telegram Bot                  │
│      (@teachschool_bot)                 │
└─────────────────┬───────────────────────┘
                  │
                  │ Webhook / Polling
                  ▼
┌─────────────────────────────────────────┐
│        Backend API (FastAPI)            │
│  /api/v1/webhook/telegram               │
│  /api/v1/auth/telegram                  │
│  /api/v1/student/dashboard              │
│  /api/v1/teacher/dashboard              │
└─────────────────┬───────────────────────┘
                  │
                  │ JWT Token
                  ▼
┌─────────────────────────────────────────┐
│     Frontend (Telegram Web App)         │
│  /mini-app/?token=...                   │
│  → Role-based Dashboard                 │
└─────────────────────────────────────────┘
```

---

## 📝 مراحل عملی

### مرحله ۱: ساخت Backend (۳-۵ روز)

```bash
# ایجاد پروژه
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# یا: venv\Scripts\activate  # Windows

# نصب وابستگی‌ها
pip install fastapi uvicorn sqlalchemy psycopg2-binary \
            python-jose[cryptography] passlib[bcrypt] \
            python-telegram-bot redis

# ساخت ساختار
mkdir -p app/{api,models,schemas,services,bot,core}
touch app/__init__.py
touch app/main.py
```

### مرحله ۲: کد اصلی بات تلگرام

```python
# app/bot/main.py
from telegram import Update, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes
import jwt
import os
from datetime import datetime, timedelta

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
JWT_SECRET = os.getenv("JWT_SECRET")
FRONTEND_URL = os.getenv("FRONTEND_URL")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /start command"""
    telegram_user = update.effective_user
    
    # 1. Resolve or create user in database
    user = await resolve_telegram_identity(
        telegram_id=telegram_user.id,
        username=telegram_user.username,
        first_name=telegram_user.first_name
    )
    
    # 2. Generate JWT token
    token = jwt.encode(
        {
            "sub": user.id,
            "role": user.role,
            "tenant_id": user.tenant_id,
            "exp": datetime.utcnow() + timedelta(hours=24)
        },
        JWT_SECRET,
        algorithm="HS256"
    )
    
    # 3. Create Web App URL with token
    webapp_url = f"{FRONTEND_URL}/mini-app/?token={token}"
    
    # 4. Send message with Web App button
    keyboard = [[
        KeyboardButton(
            text="🚀 ورود به پنل",
            web_app=WebAppInfo(url=webapp_url)
        )
    ]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    
    await update.message.reply_text(
        f"سلام {telegram_user.first_name}! 👋\n\n"
        f"به پلتفرم آموزش هوشمند خوش آمدید.\n"
        f"برای ورود به پنل، روی دکمه زیر کلیک کنید:",
        reply_markup=reply_markup
    )

async def resolve_telegram_identity(telegram_id: int, username: str, first_name: str):
    """Resolve Telegram user to canonical user"""
    # Check if user exists
    user = await db.get_user_by_telegram_id(telegram_id)
    
    if not user:
        # Create new user (default role: STUDENT)
        user = await db.create_user(
            telegram_id=telegram_id,
            username=username,
            name=first_name,
            role="STUDENT"
        )
    
    return user

def main():
    """Start the bot"""
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.run_polling()

if __name__ == "__main__":
    main()
```

### مرحله ۳: کد FastAPI Backend

```python
# app/api/main.py
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
import jwt
from pydantic import BaseModel

app = FastAPI(title="AI Education Platform API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class UserResponse(BaseModel):
    id: str
    name: str
    role: str
    tenant_id: str = None

# Auth dependency
async def get_current_user(authorization: str = Header(...)):
    """Validate JWT token and return user"""
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user_id = payload.get("sub")
        user = await db.get_user(user_id)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Endpoints
@app.get("/api/v1/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/v1/me", response_model=UserResponse)
async def get_me(user=Depends(get_current_user)):
    """Get current user info"""
    return UserResponse(
        id=user.id,
        name=user.name,
        role=user.role,
        tenant_id=user.tenant_id
    )

@app.get("/api/v1/student/dashboard")
async def student_dashboard(user=Depends(get_current_user)):
    """Student dashboard data"""
    if user.role != "STUDENT":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return {
        "assignments": await db.get_student_assignments(user.id),
        "exams": await db.get_student_exams(user.id),
        "progress": await db.get_student_progress(user.id)
    }
```

### مرحله ۴: Environment Variables

```env
# .env
TELEGRAM_BOT_TOKEN=your_bot_token_here
JWT_SECRET=your_super_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/ai_edu
REDIS_URL=redis://localhost:6379
FRONTEND_URL=https://yourdomain.com
```

### مرحله ۵: تنظیمات تلگرام

```bash
# در BotFather:
/myapps
→ Select your bot (@teachschool_bot)
→ Edit Web App URL
→ https://yourdomain.com/mini-app/

/setmenubutton
→ Select your bot
→ URL: https://yourdomain.com/mini-app/
→ Text: ورود به پنل
```

---

## 💰 تخمین هزینه

### حداقل (بدون AI)
- VPS: €5/ماه
- دامنه: ۵۰ هزار تومان/سال
- SSL: رایگان
- **مجموع: ~€5/ماه (۳۰۰ هزار تومان)**

### کامل (با AI)
- VPS: €20/ماه
- دامنه: ۵۰ هزار تومان/سال
- OpenAI API: $10-50/ماه
- **مجموع: ~€30-70/ماه (۲-۴ میلیون تومان)**

---

## ⏱️ تخمین زمان

### رویکرد سریع (۲ هفته)
- Backend ساده: ۳-۵ روز
- Telegram Bot: ۲-۳ روز
- اتصال Frontend: ۲-۳ روز
- Deploy: ۱-۲ روز
- **مجموع: ۱۰-۱۶ روز**

### رویکرد کامل (۲-۳ ماه)
- Backend کامل: ۲-۳ هفته
- AI Gateway: ۱-۲ هفته
- Tenant Isolation: ۱ هفته
- تست و دیباگ: ۱-۲ هفته
- **مجموع: ۲-۳ ماه**

---

## 🎯 پیشنهاد من

### ۱. شروع با رویکرد سریع (۲ هفته)
- Backend ساده بسازید تا بات تلگرام کار کند
- داده‌ها را در PostgreSQL ذخیره کنید
- Frontend را به Backend متصل کنید
- Deploy کنید و تست بگیرید

### ۲. سپس به تدریج کامل‌تر کنید
- AI Gateway را اضافه کنید
- Tenant isolation را پیاده‌سازی کنید
- Featureهای پیشرفته را اضافه کنید

---

## 🔐 نکات امنیتی مهم

❌ **هرگز** Token یا Secret را در کد قرار ندهید  
✅ از **Environment Variables** استفاده کنید  
✅ فایل `.env` را در `.gitignore` بگذارید  
✅ HTTPS اجباری (با Let's Encrypt)  
✅ JWT Token را کوتاه مدت کنید (۲۴ ساعت)  
✅ Telegram initData را server-side validate کنید  

---

## 📚 منابع مفید

- [مستندات Telegram Bot API](https://core.telegram.org/bots/api)
- [مستندات python-telegram-bot](https://docs.python-telegram-bot.org/)
- [مستندات FastAPI](https://fastapi.tiangolo.com/)
- [مستندات Telegram Web Apps](https://core.telegram.org/bots/webapps)

---

## 🆘 مشکلات رایج

### مشکل: Web App باز نمی‌شود
**راه‌حل:** دامنه را در BotFather → /myapps اضافه کنید

### مشکل: Token کار نمی‌کند
**راه‌حل:** Token را از BotFather دوباره بگیرید و در .env قرار دهید

### مشکل: CORS error
**راه‌حل:** در FastAPI، allow_origins را درست تنظیم کنید

---

## ✅ چک‌لیست نهایی

- [ ] Backend API کار می‌کند
- [ ] Database متصل است
- [ ] Telegram Bot پاسخ می‌دهد
- [ ] /start کار می‌کند
- [ ] Web App باز می‌شود
- [ ] Authentication کار می‌کند
- [ ] Role-based routing کار می‌کند
- [ ] HTTPS فعال است
- [ ] Webhook تنظیم شده
- [ ] Environment variables امن هستند

---

<div dir="rtl">

## 🇮🇷 موفق باشید!

با این راهنما، می‌توانید پروژه را به یک بات تلگرام کامل تبدیل کنید.

**سوالی دارید؟** از صفحه «راهنمای تلگرام» در داخل پروژه استفاده کنید.

</div>
