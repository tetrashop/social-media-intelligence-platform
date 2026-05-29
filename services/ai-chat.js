// موتور دو زبانه (فارسی + انگلیسی) بدون وابستگی به هیچ API خارجی
const natural = require('natural');

function simpleTokenize(text) {
  return text.match(/[آ-یa-z0-9]+/gi) || [];
}
function normalizePersian(word) {
  return word.replace(/(ها|های|انه|ی|ات|ان|ین)$/, '');
}

// ---------- تشخیص intent ----------
function getIntent(msg) {
  const lower = msg.toLowerCase();
  if (/^(سلام|درود|hello|hi|hey|خوبی|چطوری)/.test(lower)) return 'greeting';
  if (/^(خداحافظ|bye|goodbye|می‌بینمت)/.test(lower)) return 'farewell';
  if (/(ممنون|مرسی|thanks|thank)/.test(lower)) return 'thanks';
  if (/(کمک|راهنما|help)/.test(lower)) return 'help';
  if (/(تو کی هستی|about|درباره)/.test(lower)) return 'about';
  if (/(تحلیل|analyz|بررسی)/.test(lower)) return 'analysis';
  return 'general';
}

// ---------- پاسخ‌های متنوع ----------
const replies = {
  greeting: ['سلام! حالت چطوره؟', 'درود بر تو! چطور می‌تونم کمک کنم؟', 'سلام! خوشحالم که هستی.'],
  farewell: ['خدانگهدار! روز خوبی داشته باشی.', 'بدرود! هر وقت خواستی برگرد.', 'مراقب خودت باش، تا بعد!'],
  thanks: ['خواهش می‌کنم!', 'قابل نداشت.', 'خوشحالم که کمک کردم.'],
  help: ['من می‌تونم متن‌ها رو تحلیل کنم. فقط بگو "تحلیل کن" و جمله‌ات رو بنویس.', 'برای تحلیل احساس و شخصیت، کافیه جمله‌ات رو با "تحلیل کن" شروع کنی.'],
  about: ['من نگار کوانتا هستم، یه دستیار هوشمند که می‌تونم متن رو تحلیل کنم و باهات حرف بزنم.', 'من ساختهٔ رامین اجلال هستم و مغزم کاملاً محلی کار می‌کنه.']
};
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ---------- کلمات مثبت / منفی (فارسی + انگلیسی) ----------
const positiveWords = [
  'خوب', 'عالی', 'خوشحال', 'خوش', 'شاد', 'مثبت', 'فوق‌العاده', 'خوشبخت',
  'good', 'great', 'happy', 'excellent', 'positive', 'fantastic', 'wonderful', 'joy'
];
const negativeWords = [
  'بد', 'ناراحت', 'غمگین', 'عصبی', 'استرس', 'نگران', 'ترس', 'متأسف',
  'bad', 'sad', 'angry', 'anxious', 'nervous', 'upset', 'terrible', 'awful'
];

// ---------- کلمات شخصیت (فارسی + انگلیسی) ----------
const traitWords = {
  openness: ['خلاق', 'ایده', 'جدید', 'ماجراجو', 'ماجراجویی', 'curious', 'creative', 'idea', 'new', 'adventure', 'کنجکاو', 'نوآور'],
  conscientiousness: ['منظم', 'مسئول', 'دقیق', 'organized', 'responsible', 'plan', 'برنامه', 'وظیفه‌شناس'],
  extraversion: ['اجتماعی', 'پرانرژی', 'صحبت', 'پرحرف', 'social', 'energetic', 'talkative', 'outgoing', 'برون‌گرا'],
  agreeableness: ['مهربان', 'همکار', 'دلسوز', 'همدل', 'kind', 'cooperative', 'warm', 'سازگار', 'خوش‌برخورد'],
  neuroticism: ['نگران', 'عصبی', 'استرس', 'مضطرب', 'anxious', 'nervous', 'stress', 'ناراحت', 'روان‌رنجور']
};

function analyzeBilingual(text) {
  const tokens = simpleTokenize(text);
  const total = tokens.length || 1;

  const normalized = tokens.map(t => {
    if (/[a-zA-Z]/.test(t)) {
      return natural.PorterStemmer.stem(t.toLowerCase());
    } else {
      return normalizePersian(t);
    }
  });

  let posCount = 0, negCount = 0;
  normalized.forEach(t => {
    if (positiveWords.some(w => w === t || w.startsWith(t) || t.startsWith(w))) posCount++;
    if (negativeWords.some(w => w === t || w.startsWith(t) || t.startsWith(w))) negCount++;
  });
  let sentiment = 0;
  if (posCount + negCount > 0) {
    sentiment = (posCount - negCount) / (posCount + negCount);
  }
  sentiment = sentiment.toFixed(2);

  let scores = {};
  for (const [trait, keywords] of Object.entries(traitWords)) {
    const count = normalized.filter(t =>
      keywords.some(w => w === t || w.startsWith(t) || t.startsWith(w))
    ).length;
    scores[trait] = count / total;
  }
  const sum = Object.values(scores).reduce((a, b) => a + b, 0);
  if (sum === 0) {
    scores = { openness: 0.2, conscientiousness: 0.2, extraversion: 0.2, agreeableness: 0.2, neuroticism: 0.2 };
  }
  const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const keywords = tokens.slice(0, 5).join(', ') || '--';

  return { sentiment, dominant, keywords };
}

async function processMessage(message, sessionId) {
  const intent = getIntent(message);
  let reply, analysis = null;

  if (intent === 'analysis') {
    const { sentiment, dominant, keywords } = analyzeBilingual(message);
    reply = `🧠 تحلیل هوشمند:\n- احساس: ${sentiment}\n- شخصیت غالب: ${dominant}\n- کلمات کلیدی: ${keywords}`;
    analysis = { sentiment, dominant, keywords };
  } else if (intent === 'general') {
    const { sentiment, dominant } = analyzeBilingual(message);
    const mood = sentiment > 0.1 ? 'مثبت' : sentiment < -0.1 ? 'منفی' : 'خنثی';
    reply = `بر اساس پیامت، حالت امروز ${mood} به نظر میاد و ویژگی ${dominant} در شخصیتت برجسته‌ست.`;
    analysis = { sentiment, dominant };
  } else {
    reply = rand(replies[intent] || replies.help);
  }

  return { reply, analysis };
}

module.exports = { processMessage };
