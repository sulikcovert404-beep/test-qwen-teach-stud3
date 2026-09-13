import React, { useState } from 'react';
import { Brain, Send, Sparkles, BookOpen, Lightbulb, RotateCcw, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'سلام! من دستیار هوشمند آموزشی تو هستم. می‌تونم در درس‌های مختلف کمکت کنم. سؤالت رو بپرس تا با هم حلش کنیم! 📚',
    timestamp: 'الان',
  },
];

const SUGGESTED_PROMPTS = [
  { icon: <BookOpen size={16} />, text: 'مفهوم مشتق رو توضیح بده' },
  { icon: <Lightbulb size={16} />, text: 'چند مثال از حرکت پرتابه بزن' },
  { icon: <Sparkles size={16} />, text: 'فرمول‌های مثلثات رو خلاصه کن' },
  { icon: <RotateCcw size={16} />, text: 'یه سؤال از فصل ۳ ریاضی بده' },
];

export default function AITutor() {
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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: 'الان',
        sources: ['ریاضی دهم - فصل ۳', 'کتاب درسی صفحه ۴۵'],
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-l from-violet-500 to-purple-500 flex items-center justify-center text-white">
            <Brain size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">دستیار هوشمند آموزشی</h1>
            <p className="text-sm text-gray-500">سؤال بپرس، توضیح بخواه، تمرین حل کن</p>
          </div>
          <div className="mr-auto flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
            <AlertCircle size={14} />
            <span>۳ سؤال باقیمانده امروز</span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                {msg.sources && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">منابع:</p>
                    {msg.sources.map((source, i) => (
                      <span key={i} className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded mr-1 mb-1">
                        {source}
                      </span>
                    ))}
                  </div>
                )}
                <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
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

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-400 mb-2">پیشنهادات:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(prompt.text)}
                  className="flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-full transition-colors"
                >
                  {prompt.icon}
                  <span>{prompt.text}</span>
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
              placeholder="سؤال خود را بنویسید..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400
                         placeholder:text-gray-400"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 bg-gradient-to-l from-violet-500 to-purple-500 text-white rounded-xl
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

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('مشتق') || lowerInput.includes('مشتق')) {
    return `مشتق یکی از مفاهیم اصلی حساب دیفرانسیل است.

📌 تعریف ساده:
مشتق یک تابع، نرخ تغییر لحظه‌ای آن تابع را نشان می‌دهد.

📐 فرمول:
f'(x) = lim(h→0) [f(x+h) - f(x)] / h

🔢 مثال:
اگر f(x) = x² باشد:
f'(x) = 2x

یعنی در نقطه x=3، نرخ تغییر = 6 است.

💡 کاربرد:
- پیدا کردن ماکزیمم و مینیمم
- رسم نمودار
- مسائل سرعت و شتاب

می‌خوای مثال بیشتری بزنم یا سؤال تمرینی حل کنیم؟`;
  }
  
  if (lowerInput.includes('مثلثات') || lowerInput.includes('مثلثاتی')) {
    return `📐 خلاصه فرمول‌های مثلثات:

🔹 نسبت‌های اصلی:
sin(θ) = مقابل / وتر
cos(θ) = مجاور / وتر  
tan(θ) = مقابل / مجاور

🔹 زوایای مهم:
sin(30°) = 1/2
sin(45°) = √2/2
sin(60°) = √3/2

🔹 اتحاد اصلی:
sin²(θ) + cos²(θ) = 1

🔹 فرمول جمع:
sin(a+b) = sin(a)cos(b) + cos(a)sin(b)
cos(a+b) = cos(a)cos(b) - sin(a)sin(b)

کدوم بخش رو بیشتر توضیح بدم؟`;
  }

  return `سؤال خوبی پرسیدی! بذار مرحله به مرحله بررسی کنیم.

برای پاسخ دقیق‌تر، لطفاً مشخص کن:
۱. کدام درس و فصل مد نظرت هست؟
۲. سطح سؤال (مقدماتی، متوسط، پیشرفته)
۳. آیا مثال عددی می‌خوای یا توضیح مفهومی؟

من اینجام که کمکت کنم! 📚`;
}
