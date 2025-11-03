const fs = require('fs');

let content = fs.readFileSync('src/index.js', 'utf8');

// پیدا کردن بخش API تحلیل و جایگزینی با کد ساده‌تر
const newAnalyzeCode = `            // 🔌 API تحلیل
            if (path === '/api/analyze' && method === 'POST') {
                try {
                    const { text } = await request.json();
                    
                    if (!text || text.trim().length === 0) {
                        return new Response(JSON.stringify({
                            success: false,
                            error: "متن ارسال نشده است"
                        }), {
                            status: 400,
                            headers: { 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            }
                        });
                    }
                    
                    // تحلیل ساده و مطمئن متن
                    const words = text.split(' ').filter(word => word.length > 0);
                    const textLength = text.length;
                    
                    // محاسبه امتیازات
                    const scientificScore = Math.min(textLength / 15, 10);
                    const emotionalScore = Math.min((text.match(/خوشحال|خوب|عالی|مثبت|ناراحت|بد|منفی|غمگین/g) || []).length * 3, 10);
                    const artisticScore = Math.min((text.match(/مانند|مثل|شبیه|چون|نظیر/g) || []).length * 3, 10);
                    const literaryScore = Math.min((textLength / 100) + (words.length / 25), 10);
                    const socialScore = Math.min((text.match(/جامعه|مردم|فرهنگ|اجتماع|روابط/g) || []).length * 3, 10);
                    
                    const overallScore = (
                        scientificScore +
                        emotionalScore +
                        artisticScore +
                        literaryScore +
                        socialScore
                    ) / 5;
                    
                    const analysis = {
                        scientific: {
                            score: scientificScore.toFixed(1),
                            terms_found: text.match(/علم|تحقیق|دانش|تکنولوژی|داده/g) || [],
                            complexity: textLength > 100 ? "بالا" : "متوسط"
                        },
                        emotional: {
                            score: emotionalScore.toFixed(1),
                            dominant_emotion: text.includes('خوشحال') || text.includes('خوب') ? "مثبت" : 
                                            text.includes('ناراحت') || text.includes('بد') ? "منفی" : "خنثی",
                            intensity: Math.min(emotionalScore, 10)
                        },
                        artistic: {
                            creativity_score: artisticScore.toFixed(1),
                            metaphorical_language: text.match(/مانند|مثل|شبیه/g) || []
                        },
                        literary: {
                            complexity_score: literaryScore.toFixed(1),
                            word_count: words.length,
                            structure: words.length > 25 ? "پیچیده" : "ساده"
                        },
                        social: {
                            social_relevance: socialScore.toFixed(1),
                            terms_found: text.match(/جامعه|مردم|فرهنگ|اجتماع/g) || []
                        }
                    };
                    
                    return new Response(JSON.stringify({
                        success: true,
                        text: text,
                        analysis: analysis,
                        overall_score: overallScore.toFixed(1),
                        post_id: 127,
                        timestamp: new Date().toISOString(),
                        version: "8.0.2"
                    }), {
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                    
                } catch (error) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: "خطا در پردازش متن",
                        message: error.message
                    }), {
                        status: 500,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }
            }`;

// جایگزینی بخش API تحلیل
const startMarker = "// 🔌 API تحلیل";
const endMarker = "// 📊 API وضعیت";
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    content = before + newAnalyzeCode + "\\n\\n            " + after;
    
    fs.writeFileSync('src/index.js', content);
    console.log('✅ API تحلیل با کد مطمئن‌تر جایگزین شد');
} else {
    console.log('❌ نتوانستیم بخش API تحلیل را پیدا کنیم');
}
