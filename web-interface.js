const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // تنظیم هدر برای پشتیبانی از فارسی و JSON
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  
  if (pathname === '/analyze' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { text, platform = 'telegram' } = data;
        
        console.log('📨 دریافت درخواست تحلیل:', { text: text.substring(0, 50) + '...', platform });
        
        // شبیه‌سازی تحلیل واقعی
        const analysisResult = {
          analysis_id: `web_${Date.now()}`,
          confidence: Math.random() * 0.3 + 0.7,
          platform: platform,
          insights: [
            "محتوای وارد شده از نظر ساختاری مناسب است",
            "کاربر دارای دیدگاه تحلیلی است",
            "تمرکز بر توسعه تکنولوژی مشهود است"
          ],
          recommendations: [
            "توسعه شبکه ارتباطات تخصصی",
            "افزایش تولید محتوای آموزشی"
          ],
          metrics: {
            text_length: text.length,
            word_count: text.split(' ').length,
            analysis_time: '2.1s',
            language: 'fa'
          },
          timestamp: new Date().toLocaleString('fa-IR')
        };
        
        res.writeHead(200);
        res.end(JSON.stringify(analysisResult, null, 2));
        
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'داده ورودی نامعتبر است' }));
      }
    });
    
  } else if (pathname === '/status') {
    const status = {
      service: 'social-media-intelligence-web',
      status: 'active',
      version: '1.0.0',
      endpoints: ['/analyze (POST)', '/status (GET)'],
      timestamp: new Date().toISOString()
    };
    
    res.writeHead(200);
    res.end(JSON.stringify(status, null, 2));
    
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'مسیر یافت نشد' }));
  }
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`🚀 رابط وب تحلیل روی پورت ${PORT} راه‌اندازی شد`);
  console.log(`📊 آدرس دسترسی: http://localhost:${PORT}`);
  console.log(`🔗 endpoint تحلیل: http://localhost:${PORT}/analyze`);
  console.log(`📋 endpoint وضعیت: http://localhost:${PORT}/status`);
});
