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

      // در فایل src/index.js - بخش مربوط به /chat
if (path === '/chat') {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>💬 چت هوشمند پیشرفته - پست ۱۲۶</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: Tahoma, Arial, sans-serif;
                direction: rtl;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                height: 100vh;
                display: flex;
                flex-direction: column;
            }
            
            .chat-header {
                background: white;
                padding: 20px;
                border-radius: 15px 15px 0 0;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                text-align: center;
            }
            
            .chat-container {
                flex: 1;
                background: white;
                border-radius: 0 0 15px 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .messages-container {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .message {
                max-width: 70%;
                padding: 12px 16px;
                margin: 10px 0;
                border-radius: 12px;
                position: relative;
            }
            
            .message-user {
                background: #007bff;
                color: white;
                margin-right: auto;
                margin-left: 0;
                border-bottom-right-radius: 5px;
            }
            
            .message-bot {
                background: white;
                border: 1px solid #dee2e6;
                margin-left: auto;
                margin-right: 0;
                border-bottom-left-radius: 5px;
            }
            
            .input-container {
                padding: 20px;
                background: white;
                border-top: 1px solid #dee2e6;
                display: flex;
                gap: 10px;
            }
            
            .message-input {
                flex: 1;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
            }
            
            .send-btn {
                background: #007bff;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
            }
            
            .status-badge {
                background: #28a745;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                display: inline-block;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="chat-header">
                <h1>💬 چت هوشمند پیشرفته - پست ۱۲۶</h1>
                <div class="status-badge">✅ سیستم فعال</div>
            </div>
            
            <div class="chat-container">
                <div class="messages-container" id="messagesContainer">
                    <div class="message message-bot">
                        <strong>🤖 سامانه:</strong> سلام! به چت هوشمند پست ۱۲۶ خوش آمدید. چگونه می‌توانم کمک کنم؟
                    </div>
                </div>
                
                <div class="input-container">
                    <input type="text" class="message-input" id="messageInput" placeholder="پیام خود را بنویسید...">
                    <button class="send-btn" onclick="sendMessage()">ارسال</button>
                </div>
            </div>
        </div>

        <script>
            async function sendMessage() {
                const input = document.getElementById('messageInput');
                const message = input.value.trim();
                const container = document.getElementById('messagesContainer');
                
                if (!message) return;
                
                // نمایش پیام کاربر
                const userMsg = document.createElement('div');
                userMsg.className = 'message message-user';
                userMsg.innerHTML = '<strong>👤 شما:</strong> ' + message;
                container.appendChild(userMsg);
                
                input.value = '';
                
                try {
                    const response = await fetch('/api/chat/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            message: message, 
// در فایل src/index.js - بخش مربوط به /chat
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
            padding: 20px;
            min-height: 100vh;
        }
        .chat-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
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
            padding: 10px 15px;
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
        #messageInput {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
        }
        button {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #218838;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۶</h1>
            <p>سیستم فعال و آماده استفاده</p>
        </div>
        
        <div class="messages" id="messagesContainer">
            <div class="message bot-message">
                <strong>🤖 سامانه:</strong> سلام! به چت هوشمند خوش آمدید. چگونه می‌توانم کمک کنم؟
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
            
            // شبیه‌سازی پاسخ ربات
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.innerHTML = '<strong>🤖 سامانه:</strong> در حال پردازش...';
            container.appendChild(botDiv);
            
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
                botDiv.innerHTML = '<strong>🤖 سامانه:</strong> ' + data.bot_response;
                container.scrollTop = container.scrollHeight;
            })
            .catch(error => {
                botDiv.innerHTML = '<strong>🤖 سامانه:</strong> ❌ خطا در ارتباط با سرور';
                container.scrollTop = container.scrollHeight;
            });
        }
        
        // ارسال با Enter
        document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>`;
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    }
  });
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
