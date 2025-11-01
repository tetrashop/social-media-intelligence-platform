#!/bin/bash
echo "🧪 تست سیستم Cloudflare Worker"
echo "==============================="

# تست وضعیت سیستم
echo "📊 تست وضعیت سیستم..."
curl -s https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/status | python3 -m json.tool

echo ""
echo "🔍 تست تحلیل محتوا..."
curl -s -X POST https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "این یک تست از سیستم تحلیل محتوای فارسی است. سیستم با موفقیت روی Cloudflare مستقر شده است.",
    "platform": "telegram"
  }' | python3 -m json.tool

echo ""
echo "✅ تست کامل شد!"
