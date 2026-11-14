@echo off
title AI Brain Local Board + Bridge (http://127.0.0.1:8787)
cd /d "%~dp0..\..\.."
echo Syncing latest board from main...
git pull --ff-only 2>nul
echo Starting AI Brain Local Board + Bridge on http://127.0.0.1:8787 ...
python "%~dp0server.py"
pause
