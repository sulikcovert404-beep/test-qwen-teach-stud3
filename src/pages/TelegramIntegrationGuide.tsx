import React, { useState } from 'react';
import {
  Send, CheckCircle2, AlertCircle, Code, Server, Database,
  Bot, Globe, Zap, DollarSign, Clock, FileCode, Shield,
  ChevronDown, ChevronUp, Copy, ExternalLink, Terminal,
  ArrowLeft, Layers, Cpu, Cloud, Key, Webhook, MessageSquare
} from 'lucide-react';

type Tab = 'overview' | 'requirements' | 'architecture' | 'backend' | 'steps' | 'cost';

export default function TelegramIntegrationGuide() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'نمای کلی', icon: <Globe size={16} /> },
    { id: 'requirements', label: 'نیازمندی‌ها', icon: <CheckCircle2 size={16} /> },
    { id: 'architecture', label: 'معماری', icon: <Layers size={16} /> },
    { id: 'backend', label: 'کد Backend', icon: <Code size={16} /> },
    { id: 'steps', label: 'مراحل عملی', icon: <Terminal size={16} /> },
    { id: 'cost', label: 'هزینه و زمان', icon: <DollarSign size={16} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Bot size={28} />
          تبدیل به بات تلگرام
        </h1>
        <p className="text-blue-100">
          راهنمای کامل تبدیل پلتفرم به بات تلگرام — از معماری تا پیاده‌سازی
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
          <CheckCircle2 size={18} />
          <span className="font-medium">✅ بله، کاملاً امکان‌پذیر است!</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-xl border border-gray-200 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-l from-blue-500 to-cyan-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && <OverviewSection />}
      {activeTab === 'requirements' && <RequirementsSection />}
      {activeTab === 'architecture' && <ArchitectureSection />}
      {activeTab === 'backend' && <BackendCodeSection copiedCode={copiedCode} onCopy={copyCode} />}
      {activeTab === 'steps' && <StepsSection />}
      {activeTab === 'cost' && <CostSection />}
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Answer */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={24} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-emerald-900 mb-2">پاسخ کوتاه: بله!</h2>
            <p className="text-emerald-800 leading-relaxed">
              این پروژه از ابتدا با معماری <strong>API-First</strong> و <strong>Omnichannel</strong> طراحی شده است.
              فرانت‌اند فعلی فقط یک Client است و می‌تواند به عنوان Telegram Web App کار کند.
              برای تبدیل کامل به بات تلگرام، فقط نیاز به ساخت یک <strong>Backend API</strong> دارید.
            </p>
          </div>
        </div>
      </div>

      {/* What You Have */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          آنچه الان دارید (آماده است)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'فرانت‌اند کامل با ۴ داشبورد',
            'Role-based routing',
            'Telegram Web App ready',
            'Mini App page (/mini-app)',
            'Responsive & RTL design',
            'معماری API-First',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
              <span className="text-sm text-emerald-800">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What You Need */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-amber-500" />
          آنچه نیاز دارید (باید ساخته شود)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Backend API', desc: 'FastAPI + PostgreSQL + Redis', priority: 'ضروری' },
            { title: 'Telegram Bot', desc: 'Python-telegram-bot یا aiogram', priority: 'ضروری' },
            { title: 'Authentication', desc: 'JWT + Telegram initData validation', priority: 'ضروری' },
            { title: 'Database', desc: 'PostgreSQL با Tenant isolation', priority: 'ضروری' },
            { title: 'AI Gateway', desc: 'اتصال به OpenAI/Gemini/Qwen', priority: 'اختیاری' },
            { title: 'Server', desc: 'VPS یا Cloud (Hetzner/DigitalOcean)', priority: 'ضروری' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">{item.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.priority === 'ضروری' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Approaches */}
      <div className="bg-gradient-to-l from-violet-500 to-purple-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">دو رویکرد برای تبدیل:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              رویکرد ۱: سریع (۱-۲ هفته)
            </h3>
            <ul className="text-sm text-violet-100 space-y-1">
              <li>• فقط Backend ساده</li>
              <li>• Telegram Web App</li>
              <li>• بدون AI واقعی</li>
              <li>• داده‌های ثابت</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              رویکرد ۲: کامل (۲-۳ ماه)
            </h3>
            <ul className="text-sm text-violet-100 space-y-1">
              <li>• Backend کامل + Database</li>
              <li>• AI Gateway واقعی</li>
              <li>• Tenant isolation</li>
              <li>• Production ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequirementsSection() {
  return (
    <div className="space-y-6">
      {/* Tech Stack */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Code size={20} className="text-blue-500" />
          تکنولوژی‌های مورد نیاز
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TechCard
            category="Backend"
            items={[
              { name: 'Python 3.11+', level: 'ضروری' },
              { name: 'FastAPI', level: 'ضروری' },
              { name: 'SQLAlchemy', level: 'ضروری' },
              { name: 'Alembic', level: 'ضروری' },
              { name: 'Pydantic', level: 'ضروری' },
            ]}
          />
          <TechCard
            category="Database"
            items={[
              { name: 'PostgreSQL 15+', level: 'ضروری' },
              { name: 'Redis', level: 'ضروری' },
              { name: 'pgvector (برای RAG)', level: 'اختیاری' },
            ]}
          />
          <TechCard
            category="Telegram"
            items={[
              { name: 'python-telegram-bot', level: 'ضروری' },
              { name: 'aiogram (جایگزین)', level: 'اختیاری' },
              { name: 'Telegram Bot Token', level: 'ضروری' },
            ]}
          />
          <TechCard
            category="AI (اختیاری)"
            items={[
              { name: 'OpenAI API', level: 'اختیاری' },
              { name: 'Google Gemini', level: 'اختیاری' },
              { name: 'Qwen API', level: 'اختیاری' },
            ]}
          />
        </div>
      </div>

      {/* Infrastructure */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Server size={20} className="text-emerald-500" />
          زیرساخت مورد نیاز
        </h2>
        <div className="space-y-3">
          <InfraRow
            icon={<Server size={18} />}
            title="سرور (VPS)"
            description="Hetzner, DigitalOcean, یا سرور داخلی"
            specs="حداقل: 2 CPU, 4GB RAM, 40GB SSD"
            cost="€5-20/ماه"
          />
          <InfraRow
            icon={<Database size={18} />}
            title="Database"
            description="PostgreSQL + Redis (می‌تواند روی همان VPS باشد)"
            specs="PostgreSQL 15+, Redis 7+"
            cost="شامل VPS"
          />
          <InfraRow
            icon={<Globe size={18} />}
            title="دامنه (اختیاری)"
            description="برای HTTPS و Webhook"
            specs=".ir یا .com"
            cost="۵۰-۲۰۰ هزار تومان/سال"
          />
          <InfraRow
            icon={<Cloud size={18} />}
            title="SSL Certificate"
            description="Let's Encrypt (رایگان) یا Cloudflare"
            specs="HTTPS اجباری"
            cost="رایگان"
          />
        </div>
      </div>

      {/* Telegram Requirements */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bot size={20} className="text-blue-500" />
          نیازمندی‌های تلگرام
        </h2>
        <div className="space-y-3">
          <TelegramReq
            num="۱"
            title="ساخت بات در BotFather"
            description="دستور /newbot را در @BotFather بزنید و نام بات را انتخاب کنید"
            note="بات فعلی شما: @teachschool_bot"
          />
          <TelegramReq
            num="۲"
            title="دریافت Bot Token"
            description="Token را از BotFather دریافت کنید و در Environment Variable ذخیره کنید"
            note="هرگز Token را در کد یا Git قرار ندهید!"
            warning
          />
          <TelegramReq
            num="۳"
            title="تنظیم Webhook"
            description="URL سرور خود را به Telegram معرفی کنید"
            code="https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://yourdomain.com/webhook/telegram"
          />
          <TelegramReq
            num="۴"
            title="تنظیم Web App"
            description="URL فرانت‌اند را برای Mini App تنظیم کنید"
            code="/myapps → Edit Web App URL → https://yourdomain.com/mini-app/"
          />
        </div>
      </div>

      {/* Skills Required */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-amber-600" />
          مهارت‌های مورد نیاز توسعه‌دهنده
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { skill: 'Python', level: 'متوسط تا پیشرفته' },
            { skill: 'FastAPI', level: 'متوسط' },
            { skill: 'PostgreSQL', level: 'متوسط' },
            { skill: 'Telegram Bot API', level: 'مقدماتی (با مستندات)' },
            { skill: 'Docker', level: 'مقدماتی' },
            { skill: 'Linux Server', level: 'مقدماتی' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl">
              <span className="font-medium text-gray-900">{item.skill}</span>
              <span className="text-sm text-amber-700">{item.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div className="space-y-6">
      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Layers size={20} className="text-blue-500" />
          معماری سیستم
        </h2>
        
        {/* Visual Diagram */}
        <div className="space-y-4">
          {/* Layer 1: Channels */}
          <div className="bg-gradient-to-l from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-3 text-center">لایه ۱: کانال‌ها (Channels)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ChannelBox icon={<Bot size={20} />} label="Telegram Bot" />
              <ChannelBox icon={<Globe size={20} />} label="Web App" />
              <ChannelBox icon={<MessageSquare size={20} />} label="Bale (آینده)" />
              <ChannelBox icon={<Cpu size={20} />} label="Android (آینده)" />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gray-300" />
          </div>

          {/* Layer 2: API */}
          <div className="bg-gradient-to-l from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
            <h3 className="font-bold text-emerald-900 mb-3 text-center">لایه ۲: API Gateway (FastAPI)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <APIBox label="Auth API" />
              <APIBox label="Telegram Adapter" />
              <APIBox label="User API" />
              <APIBox label="Education API" />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gray-300" />
          </div>

          {/* Layer 3: Services */}
          <div className="bg-gradient-to-l from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4">
            <h3 className="font-bold text-violet-900 mb-3 text-center">لایه ۳: Domain Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ServiceBox label="Identity Service" />
              <ServiceBox label="Tenant Service" />
              <ServiceBox label="Education Service" />
              <ServiceBox label="AI Gateway" />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gray-300" />
          </div>

          {/* Layer 4: Data */}
          <div className="bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-bold text-amber-900 mb-3 text-center">لایه ۴: Data Layer</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <DataBox icon={<Database size={18} />} label="PostgreSQL" />
              <DataBox icon={<Zap size={18} />} label="Redis" />
              <DataBox icon={<Cloud size={18} />} label="Vector Store" />
              <DataBox icon={<Globe size={18} />} label="File Storage" />
            </div>
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Webhook size={20} className="text-blue-500" />
          جریان داده: Telegram → Backend → Frontend
        </h2>
        <div className="space-y-3">
          <FlowStep
            num={1}
            title="کاربر /start را در تلگرام می‌زند"
            desc="Telegram پیام را به Webhook شما ارسال می‌کند"
          />
          <FlowStep
            num={2}
            title="Backend پیام را دریافت می‌کند"
            desc="FastAPI endpoint: POST /api/v1/webhook/telegram"
          />
          <FlowStep
            num={3}
            title="Telegram Adapter هویت را Resolve می‌کند"
            desc="telegram_user_id → ExternalIdentity → Canonical User"
          />
          <FlowStep
            num={4}
            title="Backend JWT Token صادر می‌کند"
            desc="Token شامل: user_id, role, tenant_id, exp"
          />
          <FlowStep
            num={5}
            title="Backend Web App URL را با Token برمی‌گرداند"
            desc="https://yourdomain.com/mini-app/?token=..."
          />
          <FlowStep
            num={6}
            title="Frontend Token را در sessionStorage ذخیره می‌کند"
            desc="و به داشبورد مربوط به نقش کاربر redirect می‌کند"
          />
        </div>
      </div>

      {/* Key Principles */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">اصول کلیدی معماری</h2>
        <div className="space-y-2">
          {[
            'Telegram فقط یک Channel است، Business Logic در Backend',
            'اگر فردا Telegram حذف شود، Core Platform باید کار کند',
            'Tenant Context از Server-side Resolve می‌شود، نه از Client',
            'Role هرگز از URL Query گرفته نمی‌شود',
            'Token در sessionStorage (نه localStorage)',
            'همه AI calls از AI Gateway مرکزی عبور می‌کنند',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackendCodeSection({ copiedCode, onCopy }: {
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
}) {
  const mainBotCode = `# app/bot/main.py
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
        f"سلام {telegram_user.first_name}! 👋\\n\\n"
        f"به پلتفرم آموزش هوشمند خوش آمدید.\\n"
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
    
    # Add handlers
    app.add_handler(CommandHandler("start", start))
    
    # Start polling
    app.run_polling()

if __name__ == "__main__":
    main()`;

  const fastapiCode = `# app/api/main.py
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
class TelegramWebhook(BaseModel):
    update_id: int
    message: dict = None

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
    
    # Return student-specific data
    return {
        "assignments": await db.get_student_assignments(user.id),
        "exams": await db.get_student_exams(user.id),
        "progress": await db.get_student_progress(user.id)
    }

@app.get("/api/v1/teacher/dashboard")
async def teacher_dashboard(user=Depends(get_current_user)):
    """Teacher dashboard data"""
    if user.role != "TEACHER":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return {
        "classes": await db.get_teacher_classes(user.id),
        "students_count": await db.get_teacher_students_count(user.id),
        "pending_assignments": await db.get_pending_assignments(user.id)
    }

# Telegram Webhook
@app.post("/api/v1/webhook/telegram")
async def telegram_webhook(webhook: TelegramWebhook):
    """Handle Telegram updates"""
    # Process webhook (or use polling instead)
    # For simplicity, we recommend polling in development
    return {"status": "ok"}`;

  const envExample = `# .env.example
# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/api/v1/webhook/telegram

# JWT
JWT_SECRET=your_super_secret_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_edu
REDIS_URL=redis://localhost:6379

# Frontend
FRONTEND_URL=https://yourdomain.com

# AI (Optional)
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key

# App
APP_ENV=production
DEBUG=false`;

  return (
    <div className="space-y-6">
      {/* Main Bot Code */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Bot size={20} className="text-blue-500" />
            کد اصلی بات تلگرام
          </h2>
          <button
            onClick={() => onCopy(mainBotCode, 'bot')}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            {copiedCode === 'bot' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            <span>{copiedCode === 'bot' ? 'کپی شد!' : 'کپی'}</span>
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto" dir="ltr">
          <code>{mainBotCode}</code>
        </pre>
      </div>

      {/* FastAPI Code */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Server size={20} className="text-emerald-500" />
            کد FastAPI Backend
          </h2>
          <button
            onClick={() => onCopy(fastapiCode, 'api')}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            {copiedCode === 'api' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            <span>{copiedCode === 'api' ? 'کپی شد!' : 'کپی'}</span>
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto" dir="ltr">
          <code>{fastapiCode}</code>
        </pre>
      </div>

      {/* Environment Variables */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Key size={20} className="text-amber-500" />
            Environment Variables
          </h2>
          <button
            onClick={() => onCopy(envExample, 'env')}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            {copiedCode === 'env' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            <span>{copiedCode === 'env' ? 'کپی شد!' : 'کپی'}</span>
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto" dir="ltr">
          <code>{envExample}</code>
        </pre>
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-sm text-red-700 flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span><strong>هشدار امنیتی:</strong> هرگز این فایل را در Git commit نکنید! فایل .env باید در .gitignore باشد.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function StepsSection() {
  return (
    <div className="space-y-6">
      {/* Phase 1 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">۱</span>
          راه‌اندازی Backend (۳-۵ روز)
        </h2>
        <div className="space-y-3">
          <StepItem text="ایجاد پروژه FastAPI با ساختار مناسب" />
          <StepItem text="نصب وابستگی‌ها: FastAPI, SQLAlchemy, Pydantic, python-telegram-bot" />
          <StepItem text="راه‌اندازی PostgreSQL و ایجاد Migrationها" />
          <StepItem text="ایجاد مدل‌های User, ExternalIdentity, Tenant, School, Classroom" />
          <StepItem text="پیاده‌سازی JWT authentication" />
          <StepItem text="ساخت endpointهای اصلی: /me, /student/dashboard, /teacher/dashboard" />
        </div>
      </div>

      {/* Phase 2 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">۲</span>
          اتصال Telegram Bot (۲-۳ روز)
        </h2>
        <div className="space-y-3">
          <StepItem text="ساخت بات در @BotFather و دریافت Token" />
          <StepItem text="پیاده‌سازی handler برای /start" />
          <StepItem text="اتصال به Backend برای resolve identity" />
          <StepItem text="تولید JWT token و ارسال Web App URL" />
          <StepItem text="تنظیم Webhook یا Polling" />
          <StepItem text="تست در محیط development" />
        </div>
      </div>

      {/* Phase 3 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-violet-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">۳</span>
          اتصال Frontend به Backend (۲-۳ روز)
        </h2>
        <div className="space-y-3">
          <StepItem text="به‌روزرسانی AuthContext برای دریافت token از URL" />
          <StepItem text="ایجاد API client برای فراخوانی endpointها" />
          <StepItem text="جایگزینی داده‌های ثابت با API calls" />
          <StepItem text="پیاده‌سازی error handling و loading states" />
          <StepItem text="تست flow کامل: Telegram → Backend → Frontend" />
        </div>
      </div>

      {/* Phase 4 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">۴</span>
          Deploy به Production (۱-۲ روز)
        </h2>
        <div className="space-y-3">
          <StepItem text="خرید VPS (Hetzner/DigitalOcean)" />
          <StepItem text="نصب Docker و Docker Compose" />
          <StepItem text="Deploy Backend با Docker" />
          <StepItem text="تنظیم Nginx reverse proxy" />
          <StepItem text="تنظیم SSL با Let's Encrypt" />
          <StepItem text="تنظیم Webhook در Telegram" />
          <StepItem text="تست نهایی در Production" />
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-emerald-900 mb-4">چک‌لیست نهایی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'Backend API کار می‌کند',
            'Database متصل است',
            'Telegram Bot پاسخ می‌دهد',
            '/start کار می‌کند',
            'Web App باز می‌شود',
            'Authentication کار می‌کند',
            'Role-based routing کار می‌کند',
            'HTTPS فعال است',
            'Webhook تنظیم شده',
            'Environment variables امن هستند',
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg">
              <input type="checkbox" className="rounded text-emerald-500" />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function CostSection() {
  return (
    <div className="space-y-6">
      {/* Time Estimate */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-blue-500" />
          تخمین زمان
        </h2>
        <div className="space-y-3">
          <TimeRow task="Backend ساده (FastAPI + PostgreSQL)" time="۳-۵ روز" level="متوسط" />
          <TimeRow task="Telegram Bot" time="۲-۳ روز" level="متوسط" />
          <TimeRow task="اتصال Frontend به Backend" time="۲-۳ روز" level="متوسط" />
          <TimeRow task="Deploy و تنظیمات" time="۱-۲ روز" level="متوسط" />
          <TimeRow task="تست و دیباگ" time="۲-۳ روز" level="متوسط" />
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between font-bold">
              <span>مجموع (رویکرد سریع)</span>
              <span className="text-blue-600">۱۰-۱۶ روز</span>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex items-center justify-between font-bold">
              <span>مجموع (رویکرد کامل با AI)</span>
              <span className="text-violet-600">۲-۳ ماه</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={20} className="text-emerald-500" />
          تخمین هزینه (ماهانه)
        </h2>
        <div className="space-y-3">
          <CostRow item="VPS (Hetzner CX22)" cost="€4.5" note="2 CPU, 4GB RAM" />
          <CostRow item="دامنه .ir" cost="۵۰ هزار تومان" note="سالانه" />
          <CostRow item="SSL Certificate" cost="رایگان" note="Let's Encrypt" />
          <CostRow item="Telegram Bot" cost="رایگان" note="بدون محدودیت" />
          <CostRow item="OpenAI API (اختیاری)" cost="$10-50" note="بسته به مصرف" />
          <CostRow item="Google Gemini (اختیاری)" cost="رایگان تا $50" note="Free tier موجود" />
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between font-bold text-lg">
              <span>مجموع (حداقل)</span>
              <span className="text-emerald-600">~€5/ماه</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">حدود ۳۰۰ هزار تومان/ماه</p>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gradient-to-l from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">مقایسه دو رویکرد</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-bold mb-3">🚀 رویکرد سریع</h3>
            <ul className="text-sm space-y-2 text-blue-100">
              <li>✅ زمان: ۲ هفته</li>
              <li>✅ هزینه: €5/ماه</li>
              <li>✅ Backend ساده</li>
              <li>✅ داده‌های ثابت</li>
              <li>❌ بدون AI واقعی</li>
              <li>❌ بدون Tenant isolation</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-bold mb-3">🎯 رویکرد کامل</h3>
            <ul className="text-sm space-y-2 text-blue-100">
              <li>✅ زمان: ۲-۳ ماه</li>
              <li>✅ هزینه: €20-50/ماه</li>
              <li>✅ Backend کامل</li>
              <li>✅ AI Gateway واقعی</li>
              <li>✅ Tenant isolation</li>
              <li>✅ Production ready</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
          <AlertCircle size={20} className="text-amber-600" />
          پیشنهاد من
        </h2>
        <div className="space-y-2 text-amber-800">
          <p>
            <strong>۱. شروع با رویکرد سریع (۲ هفته):</strong>
          </p>
          <p className="pr-4">
            • Backend ساده بسازید تا بات تلگرام کار کند
          </p>
          <p className="pr-4">
            • داده‌ها را در PostgreSQL ذخیره کنید
          </p>
          <p className="pr-4">
            • Frontend را به Backend متصل کنید
          </p>
          <p className="pr-4">
            • Deploy کنید و تست بگیرید
          </p>
          <p className="mt-3">
            <strong>۲. سپس به تدریج کامل‌تر کنید:</strong>
          </p>
          <p className="pr-4">
            • AI Gateway را اضافه کنید
          </p>
          <p className="pr-4">
            • Tenant isolation را پیاده‌سازی کنید
          </p>
          <p className="pr-4">
            • Featureهای پیشرفته را اضافه کنید
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function TechCard({ category, items }: { category: string; items: { name: string; level: string }[] }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <h3 className="font-bold text-gray-900 mb-3">{category}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{item.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              item.level === 'ضروری' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {item.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfraRow({ icon, title, description, specs, cost }: {
  icon: React.ReactNode; title: string; description: string; specs: string; cost: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <span className="text-sm font-bold text-emerald-600">{cost}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{specs}</p>
      </div>
    </div>
  );
}

function TelegramReq({ num, title, description, note, code, warning }: {
  num: string; title: string; description: string; note?: string; code?: string; warning?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
        {num}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        {note && (
          <p className={`text-xs mt-1 ${warning ? 'text-red-600' : 'text-blue-600'}`}>
            {warning && '⚠️ '}{note}
          </p>
        )}
        {code && (
          <code className="block mt-2 text-xs bg-slate-900 text-slate-100 p-2 rounded" dir="ltr">
            {code}
          </code>
        )}
      </div>
    </div>
  );
}

function ChannelBox({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-lg p-3 text-center">
      <div className="text-blue-600 mb-1 flex justify-center">{icon}</div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

function APIBox({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-lg p-2 text-center">
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

function ServiceBox({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-lg p-2 text-center">
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

function DataBox({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-lg p-2 text-center flex items-center justify-center gap-1">
      <span className="text-amber-600">{icon}</span>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

function FlowStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
        {num}
      </div>
      <div className="flex-1 pt-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function StepItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

function TimeRow({ task, time, level }: { task: string; time: string; level: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <span className="text-sm text-gray-700">{task}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{level}</span>
        <span className="text-sm font-bold text-blue-600">{time}</span>
      </div>
    </div>
  );
}

function CostRow({ item, cost, note }: { item: string; cost: string; note: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <div>
        <span className="text-sm text-gray-700">{item}</span>
        <p className="text-xs text-gray-400">{note}</p>
      </div>
      <span className="text-sm font-bold text-emerald-600">{cost}</span>
    </div>
  );
}
