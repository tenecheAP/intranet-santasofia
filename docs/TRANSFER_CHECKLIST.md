# ✅ Checklist de Transferencia de Proyecto

Usa este checklist para asegurarte de que el proyecto está listo para transferir a otro servidor Docker.

## 📋 Archivos Esenciales

Verifica que estos archivos existan en tu proyecto:

### Configuración Docker
- [ ] `docker-compose.yml` - Orquestación de servicios
- [ ] `backend/Dockerfile` - Imagen del backend
- [ ] `frontend/Dockerfile` - Imagen del frontend
- [ ] `frontend/nginx.conf` - Configuración de Nginx

### Código Fuente Backend
- [ ] `backend/package.json` - Dependencias del backend
- [ ] `backend/server.js` - Punto de entrada
- [ ] `backend/src/app.js` - Aplicación Express
- [ ] `backend/src/routes/` - Rutas de la API
- [ ] `backend/src/controllers/` - Controladores
- [ ] `backend/src/db/` - Configuración de base de datos

### Código Fuente Frontend
- [ ] `frontend/package.json` - Dependencias del frontend
- [ ] `frontend/src/` - Código fuente React
- [ ] `frontend/public/` - Archivos estáticos
- [ ] `frontend/src/index.js` - Punto de entrada
- [ ] `frontend/src/App.js` - Componente principal

### Documentación
- [ ] `README.md` - Documentación principal
- [ ] `.env.example` - Ejemplo de variables de entorno
- [ ] `TUTORIAL_PROMPT.md` - Guía para generar tutorial
- [ ] `BACKUP.md` - Guía de backup y restauración
- [ ] `TRANSFER_CHECKLIST.md` - Este archivo

### Scripts de Despliegue
- [ ] `deploy.sh` - Script para Linux/Mac
- [ ] `deploy.ps1` - Script para Windows

### Control de Versiones
- [ ] `.gitignore` - Archivos a ignorar en Git

## 🔍 Verificaciones Pre-Transferencia

### 1. Verificar Estructura del Proyecto

**En Windows PowerShell:**
```powershell
# Ejecutar desde la raíz del proyecto
Get-ChildItem -Recurse -Depth 2 | Select-Object FullName
```

**En Linux/Mac:**
```bash
tree -L 2
# o
find . -maxdepth 2 -type f
```

### 2. Verificar que Docker Funciona Localmente

```bash
# Detener servicios actuales
docker compose down

# Reconstruir desde cero
docker compose build --no-cache

# Iniciar servicios
docker compose up -d

# Verificar estado
docker compose ps

# Verificar logs
docker compose logs
```

### 3. Verificar Endpoints

```bash
# API Health Check
curl http://localhost:3001/health

# Frontend
curl http://localhost
```

**En Windows PowerShell:**
```powershell
# API Health Check
Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing

# Frontend
Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing
```

### 4. Verificar que node_modules NO esté en el Proyecto

```bash
# Buscar carpetas node_modules
find . -name "node_modules" -type d

# Debería estar SOLO en backend/node_modules (si instalaste localmente)
# NO debe haber node_modules en frontend/ (se instala en el build de Docker)
```

**En Windows PowerShell:**
```powershell
Get-ChildItem -Path . -Filter "node_modules" -Recurse -Directory | Select-Object FullName
```

### 5. Verificar que build/ NO esté en el Proyecto

```bash
# Buscar carpetas build
find . -name "build" -type d
```

**En Windows PowerShell:**
```powershell
Get-ChildItem -Path . -Filter "build" -Recurse -Directory | Select-Object FullName
```

## 📦 Métodos de Transferencia

### Método 1: Git (Recomendado)

```bash
# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Verificar qué se va a subir
git status

# Commit
git commit -m "Initial commit - Sistema de Intranet"

# Agregar remoto
git remote add origin <url-del-repositorio>

# Push
git push -u origin main
```

**Checklist Git:**
- [ ] Repositorio inicializado
- [ ] Archivos agregados
- [ ] `.gitignore` funcionando correctamente
- [ ] Commit realizado
- [ ] Push al repositorio remoto exitoso

### Método 2: Archivo Comprimido

**En Windows PowerShell:**
```powershell
# Comprimir proyecto (excluye archivos innecesarios)
$date = Get-Date -Format "yyyy-MM-dd_HHmm"
Compress-Archive -Path @(
    ".\backend",
    ".\frontend",
    ".\docker-compose.yml",
    ".\README.md",
    ".\.env.example",
    ".\.gitignore",
    ".\deploy.sh",
    ".\deploy.ps1",
    ".\BACKUP.md",
    ".\TUTORIAL_PROMPT.md",
    ".\TRANSFER_CHECKLIST.md"
) -DestinationPath "intranet-transfer-$date.zip" -Force

# Excluir manualmente node_modules y build si existen
Write-Host "✅ Archivo creado: intranet-transfer-$date.zip"
```

**En Linux/Mac:**
```bash
DATE=$(date +%Y-%m-%d_%H%M)
tar -czf "intranet-transfer-$DATE.tar.gz" \
    --exclude='node_modules' \
    --exclude='build' \
    --exclude='.git' \
    --exclude='*.log' \
    backend/ frontend/ docker-compose.yml README.md .env.example .gitignore \
    deploy.sh deploy.ps1 BACKUP.md TUTORIAL_PROMPT.md TRANSFER_CHECKLIST.md

echo "✅ Archivo creado: intranet-transfer-$DATE.tar.gz"
```

**Checklist Compresión:**
- [ ] Archivo comprimido creado
- [ ] Tamaño razonable (< 50MB sin node_modules)
- [ ] No incluye node_modules
- [ ] No incluye build/
- [ ] No incluye .git/ (si usas método comprimido)

### Método 3: Exportar Imágenes Docker

```bash
# Construir imágenes
docker compose build

# Guardar imágenes
docker save -o intranet-images.tar intranet-frontend intranet-api postgres:15-alpine

# Comprimir (opcional)
gzip intranet-images.tar
```

**Checklist Imágenes Docker:**
- [ ] Imágenes construidas exitosamente
- [ ] Archivo .tar creado
- [ ] Tamaño verificado (puede ser grande, 500MB-1GB)

## 🚀 Instrucciones para el Servidor Destino

Incluye estas instrucciones para quien reciba el proyecto:

### Si usaste Git:

```bash
# Clonar repositorio
git clone <url-del-repositorio>
cd intranet

# Desplegar
# En Linux/Mac:
chmod +x deploy.sh
./deploy.sh

# En Windows:
.\deploy.ps1
```

### Si usaste Archivo Comprimido:

**En Linux/Mac:**
```bash
# Extraer
tar -xzf intranet-transfer-2025-12-07_1130.tar.gz
cd intranet

# Desplegar
chmod +x deploy.sh
./deploy.sh
```

**En Windows:**
```powershell
# Extraer
Expand-Archive -Path "intranet-transfer-2025-12-07_1130.zip" -DestinationPath ".\intranet"
cd intranet

# Desplegar
.\deploy.ps1
```

### Si usaste Imágenes Docker:

```bash
# Cargar imágenes
docker load -i intranet-images.tar

# Copiar archivos de configuración
# (docker-compose.yml, etc.)

# Iniciar servicios
docker compose up -d
```

## ✅ Verificación Post-Transferencia

En el servidor destino, verificar:

- [ ] Docker y Docker Compose instalados
- [ ] Proyecto extraído/clonado correctamente
- [ ] Script de despliegue ejecutado sin errores
- [ ] Contenedores corriendo: `docker compose ps`
- [ ] API responde: `curl http://localhost:3001/health`
- [ ] Frontend accesible: `curl http://localhost`
- [ ] Logs sin errores: `docker compose logs`

## 📝 Notas Finales

### Tamaños Esperados:

- **Proyecto completo (sin node_modules)**: ~5-10 MB
- **Proyecto con node_modules del backend**: ~50-100 MB
- **Imágenes Docker**: ~500 MB - 1 GB

### Puertos Necesarios:

- **80**: Frontend (Nginx)
- **3001**: Backend API
- **5432**: PostgreSQL (opcional, solo si necesitas acceso externo)

### Requisitos del Servidor Destino:

- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM mínimo
- 5GB espacio en disco
- Puertos 80 y 3001 disponibles

## 🆘 Problemas Comunes

### "Puerto 80 ya en uso"
Cambiar puerto en `docker-compose.yml` línea del frontend:
```yaml
ports:
  - "8080:80"  # Cambia 80 por otro puerto
```

### "Cannot find module"
En el servidor destino:
```bash
cd backend
npm install
cd ..
docker compose restart api
```

### "Base de datos no conecta"
Verificar que el contenedor de DB esté saludable:
```bash
docker compose ps
docker compose logs db
```

---

**Última actualización**: 2025-12-07

✅ **Proyecto listo para transferir cuando todos los checkboxes estén marcados**
