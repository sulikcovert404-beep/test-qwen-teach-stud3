import React from 'react';
import {
  Users, School, BookOpen, UserCheck, Calendar, Sprout,
  Plus, FileText, MessageSquare, BarChart3, TrendingUp,
  Lightbulb, Star, Sparkles
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { CHART_DATA, ACTIVITIES } from '../components/NewDashboardLayout';

const KPI_CARDS = [
  {
    title: 'دانش‌آموزان',
    value: '۱٬۲۴۵',
    growth: '+۱۲٪',
    icon: <Users size={22} />,
    bgColor: 'bg-mint',
    iconColor: 'text-green',
    growthColor: 'text-green',
  },
  {
    title: 'مدارس',
    value: '۳۲',
    growth: '+۸٪',
    icon: <School size={22} />,
    bgColor: 'bg-lavender',
    iconColor: 'text-purple',
    growthColor: 'text-purple',
  },
  {
    title: 'کلاس‌های فعال',
    value: '۱۲۸',
    growth: '+۱۵٪',
    icon: <BookOpen size={22} />,
    bgColor: 'bg-soft-yellow',
    iconColor: 'text-orange',
    growthColor: 'text-orange',
  },
  {
    title: 'کاربران فعال',
    value: '۸۵',
    growth: '+۲۳٪',
    icon: <UserCheck size={22} />,
    bgColor: 'bg-soft-pink',
    iconColor: 'text-primary-pink',
    growthColor: 'text-primary-pink',
  },
];

const QUICK_ACCESS = [
  {
    title: 'ایجاد طرح جدید',
    description: 'طرح درس یا محتوای آموزشی بسازید',
    icon: <Plus size={22} />,
    bgColor: 'bg-soft-pink',
    iconColor: 'text-primary-pink',
  },
  {
    title: 'محتوا و درس‌ها',
    description: 'مدیریت محتوا و منابع درسی',
    icon: <BookOpen size={22} />,
    bgColor: 'bg-mint',
    iconColor: 'text-green',
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
    bgColor: 'bg-peach',
    iconColor: 'text-orange',
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
        {/* Hero Banner */}
        <div className="gradient-hero rounded-3xl p-6 lg:p-8 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-navy leading-tight">
                هر قدم کوچک،<br />
                آغاز یک موفقیت بزرگ!
              </h1>
              <p className="text-navy/70 mt-3 text-sm lg:text-base">
                با یادگیری امروز، آینده‌ی بهتری بساز
              </p>
              <button className="mt-5 gradient-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold
                               hover:opacity-90 transition-opacity shadow-lg shadow-primary-pink/20">
                شروع کنید
              </button>
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
          <div className="bg-white rounded-3xl p-5 card-shadow border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-soft-pink rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-primary-pink" />
              </div>
              <span className="text-xs text-gray-500">امروز</span>
            </div>
            <p className="text-sm font-bold text-navy">{today}</p>
            <p className="text-xs text-gray-500 mt-1">روز خوبی برای یادگیری!</p>
          </div>

          {/* Motivation Card */}
          <div className="bg-gradient-to-br from-mint to-light-blue rounded-3xl p-5 border border-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sprout size={18} className="text-green" />
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
            className="bg-white rounded-3xl p-5 card-shadow border border-gray-100
                       hover:card-shadow-hover transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${card.bgColor} rounded-2xl flex items-center justify-center ${card.iconColor}`}>
                {card.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${card.growthColor}`}>
                <TrendingUp size={12} />
                <span>{card.growth}</span>
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-extrabold text-navy">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-navy">دسترسی سریع</h2>
          <button className="text-xs text-primary-pink font-medium hover:underline">
            مشاهده همه
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACCESS.map((item, i) => (
            <button
              key={i}
              className="group p-4 rounded-2xl border border-gray-100 hover:border-transparent
                         hover:card-shadow-hover transition-all duration-200 text-right"
            >
              <div className={`w-11 h-11 ${item.bgColor} rounded-2xl flex items-center justify-center ${item.iconColor}
                            mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-navy mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 card-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-navy">آمار ماهانه</h2>
              <p className="text-xs text-gray-500 mt-1">روند فعالیت پلتفرم در ۷ ماه گذشته</p>
            </div>
            <select className="text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 text-gray-600">
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
                    <stop offset="5%" stopColor="#FF2E75" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF2E75" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1AAF73" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1AAF73" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
                  orientation="left"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #F3F4F6',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#1AAF73"
                  strokeWidth={2.5}
                  fill="url(#colorStudents)"
                  name="دانش‌آموزان"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#FF2E75"
                  strokeWidth={2.5}
                  fill="url(#colorUsers)"
                  name="کاربران"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-pink" />
              <span className="text-xs text-gray-600">کاربران</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green" />
              <span className="text-xs text-gray-600">دانش‌آموزان</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-3xl p-6 card-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-navy">آخرین فعالیت‌ها</h2>
            <button className="text-xs text-primary-pink font-medium hover:underline">همه</button>
          </div>
          <div className="space-y-4">
            {ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-9 h-9 ${activity.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`w-2 h-2 ${activity.color}-500 rounded-full`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy">
                    <span className="font-bold">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-l from-lavender to-soft-pink rounded-3xl p-6 lg:p-8 border border-white">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={20} className="text-purple" />
              <span className="text-xs font-bold text-purple">جمله انگیزشی</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold text-navy leading-relaxed">
              یادگیری، سفری است که هیچ‌وقت به پایان نمی‌رسد.
            </h2>
            <p className="text-sm text-navy/70 mt-2">
              هر روز یک فرصت جدید برای رشد و پیشرفت است.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/60 backdrop-blur rounded-2xl flex items-center justify-center">
              <Star size={28} className="text-orange" />
            </div>
            <div className="w-16 h-16 bg-white/60 backdrop-blur rounded-2xl flex items-center justify-center">
              <Sparkles size={28} className="text-primary-pink" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
