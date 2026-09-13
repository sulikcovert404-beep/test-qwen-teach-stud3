import React, { useState } from 'react';
import {
  CreditCard, Check, Star, Zap, Crown, Building2, Users,
  Sparkles, Plus, Search, MoreVertical, TrendingUp,
  Calendar, FileText, MessageSquare, BarChart3, Settings as SettingsIcon,
  HelpCircle, Mail, Phone, Send, Bot, Lightbulb, BookOpen,
  ClipboardList, Award, Target, Brain, Shield
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// ============ PLANS PAGE ============
export function PlansPage() {
  const plans = [
    { name: 'رایگان', code: 'FREE', price: '۰', users: 1245, schools: 0, color: 'bg-gray-100', textColor: 'text-gray-700' },
    { name: 'دانش‌آموز پلاس', code: 'STUDENT_PRO', price: '۴۹,۰۰۰', users: 856, schools: 0, color: 'bg-mint', textColor: 'text-dark-green' },
    { name: 'معلم حرفه‌ای', code: 'TEACHER_PRO', price: '۹۹,۰۰۰', users: 124, schools: 0, color: 'bg-lavender', textColor: 'text-purple' },
    { name: 'مدرسه', code: 'SCHOOL', price: '۴۹۰,۰۰۰', users: 0, schools: 28, color: 'bg-soft-yellow', textColor: 'text-orange' },
    { name: 'سازمانی', code: 'ENTERPRISE', price: 'تماس بگیرید', users: 0, schools: 4, color: 'bg-soft-pink', textColor: 'text-primary-pink' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">طرح‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت طرح‌های اشتراک پلتفرم</p>
        </div>
        <button className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <Plus size={18} /><span>ایجاد طرح جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 card-shadow hover:card-shadow-hover transition-all">
            <div className={`w-12 h-12 ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
              {i === 0 ? <Zap size={22} className={plan.textColor} /> :
               i === plans.length - 1 ? <Crown size={22} className={plan.textColor} /> :
               <Star size={22} className={plan.textColor} />}
            </div>
            <h3 className="text-lg font-bold text-navy mb-1">{plan.name}</h3>
            <p className="text-2xl font-extrabold text-dark-green mb-4">{plan.price} <span className="text-sm text-secondary-text font-normal">تومان / ماه</span></p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-text">کاربران فعال</span>
                <span className="font-bold text-navy">{plan.users.toLocaleString('fa-IR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-text">مدارس فعال</span>
                <span className="font-bold text-navy">{plan.schools.toLocaleString('fa-IR')}</span>
              </div>
            </div>
            <button className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-navy hover:bg-bg transition-colors">
              ویرایش طرح
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CONTENT PAGE ============
export function ContentPage() {
  const contents = [
    { id: '1', title: 'ریاضی پایه دهم - فصل ۳', subject: 'ریاضی', grade: 'دهم', type: 'درس', author: 'مریم احمدی', status: 'published', date: '۱۴۰۲/۰۹/۱۵' },
    { id: '2', title: 'فیزیک - حرکت‌شناسی', subject: 'فیزیک', grade: 'یازدهم', type: 'درس', author: 'رضا حسینی', status: 'published', date: '۱۴۰۲/۰۹/۱۰' },
    { id: '3', title: 'شیمی آلی - مقدماتی', subject: 'شیمی', grade: 'دوازدهم', type: 'جزوه', author: 'زهرا رضایی', status: 'draft', date: '۱۴۰۲/۰۹/۰۵' },
    { id: '4', title: 'ادبیات فارسی - حافظ', subject: 'ادبیات', grade: 'دهم', type: 'درس', author: 'سارا عباسی', status: 'published', date: '۱۴۰۲/۰۸/۲۸' },
    { id: '5', title: 'زیست‌شناسی - سلول', subject: 'زیست', grade: 'یازدهم', type: 'ویدئو', author: 'حسین نوری', status: 'published', date: '۱۴۰۲/۰۸/۲۰' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">محتوا و درس‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت محتوای آموزشی پلتفرم</p>
        </div>
        <button className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <Plus size={18} /><span>ایجاد محتوای جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen size={20} />} label="کل محتوا" value="۲۴۵" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<FileText size={20} />} label="درس‌ها" value="۱۲۸" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<ClipboardList size={20} />} label="جزوه‌ها" value="۸۵" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<Award size={20} />} label="منتشر شده" value="۱۹۸" bgColor="bg-success-bg" iconColor="text-success-text" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">عنوان</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">درس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">پایه</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نوع</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نویسنده</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contents.map((item) => (
                <tr key={item.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{item.title}</td>
                  <td className="py-4 px-5 text-sm text-navy">{item.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.grade}</td>
                  <td className="py-4 px-5">
                    <span className="text-xs bg-mint text-dark-green px-2.5 py-1 rounded-full font-medium">{item.type}</span>
                  </td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.author}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      item.status === 'published' ? 'bg-success-bg text-success-text' : 'bg-soft-yellow text-orange'
                    }`}>
                      {item.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ EXAMS PAGE ============
export function ExamsPage() {
  const exams = [
    { id: '1', title: 'آزمون میان‌ترم ریاضی دهم', subject: 'ریاضی', grade: 'دهم', questions: 20, duration: 60, participants: 125, avgScore: 16.8, status: 'completed' },
    { id: '2', title: 'آزمون فصل ۲ فیزیک', subject: 'فیزیک', grade: 'یازدهم', questions: 15, duration: 45, participants: 98, avgScore: 15.2, status: 'completed' },
    { id: '3', title: 'کوییز شیمی - پیوندها', subject: 'شیمی', grade: 'دوازدهم', questions: 10, duration: 20, participants: 85, avgScore: 17.5, status: 'active' },
    { id: '4', title: 'آزمون ادبیات - آرایه‌ها', subject: 'ادبیات', grade: 'دهم', questions: 25, duration: 40, participants: 110, avgScore: 14.9, status: 'completed' },
    { id: '5', title: 'آزمون زیست - سلول', subject: 'زیست', grade: 'یازدهم', questions: 18, duration: 35, participants: 0, avgScore: 0, status: 'scheduled' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">آزمون‌ها</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت آزمون‌های پلتفرم</p>
        </div>
        <button className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <Plus size={18} /><span>ایجاد آزمون جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<ClipboardList size={20} />} label="کل آزمون‌ها" value="۱۲۸" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<Target size={20} />} label="در حال برگزاری" value="۳" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<Check size={20} />} label="تکمیل شده" value="۱۱۵" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Award size={20} />} label="میانگین نمرات" value="۱۶.۲" bgColor="bg-lavender" iconColor="text-purple" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">عنوان آزمون</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">درس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">سؤالات</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مدت (دقیقه)</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">شرکت‌کنندگان</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">میانگین</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{exam.title}</td>
                  <td className="py-4 px-5 text-sm text-navy">{exam.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{exam.questions}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{exam.duration}</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{exam.participants.toLocaleString('fa-IR')}</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{exam.avgScore > 0 ? exam.avgScore : '—'}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      exam.status === 'completed' ? 'bg-success-bg text-success-text' :
                      exam.status === 'active' ? 'bg-mint text-dark-green' :
                      'bg-soft-yellow text-orange'
                    }`}>
                      {exam.status === 'completed' ? 'تکمیل شده' : exam.status === 'active' ? 'فعال' : 'زمان‌بندی شده'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ ASSIGNMENTS PAGE ============
export function AssignmentsPage() {
  const assignments = [
    { id: '1', title: 'تمرین‌های فصل ۳ ریاضی', subject: 'ریاضی', class: 'دهم الف', teacher: 'مریم احمدی', dueDate: '۱۴ بهمن', submissions: 28, total: 32, status: 'active' },
    { id: '2', title: 'گزارش آزمایش حرکت', subject: 'فیزیک', class: 'یازدهم ب', teacher: 'رضا حسینی', dueDate: '۱۶ بهمن', submissions: 15, total: 28, status: 'active' },
    { id: '3', title: 'تحلیل شعر حافظ', subject: 'ادبیات', class: 'دهم الف', teacher: 'سارا عباسی', dueDate: '۱۰ بهمن', submissions: 32, total: 32, status: 'closed' },
    { id: '4', title: 'تمرین‌های شیمی آلی', subject: 'شیمی', class: 'دوازدهم', teacher: 'زهرا رضایی', dueDate: '۸ بهمن', submissions: 24, total: 25, status: 'graded' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">تکالیف</h1>
          <p className="text-sm text-secondary-text mt-1">مدیریت تکالیف دانش‌آموزان</p>
        </div>
        <button className="gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <Plus size={18} /><span>ایجاد تکلیف جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FileText size={20} />} label="کل تکالیف" value="۸۵" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<Target size={20} />} label="فعال" value="۱۲" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<Check size={20} />} label="تکمیل شده" value="۶۸" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Award size={20} />} label="نمره داده شده" value="۵۴" bgColor="bg-lavender" iconColor="text-purple" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">عنوان تکلیف</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">درس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">کلاس</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">معلم</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مهلت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">ارسال شده</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assignments.map((item) => (
                <tr key={item.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{item.title}</td>
                  <td className="py-4 px-5 text-sm text-navy">{item.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.class}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.teacher}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{item.dueDate}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
                        <div className="h-full gradient-button rounded-full" style={{ width: `${(item.submissions / item.total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-secondary-text">{item.submissions}/{item.total}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      item.status === 'active' ? 'bg-mint text-dark-green' :
                      item.status === 'closed' ? 'bg-soft-yellow text-orange' :
                      'bg-success-bg text-success-text'
                    }`}>
                      {item.status === 'active' ? 'فعال' : item.status === 'closed' ? 'بسته شده' : 'نمره داده شده'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ REPORTS PAGE ============
export function ReportsPage() {
  const monthlyData = [
    { month: 'فروردین', revenue: 45, users: 420 },
    { month: 'اردیبهشت', revenue: 62, users: 580 },
    { month: 'خرداد', revenue: 78, users: 720 },
    { month: 'تیر', revenue: 71, users: 650 },
    { month: 'مرداد', revenue: 85, users: 780 },
    { month: 'شهریور', revenue: 98, users: 920 },
    { month: 'مهر', revenue: 125, users: 1245 },
  ];

  const pieData = [
    { name: 'دانش‌آموزان', value: 65, color: '#10B981' },
    { name: 'معلمان', value: 20, color: '#7253E8' },
    { name: 'مدیران', value: 10, color: '#F58634' },
    { name: 'سایر', value: 5, color: '#FF2E75' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">گزارش‌ها</h1>
        <p className="text-sm text-secondary-text mt-1">آمار و گزارش‌های تحلیلی پلتفرم</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={20} />} label="رشد ماهانه" value="+۲۸٪" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Users size={20} />} label="کاربران جدید" value="۳۲۵" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<CreditCard size={20} />} label="درآمد ماه" value="۱۲۵M" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Building2 size={20} />} label="مدارس جدید" value="۴" bgColor="bg-soft-yellow" iconColor="text-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-navy mb-4">درآمد ماهانه (میلیون تومان)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF4" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E8EEF4', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Distribution */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <h3 className="text-lg font-bold text-navy mb-4">توزیع کاربران</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-secondary-text">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS PAGE ============
export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">تنظیمات</h1>
        <p className="text-sm text-secondary-text mt-1">تنظیمات عمومی پلتفرم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center">
              <SettingsIcon size={18} className="text-dark-green" />
            </div>
            <h3 className="text-lg font-bold text-navy">تنظیمات عمومی</h3>
          </div>
          <div className="space-y-4">
            <SettingItem label="نام پلتفرم" value="آموزش هوشمند" />
            <SettingItem label="زبان پیش‌فرض" value="فارسی" />
            <SettingItem label="منطقه زمانی" value="Asia/Tehran" />
            <SettingItem label="واحد پول" value="تومان (IRR)" />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center">
              <MessageSquare size={18} className="text-purple" />
            </div>
            <h3 className="text-lg font-bold text-navy">اعلان‌ها</h3>
          </div>
          <div className="space-y-3">
            <ToggleSetting label="اعلان ایمیل" defaultOn />
            <ToggleSetting label="اعلان پیامک" defaultOn={false} />
            <ToggleSetting label="اعلان تلگرام" defaultOn />
            <ToggleSetting label="اعلان‌های سیستمی" defaultOn />
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-soft-yellow rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-orange" />
            </div>
            <h3 className="text-lg font-bold text-navy">امنیت</h3>
          </div>
          <div className="space-y-3">
            <ToggleSetting label="احراز هویت دو مرحله‌ای" defaultOn />
            <ToggleSetting label="قفل خودکار پس از ۱۵ دقیقه" defaultOn />
            <ToggleSetting label="ثبت فعالیت کاربران" defaultOn />
            <ToggleSetting label="محدودیت IP" defaultOn={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SUBSCRIBERS PAGE ============
export function SubscribersPage() {
  const subscribers = [
    { id: '1', name: 'دبیرستان شهید بهشتی', plan: 'مدرسه', startDate: '۱۴۰۲/۰۶/۱۵', endDate: '۱۴۰۳/۰۶/۱۵', amount: '۵,۸۸۰,۰۰۰', status: 'active' },
    { id: '2', name: 'دبیرستان امام صادق', plan: 'مدرسه', startDate: '۱۴۰۲/۰۷/۲۰', endDate: '۱۴۰۳/۰۷/۲۰', amount: '۵,۸۸۰,۰۰۰', status: 'active' },
    { id: '3', name: 'دبیرستان انرژی اتمی', plan: 'سازمانی', startDate: '۱۴۰۲/۰۵/۱۰', endDate: '۱۴۰۳/۰۵/۱۰', amount: 'تماس', status: 'active' },
    { id: '4', name: 'علی محمدی', plan: 'دانش‌آموز پلاس', startDate: '۱۴۰۲/۰۹/۰۱', endDate: '۱۴۰۲/۱۰/۰۱', amount: '۴۹,۰۰۰', status: 'expiring' },
    { id: '5', name: 'مریم کریمی', plan: 'معلم حرفه‌ای', startDate: '۱۴۰۲/۰۸/۱۵', endDate: '۱۴۰۳/۰۸/۱۵', amount: '۱,۱۸۸,۰۰۰', status: 'active' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">مشترکان</h1>
        <p className="text-sm text-secondary-text mt-1">مدیریت اشتراک‌های فعال پلتفرم</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<CreditCard size={20} />} label="مشترکان فعال" value="۳۸" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<TrendingUp size={20} />} label="رشد ماهانه" value="+۱۵٪" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Award size={20} />} label="درآمد ماه" value="۱۲۵M" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Calendar size={20} />} label="در حال انقضا" value="۵" bgColor="bg-soft-yellow" iconColor="text-orange" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">نام</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">طرح</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">تاریخ شروع</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">تاریخ انقضا</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">مبلغ</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{sub.name}</td>
                  <td className="py-4 px-5">
                    <span className="text-xs bg-lavender text-purple px-2.5 py-1 rounded-full font-medium">{sub.plan}</span>
                  </td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{sub.startDate}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{sub.endDate}</td>
                  <td className="py-4 px-5 text-sm text-navy font-medium">{sub.amount} تومان</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      sub.status === 'active' ? 'bg-success-bg text-success-text' :
                      sub.status === 'expiring' ? 'bg-soft-yellow text-orange' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {sub.status === 'active' ? 'فعال' : sub.status === 'expiring' ? 'در حال انقضا' : 'منقضی'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ SUPPORT PAGE ============
export function SupportPage() {
  const tickets = [
    { id: '1', subject: 'مشکل در ورود به سیستم', user: 'فاطمه احمدی', priority: 'high', status: 'open', date: '۲ ساعت پیش' },
    { id: '2', subject: 'سؤال درباره طرح مدرسه', user: 'محمد رضایی', priority: 'medium', status: 'in-progress', date: '۵ ساعت پیش' },
    { id: '3', subject: 'درخواست افزایش محدودیت AI', user: 'مریم کریمی', priority: 'low', status: 'open', date: '۱ روز پیش' },
    { id: '4', subject: 'گزارش باگ در آزمون‌ساز', user: 'رضا حسینی', priority: 'high', status: 'in-progress', date: '۱ روز پیش' },
    { id: '5', subject: 'سؤال درباره پرداخت', user: 'زهرا رضایی', priority: 'medium', status: 'closed', date: '۲ روز پیش' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">پشتیبانی</h1>
        <p className="text-sm text-secondary-text mt-1">مدیریت تیکت‌ها و درخواست‌های پشتیبانی</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<MessageSquare size={20} />} label="تیکت‌های باز" value="۱۲" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<HelpCircle size={20} />} label="در حال بررسی" value="۸" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<Check size={20} />} label="حل شده" value="۱۴۵" bgColor="bg-success-bg" iconColor="text-success-text" />
        <StatCard icon={<Calendar size={20} />} label="میانگین پاسخ" value="۲ ساعت" bgColor="bg-mint" iconColor="text-dark-green" />
      </div>

      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg border-b border-border">
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">موضوع</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">کاربر</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">اولویت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">وضعیت</th>
                <th className="text-right py-4 px-5 text-xs font-bold text-secondary-text">زمان</th>
                <th className="py-4 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-hover-green transition-colors">
                  <td className="py-4 px-5 font-bold text-navy text-sm">{ticket.subject}</td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{ticket.user}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      ticket.priority === 'high' ? 'bg-red-50 text-red-600' :
                      ticket.priority === 'medium' ? 'bg-soft-yellow text-orange' :
                      'bg-bg text-secondary-text'
                    }`}>
                      {ticket.priority === 'high' ? 'بالا' : ticket.priority === 'medium' ? 'متوسط' : 'پایین'}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      ticket.status === 'open' ? 'bg-mint text-dark-green' :
                      ticket.status === 'in-progress' ? 'bg-lavender text-purple' :
                      'bg-success-bg text-success-text'
                    }`}>
                      {ticket.status === 'open' ? 'باز' : ticket.status === 'in-progress' ? 'در حال بررسی' : 'بسته شده'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-secondary-text">{ticket.date}</td>
                  <td className="py-4 px-5">
                    <button className="p-2 hover:bg-bg rounded-lg"><MoreVertical size={16} className="text-secondary-text" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============ AI HELP PAGE ============
export function AIHelpPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">کمک آموزشی AI</h1>
        <p className="text-sm text-secondary-text mt-1">ابزارهای هوش مصنوعی برای آموزش بهتر</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Brain size={20} />} label="مصرف AI امروز" value="۳۴۲" bgColor="bg-mint" iconColor="text-dark-green" />
        <StatCard icon={<Sparkles size={20} />} label="محدودیت روزانه" value="۵۰۰" bgColor="bg-lavender" iconColor="text-purple" />
        <StatCard icon={<TrendingUp size={20} />} label="مصرف این ماه" value="۸,۵۴۰" bgColor="bg-soft-yellow" iconColor="text-orange" />
        <StatCard icon={<CreditCard size={20} />} label="هزینه AI" value="$۲.۰۱" bgColor="bg-soft-pink" iconColor="text-primary-pink" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AIFeatureCard
          icon={<Brain size={24} />}
          title="دستیار هوشمند"
          description="پاسخ به سؤالات آموزشی دانش‌آموزان"
          usage="۲,۴۵۰ فراخوانی"
          color="bg-mint"
          iconColor="text-dark-green"
        />
        <AIFeatureCard
          icon={<Sparkles size={24} />}
          title="تولید سؤال"
          description="ساخت خودکار سؤالات آزمون"
          usage="۸۹۰ فراخوانی"
          color="bg-lavender"
          iconColor="text-purple"
        />
        <AIFeatureCard
          icon={<BookOpen size={24} />}
          title="خلاصه‌ساز"
          description="خلاصه‌سازی متون درسی"
          usage="۱,۲۰۰ فراخوانی"
          color="bg-soft-yellow"
          iconColor="text-orange"
        />
        <AIFeatureCard
          icon={<FileText size={24} />}
          title="دستیار معلم"
          description="کمک در طراحی درس و محتوا"
          usage="۳۴۰ فراخوانی"
          color="bg-soft-pink"
          iconColor="text-primary-pink"
        />
        <AIFeatureCard
          icon={<ClipboardList size={24} />}
          title="ساخت فلش‌کارت"
          description="تولید خودکار فلش‌کارت"
          usage="۵۶۰ فراخوانی"
          color="bg-light-blue"
          iconColor="text-blue-600"
        />
        <AIFeatureCard
          icon={<Lightbulb size={24} />}
          title="یادگیری تطبیقی"
          description="پیشنهاد محتوای شخصی‌سازی شده"
          usage="۲۱۰ فراخوانی"
          color="bg-peach"
          iconColor="text-orange"
        />
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============
function StatCard({ icon, label, value, bgColor, iconColor }: {
  icon: React.ReactNode; label: string; value: string; bgColor: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-5 card-shadow">
      <div className={`w-11 h-11 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-navy">{value}</p>
      <p className="text-sm text-secondary-text mt-1">{label}</p>
    </div>
  );
}

function SettingItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-secondary-text">{label}</span>
      <span className="text-sm font-medium text-navy">{value}</span>
    </div>
  );
}

function ToggleSetting({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-navy">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full relative transition-colors ${on ? 'gradient-button' : 'bg-gray-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'right-1' : 'right-6'}`} />
      </button>
    </div>
  );
}

function AIFeatureCard({ icon, title, description, usage, color, iconColor }: {
  icon: React.ReactNode; title: string; description: string; usage: string; color: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 card-shadow hover:card-shadow-hover transition-all">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center ${iconColor} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-navy mb-1">{title}</h3>
      <p className="text-sm text-secondary-text mb-3">{description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-secondary-text">مصرف</span>
        <span className="text-sm font-bold text-dark-green">{usage}</span>
      </div>
    </div>
  );
}
