import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, FileText, ClipboardList, Calendar, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'سلام! من دستیار هوشمند معلم هستم. می‌توانم در موارد زیر کمکتان کنم:\n\n• طراحی درس و برنامه‌ریزی آموزشی\n• تولید سؤال و آزمون\n• ایجاد تکلیف و فعالیت کلاسی\n• تحلیل عملکرد دانش‌آموزان\n• خلاصه‌سازی محتوا\n• پیشنهاد روش‌های تدریس\n\nچطور می‌توانم کمکتان کنم؟',
    timestamp: 'الان',
  },
];

const QUICK_ACTIONS = [
  { icon: <FileText size={16} />, text: 'یک تکلیف برای فصل ۳ طراحی کن' },
  { icon: <ClipboardList size={16} />, text: '۱۰ سؤال چهارگزینه‌ای از مثلثات بساز' },
  { icon: <Calendar size={16} />, text: 'برنامه درس هفته آینده را پیشنهاد بده' },
  { icon: <Lightbulb size={16} />, text: 'روش تدریس خلاقانه برای مشتق' },
];

export default function TeacherAssistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: 'الان',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getTeacherResponse(input),
        timestamp: 'الان',
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-l from-pink-500 to-rose-500 flex items-center justify-center text-white">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">دستیار هوشمند معلم</h1>
            <p className="text-sm text-gray-500">کمک در طراحی درس، تولید محتوا و تحلیل کلاس</p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-emerald-200' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-400 mb-2">پیشنهادات:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => setInput(action.text)}
                  className="flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-full transition-colors"
                >
                  {action.icon}
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="درخواست خود را بنویسید..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400
                         placeholder:text-gray-400"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 bg-gradient-to-l from-emerald-500 to-teal-500 text-white rounded-xl
                         flex items-center justify-center hover:opacity-90 transition-opacity
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTeacherResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('تکلیف') || lowerInput.includes('فصل ۳')) {
    return `📝 پیشنهاد تکلیف برای فصل ۳:

**عنوان:** تمرین‌های کاربردی تابع و مشتق

**اهداف آموزشی:**
• تسلط بر مفهوم مشتق
• توانایی حل مسائل کاربردی
• درک ارتباط مشتق با نرخ تغییر

**ساختار تکلیف:**
۱. ۵ سؤال چهارگزینه‌ای (مفاهیم پایه)
۲. ۳ سؤال تشریحی (حل مسئله)
۳. ۲ مسئله کاربردی (زندگی واقعی)

**مهلت:** ۱ هفته
**بارم:** ۲۰ نمره

آیا می‌خواهید سؤالات را تولید کنم؟`;
  }

  if (lowerInput.includes('سؤال') || lowerInput.includes('مثلثات')) {
    return `✨ ۱۰ سؤال چهارگزینه‌ای از مثلثات:

**سطح دشواری:** متوسط
**زمان پیشنهادی:** ۲۰ دقیقه

۱. مقدار sin(30°) کدام است؟
   الف) 1/2  ب) √2/2  ج) √3/2  د) 1

۲. کدام اتحاد مثلثاتی صحیح است؟
   الف) sin²θ + cos²θ = 0
   ب) sin²θ + cos²θ = 1
   ج) sin²θ - cos²θ = 1
   د) tan²θ + 1 = sec²θ

... (۸ سؤال دیگر)

**پاسخنامه:**
۱-الف، ۲-ب، ...

آیا می‌خواهید سؤالات بیشتری اضافه کنم یا سطح دشواری را تغییر دهم؟`;
  }

  if (lowerInput.includes('برنامه') || lowerInput.includes('هفته')) {
    return `📅 برنامه درس هفته آینده:

**شنبه:**
• مرور فصل قبل (۱۵ دقیقه)
• معرفی موضوع جدید: حد و پیوستگی (۳۰ دقیقه)
• تمرین کلاسی (۱۵ دقیقه)

**دوشنبه:**
• حل تمرین‌های تکلیف (۲۰ دقیقه)
• ادامه مبحث حد (۲۵ دقیقه)
• کار گروهی (۱۵ دقیقه)

**چهارشنبه:**
• آزمون کوتاه (۱۵ دقیقه)
• رفع اشکال (۲۰ دقیقه)
• جمع‌بندی هفته (۱۰ دقیقه)

**تکالیف:**
• تمرین‌های صفحه ۸۵ تا ۹۰
• آماده‌سازی برای آزمون پنجشنبه

آیا نیاز به تغییر دارید؟`;
  }

  if (lowerInput.includes('روش') || lowerInput.includes('خلاقانه') || lowerInput.includes('مشتق')) {
    return `💡 روش‌های تدریس خلاقانه برای مشتق:

**۱. رویکرد بصری:**
• استفاده از نرم‌افزار GeoGebra برای نمایش گرافیکی
• نشان دادن شیب خط مماس به صورت دینامیک
• دانش‌آموزان خودشان شیب را محاسبه کنند

**۲. رویکرد کاربردی:**
• مثال از سرعت و شتاب در فیزیک
• نرخ تغییر دما در طول روز
• رشد جمعیت در زیست‌شناسی

**۳. رویکرد اکتشافی:**
• از دانش‌آموزان بخواهید الگو را کشف کنند
• شروع با مثال‌های ساده و رسیدن به فرمول
• کار گروهی برای حل مسائل چالشی

**۴. بازی‌وارسازی:**
• مسابقه محاسبه مشتق
• کارت‌های سؤال و پاسخ
• چالش‌های زمانی

کدام روش را می‌خواهید بیشتر توضیح دهم؟`;
  }

  return `درخواست شما را دریافت کردم. برای پاسخ دقیق‌تر، لطفاً مشخص کنید:

• کدام درس و مقطع تحصیلی؟
• هدف آموزشی چیست؟
• زمان موجود چقدر است؟
• سطح دانش‌آموزان چگونه است؟

با این اطلاعات می‌توانم پیشنهاد بهتری ارائه دهم.`;
}
