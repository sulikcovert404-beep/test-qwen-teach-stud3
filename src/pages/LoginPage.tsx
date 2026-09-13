import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { GraduationCap, BookOpen, Shield, Building2, Sparkles, ArrowLeft } from 'lucide-react';

interface RoleCard {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  path: string;
}

const ROLES: RoleCard[] = [
  {
    role: 'STUDENT',
    title: 'دانش‌آموز',
    description: 'دسترسی به دستیار هوشمند، آزمون‌ها، تکالیف و برنامه مطالعه شخصی',
    icon: <GraduationCap size={32} />,
    gradient: 'from-blue-500 to-cyan-500',
    path: '/student-dashboard',
  },
  {
    role: 'TEACHER',
    title: 'معلم',
    description: 'مدیریت کلاس، طراحی آزمون، تحلیل عملکرد و دستیار هوشمند معلم',
    icon: <BookOpen size={32} />,
    gradient: 'from-emerald-500 to-teal-500',
    path: '/teacher-dashboard',
  },
  {
    role: 'SCHOOL_ADMIN',
    title: 'مدیر مدرسه',
    description: 'مدیریت معلمان، دانش‌آموزان، کلاس‌ها و مشاهده عملکرد مدرسه',
    icon: <Building2 size={32} />,
    gradient: 'from-purple-500 to-violet-500',
    path: '/admin-dashboard',
  },
  {
    role: 'SUPER_ADMIN',
    title: 'مدیر سیستم',
    description: 'مدیریت کل پلتفرم، مستأجران، طرح‌ها و سلامت سیستم',
    icon: <Shield size={32} />,
    gradient: 'from-rose-500 to-pink-500',
    path: '/platform',
  },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sparkles className="text-amber-400" size={28} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            پلتفرم آموزش هوشمند ایران
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            سیستم مدیریت آموزش مبتنی بر هوش مصنوعی برای مدارس، معلمان و دانش‌آموزان
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLES.map((roleCard) => (
            <button
              key={roleCard.role}
              onClick={() => login(roleCard.role)}
              disabled={isLoading}
              className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-right
                         hover:bg-white/20 hover:scale-[1.02] transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-l ${roleCard.gradient} flex items-center justify-center text-white mb-4
                             group-hover:scale-110 transition-transform duration-300`}>
                {roleCard.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{roleCard.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{roleCard.description}</p>
              <div className="mt-4 flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
                <span>ورود به پنل</span>
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-blue-300/60 text-sm">
            محیط آزمایشی — برای مشاهده هر نقش، روی کارت مربوطه کلیک کنید
          </p>
        </div>
      </div>
    </div>
  );
}
