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
      // 🏠 صفحه اصلی
      if (path === '/' || path === '') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سیستم پست ۱۲۶</title>
    <style>
        body { 
            font-family: Tahoma, Arial; 
            direction: rtl; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            margin: 0; 
            padding: 20px; 
            color: #333; 
            min-height: 100vh;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 15px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
            text-align: center; 
        }
        .btn { 
            display: inline-block; 
            padding: 15px 30px; 
            margin: 10px; 
            background: #007bff; 
            color: white; 
            text-decoration: none; 
            border-radius: 8px; 
            font-size: 16px;
        }
        .btn:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 سیستم پست ۱۲۶ - فعال</h1>
        <p>سیستم چت هوشمند با رابط کاربری کامل</p>
        <div style="margin: 30px 0;">
            <a href="/chat" class="btn">💬 رفتن به چت</a>
            <a href="/admin" class="btn">🎯 پنل مدیریت</a>
        </div>
        <p style="color: #666; margin-top: 20px;">
            آخرین بروزرسانی: ${new Date().toLocaleString('fa-IR')}
        </p>
    </div>
</body>
</html>`;
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 💬 صفحه چت - نسخه بسیار ساده و مطمئن
      if (path === '/chat') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💬 چت هوشمند - پست ۱۲۶</title>
    <style>
        /* استایل‌های بسیار ساده و مطمئن */
        body {
            font-family: Tahoma, Arial;
            direction: rtl;
            background: #667eea;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .chat-box {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .header {
            background: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .messages {
            height: 400px;
            overflow-y: auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .message {
            margin: 10px 0;
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
        }
        .user {
            background: #007bff;
            color: white;
            margin-left: auto;
            text-align: left;
        }
        .bot {
            background: white;
            border: 1px solid #ddd;
            margin-right: auto;
        }
        .input-area {
            padding: 15px;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        .input-area input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        .input-area button {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .home-link {
            display: inline-block;
            margin: 10px;
            padding: 10px 15px;
            background: #6c757d;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <a href="/" class="home-link">🏠 بازگشت به خانه</a>
    
    <div class="chat-box">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۶</h1>
            <p>سیستم فعال - آماده گفتگو</p>
        </div>
        
        <div class="messages" id="messages">
            <div class="message bot">
                <strong>ربات:</strong> سلام! به چت هوشمند خوش آمدید. پیام خود را بنویسید...
            </div>
        </div>
        
        <div class="input-area">
            <input type="text" id="userInput" placeholder="پیام شما...">
            <button onclick="sendMessage()">ارسال</button>
        </div>
    </div>

    <script>
        function sendMessage() {
            var input = document.getElementById('userInput');
            var message = input.value.trim();
            var messagesDiv = document.getElementById('messages');
            
            if (message === '') return;
            
            // نمایش پیام کاربر
            var userMsg = document.createElement('div');
            userMsg.className = 'message user';
            userMsg.innerHTML = '<strong>شما:</strong> ' + message;
            messagesDiv.appendChild(userMsg);
            
            input.value = '';
            
            // ارسال به سرور
            fetch('/api/chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    user_id: 'user123',
                    post_id: 126
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var botMsg = document.createElement('div');
                botMsg.className = 'message bot';
                botMsg.innerHTML = '<strong>ربات:</strong> ' + data.bot_response;
                messagesDiv.appendChild(botMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            })
            .catch(function(error) {
                var errorMsg = document.createElement('div');
                errorMsg.className = 'message bot';
                errorMsg.innerHTML = '<strong>ربات:</strong> خطا در ارتباط';
                messagesDiv.appendChild(errorMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
        }
        
        // ارسال با دکمه Enter
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>`;
        
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 🔌 API چت
      if (path === '/api/chat/send' && request.method === 'POST') {
        const { message = '' } = await request.json();
        
        let response = "سلام! سیستم چت هوشمند پست ۱۲۶ در خدمت شماست. چگونه می‌توانم کمک کنم؟";
        
        if (message.includes('۱۲۶') || message.includes('126')) {
          response = "✅ بله! این سیستم مربوط به پست شماره ۱۲۶ می‌باشد. همه چیز به خوبی کار می‌کند!";
        }
        if (message.includes('سلام') || message.includes('درود')) {
          response = "سلام! 🌟 به سامانه چت هوشمند خوش آمدید. چطور می‌تونم کمک کنم؟";
        }
        if (message.includes('چت') || message.includes('گفتگو')) {
          response = "من یک دستیار هوشمند برای گفتگو هستم. می‌تونم در زمینه‌های مختلف با شما صحبت کنم.";
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
          endpoints: ["/", "/chat", "/api/chat/send", "/api/status"],
          message: "سیستم با رابط کاربری ساده فعال است"
        });
      }

      // صفحه ۴۰۴
      return jsonResponse({
        error: "صفحه یافت نشد",
        available_endpoints: ["/", "/chat", "/api/chat/send", "/api/status"],
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
