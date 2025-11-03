const express = require('express');
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
        return "من می‌تونم:\\n1. 🔬 متن شما رو تحلیل کنم\\n2. 💬 به سوالات پاسخ بدم\\n3. 📊 اطلاعات مفید ارائه بدم";
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
    console.log(`سرور در پورت ${PORT} اجرا شد`);
});