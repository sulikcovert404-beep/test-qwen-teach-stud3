import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PLAN_MARKETING_NAMES } from '../types';
import {
  User, Shield, Bell, Globe, Lock, Palette, Smartphone,
  Save, CheckCircle2, Camera, Mail, Phone, MapPin
} from 'lucide-react';

const ROLE_LABELS: Record<string, string> = {
  STUDENT: 'دانش‌آموز',
  TEACHER: 'معلم',
  SCHOOL_ADMIN: 'مدیر مدرسه',
  SUPER_ADMIN: 'مدیر سیستم',
};

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance'>('profile');
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile' as const, label: 'پروفایل', icon: <User size={18} /> },
    { id: 'security' as const, label: 'امنیت', icon: <Shield size={18} /> },
    { id: 'notifications' as const, label: 'اعلان‌ها', icon: <Bell size={18} /> },
    { id: 'appearance' as const, label: 'ظاهر', icon: <Palette size={18} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <User size={28} className="text-gray-700" />
        تنظیمات
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-xl border border-gray-200 p-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-l from-blue-500 to-indigo-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-l from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 left-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{ROLE_LABELS[user.role]}</p>
              {user.tenantName && <p className="text-xs text-gray-400 mt-1">{user.tenantName}</p>}
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="نام کامل" defaultValue={user.name} icon={<User size={16} />} />
            <FormField label="ایمیل" defaultValue="user@example.com" icon={<Mail size={16} />} type="email" />
            <FormField label="شماره تلفن" defaultValue="۰۹۱۲۳۴۵۶۷۸۹" icon={<Phone size={16} />} />
            <FormField label="شهر" defaultValue="تهران" icon={<MapPin size={16} />} />
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">نقش: </span>{ROLE_LABELS[user.role]}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">طرح: </span>{PLAN_MARKETING_NAMES[user.plan]}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">شناسه کاربر: </span><code className="text-xs bg-gray-200 px-1 rounded">{user.id}</code>
            </p>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lock size={18} className="text-amber-500" />
              تغییر رمز عبور
            </h3>
            <div className="space-y-3 max-w-md">
              <FormField label="رمز عبور فعلی" type="password" />
              <FormField label="رمز عبور جدید" type="password" />
              <FormField label="تکرار رمز عبور جدید" type="password" />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Smartphone size={18} className="text-blue-500" />
              احراز هویت دو مرحله‌ای
            </h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-900">وضعیت: غیرفعال</p>
                <p className="text-xs text-gray-500 mt-1">برای امنیت بیشتر، احراز هویت دو مرحله‌ای را فعال کنید.</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                فعال‌سازی
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">دستگاه‌های متصل</h3>
            <div className="space-y-2">
              <DeviceRow name="Telegram WebApp" location="تهران، ایران" lastActive="اکنون" current />
              <DeviceRow name="Chrome - Windows" location="تهران، ایران" lastActive="۲ ساعت پیش" />
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-bold text-gray-900 mb-2">تنظیمات اعلان‌ها</h3>
          <ToggleRow label="اعلان تکالیف جدید" description="دریافت اعلان هنگام اضافه شدن تکلیف جدید" defaultOn />
          <ToggleRow label="یادآوری آزمون" description="یادآوری ۲۴ ساعت قبل از آزمون" defaultOn />
          <ToggleRow label="نتایج آزمون" description="اعلان هنگام ثبت نمره" defaultOn />
          <ToggleRow label="پیام‌های معلم" description="دریافت پیام از معلم" defaultOn />
          <ToggleRow label="اعلان‌های سیستمی" description="به‌روزرسانی‌ها و اخبار پلتفرم" defaultOn={false} />
          <ToggleRow label="ایمیل خلاصه هفتگی" description="گزارش هفتگی پیشرفت" defaultOn={false} />
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <h3 className="font-bold text-gray-900 mb-3">تنظیمات ظاهری</h3>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">تم رنگی</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'روشن', color: 'bg-white border-2 border-blue-500', active: true },
                { name: 'تیره', color: 'bg-gray-900', active: false },
                { name: 'خودکار', color: 'bg-gradient-to-l from-white to-gray-900', active: false },
              ].map((theme) => (
                <button
                  key={theme.name}
                  className={`p-4 rounded-xl border-2 ${theme.active ? 'border-blue-500' : 'border-gray-200'} hover:border-blue-300 transition-colors`}
                >
                  <div className={`w-full h-12 rounded-lg ${theme.color} mb-2`} />
                  <span className="text-sm text-gray-700">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">اندازه فونت</label>
            <div className="flex gap-2">
              {['کوچک', 'متوسط', 'بزرگ'].map((size, i) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg text-sm ${i === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-600">
            <CheckCircle2 size={16} />
            ذخیره شد
          </span>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-l from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <Save size={18} />
          <span>ذخیره تغییرات</span>
        </button>
      </div>
    </div>
  );
}

function FormField({ label, defaultValue, icon, type = 'text' }: {
  label: string; defaultValue?: string; icon?: React.ReactNode; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                     ${icon ? 'pr-10' : 'pr-4'} pl-4`}
        />
      </div>
    </div>
  );
}

function DeviceRow({ name, location, lastActive, current }: {
  name: string; location: string; lastActive: string; current?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
      <div className="flex items-center gap-3">
        <Smartphone size={18} className="text-gray-500" />
        <div>
          <p className="text-sm font-medium text-gray-900">
            {name}
            {current && <span className="text-xs text-emerald-600 mr-2">(دستگاه فعلی)</span>}
          </p>
          <p className="text-xs text-gray-500">{location} • {lastActive}</p>
        </div>
      </div>
      {!current && (
        <button className="text-xs text-red-600 hover:text-red-700">قطع اتصال</button>
      )}
    </div>
  );
}

function ToggleRow({ label, description, defaultOn }: {
  label: string; description: string; defaultOn: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full relative transition-colors ${on ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'right-1' : 'right-6'}`} />
      </button>
    </div>
  );
}
