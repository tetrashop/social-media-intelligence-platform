const { NeuralNetwork, TextVectorizer, DEFAULT_VOCABULARY, INTENT_LABELS } = require('./services/deep-learning');
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'data', 'deep-model.json');

const trainingData = [
  { text: 'سلام', intent: 'greeting' }, { text: 'hello', intent: 'greeting' },
  { text: 'درود', intent: 'greeting' }, { text: 'سلام رفیق', intent: 'greeting' },
  { text: 'خوبی؟', intent: 'greeting' }, { text: 'چطوری؟', intent: 'greeting' },
  { text: 'صبح بخیر', intent: 'greeting' }, { text: 'عصر بخیر', intent: 'greeting' },
  { text: 'سلام علیکم', intent: 'greeting' }, { text: 'hi', intent: 'greeting' },
  { text: 'hey', intent: 'greeting' }, { text: 'good morning', intent: 'greeting' },
  { text: 'خداحافظ', intent: 'farewell' }, { text: 'bye', intent: 'farewell' },
  { text: 'goodbye', intent: 'farewell' }, { text: 'می‌بینمت', intent: 'farewell' },
  { text: 'تا بعد', intent: 'farewell' }, { text: 'شب خوش', intent: 'farewell' },
  { text: 'بای', intent: 'farewell' }, { text: 'بدرود', intent: 'farewell' },
  { text: 'ممنون', intent: 'thanks' }, { text: 'مرسی', intent: 'thanks' },
  { text: 'thanks', intent: 'thanks' }, { text: 'thank you', intent: 'thanks' },
  { text: 'سپاسگزارم', intent: 'thanks' }, { text: 'دستت درد نکنه', intent: 'thanks' },
  { text: 'متشکرم', intent: 'thanks' }, { text: 'دمت گرم', intent: 'thanks' },
  { text: 'کمک', intent: 'help' }, { text: 'help', intent: 'help' },
  { text: 'راهنما', intent: 'help' }, { text: 'چیکار می‌تونی بکنی؟', intent: 'help' },
  { text: 'چه امکاناتی داری؟', intent: 'help' }, { text: 'what can you do', intent: 'help' },
  { text: 'چه قابلیتهایی داری', intent: 'help' }, { text: 'چه کارایی داری', intent: 'help' },
  { text: 'راهنمایی می‌خوام', intent: 'help' },
  { text: 'تو کی هستی', intent: 'about' }, { text: 'about', intent: 'about' },
  { text: 'who are you', intent: 'about' }, { text: 'درباره تو', intent: 'about' },
  { text: 'خودت رو معرفی کن', intent: 'about' }, { text: 'اسمت چیه', intent: 'about' },
  { text: 'کی هستی', intent: 'about' }, { text: 'چی هستی', intent: 'about' },
  { text: 'تحلیل کن', intent: 'analysis' }, { text: 'analyz', intent: 'analysis' },
  { text: 'بررسی کن', intent: 'analysis' }, { text: 'این جمله رو تحلیل کن', intent: 'analysis' },
  { text: 'احساس من چیه؟', intent: 'analysis' }, { text: 'شخصیت من چطوره؟', intent: 'analysis' },
  { text: 'نظرت چیه', intent: 'analysis' },
  { text: 'چطوری', intent: 'general' }, { text: 'امروز چطور گذشت', intent: 'general' },
  { text: 'یه چیز جالب بگو', intent: 'general' }, { text: 'هوا چطوره', intent: 'general' },
  { text: 'خسته ام', intent: 'general' }, { text: 'حوصله ندارم', intent: 'general' },
  { text: 'خوشحالم', intent: 'general' }, { text: 'ناراحتم', intent: 'general' },
  { text: 'I like music', intent: 'general' }, { text: 'today was great', intent: 'general' }
];

console.log('🧠 آموزش مدل با', trainingData.length, 'نمونه...');
const nn = new NeuralNetwork(DEFAULT_VOCABULARY.length, 14, INTENT_LABELS.length, 0.08);
const vectorizer = new TextVectorizer(DEFAULT_VOCABULARY);

for (let epoch = 0; epoch < 5; epoch++) {
  trainingData.forEach(item => {
    const inputVec = vectorizer.vectorize(item.text);
    const outputVec = Array(INTENT_LABELS.length).fill(0);
    const idx = INTENT_LABELS.indexOf(item.intent);
    if (idx !== -1) outputVec[idx] = 1;
    nn.train(inputVec, outputVec);
  });
  console.log(`✓ Epoch ${epoch + 1}/5`);
}

const modelDir = path.dirname(MODEL_PATH);
if (!fs.existsSync(modelDir)) fs.mkdirSync(modelDir, { recursive: true });
fs.writeFileSync(MODEL_PATH, JSON.stringify(nn.toJSON()));
console.log('✅ مدل ذخیره شد');

// تست
console.log('\n🧪 تست:');
['سلام', 'خداحافظ', 'چه قابلیتهایی داری', 'تحلیل کن', 'خسته ام'].forEach(t => {
  const out = nn.predict(vectorizer.vectorize(t));
  const idx = out.indexOf(Math.max(...out));
  console.log(`  ${t} → ${INTENT_LABELS[idx]} (${out[idx].toFixed(3)})`);
});
