const http = require('http');

console.log("🔍 تست عملکرد تحلیل شبکه‌های اجتماعی...");

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/status',
  method: 'GET',
  timeout: 10000
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ پاسخ دریافت شد:');
    console.log(JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('❌ خطا:', error.message);
});

req.on('timeout', () => {
  console.error('⏰ timeout: سرور پاسخ نمی‌دهد');
  req.destroy();
});

req.end();
