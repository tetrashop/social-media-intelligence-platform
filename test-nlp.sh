#!/bin/bash

echo "🧪 تست پیشرفته تحلیل NLP پست ۱۲۴"
echo "================================"
echo ""

# تست ۱: تحلیل متن ساده
echo "1. 🔍 تست متن ساده:"
curl -X POST "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/nlp/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "این یک نمونه متن فارسی برای تحلیل احساسات و استخراج کلمات کلیدی در پست شماره ۱۲۴ است.",
    "post_id": 124
  }' | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print('✅ موفق - احساسات:', data.get('sentiment', 'N/A'))
    print('   کلمات کلیدی:', ', '.join(data.get('keywords', [])))
    print('   اطمینان:', data.get('confidence', 'N/A'))
except Exception as e:
    print('❌ خطا:', str(e))
"

echo ""

# تست ۲: تحلیل متن پیچیده
echo "2. 🔬 تست متن پیچیده:"
curl -X POST "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/nlp/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "سیستم تحلیل محتوای فارسی باید بتواند متون مختلف را با دقت بالا پردازش کند. این پلتفرم برای تحلیل پست شماره ۱۲۴ طراحی شده و می‌تواند در شناسایی الگوهای زبانی کمک کند. امیدوارم نتایج دقیقی ارائه دهد.",
    "post_id": 124
  }' | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print('✅ موفق - پیچیدگی:', data.get('complexity', 'N/A'))
    print('   تعداد کلمات:', data.get('word_count', 'N/A'))
    print('   زبان:', data.get('language', 'N/A'))
except Exception as e:
    print('❌ خطا:', str(e))
"

echo ""

# تست ۳: بررسی وضعیت سیستم
echo "3. 📊 وضعیت سیستم:"
curl -s "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/status" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print('✅ وضعیت:', data.get('status', 'N/A'))
    print('   نسخه:', data.get('version', 'N/A'))
    print('   پست:', data.get('post_id', 'N/A'))
except Exception as e:
    print('❌ خطا:', str(e))
"

echo ""
echo "🎉 تست تحلیل NLP پست ۱۲۴ کامل شد!"
echo "🌐 برای استفاده: http://localhost:8081/chat-interface.html"
