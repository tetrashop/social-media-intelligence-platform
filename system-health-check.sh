#!/bin/bash
echo "🏥 تست سلامت سریع سیستم"
echo "========================"

# بررسی دایرکتوری فعلی
echo "📁 دایرکتوری فعلی: $(pwd)"
echo "📋 فایل‌های موجود:"
ls -la *.js *.html *.sh 2>/dev/null | head -10

# تست اتصال اینترنت
echo ""
echo "🌐 تست اتصال اینترنت:"
ping -c 2 google.com > /dev/null && echo "✅ اینترنت متصل" || echo "❌ مشکل اتصال"

# تست Cloudflare Worker
echo ""
echo "🔗 تست Cloudflare Worker:"
curl -s "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/status" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print('✅ Worker فعال - نسخه:', data.get('version', 'نامشخص'))
except:
    print('❌ Worker غیرفعال')
"

# تست پورت‌ها
echo ""
echo "🔌 بررسی پورت‌ها:"
echo "پورت 8081: $(netstat -tuln 2>/dev/null | grep :8081 > /dev/null && echo 'مشغول' || echo 'آزاد')"
echo "پورت 3000: $(netstat -tuln 2>/dev/null | grep :3000 > /dev/null && echo 'مشغول' || echo 'آزاد')"

echo ""
echo "🎯 وضعیت: سیستم نیاز به راه‌اندازی دارد"
