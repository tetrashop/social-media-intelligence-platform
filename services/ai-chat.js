const { NeuralNetwork, TextVectorizer, DEFAULT_VOCABULARY, INTENT_LABELS } = require('./deep-learning');
const { saveModel, loadModel } = require('./kv-store');

// ---------- بخش یادگیری عمیق ----------
let nn = null;
let vectorizer = new TextVectorizer(DEFAULT_VOCABULARY);

async function initModel() {
  // تلاش برای بارگذاری مدل قبلی
  const saved = await loadModel();
  if (saved) {
    nn = NeuralNetwork.fromJSON(saved);
    console.log('✓ مدل یادگیری عمیق از حافظه بارگذاری شد');
  } else {
    // ساخت مدل جدید با معماری پیش‌فرض
    nn = new NeuralNetwork(DEFAULT_VOCABULARY.length, 12, INTENT_LABELS.length, 0.1);
    console.log('✓ مدل جدید شبکهٔ عصبی ساخته شد');
    // آموزش اولیه با چند نمونه (در صورت تمایل می‌تواند اینجا انجام شود)
    await trainDefaultExamples();
  }
}

// تابع آموزش اولیه روی نمونه‌های دستی
async function trainDefaultExamples() {
  const examples = [
    { text: 'سلام', intent: 'greeting' },
    { text: 'hello', intent: 'greeting' },
    { text: 'درود', intent: 'greeting' },
    { text: 'خوبی', intent: 'greeting' },
    { text: 'bye', intent: 'farewell' },
    { text: 'خداحافظ', intent: 'farewell' },
    { text: 'goodbye', intent: 'farewell' },
    { text: 'thanks', intent: 'thanks' },
    { text: 'مرسی', intent: 'thanks' },
    { text: 'thank you', intent: 'thanks' },
    { text: 'help', intent: 'help' },
    { text: 'کمک', intent: 'help' },
    { text: 'راهنما', intent: 'help' },
    { text: 'who are you', intent: 'about' },
    { text: 'about', intent: 'about' },
    { text: 'تو کی هستی', intent: 'about' },
    { text: 'تحلیل کن', intent: 'analysis' },
    { text: 'analyz', intent: 'analysis' },
    { text: 'بررسی', intent: 'analysis' },
    { text: 'چطوری', intent: 'general' } // general برای جملات غیرتخصصی
  ];

  for (const ex of examples) {
    const inputVec = vectorizer.vectorize(ex.text);
    const outputVec = Array(INTENT_LABELS.length).fill(0);
    const idx = INTENT_LABELS.indexOf(ex.intent);
    if (idx !== -1) outputVec[idx] = 1;
    nn.train(inputVec, outputVec);
  }
  await saveModel(nn.toJSON());
  console.log('✓ آموزش اولیه روی نمونه‌های دستی انجام شد');
}

// تابع تشخیص intent با شبکهٔ عصبی
function predictIntent(text) {
  if (!nn) {
    // اگر مدل آماده نیست، از قوانین قبلی استفاده کن
    return getIntentFallback(text);
  }
  const inputVec = vectorizer.vectorize(text);
  const output = nn.predict(inputVec);
  const maxIndex = output.indexOf(Math.max(...output));
  return INTENT_LABELS[maxIndex];
}

// Fallback قوانین دستی (همان قبلی)
function getIntentFallback(msg) {
  const lower = msg.toLowerCase();
  if (/^(سلام|درود|hello|hi|hey|خوبی|چطوری)/.test(lower)) return 'greeting';
  if (/^(خداحافظ|bye|goodbye|می‌بینمت)/.test(lower)) return 'farewell';
  if (/(ممنون|مرسی|thanks|thank)/.test(lower)) return 'thanks';
  if (/(کمک|راهنما|help)/.test(lower)) return 'help';
  if (/(تو کی هستی|about|درباره)/.test(lower)) return 'about';
  if (/(تحلیل|analyz|بررسی)/.test(lower)) return 'analysis';
  return 'general';
}

// ---------- توابع اصلی چت (همان قبلی، فقط getIntent جدید) ----------
function tokenize(text) { return text.match(/[آ-یa-z0-9]+/gi) || []; }
function normalizePersian(word) { return word.replace(/(ها|های|انه|ی|ات|ان|ین)$/, ''); }

const positiveWords = ['خوب','عالی','خوشحال','خوش','شاد','مثبت','فوق‌العاده','good','great','happy','excellent','positive','fantastic','wonderful','joy'];
const negativeWords = ['بد','ناراحت','غمگین','عصبی','استرس','نگران','bad','sad','angry','anxious','nervous','upset','terrible','awful'];
const traitWords = {
  openness: ['خلاق','ایده','جدید','ماجراجو','curious','creative','idea','new','adventure'],
  conscientiousness: ['منظم','مسئول','دقیق','organized','responsible','plan'],
  extraversion: ['اجتماعی','پرانرژی','صحبت','social','energetic','talkative'],
  agreeableness: ['مهربان','همکار','دلسوز','kind','cooperative','warm'],
  neuroticism: ['نگران','عصبی','استرس','anxious','nervous','stress']
};

const replies = {
  greeting: ['سلام! حالت چطوره؟', 'درود بر تو! چطور می‌تونم کمک کنم؟', 'سلام! خوشحالم که هستی.'],
  farewell: ['خدانگهدار! روز خوبی داشته باشی.', 'بدرود! هر وقت خواستی برگرد.', 'مراقب خودت باش، تا بعد!'],
  thanks: ['خواهش می‌کنم!', 'قابل نداشت.', 'خوشحالم که کمک کردم.'],
  help: ['من می‌تونم متن‌ها رو تحلیل کنم. فقط بگو "تحلیل کن" و جمله‌ات رو بنویس.', 'برای تحلیل احساس و شخصیت، کافیه جمله‌ات رو با "تحلیل کن" شروع کنی.'],
  about: ['من نگار کوانتا هستم، یه دستیار هوشمند که می‌تونم متن رو تحلیل کنم و باهات حرف بزنم.', 'من ساختهٔ رامین اجلال هستم و مغزم کاملاً محلی کار می‌کنه.']
};
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function analyzeBilingual(text) {
  const tokens = tokenize(text);
  const total = tokens.length || 1;
  const normalized = tokens.map(t => /[a-zA-Z]/.test(t) ? t.toLowerCase().replace(/(ing|ed|s|ly|ment|tion)$/, '') : normalizePersian(t));
  let posCount = 0, negCount = 0;
  normalized.forEach(t => {
    if (positiveWords.some(w => t === w || t.startsWith(w))) posCount++;
    if (negativeWords.some(w => t === w || t.startsWith(w))) negCount++;
  });
  let sentiment = (posCount + negCount) ? ((posCount - negCount) / (posCount + negCount)).toFixed(2) : '0.00';
  let scores = {};
  let maxCount = 0, dominant = 'openness';
  for (const [trait, keywords] of Object.entries(traitWords)) {
    const count = normalized.filter(t => keywords.some(w => t === w || t.startsWith(w))).length;
    scores[trait] = count / total;
    if (count > maxCount) { maxCount = count; dominant = trait; }
  }
  if (maxCount === 0) scores = { openness: 0.2, conscientiousness: 0.2, extraversion: 0.2, agreeableness: 0.2, neuroticism: 0.0 };
  return { sentiment, dominant, keywords: tokens.slice(0,5).join(', ') || '--' };
}

// ---------- تابع اصلی (همراه با راه‌اندازی مدل) ----------
let modelReady = false;
initModel().then(() => { modelReady = true; });

async function processMessage(message, sessionId) {
  if (!modelReady) await new Promise(resolve => setTimeout(resolve, 100)); // صبر کوتاه برای بارگذاری مدل

  const intent = predictIntent(message); // استفاده از شبکهٔ عصبی

  if (intent === 'analysis') {
    const { sentiment, dominant, keywords } = analyzeBilingual(message);
    const reply = `🧠 تحلیل هوشمند:\n- احساس: ${sentiment}\n- شخصیت غالب: ${dominant}\n- کلمات کلیدی: ${keywords}`;
    return { reply, analysis: { sentiment, dominant, keywords } };
  } else if (intent === 'general') {
    const { sentiment, dominant } = analyzeBilingual(message);
    const mood = sentiment > 0.1 ? 'مثبت' : sentiment < -0.1 ? 'منفی' : 'خنثی';
    const reply = `بر اساس پیامت، حالت امروز ${mood} به نظر میاد و ویژگی ${dominant} در شخصیتت برجسته‌ست.`;
    return { reply, analysis: { sentiment, dominant } };
  } else {
    const reply = rand(replies[intent] || replies.help);
    return { reply, analysis: null };
  }
}

module.exports = { processMessage };
