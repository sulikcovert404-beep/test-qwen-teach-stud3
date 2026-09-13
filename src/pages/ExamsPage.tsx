import React from 'react';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Trophy, Calendar } from 'lucide-react';

interface ExamItem {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: number;
  status: 'upcoming' | 'in_progress' | 'completed';
  date: string;
  score?: number;
  maxScore: number;
  difficulty: string;
}

const EXAMS: ExamItem[] = [
  {
    id: '1',
    title: 'آزمون میان‌ترم ریاضی',
    subject: 'ریاضی',
    questions: 20,
    duration: 60,
    status: 'upcoming',
    date: '۱۵ بهمن ۱۴۰۳',
    maxScore: 20,
    difficulty: 'متوسط',
  },
  {
    id: '2',
    title: 'آزمون فصل ۲ فیزیک',
    subject: 'فیزیک',
    questions: 15,
    duration: 45,
    status: 'completed',
    date: '۸ بهمن ۱۴۰۳',
    score: 17.5,
    maxScore: 20,
    difficulty: 'سخت',
  },
  {
    id: '3',
    title: 'کوییز شیمی - پیوندها',
    subject: 'شیمی',
    questions: 10,
    duration: 20,
    status: 'completed',
    date: '۵ بهمن ۱۴۰۳',
    score: 8,
    maxScore: 10,
    difficulty: 'آسان',
  },
  {
    id: '4',
    title: 'آزمون ادبیات - آرایه‌ها',
    subject: 'ادبیات فارسی',
    questions: 25,
    duration: 40,
    status: 'completed',
    date: '۱ بهمن ۱۴۰۳',
    score: 16,
    maxScore: 20,
    difficulty: 'متوسط',
  },
];

export default function ExamsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <ClipboardList size={28} className="text-amber-500" />
          آزمون‌ها
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>۱۲ بهمن ۱۴۰۳</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">۱</p>
          <p className="text-xs text-amber-600 mt-1">پیش رو</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">۳</p>
          <p className="text-xs text-emerald-600 mt-1">انجام شده</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">۱۷.۲</p>
          <p className="text-xs text-blue-600 mt-1">میانگین نمره</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">۸۶٪</p>
          <p className="text-xs text-purple-600 mt-1">درصد موفقیت</p>
        </div>
      </div>

      {/* Upcoming Exam */}
      {EXAMS.filter(e => e.status === 'upcoming').length > 0 && (
        <div className="bg-gradient-to-l from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} />
            <span className="text-sm font-medium opacity-90">آزمون پیش رو</span>
          </div>
          <h3 className="text-xl font-bold mb-2">آزمون میان‌ترم ریاضی</h3>
          <div className="flex items-center gap-4 text-sm opacity-90 mb-4">
            <span>۲۰ سؤال</span>
            <span>۶۰ دقیقه</span>
            <span>سطح: متوسط</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">۱۵ بهمن ۱۴۰۳</span>
            <button className="bg-white text-amber-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">
              شروع آزمون
            </button>
          </div>
        </div>
      )}

      {/* Completed Exams */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">آزمون‌های انجام شده</h2>
        <div className="space-y-3">
          {EXAMS.filter(e => e.status === 'completed').map((exam) => (
            <div key={exam.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{exam.subject}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      انجام شده
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{exam.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{exam.questions} سؤال</span>
                    <span>{exam.duration} دقیقه</span>
                    <span>سطح: {exam.difficulty}</span>
                    <span>{exam.date}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <Trophy size={16} className="text-amber-500" />
                    <p className="text-xl font-bold text-gray-900">{exam.score}</p>
                  </div>
                  <p className="text-xs text-gray-400">از {exam.maxScore}</p>
                  <div className="mt-1">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${((exam.score || 0) / exam.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
