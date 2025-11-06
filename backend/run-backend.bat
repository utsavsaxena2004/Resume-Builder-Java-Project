@echo off
echo Compiling and running backend server...

echo Creating build directory...
mkdir build 2>nul
mkdir build\classes 2>nul

echo Compiling Java files...
javac -d build/classes src/main/java/com/resume/builder/*.java src/main/java/com/resume/builder/controller/*.java src/main/java/com/resume/builder/dto/*.java src/main/java/com/resume/builder/model/*.java src/main/java/com/resume/builder/repository/*.java src/main/java/com/resume/builder/service/*.java

echo Compilation completed!

echo Running the application...
java -cp build/classes com.resume.builder.ResumeBuilderApplication

echo.
echo Backend server stopped.
echo.