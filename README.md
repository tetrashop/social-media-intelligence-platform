# **نگار کوانتا: پلتفرم هوشمند تحلیل شبکه‌های اجتماعی با یادگیری عمیق**
### **Negare Quanta: Social Media Intelligence Platform with Deep Learning**

<div align="center">

[![Live on Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://social-media-intelligence-platform.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

## 📜 چکیده علمی
نگار کوانتا یک سامانهٔ محاوره‌ای مبتنی بر هوش مصنوعی است که با ترکیب **شبکه‌های عصبی مصنوعی** و **قوانین دستی قدرتمند**، به تحلیل خودکار احساس و شخصیت در متون فارسی و انگلیسی می‌پردازد. معماری پیشنهادی کاملاً **مستقل از سرویس‌های خارجی** بوده و می‌تواند به‌صورت **تماماً محلی** یا **مستقر روی Vercel** فعالیت کند.

## 🔥 ویژگی‌های کلیدی
- **یادگیری عمیق دوگانه:** شبکهٔ عصبی MLP (بارگذاری فقط، بدون آموزش در لحظه) + قوانین دستی
- **تحلیل احساس و شخصیت دوزبانه** با واژگان گستردهٔ فارسی و انگلیسی
- **زمان پاسخ زیر ۲۰ میلی‌ثانیه** روی Vercel
- **رابط کاربری مدرن** با انیمیشن تایپینگ
- **قابلیت یادگیری پیوسته** از طریق endpoint `/train`

## ⚙️ نصب و راه‌اندازی
```bash
git clone https://github.com/tetrashop/social-media-intelligence-platform.git
cd social-media-intelligence-platform
npm install
npm start
```

🌐 استقرار روی Vercel

تنظیمات در vercel.json موجود است. کافیست مخزن را در Vercel import کنید و با یک کلیک دیپلوی شود.

📡 API Endpoints

· POST /api/chat/message – ارسال پیام و دریافت پاسخ
· POST /api/chat/train – آموزش مدل با داده‌های جدید

🧑‍💻 توسعه‌دهنده

رامین اجلال – tetrashop

📜 مجوز

MIT License
