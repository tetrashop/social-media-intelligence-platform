const http = require('http');
// کد مشابه web-interface.js اما با پورت 8080
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/analyze' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const data = JSON.parse(body);
      const result = {
        analysis_id: `web_${Date.now()}`,
        confidence: 0.85,
        platform: data.platform,
        insights: ["تحلیل نمونه با موفقیت انجام شد"],
        recommendations: ["تست سیستم موفقیت‌آمیز بود"],
        timestamp: new Date().toLocaleString('fa-IR')
      };
      res.end(JSON.stringify(result, null, 2));
    });
  } else {
    res.end(JSON.stringify({status: "API فعال", port: 8080}));
  }
});

server.listen(8080, () => {
  console.log("🚀 سرور تست روی پورت 8080");
});
