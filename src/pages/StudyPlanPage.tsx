import React from 'react';
import { Calendar, Clock, Target, BookOpen, CheckCircle2, Sparkles, Brain } from 'lucide-react';

interface StudyBlock {
  time: string;
  subject: string;
  topic: string;
  duration: string;
  type: 'study' | 'review' | 'practice' | 'exam';
  completed: boolean;
}

const TODAY_PLAN: StudyBlock[] = [
  { time: '۰۸:۰۰', subject: 'ریاضی', topic: 'تمرین مشتق', duration: '۴۵ دقیقه', type: 'practice', completed: true },
  { time: '۰۹:۰۰', subject: 'فیزیک', topic: 'مرور فصل ۲', duration: '۳۰ دقیقه', type: 'review', completed: true },
  { time: '۱۰:۰۰', subject: 'شیمی', topic: 'استوکیومتری', duration: '۶۰ دقیقه', type: 'study', completed: false },
  { time: '۱۱:۳۰', subject: 'ادبیات', topic: 'حفظ شعر', duration: '۲۰ دقیقه', type: 'study', completed: false },
  { time: '۱۴:۰۰', subject: 'ریاضی', topic: 'فلش‌کارت', duration: '۱۵ دقیقه', type: 'review', completed: false },
  { time: '۱۶:۰۰', subject: 'فیزیک', topic: 'حل مسئله', duration: '۴۵ دقیقه', type: 'practice', completed: false },
];

const WEEKLY_OVERVIEW = [
  { day: 'شنبه', subjects: 4, hours: 3.5, completed: 4 },
  { day: 'یکشنبه', subjects: 3, hours: 2.5, completed: 3 },
  { day: 'دوشنبه', subjects: 5, hours: 4.0, completed: 2 },
  { day: 'سه‌شنبه', subjects: 3, hours: 2.0, completed: 0 },
  { day: 'چهارشنبه', subjects: 4, hours: 3.0, completed: 0 },
  { day: 'پنجشنبه', subjects: 2, hours: 1.5, completed: 0 },
  { day: 'جمعه', subjects: 1, hours: 1.0, completed: 0 },
];

export default function StudyPlanPage() {
  const completedCount = TODAY_PLAN.filter(b => b.completed).length;
  const progress = (completedCount / TODAY_PLAN.length) * 100;

  const typeConfig: Record<string, { label: string; color: string }> = {
    study: { label: 'مطالعه', color: 'bg-blue-100 text-blue-700' },
    review: { label: 'مرور', color: 'bg-emerald-100 text-emerald-700' },
    practice: { label: 'تمرین', color: 'bg-amber-100 text-amber-700' },
    exam: { label: 'آزمون', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Calendar size={28} className="text-pink-500" />
          برنامه مطالعه
        </h1>
        <button className="flex items-center gap-2 bg-gradient-to-l from-violet-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Sparkles size={16} />
          <span>بازتولید با AI</span>
        </button>
      </div>

      {/* Today's Progress */}
      <div className="bg-gradient-to-l from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">برنامه امروز</h2>
            <p className="text-pink-100 text-sm mt-1">{completedCount} از {TODAY_PLAN.length} تکمیل شده</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{Math.round(progress)}٪</p>
          </div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-pink-500" />
          زمان‌بندی امروز
        </h2>
        <div className="space-y-3">
          {TODAY_PLAN.map((block, i) => {
            const config = typeConfig[block.type];
            return (
              <div
                key={i}
                className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                  block.completed ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-mono text-gray-500 w-12">{block.time}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  block.completed ? 'bg-emerald-100' : 'bg-gray-100'
                }`}>
                  {block.completed ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${block.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {block.subject} — {block.topic}
                  </p>
                  <p className="text-xs text-gray-400">{block.duration}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target size={20} className="text-blue-500" />
          نمای هفتگی
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {WEEKLY_OVERVIEW.map((day, i) => (
            <div key={day.day} className="text-center">
              <p className="text-xs text-gray-500 mb-2">{day.day}</p>
              <div className="relative h-24 bg-gray-50 rounded-lg overflow-hidden">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-pink-500 to-rose-400 rounded-t transition-all duration-500"
                  style={{ height: `${(day.hours / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs font-medium text-gray-700 mt-1">{day.hours}h</p>
              <p className="text-xs text-gray-400">{day.completed}/{day.subjects}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 flex items-start gap-3">
        <Brain size={20} className="text-violet-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-violet-800">پیشنهاد هوشمند</p>
          <p className="text-sm text-violet-700 mt-1">
            بر اساس عملکرد اخیر، پیشنهاد می‌شود فردا ۳۰ دقیقه بیشتر روی استوکیومتری تمرکز کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
