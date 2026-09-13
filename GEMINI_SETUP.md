# 🔮 راهنمای اتصال Gemini API

## 📋 وضعیت فعلی

در حال حاضر، AI از **Mock API** استفاده می‌کند (پاسخ‌های از پیش نوشته شده).  
برای اتصال به **Gemini API واقعی**، مراحل زیر را دنبال کنید.

---

## 🎯 مراحل اتصال Gemini API

### مرحله ۱: دریافت API Key

1. وارد [Google AI Studio](https://aistudio.google.com/) شوید
2. روی **"Get API Key"** کلیک کنید
3. یک API Key جدید بسازید
4. Key را کپی کنید (چیز شبیه `AIzaSy...`)

### مرحله ۲: نصب کتابخانه

```bash
npm install @google/generative-ai
```

### مرحله ۳: ایجاد فایل Gemini Service

فایل جدید `src/backend/gemini.ts` بسازید:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const geminiApi = {
  async chat(message: string, context: string = 'general'): Promise<string> {
    if (!genAI) {
      return 'API Key تنظیم نشده است. لطفاً VITE_GEMINI_API_KEY را در Environment Variables اضافه کنید.';
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      // System prompt based on context
      const systemPrompts: Record<string, string> = {
        tutor: 'تو یک دستیار آموزشی هوشمند هستی. به سؤالات دانش‌آموزان پاسخ بده.',
        teacher: 'تو یک دستیار معلم هستی. در طراحی درس و تولید محتوا کمک کن.',
        summarizer: 'متن‌های طولانی را خلاصه کن و نکات کلیدی را استخراج کن.',
        question_generator: 'سؤالات آموزشی چهارگزینه‌ای و تشریحی تولید کن.',
      };

      const systemPrompt = systemPrompts[context] || systemPrompts.tutor;
      
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'model',
            parts: [{ text: 'متوجه شدم. آماده کمک هستم.' }],
          },
        ],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'متأسفانه خطایی در ارتباط با AI رخ داد. لطفاً دوباره تلاش کنید.';
    }
  },

  async generateQuestions(topic: string, count: number): Promise<any[]> {
    if (!genAI) {
      return [];
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        ${count} سؤال آموزشی درباره "${topic}" تولید کن.
        
        برای هر سؤال:
        - نوع: چهارگزینه‌ای یا تشریحی
        - سؤال: متن سؤال
        - گزینه‌ها: (برای چهارگزینه‌ای)
        - پاسخ: پاسخ صحیح
        - سطح: آسان، متوسط، یا سخت
        
        خروجی را به صورت JSON آرایه برگردان.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('Gemini API error:', error);
      return [];
    }
  },

  async summarize(text: string): Promise<string> {
    if (!genAI) {
      return 'API Key تنظیم نشده است.';
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `متن زیر را خلاصه کن و نکات کلیدی را استخراج کن:\n\n${text}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'خطا در خلاصه‌سازی متن.';
    }
  },
};
```

### مرحله ۴: به‌روزرسانی API Client

فایل `src/backend/api.ts` را ویرایش کنید:

```typescript
// در بالای فایل اضافه کنید:
import { geminiApi } from './gemini';

// بخش AI API را جایگزین کنید:
export const aiApi = {
  async chat(message: string, context: string = 'general'): Promise<string> {
    await delay(1500);
    tenantApi.checkAuth();
    
    // استفاده از Gemini API واقعی
    return await geminiApi.chat(message, context);
  },

  async generateQuestions(topic: string, count: number): Promise<any[]> {
    await delay(2000);
    tenantApi.checkAuth();
    tenantApi.checkRole(['TEACHER']);
    
    // استفاده از Gemini API واقعی
    return await geminiApi.generateQuestions(topic, count);
  },

  async summarize(text: string): Promise<string> {
    await delay(2000);
    tenantApi.checkAuth();
    
    // استفاده از Gemini API واقعی
    return await geminiApi.summarize(text);
  },
};
```

### مرحله ۵: اضافه کردن Environment Variable

فایل `.env.local` بسازید (در ریشه پروژه):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**مهم:** فایل `.env.local` را در `.gitignore` اضافه کنید!

```gitignore
# .gitignore
.env.local
.env
```

### مرحله ۶: اضافه کردن به Vercel/Cloudflare

#### Vercel:
1. وارد Dashboard Vercel شوید
2. پروژه خود را انتخاب کنید
3. **Settings** → **Environment Variables**
4. اضافه کنید:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** `your_actual_api_key`
5. **Save** و **Redeploy**

#### Cloudflare Pages:
1. وارد Dashboard Cloudflare شوید
2. پروژه Pages خود را انتخاب کنید
3. **Settings** → **Environment Variables**
4. اضافه کنید:
   - **Variable name:** `VITE_GEMINI_API_KEY`
   - **Value:** `your_actual_api_key`
5. **Save** و **Redeploy**

---

## 🔒 امنیت API Key

### ❌ هرگز این کارها را نکنید:
- API Key را در کد hardcode نکنید
- API Key را در Git commit نکنید
- API Key را در console.log نمایش ندهید
- API Key را در localStorage ذخیره نکنید

### ✅ این کارها را انجام دهید:
- از Environment Variables استفاده کنید
- فایل `.env.local` را در `.gitignore` بگذارید
- API Key را فقط در Server-side استفاده کنید (در Production)
- Rate limiting تنظیم کنید

---

## 💰 هزینه Gemini API

### Free Tier:
- **60 requests per minute**
- **1,500 requests per day**
- **مناسب برای تست و توسعه**

### Paid Tier:
- **$0.00025 per 1,000 tokens** (input)
- **$0.0005 per 1,000 tokens** (output)
- **مناسب برای Production**

### تخمین هزینه ماهانه:
- **۱۰۰ کاربر فعال:** ~$5-10/ماه
- **۱,۰۰۰ کاربر فعال:** ~$50-100/ماه
- **۱۰,۰۰۰ کاربر فعال:** ~$500-1,000/ماه

---

## 🧪 تست Gemini API

بعد از تنظیم، تست کنید:

1. وارد داشبورد دانش‌آموز شوید
2. روی "دستیار هوشمند" کلیک کنید
3. یک سؤال بپرسید: "مشتق چیست؟"
4. باید پاسخ واقعی از Gemini دریافت کنید

---

## 🆘 مشکلات رایج

### مشکل: "API Key not found"
**راه‌حل:** 
- بررسی کنید `VITE_GEMINI_API_KEY` در Environment Variables هست
- پروژه را Redeploy کنید
- Cache مرورگر را پاک کنید

### مشکل: "Rate limit exceeded"
**راه‌حل:**
- از Free Tier به Paid Tier ارتقا دهید
- Rate limiting در Backend اضافه کنید
- Caching را پیاده‌سازی کنید

### مشکل: "Invalid API Key"
**راه‌حل:**
- API Key را دوباره از Google AI Studio بگیرید
- بررسی کنید Key درست کپی شده
- پروژه را Redeploy کنید

---

## 📚 منابع مفید

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [@google/generative-ai NPM](https://www.npmjs.com/package/@google/generative-ai)
- [Gemini API Pricing](https://ai.google.dev/pricing)

---

## ✅ چک‌لیست نهایی

- [ ] API Key از Google AI Studio دریافت شده
- [ ] کتابخانه `@google/generative-ai` نصب شده
- [ ] فایل `src/backend/gemini.ts` ساخته شده
- [ ] فایل `src/backend/api.ts` به‌روزرسانی شده
- [ ] Environment Variable `VITE_GEMINI_API_KEY` اضافه شده
- [ ] در `.gitignore` اضافه شده
- [ ] در Vercel/Cloudflare تنظیم شده
- [ ] تست شده و کار می‌کند

---

<div dir="rtl">

## 🎉 موفق باشید!

با این راهنما، می‌توانید Gemini API را به پروژه متصل کنید و AI واقعی داشته باشید.

</div>
