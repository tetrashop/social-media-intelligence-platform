const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // تابع generateResponse جدید
    const newFunction = `
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
`;

    // پیدا کردن محل مناسب برای اضافه کردن تابع
    // معمولاً بعد از importها و قبل از routeها مناسب است
    const lines = content.split('\n');
    let insertIndex = -1;
    
    // پیدا کردن آخرین import یا require
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('require(') || lines[i].includes('import ') || lines[i].includes('from ')) {
            insertIndex = i + 1;
        } else if (insertIndex !== -1 && lines[i].trim() !== '' && !lines[i].includes('require(') && !lines[i].includes('import ') && !lines[i].includes('from ')) {
            break;
        }
    }
    
    if (insertIndex === -1) {
        // اگر import پیدا نشد، بعد از کامنت‌های ابتدایی اضافه کنیم
        insertIndex = 0;
        for (let i = 0; i < Math.min(20, lines.length); i++) {
            if (lines[i].trim() !== '' && !lines[i].startsWith('//') && !lines[i].startsWith('/*')) {
                insertIndex = i;
                break;
            }
        }
    }
    
    // اضافه کردن تابع
    lines.splice(insertIndex, 0, newFunction);
    content = lines.join('\n');
    
    // پیدا کردن و جایگزینی قسمت‌هایی که از پاسخ ثابت استفاده می‌کنند
    content = content.replace(/["']پیام شما دریافت شد["']/g, 'generateResponse(userMessage || message)');
    content = content.replace(/["']Message received["']/g, 'generateResponse(userMessage || message)');
    
    fs.writeFileSync(filePath, content);
    console.log('✅ تابع generateResponse با موفقیت اضافه شد');
    console.log('✅ پاسخ‌های ثابت با تابع هوشمند جایگزین شدند');
    
} catch (error) {
    console.error('❌ خطا در بروزرسانی فایل:', error.message);
}
