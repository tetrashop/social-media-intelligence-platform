#!/bin/bash
echo "🚀 استقرار سریع پلتفرم تحلیل شبکه‌های اجتماعی"
echo "=============================================="

echo ""
echo "📋 فایل‌های آماده استقرار:"
echo "✅ cloudflare-worker.js - کور اصلی Cloudflare Worker"
echo "✅ wrangler.toml - تنظیمات استقرار" 
echo "✅ package.json - اطلاعات پکیج"
echo "✅ DEPLOYMENT_GUIDE.md - راهنمای کامل استقرار"
echo ""

echo "🎯 روش‌های استقرار:"
echo "1. 📱 آپلود مستقیم در Cloudflare Dashboard (سریع‌ترین)"
echo "2. 💻 استفاده از Wrangler روی کامپیوتر"
echo "3. 🔄 استقرار خودکار با GitHub Actions"
echo ""

echo "📦 فایل فشرده آماده شده: tetrashop-cloudflare-deployment.zip"
echo ""

echo "🔧 برای استقرار فوری، این مراحل را دنبال کنید:"
echo ""
echo "📱 روش آپلود مستقیم (پیشنهادی):"
echo "1. به https://dash.cloudflare.com بروید"
echo "2. Workers & Pages → Create application → Create Worker"
echo "3. محتوای فایل 'cloudflare-worker.js' را کپی کنید"
echo "4. روی Deploy کلیک کنید"
echo "5. آدرس worker شما خواهد بود: https://tetrashop-social-analytics.YOUR_NAME.workers.dev"
echo ""

echo "🌐 تست پس از استقرار:"
echo "curl -X POST https://tetrashop-social-analytics.YOUR_NAME.workers.dev/api/analyze \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"text\":\"تست سیستم\", \"platform\":\"telegram\"}'"
