const fs = require('fs');

// محتوای جدید برای فایل index.js با frontend به‌روزشده
const newContent = `const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

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
        return "من می‌تونم:\\\\n1. 🔬 متن شما رو تحلیل کنم\\\\n2. 💬 به سوالات پاسخ بدم\\\\n3. 📊 اطلاعات مفید ارائه بدم";
    }
    
    if (lowerMessage.includes('هوش مصنوعی') || lowerMessage.includes('ai')) {
        return "بله! من یک سیستم هوش مصنوعی هستم که برای تحلیل متن و گفتگو طراحی شدم.";
    }
    
    if (lowerMessage.includes('حالت') || lowerMessage.includes('چطوری')) {
        return "من خوبم ممنون! چطور می‌تونم به شما کمک کنم？ 😊";
    }
    
    // پاسخ‌های عمومی متنوع
    const responses = [
        "جالب است! می‌تونید بیشتر در این مورد بگید؟",
        "متوجه شدم، ممنون از اینکه این رو به اشتراک گذاشتید.",
        "این نکته رو مد نظر قرار می‌دم. سوال دیگه‌ای دارید？",
        "پیام شما رو دریافت کردم! چطور می‌تونم کمک کنم？",
        "منتظر شنیدن نظرات شما هستم.",
        "چه پیام خوبی! می‌خواهید در مورد چیزی خاص صحبت کنیم？",
        "متشکرم از پیامتان. آیا نیاز به کمک دارید？",
        "عالیه! چیز دیگه‌ای هست که بتونم کمک کنم？",
        "پیام شما ثبت شد. خوشحالم که باهاتون در ارتباطم!",
        "این رو شنیدم! برای ادامه گفتگو در خدمتم."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Route برای API چت
app.post('/chat', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'پیام ضروری است' });
    }
    
    const response = generateResponse(message);
    
    res.json({
        response: response,
        timestamp: new Date().toISOString()
    });
});

// Route اصلی - سرو کردن frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(\`سرور در پورت \${PORT} اجرا شد\`);
});`;

// نوشتن محتوای جدید
fs.writeFileSync('src/index.js', newContent);
console.log('✅ فایل اصلی با frontend یکپارچه بروزرسانی شد');

// ایجاد دایرکتوری public اگر وجود ندارد
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

// ایجاد فایل frontend جدید
const frontendContent = `<!DOCTYPE html>
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

fs.writeFileSync('public/index.html', frontendContent);
console.log('✅ فایل frontend جدید ایجاد شد');
