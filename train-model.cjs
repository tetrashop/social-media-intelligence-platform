const { NeuralNetwork, TextVectorizer, DEFAULT_VOCABULARY, INTENT_LABELS } = require('./services/deep-learning');
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'data', 'deep-model.json');

const trainingData = [
  { text: 'سلام', intent: 'greeting' }, { text: 'hello', intent: 'greeting' },
  { text: 'درود', intent: 'greeting' }, { text: 'سلام رفیق', intent: 'greeting' },
  { text: 'خوبی؟', intent: 'greeting' }, { text: 'چطوری؟', intent: 'greeting' },
  { text: 'صبح بخیر', intent: 'greeting' }, { text: 'عصر بخیر', intent: 'greeting' },
  { text: 'خداحافظ', intent: 'farewell' }, { text: 'bye', intent: 'farewell' },
  { text: 'goodbye', intent: 'farewell' }, { text: 'می‌بینمت', intent: 'farewell' },
  { text: 'تا بعد', intent: 'farewell' }, { text: 'شب خوش', intent: 'farewell' },
  { text: 'ممنون', intent: 'thanks' }, { text: 'مرسی', intent: 'thanks' },
  { text: 'thanks', intent: 'thanks' }, { text: 'thank you', intent: 'thanks' },
  { text: 'سپاسگزارم', intent: 'thanks' }, { text: 'دستت درد نکنه', intent: 'thanks' },
  { text: 'کمک', intent: 'help' }, { text: 'help', intent: 'help' },
  { text: 'راهنما', intent: 'help' }, { text: 'چیکار می‌تونی بکنی؟', intent: 'help' },
  { text: 'چه امکاناتی داری؟', intent: 'help' }, { text: 'what can you do', intent: 'help' },
  { text: 'تو کی هستی', intent: 'about' }, { text: 'about', intent: 'about' },
  { text: 'who are you', intent: 'about' }, { text: 'درباره تو', intent: 'about' },
  { text: 'خودت رو معرفی کن', intent: 'about' }, { text: 'اسمت چیه', intent: 'about' },
  { text: 'تحلیل کن', intent: 'analysis' }, { text: 'analyz', intent: 'analysis' },
  { text: 'بررسی کن', intent: 'analysis' }, { text: 'این جمله رو تحلیل کن', intent: 'analysis' },
  { text: 'احساس من چیه؟', intent: 'analysis' }, { text: 'شخصیت من چطوره؟', intent: 'analysis' },
  { text: 'چطوری', intent: 'general' }, { text: 'امروز چطور گذشت', intent: 'general' },
  { text: 'یه چیز جالب بگو', intent: 'general' }, { text: 'هوا چطوره', intent: 'general' },
  { text: 'دوست دارم موزیک گوش بدم', intent: 'general' },
  { text: 'I like music', intent: 'general' }, { text: 'today was a great day', intent: 'general' }
];

console.log('🧠 در حال آموزش مدل با', trainingData.length, 'نمونه...');
const nn = new NeuralNetwork(DEFAULT_VOCABULARY.length, 12, INTENT_LABELS.length, 0.1);
const vectorizer = new TextVectorizer(DEFAULT_VOCABULARY);

trainingData.forEach((item, index) => {
  const inputVec = vectorizer.vectorize(item.text);
  const outputVec = Array(INTENT_LABELS.length).fill(0);
  const idx = INTENT_LABELS.indexOf(item.intent);
  if (idx !== -1) outputVec[idx] = 1;
  nn.train(inputVec, outputVec);
  if ((index + 1) % 10 === 0) console.log(`✓ ${index + 1}/${trainingData.length}`);
});

const modelDir = path.dirname(MODEL_PATH);
if (!fs.existsSync(modelDir)) fs.mkdirSync(modelDir, { recursive: true });
fs.writeFileSync(MODEL_PATH, JSON.stringify(nn.toJSON(), null, 2));
console.log(`✅ مدل در ${MODEL_PATH} ذخیره شد.`);
