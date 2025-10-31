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
        activity: { posts_per_day: 10, engagement_rate: 0.15 },
        network: { followers: 1000, following: 200 }
      };
      
      const result = await analyzer.analyze(userData);
      
      console.log(`✅ ${user.name}:`);
      console.log(`   • اعتماد: ${(result.confidence * 100).toFixed(1)}%`);
      console.log(`   • گشودگی: ${(result.personality_traits.openness * 100).toFixed(1)}%`);
      console.log(`   • بینش‌ها: ${result.insights.length} مورد\n`);
    }
    
    console.log('🎉 تحلیل تمام کاربران تکمیل شد!');
  }
}

new RealAnalysisTest().runTests().catch(console.error);
