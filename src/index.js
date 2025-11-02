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
        body { font-family: Tahoma; direction: rtl; background: #667eea; margin: 0; padding: 20px; color: white; text-align: center; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 15px; color: #333; }
        .btn { display: inline-block; padding: 15px 30px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 سیستم پست ۱۲۶</h1>
        <p>سیستم فعال است</p>
        <a href="/chat" class="btn">💬 چت هوشمند</a>
    </div>
</body>
</html>`;
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 💬 صفحه چت - نسخه بسیار ساده
      if (path === '/chat') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>چت هوشمند</title>
    <style>
        body { 
            font-family: Tahoma, Arial; 
            direction: rtl; 
            background: #667eea; 
            margin: 0; 
            padding: 20px; 
            color: #333;
        }
        .chat-box {
            max-width: 600px;
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
            background: #f8f9fa;
        }
        .message {
            margin: 10px 0;
            padding: 12px 16px;
            border-radius: 10px;
            max-width: 80%;
        }
        .user-message {
            background: #007bff;
            color: white;
            margin-left: auto;
            text-align: left;
        }
        .bot-message {
            background: white;
            border: 1px solid #ddd;
            margin-right: auto;
        }
        .input-area {
            padding: 20px;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        .input-area input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 16px;
        }
        .input-area button {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="chat-box">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۶</h1>
            <p>سیستم فعال و آماده</p>
        </div>
        
        <div class="messages" id="messages">
            <div class="message bot-message">
                <strong>🤖 سامانه:</strong> سلام! به چت هوشمند خوش آمدید.
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
            const messagesDiv = document.getElementById('messages');
            
            if (!message) return;
            
            // نمایش پیام کاربر
            const userMsg = document.createElement('div');
            userMsg.className = 'message user-message';
            userMsg.innerHTML = '<strong>👤 شما:</strong> ' + message;
            messagesDiv.appendChild(userMsg);
            
            input.value = '';
            
            // ارسال به API
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
            .then(response => response.json())
            .then(data => {
                const botMsg = document.createElement('div');
                botMsg.className = 'message bot-message';
                botMsg.innerHTML = '<strong>🤖 سامانه:</strong> ' + data.bot_response;
                messagesDiv.appendChild(botMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            })
            .catch(error => {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'message bot-message';
                errorMsg.innerHTML = '<strong>🤖 سامانه:</strong> خطا در ارتباط';
                messagesDiv.appendChild(errorMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
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
        
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 🔌 API چت
      if (path === '/api/chat/send' && request.method === 'POST') {
        const { message = '' } = await request.json();
        
        let response = "سلام! سیستم چت هوشمند پست ۱۲۶ در خدمت شماست.";
        
        if (message.includes('۱۲۶') || message.includes('126')) {
          response = "✅ بله! این سیستم مربوط به پست شماره ۱۲۶ می‌باشد.";
        }
        if (message.includes('سلام')) {
          response = "سلام! 🌟 به چت هوشمند خوش آمدید.";
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
          endpoints: ["/", "/chat", "/api/chat/send", "/api/status"]
        });
      }

      // سایر مسیرها
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
