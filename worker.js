const express = require('express');
const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// صفحه اصلی
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
        <meta charset="UTF-8">
        <title>سیستم تحلیل NLP پست ۱۲۴</title>
        <style>
            body { font-family: Tahoma; direction: rtl; padding: 20px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            textarea { width: 100%; height: 100px; padding: 10px; margin: 10px 0; }
            button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
            .result { background: #f8f9fa; padding: 15px; margin-top: 20px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🧠 سیستم تحلیل NLP پست ۱۲۴</h1>
            <textarea id="textInput">این یک تست از سیستم تحلیل فارسی است</textarea>
            <br>
            <button onclick="analyze()">تحلیل متن</button>
            <div id="result" class="result">نتایج اینجا نمایش داده می‌شود</div>
        </div>
        <script>
            async function analyze() {
                const text = document.getElementById('textInput').value;
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '⏳ در حال تحلیل...';
                
                try {
                    const response = await fetch('/api/nlp/analyze', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({text: text, post_id: 124})
                    });
                    const data = await response.json();
                    resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                } catch (error) {
                    resultDiv.innerHTML = '❌ خطا: ' + error.message;
                }
            }
        </script>
    </body>
    </html>
    `);
});

// وضعیت سیستم
app.get('/api/status', (req, res) => {
    res.json({
        status: 'active',
        version: '4.0.0-local',
        timestamp: new Date().toISOString(),
        post_id: 124
    });
});

// تحلیل NLP
app.post('/api/nlp/analyze', (req, res) => {
    const { text, post_id = 124 } = req.body;
    
    const analysis = {
        post_id: post_id,
        sentiment: 'positive',
        keywords: ['تحلیل', 'سیستم', 'پست', '۱۲۴'],
        word_count: text.split(' ').length,
        confidence: 0.95,
        timestamp: new Date().toISOString()
    };
    
    res.json(analysis);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('🚀 سرور محلی فعال روی پورت ' + PORT);
    console.log('🌐 آدرس: http://localhost:' + PORT);
});
