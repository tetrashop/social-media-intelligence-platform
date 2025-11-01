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
