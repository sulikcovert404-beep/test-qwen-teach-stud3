import React, { useState } from 'react';
import { Sparkles, FileText, Settings, Plus, Wand2, Loader2, CheckCircle2 } from 'lucide-react';

interface GeneratedQuestion {
  id: string;
  type: string;
  question: string;
  options?: string[];
  answer: string;
  difficulty: string;
}

export default function ExamBuilder() {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedQuestion[] | null>(null);

  const handleGenerate = () => {
    if (!topic || !subject) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGenerated([
        {
          id: '1',
          type: 'چهارگزینه‌ای',
          question: `کدام گزینه درباره ${topic} صحیح است؟`,
          options: ['گزینه الف - تعریف صحیح', 'گزینه ب - تعریف ناقص', 'گزینه ج - تعریف نادرست', 'گزینه د - بی‌ارتباط'],
          answer: 'گزینه الف',
          difficulty: 'متوسط',
        },
        {
          id: '2',
          type: 'تشریحی',
          question: `${topic} را با ذکر مثال توضیح دهید.`,
          answer: 'پاسخ نمونه شامل تعریف، مثال و کاربرد...',
          difficulty: 'سخت',
        },
        {
          id: '3',
          type: 'صحیح/غلط',
          question: `عبارت «${topic} همواره مثبت است» صحیح است یا غلط؟`,
          answer: 'غلط - در شرایط خاصی منفی نیز می‌شود.',
          difficulty: 'آسان',
        },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles size={28} className="text-violet-500" />
          آزمون‌ساز هوشمند
        </h1>
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Wand2 size={20} className="text-violet-500" />
          تنظیمات تولید
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">موضوع / فصل</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="مثلاً: تابع و مشتق"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">درس</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            >
              <option value="">انتخاب درس</option>
              <option value="math">ریاضی</option>
              <option value="physics">فیزیک</option>
              <option value="chemistry">شیمی</option>
              <option value="literature">ادبیات فارسی</option>
              <option value="biology">زیست‌شناسی</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تعداد سؤالات</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            >
              <option value="5">۵ سؤال</option>
              <option value="10">۱۰ سؤال</option>
              <option value="15">۱۵ سؤال</option>
              <option value="20">۲۰ سؤال</option>
              <option value="30">۳۰ سؤال</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">سطح دشواری</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
            >
              <option value="easy">آسان</option>
              <option value="medium">متوسط</option>
              <option value="hard">سخت</option>
              <option value="adaptive">تطبیقی</option>
            </select>
          </div>
        </div>

        {/* Question Types */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">انواع سؤال</label>
          <div className="flex flex-wrap gap-2">
            {['چهارگزینه‌ای', 'صحیح/غلط', 'تشریحی', 'جای خالی', 'مفهومی'].map((type) => (
              <label key={type} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" defaultChecked className="rounded text-violet-500" />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic || !subject || isGenerating}
          className="flex items-center gap-2 bg-gradient-to-l from-violet-500 to-purple-500 text-white px-6 py-3 rounded-xl
                     font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>در حال تولید...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>تولید آزمون</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Questions */}
      {generated && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              سؤالات تولید شده
            </h2>
            <span className="text-sm text-gray-500">{generated.length} سؤال</span>
          </div>
          <div className="space-y-4">
            {generated.map((q, i) => (
              <div key={q.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded">سؤال {i + 1}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{q.type}</span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{q.difficulty}</span>
                </div>
                <p className="text-sm text-gray-800 font-medium mb-2">{q.question}</p>
                {q.options && (
                  <div className="space-y-1 mb-2">
                    {q.options.map((opt, j) => (
                      <p key={j} className="text-sm text-gray-600 pr-4">
                        {String.fromCharCode(1575 + j)}) {opt}
                      </p>
                    ))}
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-emerald-600">
                    <span className="font-medium">پاسخ: </span>{q.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors">
              <FileText size={16} />
              <span>ذخیره آزمون</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
              <Plus size={16} />
              <span>افزودن به تکلیف</span>
            </button>
          </div>
        </div>
      )}

      {/* Usage Info */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-sm text-violet-700">
          ⚡ هر بار تولید آزمون از سهمیه AI شما کسر می‌شود. سهمیه امروز: ۷ از ۱۰ باقیمانده.
        </p>
      </div>
    </div>
  );
}
