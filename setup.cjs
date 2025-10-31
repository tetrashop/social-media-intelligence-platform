console.log('🔧 راه‌اندازی پلتفرم تحلیل شبکه‌های اجتماعی...\n');

const fs = require('fs');
const path = require('path');

console.log('📁 ایجاد ساختار پوشه‌ها...');

const directories = [
  'core/deep-thinking',
  'core/neural-networks',
  'explorers/historical',
  'explorers/modern',
  'nlp/multilingual',
  'dimensions/personology',
  'dimensions/scientism',
  'dimensions/innovation',
  'dimensions/reporting',
  'data/lake',
  'outputs/reports',
  'config/profiles'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ ایجاد پوشه: ${dir}`);
  }
});

console.log('\n📦 نصب وابستگی‌ها...');
console.log('در حال نادیابی: npm install...');

console.log('\n🎯 ایجاد فایل‌های نمونه...');

// فایل نمونه پیکربندی
const sampleConfig = {
  user_id: "demo_user",
  platforms: ["telegram", "twitter"],
  analysis_dimensions: ["personology", "scientism"],
  output: {
    format: "html",
    language: "fa"
  }
};

fs.writeFileSync(
  path.join(__dirname, 'config/sample-profile.json'),
  JSON.stringify(sampleConfig, null, 2)
);

console.log('✅ فایل نمونه پیکربندی ایجاد شد');

console.log('\n✨ راه‌اندازی کامل شد!');
console.log('\n📋 دستورات بعدی:');
console.log('  npm install    - نصب وابستگی‌ها');
console.log('  npm start      - اجرای سیستم');
console.log('  npm run analyze - تحلیل نمونه');
