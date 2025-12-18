# ============================================
# Script de Preparación para Transferencia
# ============================================
# Prepara el proyecto para transferir al servidor
# Uso: .\preparar-transferencia.ps1

param(
    [string]$RutaDestino = "C:\temp",
    [switch]$IncluirImagenesDocker = $false
)

Write-Host ""
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Preparación de Proyecto para Transferencia   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "docker-compose.yml")) {
    Write-Host "❌ Error: No se encuentra docker-compose.yml" -ForegroundColor Red
    Write-Host "   Ejecuta este script desde la carpeta raíz del proyecto" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "✅ Carpeta del proyecto verificada" -ForegroundColor Green
Write-Host ""

# Crear carpeta de destino
$fecha = Get-Date -Format "yyyy-MM-dd_HHmm"
$carpetaTransfer = Join-Path $RutaDestino "intranet-transfer-$fecha"

Write-Host "📁 Creando carpeta temporal: $carpetaTransfer" -ForegroundColor Cyan

try {
    New-Item -ItemType Directory -Force -Path $carpetaTransfer | Out-Null
    Write-Host "✅ Carpeta creada" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error al crear carpeta: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Copiando archivos del proyecto..." -ForegroundColor Cyan

# Archivos y carpetas a copiar
$itemsToCopy = @(
    "backend",
    "frontend",
    "docker-compose.yml",
    "README.md",
    "deploy.ps1",
    "deploy.sh",
    ".env.example",
    ".gitignore",
    "BACKUP.md",
    "TRANSFER_CHECKLIST.md",
    "DEPLOY_GITHUB_TO_SERVER.md",
    "PROJECT_STRUCTURE.md",
    "TUTORIAL_PROMPT.md"
)

$copiedCount = 0
foreach ($item in $itemsToCopy) {
    if (Test-Path $item) {
        try {
            Copy-Item -Path $item -Destination $carpetaTransfer -Recurse -Force -ErrorAction Stop
            Write-Host "  ✓ $item" -ForegroundColor Gray
            $copiedCount++
        }
        catch {
            Write-Host "  ✗ Error copiando $item : $_" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "  ⚠ $item no encontrado" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✅ $copiedCount archivos/carpetas copiados" -ForegroundColor Green

# Limpiar node_modules y build si existen en la copia
Write-Host ""
Write-Host "🧹 Limpiando archivos innecesarios..." -ForegroundColor Cyan

$toClean = @(
    "$carpetaTransfer\backend\node_modules",
    "$carpetaTransfer\frontend\node_modules",
    "$carpetaTransfer\frontend\build"
)

foreach ($path in $toClean) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force
        Write-Host "  ✓ Eliminado: $(Split-Path $path -Leaf)" -ForegroundColor Gray
    }
}

# Comprimir
Write-Host ""
Write-Host "📦 Comprimiendo proyecto..." -ForegroundColor Cyan

$archivoZip = Join-Path $RutaDestino "intranet-servidor-$fecha.zip"

try {
    Compress-Archive -Path "$carpetaTransfer\*" -DestinationPath $archivoZip -Force -ErrorAction Stop
    Write-Host "✅ Compresión completada" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error al comprimir: $_" -ForegroundColor Red
    exit 1
}

# Limpiar carpeta temporal
Write-Host ""
Write-Host "🧹 Limpiando archivos temporales..." -ForegroundColor Cyan
Remove-Item -Path $carpetaTransfer -Recurse -Force
Write-Host "✅ Limpieza completada" -ForegroundColor Green

# Exportar imágenes Docker si se solicitó
if ($IncluirImagenesDocker) {
    Write-Host ""
    Write-Host "🐳 Exportando imágenes Docker..." -ForegroundColor Cyan
    
    $archivoImagenes = Join-Path $RutaDestino "intranet-images-$fecha.tar"
    
    try {
        docker save -o $archivoImagenes intranet-frontend intranet-api postgres:15-alpine
        Write-Host "✅ Imágenes Docker exportadas" -ForegroundColor Green
        
        $tamanoImagenes = [math]::Round((Get-Item $archivoImagenes).Length / 1MB, 2)
        Write-Host "   Archivo: $archivoImagenes" -ForegroundColor Gray
        Write-Host "   Tamaño: $tamanoImagenes MB" -ForegroundColor Gray
    }
    catch {
        Write-Host "⚠️  Error al exportar imágenes Docker: $_" -ForegroundColor Yellow
        Write-Host "   Asegúrate de que las imágenes estén construidas" -ForegroundColor Yellow
    }
}

# Mostrar resultado
Write-Host ""
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           ✅ PAQUETE CREADO EXITOSAMENTE       ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

$tamano = [math]::Round((Get-Item $archivoZip).Length / 1MB, 2)

Write-Host "📦 Información del paquete:" -ForegroundColor Cyan
Write-Host "   Archivo: $archivoZip" -ForegroundColor White
Write-Host "   Tamaño: $tamano MB" -ForegroundColor White
Write-Host "   Fecha: $fecha" -ForegroundColor White
Write-Host ""

Write-Host "📋 Contenido incluido:" -ForegroundColor Cyan
Write-Host "   ✓ Código fuente (backend y frontend)" -ForegroundColor Gray
Write-Host "   ✓ Archivos Docker (docker-compose.yml, Dockerfiles)" -ForegroundColor Gray
Write-Host "   ✓ Scripts de despliegue (deploy.ps1, deploy.sh)" -ForegroundColor Gray
Write-Host "   ✓ Documentación completa" -ForegroundColor Gray
Write-Host "   ✓ Configuración (.env.example, .gitignore)" -ForegroundColor Gray
if ($IncluirImagenesDocker) {
    Write-Host "   ✓ Imágenes Docker pre-construidas" -ForegroundColor Gray
}
Write-Host ""

Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1️⃣  Copia el archivo ZIP a USB o red interna:" -ForegroundColor White
Write-Host "      Copy-Item '$archivoZip' -Destination 'E:\'" -ForegroundColor Gray
Write-Host ""
Write-Host "   2️⃣  En el servidor, extrae el archivo:" -ForegroundColor White
Write-Host "      Expand-Archive -Path 'E:\intranet-servidor-$fecha.zip' -Destination 'C:\deploy\intranet'" -ForegroundColor Gray
Write-Host ""
Write-Host "   3️⃣  Ejecuta el script de despliegue:" -ForegroundColor White
Write-Host "      cd C:\deploy\intranet" -ForegroundColor Gray
Write-Host "      .\deploy.ps1" -ForegroundColor Gray
Write-Host ""

if ($IncluirImagenesDocker) {
    Write-Host "   4️⃣  Si el servidor no tiene internet, carga las imágenes:" -ForegroundColor White
    Write-Host "      docker load -i '$archivoImagenes'" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "📖 Para más detalles, consulta:" -ForegroundColor Cyan
Write-Host "   - DEPLOY_GITHUB_TO_SERVER.md" -ForegroundColor White
Write-Host "   - TRANSFER_CHECKLIST.md" -ForegroundColor White
Write-Host ""

# Abrir carpeta de destino
Write-Host "¿Deseas abrir la carpeta de destino? (S/N): " -ForegroundColor Yellow -NoNewline
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s") {
    explorer $RutaDestino
}

Write-Host ""
Write-Host "✅ Proceso completado!" -ForegroundColor Green
Write-Host ""
