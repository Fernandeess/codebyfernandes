@echo off
REM Blog Management System - Setup Script for Windows
REM Este script automatiza o setup inicial do projeto

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  Blog Management System - Setup (Windows)         ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Check Node.js
echo Verificando pré-requisitos...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Node.js não está instalado
    echo    Baixe em: https://nodejs.org
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js !NODE_VERSION!
)

REM Check Java
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Java não está instalado
    echo    Baixe em: https://adoptopenjdk.net
    pause
    exit /b 1
) else (
    echo [OK] Java instalado
)

REM Check Maven
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Maven não está instalado
    echo    Baixe em: https://maven.apache.org
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('mvn -v ^| findstr /R "Apache Maven"') do set MVN_VERSION=%%i
    echo [OK] !MVN_VERSION!
)

REM Check Docker (optional)
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo [*] Docker não está instalado (opcional)
) else (
    for /f "tokens=*" %%i in ('docker -v') do set DOCKER_VERSION=%%i
    echo [OK] !DOCKER_VERSION!
)

REM Setup Frontend
echo.
echo Instalando dependências do frontend...
if exist "package.json" (
    call npm install
    echo [OK] Frontend instalado
) else (
    echo [X] package.json não encontrado
    pause
    exit /b 1
)

REM Setup Backend
echo.
echo Baixando dependências do backend...
if exist "backend\pom.xml" (
    cd backend
    call mvn clean install -DskipTests
    if %errorlevel% neq 0 (
        echo [X] Erro ao compilar backend
        pause
        exit /b 1
    )
    echo [OK] Backend pronto
    cd ..
) else (
    echo [X] backend\pom.xml não encontrado
    pause
    exit /b 1
)

REM Create .env if not exists
if not exist ".env" (
    echo.
    echo Criando arquivo .env...
    copy .env.example .env
    echo [OK] .env criado
    echo     Edite .env para suas configurações
)

REM Summary
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  Setup completo!                                  ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Próximos passos:
echo.
echo 1. Inicie o backend:
echo    cd backend
echo    mvn spring-boot:run
echo.
echo 2. Inicie o frontend (em outro terminal):
echo    npm start
echo.
echo 3. Acesse a aplicação:
echo    http://localhost:4200
echo.
echo 4. Login com:
echo    Username: admin
echo    Password: admin123
echo.
echo Para usar Docker:
echo    docker-compose up --build
echo.
echo Documentação:
echo    - QUICK_START.md
echo    - DOCKER_GUIDE.md
echo    - DEPLOY_RENDER.md
echo.
pause
