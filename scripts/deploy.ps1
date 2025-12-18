# ==============================================
# Script de Despliegue - Sistema de Intranet
# Para Windows PowerShell
# ==============================================

Write-Host "🚀 Iniciando despliegue del Sistema de Intranet..." -ForegroundColor Cyan
Write-Host ""

# Asegurar que estamos en la raíz del proyecto
$ScriptRoot = Split-Path $MyInvocation.MyCommand.Path
Set-Location "$ScriptRoot\.."
Write-Host "📂 Directorio de trabajo: $(Get-Location)" -ForegroundColor Gray


# Verificar que Docker esté instalado
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker está instalado: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Docker no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Docker Desktop desde: https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor Yellow
    exit 1
}

# Verificar que Docker Compose esté disponible
try {
    $composeVersion = docker compose version
    Write-Host "✅ Docker Compose está instalado: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Docker Compose no está disponible" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Detener contenedores existentes si los hay
Write-Host "🛑 Deteniendo contenedores existentes..." -ForegroundColor Yellow
docker compose down 2>$null

# Instalar dependencias del backend
Write-Host ""
Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Cyan
Set-Location backend
npm install
Set-Location ..

# Construir las imágenes
Write-Host ""
Write-Host "🔨 Construyendo imágenes Docker..." -ForegroundColor Cyan
docker compose build --no-cache

# Iniciar los servicios
Write-Host ""
Write-Host "🚀 Iniciando servicios..." -ForegroundColor Cyan
docker compose up -d

# Esperar a que los servicios estén listos
Write-Host ""
Write-Host "⏳ Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar el estado de los servicios
Write-Host ""
Write-Host "📊 Estado de los servicios:" -ForegroundColor Cyan
docker compose ps

# Verificar la salud de la API
Write-Host ""
Write-Host "🔍 Verificando la API..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ API está funcionando correctamente" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  API no responde. Verifica los logs con: docker compose logs api" -ForegroundColor Yellow
}

# Verificar el frontend
Write-Host ""
Write-Host "🔍 Verificando el Frontend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend está funcionando correctamente" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Frontend no responde. Verifica los logs con: docker compose logs frontend" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Accede a la aplicación:" -ForegroundColor Cyan
Write-Host "   - Frontend: http://localhost" -ForegroundColor White
Write-Host "   - API: http://localhost:3001" -ForegroundColor White
Write-Host "   - Health Check: http://localhost:3001/health" -ForegroundColor White
Write-Host ""
Write-Host "📝 Comandos útiles:" -ForegroundColor Cyan
Write-Host "   - Ver logs: docker compose logs -f" -ForegroundColor White
Write-Host "   - Detener: docker compose down" -ForegroundColor White
Write-Host "   - Reiniciar: docker compose restart" -ForegroundColor White
Write-Host ""
