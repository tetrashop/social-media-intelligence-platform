// src/index.js
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        
        // 🏠 صفحه اصلی
        if (path === '/' || path === '') {
            const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>سامانه پست ۱۲۷ - فعال</title>
    <style>
        body { 
            font-family: Tahoma; 
            direction: rtl; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 50px; 
            color: white;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 20px;
            color: #333;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .success {
            color: #28a745;
            font-size: 24px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ سامانه پست ۱۲۷ فعال شد</div>
        <h1>🧠 سامانه هوش مصنوعی اجتماعی</h1>
        <p>نسخه ۶.۰.۰ - معماری الماسی بدون وابستگی</p>
        
        <div style="margin: 30px 0;">
            <a href="/chat" class="btn">💬 چت هوشمند</a>
            <a href="/api/status" class="btn">📊 وضعیت سیستم</a>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>🎯 قابلیت‌های سیستم</h3>
            <p>تحلیل چندبعدی متن • پردازش زبان فارسی • هوش مصنوعی پیشرفته</p>
        </div>
    </div>
</body>
</html>`;
            return new Response(html, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // 💬 صفحه چت
        if (path === '/chat') {
            const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>چت هوشمند - پست ۱۲۷</title>
    <style>
        body { 
            font-family: Tahoma; 
            direction: rtl; 
            background: #667eea;
            margin: 0; 
            padding: 20px;
        }
        .chat-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
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
        }
        .input-area {
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            gap: 10px;
        }
        input {
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
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۷</h1>
        </div>
        <div class="messages" id="messages">
            <div style="padding: 15px; background: #e7f3ff; margin: 10px; border-radius: 10px;">
                <strong>🤖 ربات:</strong> سلام! من یک دستیار هوشمند هستم.
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
            const messages = document.getElementById('messages');
            const message = input.value;
            
            if (!message) return;
            
            // نمایش پیام کاربر
            messages.innerHTML += '<div style="padding: 15px; background: #007bff; color: white; margin: 10px; border-radius: 10px; margin-left: 20%;"><strong>👤 شما:</strong> ' + message + '</div>';
            
            // پاسخ خودکار
            setTimeout(() => {
                messages.innerHTML += '<div style="padding: 15px; background: #e7f3ff; margin: 10px; border-radius: 10px; margin-right: 20%;"><strong>🤖 ربات:</strong> پیام شما دریافت شد! (پست ۱۲۷)</div>';
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
            
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
        
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    </script>
</body>
</html>`;
            return new Response(html, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // 📊 API وضعیت
        if (path === '/api/status') {
            const data = {
                status: "active",
                service: "social-media-intelligence-platform",
                version: "6.0.0",
                post_id: 127,
                architecture: "dependency-free",
                timestamp: new Date().toISOString(),
                endpoints: ["/", "/chat", "/api/status"]
            };
            
            return new Response(JSON.stringify(data, null, 2), {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        // سایر مسیرها
        return new Response(JSON.stringify({
            error: "مسیر یافت نشد",
            available_endpoints: ["/", "/chat", "/api/status"],
            post_id: 127
        }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
