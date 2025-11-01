#!/bin/bash
echo "📦 آماده‌سازی پروژه برای استقرار روی Cloudflare..."

# ایجاد فایل‌های ضروری
cat > package-deploy.json << 'PACKAGE_EOF'
{
  "name": "tetrashop-social-analytics",
  "version": "2.0.0",
  "main": "worker.js",
  "scripts": {
    "deploy": "wrangler deploy"
  }
}
PACKAGE_EOF

cat > wrangler-deploy.toml << 'WRANGLER_EOF'
name = "tetrashop-social-analytics"
compatibility_date = "2024-11-01"
compatibility_flags = ["nodejs_compat"]
main = "worker.js"
workers_dev = true

[vars]
ENVIRONMENT = "production"
VERSION = "2.0.0"
WRANGLER_EOF

echo "✅ فایل‌های استقرار ایجاد شدند!"
echo ""
echo "📋 مراحل استقرار:"
echo "1. فایل‌ها را به یک کامپیوتر با دسترسی به Wrangler انتقال دهید"
echo "2. دستورات زیر را اجرا کنید:"
echo "   npm install -g wrangler"
echo "   wrangler login"
echo "   wrangler deploy"
echo ""
echo "🌐 یا از GitHub Actions استفاده کنید"
