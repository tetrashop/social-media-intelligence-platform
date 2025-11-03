const fs = require('fs');

// خواندن فایل فعلی
let content = fs.readFileSync('src/index.js', 'utf8');

// اضافه کردن route برای پنل مدیریت
const adminRoute = `
// پنل مدیریت
if (url.pathname === '/admin' && request.method === 'GET') {
    return serveAdminPanel()
}

function serveAdminPanel() {
    const adminHtml = \`<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت - چت هوشمند</title>
    <style>
        body {
            font-family: Tahoma;
            direction: rtl;
            background: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #343a40;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: #007bff;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .menu-item {
            background: #28a745;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            transition: transform 0.2s;
        }
        .menu-item:hover {
            transform: translateY(-2px);
            background: #218838;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="header">
            <h1>🛠️ پنل مدیریت - چت هوشمند</h1>
            <p>سیستم مدیریت ربات هوشمند پست ۱۲۷</p>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <h3>📊 وضعیت سرویس</h3>
                <p>فعال ✅</p>
            </div>
            <div class="stat-card">
                <h3>🤖 نسخه ربات</h3>
                <p>هوشمند ۲.۰</p>
            </div>
            <div class="stat-card">
                <h3>🔗 endpoint ها</h3>
                <p>۳ endpoint فعال</p>
            </div>
        </div>

        <div class="menu">
            <a href="/" class="menu-item">
                🏠 صفحه اصلی چت
            </a>
            <a href="/chat" class="menu-item">
                💬 رابط چت
            </a>
            <a href="https://dash.cloudflare.com/" target="_blank" class="menu-item">
                ⚙️ Cloudflare Dashboard
            </a>
            <a href="https://github.com/tetrashop/social-media-intelligence-platform" target="_blank" class="menu-item">
                📦 GitHub Repository
            </a>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 8px;">
            <h3>📋 اطلاعات فنی</h3>
            <ul>
                <li><strong>پلتفرم:</strong> Cloudflare Workers</li>
                <li><strong>زبان:</strong> JavaScript</li>
                <li><strong>قابلیت‌ها:</strong> پاسخ هوشمند، تحلیل متن، گفتگوی context-aware</li>
                <li><strong>پست مربوطه:</strong> شماره ۱۲۷</li>
            </ul>
        </div>
    </div>
</body>
</html>\`;

    return new Response(adminHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
}
`;

// پیدا کردن محل مناسب برای اضافه کردن route
const routeInsertionPoint = content.indexOf('// Routeهای GET - سرو کردن frontend');
if (routeInsertionPoint !== -1) {
    // اضافه کردن route قبل از بخش GET
    content = content.substring(0, routeInsertionPoint) + adminRoute + content.substring(routeInsertionPoint);
    
    fs.writeFileSync('src/index.js', content);
    console.log('✅ پنل مدیریت اضافه شد');
    console.log('🌐 آدرس پنل مدیریت: https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/admin');
} else {
    console.log('❌ محل مناسب برای اضافه کردن پنل مدیریت پیدا نشد');
}
