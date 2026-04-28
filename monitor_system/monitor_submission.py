import os
import sys
import requests
from datetime import datetime
from dotenv import load_dotenv

# Fix UnicodeEncodeError for Windows console (CP949) when printing emojis
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Load environment variables from .env file
script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(script_dir, '.env'))

# Configuration
AIRTABLE_BASE_ID = os.environ.get("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = os.environ.get("AIRTABLE_TABLE_NAME")
AIRTABLE_PAT = os.environ.get("AIRTABLE_PAT")
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")

def send_telegram_message(message):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram credentials not configured. Skipping notification.")
        return

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        print("Telegram notification sent successfully.")
    except Exception as e:
        print(f"Failed to send Telegram message: {e}")

def run_test_submission():
    if not all([AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_PAT]):
        msg = "🚨 <b>모니터링 스크립트 설정 오류</b>\nAirtable 환경 변수가 누락되었습니다."
        print(msg)
        send_telegram_message(msg)
        return False

    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{requests.utils.quote(AIRTABLE_TABLE_NAME)}"
    headers = {
        "Authorization": f"Bearer {AIRTABLE_PAT}",
        "Content-Type": "application/json"
    }

    # Payload matching the exact frontend payload
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    payload = {
        "fields": {
            "⛔유입경로": "시스템모니터링",
            "⛔성함": f"TEST_{timestamp}",
            "⛔연락처": "010-0000-0000",
            "⛔지점": "강남점",
            "⛔계약기간": "3개월",
            "⛔우편물개봉동의": "동의",
            "⛔관심 베네핏": "비상주 패키지",
            "⛔문의내용(비고)": "자동 모니터링 테스트용 접수입니다.",
            "⛔개인정보수집동의": "동의",
            "⛔마케팅수신동의": "미동의",
            "utm_source": "test",
            "utm_medium": "test",
            "utm_campaign": "test",
            "utm_term": "test",
            "utm_content": "test",
            "landing_url": "http://localhost/monitoring"
        },
        "typecast": True
    }

    print(f"[{timestamp}] Submitting test payload to Airtable...")
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            record_id = data.get("id")
            print(f"✅ Success! Record ID: {record_id}")
            
            # Immediately delete the test record to keep DB clean
            delete_url = f"{url}/{record_id}"
            del_response = requests.delete(delete_url, headers=headers)
            if del_response.status_code == 200:
                print("✅ Test record deleted successfully.")
            else:
                print(f"⚠️ Failed to delete test record: {del_response.text}")
            
            return True
        else:
            error_data = response.text
            print(f"❌ Failed! Status Code: {response.status_code}\nResponse: {error_data}")
            msg = (
                "🚨 <b>홈페이지 접수 오류 감지!</b>\n\n"
                "에어테이블 API 테스트 중 접수 실패가 발생했습니다.\n\n"
                f"<b>Status Code:</b> {response.status_code}\n"
                f"<b>Error Response:</b>\n<pre>{error_data}</pre>\n\n"
                "가장 최근 수정한 에어테이블 컬럼이나 설정을 확인해 주세요."
            )
            send_telegram_message(msg)
            return False

    except Exception as e:
        print(f"❌ Exception occurred: {e}")
        msg = (
            "🚨 <b>홈페이지 접수 시스템 예외 발생!</b>\n\n"
            "에어테이블 요청 중 네트워크 문제나 예외가 발생했습니다.\n"
            f"<b>Error:</b>\n<pre>{str(e)}</pre>"
        )
        send_telegram_message(msg)
        return False

if __name__ == "__main__":
    run_test_submission()
