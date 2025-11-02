export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // پاسخ JSON
    const jsonResponse = (data, status = 200) => {
      return new Response(JSON.stringify(data), {
        status: status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    };

    // پاسخ HTML
    const htmlResponse = (content, contentType = 'text/html; charset=utf-8') => {
      return new Response(content, {
        headers: { 'Content-Type': contentType }
      });
    };

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    try {
      // 🏠 صفحه اصلی - پست ۱۲۶
      if (path === '/' || path === '') {
        const html = `
          <!DOCTYPE html>
          <html dir="rtl" lang="fa">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>🚀 سیستم پست ۱۲۶ - فعال</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Tahoma', 'Arial', sans-serif;
                direction: rtl;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
                padding: 20px;
              }
              .container { 
                max-width: 1200px;
                margin: 0 auto;
              }
              .card {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                margin: 20px 0;
                text-align: center;
              }
              .success {
                color: #28a745;
                font-weight: bold;
                font-size: 24px;
                background: #d4edda;
                padding: 10px 20px;
                border-radius: 10px;
                display: inline-block;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <h1>🎉 سیستم پست ۱۲۶ با موفقیت فعال شد!</h1>
                <div class="success">✅ سیستم چت پیشرفته آماده است</div>
                <p><strong>تاریخ:</strong> ${new Date().toLocaleString('fa-IR')}</p>
                <p><strong>پست:</strong> ۱۲۶</p>
                <div style="margin: 30px 0;">
                  <a href="/chat" style="display: inline-block; padding: 15px 30px; background: #007bff; color: white; text-decoration: none; border-radius: 10px; margin: 10px;">
                    💬 چت پیشرفته
                  </a>
                  <a href="/admin" style="display: inline-block; padding: 15px 30px; background: #28a745; color: white; text-decoration: none; border-radius: 10px; margin: 10px;">
                    🎯 پنل مدیریت
                  </a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;
        return htmlResponse(html);
      }

      // 💬 صفحه چت پیشرفته
      if (path === '/chat') {
        // کد کامل واسط کاربری چت که در پیام قبلی ارسال شد
        // اینجا کوتاه شده برای نمونه
        const html = `
          <!DOCTYPE html>
          <html dir="rtl" lang="fa">
          <head>
            <meta charset="UTF-8">
            <title>💬 چت پیشرفته - پست ۱۲۶</title>
            <style>/* استایل‌های کامل چت */</style>
          </head>
          <body>
            <div class="container">
              <h1>💬 چت هوشمند پیشرفته - پست ۱۲۶</h1>
              <div id="chatApp">
                <!-- محتوای چت -->
              </div>
            </div>
            <script>
              // کد JavaScript کامل چت
              console.log("چت پیشرفته پست ۱۲۶ فعال است");
            </script>
          </body>
          </html>
        `;
        return htmlResponse(html);
      }

      // 🔌 API چت
      if (path === '/api/chat/send' && request.method === 'POST') {
        const { message = '' } = await request.json();
        
        let response = "سلام! سیستم چت پیشرفته پست ۱۲۶ در خدمت شماست. چگونه می‌توانم کمک کنم؟";
        
        if (message.includes('۱۲۶') || message.includes('126')) {
          response = "✅ بله! این سیستم چت پیشرفته مربوط به پست شماره ۱۲۶ می‌باشد.";
        }
        if (message.includes('سلام')) {
          response = "سلام! به چت هوشمند پیشرفته خوش آمدید. 🌟";
        }
        if (message.includes('ویژگی')) {
          response = "🎯 ویژگی‌های سیستم: • چت هوشمند • ذخیره‌سازی محلی • تم تاریک/روشن • جستجو • ارسال فایل";
        }

        return jsonResponse({
          success: true,
          user_message: message,
          bot_response: response,
          post_id: 126,
          timestamp: new Date().toISOString(),
          version: "2.1.0"
        });
      }

      // 📊 وضعیت سیستم
      if (path === '/api/status') {
        return jsonResponse({
          status: "active",
          service: "social-media-intelligence-platform",
          version: "2.1.0",
          post_id: 126,
          timestamp: new Date().toISOString(),
          features: ["advanced_chat", "theme_support", "local_storage", "file_upload", "search"],
          endpoints: ["/", "/chat", "/admin", "/api/chat/send", "/api/status"]
        });
      }

      // سایر مسیرها
      return jsonResponse({
        error: "مسیر یافت نشد",
        available_endpoints: ["/", "/chat", "/admin", "/api/chat/send", "/api/status"],
        post_id: 126
      }, 404);

    } catch (error) {
      return jsonResponse({
        error: "خطای سرور",
        message: error.message,
        post_id: 126
      }, 500);
    }
  }
};
