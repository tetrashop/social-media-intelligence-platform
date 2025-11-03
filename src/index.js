// src/index.js - کد نهایی و مستقل
const DIAMOND_ARCHITECTURE = {
  version: "5.0.0",
  post_id: 127,
  features: [
    "multi_dimensional_analysis",
    "scientific_evaluation", 
    "emotional_intelligence",
    "artistic_assessment",
    "literary_analysis",
    "social_context"
  ]
};

class DiamondNLP {
  static analyze(text) {
    return {
      scientific: this.scientificAnalysis(text),
      emotional: this.emotionalAnalysis(text),
      artistic: this.artisticAnalysis(text),
      literary: this.literaryAnalysis(text),
      social: this.socialAnalysis(text),
      overall_score: this.calculateOverallScore(text),
      confidence: this.calculateConfidence(text),
      timestamp: new Date().toISOString()
    };
  }

  static scientificAnalysis(text) {
    const terms = ['علم', 'تحقیق', 'دانش', 'تکنولوژی', 'داده', 'تحلیل', 'روش', 'نظریه', 'پژوهش'];
    const found = terms.filter(term => text.includes(term));
    return {
      score: Math.min((found.length / terms.length) * 10, 10),
      terms_found: found,
      complexity: text.length > 100 ? "high" : "medium"
    };
  }

  static emotionalAnalysis(text) {
    const positive = ['خوشحال', 'عالی', 'ممتاز', 'شاد', 'امیدوار', 'خوب', 'زیبا'];
    const negative = ['ناراحت', 'بد', 'ضعیف', 'مشکل', 'نگران', 'عصبانی', 'غمگین'];
    
    const posCount = positive.filter(word => text.includes(word)).length;
    const negCount = negative.filter(word => text.includes(word)).length;
    
    return {
      score: Math.min(Math.max(posCount, negCount) * 2, 10),
      dominant_emotion: posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral",
      intensity: Math.max(posCount, negCount)
    };
  }

  static artisticAnalysis(text) {
    const indicators = ['مانند', 'مثل', 'شبیه', 'گويا', 'انگار', 'چون'];
    const found = indicators.filter(ind => text.includes(ind));
    return {
      creativity_score: Math.min(found.length * 2, 10),
      metaphorical_language: found
    };
  }

  static literaryAnalysis(text) {
    const words = text.split(' ').length;
    const complexity = Math.min((text.length / 100) + (words / 20), 10);
    return {
      complexity_score: complexity,
      word_count: words,
      structure: words > 20 ? "complex" : "simple"
    };
  }

  static socialAnalysis(text) {
    const terms = ['جامعه', 'مردم', 'فرهنگ', 'اجتماع', 'روابط'];
    const found = terms.filter(term => text.includes(term));
    return {
      social_relevance: Math.min((found.length / terms.length) * 10, 10),
      terms_found: found
    };
  }

  static calculateOverallScore(text) {
    const analyses = [
      this.scientificAnalysis(text).score,
      this.emotionalAnalysis(text).score,
      this.artisticAnalysis(text).creativity_score,
      this.literaryAnalysis(text).complexity_score,
      this.socialAnalysis(text).social_relevance
    ];
    return (analyses.reduce((a, b) => a + b, 0) / analyses.length).toFixed(1);
  }

  static calculateConfidence(text) {
    return Math.min(text.length / 50, 1);
  }
}

const HTML_TEMPLATE = (title, content) => `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - پست ۱۲۷</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Tahoma, Arial, sans-serif;
            direction: rtl;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .card { 
            background: white; 
            padding: 40px; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            background: #5a6fd8;
        }
        .post-badge {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 15px;
            font-weight: bold;
        }
        .analysis-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
            border-right: 4px solid #667eea;
        }
        .message {
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            max-width: 80%;
        }
        .user-message {
            background: #007bff;
            color: white;
            margin-left: auto;
            margin-right: 0;
        }
        .bot-message {
            background: #e7f3ff;
            margin-right: auto;
            margin-left: 0;
        }
        input[type="text"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            margin: 10px 0;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>`;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // CORS handling
        if (method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });
        }

        try {
            // 🏠 صفحه اصلی
            if (path === '/' || path === '') {
                const content = `
                    <div class="card" style="text-align: center;">
                        <div class="post-badge">🏅 معماری الماسی - پست ۱۲۷</div>
                        <h1>🧠 سامانه هوش مصنوعی اجتماعی</h1>
                        <p>سیستم تحلیل چندبعدی متن - نسخه ۵.۰.۰</p>
                        
                        <div style="margin: 30px 0;">
                            <a href="/chat" class="btn">💬 چت هوشمند</a>
                            <a href="/analyze" class="btn">📊 تحلیل متن</a>
                            <a href="/api/status" class="btn">🔧 وضعیت سیستم</a>
                        </div>

                        <div class="stats-grid">
                            <div class="stat-item">
                                <div style="font-size: 24px; color: #667eea;">🔬</div>
                                <strong>تحلیل علمی</strong>
                            </div>
                            <div class="stat-item">
                                <div style="font-size: 24px; color: #28a745;">💖</div>
                                <strong>تشخیص احساسات</strong>
                            </div>
                            <div class="stat-item">
                                <div style="font-size: 24px; color: #ffc107;">🎨</div>
                                <strong>ارزیابی هنری</strong>
                            </div>
                            <div class="stat-item">
                                <div style="font-size: 24px; color: #dc3545;">📚</div>
                                <strong>تحلیل ادبی</strong>
                            </div>
                        </div>

                        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                            <h4>📈 اطلاعات فنی</h4>
                            <p><strong>ورژن:</strong> ۵.۰.۰ | <strong>پست:</strong> ۱۲۷</p>
                            <p><strong>آخرین بروزرسانی:</strong> ${new Date().toLocaleString('fa-IR')}</p>
                        </div>
                    </div>
                `;
                return new Response(HTML_TEMPLATE("سامانه هوش مصنوعی", content), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // 💬 صفحه چت
            if (path === '/chat') {
                const content = `
                    <div class="card">
                        <a href="/" class="btn" style="background: #6c757d;">🏠 صفحه اصلی</a>
                        <div style="text-align: center; margin: 20px 0;">
                            <div class="post-badge">💬 چت هوشمند</div>
                            <h2>سیستم تحلیل چندبعدی متن</h2>
                        </div>

                        <div id="chat-container">
                            <div class="message bot-message">
                                <strong>🤖 ربات:</strong> سلام! من یک دستیار هوشمند هستم. هر پیامی را از ۵ جنبه تحلیل می‌کنم.
                            </div>
                        </div>

                        <div style="margin-top: 20px;">
                            <input type="text" id="userInput" placeholder="پیام خود را بنویسید...">
                            <button onclick="sendMessage()" class="btn">ارسال و تحلیل</button>
                        </div>

                        <div id="analysisResults" style="margin-top: 20px;"></div>
                    </div>

                    <script>
                        async function sendMessage() {
                            const input = document.getElementById('userInput');
                            const message = input.value.trim();
                            const chat = document.getElementById('chat-container');
                            const results = document.getElementById('analysisResults');
                            
                            if (!message) return;

                            // نمایش پیام کاربر
                            chat.innerHTML += '<div class="message user-message"><strong>👤 شما:</strong> ' + message + '</div>';
                            
                            // تحلیل
                            results.innerHTML = '<div class="analysis-card">🔍 در حال تحلیل پیام...</div>';
                            
                            try {
                                const response = await fetch('/api/analyze', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({text: message})
                                });
                                
                                const data = await response.json();
                                
                                if (data.success) {
                                    // نمایش پاسخ
                                    chat.innerHTML += '<div class="message bot-message"><strong>🤖 ربات:</strong> تحلیل کامل شد! امتیاز کلی: ' + data.analysis.overall_score + '/10</div>';
                                    
                                    // نمایش نتایج
                                    let html = '<div class="analysis-card">';
                                    html += '<h4>📊 نتایج تحلیل:</h4>';
                                    html += '<div class="stats-grid">';
                                    html += '<div class="stat-item">🔬 علمی: ' + data.analysis.scientific.score.toFixed(1) + '</div>';
                                    html += '<div class="stat-item">💖 احساسی: ' + data.analysis.emotional.score.toFixed(1) + '</div>';
                                    html += '<div class="stat-item">🎨 هنری: ' + data.analysis.artistic.creativity_score.toFixed(1) + '</div>';
                                    html += '<div class="stat-item">📚 ادبی: ' + data.analysis.literary.complexity_score.toFixed(1) + '</div>';
                                    html += '<div class="stat-item">🌍 اجتماعی: ' + data.analysis.social.social_relevance.toFixed(1) + '</div>';
                                    html += '</div></div>';
                                    
                                    results.innerHTML = html;
                                }
                            } catch (error) {
                                chat.innerHTML += '<div class="message bot-message"><strong>❌ خطا:</strong> مشکل در تحلیل</div>';
                            }
                            
                            input.value = '';
                        }

                        document.getElementById('userInput').addEventListener('keypress', function(e) {
                            if (e.key === 'Enter') sendMessage();
                        });
                    </script>
                `;
                return new Response(HTML_TEMPLATE("چت هوشمند", content), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // 📊 صفحه تحلیل
            if (path === '/analyze') {
                const content = `
                    <div class="card">
                        <a href="/" class="btn" style="background: #6c757d;">🏠 صفحه اصلی</a>
                        <div style="text-align: center;">
                            <div class="post-badge">📊 تحلیل متن</div>
                            <h2>تحلیل چندبعدی متن فارسی</h2>
                        </div>

                        <div class="analysis-card">
                            <h3>🔬 تحلیل علمی</h3>
                            <p>شناسایی مفاهیم علمی و اصطلاحات تخصصی</p>
                        </div>
                        
                        <div class="analysis-card">
                            <h3>💖 تحلیل احساسی</h3>
                            <p>تشخیص احساسات و بار عاطفی متن</p>
                        </div>
                        
                        <div class="analysis-card">
                            <h3>🎨 ارزیابی هنری</h3>
                            <p>سنجش خلاقیت و زیبایی‌شناسی</p>
                        </div>
                        
                        <div class="analysis-card">
                            <h3>📚 تحلیل ادبی</h3>
                            <p>بررسی ساختار و پیچیدگی زبانی</p>
                        </div>
                        
                        <div class="analysis-card">
                            <h3>🌍 تحلیل اجتماعی</h3>
                            <p>درک زمینه‌های اجتماعی و فرهنگی</p>
                        </div>
                    </div>
                `;
                return new Response(HTML_TEMPLATE("تحلیل متن", content), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // 🔌 API تحلیل
            if (path === '/api/analyze' && method === 'POST') {
                const { text } = await request.json();
                
                if (!text) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: "متن ارسال نشده است"
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
                
                const analysis = DiamondNLP.analyze(text);
                
                return new Response(JSON.stringify({
                    success: true,
                    analysis: analysis,
                    post_id: 127,
                    version: "5.0.0",
                    timestamp: new Date().toISOString()
                }), {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // 📈 API وضعیت
            if (path === '/api/status') {
                return new Response(JSON.stringify({
                    status: "active",
                    service: "social-media-intelligence-platform",
                    version: "5.0.0",
                    post_id: 127,
                    architecture: "diamond-no-dependencies",
                    performance: "excellent",
                    timestamp: new Date().toISOString(),
                    endpoints: ["/", "/chat", "/analyze", "/api/analyze", "/api/status"]
                }), {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // ❌ صفحه ۴۰۴
            return new Response(HTML_TEMPLATE("صفحه یافت نشد", `
                <div class="card" style="text-align: center;">
                    <h1>❌ صفحه یافت نشد</h1>
                    <p>آدرس درخواستی معتبر نیست.</p>
                    <a href="/" class="btn">بازگشت به صفحه اصلی</a>
                </div>
            `), { status: 404 });

        } catch (error) {
            return new Response(JSON.stringify({
                error: "خطای سرور",
                message: error.message,
                post_id: 127
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
};
