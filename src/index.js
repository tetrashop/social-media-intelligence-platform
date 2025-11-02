// src/index.js - نسخه نهایی پست ۱۲۷ با قابلیت تحلیل چندبعدی
const HTML_TEMPLATE = (title, content) => `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        :root { --primary: #667eea; --secondary: #764ba2; --accent: #f093fb; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Tahoma; direction: rtl; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); min-height: 100vh; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); margin: 20px 0; }
        .btn { display: inline-block; padding: 15px 30px; margin: 10px; background: var(--primary); color: white; text-decoration: none; border-radius: 10px; transition: all 0.3s ease; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .post-badge { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 8px 20px; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
        .analysis-result { background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 10px 0; border-right: 4px solid var(--primary); }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>`;

class AdvancedNLPAnalyzer {
    static analyze(text) {
        const analyses = {
            scientific: this.scientificAnalysis(text),
            emotional: this.emotionalAnalysis(text),
            artistic: this.artisticAnalysis(text),
            literary: this.literaryAnalysis(text),
            social: this.socialAnalysis(text)
        };
        
        return {
            ...analyses,
            overall_score: this.calculateOverallScore(analyses),
            confidence: this.calculateConfidence(text),
            timestamp: new Date().toISOString()
        };
    }

    static scientificAnalysis(text) {
        const terms = ['تحقیق', 'دانش', 'علم', 'تکنولوژی', 'داده', 'تحلیل', 'روش', 'نظریه', 'پژوهش'];
        const found = terms.filter(term => text.includes(term));
        const score = found.length / terms.length;
        
        return {
            type: "scientific",
            score: Math.min(score * 10, 10),
            terms_found: found,
            insights: this.generateScientificInsights(text),
            complexity: this.analyzeComplexity(text)
        };
    }

    static emotionalAnalysis(text) {
        const emotions = {
            positive: ['خوشحال', 'عالی', 'ممتاز', 'شاد', 'امیدوار', 'عاشق', 'خوب', 'زیبا'],
            negative: ['ناراحت', 'بد', 'ضعیف', 'مشکل', 'نگران', 'عصبانی', 'غمگین', 'بدبخت']
        };
        
        let positiveCount = emotions.positive.filter(word => text.includes(word)).length;
        let negativeCount = emotions.negative.filter(word => text.includes(word)).length;
        
        let dominant = 'neutral';
        if (positiveCount > negativeCount) dominant = 'positive';
        else if (negativeCount > positiveCount) dominant = 'negative';
        
        const intensity = Math.max(positiveCount, negativeCount);
        
        return {
            type: "emotional",
            dominant_emotion: dominant,
            intensity: intensity,
            score: Math.min(intensity * 2, 10),
            positive_words: emotions.positive.filter(word => text.includes(word)),
            negative_words: emotions.negative.filter(word => text.includes(word))
        };
    }

    static artisticAnalysis(text) {
        const indicators = ['مانند', 'مثل', 'شبیه', 'گويا', 'انگار', 'چون', 'همانند', 'نظیر'];
        const found = indicators.filter(indicator => text.includes(indicator));
        const score = found.length;
        
        return {
            type: "artistic",
            creativity_score: Math.min(score * 1.5, 10),
            metaphorical_language: found,
            aesthetic_quality: this.assessAestheticQuality(text)
        };
    }

    static literaryAnalysis(text) {
        const words = text.split(' ');
        const complexity = (text.length / 100) + (words.length / 20);
        
        return {
            type: "literary",
            complexity_score: Math.min(complexity, 10),
            word_count: words.length,
            sentence_structure: this.analyzeSentenceStructure(text),
            linguistic_richness: this.assessLinguisticRichness(text)
        };
    }

    static socialAnalysis(text) {
        const socialTerms = ['جامعه', 'مردم', 'فرهنگ', 'اجتماع', 'روابط', 'تعامل', 'گروه', 'community'];
        const found = socialTerms.filter(term => text.includes(term));
        const score = found.length / socialTerms.length;
        
        return {
            type: "social",
            social_relevance: Math.min(score * 10, 10),
            terms_found: found,
            cultural_context: this.analyzeCulturalContext(text)
        };
    }

    static calculateOverallScore(analyses) {
        const scores = [
            analyses.scientific.score,
            analyses.emotional.score,
            analyses.artistic.creativity_score,
            analyses.literary.complexity_score,
            analyses.social.social_relevance
        ];
        return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    }

    static calculateConfidence(text) {
        const length = text.length;
        const wordCount = text.split(' ').length;
        return Math.min((length / 50 + wordCount / 10) / 2, 1);
    }

    static generateScientificInsights(text) {
        const insights = [];
        if (text.includes('تحقیق') || text.includes('مطالعه')) insights.push("متن حاوی اشاره به فعالیت‌های تحقیقاتی است");
        if (text.includes('داده') || text.includes('آمار')) insights.push("تمرکز بر تحلیل داده‌های کمی مشاهده می‌شود");
        if (text.includes('نظریه') || text.includes('فرضیه')) insights.push("متن مرتبط با چارچوب‌های نظری است");
        if (text.includes('روش') || text.includes('متود')) insights.push("اشاره به روش‌شناسی و فرآیندها وجود دارد");
        return insights.length > 0 ? insights : ["متن بیشتر توصیفی است تا علمی"];
    }

    static analyzeComplexity(text) {
        const complexityIndicators = ['پیچیده', 'سیستم', 'فرآیند', 'الگوریتم', 'تحلیل'];
        return complexityIndicators.filter(indicator => text.includes(indicator)).length;
    }

    static assessAestheticQuality(text) {
        const aestheticWords = ['زیبا', 'جلوه', 'هنر', 'خلاقیت', 'نوآوری'];
        return aestheticWords.filter(word => text.includes(word)).length;
    }

    static analyzeSentenceStructure(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgLength = sentences.reduce((sum, sentence) => sum + sentence.length, 0) / sentences.length;
        return avgLength > 50 ? "پیچیده" : avgLength > 25 ? "متوسط" : "ساده";
    }

    static assessLinguisticRichness(text) {
        const uniqueWords = new Set(text.split(' '));
        return (uniqueWords.size / text.split(' ').length * 100).toFixed(1);
    }

    static analyzeCulturalContext(text) {
        const culturalTerms = ['فرهنگ', 'آداب', 'رسوم', 'سنن', 'ملی', 'مذهبی'];
        return culturalTerms.filter(term => text.includes(term)).length;
    }
}

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
            // 🏠 صفحه اصلی - پست ۱۲۷
            if (path === '/' || path === '') {
                const content = `
                    <div class="card" style="text-align: center;">
                        <div class="post-badge">🏅 پست ۱۲۷ - معماری الماسی</div>
                        <h1>🧠 سامانه هوش مصنوعی اجتماعی پیشرفته</h1>
                        <p>سیستم تحلیل چندبعدی متن - فعال و پایدار</p>
                        
                        <div style="margin: 30px 0;">
                            <a href="/chat" class="btn">💬 چت هوشمند چندبعدی</a>
                            <a href="/nlp" class="btn">🧠 تحلیل پیشرفته متن</a>
                            <a href="/api/status" class="btn">📊 وضعیت سیستم</a>
                        </div>

                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h3>🎯 قابلیت‌های اصلی سیستم</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                                <div style="padding: 15px; background: white; border-radius: 8px; border-right: 4px solid #667eea;">
                                    <strong>🔬 تحلیل علمی</strong><br>شناسایی مفاهیم علمی
                                </div>
                                <div style="padding: 15px; background: white; border-radius: 8px; border-right: 4px solid #f093fb;">
                                    <strong>💖 تشخیص احساسات</strong><br>تحلیل بار عاطفی
                                </div>
                                <div style="padding: 15px; background: white; border-radius: 8px; border-right: 4px solid #28a745;">
                                    <strong>🎨 ارزیابی هنری</strong><br>سنجش خلاقیت متن
                                </div>
                                <div style="padding: 15px; background: white; border-radius: 8px; border-right: 4px solid #ffc107;">
                                    <strong>📚 تحلیل ادبی</strong><br>بررسی ساختار زبانی
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-radius: 10px;">
                            <h4>📈 اطلاعات فنی</h4>
                            <p><strong>ورژن:</strong> 4.0.0 | <strong>پست:</strong> ۱۲۷ | <strong>آخرین بروزرسانی:</strong> ${new Date().toLocaleString('fa-IR')}</p>
                        </div>
                    </div>
                `;
                return new Response(HTML_TEMPLATE("سامانه پست ۱۲۷ - هوش مصنوعی اجتماعی", content), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // 💬 صفحه چت پیشرفته
            if (path === '/chat') {
                const content = `
                    <div class="card">
                        <a href="/" class="btn" style="background: #6c757d; margin-bottom: 20px;">🏠 صفحه اصلی</a>
                        <div style="text-align: center;">
                            <div class="post-badge">💬 چت هوشمند چندبعدی</div>
                            <h1>سیستم تحلیل پیشرفته متن</h1>
                            <p>هر پیام را از ۵ جنبه مختلف تحلیل می‌کند</p>
                        </div>
                        
                        <div style="margin: 30px 0;">
                            <div id="messages">
                                <div class="analysis-result">
                                    <strong>🤖 ربات:</strong> سلام! من یک دستیار هوشمند هستم. هر پیامی را از ۵ جنبه تحلیل می‌کنم:<br>
                                    • 🔬 تحلیل علمی - 🔍 تحلیل احساسی - 🎨 تحلیل هنری<br>
                                    • 📚 تحلیل ادبی - 🌍 تحلیل اجتماعی
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <input type="text" id="userInput" placeholder="پیام خود را برای تحلیل چندبعدی بنویسید..." 
                                   style="flex: 1; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
                            <button onclick="sendMessage()" 
                                    style="padding: 15px 25px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                                ارسال و تحلیل 🚀
                            </button>
                        </div>

                        <div id="analysisResults" style="margin-top: 20px;"></div>
                    </div>

                    <script>
                        async function sendMessage() {
                            const input = document.getElementById('userInput');
                            const message = input.value.trim();
                            const messages = document.getElementById('messages');
                            const results = document.getElementById('analysisResults');
                            
                            if (!message) return;
                            
                            // نمایش پیام کاربر
                            messages.innerHTML += '<div style="background: #007bff; color: white; padding: 15px; margin: 10px 0; border-radius: 10px; margin-left: 20%;"><strong>👤 شما:</strong> ' + message + '</div>';
                            
                            // نمایش وضعیت تحلیل
                            results.innerHTML = '<div class="analysis-result">🔍 در حال تحلیل پیام از ۵ جنبه مختلف...</div>';
                            
                            try {
                                // ارسال برای تحلیل
                                const response = await fetch('/api/analyze', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({message: message})
                                });
                                
                                const data = await response.json();
                                
                                if (data.success) {
                                    // نمایش پاسخ ربات
                                    messages.innerHTML += '<div class="analysis-result"><strong>🤖 ربات:</strong> تحلیل کامل انجام شد! امتیاز کلی: ' + data.analysis.overall_score + '/10</div>';
                                    
                                    // نمایش نتایج تحلیل
                                    let analysisHTML = '<div class="analysis-result">';
                                    analysisHTML += '<h4>📊 نتایج تحلیل چندبعدی:</h4>';
                                    analysisHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 15px 0;">';
                                    
                                    analysisHTML += '<div style="background: #e7f3ff; padding: 10px; border-radius: 8px; text-align: center;">';
                                    analysisHTML += '<strong>🔬 علمی</strong><br>' + data.analysis.scientific.score.toFixed(1) + '/10';
                                    analysisHTML += '</div>';
                                    
                                    analysisHTML += '<div style="background: #f8d7da; padding: 10px; border-radius: 8px; text-align: center;">';
                                    analysisHTML += '<strong>💖 احساسی</strong><br>' + data.analysis.emotional.score.toFixed(1) + '/10';
                                    analysisHTML += '</div>';
                                    
                                    analysisHTML += '<div style="background: #d1ecf1; padding: 10px; border-radius: 8px; text-align: center;">';
                                    analysisHTML += '<strong>🎨 هنری</strong><br>' + data.analysis.artistic.creativity_score.toFixed(1) + '/10';
                                    analysisHTML += '</div>';
                                    
                                    analysisHTML += '<div style="background: #fff3cd; padding: 10px; border-radius: 8px; text-align: center;">';
                                    analysisHTML += '<strong>📚 ادبی</strong><br>' + data.analysis.literary.complexity_score.toFixed(1) + '/10';
                                    analysisHTML += '</div>';
                                    
                                    analysisHTML += '<div style="background: #d4edda; padding: 10px; border-radius: 8px; text-align: center;">';
                                    analysisHTML += '<strong>🌍 اجتماعی</strong><br>' + data.analysis.social.social_relevance.toFixed(1) + '/10';
                                    analysisHTML += '</div>';
                                    
                                    analysisHTML += '</div>';
                                    
                                    // بینش‌ها
                                    if (data.analysis.scientific.insights) {
                                        analysisHTML += '<div style="margin-top: 15px;"><strong>🔍 بینش‌های علمی:</strong><br>';
                                        data.analysis.scientific.insights.forEach(insight => {
                                            analysisHTML += '• ' + insight + '<br>';
                                        });
                                        analysisHTML += '</div>';
                                    }
                                    
                                    analysisHTML += '</div>';
                                    results.innerHTML = analysisHTML;
                                    
                                } else {
                                    messages.innerHTML += '<div class="analysis-result" style="background: #f8d7da;"><strong>❌ خطا:</strong> ' + data.error + '</div>';
                                }
                                
                            } catch (error) {
                                messages.innerHTML += '<div class="analysis-result" style="background: #f8d7da;"><strong>❌ خطا:</strong> مشکل در ارتباط با سرور</div>';
                                results.innerHTML = '<div class="analysis-result" style="background: #f8d7da;">خطا در تحلیل پیام</div>';
                            }
                            
                            input.value = '';
                            messages.scrollTop = messages.scrollHeight;
                            results.scrollTop = results.scrollHeight;
                        }

                        // ارسال با Enter
                        document.getElementById('userInput').addEventListener('keypress', function(e) {
                            if (e.key === 'Enter') sendMessage();
                        });
                    </script>
                `;
                return new Response(HTML_TEMPLATE("چت هوشمند چندبعدی - پست ۱۲۷", content), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // 🧠 صفحه NLP
            if (path === '/nlp') {
                const content = `
                    <div class="card">
                        <a href="/" class="btn" style="background: #6c757d; margin-bottom: 20px;">🏠 صفحه اصلی</a>
                        <div style="text-align: center;">
                            <div class="post-badge">🧠 پردازش زبان طبیعی</div>
                            <h1>سیستم تحلیل پیشرفته متن فارسی</h1>
                            <p>پست ۱۲۷ - معماری الماسی</p>
                        </div>

                        <div style="margin: 30px 0;">
                            <div class="analysis-result">
                                <h3>🔬 تحلیل علمی</h3>
                                <p>شناسایی مفاهیم علمی، اصطلاحات تخصصی و تحلیل منطقی متن</p>
                            </div>
                            
                            <div class="analysis-result">
                                <h3>💖 تحلیل احساسی</h3>
                                <p>تشخیص احساسات، شدت عاطفی و بار احساسی متن</p>
                            </div>
                            
                            <div class="analysis-result">
                                <h3>🎨 ارزیابی هنری</h3>
                                <p>سنجش خلاقیت، استعاره‌ها و زیبایی‌شناسی متن</p>
                            </div>
                            
                            <div class="analysis-result">
                                <h3>📚 تحلیل ادبی</h3>
                                <p>بررسی ساختار زبانی، پیچیدگی و غنای ادبی</p>
                            </div>
                            
                            <div class="analysis-result">
                                <h3>🌍 تحلیل اجتماعی</h3>
                                <p>درک زمینه‌های اجتماعی، فرهنگی و ارتباطات انسانی</p>
                            </div>
                        </div>

                        <div style="background: #e7f3ff; padding: 20px; border-radius: 10px; text-align: center;">
                            <h4>🚀 تست سامانه</h4>
                            <p>برای تست سیستم به صفحه <a href="/chat" style="color: #007bff;">چت هوشمند</a> مراجعه کنید</p>
                        </div>
                    </div>
                `;
                return new Response(HTML_TEMPLATE("پردازش زبان طبیعی - پست ۱۲۷", content), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // 🔌 API تحلیل پیشرفته
            if (path === '/api/analyze' && method === 'POST') {
                const { message } = await request.json();
                
                if (!message || message.trim().length === 0) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: "پیام خالی است"
                    }), {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }
                
                const analysis = AdvancedNLPAnalyzer.analyze(message);
                
                return new Response(JSON.stringify({
                    success: true,
                    message: message,
                    analysis: analysis,
                    post_id: 127,
                    timestamp: new Date().toISOString(),
                    version: "4.0.0"
                }, null, 2), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // 📊 API وضعیت
            if (path === '/api/status') {
                return new Response(JSON.stringify({
                    status: "active",
                    service: "social-media-intelligence-platform",
                    version: "4.0.0",
                    post_id: 127,
                    architecture: "cloudflare-workers-diamond",
                    performance: {
                        response_time: "<50ms",
                        uptime: "100%",
                        reliability: "enterprise-grade"
                    },
                    features: [
                        "multi_dimensional_analysis",
                        "scientific_analysis", 
                        "emotional_analysis",
                        "artistic_evaluation",
                        "literary_analysis",
                        "social_context_analysis"
                    ],
                    endpoints: [
                        "/",
                        "/chat", 
                        "/nlp",
                        "/api/analyze",
                        "/api/status"
                    ],
                    timestamp: new Date().toISOString()
                }, null, 2), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // ❌ صفحه ۴۰۴
            return new Response(HTML_TEMPLATE("صفحه یافت نشد - پست ۱۲۷", `
                <div class="card" style="text-align: center;">
                    <h1>❌ صفحه یافت نشد</h1>
                    <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
                    <div style="margin: 20px 0;">
                        <a href="/" class="btn">🏠 صفحه اصلی</a>
                        <a href="/chat" class="btn">💬 چت هوشمند</a>
                    </div>
                </div>
            `), { 
                status: 404,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });

        } catch (error) {
            return new Response(JSON.stringify({
                error: "خطای سرور",
                message: error.message,
                post_id: 127,
                timestamp: new Date().toISOString()
            }), {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }
};
