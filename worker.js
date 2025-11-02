// worker.js - نسخه نهایی و تضمینی
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log('🔍 درخواست دریافت شده برای:', path);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 🏠 صفحه اصلی
      if (path === '/' || path === '') {
        return new Response(createHomePage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 💬 صفحه چت
      if (path === '/chat') {
        return new Response(createChatPage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 🎯 پنل مدیریت
      if (path === '/admin') {
        return new Response(createAdminPage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 📊 وضعیت API
      if (path === '/api/chat/status') {
        return new Response(JSON.stringify({
          status: 'active',
          service: 'chat_system', 
          version: '3.0.0',
          timestamp: new Date().toISOString()
        }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      // 🔌 API چت
      if (path === '/api/chat/send' && request.method === 'POST') {
        const { message, user_id = 'guest' } = await request.json();
        
        let response = "سلام! سیستم محاوره‌ای فعال است. 😊";
        if (message.includes('سلام')) response = "سلام عزیز! خوش آمدید 🌟";
        if (message.includes('چطور')) response = "سیستم کاملاً فعال و آماده خدمت‌رسانی است!";
        if (message.includes('تحلیل')) response = "من می‌توانم در تحلیل محتوای متنی کمک کنم.";

        return new Response(JSON.stringify({
          success: true,
          user_message: message,
          bot_response: response,
          user_id: user_id,
          timestamp: new Date().toISOString()
        }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      // ❌ صفحه یافت نشد
      return new Response(createNotFoundPage(path), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'خطای سرور',
        path: path,
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};

function createHomePage() {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>سامانه محاوره‌ای - نسخه ۳.۰</title>
    <style>
        body { font-family: Tahoma; direction: rtl; background: #667eea; color: white; margin: 0; padding: 40px; text-align: center; }
        .container { max-width: 600px; margin: 0 auto; background: white; color: #333; padding: 40px; border-radius: 15px; }
        .btn { display: inline-block; padding: 15px 30px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; }
        .status { background: #28a745; color: white; padding: 10px 20px; border-radius: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 سامانه محاوره‌ای هوشمند</h1>
        <div class="status">✅ نسخه ۳.۰ - فعال و پایدار</div>
        <p>سیستم تحلیل محتوای پیشرفته - پست ۱۲۵</p>
        <div style="margin: 30px 0;">
            <a href="/chat" class="btn">💬 شروع چت</a>
            <a href="/admin" class="btn">🎯 پنل مدیریت</a>
        </div>
    </div>
</body>
</html>`;
}

function createChatPage() {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>چت هوشمند</title>
    <style>
        body { font-family: Tahoma; direction: rtl; padding: 20px; background: #74b9ff; }
        .chat-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 15px; padding: 30px; }
    </style>
</head>
<body>
    <div class="chat-container">
        <h1>💬 چت هوشمند</h1>
        <p>سیستم محاوره‌ای فعال و آماده است</p>
        <p>🔧 برای تست از API استفاده کنید:</p>
        <code>POST /api/chat/send</code>
    </div>
</body>
</html>`;
}

function createAdminPage() {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>پنل مدیریت</title>
    <style>
        body { font-family: Tahoma; direction: rtl; padding: 20px; background: #667eea; color: #333; }
        .admin-container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 15px; padding: 30px; }
    </style>
</head>
<body>
    <div class="admin-container">
        <h1>🎯 پنل مدیریت</h1>
        <p>سیستم مدیریت فعال است</p>
        <p>📊 وضعیت: <span style="color: green;">فعال ✅</span></p>
    </div>
</body>
</html>`;
}

function createNotFoundPage(path) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>صفحه یافت نشد</title>
</head>
<body>
    <h1>۴۰۴ - صفحه یافت نشد</h1>
    <p>مسیر "${path}" وجود ندارد</p>
    <a href="/">بازگشت به صفحه اصلی</a>
</body>
</html>`;
        }
