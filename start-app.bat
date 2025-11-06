@echo off
echo Starting Resume Builder Application...

echo Starting Backend Server...
cd backend
start "Backend" cmd /k "run-backend.bat"
cd ..

timeout /t 10

echo Starting Frontend Server...
cd frontend/resume-builder
start "Frontend" cmd /k "npm start"

echo.
echo Resume Builder Application started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8080
echo.