const http = require('http');

const API_URL = 'https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev';
const CHECK_INTERVAL = 60000; // هر 1 دقیقه
const ALERT_THRESHOLD = 3; // 3 خطای متوالی

let errorCount = 0;
let lastAlert = 0;

async function healthCheck() {
    try {
        console.log(`🕒 ${new Date().toLocaleString('fa-IR')} - چک سلامت...`);
        
        // تست وضعیت
        const statusResponse = await fetch(`${API_URL}/api/status`);
        const statusData = await statusResponse.json();
        
        if (statusData.status !== 'active') {
            throw new Error('وضعیت سیستم غیرفعال');
        }
        
        // تست تحلیل
        const analyzeResponse = await fetch(`${API_URL}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: 'تست سلامت خودکار سیستم مانیتورینگ',
                platform: 'telegram'
            })
        });
        
        const analyzeData = await analyzeResponse.json();
        
        if (!analyzeData.analysis_id) {
            throw new Error('تحلیل پاسخ معتبر نمی‌دهد');
        }
        
        errorCount = 0;
        console.log('✅ سیستم سالم - پاسخ‌دهی نرمال');
        
    } catch (error) {
        errorCount++;
        console.log(`❌ خطا در چک سلامت: ${error.message}`);
        console.log(`📊 تعداد خطاهای متوالی: ${errorCount}`);
        
        if (errorCount >= ALERT_THRESHOLD && Date.now() - lastAlert > 300000) {
            sendAlert(error.message);
        }
    }
}

function sendAlert(error) {
    lastAlert = Date.now();
    console.log(`🚨🚨🚨 ALERT: سیستم دچار مشکل شده است: ${error}`);
    // اینجا می‌توانید ایمیل، نوتیفیکیشن و... اضافه کنید
}

// شروع مانیتورینگ
console.log('🚀 شروع مانیتورینگ لحظه‌ای سیستم...');
setInterval(healthCheck, CHECK_INTERVAL);
healthCheck(); // اجرای فوری
