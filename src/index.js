export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // CORS handling
        if (method === 'OPTIONS') {
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
    <title>سامانه پست ۱۲۷ - فعال</title>
    <style>
        body { 
            font-family: Tahoma; 
            direction: rtl; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px; 
            color: #333;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .success {
            color: #28a745;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ سامانه پست ۱۲۷ فعال شد</div>
        <h1>🧠 سامانه هوش مصنوعی اجتماعی</h1>
        <p>سیستم تحلیل چندبعدی متن - نسخه ۸.۰.۱</p>
        
        <div style="margin: 30px 0;">
            <a href="/chat" class="btn">💬 چت هوشمند</a>
            <a href="/analyze" class="btn">📊 تحلیل متن</a>
            <a href="/api/status" class="btn">🔧 وضعیت سیستم</a>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <p><strong>پست:</strong> ۱۲۷ | <strong>ورژن:</strong> ۸.۰.۱</p>
            <p><strong>آخرین بروزرسانی:</strong> ${new Date().toLocaleString('fa-IR')}</p>
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
// اضافه کردن این بخش به فایل src/index.js در قسمت صفحه چت

// 💬 صفحه چت هوشمند
if (path === '/chat') {
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
            background: #f8f9fa;
        }
        .input-area {
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            gap: 10px;
            border-top: 1px solid #ddd;
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
            font-size: 16px;
        }
        .message {
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            max-width: 80%;
        }
        .user-message {
            background: #007bff;
            color: white;
            margin-left: auto;
            margin-right: 0;
        }
        .bot-message {
            background: white;
            border: 1px solid #e0e0e0;
            margin-right: auto;
            margin-left: 0;
        }
        .typing-indicator {
            color: #666;
            font-style: italic;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">
            <h1>💬 چت هوشمند - پست ۱۲۷</h1>
            <p>ربات پاسخگو فعال است</p>
        </div>
        <div class="messages" id="messages">
            <div class="bot-message">
                <strong>🤖 ربات:</strong> سلام! من یک دستیار هوشمند هستم. می‌تونم متن شما رو تحلیل کنم و پاسخ بدم.
            </div>
        </div>
        <div class="input-area">
            <input type="text" id="userInput" placeholder="پیام خود را بنویسید...">
            <button onclick="sendMessage()">ارسال</button>
        </div>
    </div>

    <script>
        async function sendMessage() {
            const input = document.getElementById('userInput');
            const messages = document.getElementById('messages');
            const message = input.value.trim();
            
            if (!message) return;
            
            // نمایش پیام کاربر
            messages.innerHTML += '<div class="user-message"><strong>👤 شما:</strong> ' + message + '</div>';
            input.value = '';
            
            // نمایش تایپ کردن ربات
            messages.innerHTML += '<div class="typing-indicator" id="typing">🤖 ربات در حال تایپ...</div>';
            messages.scrollTop = messages.scrollHeight;
            
            try {
                // ارسال به API برای تحلیل و دریافت پاسخ
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({text: message})
                });
                
                const data = await response.json();
                
                // حذف نشانگر تایپ
                document.getElementById('typing').remove();
                
                if (data.success) {
                    // تولید پاسخ هوشمند بر اساس تحلیل
                    const botResponse = generateBotResponse(message, data.analysis);
                    messages.innerHTML += '<div class="bot-message"><strong>🤖 ربات:</strong> ' + botResponse + '</div>';
                } else {
                    messages.innerHTML += '<div class="bot-message"><strong>🤖 ربات:</strong> متأسفانه در پردازش پیام مشکل پیش آمد.</div>';
                }
                
            } catch (error) {
                // حذف نشانگر تایپ
                const typingElement = document.getElementById('typing');
                if (typingElement) typingElement.remove();
                
                // پاسخ fallback
                const fallbackResponse = generateFallbackResponse(message);
                messages.innerHTML += '<div class="bot-message"><strong>🤖 ربات:</strong> ' + fallbackResponse + '</div>';
            }
            
            messages.scrollTop = messages.scrollHeight;
        }

        function generateBotResponse(userMessage, analysis) {
            const emotionalState = analysis.emotional.dominant_emotion;
            const overallScore = analysis.overall_score;
            
            // پاسخ‌های مبتنی بر احساسات
            if (emotionalState === 'positive' && overallScore > 6) {
                return "چه عالی! از شنیدن این خبر خوشحال شدم. 😊";
            } else if (emotionalState === 'negative') {
                return "متأسفم که اینطور احساس می‌کنی. اگر بخواهی می‌تونم کمک کنم.";
            }
            
            // پاسخ‌های مبتنی بر محتوا
            if (userMessage.includes('سلام') || userMessage.includes('درود')) {
                return "سلام! چطور می‌تونم کمک کنم؟ 🌟";
            }
            
            if (userMessage.includes('چطور') || userMessage.includes('چگونه')) {
                return "من می‌تونم متن شما رو از جنبه‌های مختلف تحلیل کنم: علمی، احساسی، هنری، ادبی و اجتماعی.";
            }
            
            if (userMessage.includes('تشکر') || userMessage.includes('ممنون')) {
                return "خوشحالم که مفید بودم! 😊";
            }
            
            if (userMessage.includes('۱۲۷') || userMessage.includes('127')) {
                return "بله! این سیستم مربوط به پست شماره ۱۲۷ می‌باشد. 🎯";
            }
            
            if (userMessage.includes('پست')) {
                return "این سامانه مربوط به پست ۱۲۷ هست و برای تحلیل متون فارسی طراحی شده.";
            }
            
            // پاسخ عمومی بر اساس تحلیل
            if (analysis.scientific.score > 7) {
                return "متن شما از لحاظ علمی بسیار قوی است! 🔬";
            } else if (analysis.artistic.creativity_score > 6) {
                return "چه متن خلاقانه‌ای! 🎨";
            } else if (analysis.literary.complexity_score > 5) {
                return "ساختار زبانی پیچیده‌ای داره. 📚";
            }
            
            // پاسخ پیش‌فرض
            return "پیام شما دریافت شد! امتیاز کلی تحلیل: " + overallScore + " از 10. " +
                   "احساس غالب: " + (emotionalState === 'positive' ? 'مثبت 😊' : emotionalState === 'negative' ? 'منفی 😔' : 'خنثی 😐');
        }

        function generateFallbackResponse(userMessage) {
            // پاسخ‌های fallback وقتی API در دسترس نیست
            const responses = [
                "پیام شما رو دریافت کردم!",
                "متوجه شدم، ممنون از پیامتون.",
                "نکته جالبی گفتید!",
                "پیام شما ثبت شد.",
                "از شنیدن نظرات شما خوشحال شدم."
            ];
            
            // پاسخ‌های خاص برای برخی کلمات کلیدی
            if (userMessage.includes('سلام')) return "سلام! چطور می‌تونم کمک کنم؟";
            if (userMessage.includes('خداحافظ')) return "خداحافظ! موفق باشید 👋";
            if (userMessage.includes('تشکر')) return "خواهش می‌کنم! 😊";
            
            return responses[Math.floor(Math.random() * responses.length)];
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

            // 📊 صفحه تحلیل
            if (path === '/analyze') {
                const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تحلیل متن - پست ۱۲۷</title>
    <style>
        body { 
            font-family: Tahoma; 
            direction: rtl; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px; 
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .analysis-item {
            background: #f8f9fa;
            padding: 20px;
            margin: 15px 0;
            border-radius: 10px;
            border-right: 4px solid #007bff;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <a href="/" class="btn" style="background: #6c757d;">🏠 صفحه اصلی</a>
            <h1 style="text-align: center;">📊 تحلیل چندبعدی متن</h1>
            <p style="text-align: center;">پست ۱۲۷ - سیستم پیشرفته پردازش زبان فارسی</p>
            
            <div class="analysis-item">
                <h3>🔬 تحلیل علمی</h3>
                <p>شناسایی مفاهیم علمی و اصطلاحات تخصصی در متن</p>
            </div>
            
            <div class="analysis-item">
                <h3>💖 تحلیل احساسی</h3>
                <p>تشخیص احساسات و بار عاطفی موجود در متن</p>
            </div>
            
            <div class="analysis-item">
                <h3>🎨 ارزیابی هنری</h3>
                <p>سنجش خلاقیت و زیبایی‌شناسی متن</p>
            </div>
            
            <div class="analysis-item">
                <h3>📚 تحلیل ادبی</h3>
                <p>بررسی ساختار زبانی و پیچیدگی‌های ادبی</p>
            </div>
            
            <div class="analysis-item">
                <h3>🌍 تحلیل اجتماعی</h3>
                <p>درک زمینه‌های اجتماعی و فرهنگی متن</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="/chat" class="btn">💬 تست سیستم چت</a>
            </div>
        </div>
    </div>
</body>
</html>`;
                return new Response(html, {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

                        // 🔌 API تحلیل
            if (path === '/api/analyze' && method === 'POST') {
                try {
                    const { text } = await request.json();
                    
                    if (!text || text.trim().length === 0) {
                        return new Response(JSON.stringify({
                            success: false,
                            error: "متن ارسال نشده است"
                        }), {
                            status: 400,
                            headers: { 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            }
                        });
                    }
                    
                    // تحلیل ساده و مطمئن متن
                    const words = text.split(' ').filter(word => word.length > 0);
                    const textLength = text.length;
                    
                    // محاسبه امتیازات
                    const scientificScore = Math.min(textLength / 15, 10);
                    const emotionalScore = Math.min((text.match(/خوشحال|خوب|عالی|مثبت|ناراحت|بد|منفی|غمگین/g) || []).length * 3, 10);
                    const artisticScore = Math.min((text.match(/مانند|مثل|شبیه|چون|نظیر/g) || []).length * 3, 10);
                    const literaryScore = Math.min((textLength / 100) + (words.length / 25), 10);
                    const socialScore = Math.min((text.match(/جامعه|مردم|فرهنگ|اجتماع|روابط/g) || []).length * 3, 10);
                    
                    const overallScore = (
                        scientificScore +
                        emotionalScore +
                        artisticScore +
                        literaryScore +
                        socialScore
                    ) / 5;
                    
                    const analysis = {
                        scientific: {
                            score: scientificScore.toFixed(1),
                            terms_found: text.match(/علم|تحقیق|دانش|تکنولوژی|داده/g) || [],
                            complexity: textLength > 100 ? "بالا" : "متوسط"
                        },
                        emotional: {
                            score: emotionalScore.toFixed(1),
                            dominant_emotion: text.includes('خوشحال') || text.includes('خوب') ? "مثبت" : 
                                            text.includes('ناراحت') || text.includes('بد') ? "منفی" : "خنثی",
                            intensity: Math.min(emotionalScore, 10)
                        },
                        artistic: {
                            creativity_score: artisticScore.toFixed(1),
                            metaphorical_language: text.match(/مانند|مثل|شبیه/g) || []
                        },
                        literary: {
                            complexity_score: literaryScore.toFixed(1),
                            word_count: words.length,
                            structure: words.length > 25 ? "پیچیده" : "ساده"
                        },
                        social: {
                            social_relevance: socialScore.toFixed(1),
                            terms_found: text.match(/جامعه|مردم|فرهنگ|اجتماع/g) || []
                        }
                    };
                    
                    return new Response(JSON.stringify({
                        success: true,
                        text: text,
                        analysis: analysis,
                        overall_score: overallScore.toFixed(1),
                        post_id: 127,
                        timestamp: new Date().toISOString(),
                        version: "8.0.2"
                    }), {
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                    
                } catch (error) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: "خطا در پردازش متن",
                        message: error.message
                    }), {
                        status: 500,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }
            }\n\n            // 📊 API وضعیت
            if (path === '/api/status') {
                const data = {
                    status: "active",
                    service: "social-media-intelligence-platform",
                    version: "8.0.1",
                    post_id: 127,
                    architecture: "direct-deployment",
                    timestamp: new Date().toISOString(),
                    endpoints: ["/", "/chat", "/analyze", "/api/analyze", "/api/status"]
                };
                
                return new Response(JSON.stringify(data, null, 2), {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // ❌ صفحه ۴۰۴
            return new Response(JSON.stringify({
                error: "مسیر یافت نشد",
                available_endpoints: ["/", "/chat", "/analyze", "/api/analyze", "/api/status"],
                post_id: 127
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });

        } catch (error) {
            return new Response(JSON.stringify({
                error: "خطای سرور",
                message: error.message,
                post_id: 127
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
};
