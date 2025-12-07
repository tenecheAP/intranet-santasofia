# 🔄 Guía de Despliegue: GitHub → PC Trabajo → Servidor

Esta guía te ayudará a desplegar el proyecto siguiendo este flujo:
1. **Subir** el proyecto a GitHub desde tu PC personal
2. **Descargar** desde GitHub en tu PC del trabajo
3. **Transferir** al servidor (USB o red interna)
4. **Desplegar** en Docker del servidor

---

## 📤 PASO 1: Subir el Proyecto a GitHub (PC Personal)

### 1.1 Crear Repositorio en GitHub

1. Ve a https://github.com
2. Haz clic en **"New repository"** (botón verde)
3. Configura el repositorio:
   - **Nombre**: `intranet-sistema` (o el que prefieras)
   - **Descripción**: "Sistema de Intranet Corporativa"
   - **Privado/Público**: Elige según tus necesidades
   - **NO** marques "Initialize with README" (ya tienes uno)
4. Haz clic en **"Create repository"**

### 1.2 Subir el Código desde tu PC Personal

Abre PowerShell en la carpeta del proyecto:

```powershell
# Navegar a la carpeta del proyecto
cd C:\Users\tenec\Documents\intranet

# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Verificar qué se va a subir (debe excluir node_modules, build, etc.)
git status

# Hacer commit
git commit -m "Initial commit - Sistema de Intranet v0.1.0"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/intranet-sistema.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 1.3 Verificar que se Subió Correctamente

1. Refresca la página de GitHub
2. Deberías ver todos los archivos:
   - ✅ `backend/` (sin node_modules)
   - ✅ `frontend/` (sin node_modules ni build)
   - ✅ `docker-compose.yml`
   - ✅ `README.md` y demás documentación
   - ✅ `.gitignore`
   - ✅ Scripts de despliegue

**⚠️ IMPORTANTE**: Verifica que NO se hayan subido:
- ❌ `node_modules/`
- ❌ `build/`
- ❌ `.env` (solo debe estar `.env.example`)

---

## 📥 PASO 2: Descargar en PC del Trabajo

### 2.1 Instalar Git en PC del Trabajo (si no lo tienes)

**Opción A: Descargar Git**
1. Ve a https://git-scm.com/download/win
2. Descarga e instala Git para Windows
3. Reinicia PowerShell/CMD

**Opción B: Usar GitHub Desktop** (más fácil)
1. Descarga desde https://desktop.github.com/
2. Instala y abre GitHub Desktop
3. Inicia sesión con tu cuenta de GitHub

### 2.2 Clonar el Repositorio

**Usando Git (PowerShell/CMD):**

```powershell
# Navegar a donde quieres descargar el proyecto
cd C:\Users\TU-USUARIO\Documents

# Clonar el repositorio
git clone https://github.com/TU-USUARIO/intranet-sistema.git

# Entrar a la carpeta
cd intranet-sistema

# Verificar que todo se descargó
dir
```

**Usando GitHub Desktop:**
1. Abre GitHub Desktop
2. File → Clone Repository
3. Busca `intranet-sistema`
4. Elige la carpeta de destino
5. Haz clic en "Clone"

### 2.3 Verificar la Descarga

```powershell
# Listar archivos principales
Get-ChildItem -Path . -File | Select-Object Name

# Deberías ver:
# - README.md
# - docker-compose.yml
# - deploy.ps1
# - deploy.sh
# - TRANSFER_CHECKLIST.md
# - etc.
```

---

## 💾 PASO 3: Preparar para Transferir al Servidor

### 3.1 Crear Paquete de Transferencia

**Opción A: Transferencia Completa (Recomendado)**

```powershell
# Navegar a la carpeta del proyecto
cd C:\Users\TU-USUARIO\Documents\intranet-sistema

# Crear carpeta de transferencia
New-Item -ItemType Directory -Force -Path "C:\temp\intranet-transfer"

# Copiar todo el proyecto (Git ya excluyó node_modules y build)
Copy-Item -Path ".\*" -Destination "C:\temp\intranet-transfer" -Recurse -Force

# Comprimir para USB o red
$date = Get-Date -Format "yyyy-MM-dd"
Compress-Archive -Path "C:\temp\intranet-transfer\*" -DestinationPath "C:\temp\intranet-servidor-$date.zip" -Force

Write-Host "✅ Paquete creado: C:\temp\intranet-servidor-$date.zip"
Write-Host "📦 Tamaño aproximado: ~50 MB"
```

**Opción B: Transferencia Mínima (Solo lo esencial)**

Si prefieres un archivo más pequeño:

```powershell
# Crear estructura mínima
$destino = "C:\temp\intranet-minimal"
New-Item -ItemType Directory -Force -Path $destino

# Copiar solo archivos esenciales
$archivos = @(
    "backend\src",
    "backend\package.json",
    "backend\package-lock.json",
    "backend\Dockerfile",
    "backend\server.js",
    "frontend\src",
    "frontend\public",
    "frontend\package.json",
    "frontend\Dockerfile",
    "frontend\nginx.conf",
    "docker-compose.yml",
    "README.md",
    "deploy.ps1",
    "deploy.sh",
    ".env.example",
    ".gitignore",
    "TRANSFER_CHECKLIST.md"
)

foreach ($archivo in $archivos) {
    $origen = Join-Path -Path "." -ChildPath $archivo
    $dest = Join-Path -Path $destino -ChildPath $archivo
    $destDir = Split-Path -Path $dest -Parent
    
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    }
    
    if (Test-Path $origen) {
        Copy-Item -Path $origen -Destination $dest -Recurse -Force
    }
}

# Comprimir
$date = Get-Date -Format "yyyy-MM-dd"
Compress-Archive -Path "$destino\*" -DestinationPath "C:\temp\intranet-minimal-$date.zip" -Force

Write-Host "✅ Paquete mínimo creado: C:\temp\intranet-minimal-$date.zip"
```

### 3.2 Verificar el Paquete

```powershell
# Ver tamaño del archivo
Get-Item "C:\temp\intranet-servidor-*.zip" | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}

# Verificar contenido
Expand-Archive -Path "C:\temp\intranet-servidor-*.zip" -DestinationPath "C:\temp\verificar" -Force
Get-ChildItem "C:\temp\verificar" -Recurse | Select-Object FullName
```

---

## 🚚 PASO 4: Transferir al Servidor

### Método A: USB

1. **Copiar a USB:**
   ```powershell
   # Reemplaza E: con la letra de tu USB
   Copy-Item -Path "C:\temp\intranet-servidor-*.zip" -Destination "E:\" -Force
   ```

2. **En el servidor, copiar desde USB:**
   ```powershell
   # Reemplaza E: con la letra de tu USB
   Copy-Item -Path "E:\intranet-servidor-*.zip" -Destination "C:\deploy\" -Force
   ```

### Método B: Red Interna (Carpeta Compartida)

1. **Desde PC del trabajo:**
   ```powershell
   # Copiar a carpeta compartida del servidor
   # Reemplaza con la ruta de tu red
   Copy-Item -Path "C:\temp\intranet-servidor-*.zip" -Destination "\\SERVIDOR\compartida\deploy\" -Force
   ```

2. **En el servidor:**
   ```powershell
   # Copiar desde carpeta compartida a local
   Copy-Item -Path "C:\compartida\deploy\intranet-servidor-*.zip" -Destination "C:\deploy\" -Force
   ```

### Método C: Red Interna (SCP/PowerShell Remoting)

**Si tienes acceso SSH o PowerShell Remoting:**

```powershell
# Usando PowerShell Remoting
$session = New-PSSession -ComputerName SERVIDOR -Credential (Get-Credential)
Copy-Item -Path "C:\temp\intranet-servidor-*.zip" -Destination "C:\deploy\" -ToSession $session
Remove-PSSession $session
```

---

## 🚀 PASO 5: Desplegar en el Servidor

### 5.1 Conectarse al Servidor

**Opción A: Escritorio Remoto (RDP)**
1. Abre "Conexión a Escritorio Remoto"
2. Conecta al servidor
3. Abre PowerShell como Administrador

**Opción B: SSH (si está habilitado)**
```powershell
ssh usuario@servidor
```

### 5.2 Extraer el Proyecto

```powershell
# Navegar a la carpeta de deploy
cd C:\deploy

# Extraer el archivo
Expand-Archive -Path ".\intranet-servidor-*.zip" -DestinationPath ".\intranet" -Force

# Entrar a la carpeta
cd intranet

# Verificar contenido
dir
```

### 5.3 Verificar Docker en el Servidor

```powershell
# Verificar Docker
docker --version
docker compose version

# Si no está instalado, instalar Docker Desktop:
# https://docs.docker.com/desktop/install/windows-install/
```

### 5.4 Ejecutar el Despliegue

```powershell
# Ejecutar script de despliegue
.\deploy.ps1

# O manualmente:
cd backend
npm install
cd ..
docker compose build --no-cache
docker compose up -d
```

### 5.5 Verificar el Despliegue

```powershell
# Ver estado de contenedores
docker compose ps

# Ver logs
docker compose logs -f

# Probar API
Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing

# Probar Frontend
Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing
```

---

## 📋 Checklist Completo del Proceso

### ✅ En PC Personal
- [ ] Código funcionando localmente
- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Verificado que no se subieron node_modules ni build

### ✅ En PC del Trabajo
- [ ] Git instalado (o GitHub Desktop)
- [ ] Repositorio clonado desde GitHub
- [ ] Paquete de transferencia creado
- [ ] Paquete copiado a USB o red

### ✅ En el Servidor
- [ ] Docker Desktop instalado
- [ ] Paquete recibido (USB o red)
- [ ] Proyecto extraído
- [ ] Script de despliegue ejecutado
- [ ] Contenedores corriendo
- [ ] API respondiendo
- [ ] Frontend accesible

---

## 🔧 Troubleshooting

### Problema: Git no está instalado en PC del trabajo

**Solución 1:** Descarga el proyecto como ZIP desde GitHub
1. Ve a tu repositorio en GitHub
2. Clic en "Code" → "Download ZIP"
3. Extrae el ZIP
4. Continúa con el Paso 3

**Solución 2:** Usa GitHub Desktop (más fácil)

### Problema: No puedo acceder a GitHub desde PC del trabajo

**Solución:** Descarga en PC personal y transfiere por USB
1. En PC personal: Crea el paquete de transferencia
2. Copia a USB
3. Lleva USB al trabajo
4. Continúa desde el Paso 4

### Problema: El servidor no tiene acceso a internet

**Solución:** Transferir imágenes Docker pre-construidas

**En PC del trabajo (con internet):**
```powershell
# Clonar repositorio
git clone https://github.com/TU-USUARIO/intranet-sistema.git
cd intranet-sistema

# Instalar dependencias del backend
cd backend
npm install
cd ..

# Construir imágenes Docker
docker compose build

# Exportar imágenes
docker save -o intranet-images.tar intranet-frontend intranet-api postgres:15-alpine

# Copiar a USB junto con el proyecto
Copy-Item -Path "intranet-images.tar" -Destination "E:\"
```

**En el servidor (sin internet):**
```powershell
# Cargar imágenes
docker load -i E:\intranet-images.tar

# Extraer proyecto
Expand-Archive -Path "E:\intranet-servidor-*.zip" -DestinationPath "C:\deploy\intranet"
cd C:\deploy\intranet

# Iniciar servicios (sin build, usa imágenes cargadas)
docker compose up -d
```

### Problema: Puerto 80 ya está en uso en el servidor

**Solución:** Cambiar puerto en `docker-compose.yml`

```yaml
# Editar docker-compose.yml, línea del frontend:
ports:
  - "8080:80"  # Cambia 80 por 8080 u otro puerto disponible
```

---

## 📝 Script Automatizado de Preparación

Guarda este script como `preparar-transferencia.ps1` en tu PC del trabajo:

```powershell
# preparar-transferencia.ps1
# Script para preparar el proyecto para transferir al servidor

param(
    [string]$MetodoTransferencia = "USB",  # USB, Red, o Completo
    [string]$RutaDestino = "C:\temp"
)

Write-Host "🚀 Preparando proyecto para transferencia..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "docker-compose.yml")) {
    Write-Host "❌ Error: No se encuentra docker-compose.yml" -ForegroundColor Red
    Write-Host "Ejecuta este script desde la carpeta raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

# Crear carpeta de destino
$fecha = Get-Date -Format "yyyy-MM-dd_HHmm"
$carpetaTransfer = Join-Path $RutaDestino "intranet-transfer-$fecha"
New-Item -ItemType Directory -Force -Path $carpetaTransfer | Out-Null

Write-Host "📁 Copiando archivos..." -ForegroundColor Cyan

# Copiar todo el proyecto
Copy-Item -Path ".\*" -Destination $carpetaTransfer -Recurse -Force -Exclude @("node_modules", "build", ".git")

# Comprimir
$archivoZip = Join-Path $RutaDestino "intranet-servidor-$fecha.zip"
Compress-Archive -Path "$carpetaTransfer\*" -DestinationPath $archivoZip -Force

# Limpiar carpeta temporal
Remove-Item -Path $carpetaTransfer -Recurse -Force

# Mostrar resultado
$tamano = [math]::Round((Get-Item $archivoZip).Length / 1MB, 2)
Write-Host ""
Write-Host "✅ Paquete creado exitosamente!" -ForegroundColor Green
Write-Host "📦 Archivo: $archivoZip" -ForegroundColor White
Write-Host "📊 Tamaño: $tamano MB" -ForegroundColor White
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Copia el archivo a USB o red interna" -ForegroundColor White
Write-Host "2. Transfiere al servidor" -ForegroundColor White
Write-Host "3. Extrae y ejecuta .\deploy.ps1" -ForegroundColor White
Write-Host ""
```

**Uso:**
```powershell
.\preparar-transferencia.ps1
```

---

## 🎯 Resumen del Flujo Completo

```
┌─────────────────┐
│   PC Personal   │
│   (Casa)        │
└────────┬────────┘
         │ git push
         ▼
┌─────────────────┐
│     GitHub      │
│  (Repositorio)  │
└────────┬────────┘
         │ git clone
         ▼
┌─────────────────┐
│  PC del Trabajo │
│   (Oficina)     │
└────────┬────────┘
         │ Crear paquete .zip
         ▼
┌─────────────────┐
│   USB o Red     │
│   Interna       │
└────────┬────────┘
         │ Copiar
         ▼
┌─────────────────┐
│    Servidor     │
│   (Producción)  │
└─────────────────┘
         │ Extraer y deploy.ps1
         ▼
┌─────────────────┐
│  Docker Running │
│   ✅ Listo!     │
└─────────────────┘
```

---

## 📞 Contacto y Soporte

Si encuentras problemas:
1. Revisa la sección de Troubleshooting
2. Consulta `README.md` para más detalles
3. Verifica logs: `docker compose logs -f`

---

**Última actualización**: 2025-12-07  
**Método recomendado**: GitHub → PC Trabajo → USB → Servidor
