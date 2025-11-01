#!/bin/bash

BACKUP_DIR="./backups"
CONFIG_FILES=("wrangler.toml" "package.json" "advanced-worker.js")
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "💾 شروع سیستم بک‌آپ فوری..."

# ایجاد پوشه بک‌آپ
mkdir -p "$BACKUP_DIR"

# بک‌آپ فایل‌های پیکربندی
for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/${file}.backup_$TIMESTAMP"
        echo "✅ بک‌آپ $file ایجاد شد"
    else
        echo "⚠️  فایل $file یافت نشد"
    fi
done

# ایجاد اسنپ‌شات از وضعیت سیستم
curl -s "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/status" > "$BACKUP_DIR/system_status_$TIMESTAMP.json"

# ایجاد گزارش بک‌آپ
cat > "$BACKUP_DIR/backup_report_$TIMESTAMP.md" << REPORT
# گزارش بک‌آپ سیستم
- تاریخ: $(date)
- وضعیت: ✅ موفق
- فایل‌های بک‌آپ شده: ${#CONFIG_FILES[@]}
- وضعیت سیستم: $(cat "$BACKUP_DIR/system_status_$TIMESTAMP.json" | python3 -c "import json,sys; print(json.load(sys.stdin)['status'])")

## فایل‌های بک‌آپ:
$(for file in "${CONFIG_FILES[@]}"; do echo "- $file.backup_$TIMESTAMP"; done)

## دستور بازیابی:
\`\`\`bash
./restore-system.sh $TIMESTAMP
\`\`\`
REPORT

echo "🎉 بک‌آپ کامل شد: $BACKUP_DIR/backup_report_$TIMESTAMP.md"

# ایجاد اسکریپت بازیابی
cat > restore-system.sh << 'RESTORE'
#!/bin/bash
BACKUP_TIMESTAMP=${1:-latest}

echo "🔄 شروع بازیابی از بک‌آپ: $BACKUP_TIMESTAMP"

if [ "$BACKUP_TIMESTAMP" = "latest" ]; then
    BACKUP_TIMESTAMP=$(ls backups/*.backup_* 2>/dev/null | grep -o '[0-9_]\+$' | sort | tail -1)
fi

for file in wrangler.toml package.json advanced-worker.js; do
    if [ -f "backups/${file}.backup_$BACKUP_TIMESTAMP" ]; then
        cp "backups/${file}.backup_$BACKUP_TIMESTAMP" "$file"
        echo "✅ $file بازیابی شد"
    fi
done

echo "🎉 بازیابی کامل شد"
RESTORE

chmod +x restore-system.sh
