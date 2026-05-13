// services/analyzer.js
const natural = require('natural');
const { getDB } = require('../database');

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const analyzer = new natural.SentimentAnalyzer('English', stemmer, 'afinn');

// Personality keywords (simple dictionary)
const traitMap = {
  openness: ['creative', 'curious', 'adventurous', 'innovative'],
  conscientiousness: ['organized', 'responsible', 'reliable', 'disciplined'],
  extraversion: ['outgoing', 'energetic', 'talkative', 'social'],
  agreeableness: ['kind', 'sympathetic', 'cooperative', 'warm'],
  neuroticism: ['anxious', 'moody', 'worried', 'tense']
};

function analyzeText(text) {
  const tokens = tokenizer.tokenize(text);
  const stems = tokens.map(t => stemmer.stem(t));
  const sentimentScore = analyzer.getSentiment(tokens);
  
  // Personality trait detection
  const traits = {};
  for (const [trait, keywords] of Object.entries(traitMap)) {
    const stemmedKeywords = keywords.map(k => stemmer.stem(k));
    const count = stems.filter(s => stemmedKeywords.includes(s)).length;
    traits[trait] = (count / stems.length) || 0;
  }

  // Generate "deep thinking" insight
  const dominantTrait = Object.keys(traits).reduce((a, b) => traits[a] > traits[b] ? a : b);
  const insight = generateInsight(dominantTrait, sentimentScore);

  return {
    tokens,
    sentiment: sentimentScore,
    traits,
    dominantTrait,
    insight,
    timestamp: new Date().toISOString()
  };
}

function generateInsight(trait, sentiment) {
  const mood = sentiment > 0 ? 'مثبت' : sentiment < 0 ? 'منفی' : 'خنثی';
  return `الگوی غالب شخصیتی: ${trait}، با بار احساسی ${mood} (${sentiment.toFixed(2)})`;
}

// Cache social media analysis in DB
async function analyzeSocialPost(postUrl, postContent) {
  const db = getDB();

  // Check cache
  const cached = await db.getAsync('SELECT * FROM social_analyses WHERE url = ?', [postUrl]);
  if (cached) {
    console.log('تحلیل از کش خوانده شد');
    return JSON.parse(cached.analysis);
  }

  // Simulate scraping (use axios/cheerio if needed)
  const text = postContent || 'محتوای نمونه';
  const analysis = analyzeText(text);
  const keywordsStr = analysis.tokens.slice(0, 10).join(',');

  // Store in DB
  await db.runAsync(
    'INSERT OR REPLACE INTO social_analyses (url, analysis, sentiment, keywords) VALUES (?, ?, ?, ?)',
    [postUrl, JSON.stringify(analysis), analysis.sentiment, keywordsStr]
  );

  return analysis;
}

module.exports = { analyzeText, analyzeSocialPost };
