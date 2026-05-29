// ---------- تشخیص Intent با قوانین قدرتمند ----------
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

// ---------- ابزارهای تحلیل دو زبانه ----------
function tokenize(text) { return text.match(/[آ-یa-z0-9]+/gi) || []; }
function normalizePersian(word) { return word.replace(/(ها|های|انه|ی|ات|ان|ین)$/, ''); }

const positiveWords = ['خوب','عالی','خوشحال','خوش','شاد','مثبت','فوق‌العاده','good','great','happy','excellent'];
const negativeWords = ['بد','ناراحت','غمگین','عصبی','استرس','نگران','bad','sad','angry','anxious'];
const traitWords = {
  openness: ['خلاق','ایده','جدید','ماجراجو','creative','idea','new','adventure'],
  conscientiousness: ['منظم','مسئول','دقیق','organized','responsible'],
  extraversion: ['اجتماعی','پرانرژی','صحبت','social','energetic','talkative'],
  agreeableness: ['مهربان','همکار','دلسوز','kind','cooperative','warm'],
  neuroticism: ['نگران','عصبی','استرس','anxious','nervous','stress']
};

const replies = {
  greeting: ['سلام! حالت چطوره؟', 'درود بر تو!', 'سلام! خوشحالم که هستی.'],
  farewell: ['خدانگهدار!', 'بدرود!'],
  thanks: ['خواهش می‌کنم!', 'قابل نداشت.'],
  help: ['بگو "تحلیل کن" و جمله‌ات رو بنویس.', 'برای تحلیل احساس، از کلمه "تحلیل" استفاده کن.'],
  about: ['من نگار کوانتا هستم، دستیار هوشمند تو.']
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
  if (maxCount === 0) scores = { openness: 0.2, conscientiousness: 0.2, extraversion: 0.2, agreeableness: 0.2, neuroticism: 0.0 };
  return { sentiment, dominant, keywords: tokens.slice(0,5).join(', ') || '--' };
}

async function processMessage(message, sessionId) {
  const intent = getIntent(message);

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

module.exports = { processMessage };
