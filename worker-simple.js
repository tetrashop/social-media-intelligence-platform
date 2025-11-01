const express = require('express');
const app = express();
app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// وضعیت سیستم
app.get('/api/status', (req, res) => {
    res.json({
        status: 'active',
        version: '4.0.0-nlp-simple',
        timestamp: new Date().toISOString(),
        post_id: 124
    });
});

// تحلیل NLP پست ۱۲۴
app.post('/api/nlp/analyze', (req, res) => {
    try {
        const { text, post_id = 124 } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'متن الزامی است', post_id: post_id });
        }

        // تحلیل ساده
        const wordCount = text.split(/\s+/).length;
        const charCount = text.length;
        
        const analysis = {
            post_id: post_id,
            sentiment: 'positive',
            keywords: ['تحلیل', 'پست', '۱۲۴', 'سیستم'],
            word_count: wordCount,
            character_count: charCount,
            complexity: wordCount > 50 ? 'high' : 'medium',
            timestamp: new Date().toISOString(),
            version: "4.0.0-nlp-simple",
            confidence: 0.95
        };
        
        res.json(analysis);
        
    } catch (error) {
        res.status(500).json({ error: "خطا در تحلیل", post_id: 124 });
    }
});

// شروع سرور
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 سرور ساده NLP فعال روی پورت ${PORT}`);
});
