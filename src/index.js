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
        body { font-family: Tahoma; direction: rtl; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 20px; color: #333; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); text-align: center; }
        .btn { display: inline-block; padding: 15px 30px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 سیستم پست ۱۲۶</h1>
        <p>سیستم چت هوشمند فعال است</p>
        <a href="/chat" class="btn">💬 رفتن به چت</a>
        <a href="/admin" class="btn">🎯 پنل مدیریت</a>
    </div>
</body>
</html>`;
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 💬 صفحه چت - نسخه ساده و کارآمد
      if (path === '/chat') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💬 چت هوشمند - پست ۱۲۶</title>
    <style>
        body {
            font-family: Tahoma, Arial, sans-serif;
            direction: rtl;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        .chat-container {
            max-width: 800px;
            margin: 20px auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 90vh;
        }
        .header {
            background: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .message {
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
        }
        .user-message {
            background: #007bff;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 3px;
        }
        .bot-message {
            background: white;
            border: 1px solid #dee2e6;
            align-self: flex-start;
            border-bottom-left-radius: 3px;
        }
        .input-area {
            padding: 20px;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        #messageInput {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            font-family: Tahoma;
        }
        button {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-family: Tahoma;
        }
        button:hover {
            background: #218838;
        }
        .home-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #6c757d;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <a href="/" class="home-btn">🏠 خانه</a>
    
    <div class="chat-container">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۶</h1>
            <p>سیستم فعال و آماده استفاده</p>
        </div>
        
        <div class="messages" id="messagesContainer">
            <div class="message bot-message">
                <strong>🤖 سامانه:</strong> سلام! به چت هوشمند پست ۱۲۶ خوش آمدید. چگونه می‌توانم کمک کنم؟
            </div>
        </div>
        
        <div class="input-area">
            <input type="text" id="messageInput" placeholder="پیام خود را اینجا بنویسید...">
            <button onclick="sendMessage()">ارسال</button>
        </div>
    </div>

    <script>
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            const container = document.getElementById('messagesContainer');
            
            if (!message) return;
            
            // نمایش پیام کاربر
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.innerHTML = '<strong>👤 شما:</strong> ' + message;
            container.appendChild(userDiv);
            
            input.value = '';
            
            // اسکرول به پایین
            container.scrollTop = container.scrollHeight;
            
            // ارسال به API
            fetch('/api/chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    user_id: 'web-user',
                    post_id: 126
                })
            })
            .then(response => response.json())
            .then(data => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message bot-message';
                botDiv.innerHTML = '<strong>🤖 سامانه:</strong> ' + data.bot_response;
                container.appendChild(botDiv);
                container.scrollTop = container.scrollHeight;
            })
            .catch(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'message bot-message';
                errorDiv.innerHTML = '<strong>🤖 سامانه:</strong> ❌ خطا در ارتباط با سرور';
                container.appendChild(errorDiv);
                container.scrollTop = container.scrollHeight;
            });
        }
        
        // ارسال با Enter
        document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // فوکوس روی input
        document.getElementById('messageInput').focus();
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
          response = "✅ بله! این سیستم مربوط به پست شماره ۱۲۶ می‌باشد. سیستم کاملاً فعال است.";
        }
        if (message.includes('سلام') || message.includes('درود')) {
          response = "سلام! 🌟 به چت هوشمند خوش آمدید. چطور می‌تونم کمک کنم؟";
        }
        if (message.includes('چطور') || message.includes('چگونه')) {
          response = "من یک دستیار هوشمند هستم. می‌تونم در زمینه‌های مختلف کمک کنم.";
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
          features: ["chat", "api", "responsive"],
          endpoints: ["/", "/chat", "/api/chat/send", "/api/status"]
        });
      }

      // سایر مسیرها
      return jsonResponse({
        error: "مسیر یافت نشد",
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
