export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routes
    if (url.pathname === '/') {
      return new Response(`
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
            <meta charset="UTF-8">
            <title>پلتفرم تحلیل شبکه‌های اجتماعی</title>
            <style>
                body { font-family: Tahoma, sans-serif; background: #667eea; margin: 0; padding: 20px; color: white; direction: rtl; }
                .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>✅ سامانه فعال است</h1>
                <p>پلتفرم تحلیل شبکه‌های اجتماعی با موفقیت روی CloudFlare مستقر شد.</p>
                <p><strong>آدرس:</strong> ${request.url}</p>
                <p><strong>زمان:</strong> ${new Date().toLocaleString('fa-IR')}</p>
                <hr>
                <h3>📡 API Endpoints:</h3>
                <ul>
                    <li><a href="/api/status">/api/status</a></li>
                    <li><a href="/health">/health</a></li>
                </ul>
            </div>
        </body>
        </html>
      `, { 
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } 
      });
    }

    if (url.pathname === '/api/status') {
      const status = {
        status: 'active',
        service: 'social-media-intelligence',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        deployed_via: 'GitHub Actions'
      };
      return new Response(JSON.stringify(status, null, 2), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'healthy' }, null, 2), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    return new Response(JSON.stringify({ 
      error: 'صفحه یافت نشد',
      path: url.pathname 
    }, null, 2), { 
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
}
