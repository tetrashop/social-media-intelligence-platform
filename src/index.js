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
            <h1>💬 چت هوشمند - پست ۱۲۷</h1>
        </div>
        <div class="messages" id="messages">
            <div style="padding: 15px; background: #e7f3ff; margin: 10px; border-radius: 10px;">
                <strong>🤖 ربات:</strong> سلام! به چت هوشمند خوش آمدید.
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
            
            messages.innerHTML += '<div style="padding: 15px; background: #007bff; color: white; margin: 10px; border-radius: 10px; margin-left: 20%;"><strong>👤 شما:</strong> ' + message + '</div>';
            
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
                    
                    if (!text) {
                        return new Response(JSON.stringify({
                            success: false,
                            error: "متن ارسال نشده است"
                        }), {
                            status: 400,
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }
                    
                    // تحلیل ساده متن
                    const analysis = {
                        scientific: {
                            score: Math.min(text.length / 10, 10),
                            terms_found: text.includes('علم') || text.includes('تحقیق') ? ['مفاهیم علمی'] : [],
                            complexity: text.length > 50 ? "high" : "medium"
                        },
                        emotional: {
                            score: Math.min((text.match(/خوشحال|خوب|عالی|ناراحت|بد/g) || []).length * 2, 10),
                            dominant_emotion: text.includes('خوشحال') ? "positive" : text.includes('ناراحت') ? "negative" : "neutral",
                            intensity: (text.match(/خوشحal|خوب|عالی|ناراحت|بد/g) || []).length
                        },
                        artistic: {
                            creativity_score: Math.min((text.match(/مانند|مثل|شبیه/g) || []).length * 2, 10),
                            metaphorical_language: text.match(/مانند|مثل|شبیه/g) || []
                        },
                        literary: {
                            complexity_score: Math.min((text.length / 100) + (text.split(' ').length / 20), 10),
                            word_count: text.split(' ').length,
                            structure: text.split(' ').length > 20 ? "complex" : "simple"
                        },
                        social: {
                            social_relevance: Math.min((text.match(/جامعه|مردم|فرهنگ|اجتماع/g) || []).length * 2, 10),
                            terms_found: text.match(/جامعه|مردم|فرهنگ|اجتماع/g) || []
                        }
                    };
                    
                    const overall_score = (
                        analysis.scientific.score +
                        analysis.emotional.score +
                        analysis.artistic.creativity_score +
                        analysis.literary.complexity_score +
                        analysis.social.social_relevance
                    ) / 5;
                    
                    return new Response(JSON.stringify({
                        success: true,
                        text: text,
                        analysis: analysis,
                        overall_score: overall_score.toFixed(1),
                        post_id: 127,
                        timestamp: new Date().toISOString(),
                        version: "8.0.1"
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
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            }

            // 📊 API وضعیت
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
