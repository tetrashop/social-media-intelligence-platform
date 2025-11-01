#!/bin/bash

echo "🚀 در حال راه‌اندازی سرورهای تحلیل شبکه‌های اجتماعی..."

# متوقف کردن سرورهای قدیمی
echo "⏹️  متوقف کردن سرورهای قبلی..."
pkill -f "web-interface.js" 2>/dev/null
pkill -f "http.server" 2>/dev/null
pkill -f "main-with-port.cjs" 2>/dev/null

sleep 2

# راه‌اندازی API وب
echo "🔧 راه‌اندازی API وب روی پورت 3003..."
node web-interface.js &
API_PID=$!

sleep 3

# راه‌اندازی سرور فایل
echo "📁 راه‌اندازی سرور فایل روی پورت 8000..."
python3 -m http.server 8000 &
WEB_PID=$!

sleep 2

# بررسی وضعیت
echo ""
echo "✅ راه‌اندازی کامل شد!"
echo "📊 آدرس‌های دسترسی:"
echo "   - رابط کاربری: http://localhost:8000/beautiful-dashboard.html"
echo "   - API: http://localhost:3003/status"
echo ""
echo "🔍 بررسی وضعیت سرورها:"
curl -s http://localhost:3003/status | python3 -m json.tool 2>/dev/null && echo "✅ API فعال" || echo "❌ API غیرفعال"
curl -s http://localhost:8000/ > /dev/null 2>&1 && echo "✅ سرور وب فعال" || echo "❌ سرور وب غیرفعال"

echo ""
echo "⏹️  برای متوقف کردن سرورها از: pkill -f 'node\\|python' استفاده کنید"
