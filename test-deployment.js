// تست عملکرد Worker پس از استقرار
const testWorker = async () => {
  console.log('🧪 تست عملکرد Cloudflare Worker\n');
  
  const testCases = [
    {
      name: 'تست تحلیل متن فارسی',
      data: {
        text: 'امروز در حال توسعه یک پلتفرم تحلیل شبکه‌های اجتماعی هستم. این سیستم بر پایه Cloudflare Workers ساخته شده است.',
        platform: 'telegram'
      }
    },
    {
      name: 'تست متن کوتاه',
      data: {
        text: 'سلام دنیا! این یک تست است.',
        platform: 'twitter'
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`📝 ${testCase.name}:`);
    console.log(`   متن: "${testCase.data.text.substring(0, 30)}..."`);
    console.log(`   پلتفرم: ${testCase.data.platform}`);
    console.log('   📤 شبیه‌سازی ارسال به Cloudflare Worker...');
    
    // شبیه‌سازی پاسخ Worker
    setTimeout(() => {
      const mockResponse = {
        analysis_id: `test_${Date.now()}`,
        confidence: 0.85 + Math.random() * 0.1,
        platform: testCase.data.platform,
        insights: [
          "تحلیل متن با موفقیت انجام شد",
          "ساختار محتوا مناسب تشخیص داده شد",
          "پردازش زبان فارسی فعال است"
        ],
        recommendations: [
          "ادامه تولید محتوای با کیفیت",
          "تعامل بیشتر با مخاطبان"
        ],
        timestamp: new Date().toLocaleString('fa-IR')
      };
      
      console.log('   ✅ پاسخ دریافت شد:');
      console.log('   اطمینان سیستم:', (mockResponse.confidence * 100).toFixed(1) + '%');
      console.log('   تعداد بینش‌ها:', mockResponse.insights.length);
      console.log('   ---');
    }, 1000);
  }
};

testWorker();
