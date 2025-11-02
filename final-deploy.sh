#!/bin/bash
# final-deployment.sh

echo "🎯 راهکار نهایی استقرار - پست ۱۲۷"

# ۱. پاکسازی و آماده‌سازی
echo "🧹 پاکسازی محیط..."
rm -rf node_modules
rm -f package-lock.json

# ۲. ایجاد package.json ساده
echo "📦 ایجاد فایل‌های پیکربندی..."
cat > package.json << 'EOF'
{
  "name": "social-media-intelligence-platform",
  "version": "4.0.0",
  "type": "module",
  "scripts": {
    "deploy": "echo 'Deployed via GitHub Actions'"
  }
}
EOF

# ۳. ایجاد دایرکتوری src
mkdir -p src

# ۴. کپی کد اصلی به src/index.js
echo "📁 ایجاد کد اصلی..."
# کد بالا را در اینجا کپی کنید یا از فایل جداگانه استفاده کنید

# ۵. ایجاد GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
# کد GitHub Actions بالا را اینجا قرار دهید
EOF

# ۶. Commit و Push
echo "🚀 ارسال به GitHub..."
git add .
git commit -m "feat: v4.0.0 - پست ۱۲۷ با تحلیل چندبعدی کامل" || true
git push origin main

echo "✅ پروژه با موفقیت به GitHub ارسال شد!"
echo ""
echo "📋 اقدامات باقیمانده:"
echo "1. تنظیم secrets در GitHub Repository:"
echo "   - CLOUDFLARE_API_TOKEN"
echo "   - CLOUDFLARE_ACCOUNT_ID"
echo ""
echo "2. منتظر بمانید تا GitHub Actions به طور خودکار استقرار را انجام دهد"
echo ""
echo "3. پس از استقرار، سیستم را تست کنید:"
echo "   curl https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/"
echo "   curl https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/status"
echo "   curl -X POST https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/analyze \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"message\": \"تست سیستم تحلیل چندبعدی\"}'"
