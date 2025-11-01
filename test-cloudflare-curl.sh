#!/bin/bash

echo "🌐 تست Cloudflare Worker با curl"
echo "================================"

echo ""
echo "1. 🔍 تست GET /api/status:"
curl -s "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/status"
echo ""
echo ""

echo "2. 📊 تست POST /api/nlp/analyze:"
curl -X POST "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/nlp/analyze" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "text": "این یک تست از سیستم تحلیل NLP پست شماره ۱۲۴ است. سیستم باید بتواند متن فارسی را تحلیل کند.",
    "post_id": 124
  }' \
  -w "\n\n⏱️ کد وضعیت: %{http_code}\n"

echo ""
echo "3. ❌ تست خطا (متن خالی):"
curl -X POST "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/nlp/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "", "post_id": 124}' \
  -w "\n⏱️ کد وضعیت: %{http_code}\n"

echo ""
echo "✅ تست کامل شد!"
