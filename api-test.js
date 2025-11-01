const http = require('http');

const testData = {
  text: "امروز در حال کار روی پروژه جدید هوش مصنوعی هستم. این پروژه شامل تحلیل داده‌های شبکه‌های اجتماعی و ارائه insights هوشمند است.",
  platform: "telegram",
  dimensions: ["personology", "scientism"]
};

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

console.log('🧪 ارسال درخواست تحلیل به API...');

const req = http.request(options, (res) => {
  console.log(`📊 وضعیت پاسخ: ${res.statusCode}`);
  console.log('📋 هدرهای پاسخ:', res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('🎉 پاسخ تحلیل:');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log('📄 پاسخ متنی:', data);
    }
  });
});

req.on('error', (e) => {
  console.log('❌ خطا در ارسال درخواست:', e.message);
});

req.write(JSON.stringify(testData));
req.end();
