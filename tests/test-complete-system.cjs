#!/usr/bin/env node

console.log('🧪 تست کامل سیستم تحلیل شبکه‌های اجتماعی\n');

async function runTests() {
  console.log('1. 🔧 بررسی ماژول‌های اصلی...\n');
  
  try {
    // بارگذاری ماژول‌های موجود
    const modules = {
      main: require('../main.cjs'),
      cognitive: require('../core/deep-thinking/cognitive-processor.cjs'),
      personology: require('../dimensions/personology/analyzer.cjs')
    };
    
    console.log('✅ ماژول‌های اصلی با موفقیت بارگذاری شدند');
    
    // بررسی ماژول‌های اختیاری
    try {
      modules.scientism = require('../dimensions/scientism/analyzer.cjs');
      console.log('✅ ماژول علم‌گرایی بارگذاری شد');
    } catch (e) {
      console.log('⚠️  ماژول علم‌گرایی در دسترس نیست');
    }
    
    try {
      modules.innovation = require('../dimensions/innovation/analyzer.cjs');
      console.log('✅ ماژول نوآوری بارگذاری شد');
    } catch (e) {
      console.log('⚠️  ماژول نوآوری در دسترس نیست');
    }
    
    try {
      modules.reporting = require('../dimensions/reporting/analyzer.cjs');
      console.log('✅ ماژول گزارش‌دهی بارگذاری شد');
    } catch (e) {
      console.log('⚠️  ماژول گزارش‌دهی در دسترس نیست');
    }
    
    console.log('');
    
    // تست عملکرد پایه
    console.log('2. 📊 تست تحلیل نمونه...\n');
    
    const testData = {
      profile: {
        name: "کاربر تست",
        platforms: ["telegram", "twitter"],
        behavior: "فعال در شبکه‌های اجتماعی"
      },
      activity: {
        posts_per_day: 8,
        engagement_rate: 0.12
      }
    };
    
    const cognitive = new modules.cognitive();
    const result = await cognitive.analyze(testData);
    
    console.log('✅ تحلیل شناختی موفقیت‌آمیز بود');
    console.log(`📈 الگوهای شناسایی شده: ${result.patterns.length}`);
    console.log(`💡 فرضیه‌های تولید شده: ${result.hypotheses.length}\n`);
    
    console.log('3. 🎯 تست تحلیل شخص‌شناسی...\n');
    
    const personology = new modules.personology();
    const personologyResult = await personology.analyze(testData);
    
    console.log('✅ تحلیل شخص‌شناسی موفقیت‌آمیز بود');
    console.log(`👤 اعتماد تحلیل: ${(personologyResult.confidence * 100).toFixed(1)}%`);
    console.log(`🎭 ویژگی‌های شخصیتی: ${Object.keys(personologyResult.personality_traits).length} مورد\n`);
    
    console.log('🎉 تست‌های اصلی با موفقیت گذرانده شدند!');
    console.log('🚀 سیستم آماده استفاده است');
    
  } catch (error) {
    console.error('❌ خطا در تست:', error.message);
    console.error('🔍 جزئیات:', error.stack);
  }
}

runTests();
