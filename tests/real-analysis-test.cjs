#!/usr/bin/env node

console.log('👤 تست تحلیل کاربران واقعی\n');

class RealAnalysisTest {
  constructor() {
    this.testUsers = [
      {
        name: "کاربر علمی",
        behavior: "تمرکز بر محتوای علمی و تحقیقاتی"
      },
      {
        name: "کاربر خلاق", 
        behavior: "فعال در زمینه‌های هنری و نوآوری"
      }
    ];
  }

  async runTests() {
    const PersonologyAnalyzer = require('../dimensions/personology/analyzer.cjs');
    const analyzer = new PersonologyAnalyzer();
    
    for (const user of this.testUsers) {
      console.log(`🔍 تحلیل ${user.name}...`);
      
      const userData = {
        profile: user,
        activity: { 
          posts_per_day: 10, 
          engagement_rate: 0.15,
          main_topics: ["تخصصی", "علمی"]
        },
        network: { 
          followers: 1000, 
          following: 200,
          connections: 150
        }
      };
      
      try {
        const result = await analyzer.analyze(userData);
        
        console.log(`✅ ${user.name}:`);
        console.log(`   • اعتماد: ${(result.confidence * 100).toFixed(1)}%`);
        console.log(`   • گشودگی: ${(result.personality_traits?.openness * 100 || 0).toFixed(1)}%`);
        console.log(`   • وظیفه‌شناسی: ${(result.personality_traits?.conscientiousness * 100 || 0).toFixed(1)}%`);
        console.log(`   • برون‌گرایی: ${(result.personality_traits?.extraversion * 100 || 0).toFixed(1)}%`);
        
        // بررسی ایمن برای insights
        if (result.insights && Array.isArray(result.insights)) {
          console.log(`   • بینش‌ها: ${result.insights.length} مورد`);
          if (result.insights.length > 0) {
            result.insights.forEach((insight, index) => {
              console.log(`     ${index + 1}. ${insight}`);
            });
          }
        } else {
          console.log(`   • بینش‌ها: 0 مورد`);
        }
        console.log('');
        
      } catch (error) {
        console.log(`❌ خطا در تحلیل ${user.name}: ${error.message}`);
      }
    }
    
    console.log('🎉 تحلیل تمام کاربران تکمیل شد!');
  }
}

new RealAnalysisTest().runTests().catch(console.error);
