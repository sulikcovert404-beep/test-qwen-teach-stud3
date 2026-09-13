import React from 'react';
import { BarChart3, TrendingUp, Target, Award, BookOpen, Brain, Calendar } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <BarChart3 size={28} className="text-cyan-500" />
          پیشرفت من
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>بهمن ۱۴۰۳</span>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <BookOpen size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">۸۵٪</p>
          <p className="text-sm text-gray-500 mt-1">تکمیل تکالیف</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <TrendingUp size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">۱۷.۲</p>
          <p className="text-sm text-gray-500 mt-1">میانگین نمرات</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Award size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">۱۲</p>
          <p className="text-sm text-gray-500 mt-1">روز متوالی</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Brain size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">۴۸</p>
          <p className="text-sm text-gray-500 mt-1">ساعت مطالعه</p>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target size={20} className="text-blue-500" />
          عملکرد درسی
        </h2>
        <div className="space-y-4">
          <SubjectProgress name="ریاضی" score={85} trend="up" color="bg-blue-500" />
          <SubjectProgress name="فیزیک" score={78} trend="up" color="bg-emerald-500" />
          <SubjectProgress name="شیمی" score={72} trend="stable" color="bg-amber-500" />
          <SubjectProgress name="ادبیات فارسی" score={88} trend="up" color="bg-purple-500" />
          <SubjectProgress name="زبان انگلیسی" score={65} trend="down" color="bg-rose-500" />
          <SubjectProgress name="زیست‌شناسی" score={82} trend="up" color="bg-teal-500" />
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-500" />
            نقاط قوت
          </h3>
          <div className="space-y-2">
            <StrengthItem text="حل مسائل تابع و مشتق" />
            <StrengthItem text="درک مفاهیم فیزیک مدرن" />
            <StrengthItem text="آرایه‌های ادبی" />
            <StrengthItem text="پیوندهای شیمیایی" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={18} className="text-amber-500" />
            نیاز به تمرین بیشتر
          </h3>
          <div className="space-y-2">
            <WeaknessItem text="گرامر زبان انگلیسی" />
            <WeaknessItem text="مسائل ترمودینامیک" />
            <WeaknessItem text="استوکیومتری" />
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">فعالیت هفتگی</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((day, i) => {
            const heights = [60, 80, 45, 90, 70, 55, 30];
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end" style={{ height: '120px' }}>
                  <div
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${heights[i]}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-sm text-blue-700">
          💡 این آمار بر اساس فعالیت واقعی شما ساخته می‌شود. هرچه بیشتر تمرین کنید، تحلیل دقیق‌تری دریافت خواهید کرد.
        </p>
      </div>
    </div>
  );
}

function SubjectProgress({ name, score, trend, color }: {
  name: string; score: number; trend: string; color: string;
}) {
  const trendIcons: Record<string, string> = {
    up: '📈',
    down: '📉',
    stable: '➡️',
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700 w-28">{name}</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-medium text-gray-900 w-10">{score}٪</span>
      <span className="text-sm">{trendIcons[trend]}</span>
    </div>
  );
}

function StrengthItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50">
      <div className="w-2 h-2 rounded-full bg-emerald-500" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

function WeaknessItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50">
      <div className="w-2 h-2 rounded-full bg-amber-500" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}
