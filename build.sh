#!/bin/bash
echo "🔨 شروع فرآیند build..."

# نصب وابستگی‌ها با فعال کردن optional
npm install --include=optional --production=false

# بررسی وجود wrangler
if [ -f "node_modules/.bin/wrangler" ]; then
    echo "✅ Wrangler پیدا شد"
    npx wrangler deploy
else
    echo "❌ Wrangler پیدا نشد - نصب مجدد..."
    npm install wrangler --include=optional
    npx wrangler deploy
fi
