#!/bin/bash
echo "🚀 شروع دیپلوی کاملاً اتوماتیک..."
echo "⏰ زمان باقیمانده: ۱۰ دقیقه"

cd ~/natiq-app/Anti-Fragmentation-System

# پاکسازی کامل
rm -f *.sh *.md *.log *.txt
git reset --hard HEAD

# ایجاد فایل‌های ضروری
cat > wrangler.toml << 'EOF'
name = "anti-fragmentation-system"
compatibility_date = "2024-11-03"
main = "worker.js"
compatibility_flags = ["nodejs_compat"]
