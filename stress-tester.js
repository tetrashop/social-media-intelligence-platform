const https = require('https');

class StressTester {
    constructor(baseUrl, concurrency = 5, duration = 30000) {
        this.baseUrl = baseUrl;
        this.concurrency = concurrency;
        this.duration = duration;
        this.results = {
            total: 0,
            success: 0,
            errors: 0,
            responseTimes: []
        };
    }

    async makeRequest() {
        const startTime = Date.now();
        const postData = JSON.stringify({
            text: "تست استرس سیستم با متن فارسی برای بررسی عملکرد تحت بارگذاری سنگین",
            platform: "telegram"
        });

        const options = {
            hostname: new URL(this.baseUrl).hostname,
            port: 443,
            path: '/api/analyze',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        return new Promise((resolve) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const responseTime = Date.now() - startTime;
                    this.results.responseTimes.push(responseTime);
                    this.results.total++;
                    
                    if (res.statusCode === 200) {
                        this.results.success++;
                        resolve({ success: true, responseTime });
                    } else {
                        this.results.errors++;
                        resolve({ success: false, responseTime, status: res.statusCode });
                    }
                });
            });

            req.on('error', (error) => {
                this.results.errors++;
                this.results.total++;
                resolve({ success: false, error: error.message });
            });

            req.setTimeout(10000, () => {
                req.destroy();
                this.results.errors++;
                this.results.total++;
                resolve({ success: false, error: 'Timeout' });
            });

            req.write(postData);
            req.end();
        });
    }

    async runTest() {
        console.log('🔥 شروع تست استرس...');
        console.log(`📊 Concurrent Requests: ${this.concurrency}`);
        console.log(`⏱️  Duration: ${this.duration / 1000} seconds`);

        const startTime = Date.now();
        const requests = [];

        // ایجاد درخواست‌های همزمان
        const interval = setInterval(() => {
            for (let i = 0; i < this.concurrency; i++) {
                requests.push(this.makeRequest());
            }
        }, 100);

        // توقف پس از مدت مشخص
        setTimeout(() => {
            clearInterval(interval);
            this.printResults();
        }, this.duration);

        // منتظر ماندن برای تمام درخواست‌ها
        await Promise.allSettled(requests);
    }

    printResults() {
        const avgResponseTime = this.results.responseTimes.reduce((a, b) => a + b, 0) / this.results.responseTimes.length;
        const successRate = (this.results.success / this.results.total) * 100;

        console.log('\n📈 نتایج تست استرس:');
        console.log('==================');
        console.log(`📊 کل درخواست‌ها: ${this.results.total}`);
        console.log(`✅ موفق: ${this.results.success}`);
        console.log(`❌ خطا: ${this.results.errors}`);
        console.log(`🎯 نرخ موفقیت: ${successRate.toFixed(2)}%`);
        console.log(`⚡ میانگین زمان پاسخ: ${avgResponseTime.toFixed(2)}ms`);
        console.log(`📈 بیشترین زمان پاسخ: ${Math.max(...this.results.responseTimes)}ms`);
        console.log(`📉 کمترین زمان پاسخ: ${Math.min(...this.results.responseTimes)}ms`);

        if (successRate > 95) {
            console.log('🎉 سیستم تحت بارگذاری عملکرد عالی دارد!');
        } else if (successRate > 80) {
            console.log('⚠️  سیستم عملکرد قابل قبولی دارد');
        } else {
            console.log('🚨 سیستم نیاز به بهینه‌سازی دارد');
        }
    }
}

// اجرای تست
const tester = new StressTester('https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev', 3, 15000);
tester.runTest();
