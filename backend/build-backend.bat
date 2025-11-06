@echo off
echo Building backend application...

echo Creating build directory...
mkdir build 2>nul
mkdir build\classes 2>nul
mkdir build\libs 2>nul

echo Compiling Java files...
javac -d build/classes src/main/java/com/resume/builder/*.java src/main/java/com/resume/builder/controller/*.java src/main/java/com/resume/builder/dto/*.java src/main/java/com/resume/builder/model/*.java src/main/java/com/resume/builder/repository/*.java src/main/java/com/resume/builder/service/*.java

echo Creating JAR file...
jar -cvf build/libs/resume-builder.jar -C build/classes .

echo Build completed!
echo JAR file created at build/libs/resume-builder.jar

echo.
echo To run the application:
echo java -jar build/libs/resume-builder.jar
echo.