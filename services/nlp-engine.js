const natural = require('natural');
let francMin = null;
try { francMin = require('franc-min'); } catch(e) {}
let nlpCompromise = null;
try { nlpCompromise = require('compromise'); } catch(e) {}

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

function detectLanguage(text) {
  if (!francMin) return 'unknown';
  try {
    const langCode = francMin(text, { minLength: 3 });
    const map = { eng: 'English', fra: 'French', deu: 'German', spa: 'Spanish', por: 'Portuguese', ita: 'Italian', nld: 'Dutch', rus: 'Russian', ara: 'Arabic', jpn: 'Japanese', zho: 'Chinese', kor: 'Korean', hin: 'Hindi', tur: 'Turkish', pes: 'Persian' };
    return map[langCode] || langCode;
  } catch (e) { return 'unknown'; }
}

function tokenizeAndStem(text) {
  const tokens = tokenizer.tokenize(text);
  const stems = tokens.map(t => { try { return stemmer.stem(t); } catch(e) { return t; } });
  return { tokens, stems };
}

function getSentiment(tokens) {
  try { return sentimentAnalyzer.getSentiment(tokens); } catch(e) { return 0; }
}

function posTag(text) {
  if (!nlpCompromise) return [];
  try {
    const doc = nlpCompromise(text);
    return doc.json({ terms: { normal: true, tags: true } }).map(s => s.terms);
  } catch(e) { return []; }
}

function extractKeywords(text, numKeywords = 5) {
  try {
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();
    tfidf.addDocument(text);
    const terms = [];
    tfidf.listTerms(0).slice(0, numKeywords).forEach(item => terms.push({ term: item.term, tfidf: item.tfidf }));
    return terms;
  } catch(e) { return []; }
}

async function analyze(text) {
  const { tokens, stems } = tokenizeAndStem(text);
  const sentiment = getSentiment(tokens);
  const language = detectLanguage(text);
  const pos = posTag(text);
  const keywords = extractKeywords(text);
  return { language, tokens, stems, sentiment, pos, keywords, timestamp: new Date().toISOString() };
}

module.exports = { detectLanguage, tokenizeAndStem, getSentiment, posTag, extractKeywords, analyze };
