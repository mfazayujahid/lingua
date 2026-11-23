@echo off
cd /d "D:\personal\pj\orca\japanlish\server"
start "LinguaBackend" /min "C:\Program Files\nodejs\node.exe" "D:\personal\pj\orca\japanlish\server\dist\index.js"
cd /d "D:\personal\pj\orca\japanlish\client"
start "LinguaFrontend" /min "C:\Program Files\nodejs\node.exe" "D:\personal\pj\orca\japanlish\client\node_modules\vite\bin\vite.js" preview "D:\personal\pj\orca\japanlish\client" --port 5173 --host
