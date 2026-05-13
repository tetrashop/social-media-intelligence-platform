# پلتفرم هوشمند تحلیل شبکه‌های اجتماعی با تفکر عمیق  
**Social Media Intelligence Platform – Cognitive Chatbot & Deep Analysis**

## 🧠 چکیده علمی

این پلتفرم یک سامانه‌ی محاوره‌ای مبتنی بر هوش مصنوعی است که با بهره‌گیری از روش‌های **پردازش زبان طبیعی (NLP)**، **تحلیل احساس (Sentiment Analysis)**، **استخراج ویژگی‌های شخصیتی مبتنی بر مدل پنج‌بزرگ شخصیت (Big Five)** و یک **موتور چت هوشمند**، رفتار کاربران را در شبکه‌های اجتماعی تحلیل می‌کند.  
معماری پیشنهادی تلفیقی از **روش‌های کلاسیک یادگیری ماشین (طبقه‌بند بیز، TF-IDF)** و **مدل‌های زبانی بزرگ (LLM)** است و می‌تواند به‌صورت **تماماً محلی (بدون اینترنت)** یا **متصل به API دیپ‌سیک (DeepSeek)** فعالیت کند.  
هدف اصلی: **کاوش خودکار الگوهای شناختی و عاطفی از محتوای متنی** و ارائه‌ی تحلیل از طریق یک رابط چت طبیعی.

## 🔥 ویژگی‌های کلیدی

- **تحلیل احساس (Sentiment)** – نمره‌دهی عاطفی به متون با استفاده از واژگان AFINN و الگوریتم Natural Language Toolkit (NLTK برای جاوااسکریپت).
- **شخصیت‌شناسی خودکار** – تشخیص ۵ بُعد اصلی شخصیت (بازبودن به تجربه، وظیفه‌شناسی، برون‌گرایی، سازگاری، روان‌رنجوری) بر اساس تحلیل واژگان و نسبت‌های فراوانی.
- **طبقه‌بندی نیت کاربر (Intent Classification)** – استفاده از دسته‌بند بیز ساده برای تشخیص سلام، خداحافظی، درخواست تحلیل و غیره.
- **گفتگوی هوشمند** – پاسخ‌های متنی پویا با پشتیبانی از دو موتور:
  - **موتور محلی (Local NLP)** – با کتابخانه‌های خالص جاوااسکریپت (Natural، Compromise، Franc) بدون نیاز به اینترنت.
  - **موتور ابری (DeepSeek)** – با قرار دادن کلید API، پاسخ‌ها از مدل زبانی بزرگ دیپ‌سیک دریافت می‌شود.
- **معماری ماژولار و توسعه‌پذیر** – جداسازی سرویس‌های NLP، تحلیل شخصیت، و چت.
- **پایگاه داده سبک** – ذخیره‌سازی تاریخچه‌ی گفتگوها و تحلیل‌ها در SQLite (با استفاده از sql.js برای پایداری روی هر معماری).
- **رابط تحت وب واکنش‌گرا** – چت در مرورگر با HTML/CSS/JavaScript خالص.
- **استقرار آسان** – تنها با Node.js اجرا می‌شود و بدون نیاز به Docker یا سرویس‌های جانبی.

## 🧱 معماری فنی

```

client (browser)
│
▼
Express.js Server
├── routes/chat.js          ← API endpoints
├── services/
│   ├── ai-chat.js          ← مرکز فرمان: انتخاب موتور محلی/DeepSeek
│   ├── nlp-engine.js       ← تحلیل زبان (sentiment, POS, TF-IDF, زبان‌یابی)
│   └── personality-model.js ← پیش‌بینی ویژگی‌های شخصیتی
├── database.js             ← مدیریت SQLite (sql.js)
└── public/                 ← فایل‌های استاتیک (chat.html, index.html, admin.html)

```

**جریان داده:**
1. کاربر پیام را از طریق `POST /api/chat/message` ارسال می‌کند.
2. `routes/chat` پیام را در دیتابیس ذخیره کرده و به `ai-chat.js` می‌فرستد.
3. `ai-chat` ابتدا بررسی می‌کند که آیا کلید `DEEPSEEK_API_KEY` در `.env` تنظیم شده است یا خیر:
   - در صورت وجود ← درخواست به DeepSeek API ارسال و پاسخ برگردانده می‌شود.
   - در غیر این‌صورت ← از طبقه‌بند محلی برای تشخیص intent استفاده می‌کند.
4. اگر intent "analysis" باشد یا کلمه‌ی "تحلیل" در پیام وجود داشته باشد، `nlp-engine` و `personality-model` فعال شده و تحلیل کامل روان‌شناختی تولید می‌شود.
5. پاسخ (reply) و در صورت وجود تحلیل (analysis) به کاربر بازگردانده و در دیتابیس ذخیره می‌شود.

## 🛠️ تکنولوژی‌ها

| لایه | فناوری |
|------|--------|
| Backend | Node.js, Express |
| NLP | Natural (Tokenizer, SentimentAnalyzer, BayesClassifier, TfIdf) |
| Language Detection | Franc-min |
| POS Tagging | Compromise |
| Database | sql.js (SQLite compiled to JavaScript via Emscripten) |
| AI Model (optional) | DeepSeek API (یا هر مدل سازگار با OpenAI) |
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |

## 📦 پیش‌نیازها

- [Node.js](https://nodejs.org) نسخه ۱۶ یا بالاتر
- npm (همراه با Node.js نصب می‌شود)
- فضای خالی حدود ۲۰۰ مگابایت (در صورت استفاده از مدل محلی LLM جداگانه)

## ⚙️ نصب و راه‌اندازی

۱. مخزن را کلون کنید (اگر از قبل دارید، به‌روز کنید):

```bash
git clone https://github.com/tetrashop/social-media-intelligence-platform.git
cd social-media-intelligence-platform
```

۲. وابستگی‌ها را نصب کنید:

```bash
npm install
```

۳. (اختیاری) اگر کلید DeepSeek دارید، فایل .env بسازید:

```bash
echo 'DEEPSEEK_API_KEY=sk-xxxxxx' > .env
```

۴. سرور را اجرا کنید:

```bash
npm start
```

۵. در مرورگر به آدرس http://localhost:3000/chat بروید.

📡 API Endpoints

متد مسیر توضیحات
POST /api/chat/message ارسال پیام و دریافت پاسخ + تحلیل
POST /api/chat/analyze-post تحلیل یک پست شبکه اجتماعی با URL یا متن
GET /api/chat/history?sessionId=xxx بازیابی تاریخچه‌ی گفتگو

نمونه درخواست (curl)

```bash
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"I am feeling very creative and curious today","sessionId":"demo"}'
```

پاسخ (در حالت محلی):

```json
{
  "response": "🧠 تحلیل هوشمند: احساس: 0.40 | شخصیت غالب: openness | کلمات کلیدی: creative, curious, today",
  "analysis": {
    "nlp": {
      "language": "English",
      "sentiment": 0.4,
      ...
    },
    "personality": {
      "openness": 0.5,
      ...
    }
  }
}
```

🧪 تست‌ها

می‌توانید با استفاده از curl یا مرورگر سلامت سامانه را بررسی کنید.
همچنین با باز کردن http://localhost:3000/chat و تایپ عبارات زیر سناریوهای مختلف را بیازمایید:

· «سلام» → پاسخ خوش‌آمدگویی
· «کمک» → راهنما
· «تحلیل کن امروز خیلی خوشحالم» → تحلیل احساس و شخصیت
· «goodbye» → خداحافظی

🧠 توسعه‌دهندگان

· معمار و توسعه‌دهنده: رامین اجلال (Ramin Edjlal)
· همکار هوش مصنوعی: DeepSeek (مدل زبانی بزرگ)
· پلتفرم: Node.js + Termux (قابل اجرا روی گوشی‌های اندروید)

📜 مجوز

این پروژه تحت مجوز MIT منتشر شده است. برای اطلاعات بیشتر فایل LICENSE را ببینید.

🙏 تقدیر و تشکر

از تمامی کتابخانه‌های متن‌باز استفاده‌شده، از جمله Natural، sql.js، Franc و Compromise قدردانی می‌شود.
همچنین از جامعه‌ی Termux برای فراهم‌کردن محیط برنامه‌نویسی روی دستگاه‌های موبایل سپاسگزاریم.
