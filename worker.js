export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log('📨 درخواست برای:', path);
    
    const htmlResponse = (content) => new Response(content, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
    const jsonResponse = (data) => new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    // 🏠 صفحه اصلی
    if (path === '/' || path === '') {
      return htmlResponse(`
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
          <meta charset="UTF-8">
          <title>سامانه محاوره‌ای - فعال</title>
          <style>
            body { font-family: Tahoma; direction: rtl; text-align: center; padding: 50px; background: #667eea; color: white; }
            .container { max-width: 600px; margin: 0 auto; background: white; color: #333; padding: 40px; border-radius: 15px; }
            .btn { display: inline-block; padding: 15px 30px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; }
            .status { background: #28a745; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 سامانه محاوره‌ای هوشمند</h1>
            <div class="status">✅ سیستم کاملاً فعال</div>
            <p>نسخه نهایی - پست ۱۲۵</p>
            <div style="margin: 30px 0;">
              <a href="/chat" class="btn">💬 رفتن به چت</a>
              <a href="/admin" class="btn">🎯 پنل مدیریت</a>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
              <h3>📞 تست سریع API</h3>
              <p>curl -X POST https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/chat/send</p>
            </div>
          </div>
        </body>
        </html>
      `);
    }

    // 💬 صفحه چت
    if (path === '/chat') {
      return htmlResponse(`
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
          <meta charset="UTF-8">
          <title>سیستم چت</title>
          <style>
            body { font-family: Tahoma; direction: rtl; padding: 40px; background: #74b9ff; }
            .chat-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px; }
          </style>
        </head>
        <body>
          <div class="chat-container">
            <h1>💬 سیستم چت محاوره‌ای</h1>
            <div style="background: #28a745; color: white; padding: 15px; border-radius: 10px; margin: 20px 0;">
              ✅ سیستم چت فعال و آماده است
            </div>
            <p>برای تست از API زیر استفاده کنید:</p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; font-family: monospace;">
              POST /api/chat/send
            </div>
            <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">بازگشت به صفحه اصلی</a>
          </div>
        </body>
        </html>
      `);
    }

    // 🎯 پنل مدیریت
    if (path === '/admin') {
      return htmlResponse(`
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
          <meta charset="UTF-8">
          <title>پنل مدیریت</title>
          <style>
            body { font-family: Tahoma; direction: rtl; padding: 40px; background: #667eea; }
            .admin-container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px; }
            .stat-card { background: #f8f9fa; padding: 20px; margin: 10px 0; border-radius: 10px; border-right: 4px solid #007bff; }
          </style>
        </head>
        <body>
          <div class="admin-container">
            <h1>🎯 پنل مدیریت سامانه</h1>
            <div style="background: #28a745; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin-bottom: 20px;">
              ✅ سیستم مدیریت فعال
            </div>
            
            <div class="stat-card">
              <h3>📊 آمار سیستم</h3>
              <p>کاربران فعال: <strong>۴۲</strong></p>
              <p>مکالمات امروز: <strong>۱۲۵</strong></p>
              <p>وضعیت سرور: <strong style="color: green;">۹۹.۹٪</strong></p>
            </div>
            
            <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">بازگشت به صفحه اصلی</a>
          </div>
        </body>
        </html>
      `);
    }

    // 🔌 API چت
    if (path === '/api/chat/send' && request.method === 'POST') {
      try {
        const { message = 'سلام', user_id = 'مهمان' } = await request.json();
        
        let response = "سلام! سیستم محاوره‌ای فعال است. چگونه می‌توانم کمک کنم؟";
        if (message.includes('سلام')) response = "سلام عزیز! 🌟 به سامانه خوش آمدید";
        if (message.includes('چطور')) response = "سیستم کاملاً فعال و آماده خدمت‌رسانی است!";
        if (message.includes('تحلیل')) response = "من می‌توانم در تحلیل محتوای متنی کمک کنم.";
        
        return jsonResponse({
          success: true,
          user_message: message,
          bot_response: response,
          user_id: user_id,
          timestamp: new Date().toISOString(),
          system: "سامانه محاوره‌ای پست ۱۲۵"
        });
      } catch (error) {
        return jsonResponse({
          success: false,
          error: "خطا در پردازش درخواست"
        });
      }
    }

    // 📊 وضعیت سیستم
    if (path === '/api/status') {
      return jsonResponse({
        status: "active",
        service: "social_media_intelligence_platform",
        version: "5.0.0",
        timestamp: new Date().toISOString(),
        endpoints: ["/", "/chat", "/admin", "/api/chat/send", "/api/status"]
      });
    }

    // ❌ صفحه ۴۰۴
    return htmlResponse(`
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
      <head>
        <meta charset="UTF-8">
        <title>صفحه یافت نشد</title>
      </head>
      <body style="font-family: Tahoma; direction: rtl; text-align: center; padding: 50px;">
        <h1>۴۰۴ - صفحه یافت نشد</h1>
        <p>مسیر "${path}" وجود ندارد</p>
        <a href="/" style="color: #007bff;">بازگشت به صفحه اصلی</a>
      </body>
      </html>
    `);
  }
};
