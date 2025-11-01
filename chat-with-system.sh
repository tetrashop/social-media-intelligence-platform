#!/bin/bash
echo "💬 سیستم محاوره‌ای پست ۱۲۵ - برای خروج 'exit' تایپ کنید"
echo "=========================================="

while true; do
    echo -n "👤 شما: "
    read user_message
    
    if [ "$user_message" = "exit" ] || [ "$user_message" = "خروج" ]; then
        echo "👋 خدانگهدار!"
        break
    fi
    
    echo "🔄 درحال ارسال به سامانه..."
    
    response=$(curl -s -X POST "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/chat/send" \
        -H "Content-Type: application/json" \
        -d "{
            \"room_id\": 125,
            \"message\": \"$user_message\",
            \"user_id\": \"terminal-user\"
        }")
    
    # استخراج پاسخ سامانه
    bot_response=$(echo "$response" | grep -o '"bot_response":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$bot_response" ]; then
        echo "🤖 سامانه: $bot_response"
    else
        echo "❌ خطا در دریافت پاسخ از سامانه"
        echo "پاسخ کامل: $response"
    fi
    
    echo "------------------------------------------"
done
