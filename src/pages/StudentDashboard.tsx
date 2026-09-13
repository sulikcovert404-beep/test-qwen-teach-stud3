import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApiList } from '../hooks/useApi';
import { assignmentApi, statsApi } from '../backend/api';
import {
  Brain, FileText, ClipboardList, Calendar, BarChart3,
  Layers, TrendingUp, Clock, CheckCircle2, AlertCircle,
  Sparkles, BookOpen, Target, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch assignments from API
  const { data: assignmentsData, loading: loadingAssignments } = useApiList(
    () => assignmentApi.getAll(),
    [user?.id]
  );

  const assignments = assignmentsData || [];
  // Stats
  const activeAssignments = assignments.filter(a => a.status === 'published').length;

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-l from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">سلام {user.name} 👋</h1>
        <p className="text-blue-100">به داشبورد آموزشی خودت خوش آمدی. امروز چه برنامه‌ای داری؟</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText size={20} />}
          label="تکالیف فعال"
          value={loadingAssignments ? '...' : activeAssignments.toString()}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={<ClipboardList size={20} />}
          label="آزمون پیش رو"
          value="۱"
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="میانگین نمرات"
          value="۱۷.۵"
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={<Award size={20} />}
          label="روزهای متوالی"
          value="۱۲"
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Main Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard
          icon={<Brain size={24} />}
          title="دستیار هوشمند"
          description="سؤال بپرس، توضیح بخواه، مثال بگیر"
          gradient="from-violet-500 to-purple-500"
          onClick={() => navigate('/student-dashboard/ai-tutor')}
        />
        <FeatureCard
          icon={<FileText size={24} />}
          title="تکالیف"
          description={`${activeAssignments} تکلیف فعال`}
          gradient="from-blue-500 to-indigo-500"
          onClick={() => navigate('/student-dashboard/assignments')}
        />
        <FeatureCard
          icon={<ClipboardList size={24} />}
          title="آزمون‌ها"
          description="آزمون‌های پیش‌رو و نتایج"
          gradient="from-amber-500 to-orange-500"
          onClick={() => navigate('/student-dashboard/exams')}
        />
        <FeatureCard
          icon={<Layers size={24} />}
          title="فلش‌کارت"
          description="مرور سریع مفاهیم کلیدی"
          gradient="from-emerald-500 to-teal-500"
          onClick={() => navigate('/student-dashboard/flashcards')}
        />
        <FeatureCard
          icon={<Calendar size={24} />}
          title="برنامه مطالعه"
          description="برنامه‌ریزی هوشمند مطالعه"
          gradient="from-pink-500 to-rose-500"
          onClick={() => navigate('/student-dashboard/study-plan')}
        />
        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="پیشرفت من"
          description="تحلیل عملکرد و نقاط قوت و ضعف"
          gradient="from-cyan-500 to-blue-500"
          onClick={() => navigate('/student-dashboard/progress')}
        />
      </div>

      {/* Assignments List */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-blue-500" />
          تکالیف فعال
        </h2>
        
        {loadingAssignments ? (
          <div className="text-center py-8 text-gray-400">در حال بارگذاری...</div>
        ) : assignments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText size={48} className="mx-auto mb-2 opacity-30" />
            <p>هنوز تکلیفی برای شما ثبت نشده است.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {assignments.slice(0, 3).map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate('/student-dashboard/assignments')}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{assignment.title}</p>
                  <p className="text-xs text-gray-500">مهلت: {new Date(assignment.dueAt).toLocaleDateString('fa-IR')}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">فعال</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-blue-500" />
          برنامه امروز
        </h2>
        <div className="space-y-3">
          <ScheduleItem time="۰۸:۰۰" title="ریاضی - فصل ۳" type="درس" />
          <ScheduleItem time="۱۰:۰۰" title="تمرین فیزیک - حرکت‌شناسی" type="تکلیف" />
          <ScheduleItem time="۱۴:۰۰" title="مرور فلش‌کارت شیمی" type="مرور" />
          <ScheduleItem time="۱۶:۰۰" title="آزمون آنلاین ادبیات" type="آزمون" />
        </div>
      </div>

      {/* Empty State Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-800">طرح فعلی: رایگان</p>
          <p className="text-sm text-amber-700 mt-1">
            برای دسترسی نامحدود به دستیار هوشمند، تولید سؤال و تحلیل پیشرفته، طرح خود را ارتقا دهید.
          </p>
          <button
            onClick={() => navigate('/upgrade')}
            className="mt-2 text-xs font-medium text-amber-900 hover:text-amber-700 underline"
          >
            مشاهده طرح‌ها ←
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient, onClick }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
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

function ScheduleItem({ time, title, type }: {
  time: string;
  title: string;
  type: string;
}) {
  const typeColors: Record<string, string> = {
    'درس': 'bg-blue-100 text-blue-700',
    'تکلیف': 'bg-amber-100 text-amber-700',
    'مرور': 'bg-emerald-100 text-emerald-700',
    'آزمون': 'bg-red-100 text-red-700',
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="text-sm font-mono text-gray-500 w-12">{time}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[type] || 'bg-gray-100 text-gray-600'}`}>
        {type}
      </span>
    </div>
  );
}
