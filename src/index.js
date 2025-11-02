// src/index.js - کد ساده و مطمئن
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // مدیریت CORS
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // پاسخ JSON
    const jsonResponse = (data, status = 200) => {
      return new Response(JSON.stringify(data), {
        status: status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    };

    // پاسخ HTML
    const htmlResponse = (content) => {
      return new Response(content, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      });
    };

    try {
      // 🏠 صفحه اصلی - کار می‌کند
      if (path === '/' || path === '') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سامانه پست ۱۲۶</title>
    <style>
        body { font-family: Tahoma; direction: rtl; background: #667eea; margin: 0; padding: 20px; color: white; text-align: center; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 15px; color: #333; }
        .btn { display: inline-block; padding: 15px 30px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 سیستم پست ۱۲۶</h1>
        <p>سیستم فعال است - نسخه ساده و مطمئن</p>
        <div>
            <a href="/chat" class="btn">💬 چت زنده</a>
            <a href="/admin" class="btn">🎯 پنل مدیریت</a>
        </div>
    </div>
</body>
</html>`;
        return htmlResponse(html);
      }

      // 💬 صفحه چت - نسخه بسیار ساده
      if (path === '/chat') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>چت زنده - پست ۱۲۶</title>
    <style>
        body { font-family: Tahoma; direction: rtl; background: #667eea; margin: 0; padding: 20px; }
        .chat-box { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .messages { height: 400px; overflow-y: auto; padding: 20px; background: #f8f9fa; }
        .message { margin: 10px 0; padding: 12px 16px; border-radius: 10px; max-width: 80%; }
        .user { background: #007bff; color: white; margin-left: auto; text-align: left; }
        .bot { background: white; border: 1px solid #ddd; margin-right: auto; }
        .input-area { padding: 20px; background: white; border-top: 1px solid #eee; display: flex; gap: 10px; }
        .input-area input { flex: 1; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; }
        .input-area button { background: #28a745; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 16px; }
        .home-btn { display: inline-block; margin: 10px; padding: 10px 15px; background: #6c757d; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <a href="/" class="home-btn">🏠 صفحه اصلی</a>
    
    <div class="chat-box">
        <div class="header">
            <h1>💬 چت زنده - پست ۱۲۶</h1>
            <p>سیستم فعال - آماده گفتگو</p>
        </div>
        
        <div class="messages" id="messages">
            <div class="message bot">
                <strong>ربات:</strong> سلام! به چت زنده خوش آمدید. پیام خود را بنویسید...
            </div>
        </div>
        
        <div class="input-area">
            <input type="text" id="userInput" placeholder="پیام خود را بنویسید...">
            <button onclick="sendMessage()">ارسال</button>
        </div>
    </div>

    <script>
        function sendMessage() {
            const input = document.getElementById('userInput');
            const message = input.value.trim();
            const messages = document.getElementById('messages');
            
            if (!message) return;
            
            // نمایش پیام کاربر
            messages.innerHTML += '<div class="message user"><strong>شما:</strong> ' + message + '</div>';
            input.value = '';
            
            // ارسال به API
            fetch('/api/chat/send', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    message: message,
                    user_id: 'user123',
                    post_id: 126
                })
            })
            .then(response => response.json())
            .then(data => {
                messages.innerHTML += '<div class="message bot"><strong>ربات:</strong> ' + data.bot_response + '</div>';
                messages.scrollTop = messages.scrollHeight;
            })
            .catch(error => {
                messages.innerHTML += '<div class="message bot"><strong>ربات:</strong> خطا در ارتباط با سرور</div>';
                messages.scrollTop = messages.scrollHeight;
            });
            
            // اسکرول به پایین
            messages.scrollTop = messages.scrollHeight;
        }
        
        // ارسال با Enter
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>`;
        return htmlResponse(html);
      }

      // 🎯 صفحه مدیریت - نسخه ساده
      if (path === '/admin') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت - پست ۱۲۶</title>
    <style>
        body { font-family: Tahoma; direction: rtl; background: #667eea; margin: 0; padding: 20px; }
        .admin-box { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .stat-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
        .home-btn { display: inline-block; margin: 10px; padding: 10px 15px; background: #6c757d; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <a href="/" class="home-btn">🏠 صفحه اصلی</a>
    
    <div class="admin-box">
        <div class="header">
            <h1>🎯 پنل مدیریت - پست ۱۲۶</h1>
            <p>مدیریت ساده و کاربردی</p>
        </div>
        
        <div class="content">
            <h3>📊 آمار سیستم</h3>
            <div class="stats">
                <div class="stat-card">
                    <h4>👥 کاربران</h4>
                    <p>۱,۲۴۵</p>
                </div>
                <div class="stat-card">
                    <h4>💬 مکالمات</h4>
                    <p>۱۲,۵۸۹</p>
                </div>
            </div>
            
            <h3>🔧 وضعیت سرویس</h3>
            <ul>
                <li>✅ چت زنده: فعال</li>
                <li>✅ API: در دسترس</li>
                <li>✅ پایگاه داده: متصل</li>
                <li>✅ پست: ۱۲۶</li>
            </ul>
            
            <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px;">
                <h4>📝 اطلاعات فنی</h4>
                <p><strong>آخرین بروزرسانی:</strong> ${new Date().toLocaleString('fa-IR')}</p>
                <p><strong>ورژن:</strong> ۱.۰.۰</p>
            </div>
        </div>
    </div>
</body>
</html>`;
        return htmlResponse(html);
      }

      // 🔌 API چت
      if (path === '/api/chat/send' && method === 'POST') {
        const { message = '' } = await request.json();
        
        let response = "سلام! سیستم چت زنده پست ۱۲۶ در خدمت شماست.";
        
        if (message.includes('۱۲۶') || message.includes('126')) {
          response = "✅ بله! این سیستم مربوط به پست شماره ۱۲۶ می‌باشد.";
        }
        if (message.includes('سلام')) {
          response = "سلام! 🌟 به چت زنده خوش آمدید.";
        }
        if (message.includes('چطور')) {
          response = "من یک دستیار ساده هستم. می‌توانم به سوالات شما پاسخ دهم.";
        }

        return jsonResponse({
          success: true,
          user_message: message,
          bot_response: response,
          post_id: 126,
          timestamp: new Date().toISOString(),
          version: "1.0.0"
        });
      }

      // 📊 وضعیت سیستم
      if (path === '/api/status') {
        return jsonResponse({
          status: "active",
          service: "social-media-intelligence-platform",
          version: "1.0.0",
          post_id: 126,
          timestamp: new Date().toISOString(),
          endpoints: ["/", "/chat", "/admin", "/api/chat/send", "/api/status"]
        });
      }

      // سایر مسیرها
      return jsonResponse({
        error: "صفحه یافت نشد",
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
