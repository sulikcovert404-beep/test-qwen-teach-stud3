import React from 'react';
import { FileText, Clock, CheckCircle2, AlertCircle, Calendar, ChevronLeft } from 'lucide-react';

interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  status: 'active' | 'submitted' | 'overdue' | 'graded';
  dueDate: string;
  description: string;
}

const ASSIGNMENTS: AssignmentItem[] = [
  {
    id: '1',
    title: 'تمرین‌های فصل ۳ - تابع و مشتق',
    subject: 'ریاضی',
    teacher: 'مریم احمدی',
    status: 'active',
    dueDate: '۱۴ بهمن ۱۴۰۳',
    description: 'حل تمرین‌های ۱ تا ۱۰ صفحه ۷۸ کتاب درسی',
  },
  {
    id: '2',
    title: 'گزارش آزمایش حرکت پرتابه',
    subject: 'فیزیک',
    teacher: 'حسن نوری',
    status: 'active',
    dueDate: '۱۶ بهمن ۱۴۰۳',
    description: 'نوشتن گزارش کامل آزمایش شامل داده‌ها، نمودار و نتیجه‌گیری',
  },
  {
    id: '3',
    title: 'تحلیل شعر حافظ',
    subject: 'ادبیات فارسی',
    teacher: 'زهرا صادقی',
    status: 'overdue',
    dueDate: '۱۰ بهمن ۱۴۰۳',
    description: 'تحلیل غزل ۱۲ حافظ شامل آرایه‌ها و مفاهیم',
  },
  {
    id: '4',
    title: 'تمرین‌های شیمی آلی',
    subject: 'شیمی',
    teacher: 'رضا کریمی',
    status: 'submitted',
    dueDate: '۸ بهمن ۱۴۰۳',
    description: 'نام‌گذاری و رسم ساختار ۱۵ ترکیب آلی',
  },
  {
    id: '5',
    title: 'ترجمه متن انگلیسی',
    subject: 'زبان انگلیسی',
    teacher: 'سارا محمدی',
    status: 'graded',
    dueDate: '۵ بهمن ۱۴۰۳',
    description: 'ترجمه متن صفحه ۴۵ کتاب و پاسخ به سؤالات درک مطلب',
  },
];

export default function AssignmentsPage() {
  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    active: { label: 'فعال', color: 'bg-blue-100 text-blue-700', icon: <Clock size={14} /> },
    submitted: { label: 'ارسال شده', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={14} /> },
    overdue: { label: 'مهلت گذشته', color: 'bg-red-100 text-red-700', icon: <AlertCircle size={14} /> },
    graded: { label: 'نمره داده شده', color: 'bg-purple-100 text-purple-700', icon: <FileText size={14} /> },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FileText size={28} className="text-blue-500" />
          تکالیف
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>۱۲ بهمن ۱۴۰۳</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">۲</p>
          <p className="text-xs text-blue-600 mt-1">فعال</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">۱</p>
          <p className="text-xs text-emerald-600 mt-1">ارسال شده</p>
        </div>
        <div className="bg-red-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-red-600">۱</p>
          <p className="text-xs text-red-600 mt-1">مهلت گذشته</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">۱</p>
          <p className="text-xs text-purple-600 mt-1">نمره‌دار</p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-3">
        {ASSIGNMENTS.map((assignment) => {
          const config = statusConfig[assignment.status];
          return (
            <div
              key={assignment.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {assignment.subject}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${config.color}`}>
                      {config.icon}
                      {config.label}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{assignment.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>معلم: {assignment.teacher}</span>
                    <span>مهلت: {assignment.dueDate}</span>
                  </div>
                </div>
                {assignment.status === 'active' && (
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <span>شروع</span>
                    <ChevronLeft size={16} />
                  </button>
                )}
                {assignment.status === 'graded' && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">۱۸.۵</p>
                    <p className="text-xs text-gray-400">از ۲۰</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
