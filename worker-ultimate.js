// worker-ultimate.js - نسخه تضمینی
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log('📨 درخواست دریافت شده:', path);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // پاسخ به OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 🎯 سیستم مسیریابی ساده و تضمینی
    try {
      // 🏠 صفحه اصلی - تضمین شده
      if (path === '/' || path === '') {
        return new Response(createHomePage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 💬 صفحه چت - تضمین شده
      if (path === '/chat') {
        return new Response(createChatPage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 🎯 پنل مدیریت - تضمین شده
      if (path === '/admin') {
        return new Response(createAdminPage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // 🔌 API چت - تضمین شده
      if (path === '/api/chat/send' && request.method === 'POST') {
        return await handleChatSend(request, corsHeaders);
      }

      // 📊 وضعیت سیستم - تضمین شده
      if (path === '/api/chat/status') {
        return new Response(JSON.stringify({
          status: 'active',
          service: 'chat_system',
          version: '2.0.0',
          timestamp: new Date().toISOString()
        }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      // ❌ اگر مسیری یافت نشد
      return new Response(createNotFoundPage(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });

    } catch (error) {
      // 🔴 مدیریت خطا
      return new Response(JSON.stringify({
        error: 'خطای سرور',
        details: error.message,
        path: path
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};

// 🧩 توابع کمکی
async function handleChatSend(request, corsHeaders) {
  try {
    const { room_id, message, user_id } = await request.json();
    
    // پاسخ هوشمند ساده
    let response = "سلام! سیستم محاوره فعال است. چگونه می‌توانم کمک کنم؟";
    
    if (message.includes('سلام')) response = "سلام! به سامانه خوش آمدید. 😊";
    if (message.includes('چطور')) response = "من یک دستیار هوشمند هستم. می‌توانم در تحلیل متن کمک کنم!";
    if (message.includes('تحلیل')) response = "برای تحلیل محتوا، متن خود را ارسال کنید.";

    return new Response(JSON.stringify({
      success: true,
      user_message: message,
      bot_response: response,
      room_id: room_id,
      user_id: user_id,
      timestamp: new Date().toISOString()
    }), { headers: { 'Content-Type': 'application
