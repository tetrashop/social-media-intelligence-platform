#!/bin/bash
API_URL="https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev"

echo "🎯 تست سریع سیستم محاوره‌ای"
echo "ارسال پیام: $1"

response=$(curl -s -X POST "$API_URL/api/chat/send" \
  -H "Content-Type: application/json" \
  -d "{
    \"room_id\": 125,
    \"message\": \"$1\",
    \"user_id\": \"quick-test\"
  }")

echo "📨 پاسخ سامانه:"
echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
