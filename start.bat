@echo off
REM Run the website locally (Windows).
REM
REM   start.bat            dev server with hot reload, http://localhost:3000
REM   start.bat --build    production build, then serve it
REM
REM This is for working on the site. The live site is served by Caddy on the
REM Mac from infra/www/coxford.net - deploy with: coxford site
setlocal enabledelayedexpansion
cd /d "%~dp0"

set "COREPACK_ENABLE_DOWNLOAD_PROMPT=0"
where corepack >nul 2>&1
if not errorlevel 1 (
  set "PNPM=corepack pnpm"
) else (
  where pnpm >nul 2>&1
  if errorlevel 1 (
    echo no pnpm. Run install.bat first.
    pause
    exit /b 1
  )
  set "PNPM=pnpm"
)

if not exist node_modules (
  echo no node_modules - running install.bat first
  call "%~dp0install.bat"
)

if /i "%~1"=="--build" (
  call !PNPM! run build
  if errorlevel 1 ( pause & exit /b 1 )
  echo.
  echo   serving the production build - http://localhost:3000
  echo.
  call !PNPM! run serve
  pause
  exit /b 0
)

echo.
echo   dev server - http://localhost:3000  ^(Ctrl-C to stop^)
echo.
call !PNPM! start
pause
