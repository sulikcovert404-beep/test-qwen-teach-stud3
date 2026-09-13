import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Users, School, UserCheck, CreditCard, Activity,
  BarChart3, Settings, TrendingUp, Building2,
  CheckCircle2, AlertTriangle, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-l from-purple-500 to-violet-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">پنل مدیریت مدرسه</h1>
            <p className="text-purple-100">{user.tenantName} — مدیریت کامل مدرسه و منابع آموزشی</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-xl text-sm">
            طرح: مدرسه
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<UserCheck size={20} />} label="معلمان فعال" value="۲۴" color="bg-purple-50 text-purple-600" />
        <StatCard icon={<GraduationCap size={20} />} label="دانش‌آموزان" value="۴۸۵" color="bg-blue-50 text-blue-600" />
        <StatCard icon={<School size={20} />} label="کلاس‌ها" value="۳۲" color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={<Activity size={20} />} label="فعالیت امروز" value="۱,۲۴۰" color="bg-amber-50 text-amber-600" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureCard
          icon={<UserCheck size={24} />}
          title="معلمان"
          description="مدیریت و افزودن معلم"
          gradient="from-purple-500 to-violet-500"
          onClick={() => navigate('/admin-dashboard/teachers')}
        />
        <FeatureCard
          icon={<Users size={24} />}
          title="دانش‌آموزان"
          description="لیست و عضویت دانش‌آموزان"
          gradient="from-blue-500 to-indigo-500"
          onClick={() => navigate('/admin-dashboard/students')}
        />
        <FeatureCard
          icon={<CreditCard size={24} />}
          title="اشتراک"
          description="مدیریت طرح و اشتراک"
          gradient="from-emerald-500 to-teal-500"
          onClick={() => navigate('/admin-dashboard/subscription')}
        />
        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="عملکرد"
          description="آمار و گزارش مدرسه"
          gradient="from-amber-500 to-orange-500"
          onClick={() => navigate('/admin-dashboard/performance')}
        />
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-purple-500" />
            فعالیت‌های اخیر
          </h2>
          <div className="space-y-3">
            <ActivityItem text="معلم جدید «فاطمه رضایی» اضافه شد" time="۲ ساعت پیش" type="success" />
            <ActivityItem text="آزمون ریاضی دهم ایجاد شد" time="۵ ساعت پیش" type="info" />
            <ActivityItem text="۱۵ دانش‌آموز در کلاس جدید عضو شدند" time="دیروز" type="success" />
            <ActivityItem text="اشتراک مدرسه تا ۳ ماه دیگر فعال است" time="—" type="warning" />
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-500" />
            خلاصه عملکرد
          </h2>
          <div className="space-y-4">
            <ProgressRow label="میانگین نمرات مدرسه" value={78} />
            <ProgressRow label="نرخ تکمیل تکالیف" value={85} />
            <ProgressRow label="حضور هفتگی" value={92} />
            <ProgressRow label="استفاده از AI" value={45} />
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-emerald-500" />
          وضعیت اشتراک
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">طرح فعلی</p>
            <p className="text-lg font-bold text-gray-900 mt-1">مدرسه</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">مصرف AI امروز</p>
            <p className="text-lg font-bold text-gray-900 mt-1">۳۴۲ / ۵۰۰</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">انقضا</p>
            <p className="text-lg font-bold text-gray-900 mt-1">۱۴۰۴/۰۵/۱۵</p>
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

function ActivityItem({ text, time, type }: { text: string; time: string; type: string }) {
  const colors: Record<string, string> = {
    success: 'bg-emerald-100 text-emerald-600',
    info: 'bg-blue-100 text-blue-600',
    warning: 'bg-amber-100 text-amber-600',
  };
  const icons: Record<string, React.ReactNode> = {
    success: <CheckCircle2 size={14} />,
    info: <Building2 size={14} />,
    warning: <AlertTriangle size={14} />,
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className={`w-7 h-7 rounded-full ${colors[type]} flex items-center justify-center`}>
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{text}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}٪</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-purple-500 to-violet-500 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
