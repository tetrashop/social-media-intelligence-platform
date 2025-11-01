#!/bin/bash
echo "🔍 تست سلامت سیستم..."
curl -s "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/chat/status"

echo -e "\n\n💬 تست محاوره..."
curl -X POST "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/chat/send" \
  -H "Content-Type: application/json" \
  -d '{"room_id":125, "message":"سلام سیستم محاوره!", "user_id":"tester"}'
