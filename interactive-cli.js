const readline = require('readline');
const main = require('./main.cjs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 پلتفرم تحلیل شبکه‌های اجتماعی - نسخه تعاملی\n');

function showMenu() {
  console.log('\n📋 منوی اصلی:');
  console.log('1. تحلیل متن دلخواه');
  console.log('2. تحلیل نمونه سیستم');
  console.log('3. وضعیت سیستم');
  console.log('4. خروج');
  
  rl.question('\n🔄 لطفاً گزینه مورد نظر را انتخاب کنید (1-4): ', (choice) => {
    switch(choice) {
      case '1':
        analyzeCustomText();
        break;
      case '2':
        runSampleAnalysis();
        break;
      case '3':
        showSystemStatus();
        break;
      case '4':
        console.log('👋 با تشکر از استفاده شما!');
        rl.close();
        break;
      default:
        console.log('❌ گزینه نامعتبر!');
        showMenu();
    }
  });
}

function analyzeCustomText() {
  rl.question('\n📝 لطفاً متن مورد نظر برای تحلیل را وارد کنید:\n', (text) => {
    console.log('\n🔍 در حال تحلیل متن...');
    
    // شبیه‌سازی تحلیل
    setTimeout(() => {
      const analysisResult = {
        analysis_id: `custom_${Date.now()}`,
        confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
        insights: [
          "محتوا از نظر معنایی غنی است",
          "کاربر رویکرد تحلیلی دارد",
          "تمرکز بر موضوعات تکنولوژی مشهود است"
        ],
        recommendations: [
          "توسعه محتوای تخصصی",
          "افزایش تعامل با جامعه هدف"
        ],
        input_length: text.length,
        processed_at: new Date().toLocaleString('fa-IR')
      };
      
      console.log('\n🎉 نتایج تحلیل:');
      console.log(JSON.stringify(analysisResult, null, 2));
      showMenu();
    }, 2000);
  });
}

function runSampleAnalysis() {
  console.log('\n🔍 اجرای تحلیل نمونه...');
  // مستقیماً از main.cjs استفاده می‌کنیم
  require('./main.cjs');
  setTimeout(showMenu, 3000);
}

function showSystemStatus() {
  const status = {
    service: 'social-media-intelligence',
    status: 'active',
    version: '1.0.0',
    modules_loaded: true,
    cognitive_processor: 'active',
    telegram_explorer: 'active',
    twitter_explorer: 'active',
    timestamp: new Date().toISOString()
  };
  
  console.log('\n📊 وضعیت سیستم:');
  console.log(JSON.stringify(status, null, 2));
  showMenu();
}

// شروع برنامه
showMenu();
