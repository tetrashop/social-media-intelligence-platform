// کد اصلاحی برای اضافه کردن endpoints تحلیل
const fs = require('fs');

let content = fs.readFileSync('src/index.js', 'utf8');

// پیدا کردن جای مناسب برای اضافه کردن endpoints (بعد از api/status)
const insertPoint = content.indexOf('// 📊 API وضعیت');

if (insertPoint === -1) {
    console.error('❌ نقطه مناسب برای درج پیدا نشد');
    process.exit(1);
}

// کد endpoints تحلیل
const analyzeCode = `

// 📊 صفحه تحلیل
if (path === '/analyze') {
    const html = \`<!DOCTYPE html>
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
</html>\`;
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
                intensity: (text.match(/خوشحال|خوب|عالی|ناراحت|بد/g) || []).length
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
`;

// درج کد در موقعیت مناسب
const newContent = content.slice(0, insertPoint) + analyzeCode + content.slice(insertPoint);

// ذخیره فایل
fs.writeFileSync('src/index.js', newContent);
console.log('✅ endpoints تحلیل با موفقیت اضافه شدند');
