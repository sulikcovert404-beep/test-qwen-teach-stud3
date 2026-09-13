import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, BookOpen, Building2, Shield, ArrowLeft } from 'lucide-react';
import { UserRole, ROLE_DASHBOARD_PATHS } from '../types';
import { useAuth } from '../contexts/AuthContext';

/**
 * Mini App — Telegram WebApp Gateway
 * 
 * This page serves as the entry point from Telegram Bot.
 * Flow:
 * 1. Telegram opens this page with initData
 * 2. Frontend detects Telegram WebApp context
 * 3. Sends initData to backend for validation
 * 4. Backend returns JWT token
 * 5. Frontend stores token in sessionStorage
 * 6. Redirects to role-appropriate dashboard
 * 
 * Security Rules:
 * - Role is NEVER taken from URL query
 * - Token is NEVER stored in localStorage
 * - initData is validated server-side
 * - No infinite 401 loops
 */
export default function MiniAppPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ROLE_DASHBOARD_PATHS[user.role], { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleDemoLogin = (role: UserRole) => {
    login(role);
    // After login, the useEffect will redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <Sparkles className="text-amber-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">آموزش هوشمند</h1>
          <p className="text-blue-200 text-sm mt-2">در حال اتصال به حساب شما...</p>
        </div>

        {/* Status Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-white text-sm">در انتظار احراز هویت</span>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            برای استفاده از پلتفرم، لطفاً نقش خود را انتخاب کنید.
            در نسخه Production، این مرحله از طریق Telegram initData به صورت خودکار انجام می‌شود.
          </p>
        </div>

        {/* Demo Role Selection */}
        <div className="space-y-3">
          <p className="text-xs text-blue-300 text-center mb-2">
            (محیط آزمایشی — انتخاب نقش برای تست)
          </p>
          
          <button
            onClick={() => handleDemoLogin('STUDENT')}
            className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-l from-blue-500 to-cyan-500 flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <div className="flex-1 text-right">
              <p className="text-white font-medium">ورود به عنوان دانش‌آموز</p>
              <p className="text-blue-200 text-xs">دسترسی به تکالیف، آزمون‌ها و AI Tutor</p>
            </div>
            <ArrowLeft size={16} className="text-white/50" />
          </button>

          <button
            onClick={() => handleDemoLogin('TEACHER')}
            className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-l from-emerald-500 to-teal-500 flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <div className="flex-1 text-right">
              <p className="text-white font-medium">ورود به عنوان معلم</p>
              <p className="text-blue-200 text-xs">مدیریت کلاس و آزمون‌ساز هوشمند</p>
            </div>
            <ArrowLeft size={16} className="text-white/50" />
          </button>

          <button
            onClick={() => handleDemoLogin('SCHOOL_ADMIN')}
            className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-l from-purple-500 to-violet-500 flex items-center justify-center text-white">
              <Building2 size={20} />
            </div>
            <div className="flex-1 text-right">
              <p className="text-white font-medium">ورود به عنوان مدیر مدرسه</p>
              <p className="text-blue-200 text-xs">مدیریت معلمان و عملکرد مدرسه</p>
            </div>
            <ArrowLeft size={16} className="text-white/50" />
          </button>

          <button
            onClick={() => handleDemoLogin('SUPER_ADMIN')}
            className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-l from-rose-500 to-pink-500 flex items-center justify-center text-white">
              <Shield size={20} />
            </div>
            <div className="flex-1 text-right">
              <p className="text-white font-medium">ورود به عنوان مدیر سیستم</p>
              <p className="text-blue-200 text-xs">مدیریت کل پلتفرم</p>
            </div>
            <ArrowLeft size={16} className="text-white/50" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-blue-300/50 text-xs">
            @teachschool_bot • AI Education Platform Iran
          </p>
        </div>
      </div>
    </div>
  );
}
