import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { GraduationCap, BookOpen, Shield, Building2, ArrowLeft, Leaf } from 'lucide-react';

interface RoleCard {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
  hoverBg: string;
}

const ROLES: RoleCard[] = [
  {
    role: 'STUDENT',
    title: 'دانش‌آموز',
    description: 'دسترسی به دستیار هوشمند، آزمون‌ها، تکالیف و برنامه مطالعه شخصی',
    icon: <GraduationCap size={28} />,
    bgColor: 'bg-light-blue',
    iconBg: 'text-blue-600',
    hoverBg: 'hover:border-blue-200',
  },
  {
    role: 'TEACHER',
    title: 'معلم',
    description: 'مدیریت کلاس، طراحی آزمون، تحلیل عملکرد و دستیار هوشمند معلم',
    icon: <BookOpen size={28} />,
    bgColor: 'bg-mint',
    iconBg: 'text-dark-green',
    hoverBg: 'hover:border-primary-green/30',
  },
  {
    role: 'SCHOOL_ADMIN',
    title: 'مدیر مدرسه',
    description: 'مدیریت معلمان، دانش‌آموزان، کلاس‌ها و مشاهده عملکرد مدرسه',
    icon: <Building2 size={28} />,
    bgColor: 'bg-lavender',
    iconBg: 'text-purple',
    hoverBg: 'hover:border-purple-200',
  },
  {
    role: 'SUPER_ADMIN',
    title: 'مدیر سیستم',
    description: 'مدیریت کل پلتفرم، مستأجران، طرح‌ها و سلامت سیستم',
    icon: <Shield size={28} />,
    bgColor: 'bg-soft-mint',
    iconBg: 'text-dark-green',
    hoverBg: 'hover:border-dark-green/30',
  },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations - Green theme */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mint rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-mint rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-lavender rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-brand rounded-2xl mb-5 shadow-lg shadow-primary-green/30">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">
            آموزش هوشمند
          </h1>
          <p className="text-secondary-text text-base sm:text-lg max-w-xl mx-auto">
            باهم، برای آینده‌ای روشن‌تر 🌱
          </p>
          <p className="text-sm text-secondary-text/70 mt-2">
            پلتفرم آموزش هوشمند ویژه مدارس، از ابتدایی تا دبیرستان
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((roleCard) => (
            <button
              key={roleCard.role}
              onClick={() => login(roleCard.role)}
              disabled={isLoading}
              className={`group relative bg-white rounded-3xl p-6 text-right card-shadow
                         hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${roleCard.hoverBg}`}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-soft-mint to-mint opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl ${roleCard.bgColor} flex items-center justify-center ${roleCard.iconBg} mb-4
                             group-hover:scale-110 transition-transform duration-300`}>
                  {roleCard.icon}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{roleCard.title}</h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-4">{roleCard.description}</p>
                <div className="flex items-center gap-2 text-dark-green text-sm font-medium group-hover:gap-3 transition-all">
                  <span>ورود به پنل</span>
                  <ArrowLeft size={16} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full border border-border">
            <Leaf size={14} className="text-primary-green" />
            <p className="text-xs text-secondary-text">
              محیط آزمایشی — برای مشاهده هر نقش، روی کارت مربوطه کلیک کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
