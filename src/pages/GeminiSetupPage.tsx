import React from 'react';
import {
  Sparkles, CheckCircle2, AlertCircle, Code, Key, Copy,
  ExternalLink, DollarSign, Shield, Zap, BookOpen
} from 'lucide-react';

export default function GeminiSetupPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const geminiServiceCode = `import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const geminiApi = {
  async chat(message: string, context: string = 'general'): Promise<string> {
    if (!genAI) {
      return 'API Key تنظیم نشده است.';
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const systemPrompts: Record<string, string> = {
        tutor: 'تو یک دستیار آموزشی هوشمند هستی.',
        teacher: 'تو یک دستیار معلم هستی.',
        summarizer: 'متن‌های طولانی را خلاصه کن.',
      };

      const chat = model.startChat({
        history: [{
          role: 'user',
          parts: [{ text: systemPrompts[context] || systemPrompts.tutor }],
        }],
      });

      const result = await chat.sendMessage(message);
      return (await result.response).text();
    } catch (error) {
      return 'خطا در ارتباط با AI.';
    }
  },

  async generateQuestions(topic: string, count: number): Promise<any[]> {
    if (!genAI) return [];
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = \`\${count} سؤال آموزشی درباره "\${topic}" تولید کن.\`;
    
    const result = await model.generateContent(prompt);
    const text = (await result.response).text();
    const jsonMatch = text.match(/\\[[\\s\\S]*\\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  },
};`;

  const envCode = `# .env.local
VITE_GEMINI_API_KEY=your_gemini_api_key_here`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-l from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Sparkles size={28} />
          اتصال Gemini API
        </h1>
        <p className="text-amber-100">
          راهنمای کامل اتصال Google Gemini AI به پلتفرم
        </p>
      </div>

      {/* Status */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={22} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">وضعیت فعلی</h3>
            <p className="text-sm text-amber-800">
              در حال حاضر AI از <strong>Mock API</strong> استفاده می‌کند (پاسخ‌های از پیش نوشته شده).
              برای اتصال به Gemini واقعی، مراحل زیر را دنبال کنید.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {/* Step 1 */}
        <StepCard num={1} title="دریافت API Key">
          <p className="text-sm text-gray-600 mb-3">
            وارد Google AI Studio شوید و یک API Key جدید بسازید:
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink size={16} />
            <span>Google AI Studio — دریافت API Key</span>
          </a>
        </StepCard>

        {/* Step 2 */}
        <StepCard num={2} title="نصب کتابخانه">
          <CodeBlock
            code="npm install @google/generative-ai"
            id="install"
            copiedCode={copiedCode}
            onCopy={copyCode}
          />
        </StepCard>

        {/* Step 3 */}
        <StepCard num={3} title="ساخت فایل Gemini Service">
          <p className="text-sm text-gray-600 mb-3">
            فایل <code className="bg-gray-100 px-1 rounded">src/backend/gemini.ts</code> را بسازید:
          </p>
          <CodeBlock
            code={geminiServiceCode}
            id="service"
            copiedCode={copiedCode}
            onCopy={copyCode}
          />
        </StepCard>

        {/* Step 4 */}
        <StepCard num={4} title="تنظیم Environment Variable">
          <p className="text-sm text-gray-600 mb-3">
            فایل <code className="bg-gray-100 px-1 rounded">.env.local</code> بسازید:
          </p>
          <CodeBlock
            code={envCode}
            id="env"
            copiedCode={copiedCode}
            onCopy={copyCode}
          />
          <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-sm text-red-700 flex items-start gap-2">
              <Shield size={16} className="mt-0.5 flex-shrink-0" />
              <span><strong>مهم:</strong> فایل <code>.env.local</code> را در <code>.gitignore</code> قرار دهید!</span>
            </p>
          </div>
        </StepCard>

        {/* Step 5 */}
        <StepCard num={5} title="تنظیم در Vercel/Cloudflare">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-2">Vercel</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Settings → Environment Variables</li>
                <li>اضافه کردن <code className="bg-gray-200 px-1 rounded text-xs">VITE_GEMINI_API_KEY</code></li>
                <li>Redeploy</li>
              </ol>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-2">Cloudflare</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Settings → Environment Variables</li>
                <li>اضافه کردن <code className="bg-gray-200 px-1 rounded text-xs">VITE_GEMINI_API_KEY</code></li>
                <li>Redeploy</li>
              </ol>
            </div>
          </div>
        </StepCard>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={20} className="text-emerald-500" />
          هزینه Gemini API
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4">
            <h3 className="font-bold text-emerald-900 mb-2">🆓 Free Tier</h3>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>• ۶۰ درخواست در دقیقه</li>
              <li>• ۱,۵۰۰ درخواست در روز</li>
              <li>• مناسب برای تست</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-2">💰 Paid Tier</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• $0.00025 / 1K tokens (input)</li>
              <li>• $0.0005 / 1K tokens (output)</li>
              <li>• ~$5-10/ماه برای ۱۰۰ کاربر</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield size={20} className="text-red-500" />
          نکات امنیتی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SecurityItem type="bad" text="API Key را در کد hardcode نکنید" />
          <SecurityItem type="bad" text="API Key را در Git commit نکنید" />
          <SecurityItem type="bad" text="API Key را در console.log نمایش ندهید" />
          <SecurityItem type="good" text="از Environment Variables استفاده کنید" />
          <SecurityItem type="good" text="فایل .env را در .gitignore بگذارید" />
          <SecurityItem type="good" text="Rate limiting تنظیم کنید" />
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gradient-to-l from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          منابع مفید
        </h2>
        <div className="space-y-2">
          <ResourceLink url="https://aistudio.google.com/" label="Google AI Studio" />
          <ResourceLink url="https://ai.google.dev/docs" label="مستندات Gemini API" />
          <ResourceLink url="https://www.npmjs.com/package/@google/generative-ai" label="کتابخانه NPM" />
          <ResourceLink url="https://ai.google.dev/pricing" label="قیمت‌گذاری Gemini" />
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-600" />
          چک‌لیست نهایی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'API Key از Google AI Studio دریافت شده',
            'کتابخانه @google/generative-ai نصب شده',
            'فایل src/backend/gemini.ts ساخته شده',
            'Environment Variable تنظیم شده',
            'در .gitignore اضافه شده',
            'در Vercel/Cloudflare تنظیم شده',
            'تست شده و کار می‌کند',
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

function StepCard({ num, title, children }: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-l from-amber-500 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
          {num}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ code, id, copiedCode, onCopy }: {
  code: string;
  id: string;
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
}) {
  return (
    <div className="relative">
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto" dir="ltr">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => onCopy(code, id)}
        className="absolute top-2 left-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors"
      >
        {copiedCode === id ? <CheckCircle2 size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function SecurityItem({ type, text }: { type: 'good' | 'bad'; text: string }) {
  return (
    <div className={`flex items-start gap-2 p-2 rounded-lg ${
      type === 'good' ? 'bg-emerald-50' : 'bg-red-50'
    }`}>
      {type === 'good' ? (
        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
      ) : (
        <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
      )}
      <span className={`text-sm ${type === 'good' ? 'text-emerald-800' : 'text-red-800'}`}>
        {text}
      </span>
    </div>
  );
}

function ResourceLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
    >
      <ExternalLink size={14} />
      <span>{label}</span>
    </a>
  );
}
