import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Home, BookOpen, Brain, FileText, ClipboardList, BarChart3,
  Users, School, Settings, LogOut, Menu, X, Sparkles,
  Calendar, Trophy, Layers, Shield, Globe, Activity,
  CreditCard, Flag, Eye, Zap, MessageSquare, GraduationCap,
  Building2, UserCheck, Server, Database, GitBranch, Rocket, Bell
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: Record<string, NavItem[]> = {
  STUDENT: [
    { label: 'داشبورد', path: '/student-dashboard', icon: <Home size={20} /> },
    { label: 'دستیار هوشمند', path: '/student-dashboard/ai-tutor', icon: <Brain size={20} /> },
    { label: 'تکالیف', path: '/student-dashboard/assignments', icon: <FileText size={20} /> },
    { label: 'آزمون‌ها', path: '/student-dashboard/exams', icon: <ClipboardList size={20} /> },
    { label: 'فلش‌کارت', path: '/student-dashboard/flashcards', icon: <Layers size={20} /> },
    { label: 'برنامه مطالعه', path: '/student-dashboard/study-plan', icon: <Calendar size={20} /> },
    { label: 'پیشرفت', path: '/student-dashboard/progress', icon: <BarChart3 size={20} /> },
  ],
  TEACHER: [
    { label: 'داشبورد', path: '/teacher-dashboard', icon: <Home size={20} /> },
    { label: 'کلاس‌ها', path: '/teacher-dashboard/classes', icon: <School size={20} /> },
    { label: 'دانش‌آموزان', path: '/teacher-dashboard/students', icon: <Users size={20} /> },
    { label: 'تکالیف', path: '/teacher-dashboard/assignments', icon: <FileText size={20} /> },
    { label: 'آزمون‌ساز', path: '/teacher-dashboard/exam-builder', icon: <Sparkles size={20} /> },
    { label: 'نتایج', path: '/teacher-dashboard/results', icon: <Trophy size={20} /> },
    { label: 'تحلیل کلاس', path: '/teacher-dashboard/analytics', icon: <BarChart3 size={20} /> },
    { label: 'دستیار معلم', path: '/teacher-dashboard/assistant', icon: <MessageSquare size={20} /> },
  ],
  SCHOOL_ADMIN: [
    { label: 'داشبورد', path: '/admin-dashboard', icon: <Home size={20} /> },
    { label: 'معلمان', path: '/admin-dashboard/teachers', icon: <UserCheck size={20} /> },
    { label: 'دانش‌آموزان', path: '/admin-dashboard/students', icon: <Users size={20} /> },
    { label: 'کلاس‌ها', path: '/admin-dashboard/classes', icon: <School size={20} /> },
    { label: 'اشتراک', path: '/admin-dashboard/subscription', icon: <CreditCard size={20} /> },
    { label: 'مصرف', path: '/admin-dashboard/usage', icon: <Activity size={20} /> },
    { label: 'عملکرد', path: '/admin-dashboard/performance', icon: <BarChart3 size={20} /> },
    { label: 'تنظیمات', path: '/admin-dashboard/settings', icon: <Settings size={20} /> },
  ],
  SUPER_ADMIN: [
    { label: 'داشبورد', path: '/platform', icon: <Home size={20} /> },
    { label: 'مستأجران', path: '/platform/tenants', icon: <Building2 size={20} /> },
    { label: 'مدارس', path: '/platform/schools', icon: <School size={20} /> },
    { label: 'کاربران', path: '/platform/users', icon: <Users size={20} /> },
    { label: 'طرح‌ها', path: '/platform/plans', icon: <CreditCard size={20} /> },
    { label: 'مصرف AI', path: '/platform/ai-usage', icon: <Zap size={20} /> },
    { label: 'پرچم ویژگی', path: '/platform/feature-flags', icon: <Flag size={20} /> },
    { label: 'ممیزی', path: '/platform/audit', icon: <Shield size={20} /> },
    { label: 'سلامت سیستم', path: '/platform/health', icon: <Server size={20} /> },
    { label: 'پیش‌نمایش نقش', path: '/platform/preview', icon: <Eye size={20} /> },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  STUDENT: 'دانش‌آموز',
  TEACHER: 'معلم',
  SCHOOL_ADMIN: 'مدیر مدرسه',
  SUPER_ADMIN: 'مدیر سیستم',
};

const ROLE_COLORS: Record<string, string> = {
  STUDENT: 'from-blue-500 to-cyan-500',
  TEACHER: 'from-emerald-500 to-teal-500',
  SCHOOL_ADMIN: 'from-purple-500 to-violet-500',
  SUPER_ADMIN: 'from-rose-500 to-pink-500',
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const navItems = NAV_ITEMS[user.role] || [];
  const roleColor = ROLE_COLORS[user.role] || 'from-gray-500 to-gray-600';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50
        w-72 bg-white border-l border-gray-200 shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className={`p-6 bg-gradient-to-l ${roleColor} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">آموزش هوشمند</h1>
              <p className="text-sm opacity-90 mt-1">{ROLE_LABELS[user.role]}</p>
            </div>
            <button
              className="lg:hidden p-1 hover:bg-white/20 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          {user.tenantName && (
            <div className="mt-3 px-3 py-1.5 bg-white/20 rounded-lg text-sm">
              {user.tenantName}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? `bg-gradient-to-l ${roleColor} text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Project Status & Deploy Guide - visible to all roles */}
          <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
            <button
              onClick={() => {
                navigate('/project-status');
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${location.pathname === '/project-status'
                  ? `bg-gradient-to-l ${roleColor} text-white shadow-md`
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }
              `}
            >
              <Activity size={20} />
              <span>نقشه راه پروژه</span>
            </button>
            <button
              onClick={() => {
                navigate('/deploy-guide');
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${location.pathname === '/deploy-guide'
                  ? `bg-gradient-to-l ${roleColor} text-white shadow-md`
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }
              `}
            >
              <Rocket size={20} />
              <span>راهنمای Deploy</span>
            </button>
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-l ${roleColor} flex items-center justify-center text-white font-bold`}>
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500">{ROLE_LABELS[user.role]}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="اعلان‌ها"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Settings */}
              <button
                onClick={() => navigate('/settings')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="تنظیمات"
              >
                <Settings size={20} className="text-gray-600" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 pr-2 border-r border-gray-200">
                <Globe size={16} />
                <span>نسخه آزمایشی</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
