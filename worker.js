export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 🎯 سیستم محاوره و چت - پست ۱۲۵
    if (path === '/api/chat/send' && request.method === 'POST') {
      try {
        const { room_id, message, user_id, type = 'text' } = await request.json();
        
        let botResponse = "سلام! سیستم محاوره فعال شد. چگونه می‌توانم کمک کنم؟";
        
        const messageLower = message.toLowerCase();
        if (messageLower.includes('سلام') || messageLower.includes('درود')) {
          botResponse = "سلام! خوش آمدید. سیستم تحلیل محاوره‌ای پست ۱۲۵ فعال است.";
        }
        
        if (messageLower.includes('چطور') || messageLower.includes('چگونه')) {
          botResponse = "من یک دستیار هوشمند برای تحلیل محتوای پست ۱۲۵ هستم. می‌تونم در تحلیل متن کمک کنم!";
        }

        if (messageLower.includes('حالت')) {
          botResponse = "من خوبم ممنون! 😊 چطور می‌تونم کمک کنم؟";
        }

        return new Response(JSON.stringify({
          success: true,
          user_message: message,
          bot_response: botResponse,
          room_id: room_id,
          user_id: user_id,
          timestamp: new Date().toISOString()
        }), {
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'خطا در پردازش محاوره'
        }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // وضعیت سلامت چت
    if (path === '/api/chat/status' && request.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'active',
        service: 'chat_system',
        version: '1.0.0',
        post_id: 125,
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // دریافت پیام‌های اتاق
    if (path.startsWith('/api/chat/messages/') && request.method === 'GET') {
      const room_id = path.split('/').pop();
      return new Response(JSON.stringify({
        room_id: parseInt(room_id),
        messages: [{
          id: 1,
          user_id: 'system',
          message: 'سیستم محاوره فعال شد',
          timestamp: new Date().toISOString()
        }]
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // لیست اتاق‌ها
    if (path === '/api/chat/rooms' && request.method === 'GET') {
      return new Response(JSON.stringify({
        rooms: [{
          id: 125,
          name: 'اتاق اصلی پست ۱۲۵',
          participants: 1,
          last_message: 'سیستم فعال شد'
        }]
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // صفحه اصلی
    const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>پلتفرم تحلیل شبکه‌های اجتماعی</title>
    <style>
        body { font-family: Tahoma, Arial; direction: rtl; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 40px; color: white; }
        .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.95); padding: 40px; border-radius: 20px; color: #333; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .endpoint { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-right: 4px solid #007bff; }
        code { background: #2c3e50; color: white; padding: 10px; border-radius: 5px; display: block; margin: 10px 0; font-family: monospace; }
        .success { color: #27ae60; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 پلتفرم تحلیل شبکه‌های اجتماعی</h1>
        <p>نسخه Cloudflare Workers - <span class="success">فعال ✅</span></p>

        <div class="endpoint">
            <h3>💬 سیستم محاوره و چت - پست ۱۲۵</h3>
            <p><strong>Endpoint:</strong> POST /api/chat/send</p>
            <code>curl -X POST https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/chat/send \\
  -H "Content-Type: application/json" \\
  -d '{"room_id":125, "message":"سلام", "user_id":"test"}'</code>
        </div>

        <div class="endpoint">
            <h3>📊 وضعیت چت</h3>
            <p><strong>Endpoint:</strong> GET /api/chat/status</p>
            <code>curl https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev/api/chat/status</code>
        </div>

        <div class="endpoint">
            <h3>✅ سیستم فعال است</h3>
            <p>سیستم محاوره برای پست ۱۲۵ آماده است.</p>
        </div>
    </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders
      }
    });
  }
};
