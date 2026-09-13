import React, { useState } from 'react';
import {
  Bell, Check, CheckCheck, FileText, ClipboardList,
  MessageSquare, Award, AlertCircle, Trash2, Filter
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'assignment' | 'exam' | 'message' | 'result' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'تکلیف جدید اضافه شد',
    description: 'تمرین‌های فصل ۳ ریاضی — مهلت: ۱۴ بهمن',
    time: '۱۰ دقیقه پیش',
    read: false,
  },
  {
    id: '2',
    type: 'result',
    title: 'نتیجه آزمون ثبت شد',
    description: 'نمره آزمون فیزیک: ۱۷.۵ از ۲۰',
    time: '۲ ساعت پیش',
    read: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'پیام از معلم',
    description: 'مریم احمدی: لطفاً تمرین‌های اضافی را حل کنید.',
    time: '۵ ساعت پیش',
    read: true,
  },
  {
    id: '4',
    type: 'exam',
    title: 'یادآوری آزمون',
    description: 'آزمون میان‌ترم ریاضی فردا ساعت ۱۰ صبح',
    time: 'دیروز',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'به‌روزرسانی پلتفرم',
    description: 'قابلیت جدید Podcast Creator اضافه شد!',
    time: '۲ روز پیش',
    read: true,
  },
  {
    id: '6',
    type: 'assignment',
    title: 'مهلت تکلیف نزدیک است',
    description: 'گزارش آزمایش فیزیک — ۲۴ ساعت باقیمانده',
    time: '۲ روز پیش',
    read: true,
  },
  {
    id: '7',
    type: 'result',
    title: 'تکلیف تصحیح شد',
    description: 'نمره تمرین فصل ۲: ۱۸.۵ از ۲۰',
    time: '۳ روز پیش',
    read: true,
  },
];

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  assignment: { icon: <FileText size={18} />, color: 'bg-blue-100 text-blue-600' },
  exam: { icon: <ClipboardList size={18} />, color: 'bg-amber-100 text-amber-600' },
  message: { icon: <MessageSquare size={18} />, color: 'bg-purple-100 text-purple-600' },
  result: { icon: <Award size={18} />, color: 'bg-emerald-100 text-emerald-600' },
  system: { icon: <AlertCircle size={18} />, color: 'bg-gray-100 text-gray-600' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Bell size={28} className="text-amber-500" />
          اعلان‌ها
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <CheckCheck size={16} />
            <span>خواندن همه</span>
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter size={14} />
          <span>همه ({notifications.length})</span>
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>خوانده‌نشده ({unreadCount})</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Bell size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">اعلانی وجود ندارد</p>
          </div>
        ) : (
          filtered.map((notification) => {
            const config = TYPE_CONFIG[notification.type];
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer ${
                  notification.read ? 'border-gray-200 opacity-75' : 'border-blue-200 bg-blue-50/30'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">{notification.description}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{notification.time}</span>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}
                            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Check size={12} />
                            <span>خوانده شد</span>
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                          className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
