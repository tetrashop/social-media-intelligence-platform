#!/usr/bin/env python3
import requests
import json
import sys

API_URL = "https://social-media-intelligence-platform1.ramin-edjlal1359.workers.dev"

def chat_with_system():
    print("🤖 سیستم محاوره‌ای هوشمند - پست ۱۲۵")
    print("دستورات ویژه: exit, status, rooms, help")
    print("=" * 50)
    
    while True:
        user_input = input("👤 شما: ").strip()
        
        if user_input.lower() in ['exit', 'خروج', 'quit']:
            print("👋 خدانگهدار!")
            break
            
        elif user_input.lower() in ['status', 'وضعیت']:
            check_system_status()
            
        elif user_input.lower() in ['rooms', 'اتاق‌ها']:
            list_chat_rooms()
            
        elif user_input.lower() in ['help', 'راهنما']:
            show_help()
            
        else:
            send_message(user_input)

def send_message(message):
    try:
        payload = {
            "room_id": 125,
            "message": message,
            "user_id": "python-chat-user"
        }
        
        response = requests.post(
            f"{API_URL}/api/chat/send",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print(f"🤖 سامانه: {data['bot_response']}")
            else:
                print(f"❌ خطا: {data.get('error', 'خطای ناشناخته')}")
        else:
            print(f"❌ خطای HTTP: {response.status_code}")
            
    except Exception as e:
        print(f"❌ خطا در ارتباط: {e}")

def check_system_status():
    try:
        response = requests.get(f"{API_URL}/api/chat/status")
        if response.status_code == 200:
            status = response.json()
            print(f"✅ وضعیت سامانه: {status.get('status', 'نامشخص')}")
            print(f"📊 نسخه: {status.get('version', 'نامشخص')}")
            print(f"🎯 پست: {status.get('post_id', 'نامشخص')}")
        else:
            print("❌ خطا در دریافت وضعیت")
    except Exception as e:
        print(f"❌ خطا: {e}")

def list_chat_rooms():
    try:
        response = requests.get(f"{API_URL}/api/chat/rooms")
        if response.status_code == 200:
            rooms = response.json()
            print("🏠 اتاق‌های فعال:")
            for room in rooms.get('rooms', []):
                print(f"  - {room['name']} (ID: {room['id']})")
        else:
            print("❌ خطا در دریافت لیست اتاق‌ها")
    except Exception as e:
        print(f"❌ خطا: {e}")

def show_help():
    print("📖 راهنمای دستورات:")
    print("  - متن معمولی: ارسال پیام به سامانه")
    print("  - status/وضعیت: بررسی سلامت سامانه")
    print("  - rooms/اتاق‌ها: مشاهده اتاق‌های چت")
    print("  - exit/خروج: خروج از برنامه")
    print("  - help/راهنما: نمایش این راهنما")

if __name__ == "__main__":
    chat_with_system()
