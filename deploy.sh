#!/bin/bash
echo "🚀 استقرار سیستم تحلیل NLP پست ۱۲۴"
echo "=================================="

# بررسی فایل‌های ضروری
if [ ! -f "worker.js" ]; then
    echo "❌ فایل worker.js وجود ندارد"
    exit 1
fi

# آپلود به GitHub
git add .
git commit -m "✅ رفع خطای سینتکس و تکمیل سیستم تحلیل NLP پست ۱۲۴"
git push origin main

echo "✅ استقرار انجام شد!"
echo "🌐 آدرس: https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev"
echo "📊 تست: ./test-nlp.sh"
echo "🏥 سلامت: ./system-health-check.sh"
