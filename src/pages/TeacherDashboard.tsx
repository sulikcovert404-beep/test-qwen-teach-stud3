import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  School, Users, FileText, ClipboardList, BarChart3,
  Sparkles, Trophy, MessageSquare, Plus, TrendingUp,
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-l from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">سلام {user.name} 👋</h1>
            <p className="text-emerald-100">امروز ۳ کلاس فعال و ۲ تکلیف جدید برای بررسی دارید.</p>
          </div>
          <button
            onClick={() => navigate('/teacher-dashboard/exam-builder')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={18} />
            <span>آزمون جدید</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<School size={20} />} label="کلاس‌های فعال" value="۳" color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={<Users size={20} />} label="دانش‌آموزان" value="۸۷" color="bg-blue-50 text-blue-600" />
        <StatCard icon={<FileText size={20} />} label="تکالیف فعال" value="۵" color="bg-amber-50 text-amber-600" />
        <StatCard icon={<Trophy size={20} />} label="میانگین کلاس" value="۱۶.۸" color="bg-purple-50 text-purple-600" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureCard
          icon={<School size={24} />}
          title="کلاس‌ها"
          description="مدیریت کلاس‌های درس"
          gradient="from-emerald-500 to-teal-500"
          onClick={() => navigate('/teacher-dashboard/classes')}
        />
        <FeatureCard
          icon={<Sparkles size={24} />}
          title="آزمون‌ساز AI"
          description="تولید خودکار سؤال و آزمون"
          gradient="from-violet-500 to-purple-500"
          onClick={() => navigate('/teacher-dashboard/exam-builder')}
        />
        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="تحلیل کلاس"
          description="عملکرد و آمار دانش‌آموزان"
          gradient="from-blue-500 to-indigo-500"
          onClick={() => navigate('/teacher-dashboard/analytics')}
        />
        <FeatureCard
          icon={<MessageSquare size={24} />}
          title="دستیار معلم"
          description="کمک در طراحی درس و محتوا"
          gradient="from-pink-500 to-rose-500"
          onClick={() => navigate('/teacher-dashboard/assistant')}
        />
      </div>

      {/* Recent Classes */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <School size={20} className="text-emerald-500" />
          کلاس‌های من
        </h2>
        <div className="space-y-3">
          <ClassRow name="ریاضی دهم - الف" students={32} nextExam="۱۵ بهمن" avgScore="۱۷.۲" />
          <ClassRow name="ریاضی یازدهم - ب" students={28} nextExam="۱۸ بهمن" avgScore="۱۶.۵" />
          <ClassRow name="حسابان دوازدهم" students={27} nextExam="۲۰ بهمن" avgScore="۱۶.۸" />
        </div>
      </div>

      {/* Pending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-amber-500" />
            تکالیف در انتظار تصحیح
          </h3>
          <div className="space-y-2">
            <PendingItem title="تمرین فصل ۳ - ریاضی دهم" count={28} />
            <PendingItem title="آزمون کوتاه - یازدهم ب" count={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-500" />
            نکات تحلیلی
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              ۷۵٪ دانش‌آموزان فصل ۳ را تسلط دارند
            </p>
            <p className="flex items-center gap-2">
              <AlertCircle size={14} className="text-amber-500" />
              ۵ دانش‌آموز نیاز به توجه ویژه دارند
            </p>
          </div>
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

function FeatureCard({ icon, title, description, gradient, onClick }: {
  icon: React.ReactNode; title: string; description: string; gradient: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-200 p-5 text-right
                 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-l ${gradient} flex items-center justify-center text-white mb-3
                       group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </button>
  );
}

function ClassRow({ name, students, nextExam, avgScore }: {
  name: string; students: number; nextExam: string; avgScore: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
        <School size={18} className="text-emerald-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{students} دانش‌آموز</p>
      </div>
      <div className="text-left">
        <p className="text-xs text-gray-500">آزمون: {nextExam}</p>
        <p className="text-xs font-medium text-emerald-600">میانگین: {avgScore}</p>
      </div>
    </div>
  );
}

function PendingItem({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-100">
      <p className="text-sm text-gray-700">{title}</p>
      <span className="text-xs font-medium bg-amber-200 text-amber-800 px-2 py-1 rounded-full">{count} پاسخ</span>
    </div>
  );
}
