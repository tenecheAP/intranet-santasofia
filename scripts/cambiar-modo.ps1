status
sparam (
    [Parameter(Mandatory = $false)]
    [ValidateSet("dev", "prod")]
    [string]$UnicoModo
)

# Funcion para preguntar modo si no se pasa como argumento
function Obtener-Modo {
    if ($UnicoModo) { return $UnicoModo }
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "   SELECTOR DE AMBIENTE (Intranet)    " -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "1. Desarrollo (Dev)" -ForegroundColor Yellow
    Write-Host "   - Cambios en vivo (Hot Reload)"
    Write-Host "   - Herramientas de depuracion activas"
    Write-Host ""
    Write-Host "2. Produccion (Prod)" -ForegroundColor Green
    Write-Host "   - Optimizado y rapido (Nginx)"
    Write-Host "   - Sin recarga automatica"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    $opcion = Read-Host "Selecciona una opcion (1 o 2)"
    if ($opcion -eq "1") { return "dev" }
    if ($opcion -eq "2") { return "prod" }
    return "dev" # Default
}

$modo = Obtener-Modo

Write-Host ""
Write-Host "Cambio el sistema a modo: " -NoNewline
if ($modo -eq "prod") { Write-Host "PRODUCCION" -ForegroundColor Green } else { Write-Host "DESARROLLO" -ForegroundColor Yellow }

# 1. Detener cualquier contenedor corriendo
Write-Host ""
Write-Host "[STOP] Deteniendo contenedores actuales..." -ForegroundColor Gray
docker compose down --remove-orphans 2>$null

# 2. Ejecutar segun el modo
if ($modo -eq "prod") {
    Write-Host "[BUILD] Construyendo e iniciando en Produccion..." -ForegroundColor Cyan
    # Usa el archivo docker-compose.prod.yml
    docker compose -f docker-compose.prod.yml up -d --build
}
else {
    Write-Host "[DEPS] Verificando dependencias locales (npm install)..." -ForegroundColor Cyan
    # En desarrollo es bueno asegurar que node_modules local este sincronizado
    if (Test-Path "backend") { Push-Location backend; npm install | Out-Null; Pop-Location }
    
    Write-Host "[BUILD] Construyendo e iniciando en Desarrollo..." -ForegroundColor Cyan
    # Usa el archivo docker-compose.yml (por defecto)
    docker compose -f docker-compose.yml up -d --build
}

# 3. Mostrar estado final
Write-Host ""
Write-Host "[OK] Cambio completado!" -ForegroundColor Green
docker compose ps
