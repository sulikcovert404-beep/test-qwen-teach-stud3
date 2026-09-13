import React, { useState } from 'react';
import {
  Rocket, Cloud, Globe, CheckCircle2, Copy, ExternalLink,
  Terminal, GitBranch, Settings, Shield, Zap, AlertCircle,
  ChevronDown, ChevronUp, Server, Link2, Eye
} from 'lucide-react';

type Tab = 'vercel' | 'cloudflare' | 'custom-domain' | 'telegram';

interface Step {
  num: number;
  title: string;
  description: string;
  code?: string;
  codeLabel?: string;
  link?: { url: string; label: string };
  warning?: string;
  tip?: string;
}

const VERCEL_STEPS: Step[] = [
  {
    num: 1,
    title: 'پروژه را روی GitHub آپلود کنید',
    description: 'یک ریپازیتوری جدید در GitHub بسازید و کد پروژه را push کنید.',
    code: `git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-edu-iran.git
git push -u origin main`,
    codeLabel: 'Terminal',
    warning: 'فایل .env را هرگز commit نکنید. مطمئن شوید در .gitignore هست.',
  },
  {
    num: 2,
    title: 'وارد Vercel شوید',
    description: 'با اکانت GitHub خود وارد Vercel شوید.',
    link: { url: 'https://vercel.com/signup', label: 'ورود به Vercel' },
  },
  {
    num: 3,
    title: 'ریپازیتوری را Import کنید',
    description: 'روی "Add New Project" کلیک کنید و ریپازیتوری GitHub خود را انتخاب کنید.',
  },
  {
    num: 4,
    title: 'تنظیمات Build را بررسی کنید',
    description: 'Vercel به صورت خودکار Vite را تشخیص می‌دهد. تنظیمات پیش‌فرض کافی است:',
    code: `Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install`,
    codeLabel: 'Vercel Settings',
    tip: 'فایل vercel.json در پروژه شما این تنظیمات را خودکار انجام می‌دهد.',
  },
  {
    num: 5,
    title: 'Environment Variables را اضافه کنید',
    description: 'در بخش Environment Variables، متغیرهای لازم را اضافه کنید:',
    code: `VITE_API_URL=https://your-backend.com/api/v1
VITE_TELEGRAM_BOT_USERNAME=teachschool_bot
VITE_APP_ENV=production`,
    codeLabel: 'Environment Variables',
    warning: 'هرگز Secret یا Token واقعی را در کد قرار ندهید.',
  },
  {
    num: 6,
    title: 'Deploy کنید',
    description: 'روی "Deploy" کلیک کنید. بعد از چند ثانیه، پروژه شما آنلاین می‌شود.',
    tip: 'هر push به main به صورت خودکار یک deploy جدید ایجاد می‌کند.',
  },
  {
    num: 7,
    title: 'لینک Preview را تست کنید',
    description: 'Vercel یک URL مثل https://ai-edu-iran.vercel.app به شما می‌دهد. آن را باز کنید و تست کنید.',
    link: { url: 'https://vercel.com/docs/deployments/preview-deployments', label: 'مستندات Preview Deployments' },
  },
];

const CLOUDFLARE_STEPS: Step[] = [
  {
    num: 1,
    title: 'وارد Cloudflare Pages شوید',
    description: 'با اکانت Cloudflare خود وارد شوید.',
    link: { url: 'https://dash.cloudflare.com/sign-up', label: 'ثبت‌نام / ورود به Cloudflare' },
  },
  {
    num: 2,
    title: 'یک پروژه Pages بسازید',
    description: 'از منوی "Workers & Pages" گزینه "Create application" → "Pages" → "Connect to Git" را انتخاب کنید.',
  },
  {
    num: 3,
    title: 'ریپازیتوری GitHub را متصل کنید',
    description: 'ریپازیتوری پروژه را انتخاب و authorize کنید.',
  },
  {
    num: 4,
    title: 'تنظیمات Build را وارد کنید',
    description: 'این مقادیر را در فرم Build Settings وارد کنید:',
    code: `Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /`,
    codeLabel: 'Build Settings',
  },
  {
    num: 5,
    title: 'Environment Variables را اضافه کنید',
    description: 'در بخش Environment Variables:',
    code: `VITE_API_URL = https://your-backend.com/api/v1
VITE_TELEGRAM_BOT_USERNAME = teachschool_bot
VITE_APP_ENV = production`,
    codeLabel: 'Environment Variables',
  },
  {
    num: 6,
    title: 'Save and Deploy',
    description: 'روی دکمه کلیک کنید. بعد از ۱-۲ دقیقه پروژه آنلاین می‌شود.',
    tip: 'URL نهایی چیزی مثل https://ai-edu-iran.pages.dev خواهد بود.',
  },
  {
    num: 7,
    title: 'تنظیم SPA Routing',
    description: 'برای اینکه routeهای React درست کار کنند، یک فایل _redirects در پوشه public بسازید:',
    code: `/*  /index.html  200`,
    codeLabel: 'public/_redirects',
    warning: 'بدون این فایل، refresh کردن صفحات غیر از / خطای 404 می‌دهد.',
  },
];

const CUSTOM_DOMAIN_STEPS: Step[] = [
  {
    num: 1,
    title: 'دامنه را در Cloudflare ثبت کنید',
    description: 'اگر دامنه دارید (مثلاً yoursite.ir)، Nameserverهای آن را به Cloudflare تغییر دهید.',
    link: { url: 'https://dash.cloudflare.com/?action=add-site', label: 'اضافه کردن سایت به Cloudflare' },
  },
  {
    num: 2,
    title: 'در Vercel دامنه سفارشی اضافه کنید',
    description: 'در Settings → Domains، دامنه خود را وارد کنید (مثلاً app.yoursite.ir).',
  },
  {
    num: 3,
    title: 'رکورد DNS را تأیید کنید',
    description: 'Vercel یک CNAME به شما می‌دهد. آن را در Cloudflare DNS اضافه کنید:',
    code: `Type: CNAME
Name: app (یا subdomain دلخواه)
Target: cname.vercel-dns.com
Proxy status: Proxied (نارنجی)`,
    codeLabel: 'DNS Record',
  },
  {
    num: 4,
    title: 'SSL/TLS را تنظیم کنید',
    description: 'در Cloudflare → SSL/TLS، حالت "Full (strict)" را انتخاب کنید.',
    tip: 'Vercel به صورت خودکار SSL certificate صادر می‌کند.',
  },
  {
    num: 5,
    title: 'Telegram Bot Webhook را تنظیم کنید',
    description: 'بعد از deploy، webhook تلگرام را به URL جدید هدایت کنید.',
    code: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://app.yoursite.ir/api/v1/webhook/telegram`,
    codeLabel: 'Webhook Setup',
    warning: 'Token را در Terminal وارد کنید، نه در کد یا Git.',
  },
];

const TELEGRAM_STEPS: Step[] = [
  {
    num: 1,
    title: 'Web App URL را در BotFather تنظیم کنید',
    description: 'در BotFather، دستور /newapp یا /myapps را بزنید و URL پروژه Vercel/Cloudflare را وارد کنید.',
    code: `/myapps
→ Select your bot
→ Edit Web App URL
→ https://app.yoursite.ir/mini-app/`,
    codeLabel: 'BotFather Commands',
  },
  {
    num: 2,
    title: 'Menu Button را تنظیم کنید',
    description: 'دکمه منوی پایین تلگرام را به Mini App متصل کنید:',
    code: `/setmenubutton
→ Select your bot
→ Enter the URL: https://app.yoursite.ir/mini-app/
→ Button text: ورود به پنل`,
    codeLabel: 'BotFather',
  },
  {
    num: 3,
    title: 'تست کنید',
    description: 'در تلگرام /start را بزنید. باید دکمه Web App ظاهر شود و با کلیک، داشبورد مربوط به نقش کاربر باز شود.',
    tip: 'برای تست، می‌توانید از Telegram Web App Debug Tools استفاده کنید.',
  },
  {
    num: 4,
    title: 'Allowed Domains را تنظیم کنید',
    description: 'در BotFather، دامنه Vercel/Cloudflare را به لیست دامنه‌های مجاز اضافه کنید.',
    warning: 'بدون این تنظیم، تلگرام اجازه باز کردن Web App را نمی‌دهد.',
  },
];

export default function DeployGuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>('vercel');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'vercel', label: 'Vercel', icon: <Rocket size={16} /> },
    { id: 'cloudflare', label: 'Cloudflare Pages', icon: <Cloud size={16} /> },
    { id: 'custom-domain', label: 'دامنه سفارشی', icon: <Globe size={16} /> },
    { id: 'telegram', label: 'اتصال تلگرام', icon: <Link2 size={16} /> },
  ];

  const currentSteps = {
    vercel: VERCEL_STEPS,
    cloudflare: CLOUDFLARE_STEPS,
    'custom-domain': CUSTOM_DOMAIN_STEPS,
    telegram: TELEGRAM_STEPS,
  }[activeTab];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Rocket size={28} />
          راهنمای Deploy و تست پروژه
        </h1>
        <p className="text-blue-100">
          مراحل کامل برای آنلاین کردن پروژه روی Vercel و Cloudflare و اتصال به تلگرام
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Zap size={22} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-emerald-900 mb-2">شروع سریع (۵ دقیقه)</h3>
            <div className="text-sm text-emerald-800 space-y-1">
              <p>۱. کد را روی GitHub push کنید</p>
              <p>۲. وارد Vercel شوید و ریپازیتوری را import کنید</p>
              <p>۳. Deploy را بزنید — تمام!</p>
              <p className="text-xs text-emerald-600 mt-2">
                Vercel به صورت خودکار Vite را تشخیص می‌دهد و build می‌کند.
              </p>
            </div>
          </div>
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
                ? 'bg-gradient-to-l from-indigo-500 to-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {currentSteps.map((step) => (
          <StepCard
            key={`${activeTab}-${step.num}`}
            step={step}
            copiedCode={copiedCode}
            onCopy={copyCode}
          />
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={22} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">نکات مهم امنیتی</h3>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li>هرگز Token یا Secret را در کد، Git، یا Log قرار ندهید</li>
              <li>Environment Variables را فقط از طریق Dashboard پلتفرم وارد کنید</li>
              <li>فایل <code className="bg-amber-100 px-1 rounded">.env</code> باید در <code className="bg-amber-100 px-1 rounded">.gitignore</code> باشد</li>
              <li>برای Production، HTTPS اجباری است (Vercel/Cloudflare خودکار انجام می‌دهند)</li>
              <li>Telegram Bot Token را فقط در Environment Variable سرور نگهداری کنید</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Checklist */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          چک‌لیست تست بعد از Deploy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'صفحه ورود باز می‌شود',
            'هر ۴ نقش قابل ورود هستند',
            'داشبورد مربوط به نقش نمایش داده می‌شود',
            'Sidebar و navigation کار می‌کند',
            'با refresh صفحه، route حفظ می‌شود',
            'روی موبایل درست نمایش داده می‌شود',
            'RTL و فونت فارسی درست است',
            'دکمه خروج کار می‌کند',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
              <input type="checkbox" className="rounded text-emerald-500" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, copiedCode, onCopy }: {
  step: Step;
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const codeId = `step-${step.num}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-start gap-4 text-right hover:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-l from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
          {step.num}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{step.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{step.description}</p>
        </div>
        {expanded ? <ChevronUp size={20} className="text-gray-400 mt-2" /> : <ChevronDown size={20} className="text-gray-400 mt-2" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3">
          {step.code && (
            <div className="relative">
              {step.codeLabel && (
                <div className="text-xs text-gray-500 mb-1 font-mono">{step.codeLabel}</div>
              )}
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-sm overflow-x-auto" dir="ltr">
                <code>{step.code}</code>
              </pre>
              <button
                onClick={() => onCopy(step.code!, codeId)}
                className="absolute top-8 left-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors"
                title="کپی"
              >
                {copiedCode === codeId ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}

          {step.link && (
            <a
              href={step.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <ExternalLink size={14} />
              <span>{step.link.label}</span>
            </a>
          )}

          {step.warning && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
              <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{step.warning}</p>
            </div>
          )}

          {step.tip && (
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">{step.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
