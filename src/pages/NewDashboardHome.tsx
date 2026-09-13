import React from 'react';
import {
  Users, School, BookOpen, UserCheck, Calendar, Sprout,
  Plus, FileText, MessageSquare, BarChart3, TrendingUp,
  Lightbulb, Star, Sparkles, Heart, Leaf
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from 'recharts';

// Chart data
const CHART_DATA = [
  { month: 'فروردین', users: 420, students: 1800, content: 120 },
  { month: 'اردیبهشت', users: 580, students: 2200, content: 180 },
  { month: 'خرداد', users: 720, students: 2800, content: 240 },
  { month: 'تیر', users: 650, students: 2600, content: 210 },
  { month: 'مرداد', users: 780, students: 3100, content: 280 },
  { month: 'شهریور', users: 920, students: 3600, content: 340 },
  { month: 'مهر', users: 1245, students: 4200, content: 420 },
];

const ACTIVITIES = [
  { id: 1, user: 'فاطمه احمدی', action: 'وارد سیستم شد', time: '۵ دقیقه پیش', color: 'bg-primary-green' },
  { id: 2, user: 'مریم کریمی', action: 'آزمون ریاضی پایه هشتم ایجاد شد', time: '۲۰ دقیقه پیش', color: 'bg-purple' },
  { id: 3, user: 'محمد رضایی', action: 'تکلیف خود را ارسال کرد', time: '۱ ساعت پیش', color: 'bg-orange' },
  { id: 4, user: 'زهرا محمدی', action: 'کلاس زیست دهم بروزرسانی شد', time: '۲ ساعت پیش', color: 'bg-light-blue' },
  { id: 5, user: 'علی حسینی', action: 'گزارش ماهانه را مشاهده کرد', time: '۳ ساعت پیش', color: 'bg-primary-pink' },
];

const KPI_CARDS = [
  {
    title: 'دانش‌آموزان',
    value: '۱٬۲۴۵',
    growth: '+۱۲٪',
    icon: <Users size={22} />,
    bgColor: 'bg-mint',
    iconColor: 'text-dark-green',
    growthColor: 'text-growth-green',
  },
  {
    title: 'مدارس',
    value: '۳۲',
    growth: '+۸٪',
    icon: <School size={22} />,
    bgColor: 'bg-lavender',
    iconColor: 'text-purple',
    growthColor: 'text-growth-green',
  },
  {
    title: 'کلاس‌های فعال',
    value: '۱۲۸',
    growth: '+۱۵٪',
    icon: <BookOpen size={22} />,
    bgColor: 'bg-soft-yellow',
    iconColor: 'text-orange',
    growthColor: 'text-growth-green',
  },
  {
    title: 'کاربران فعال',
    value: '۸۵',
    growth: '+۲۳٪',
    icon: <UserCheck size={22} />,
    bgColor: 'bg-soft-pink',
    iconColor: 'text-primary-pink',
    growthColor: 'text-growth-green',
  },
];

const QUICK_ACCESS = [
  {
    title: 'ایجاد طرح جدید',
    description: 'طرح درس یا محتوای آموزشی بسازید',
    icon: <Plus size={22} />,
    bgColor: 'bg-mint',
    iconColor: 'text-dark-green',
  },
  {
    title: 'محتوا و درس‌ها',
    description: 'مدیریت محتوا و منابع درسی',
    icon: <BookOpen size={22} />,
    bgColor: 'bg-soft-mint',
    iconColor: 'text-dark-green',
  },
  {
    title: 'مدیریت دانش‌آموزان',
    description: 'لیست و اطلاعات دانش‌آموزان',
    icon: <Users size={22} />,
    bgColor: 'bg-lavender',
    iconColor: 'text-purple',
  },
  {
    title: 'مدیریت مدارس',
    description: 'مدارس و مستأجران فعال',
    icon: <School size={22} />,
    bgColor: 'bg-light-blue',
    iconColor: 'text-blue-600',
  },
  {
    title: 'پیام‌ها',
    description: 'پیام‌های دریافتی و ارسالی',
    icon: <MessageSquare size={22} />,
    bgColor: 'bg-soft-yellow',
    iconColor: 'text-orange',
  },
  {
    title: 'گزارش‌ها',
    description: 'آمار و گزارش‌های تحلیلی',
    icon: <BarChart3 size={22} />,
    bgColor: 'bg-mint',
    iconColor: 'text-dark-green',
  },
];

export default function NewDashboardHome() {
  const today = new Date().toLocaleDateString('fa-IR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        {/* Hero Banner - Soft Green Gradient */}
        <div className="gradient-hero rounded-3xl p-6 lg:p-8 relative overflow-hidden border border-border">
          <div className="relative z-10 flex items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-navy leading-tight">
                هر قدم کوچک،
                <br />
                آغاز یک <span className="text-primary-green">موفقیت بزرگ</span>!
              </h1>
              <p className="text-secondary-text mt-3 text-sm lg:text-base">
                با یادگیری امروز، آینده‌ی بهتری بساز
              </p>
              <button className="mt-5 gradient-button text-white px-5 py-2.5 rounded-xl text-sm font-bold
                               hover:bg-deep-green transition-colors shadow-lg shadow-primary-green/20">
                شروع کنید
              </button>

              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 opacity-20 hidden lg:block">
                <Leaf size={80} className="text-primary-green" />
              </div>
            </div>
            <div className="hidden md:block w-48 lg:w-64 flex-shrink-0">
              <img
                src="https://image.qwenlm.ai/generated-images/520db4e1-08e2-4e00-a732-3653d4bd491c/_result.png"
                alt="دانش‌آموزان"
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Side Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Date Card */}
          <div className="bg-white rounded-3xl p-5 card-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-dark-green" />
              </div>
              <span className="text-xs text-secondary-text">امروز</span>
            </div>
            <p className="text-sm font-bold text-navy">{today}</p>
            <p className="text-xs text-secondary-text mt-1">روز خوبی برای یادگیری!</p>
          </div>

          {/* Motivation Card */}
          <div className="gradient-soft rounded-3xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sprout size={18} className="text-dark-green" />
              </div>
              <span className="text-xs text-navy/70">انگیزه روز</span>
            </div>
            <p className="text-sm font-bold text-navy leading-relaxed">
              هر روز یک قدم به جلو،<br />
              موفقیت در راه است 🌱
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 card-shadow
                       hover:card-shadow-hover transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${card.bgColor} rounded-2xl flex items-center justify-center ${card.iconColor}`}>
                {card.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${card.growthColor} bg-success-bg px-2 py-1 rounded-full`}>
                <TrendingUp size={12} />
                <span>{card.growth}</span>
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-extrabold text-navy">{card.value}</p>
            <p className="text-sm text-secondary-text mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-navy">دسترسی سریع</h2>
          <button className="text-xs text-dark-green font-medium hover:underline">
            مشاهده همه
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACCESS.map((item, i) => (
            <button
              key={i}
              className="group p-4 rounded-2xl border border-border hover:border-transparent
                         hover:card-shadow-hover transition-all duration-200 text-right"
            >
              <div className={`w-11 h-11 ${item.bgColor} rounded-2xl flex items-center justify-center ${item.iconColor}
                            mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-navy mb-1">{item.title}</h3>
              <p className="text-xs text-secondary-text leading-relaxed">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-navy">آمار ماهانه</h2>
              <p className="text-xs text-secondary-text mt-1">روند فعالیت پلتفرم در ۷ ماه گذشته</p>
            </div>
            <select className="text-xs bg-bg border border-border rounded-lg px-3 py-1.5 text-secondary-text">
              <option>۷ ماه اخیر</option>
              <option>۳ ماه اخیر</option>
              <option>۱ سال اخیر</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7253E8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7253E8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF4" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  orientation="left"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF4',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#7253E8"
                  strokeWidth={2.5}
                  fill="url(#colorStudents)"
                  name="دانش‌آموزان"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fill="url(#colorUsers)"
                  name="کاربران"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-green" />
              <span className="text-xs text-secondary-text">کاربران</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple" />
              <span className="text-xs text-secondary-text">دانش‌آموزان</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-navy">آخرین فعالیت‌ها</h2>
            <button className="text-xs text-dark-green font-medium hover:underline">همه</button>
          </div>
          <div className="space-y-4">
            {ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className={`w-2 h-2 ${activity.color} rounded-full`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy">
                    <span className="font-bold">{activity.user}</span>
                    <span className="text-secondary-text"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-secondary-text mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-l from-mint to-soft-yellow rounded-3xl p-6 lg:p-8 border border-border">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={20} className="text-dark-green" />
              <span className="text-xs font-bold text-dark-green">جمله انگیزشی</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold text-navy leading-relaxed">
              یادگیری، سفری است که هیچ‌وقت به پایان نمی‌رسد.
            </h2>
            <p className="text-sm text-secondary-text mt-2">
              هر روز یک فرصت جدید برای رشد و پیشرفت است.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/70 backdrop-blur rounded-2xl flex items-center justify-center">
              <Star size={28} className="text-orange" />
            </div>
            <div className="w-16 h-16 bg-white/70 backdrop-blur rounded-2xl flex items-center justify-center">
              <Heart size={28} className="text-primary-green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
