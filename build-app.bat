@echo off
echo Building Resume Builder Application...

echo Building Frontend...
cd frontend/resume-builder
npm run build
cd ../..

echo Building Backend...
cd backend
build-backend.bat
cd ..

echo.
echo Build completed successfully!
echo.