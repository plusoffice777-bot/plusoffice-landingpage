@echo off
REM 홈페이지 접수 모니터링 실행 스크립트
REM 이 스크립트를 작업 스케줄러(Task Scheduler)에 등록하세요.

cd /d "%~dp0"

REM 가상환경이 있다면 아래에 가상환경 활성화 명령어를 추가하세요.
REM call venv\Scripts\activate.bat

echo [%date% %time%] Starting monitoring script...
python monitor_submission.py >> monitor_log.txt 2>&1

echo [%date% %time%] Monitoring finished.
