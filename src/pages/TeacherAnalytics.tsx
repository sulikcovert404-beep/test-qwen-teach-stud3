import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, Award, Target, AlertCircle } from 'lucide-react';

interface StudentPerformance {
  id: string;
  name: string;
  avgScore: number;
  trend: 'up' | 'down' | 'stable';
  assignments: number;
  exams: number;
  risk: 'low' | 'medium' | 'high';
}

const STUDENTS: StudentPerformance[] = [
  { id: '1', name: 'علی محمدی', avgScore: 18.5, trend: 'up', assignments: 12, exams: 4, risk: 'low' },
  { id: '2', name: 'فاطمه رضایی', avgScore: 17.2, trend: 'up', assignments: 11, exams: 4, risk: 'low' },
  { id: '3', name: 'محمد حسینی', avgScore: 15.8, trend: 'stable', assignments: 10, exams: 3, risk: 'medium' },
  { id: '4', name: 'زهرا کریمی', avgScore: 14.2, trend: 'down', assignments: 8, exams: 3, risk: 'high' },
  { id: '5', name: 'امیر صادقی', avgScore: 16.5, trend: 'up', assignments: 11, exams: 4, risk: 'low' },
  { id: '6', name: 'مریم احمدی', avgScore: 13.0, trend: 'down', assignments: 7, exams: 2, risk: 'high' },
  { id: '7', name: 'حسین نوری', avgScore: 17.8, trend: 'stable', assignments: 12, exams: 4, risk: 'low' },
  { id: '8', name: 'سارا عباسی', avgScore: 15.2, trend: 'up', assignments: 9, exams: 3, risk: 'medium' },
];

export default function TeacherAnalytics() {
  const avgClass = STUDENTS.reduce((s, st) => s + st.avgScore, 0) / STUDENTS.length;
  const atRisk = STUDENTS.filter(s => s.risk === 'high').length;
  const improving = STUDENTS.filter(s => s.trend === 'up').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <BarChart3 size={28} className="text-blue-500" />
          تحلیل کلاس
        </h1>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm">
          <option>ریاضی دهم - الف</option>
          <option>ریاضی یازدهم - ب</option>
          <option>حسابان دوازدهم</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users size={20} />} label="دانش‌آموزان" value={STUDENTS.length.toString()} color="bg-blue-50 text-blue-600" />
        <StatCard icon={<Award size={20} />} label="میانگین کلاس" value={avgClass.toFixed(1)} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={<TrendingUp size={20} />} label="در حال پیشرفت" value={improving.toString()} color="bg-purple-50 text-purple-600" />
        <StatCard icon={<AlertCircle size={20} />} label="در معرض خطر" value={atRisk.toString()} color="bg-red-50 text-red-600" />
      </div>

      {/* Topic Mastery */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target size={20} className="text-blue-500" />
          تسلط موضوعی کلاس
        </h2>
        <div className="space-y-3">
          <TopicBar label="تابع و مشتق" mastery={82} />
          <TopicBar label="مثلثات" mastery={68} />
          <TopicBar label="حد و پیوستگی" mastery={55} />
          <TopicBar label="آمار و احتمال" mastery={74} />
          <TopicBar label="ماتریس" mastery={45} />
        </div>
      </div>

      {/* Students Performance */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">عملکرد دانش‌آموزان</h2>
        <div className="space-y-2">
          {STUDENTS.map((student) => (
            <div key={student.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-l from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{student.name}</p>
                <p className="text-xs text-gray-500">{student.assignments} تکلیف • {student.exams} آزمون</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{student.avgScore}</p>
                <p className="text-xs text-gray-400">از ۲۰</p>
              </div>
              <div className="flex items-center gap-1">
                {student.trend === 'up' && <TrendingUp size={16} className="text-emerald-500" />}
                {student.trend === 'down' && <TrendingDown size={16} className="text-red-500" />}
                {student.trend === 'stable' && <span className="text-gray-400 text-xs">→</span>}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                student.risk === 'low' ? 'bg-emerald-100 text-emerald-700' :
                student.risk === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {student.risk === 'low' ? 'خوب' : student.risk === 'medium' ? 'متوسط' : 'خطر'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-l from-violet-500 to-purple-500 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          🧠 تحلیل هوشمند
        </h2>
        <div className="space-y-2 text-sm text-violet-100">
          <p>• ۳ دانش‌آموز در موضوع «ماتریس» نیاز به توجه ویژه دارند.</p>
          <p>• میانگین کلاس نسبت به هفته گذشته ۰.۸ نمره بهبود داشته است.</p>
          <p>• پیشنهاد: جلسه تقویتی برای موضوع «حد و پیوستگی» برگزار کنید.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function TopicBar({ label, mastery }: { label: string; mastery: number }) {
  const color = mastery >= 75 ? 'bg-emerald-500' : mastery >= 50 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700 w-32">{label}</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${mastery}%` }} />
      </div>
      <span className="text-sm font-medium text-gray-900 w-10">{mastery}٪</span>
    </div>
  );
}
