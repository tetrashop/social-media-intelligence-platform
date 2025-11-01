const cognitiveProcessor = require('./core/deep-thinking/cognitive-processor.cjs');
const telegramExplorer = require('./explorers/modern/telegram-explorer.cjs');

console.log('🎯 شروع تحلیل سفارشی...');

// داده نمونه برای تحلیل
const sampleData = {
  text: "امروز در حال کار روی پروژه جدید هوش مصنوعی هستم. این پروژه شامل تحلیل داده‌های شبکه‌های اجتماعی و ارائه insights هوشمند است.",
  platform: "telegram",
  author: "user123",
  timestamp: new Date().toISOString()
};

// انجام تحلیل
async function analyzeCustomData() {
  try {
    console.log('📊 در حال تحلیل داده...');
    
    // استفاده از پردازشگر شناختی
    const cognitiveResult = await cognitiveProcessor.analyze(sampleData.text);
    console.log('🧠 نتیجه تحلیل شناختی:', cognitiveResult);
    
    // استفاده از اکسپلورر تلگرام
    const telegramResult = await telegramExplorer.explore(sampleData);
    console.log('📱 نتیجه تحلیل تلگرام:', telegramResult);
    
    console.log('✅ تحلیل کامل شد!');
    
  } catch (error) {
    console.log('❌ خطا در تحلیل:', error.message);
  }
}

analyzeCustomData();
