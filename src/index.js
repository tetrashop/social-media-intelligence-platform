// Cloudflare Workers compatibility
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    
    // Route برای API چت
    if (url.pathname === '/chat' && request.method === 'POST') {
        return handleChatRequest(request)
    }
    
    
// پنل مدیریت
if (url.pathname === '/admin' && request.method === 'GET') {
    return serveAdminPanel()
}

function serveAdminPanel() {
    const adminHtml = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت - چت هوشمند</title>
    <style>
        body {
            font-family: Tahoma;
            direction: rtl;
            background: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #343a40;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: #007bff;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .menu-item {
            background: #28a745;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            transition: transform 0.2s;
        }
        .menu-item:hover {
            transform: translateY(-2px);
            background: #218838;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="header">
            <h1>🛠️ پنل مدیریت - چت هوشمند</h1>
            <p>سیستم مدیریت ربات هوشمند پست ۱۲۷</p>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <h3>📊 وضعیت سرویس</h3>
                <p>فعال ✅</p>
            </div>
            <div class="stat-card">
                <h3>🤖 نسخه ربات</h3>
                <p>هوشمند ۲.۰</p>
            </div>
            <div class="stat-card">
                <h3>🔗 endpoint ها</h3>
                <p>۳ endpoint فعال</p>
            </div>
        </div>

        <div class="menu">
            <a href="/" class="menu-item">
                🏠 صفحه اصلی چت
            </a>
            <a href="/chat" class="menu-item">
                💬 رابط چت
            </a>
            <a href="https://dash.cloudflare.com/" target="_blank" class="menu-item">
                ⚙️ Cloudflare Dashboard
            </a>
            <a href="https://github.com/tetrashop/social-media-intelligence-platform" target="_blank" class="menu-item">
                📦 GitHub Repository
            </a>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 8px;">
            <h3>📋 اطلاعات فنی</h3>
            <ul>
                <li><strong>پلتفرم:</strong> Cloudflare Workers</li>
                <li><strong>زبان:</strong> JavaScript</li>
                <li><strong>قابلیت‌ها:</strong> پاسخ هوشمند، تحلیل متن، گفتگوی context-aware</li>
                <li><strong>پست مربوطه:</strong> شماره ۱۲۷</li>
            </ul>
        </div>
    </div>
</body>
</html>`;

    return new Response(adminHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
}
// Routeهای GET - سرو کردن frontend
    if (url.pathname === '/' || url.pathname === '/chat') {
        return serveFrontend()
    }
    
    // Route پیش‌فرض
    return new Response('Not Found', { status: 404 })
}

async function handleChatRequest(request) {
    try {
        const { message } = await request.json()
        
        if (!message) {
            return new Response(JSON.stringify({ error: 'پیام ضروری است' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }
        
        const response = generateResponse(message)
        
        return new Response(JSON.stringify({
            response: response,
            timestamp: new Date().toISOString()
        }), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'خطا در پردازش درخواست' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

function serveFrontend() {
    const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>چت هوشمند - پست ۱۲۷</title>
    <style>
        body {
            font-family: Tahoma;
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
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .header {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
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
        .input-area {
            padding: 20px;
            background: white;
            display: flex;
            gap: 10px;
            border-top: 1px solid #e9ecef;
        }
        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s;
        }
        input:focus {
            border-color: #007bff;
        }
        button {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
        }
        .message {
            margin: 10px 0;
            padding: 15px;
            border-radius: 15px;
            animation: fadeIn 0.3s;
        }
        .user-message {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            margin-left: 20%;
            margin-right: 0;
        }
        .bot-message {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            color: #333;
            margin-right: 20%;
            margin-left: 0;
            border: 1px solid #bbdefb;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .typing-indicator {
            display: none;
            padding: 10px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۷</h1>
            <p>دستیار هوشمند برای تحلیل متن و گفتگو</p>
        </div>
        <div class="messages" id="messages">
            <div class="message bot-message">
                <strong>🤖 ربات:</strong> سلام! به چت هوشمند خوش آمدید. چطور می‌تونم کمک کنم؟
            </div>
        </div>
        <div class="typing-indicator" id="typing">
            <strong>🤖 ربات:</strong> در حال تایپ...
        </div>
        <div class="input-area">
            <input type="text" id="userInput" placeholder="پیام خود را بنویسید..." autocomplete="off">
            <button onclick="sendMessage()">ارسال</button>
        </div>
    </div>

    <script>
        async function sendMessage() {
            const input = document.getElementById('userInput');
            const messages = document.getElementById('messages');
            const typing = document.getElementById('typing');
            const message = input.value.trim();

            if (!message) return;

            // نمایش پیام کاربر
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user-message';
            userMessageDiv.innerHTML = '<strong>👤 شما:</strong> ' + message;
            messages.appendChild(userMessageDiv);

            input.value = '';
            input.disabled = true;
            
            // نمایش تایپینگ
            typing.style.display = 'block';
            messages.scrollTop = messages.scrollHeight;

            try {
                // ارسال درخواست به API
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });

                const data = await response.json();
                
                // مخفی کردن تایپینگ
                typing.style.display = 'none';
                
                // نمایش پاسخ ربات
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message bot-message';
                botMessageDiv.innerHTML = '<strong>🤖 ربات:</strong> ' + data.response;
                messages.appendChild(botMessageDiv);

            } catch (error) {
                // مخفی کردن تایپینگ
                typing.style.display = 'none';
                
                // نمایش خطا
                const errorMessageDiv = document.createElement('div');
                errorMessageDiv.className = 'message bot-message';
                errorMessageDiv.innerHTML = '<strong>🤖 ربات:</strong> متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.';
                messages.appendChild(errorMessageDiv);
            }

            input.disabled = false;
            input.focus();
            messages.scrollTop = messages.scrollHeight;
        }

        // فعال کردن ارسال با Enter
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        // فوکوس خودکار روی input
        document.getElementById('userInput').focus();
    </script>
</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
}

// تابع تولید پاسخ هوشمند
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // پاسخ‌های هوشمند بر اساس محتوای پیام
    if (lowerMessage.includes('سلام') || lowerMessage.includes('درود')) {
        return "سلام! خوش آمدید! چطور می‌تونم کمک کنم؟ 😊";
    }
    
    if (lowerMessage.includes('چطور') || lowerMessage.includes('چگونه')) {
        return "من یک دستیار هوشمند هستم که می‌تونم متن شما رو تحلیل کنم و به سوالاتتون پاسخ بدم.";
    }
    
    if (lowerMessage.includes('خوب') || lowerMessage.includes('عالی') || lowerMessage.includes('عالیه')) {
        return "چه عالی! خوشحالم که حالتون خوبه 🌟";
    }
    
    if (lowerMessage.includes('بد') || lowerMessage.includes('ناراحت') || lowerMessage.includes('مشکل')) {
        return "متأسفم که اینطور احساس می‌کنید. اگر بخواهید می‌تونم کمک کنم.";
    }
    
    if (lowerMessage.includes('تشکر') || lowerMessage.includes('ممنون') || lowerMessage.includes('مرسی')) {
        return "خواهش می‌کنم! خوشحالم که مفید بودم 💚";
    }
    
    if (lowerMessage.includes('خداحافظ') || lowerMessage.includes('بای') || lowerMessage.includes('خدانگهدار')) {
        return "خداحافظ! موفق باشید 👋";
    }
    
    if (lowerMessage.includes('۱۲۷') || lowerMessage.includes('127')) {
        return "بله! این سیستم مربوط به پست شماره ۱۲۷ می‌باشد. 🎯";
    }
    
    if (lowerMessage.includes('پست')) {
        return "این سامانه هوش مصنوعی برای پست ۱۲۷ طراحی شده. می‌تونم متن شما رو تحلیل کنم.";
    }
    
    if (lowerMessage.includes('اسم') || lowerMessage.includes('نام') || lowerMessage.includes('کیستی')) {
        return "من یک دستیار هوشمند هستم که برای پست ۱۲۷ ساخته شدم. می‌تونم بهتون کمک کنم!";
    }
    
    if (lowerMessage.includes('کمک') || lowerMessage.includes('help') || lowerMessage.includes('راهنما')) {
        return "حتما! می‌تونم: 📝 متن شما رو تحلیل کنم | ❓ به سوالات پاسخ بدم | 💬 با شما گفتگو کنم";
    }
    
    if (lowerMessage.includes('چی') && lowerMessage.includes('کنی')) {
        return "من می‌تونم:\\n1. 🔬 متن شما رو تحلیل کنم\\n2. 💬 به سوالات پاسخ بدم\\n3. 📊 اطلاعات مفید ارائه بدم";
    }
    
    if (lowerMessage.includes('هوش مصنوعی') || lowerMessage.includes('ai')) {
        return "بله! من یک سیستم هوش مصنوعی هستم که برای تحلیل متن و گفتگو طراحی شدم.";
    }
    
    if (lowerMessage.includes('حالت') || lowerMessage.includes('چطوری')) {
        return "من خوبم ممنون! چطور می‌تونم به شما کمک کنم؟ 😊";
    }
    
    // پاسخ‌های عمومی متنوع
    const responses = [
        "جالب است! می‌تونید بیشتر در این مورد بگید؟",
        "متوجه شدم، ممنون از اینکه این رو به اشتراک گذاشتید.",
        "این نکته رو مد نظر قرار می‌دم. سوال دیگه‌ای دارید؟",
        "پیام شما رو دریافت کردم! چطور می‌تونم کمک کنم؟",
        "منتظر شنیدن نظرات شما هستم.",
        "چه پیام خوبی! می‌خواهید در مورد چیزی خاص صحبت کنیم؟",
        "متشکرم از پیامتان. آیا نیاز به کمک دارید؟",
        "عالیه! چیز دیگه‌ای هست که بتونم کمک کنم؟",
        "پیام شما ثبت شد. خوشحالم که باهاتون در ارتباطم!",
        "این رو شنیدم! برای ادامه گفتگو در خدمتم."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}
