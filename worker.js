// worker.js - سامانه کامل مدیریت محاوره‌ای
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // تنظیمات CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 🔐 میدلور امنیتی
    const authenticate = (request) => {
      const authHeader = request.headers.get('Authorization');
      const adminToken = 'admin123456'; // رمز مدیریت - قابل تغییر
      const userToken = 'user123456';   // رمز کاربران - قابل تغییر
      
      if (authHeader === `Bearer ${adminToken}`) {
        return { role: 'admin', authenticated: true };
      } else if (authHeader === `Bearer ${userToken}`) {
        return { role: 'user', authenticated: true };
      }
      return { role: 'guest', authenticated: false };
    };

    // 🎯 سیستم مدیریت محاوره پیشرفته
    if (path === '/api/chat/send' && request.method === 'POST') {
      const auth = authenticate(request);
      if (!auth.authenticated) {
        return new Response(JSON.stringify({ error: 'دسترسی غیرمجاز' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      try {
        const { room_id, message, user_id } = await request.json();
        
        // 🧠 موتور پردازش محاوره پیشرفته
        const response = await processConversation(message, room_id, user_id);
        
        // 📊 ذخیره سازی آماری (در محیط واقعی از KV استفاده کنید)
        await logConversation(room_id, user_id, message, response.bot_response);
        
        return new Response(JSON.stringify({
          success: true,
          ...response,
          user_info: { user_id, role: auth.role }
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
        
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'خطا در پردازش محاوره',
          details: error.message 
        }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // 📊 پنل مدیریت - آمار و گزارشات
    if (path === '/api/admin/stats' && request.method === 'GET') {
      const auth = authenticate(request);
      if (auth.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'دسترسی ادمین required' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const stats = await getSystemStats();
      return new Response(JSON.stringify(stats), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // 🗂️ مدیریت اتاق‌های چت
    if (path === '/api/admin/rooms' && request.method === 'GET') {
      const auth = authenticate(request);
      if (auth.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'دسترسی ادمین required' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const rooms = await getAllChatRooms();
      return new Response(JSON.stringify(rooms), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // 🏠 رابط کاربری پنل مدیریت
    if (path === '/admin' || path === '/admin/') {
      const html = generateAdminPanel();
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // 💬 رابط کاربری چت عمومی
    if (path === '/chat' || path === '/') {
      const html = generateChatInterface();
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // 📍 صفحه اصلی
    return new Response(generateHomePage(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

// 🧠 موتور پردازش محاوره پیشرفته
async function processConversation(message, room_id, user_id) {
  const messageLower = message.toLowerCase();
  
  // پایگاه دانش محاوره‌ای
  const knowledgeBase = {
    greetings: ['سلام', 'درود', 'hello', 'hi'],
    questions: ['چطور', 'چگونه', 'چرا', 'کی', 'کجا'],
    analysis: ['تحلیل', 'آنالیز', 'بررسی', 'بررسی کن'],
    system: ['سیستم', 'سامانه', 'برنامه', 'نرم افزار'],
    help: ['کمک', 'راهنما', 'help', 'راهنمایی']
  };

  let botResponse = "سلام! سیستم محاوره‌ای هوشمند در خدمت شماست. چگونه می‌توانم کمک کنم؟";
  let sentiment = 'neutral';
  let priority = 'normal';

  // تحلیل محتوای پیام
  if (knowledgeBase.greetings.some(word => messageLower.includes(word))) {
    botResponse = `سلام ${user_id} عزیز! 🌟 به سامانه تحلیل محاوره‌ای پست ${room_id} خوش آمدید.`;
    sentiment = 'positive';
  }
  
  if (knowledgeBase.questions.some(word => messageLower.includes(word))) {
    botResponse = "سوال خوبی پرسیدید! من می‌تونم در زمینه‌های زیر کمک کنم:\n" +
                 "• تحلیل محتوای متنی\n• بررسی احساسات\n• استخراج کلمات کلیدی\n• تولید گزارش آماری";
    priority = 'high';
  }
  
  if (knowledgeBase.analysis.some(word => messageLower.includes(word))) {
    botResponse = "برای تحلیل محتوا، متن خود را ارسال کنید. من می‌توانم:\n" +
                 "✅ تحلیل احساسات\n✅ استخراج کلیدواژه‌ها\n✅ بررسی ساختار متن\n✅ تولید خلاصه";
    priority = 'high';
  }
  
  if (messageLower.includes('مدیریت') || messageLower.includes('ادمین')) {
    botResponse = "بخش مدیریت از طریق پنل ادمین در دسترس است. برای دسترسی به آمار کامل سیستم به /admin مراجعه کنید.";
    priority = 'high';
  }

  return {
    bot_response: botResponse,
    sentiment: sentiment,
    priority: priority,
    processed_at: new Date().toISOString(),
    message_length: message.length,
    word_count: message.split(' ').length
  };
}

// 📊 توابع مدیریتی
async function logConversation(roomId, userId, userMessage, botResponse) {
  // در محیط واقعی این اطلاعات در KV ذخیره شود
  const logEntry = {
    room_id: roomId,
    user_id: userId,
    user_message: userMessage,
    bot_response: botResponse,
    timestamp: new Date().toISOString(),
    ip: '0.0.0.0' // در محیط واقعی از request.headers.get('CF-Connecting-IP')
  };
  
  console.log('📝 Log:', JSON.stringify(logEntry));
  return true;
}

async function getSystemStats() {
  return {
    total_conversations: 150,
    active_rooms: 3,
    total_users: 45,
    average_response_time: "1.2s",
    system_status: "فعال",
    last_activity: new Date().toISOString(),
    performance: {
      cpu: "25%",
      memory: "68%",
      uptime: "99.8%"
    }
  };
}

async function getAllChatRooms() {
  return {
    rooms: [
      {
        id: 125,
        name: "اتاق اصلی پست ۱۲۵",
        participants: 15,
        active: true,
        last_activity: new Date().toISOString(),
        message_count: 89
      },
      {
        id: 126,
        name: "اتاق پشتیبانی",
        participants: 8,
        active: true,
        last_activity: new Date().toISOString(),
        message_count: 45
      },
      {
        id: 127,
        name: "اتاق تحلیل تخصصی",
        participants: 22,
        active: false,
        last_activity: "2024-01-15T10:30:00Z",
        message_count: 156
      }
    ]
  };
}

// 🎨 تولید رابط کاربری
function generateAdminPanel() {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>پنل مدیریت سامانه محاوره‌ای</title>
    <style>
        body { 
            font-family: Tahoma, Arial;
            direction: rtl;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-right: 4px solid #007bff;
        }
        .login-form {
            max-width: 400px;
            margin: 100px auto;
            padding: 40px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div id="app">
        <div v-if="!authenticated" class="login-form">
            <h2>🔐 ورود به پنل مدیریت</h2>
            <input type="password" v-model="password" placeholder="رمز مدیریت" style="width: 100%; padding: 10px; margin: 10px 0;">
            <button @click="login" style="width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px;">
                ورود به سیستم
            </button>
        </div>
        
        <div v-else class="admin-container">
            <header style="display: flex; justify-content: between; align-items: center; margin-bottom: 30px;">
                <h1>🎯 پنل مدیریت سامانه محاوره‌ای</h1>
                <button @click="logout" style="padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 5px;">
                    خروج
                </button>
            </header>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>📊 کل مکالمات</h3>
                    <p style="font-size: 24px; font-weight: bold;">{{ stats.total_conversations }}</p>
                </div>
                <div class="stat-card">
                    <h3>👥 کاربران فعال</h3>
                    <p style="font-size: 24px; font-weight: bold;">{{ stats.total_users }}</p>
                </div>
                <div class="stat-card">
                    <h3>🏠 اتاق‌های فعال</h3>
                    <p style="font-size: 24px; font-weight: bold;">{{ stats.active_rooms }}</p>
                </div>
                <div class="stat-card">
                    <h3>⚡ وضعیت سیستم</h3>
                    <p style="font-size: 24px; font-weight: bold; color: green;">{{ stats.system_status }}</p>
                </div>
            </div>
            
            <div>
                <h3>🏠 اتاق‌های چت</h3>
                <div v-for="room in rooms" :key="room.id" style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px;">
                    <strong>{{ room.name }}</strong> - 
                    شرکت‌کنندگان: {{ room.participants }} - 
                    پیام‌ها: {{ room.message_count }} - 
                    وضعیت: <span :style="{color: room.active ? 'green' : 'red'}">{{ room.active ? 'فعال' : 'غیرفعال' }}</span>
                </div>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;
        
        createApp({
            data() {
                return {
                    authenticated: false,
                    password: '',
                    stats: {},
                    rooms: []
                }
            },
            async mounted() {
                // بررسی وجود توکن در localStorage
                const token = localStorage.getItem('adminToken');
                if (token) {
                    this.authenticated = true;
                    await this.loadData();
                }
            },
            methods: {
                async login() {
                    if (this.password === 'admin123456') {
                        localStorage.setItem('adminToken', 'admin123456');
                        this.authenticated = true;
                        await this.loadData();
                    } else {
                        alert('رمز عبور نامعتبر است!');
                    }
                },
                logout() {
                    localStorage.removeItem('adminToken');
                    this.authenticated = false;
                    this.password = '';
                },
                async loadData() {
                    try {
                        const response = await fetch('/api/admin/stats', {
                            headers: {
                                'Authorization': 'Bearer admin123456'
                            }
                        });
                        this.stats = await response.json();
                        
                        const roomsResponse = await fetch('/api/admin/rooms', {
                            headers: {
                                'Authorization': 'Bearer admin123456'
                            }
                        });
                        this.rooms = (await roomsResponse.json()).rooms;
                    } catch (error) {
                        console.error('Error loading data:', error);
                    }
                }
            }
        }).mount('#app');
    </script>
</body>
</html>`;
}

function generateChatInterface() {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>سامانه محاوره‌ای هوشمند</title>
    <style>
        body { 
            font-family: Tahoma, Arial;
            direction: rtl;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            height: 100vh;
        }
        .chat-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            height: 90vh;
            display: flex;
            flex-direction: column;
        }
        .chat-header {
            background: #2d3436;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
        }
        .message {
            margin: 10px 0;
            padding: 12px;
            border-radius: 10px;
            max-width: 70%;
        }
        .user-message {
            background: #007bff;
            color: white;
            margin-left: auto;
        }
        .bot-message {
            background: white;
            border: 1px solid #ddd;
        }
        .input-area {
            padding: 20px;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        .input-area input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 25px;
            outline: none;
        }
        .input-area button {
            padding: 12px 25px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h2>💬 سامانه محاوره‌ای هوشمند - پست ۱۲۵</h2>
            <p>سیستم تحلیل محتوای پیشرفته</p>
        </div>
        
        <div class="messages" id="messages">
            <div class="message bot-message">
                <strong>🤖 سامانه:</strong> سلام! به سامانه محاوره‌ای هوشمند خوش آمدید. چگونه می‌توانم کمک کنم؟
            </div>
        </div>
        
        <div class="input-area">
            <input type="text" id="messageInput" placeholder="پیام خود را وارد کنید...">
            <button onclick="sendMessage()">ارسال</button>
        </div>
    </div>

    <script>
        const API_BASE = 'https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev';
        let userId = 'user_' + Math.random().toString(36).substr(2, 9);
        
        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // نمایش پیام کاربر
            addMessage('user', message);
            input.value = '';
            
            try {
                const response = await fetch(API_BASE + '/api/chat/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer user123456'
                    },
                    body: JSON.stringify({
                        room_id: 125,
                        message: message,
                        user_id: userId
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    addMessage('bot', data.bot_response);
                } else {
                    addMessage('bot', 'خطا در ارتباط با سامانه');
                }
            } catch (error) {
                addMessage('bot', 'خطا در ارسال پیام');
            }
        }
        
        function addMessage(sender, text) {
            const messagesDiv = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.innerHTML = `<strong>${sender === 'user' ? '👤 شما' : '🤖 سامانه'}:</strong> ${text}`;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        
        // فعال کردن ارسال با Enter
        document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        
        // نمایش اطلاعات کاربر
        addMessage('bot', `شناسه کاربری شما: ${userId}`);
    </script>
</body>
</html>`;
}

function generateHomePage() {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <title>سامانه محاوره‌ای هوشمند</title>
    <style>
        body { 
            font-family: Tahoma, Arial;
            direction: rtl;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
            text-align: center;
        }
        .nav-buttons {
            margin: 40px 0;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            border: 2px solid rgba(255,255,255,0.3);
            transition: all 0.3s;
        }
        .btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 سامانه محاوره‌ای هوشمند</h1>
        <p>پلتفرم پیشرفته تحلیل محتوای مبتنی بر هوش مصنوعی</p>
        
        <div class="nav-buttons">
            <a href="/chat" class="btn">💬 شروع چت هوشمند</a>
            <a href="/admin" class="btn">🎯 پنل مدیریت</a>
        </div>
        
        <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin-top: 40px;">
            <h3>🎪 امکانات سامانه</h3>
            <p>• تحلیل محتوای متنی پیشرفته</p>
            <p>• پردازش احساسات و تن صدا</p>
            <p>• مدیریت چندین اتاق چت</p>
            <p>• پنل مدیریت پیشرفته</p>
            <p>• امنیت و احراز هویت</p>
        </div>
    </div>
</body>
</html>`;
}
