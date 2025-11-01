#!/bin/bash

API_URL="https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev"

echo "🧠 پلتفرم تحلیل شبکه‌های اجتماعی"
echo "================================"

analyze_text() {
    local text="$1"
    local platform="${2:-telegram}"
    
    echo "📤 در حال ارسال برای تحلیل..."
    
    curl -s -X POST "$API_URL/api/analyze" \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"$text\", \"platform\":\"$platform\"}" \
        | python3 -c "
import json, sys
result = json.load(sys.stdin)
print('🎉 نتایج تحلیل:')
print(f'🆔 شناسه: {result.get(\"analysis_id\", \"N/A\")}')
print(f'📊 اطمینان: {result.get(\"confidence\", 0) * 100:.1f}%')
print(f'📱 پلتفرم: {result.get(\"platform\", \"N/A\")}')
print(f'⏰ زمان: {result.get(\"timestamp\", \"N/A\")}')
print('')
print('💡 بینش‌ها:')
for insight in result.get('insights', []):
    print(f'   • {insight}')
print('')
print('🎯 توصیه‌ها:')
for rec in result.get('recommendations', []):
    print(f'   • {rec}')
print('')
if 'metrics' in result:
    print('📈 معیارها:')
    metrics = result['metrics']
    print(f'   طول متن: {metrics.get(\"text_length\", 0)} کاراکتر')
    print(f'   تعداد کلمات: {metrics.get(\"word_count\", 0)}')
    print(f'   زمان پردازش: {metrics.get(\"processing_time\", \"N/A\")}')
"
}

check_status() {
    echo "🔍 بررسی وضعیت سیستم..."
    curl -s "$API_URL/api/status" | python3 -m json.tool
}

case "${1:-}" in
    "status")
        check_status
        ;;
    "analyze")
        if [ -z "${2:-}" ]; then
            echo "❌ لطفاً متن را وارد کنید:"
            echo "   Usage: $0 analyze \"متن شما\" [platform]"
            exit 1
        fi
        analyze_text "$2" "${3:-telegram}"
        ;;
    "interactive")
        echo "💬 حالت تعاملی"
        echo "لطفاً متن مورد نظر برای تحلیل را وارد کنید:"
        read -r text
        echo "پلتفرم (telegram/twitter/general):"
        read -r platform
        platform=${platform:-telegram}
        analyze_text "$text" "$platform"
        ;;
    *)
        echo "📖 راهنما:"
        echo "  $0 status               - بررسی وضعیت سیستم"
        echo "  $0 analyze \"متن\"       - تحلیل متن"
        echo "  $0 analyze \"متن\" twitter - تحلیل متن برای توییتر"
        echo "  $0 interactive          - حالت تعاملی"
        echo ""
        echo "🌐 آدرس سیستم: $API_URL"
        ;;
esac
