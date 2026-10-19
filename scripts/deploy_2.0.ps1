# ==============================================
# Script de Despliegue - Sistema de Intranet
# Windows PowerShell
# ==============================================

Write-Host "Iniciando despliegue del Sistema de Intranet..." -ForegroundColor Cyan
Write-Host ""

# Ir a la raíz del proyecto
$ScriptRoot = Split-Path $MyInvocation.MyCommand.Path
Set-Location (Resolve-Path "$ScriptRoot\..")
Write-Host "Directorio de trabajo: $(Get-Location)" -ForegroundColor Gray

# Verificar Docker
try {
    $dockerVersion = docker --version
    Write-Host "Docker OK: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "Docker no está instalado o no está en PATH" -ForegroundColor Red
    exit 1
}

# Verificar Docker Compose
try {
    $composeVersion = docker compose version
    Write-Host "Docker Compose OK: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "Docker Compose no disponible" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Detener contenedores existentes (sin borrar volúmenes)
Write-Host "Deteniendo contenedores existentes..."
docker compose down

# Construir imágenes
Write-Host ""
Write-Host "Construyendo imágenes Docker..."
docker compose build --no-cache

# Levantar servicios
Write-Host ""
Write-Host "Iniciando servicios..."
docker compose up -d

# Estado
Write-Host ""
Write-Host "Estado de los servicios:"
docker compose ps

# Verificar API
Write-Host ""
Write-Host "Verificando API..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "API funcionando correctamente" -ForegroundColor Green
    }
} catch {
    Write-Host "API no responde aún. Revisa logs:"
    Write-Host "docker compose logs api"
}

# Verificar Frontend
Write-Host ""
Write-Host "Verificando Frontend..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "Frontend funcionando correctamente" -ForegroundColor Green
    }
} catch {
    Write-Host "Frontend no responde aún. Revisa logs:"
    Write-Host "docker compose logs frontend"
}

# Mostrar IP
$DisplayIP = "localhost"

if ($env:SERVER_IP) {
    $DisplayIP = $env:SERVER_IP
} elseif (Test-Path ".env") {
    foreach ($line in Get-Content ".env") {
        if ($line -match "^SERVER_IP=(.*)") {
            $DisplayIP = $matches[1]
            break
        }
    }
}

Write-Host ""
Write-Host "Despliegue completado"
Write-Host ""
Write-Host "Accesos:"
Write-Host "Frontend: http://$DisplayIP"
Write-Host "API: http://$DisplayIP:3001"
Write-Host "Health: http://$DisplayIP:3001/health"
Write-Host ""
Write-Host "Comandos útiles:"
Write-Host "docker compose logs -f"
Write-Host "docker compose restart"
Write-Host "docker compose down"
