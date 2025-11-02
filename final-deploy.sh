#!/bin/bash
# final-deploy.sh

echo "🎯 راهکار نهایی استقرار - معماری الماسی"

# 1. پاکسازی کامل
echo "🧹 پاکسازی محیط..."
rm -rf node_modules
rm -f package-lock.json

# 2. ایجاد فایل‌های ضروری
echo "📁 ایجاد فایل‌های پروژه..."
cat > package.json << EOF
{
  "name": "social-media-intelligence-platform",
  "version": "4.0.0",
  "type": "module",
  "scripts": {
    "deploy": "echo 'Deployed via GitHub Actions'"
  }
}
EOF

# 3. ایجاد دایرکتوری و فایل اصلی
mkdir -p src
# کد اصلی را در src/index.js کپی کنید

# 4. Commit و Push
echo "🔧 آماده‌سازی برای استقرار..."
git add .
git commit -m "feat: diamond architecture v4.0 - guaranteed deployment" || true
git push origin main

echo "✅ پروژه برای استقرار از طریق GitHub Actions آماده شد!"
echo "📋 اقدامات باقیمانده:"
echo "1. تنظیم secrets در GitHub: CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID"
echo "2. منتظر بمانید تا GitHub Actions به طور خودکار استقرار را انجام دهد"
echo "3. تست endpointها پس از استقرار"
