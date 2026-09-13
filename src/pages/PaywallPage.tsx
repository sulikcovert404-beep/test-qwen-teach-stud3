import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PLAN_MARKETING_NAMES } from '../types';
import {
  Check, X, Crown, Zap, Building2, Sparkles,
  ArrowLeft, Shield, Brain, FileText, BarChart3
} from 'lucide-react';

interface Plan {
  code: string;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  popular?: boolean;
  features: { name: string; included: boolean }[];
}

const PLANS: Plan[] = [
  {
    code: 'STUDENT_FREE',
    name: 'رایگان',
    price: '۰',
    period: 'برای همیشه',
    description: 'شروع یادگیری با امکانات پایه',
    icon: <Zap size={24} />,
    gradient: 'from-gray-500 to-slate-500',
    features: [
      { name: 'دستیار هوشمند (۵ سؤال روزانه)', included: true },
      { name: 'مشاهده تکالیف و آزمون‌ها', included: true },
      { name: 'فلش‌کارت (۱۰ کارت)', included: true },
      { name: 'برنامه مطالعه پایه', included: true },
      { name: 'تولید سؤال نامحدود', included: false },
      { name: 'تحلیل پیشرفته', included: false },
      { name: 'Podcast و PDF', included: false },
      { name: 'پشتیبانی اختصاصی', included: false },
    ],
  },
  {
    code: 'STUDENT_PRO',
    name: 'دانش‌آموز پلاس',
    price: '۴۹,۰۰۰',
    period: 'تومان / ماه',
    description: 'یادگیری کامل با تمام امکانات AI',
    icon: <Sparkles size={24} />,
    gradient: 'from-blue-500 to-indigo-500',
    popular: true,
    features: [
      { name: 'دستیار هوشمند نامحدود', included: true },
      { name: 'مشاهده تکالیف و آزمون‌ها', included: true },
      { name: 'فلش‌کارت نامحدود', included: true },
      { name: 'برنامه مطالعه هوشمند', included: true },
      { name: 'تولید سؤال نامحدود', included: true },
      { name: 'تحلیل پیشرفته یادگیری', included: true },
      { name: 'Podcast و PDF', included: true },
      { name: 'پشتیبانی اختصاصی', included: false },
    ],
  },
  {
    code: 'SCHOOL_FREE',
    name: 'مدرسه',
    price: '۴۹۰,۰۰۰',
    period: 'تومان / ماه',
    description: 'برای مدارس و مؤسسات آموزشی',
    icon: <Building2 size={24} />,
    gradient: 'from-purple-500 to-violet-500',
    features: [
      { name: 'همه امکانات دانش‌آموز پلاس', included: true },
      { name: 'داشبورد معلم', included: true },
      { name: 'داشبورد مدیر مدرسه', included: true },
      { name: 'آزمون‌ساز هوشمند', included: true },
      { name: 'تحلیل کلاس و مدرسه', included: true },
      { name: 'مدیریت دانش‌آموزان', included: true },
      { name: 'گزارش‌های سفارشی', included: true },
      { name: 'پشتیبانی اختصاصی', included: true },
    ],
  },
];

export default function PaywallPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-l from-amber-400 to-orange-500 rounded-2xl mb-4">
          <Crown size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">طرح خود را ارتقا دهید</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          با ارتقا به طرح حرفه‌ای، به تمام امکانات هوش مصنوعی و ابزارهای پیشرفته دسترسی پیدا کنید.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
          <span>طرح فعلی شما:</span>
          <span className="font-bold">{PLAN_MARKETING_NAMES[user.plan]}</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.code}
            className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${
              plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            } ${user.plan === plan.code ? 'opacity-75' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-l from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                محبوب‌ترین
              </div>
            )}

            {user.plan === plan.code && (
              <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                طرح فعلی
              </div>
            )}

            <div className={`w-14 h-14 rounded-xl bg-gradient-to-l ${plan.gradient} flex items-center justify-center text-white mb-4`}>
              {plan.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">{plan.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-sm text-gray-500 mr-1">{plan.period}</span>
            </div>

            <button
              disabled={user.plan === plan.code}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                user.plan === plan.code
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-gradient-to-l from-blue-500 to-indigo-500 text-white hover:opacity-90'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {user.plan === plan.code ? 'طرح فعلی شما' : 'انتخاب این طرح'}
            </button>

            <div className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  {feature.included ? (
                    <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X size={16} className="text-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-l from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield size={24} />
          چرا طرح حرفه‌ای؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Benefit icon={<Brain size={20} />} title="هوش مصنوعی نامحدود" desc="دستیار هوشمند، تولید سؤال، خلاصه‌سازی" />
          <Benefit icon={<BarChart3 size={20} />} title="تحلیل پیشرفته" desc="گزارش دقیق پیشرفت و نقاط ضعف" />
          <Benefit icon={<FileText size={20} />} title="خروجی‌های حرفه‌ای" desc="PDF، Podcast، فلش‌کارت نامحدود" />
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">سؤالات متداول</h2>
        <div className="space-y-4">
          <FAQItem
            q="آیا می‌توانم هر زمان لغو کنم؟"
            a="بله، هر زمان می‌توانید اشتراک خود را لغو کنید. دسترسی تا پایان دوره فعلی باقی می‌ماند."
          />
          <FAQItem
            q="آیا داده‌های من حفظ می‌شود؟"
            a="بله، تمام پیشرفت، تکالیف و نتایج شما حفظ می‌شود حتی اگر طرح را تغییر دهید."
          />
          <FAQItem
            q="روش‌های پرداخت چیست؟"
            a="در حال حاضر از درگاه‌های بانکی ایرانی پشتیبانی می‌کنیم. به زودی روش‌های بیشتری اضافه می‌شود."
          />
        </div>
      </div>
    </div>
  );
}

function Benefit({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <div className="mb-2">{icon}</div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-sm text-emerald-100">{desc}</p>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group">
      <summary className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
        <span className="font-medium text-gray-900">{q}</span>
        <ArrowLeft size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
      </summary>
      <p className="px-3 pb-3 text-sm text-gray-600">{a}</p>
    </details>
  );
}
