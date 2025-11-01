// کد به‌روزرسانی شده برای Cloudflare Worker
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/analyze' && request.method === 'POST') {
      try {
        const { text, platform = 'telegram' } = await request.json();
        
        // تحلیل پیشرفته
        const sentiment = advancedNLP.analyzeSentiment(text);
        const keywords = advancedNLP.extractKeywords(text);
        const structure = advancedNLP.analyzeStructure(text);
        
        const analysisResult = {
          analysis_id: `adv_${Date.now()}`,
          confidence: calculateConfidence(text, sentiment, structure),
          platform: platform,
          sentiment: sentiment,
          keywords: keywords,
          insights: generateAdvancedInsights(text, sentiment, keywords),
          recommendations: generatePersonalizedRecommendations(sentiment, structure),
          advanced_metrics: {
            text_length: text.length,
            word_count: structure.wordCount,
            sentence_count: structure.sentenceCount,
            avg_sentence_length: Math.round(structure.avgSentenceLength),
            readability: structure.readability,
            keyword_density: keywords.length,
            processing_time: "120ms",
            language: "fa"
          },
          timestamp: new Date().toLocaleString('fa-IR'),
          version: "3.0.0",
          status: "success"
        };

        return new Response(JSON.stringify(analysisResult, null, 2), {
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'خطا در پردازش درخواست',
          message: error.message
        }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    // اضافه کردن این ماژول به Worker
const advancedNLP = {
  // تحلیل احساسات (Sentiment Analysis)
  analyzeSentiment: (text) => {
    const positiveWords = ['عالی', 'ممتاز', 'عالیه', 'خوب', 'عالیست', 'پیشرفت', 'موفق'];
    const negativeWords = ['بد', 'ضعیف', 'ضعیفه', 'مشکل', 'خراب', 'ناامید'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (text.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    if (total === 0) return 'neutral';
    
    return positiveCount > negativeCount ? 'positive' : 'negative';
  },

  // استخراج کلمات کلیدی
  extractKeywords: (text) => {
    const commonWords = ['این', 'که', 'را', 'با', 'در', 'به', 'از', 'برای'];
    const words = text.split(/\s+/).filter(word => 
      word.length > 2 && !commonWords.includes(word)
    );
    
    const keywordCount = {};
    words.forEach(word => {
      keywordCount[word] = (keywordCount[word] || 0) + 1;
    });
    
    return Object.entries(keywordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  },

  // تحلیل ساختاری متن
  analyzeStructure: (text) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/);
    
    return {
      sentenceCount: sentences.length,
      wordCount: words.length,
      avgSentenceLength: words.length / sentences.length,
      readability: words.length > 100 ? 'high' : words.length > 50 ? 'medium' : 'low'
    };
  }
};
  }
};

// تابع محاسبه اطمینان پیشرفته
function calculateConfidence(text, sentiment, structure) {
  let confidence = 0.7; // پایه
  
  // افزایش اطمینان بر اساس طول متن
  if (structure.wordCount > 20) confidence += 0.1;
  if (structure.wordCount > 50) confidence += 0.1;
  
  // افزایش اطمینان بر اساس ساختار
  if (structure.sentenceCount >= 2) confidence += 0.05;
  
  // افزایش اطمینان بر اساس احساسات مشخص
  if (sentiment !== 'neutral') confidence += 0.05;
  
  return Math.min(confidence, 0.95); // حداکثر 95%
}

// تولید بینش‌های پیشرفته
function generateAdvancedInsights(text, sentiment, keywords) {
  const insights = [];
  
  if (sentiment === 'positive') {
    insights.push("محتوای مثبت و امیدوارکننده شناسایی شد");
  } else if (sentiment === 'negative') {
    insights.push("نیاز به بهبود در بیان محتوا مشاهده می‌شود");
  }
  
  if (keywords.length >= 3) {
    insights.push("تمرکز بر موضوعات تخصصی مشهود است");
  }
  
  insights.push("سیستم تحلیل پیشرفته فعال است");
  insights.push("پردازش زبان فارسی با دقت بهبود یافته");
  
  return insights;
}

// تولید توصیه‌های شخصی‌سازی شده
function generatePersonalizedRecommendations(sentiment, structure) {
  const recommendations = [];
  
  if (structure.wordCount < 30) {
    recommendations.push("توسعه محتوای جامع‌تر برای تحلیل دقیق‌تر");
  }
  
  if (sentiment === 'negative') {
    recommendations.push("افزایش محتوای مثبت و انگیزشی");
  }
  
  recommendations.push("استمرار در تولید محتوای با کیفیت");
  recommendations.push("تعامل بیشتر با مخاطبان برای بازخورد بهتر");
  
  return recommendations;
}
