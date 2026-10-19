
# ==============================================
# Script de Restauración de Base de Datos
# Windows PowerShell
# ==============================================

Write-Host "Iniciando restauración de base de datos..." -ForegroundColor Cyan

# 1. Identificar el contenedor de la base de datos
$containerId = docker compose ps -q db
if (-not $containerId) {
    Write-Host "Error: El contenedor de base de datos no está corriendo." -ForegroundColor Red
    Write-Host "Por favor, ejecuta primero: .\scripts\deploy_2.0.ps1"
    exit 1
}

Write-Host "Contenedor DB encontrado: $containerId" -ForegroundColor Gray

# 2. Definir rutas
$LocalBackupPath = ".\database\intranet_backup.sql"
$RemoteBackupPath = "/tmp/restore_backup.sql"

# Verificar que existe el backup
if (-not (Test-Path $LocalBackupPath)) {
    Write-Host "Error: No se encuentra el archivo $LocalBackupPath" -ForegroundColor Red
    exit 1
}

# --- NUEVO: Conversión de Encoding ---
# psql espera UTF-8, pero PowerShell a veces genera UTF-16 (UCS-2)
# Vamos a crear una copia temporal forzando UTF-8
$TempFile = ".\database\temp_restore_utf8.sql"
Write-Host "Convirtiendo archivo a UTF-8..."
Get-Content $LocalBackupPath | Set-Content -Encoding UTF8 $TempFile
$LocalBackupPath = $TempFile
# -------------------------------------

# 3. Copiar el archivo al contenedor
Write-Host "Copiando backup al contenedor..."
docker cp $LocalBackupPath "$containerId`:$RemoteBackupPath"

# 4. Ejecutar la restauración usando psql
Write-Host "Ejecutando restauración (psql)..."
# Nota: Usamos las credenciales por defecto definidas en docker-compose.yml
# Usuario: user_intranet
# DB: intranet_db

docker exec $containerId psql -U user_intranet -d intranet_db -f $RemoteBackupPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "¡Restauración completada con éxito!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Hubo errores durante la restauración." -ForegroundColor Red
}

# 5. Limpieza
Write-Host "Limpiando archivos temporales..."
docker exec $containerId rm $RemoteBackupPath
if (Test-Path $TempFile) { Remove-Item $TempFile }
