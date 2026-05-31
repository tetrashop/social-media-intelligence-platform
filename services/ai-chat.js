const fs = require('fs');
const path = require('path');
const { NeuralNetwork, TextVectorizer, DEFAULT_VOCABULARY, INTENT_LABELS } = require('./deep-learning');

let nn = null;
const MODEL_PATH = path.join(__dirname, '..', 'data', 'deep-model.json');
try {
  if (fs.existsSync(MODEL_PATH)) {
    nn = NeuralNetwork.fromJSON(JSON.parse(fs.readFileSync(MODEL_PATH, 'utf-8')));
    console.log('✓ مدل یادگیری عمیق بارگذاری شد');
  } else {
    console.log('ℹ️ مدل از پیش‌آموزش‌دیده یافت نشد');
  }
} catch (e) {
  console.error('خطا در بارگذاری مدل:', e.message);
  nn = null;
}

const vectorizer = new TextVectorizer(DEFAULT_VOCABULARY);

function predictIntent(text) {
  if (!nn) return getIntentFallback(text);
  try {
    const inputVec = vectorizer.vectorize(text);
    const output = nn.predict(inputVec);
    const maxIndex = output.indexOf(Math.max(...output));
    return INTENT_LABELS[maxIndex] || 'general';
  } catch (e) {
    return getIntentFallback(text);
  }
}

function getIntentFallback(msg) {
  const lower = msg.toLowerCase();
  if (/^(سلام|درود|hello|hi|hey|خوبی|چطوری|صبح بخیر|عصر بخیر)/.test(lower)) return 'greeting';
  if (/^(خداحافظ|bye|goodbye|می‌بینمت|تا بعد|شب خوش)/.test(lower)) return 'farewell';
  if (/(ممنون|مرسی|thanks|thank|سپاسگزارم|دستت درد نکنه)/.test(lower)) return 'thanks';
  if (/(کمک|راهنما|help|چیکار می‌تونی|چه امکاناتی|what can you|راهنمایی|چه قابلیت|چه کارایی)/.test(lower)) return 'help';
  if (/(تو کی هستی|about|who are you|درباره تو|خودت رو معرفی|اسمت چیه|کیستی)/.test(lower)) return 'about';
  if (/(تحلیل|analyz|بررسی|این جمله رو تحلیل|احساس من|شخصیت من)/.test(lower)) return 'analysis';
  return 'general';
}

function tokenize(text) { return text.match(/[آ-یa-z0-9]+/gi) || []; }
function normalizePersian(word) { return word.replace(/(ها|های|انه|ی|ات|ان|ین|م|ت|ش|مان|تان|شان)$/, ''); }

const positiveWords = [
  'خوب', 'عالی', 'خوشحال', 'خوش', 'شاد', 'مثبت', 'فوق‌العاده', 'خوشبخت', 'آرام',
  'good', 'great', 'happy', 'excellent', 'positive', 'fantastic', 'wonderful', 'joy', 'peaceful'
];
const negativeWords = [
  'بد', 'ناراحت', 'غمگین', 'عصبی', 'استرس', 'نگران', 'ترس', 'متأسف', 'خسته', 'سرد', 'درد', 'بی‌حال',
  'bad', 'sad', 'angry', 'anxious', 'nervous', 'upset', 'terrible', 'awful', 'tired', 'cold'
];
const traitWords = {
  openness: ['خلاق','ایده','جدید','ماجراجو','creative','idea','new','adventure','کنجکاو','نوآور'],
  conscientiousness: ['منظم','مسئول','دقیق','organized','responsible','plan','برنامه','وظیفه‌شناس'],
  extraversion: ['اجتماعی','پرانرژی','صحبت','social','energetic','talkative','outgoing','برون‌گرا','جمع'],
  agreeableness: ['مهربان','همکار','دلسوز','همدل','kind','cooperative','warm','سازگار','بخشنده'],
  neuroticism: ['نگران','عصبی','استرس','مضطرب','anxious','nervous','stress','ناراحت','غمگین','خسته']
};

const replies = {
  greeting: ['سلام! حالت چطوره؟', 'درود بر تو!', 'سلام! خوشحالم که هستی.'],
  farewell: ['خدانگهدار!', 'بدرود!', 'تا بعد، مراقب خودت باش.'],
  thanks: ['خواهش می‌کنم!', 'قابل نداشت.', 'خوشحالم کمک کردم.'],
  help: ['می‌تونم متن‌ها رو تحلیل کنم و احساس و شخصیت رو تشخیص بدم. فقط بگو "تحلیل کن".'],
  about: ['من نگار کوانتا هستم، یه دستیار هوشمند با یادگیری عمیق.']
};
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function analyzeBilingual(text) {
  const tokens = tokenize(text);
  const total = tokens.length || 1;
  const normalized = tokens.map(t => /[a-zA-Z]/.test(t) ? t.toLowerCase().replace(/(ing|ed|s)$/, '') : normalizePersian(t));
  let pos = 0, neg = 0;
  normalized.forEach(t => {
    if (positiveWords.some(w => t === w || t.startsWith(w))) pos++;
    if (negativeWords.some(w => t === w || t.startsWith(w))) neg++;
  });
  const sentiment = (pos + neg) ? ((pos - neg) / (pos + neg)).toFixed(2) : '0.00';
  let scores = {}, maxCount = 0, dominant = 'openness';
  for (const [trait, keys] of Object.entries(traitWords)) {
    const count = normalized.filter(t => keys.some(w => t === w || t.startsWith(w))).length;
    scores[trait] = count / total;
    if (count > maxCount) { maxCount = count; dominant = trait; }
  }
  if (maxCount === 0) {
    scores = { openness: 0.2, conscientiousness: 0.2, extraversion: 0.2, agreeableness: 0.2, neuroticism: 0.0 };
    dominant = 'openness';
  }
  return { sentiment, dominant, keywords: tokens.slice(0,5).join(', ') || '--' };
}

async function processMessage(message, sessionId) {
  const intent = predictIntent(message);
  if (intent === 'analysis') {
    const { sentiment, dominant, keywords } = analyzeBilingual(message);
    return { reply: `🧠 تحلیل:\nاحساس: ${sentiment}\nشخصیت: ${dominant}\nکلمات: ${keywords}`, analysis: { sentiment, dominant } };
  } else if (intent === 'general') {
    const { sentiment, dominant } = analyzeBilingual(message);
    const mood = sentiment > 0.1 ? 'مثبت' : sentiment < -0.1 ? 'منفی' : 'خنثی';
    return { reply: `حالت ${mood} به نظر میاد و شخصیتت ${dominant} هست.`, analysis: { sentiment, dominant } };
  } else {
    return { reply: rand(replies[intent] || replies.help), analysis: null };
  }
}

async function trainOnDataset(dataset) {
  const { saveModel } = require('./kv-store');
  if (!nn) nn = new NeuralNetwork(DEFAULT_VOCABULARY.length, 12, INTENT_LABELS.length, 0.1);
  for (const item of dataset) {
    if (!item.text || !item.intent) continue;
    const inputVec = vectorizer.vectorize(item.text);
    const outputVec = Array(INTENT_LABELS.length).fill(0);
    const idx = INTENT_LABELS.indexOf(item.intent);
    if (idx !== -1) outputVec[idx] = 1;
    nn.train(inputVec, outputVec);
  }
  await saveModel(nn.toJSON());
  return { message: `مدل با ${dataset.length} نمونه به‌روز شد.` };
}

module.exports = { processMessage, trainOnDataset };
