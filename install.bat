@echo off
REM Install the website's dependencies (Windows). Run once after cloning, and
REM again whenever package.json changes.
REM
REM Node 22+ and pnpm 10.18.1 - both pinned in package.json, and pnpm comes from
REM corepack so nothing is installed system-wide.
setlocal enabledelayedexpansion
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo no node found. Install Node 22+: https://nodejs.org
  pause
  exit /b 1
)
for /f "delims=" %%v in ('node -p "process.versions.node.split^('.'^)[0]"') do set "MAJOR=%%v"
if !MAJOR! LSS 22 (
  echo Node is too old ^(found major !MAJOR!^); package.json needs ^>=22.
  pause
  exit /b 1
)
for /f "delims=" %%v in ('node -v') do echo node   %%v

set "COREPACK_ENABLE_DOWNLOAD_PROMPT=0"
where corepack >nul 2>&1
if not errorlevel 1 (
  call corepack enable >nul 2>&1
  call corepack prepare pnpm@10.18.1 --activate >nul 2>&1
  set "PNPM=corepack pnpm"
) else (
  where pnpm >nul 2>&1
  if errorlevel 1 (
    echo no pnpm and no corepack. Install pnpm: https://pnpm.io/installation
    pause
    exit /b 1
  )
  set "PNPM=pnpm"
)

echo installing dependencies ...
call !PNPM! install --frozen-lockfile
if errorlevel 1 (
  echo install failed
  pause
  exit /b 1
)

echo.
echo   done. start.bat runs the dev server on http://localhost:3000
echo.
pause
