import React from 'react';
import {
  CheckCircle2, Circle, Clock, AlertTriangle, Rocket,
  Database, Server, Shield, Bot, Brain, Layers,
  Globe, TestTube, GitBranch, Package, Cloud,
  FileCode, Lock, Users, Zap, Target
} from 'lucide-react';

type PhaseStatus = 'done' | 'in-progress' | 'planned' | 'future';

interface Phase {
  id: string;
  code: string;
  title: string;
  description: string;
  status: PhaseStatus;
  progress: number;
  icon: React.ReactNode;
  color: string;
  items: {
    name: string;
    done: boolean;
    note?: string;
  }[];
}

const PHASES: Phase[] = [
  {
    id: 'phase-0',
    code: 'PHASE 0',
    title: 'نمای کلی وضعیت پروژه',
    description: 'خلاصه صادقانه از آنچه ساخته شده و آنچه باقی مانده',
    status: 'in-progress',
    progress: 18,
    icon: <Target size={24} />,
    color: 'from-rose-500 to-pink-500',
    items: [
      { name: 'Frontend Prototype (React + Tailwind + RTL)', done: true },
      { name: '۴ داشبورد مجزا برای ۴ نقش', done: true },
      { name: 'Role-based routing', done: true },
      { name: 'Backend (FastAPI + PostgreSQL)', done: false, note: 'هنوز ساخته نشده' },
      { name: 'AI Gateway واقعی', done: false, note: 'فقط UI شبیه‌سازی شده' },
      { name: 'Telegram Bot Adapter', done: false, note: 'هنوز ساخته نشده' },
      { name: 'Authentication واقعی (JWT)', done: false, note: 'فقط demo login' },
      { name: 'Tenant Isolation + RLS', done: false, note: 'هنوز ساخته نشده' },
      { name: 'تست‌ها (Unit/Integration/E2E)', done: false, note: 'هنوز ساخته نشده' },
      { name: 'Deployment (Docker + CI/CD)', done: false, note: 'هنوز ساخته نشده' },
    ],
  },
  {
    id: 'phase-1',
    code: 'MILESTONE A',
    title: 'هسته پلتفرم — Core Platform',
    description: 'احراز هویت، نقش‌ها، Tenant، مدرسه، کلاس، داشبوردها، Telegram Adapter',
    status: 'in-progress',
    progress: 35,
    icon: <Layers size={24} />,
    color: 'from-blue-500 to-indigo-500',
    items: [
      { name: 'Repository + CI اولیه', done: true },
      { name: 'ساختار Configuration & Secrets', done: false, note: '.env structure لازم است' },
      { name: 'PostgreSQL + Redis setup', done: false },
      { name: 'User + Identity model', done: false },
      { name: 'ExternalIdentity (Telegram/Bale/Web)', done: false },
      { name: 'Tenant model + isolation', done: false },
      { name: 'Role & Permission system', done: false, note: 'فقط در فرانت‌اند شبیه‌سازی شده' },
      { name: 'Telegram Adapter (resolve identity)', done: false },
      { name: 'Auth API (JWT issue/validate)', done: false },
      { name: 'Shared frontend auth bootstrap', done: false, note: 'sessionStorage + re-auth' },
      { name: 'Dashboard shells (هر ۴ نقش)', done: true, note: 'UI ساخته شده، بدون API' },
      { name: 'School/Class/Membership', done: false },
    ],
  },
  {
    id: 'phase-2',
    code: 'MILESTONE B',
    title: 'هسته آموزشی — Education Core',
    description: 'تکالیف، آزمون‌ها، تلاش‌ها، نتایج، پیشرفت',
    status: 'planned',
    progress: 10,
    icon: <FileCode size={24} />,
    color: 'from-emerald-500 to-teal-500',
    items: [
      { name: 'Assignment model + API', done: false, note: 'فقط UI ساخته شده' },
      { name: 'Exam model + blueprint', done: false },
      { name: 'ExamAttempt (race-safe, atomic)', done: false },
      { name: 'ExamResult + server-side grading', done: false },
      { name: 'Idempotent submit', done: false },
      { name: 'Question snapshot persistence', done: false },
      { name: 'Progress (از داده واقعی، نه fake)', done: false, note: 'UI ساخته شده ولی fake' },
      { name: 'Teacher result visibility', done: false },
      { name: 'Student result visibility (فقط خود)', done: false },
      { name: 'Negative tests (wrong tenant/role)', done: false },
    ],
  },
  {
    id: 'phase-3',
    code: 'MILESTONE C',
    title: 'هسته AI — AI Core',
    description: 'AI Gateway، Tutor، Summarizer، Question Generator، Teacher Assistant',
    status: 'planned',
    progress: 5,
    icon: <Brain size={24} />,
    color: 'from-violet-500 to-purple-500',
    items: [
      { name: 'AI Gateway مرکزی', done: false, note: 'Provider-agnostic interface' },
      { name: 'Provider adapters (OpenAI/Gemini/Qwen)', done: false },
      { name: 'Retry + Timeout + Fallback', done: false },
      { name: 'Cost accounting + Usage metering', done: false },
      { name: 'Student Tutor agent', done: false, note: 'فقط UI chat شبیه‌سازی' },
      { name: 'Summarizer agent', done: false },
      { name: 'Question Generator agent', done: false, note: 'UI ساخته شده بدون backend' },
      { name: 'Teacher Assistant agent', done: false },
      { name: 'Prompt management (versioned)', done: false },
      { name: 'Structured output (schema-based)', done: false },
    ],
  },
  {
    id: 'phase-4',
    code: 'MILESTONE D',
    title: 'RAG و محتوا — RAG & Content',
    description: 'Upload، Ingestion، Retrieval، Source Guardian',
    status: 'planned',
    progress: 0,
    icon: <Database size={24} />,
    color: 'from-amber-500 to-orange-500',
    items: [
      { name: 'File upload + validation', done: false },
      { name: 'Text extraction (PDF/DOCX/TXT)', done: false },
      { name: 'Chunking strategy', done: false },
      { name: 'Embedding generation', done: false },
      { name: 'Vector store (pgvector/Qdrant)', done: false },
      { name: 'Retrieval pipeline', done: false },
      { name: 'Source Guardian (grounded answers)', done: false },
      { name: 'Citation mapping', done: false },
      { name: 'Permission before retrieval', done: false },
      { name: 'Tenant isolation in RAG', done: false },
    ],
  },
  {
    id: 'phase-5',
    code: 'MILESTONE E',
    title: 'اشتراک و پرداخت — Subscription',
    description: 'طرح‌ها، Entitlements، Metering، Paywall',
    status: 'planned',
    progress: 0,
    icon: <Zap size={24} />,
    color: 'from-cyan-500 to-blue-500',
    items: [
      { name: 'Plan model (code vs marketing name)', done: false },
      { name: 'Subscription lifecycle', done: false },
      { name: 'Entitlement system', done: false },
      { name: 'Usage metering (per request)', done: false },
      { name: 'Feature gating (Role+Plan+Tenant)', done: false, note: 'فقط UI placeholder' },
      { name: 'Paywall UX', done: false },
      { name: 'Backend-enforced limits', done: false },
      { name: 'AI cost budget per feature', done: false },
    ],
  },
  {
    id: 'phase-6',
    code: 'MILESTONE F',
    title: 'یادگیری پیشرفته — Advanced Learning',
    description: 'Adaptive، Flashcards، Study Planner، Analytics',
    status: 'planned',
    progress: 10,
    icon: <Rocket size={24} />,
    color: 'from-pink-500 to-rose-500',
    items: [
      { name: 'Adaptive learning engine', done: false },
      { name: 'Flashcard maker (AI)', done: false, note: 'UI ساخته شده بدون AI' },
      { name: 'Study planner (AI)', done: false, note: 'UI ساخته شده با داده ثابت' },
      { name: 'Learning analytics', done: false, note: 'UI با داده ساختگی — باید حذف شود' },
      { name: 'Topic mastery tracking', done: false },
      { name: 'Recommendation engine', done: false },
    ],
  },
  {
    id: 'phase-7',
    code: 'MILESTONE G',
    title: 'رسانه — Media',
    description: 'Podcast، PDF generation',
    status: 'future',
    progress: 0,
    icon: <Package size={24} />,
    color: 'from-gray-500 to-slate-500',
    items: [
      { name: 'Podcast Creator (async job)', done: false },
      { name: 'PDF Creator (structured)', done: false },
      { name: 'Background job queue', done: false },
      { name: 'Job status tracking', done: false },
    ],
  },
  {
    id: 'phase-8',
    code: 'MILESTONE H',
    title: 'چندکاناله — Omnichannel',
    description: 'Bale، Web Auth مستقل، Android',
    status: 'future',
    progress: 0,
    icon: <Globe size={24} />,
    color: 'from-teal-500 to-emerald-500',
    items: [
      { name: 'Bale Adapter', done: false },
      { name: 'Web Auth مستقل از Telegram', done: false },
      { name: 'Android app (API consumer)', done: false },
      { name: 'Notification Service', done: false },
      { name: 'Channel-agnostic business logic', done: false },
    ],
  },
  {
    id: 'phase-9',
    code: 'MILESTONE I',
    title: 'سخت‌سازی Production — Hardening',
    description: 'امنیت، عملکرد، observability، backup، DR، load test',
    status: 'future',
    progress: 0,
    icon: <Shield size={24} />,
    color: 'from-red-500 to-rose-500',
    items: [
      { name: 'PostgreSQL RLS', done: false },
      { name: 'Rate limiting', done: false },
      { name: 'Audit logging (safe, no secrets)', done: false },
      { name: 'Secure Role Preview', done: false },
      { name: 'Observability (logs, traces, health)', done: false },
      { name: 'Backup + restore verification', done: false },
      { name: 'Disaster recovery plan', done: false },
      { name: 'Load testing', done: false },
      { name: 'Security audit', done: false },
    ],
  },
];

const STATUS_CONFIG: Record<PhaseStatus, { label: string; color: string; icon: React.ReactNode }> = {
  'done': { label: 'تکمیل شده', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={14} /> },
  'in-progress': { label: 'در حال ساخت', color: 'bg-blue-100 text-blue-700', icon: <Clock size={14} /> },
  'planned': { label: 'برنامه‌ریزی شده', color: 'bg-amber-100 text-amber-700', icon: <Target size={14} /> },
  'future': { label: 'آینده', color: 'bg-gray-100 text-gray-600', icon: <Circle size={14} /> },
};

export default function ProjectStatusPage() {
  const totalProgress = Math.round(
    PHASES.reduce((sum, p) => sum + p.progress, 0) / PHASES.length
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <GitBranch size={28} />
              نقشه راه پروژه
            </h1>
            <p className="text-slate-300">
              گزارش شفاف وضعیت — چه ساخته شده، چه مانده، و چرا
            </p>
          </div>
          <div className="bg-white/10 px-4 py-3 rounded-xl text-center">
            <p className="text-3xl font-bold">{totalProgress}٪</p>
            <p className="text-xs text-slate-300 mt-1">پیشرفت کلی</p>
          </div>
        </div>
      </div>

      {/* Honest Summary */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={22} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">گزارش صادقانه وضعیت فعلی</h3>
            <div className="space-y-2 text-sm text-amber-800">
              <p>✅ <strong>ساخته شده:</strong> یک Prototype فرانت‌اند کامل با ۴ داشبورد، Role routing، و چند صفحه داخلی (AI Tutor، تکالیف، آزمون‌ها، فلش‌کارت، برنامه مطالعه، آزمون‌ساز).</p>
              <p>⚠️ <strong>نکته مهم:</strong> تمام داده‌ها در این نسخه <u>ثابت و شبیه‌سازی شده</u> هستند. هیچ بک‌اند، دیتابیس، AI واقعی، یا Telegram Botی متصل نشده است.</p>
              <p>🚧 <strong>باقی‌مانده:</strong> حدود ۸۲٪ از پروژه شامل Backend، Database، AI Gateway، Authentication واقعی، Tenant Isolation، Telegram Adapter، تست‌ها، و Deployment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <QuickStat icon={<CheckCircle2 size={18} />} label="تکمیل شده" value="۲" color="text-emerald-600 bg-emerald-50" />
        <QuickStat icon={<Clock size={18} />} label="در حال ساخت" value="۱" color="text-blue-600 bg-blue-50" />
        <QuickStat icon={<Target size={18} />} label="برنامه‌ریزی" value="۵" color="text-amber-600 bg-amber-50" />
        <QuickStat icon={<Circle size={18} />} label="آینده" value="۲" color="text-gray-600 bg-gray-50" />
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const statusConfig = STATUS_CONFIG[phase.status];
          return (
            <div key={phase.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Phase header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-l ${phase.color} flex items-center justify-center text-white flex-shrink-0`}>
                      {phase.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{phase.code}</span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">{phase.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{phase.description}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900">{phase.progress}٪</p>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full bg-gradient-to-l ${phase.color} rounded-full`}
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase items */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                      item.done ? 'bg-emerald-50/50' : 'bg-gray-50/50'
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle size={16} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`${item.done ? 'text-gray-700' : 'text-gray-600'}`}>
                        {item.name}
                      </p>
                      {item.note && (
                        <p className="text-xs text-amber-600 mt-0.5">💡 {item.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-l from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Rocket size={22} />
          مراحل بعدی پیشنهادی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <NextStep num="۱" title="Backend API" desc="FastAPI + PostgreSQL + Redis + Alembic migrations" />
          <NextStep num="۲" title="Authentication واقعی" desc="JWT + Telegram initData validation + session management" />
          <NextStep num="۳" title="Tenant Isolation" desc="RLS + server-side tenant resolution + negative tests" />
          <NextStep num="۴" title="Telegram Adapter" desc="@teachschool_bot → Canonical User → Dashboard routing" />
          <NextStep num="۵" title="AI Gateway" desc="Provider-agnostic + cost metering + retry + fallback" />
          <NextStep num="۶" title="حذف داده‌های ثابت" desc="جایگزینی همه mock data با API واقعی" />
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h3 className="font-bold text-slate-900 mb-3">اصل حاکم بر این پروژه:</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <p>• <strong>داده واقعی، نه نمایشی.</strong> هیچ KPI ساختگی، هیچ پیشرفت جاوازده، هیچ آمار فیک.</p>
          <p>• <strong>امنیت و Tenant Isolation قبل از Feature جدید.</strong></p>
          <p>• <strong>API-First.</strong> Telegram فقط یک Channel است، نه Business Logic.</p>
          <p>• <strong>هر Feature تا وقتی Backend + Permission + Test + UX ندارد، Done نیست.</strong></p>
          <p>• <strong>اگر فردا Telegram حذف شود، Core Platform باید کار کند.</strong></p>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function NextStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{num}</span>
        <h4 className="font-bold text-sm">{title}</h4>
      </div>
      <p className="text-xs text-blue-100 pr-8">{desc}</p>
    </div>
  );
}
