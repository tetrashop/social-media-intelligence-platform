// src/index.js - کد ساده و مطمئن برای پست ۱۲۷
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // مدیریت CORS
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // پاسخ JSON
    const jsonResponse = (data, status = 200) => {
      return new Response(JSON.stringify(data), {
        status: status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    };

    // پاسخ HTML
    const htmlResponse = (content) => {
      return new Response(content, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      });
    };

    try {
      // 🏠 صفحه اصلی - پست ۱۲۷
      if (path === '/' || path === '') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سامانه پست ۱۲۷ - پردازش زبان طبیعی</title>
    <style>
        body { 
            font-family: Tahoma; 
            direction: rtl; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px; 
            color: white; 
            text-align: center; 
            min-height: 100vh;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 15px; 
            color: #333;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .btn { 
            display: inline-block; 
            padding: 15px 30px; 
            margin: 10px; 
            background: #007bff; 
            color: white; 
            text-decoration: none; 
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        .post-badge {
            background: #28a745;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧠 سامانه پردازش زبان طبیعی - <span class="post-badge">پست ۱۲۷</span></h1>
        <p>سیستم فعال و آماده خدمات‌رسانی - نسخه ساده و مطمئن</p>
        
        <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
            <h3>📋 خدمات موجود</h3>
            <p>پردازش متون فارسی - تحلیل احساسات - دسته‌بندی محتوا</p>
        </div>
        
        <div>
            <a href="/nlp" class="btn">🚀 ورود به سامانه NLP</a>
            <a href="/api/status" class="btn">📊 وضعیت سیستم</a>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background: #e7f3ff; border-radius: 8px;">
            <h4>ℹ️ اطلاعات فنی</h4>
            <p><strong>پست:</strong> ۱۲۷ | <strong>ورژن:</strong> ۱.۰.۰ | <strong>آخرین بروزرسانی:</strong> ${new Date().toLocaleString('fa-IR')}</p>
        </div>
    </div>
</body>
</html>`;
        return htmlResponse(html);
      }

      // 🧠 صفحه NLP - پست ۱۲۷
      if (path === '/nlp') {
        const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پردازش زبان طبیعی - پست ۱۲۷</title>
    <style>
        body { 
            font-family: Tahoma; 
            direction: rtl; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px; 
        }
        .nlp-container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .header { 
            background: #007bff; 
            color: white; 
            padding: 30px; 
            text-align: center; 
        }
        .content { 
            padding: 30px; 
        }
        .analysis-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-right: 4px solid #007bff;
        }
        .home-btn { 
            display: inline-block; 
            margin: 10px; 
            padding: 10px 20px; 
            background: #6c757d; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        .home-btn:hover {
            background: #545b62;
        }
        .feature-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            text-align: right;
        }
    </style>
</head>
<body>
    <a href="/" class="home-btn">🏠 صفحه اصلی</a>
    
    <div class="nlp-container">
        <div class="header">
            <h1>🧠 پردازش زبان طبیعی (NLP) - پست ۱۲۷</h1>
            <p>سیستم پیشرفته تحلیل و پردازش متون فارسی</p>
        </div>
        
        <div class="content">
            <div class="analysis-box">
                <h3>📊 وضعیت سامانه</h3>
                <ul>
                    <li>✅ مدل‌های پردازش متن: فعال</li>
                    <li>✅ تحلیل احساسات: آماده</li>
                    <li>✅ دسته‌بندی محتوا: فعال</li>
                    <li>✅ پردازش زبان فارسی: فعال</li>
                </ul>
            </div>

            <h3>🎯 قابلیت‌های سامانه</h3>
            
            <div class="feature-card">
                <h4>📝 تحلیل احساسات</h4>
                <p>تشخیص خودکار احساسات مثبت، منفی و خنثی در متن</p>
            </div>
            
            <div class="feature-card">
                <h4>🏷️ دسته‌بندی موضوعی</h4>
                <p>طبقه‌بندی متون به دسته‌های مختلف موضوعی</p>
            </div>
            
            <div class="feature-card">
                <h4>🔤 پردازش زبان فارسی</h4>
                <p>تحلیل تخصصی متون فارسی با پشتیبانی از ویژگی‌های زبان فارسی</p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-radius: 10px;">
                <h4>📈 اطلاعات فنی پست ۱۲۷</h4>
                <p><strong>شناسه پست:</strong> ۱۲۷</p>
                <p><strong>ورژن مدل:</strong> NLP-Persian-v2.0</p>
                <p><strong>آخرین بروزرسانی:</strong> ${new Date().toLocaleString('fa-IR')}</p>
                <p><strong>وضعیت:</strong> فعال و پایدار</p>
            </div>
        </div>
    </div>
</body>
</html>`;
        return htmlResponse(html);
      }

      // 📊 وضعیت سیستم - پست ۱۲۷
      if (path === '/api/status') {
        return jsonResponse({
          status: "active",
          service: "social-media-intelligence-platform",
          version: "1.0.0",
          post_id: 127,
          timestamp: new Date().toISOString(),
          features: {
            nlp: true,
            sentiment_analysis: true,
            text_classification: true,
            persian_language_support: true
          },
          endpoints: ["/", "/nlp", "/api/status"]
        });
      }

      // تست API ساده برای NLP
      if (path === '/api/nlp/analyze' && method === 'POST') {
        const { text = '' } = await request.json();
        
        // شبیه‌سازی تحلیل ساده
        const analysis = {
          sentiment: text.includes('خوب') || text.includes('عالی') ? 'positive' : 
                     text.includes('بد') || text.includes('ضعیف') ? 'negative' : 'neutral',
          word_count: text.split(' ').length,
          contains_persian: /[\u0600-\u06FF]/.test(text),
          post_id: 127
        };
        
        return jsonResponse({
          success: true,
          analysis: analysis,
          post_id: 127,
          timestamp: new Date().toISOString()
        });
      }

      // سایر مسیرها
      return jsonResponse({
        error: "صفحه یافت نشد",
        available_endpoints: ["/", "/nlp", "/api/status", "/api/nlp/analyze"],
        post_id: 127
      }, 404);

    } catch (error) {
      return jsonResponse({
        error: "خطای سرور",
        message: error.message,
        post_id: 127
      }, 500);
    }
  }
};
