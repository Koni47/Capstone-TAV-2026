@echo off
REM prisma-utils.bat - utilidades rápidas para Prisma (ERD, generate, migrate, studio, db push, seed)
REM Coloca este archivo en la carpeta `backend` y ejecútalo desde esa carpeta:
REM   cd backend
REM   prisma-utils.bat erd

SETLOCAL ENABLEDELAYEDEXPANSION

REM Asegurarse de trabajar desde la carpeta donde está este script (backend root)
cd /d "%~dp0"

if "%~1"=="" goto help

set CMD=%~1

if /I "%CMD%"=="erd" (
    if not exist "prisma\erd" mkdir prisma\erd
    echo Generando ERD (SVG) con prisma-erd-generator...
    npx prisma generate --schema prisma/schema.prisma
    if exist "prisma\erd\erd.svg" (
        echo ERD generado: prisma\erd\erd.svg
        echo Abriendo el archivo...
        start "" "%CD%\prisma\erd\erd.svg"
    ) else (
        echo ERROR: No se generó prisma\erd\erd.svg
    )
    goto end
)

if /I "%CMD%"=="generate" (
    echo Ejecutando: npx prisma generate
    npx prisma generate --schema prisma/schema.prisma
    goto end
)

if /I "%CMD%"=="migrate" (
    echo Ejecutando: npx prisma migrate dev
    npx prisma migrate dev
    goto end
)

if /I "%CMD%"=="studio" (
    echo Ejecutando: npx prisma studio
    npx prisma studio
    goto end
)

if /I "%CMD%"=="dbpush" (
    echo Ejecutando: npx prisma db push
    npx prisma db push
    goto end
)

if /I "%CMD%"=="seed" (
    echo Ejecutando: npm run seed
    npm run seed
    goto end
)

:help
echo Uso: prisma-utils.bat ^<comando^>
echo Comandos:
echo   erd      - Generar ERD SVG y abrir prisma\erd\erd.svg
echo   generate - Ejecutar npx prisma generate
echo   migrate  - Ejecutar npx prisma migrate dev
echo   studio   - Abrir npx prisma studio
echo   dbpush   - Ejecutar npx prisma db push
echo   seed     - Ejecutar npm run seed

:end
ENDLOCAL
exit /b 0
