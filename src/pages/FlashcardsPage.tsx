import React, { useState } from 'react';
import { Layers, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Sparkles, CheckCircle2 } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  mastered: boolean;
}

const FLASHCARDS: Flashcard[] = [
  { id: '1', front: 'مشتق تابع f(x) = x³ چیست؟', back: "f'(x) = 3x²", subject: 'ریاضی', mastered: false },
  { id: '2', front: 'قانون اول نیوتن را بیان کنید', back: 'هر جسمی در حالت سکون یا حرکت یکنواخت باقی می‌ماند مگر نیرویی بر آن وارد شود.', subject: 'فیزیک', mastered: true },
  { id: '3', front: 'فرمول مول چیست؟', back: 'n = m/M (تعداد مول = جرم / جرم مولی)', subject: 'شیمی', mastered: false },
  { id: '4', front: 'sin(30°) = ?', back: '1/2', subject: 'ریاضی', mastered: false },
  { id: '5', front: 'تعریف آرایه استعاره', back: 'تشبیهی که یکی از طرفین آن حذف شده باشد.', subject: 'ادبیات', mastered: true },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const cards = FLASHCARDS;
  const current = cards[currentIndex];

  const next = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const masteredCount = cards.filter(c => c.mastered).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Layers size={28} className="text-emerald-500" />
          فلش‌کارت
        </h1>
        <span className="text-sm text-gray-500">{currentIndex + 1} از {cards.length}</span>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">تسلط</span>
          <span className="text-sm font-medium text-emerald-600">{masteredCount} از {cards.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-emerald-500 to-teal-500 rounded-full"
            style={{ width: `${(masteredCount / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-white rounded-2xl border-2 border-gray-200 p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer
                   hover:border-emerald-300 transition-colors"
      >
        <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full mb-4">{current.subject}</span>
        {!isFlipped ? (
          <p className="text-xl font-bold text-gray-900 text-center">{current.front}</p>
        ) : (
          <p className="text-lg text-emerald-700 text-center leading-relaxed">{current.back}</p>
        )}
        <p className="text-xs text-gray-400 mt-6">برای دیدن پاسخ کلیک کنید</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={prev} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-14 h-14 bg-gradient-to-l from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <RotateCcw size={22} />
        </button>
        <button onClick={next} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
          <CheckCircle2 size={16} />
          <span>تسلط دارم</span>
        </button>
        <button className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors">
          <Shuffle size={16} />
          <span>ترکیب تصادفی</span>
        </button>
        <button className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-100 transition-colors">
          <Sparkles size={16} />
          <span>ساخت با AI</span>
        </button>
      </div>
    </div>
  );
}


