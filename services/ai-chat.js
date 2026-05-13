const natural = require('natural');
const classifier = new natural.BayesClassifier();
classifier.addDocument('hello', 'greeting');
classifier.addDocument('hi', 'greeting');
classifier.addDocument('سلام', 'greeting');
classifier.addDocument('درود', 'greeting');
classifier.addDocument('bye', 'farewell');
classifier.addDocument('خداحافظ', 'farewell');
classifier.addDocument('thanks', 'thanks');
classifier.addDocument('مرسی', 'thanks');
classifier.train();

const replies = {
  greeting: () => 'سلام! من نگار کوانتا هستم. چطور می‌تونم کمک کنم؟',
  farewell: () => 'خدانگهدار! روز خوبی داشته باشی.',
  thanks: () => 'خواهش می‌کنم!',
  fallback: () => 'می‌توانم متن‌ها را تحلیل کنم. بگو "تحلیل کن" و جمله‌ات را بنویس.'
};

async function processMessage(message) {
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      const axios = require('axios');
      const res = await axios.post('https://api.deepseek.com/v1/chat/completions', {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: message }]
      }, {
        headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, 'Content-Type': 'application/json' }
      });
      return { reply: res.data.choices[0].message.content };
    } catch (e) {
      console.error('DeepSeek error:', e.message);
    }
  }
  const intent = classifier.classify(message.toLowerCase());
  const reply = (replies[intent] || replies.fallback)();
  return { reply };
}

module.exports = { processMessage };
