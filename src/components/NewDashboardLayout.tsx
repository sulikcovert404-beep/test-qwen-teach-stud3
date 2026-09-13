import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Users, School, UserCog, CreditCard, BookOpen,
  ClipboardList, FileText, Sparkles, BarChart3, Settings, HelpCircle,
  LogOut, Search, Bell, Globe, Menu, X, ChevronLeft,
  GraduationCap
} from 'lucide-react';

// Sidebar menu items for Super Admin
const ADMIN_MENU = [
  { label: 'داشبورد', path: '/platform', icon: <LayoutDashboard size={20} /> },
  { label: 'مشترکان', path: '/platform/subscribers', icon: <Users size={20} /> },
  { label: 'مدارس', path: '/platform/schools', icon: <School size={20} /> },
  { label: 'کاربران', path: '/platform/users', icon: <UserCog size={20} /> },
  { label: 'طرح‌ها', path: '/platform/plans', icon: <CreditCard size={20} /> },
  { label: 'محتوا و درس‌ها', path: '/platform/content', icon: <BookOpen size={20} /> },
  { label: 'آزمون‌ها', path: '/platform/exams', icon: <ClipboardList size={20} /> },
  { label: 'تکالیف', path: '/platform/assignments', icon: <FileText size={20} /> },
  { label: 'کمک آموزشی AI', path: '/platform/ai', icon: <Sparkles size={20} /> },
  { label: 'گزارش‌ها', path: '/platform/reports', icon: <BarChart3 size={20} /> },
  { label: 'تنظیمات', path: '/platform/settings', icon: <Settings size={20} /> },
  { label: 'پشتیبانی', path: '/platform/support', icon: <HelpCircle size={20} /> },
];

export default function NewDashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen z-50
        bg-white border-l border-border
        transition-all duration-300
        ${sidebarCollapsed ? 'w-20' : 'w-[280px]'}
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Brand - Green Gradient */}
        <div className="gradient-brand p-5 flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
            <GraduationCap size={24} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="text-white overflow-hidden">
              <h1 className="font-bold text-base leading-tight">آموزش هوشمند</h1>
              <p className="text-[11px] text-white/90 mt-0.5 leading-tight">باهم، برای آینده‌ای روشن‌تر</p>
            </div>
          )}
          <button
            className="lg:hidden mr-auto text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {ADMIN_MENU.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/platform' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-[15px] text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-mint text-dark-green'
                    : 'text-navy/70 hover:bg-hover-green hover:text-dark-green'
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span className={isActive ? 'text-dark-green' : 'text-secondary-text group-hover:text-dark-green'}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[15px] text-sm font-medium
                       text-secondary-text hover:bg-red-50 hover:text-red-600 transition-colors
                       ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span>خروج</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-4 px-4 lg:px-8 py-3">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-hover-green rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Sidebar toggle (desktop) */}
            <button
              className="hidden lg:flex p-2 hover:bg-hover-green rounded-lg"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <ChevronLeft size={20} className={`transition-transform text-secondary-text ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl relative">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text" />
              <input
                type="text"
                placeholder="جستجو در دانش‌آموزان، کلاس‌ها، محتوا ..."
                className="w-full bg-bg border border-border rounded-xl pr-11 pl-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green/30
                           placeholder:text-secondary-text"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-hover-green rounded-xl relative" title="اعلان‌ها">
                <Bell size={20} className="text-secondary-text" />
                <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-primary-pink rounded-full" />
              </button>
              <button className="p-2.5 hover:bg-hover-green rounded-xl" title="تنظیمات">
                <Settings size={20} className="text-secondary-text" />
              </button>
              <button className="p-2.5 hover:bg-hover-green rounded-xl" title="زبان">
                <Globe size={20} className="text-secondary-text" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pr-3 mr-2 border-r border-border">
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-navy leading-tight">مدیر سیستم</p>
                  <p className="text-xs text-secondary-text mt-0.5">مدرسه فردا</p>
                </div>
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold">
                  م
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Export for use in pages
export const ADMIN_MENU_ITEMS = ADMIN_MENU;
