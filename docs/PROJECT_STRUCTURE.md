# 📁 Estructura del Proyecto - Sistema de Intranet

## 🎯 Resumen

Este proyecto está completamente organizado y listo para transferir a cualquier servidor con Docker. Todos los archivos necesarios están incluidos y documentados.

## 📂 Estructura de Archivos

```
intranet/
│
├── 📄 README.md                    # Documentación principal del proyecto
├── 📄 TRANSFER_CHECKLIST.md        # Checklist para transferir el proyecto
├── 📄 BACKUP.md                    # Guía de backup y restauración
├── 📄 TUTORIAL_PROMPT.md           # Prompt para generar tutorial con IA
├── 📄 .env.example                 # Ejemplo de variables de entorno
├── 📄 .gitignore                   # Archivos a ignorar en Git
├── 📄 docker-compose.yml           # Orquestación de servicios Docker
├── 🔧 deploy.sh                    # Script de despliegue para Linux/Mac
├── 🔧 deploy.ps1                   # Script de despliegue para Windows
│
├── 📁 backend/                     # API REST con Node.js/Express
│   ├── 📄 package.json             # Dependencias del backend
│   ├── 📄 package-lock.json        # Lock de dependencias (incluido en Git)
│   ├── 📄 server.js                # Punto de entrada del servidor
│   ├── 📄 Dockerfile               # Imagen Docker del backend
│   ├── 📁 node_modules/            # Dependencias instaladas (ignorado en Git)
│   └── 📁 src/                     # Código fuente
│       ├── 📄 app.js               # Configuración de Express
│       ├── 📁 controllers/         # Lógica de negocio
│       │   └── health.controller.js
│       ├── 📁 routes/              # Rutas de la API
│       │   └── index.js
│       └── 📁 db/                  # Configuración de base de datos
│
└── 📁 frontend/                    # Aplicación React
    ├── 📄 package.json             # Dependencias del frontend
    ├── 📄 Dockerfile               # Imagen Docker del frontend
    ├── 📄 nginx.conf               # Configuración de Nginx
    ├── 📁 node_modules/            # Dependencias (NO incluir en Git)
    ├── 📁 build/                   # Build de producción (NO incluir en Git)
    ├── 📁 public/                  # Archivos estáticos
    │   └── index.html
    └── 📁 src/                     # Código fuente React
        ├── 📄 index.js             # Punto de entrada
        ├── 📄 index.css            # Estilos globales
        ├── 📄 App.js               # Componente principal
        ├── 📄 App.css              # Estilos del App
        ├── 📁 components/          # Componentes reutilizables
        ├── 📁 pages/               # Páginas de la aplicación
        ├── 📁 services/            # Servicios (llamadas API)
        └── 📁 assets/              # Recursos (imágenes, etc.)
```

## 📋 Archivos Clave

### 🔧 Configuración Docker

| Archivo | Descripción | Incluir en Git |
|---------|-------------|----------------|
| `docker-compose.yml` | Define los 3 servicios: db, api, frontend | ✅ Sí |
| `backend/Dockerfile` | Imagen del backend (Node.js 18) | ✅ Sí |
| `frontend/Dockerfile` | Imagen del frontend (React + Nginx) | ✅ Sí |
| `frontend/nginx.conf` | Configuración del servidor web | ✅ Sí |

### 📚 Documentación

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Guía completa de instalación y uso |
| `TRANSFER_CHECKLIST.md` | Checklist para transferir a otro servidor |
| `BACKUP.md` | Instrucciones de backup y restauración |
| `TUTORIAL_PROMPT.md` | Prompt para generar tutorial personalizado |
| `.env.example` | Ejemplo de variables de entorno |

### 🚀 Scripts de Despliegue

| Archivo | Plataforma | Uso |
|---------|------------|-----|
| `deploy.sh` | Linux/Mac | `chmod +x deploy.sh && ./deploy.sh` |
| `deploy.ps1` | Windows | `.\deploy.ps1` |

### 🔒 Control de Versiones

| Archivo | Descripción |
|---------|-------------|
| `.gitignore` | Excluye: node_modules, build, .env, logs |

## ✅ Archivos que SÍ se incluyen en Git

- ✅ Todo el código fuente (`src/`)
- ✅ Archivos de configuración (`package.json`, `Dockerfile`, etc.)
- ✅ Documentación (`.md` files)
- ✅ Scripts de despliegue (`.sh`, `.ps1`)
- ✅ `backend/package-lock.json` (para reproducibilidad)
- ✅ `.env.example` (ejemplo de configuración)
- ✅ `.gitignore`

## ❌ Archivos que NO se incluyen en Git

- ❌ `node_modules/` (se instalan con `npm install`)
- ❌ `build/` (se genera con `npm run build`)
- ❌ `.env` (contiene credenciales reales)
- ❌ `*.log` (archivos de log)
- ❌ `frontend/package-lock.json` (puede causar conflictos)
- ❌ Archivos temporales y cache

## 🐳 Servicios Docker

### 1. **db** - PostgreSQL 15
- **Puerto**: 5432
- **Volumen**: `db-data` (persistente)
- **Variables**: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB

### 2. **api** - Backend (Node.js/Express)
- **Puerto**: 3001
- **Volúmenes**: 
  - `./backend:/app` (código fuente)
  - `/app/node_modules` (dependencias protegidas)
- **Depende de**: db (espera health check)

### 3. **frontend** - Frontend (React/Nginx)
- **Puerto**: 80
- **Build**: Multi-stage (Node.js para build, Nginx para servir)
- **Depende de**: api

## 📦 Tamaños de Referencia

| Componente | Tamaño Aproximado |
|------------|-------------------|
| Proyecto sin node_modules | ~5-10 MB |
| backend/node_modules | ~50 MB |
| frontend/node_modules | ~300 MB (no incluir en Git) |
| Build del frontend | ~2 MB |
| Imágenes Docker completas | ~500 MB - 1 GB |

## 🚀 Métodos de Transferencia

### Opción 1: Git (Recomendado)
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Opción 2: Archivo Comprimido
```bash
# Linux/Mac
tar -czf intranet.tar.gz --exclude='node_modules' --exclude='build' .

# Windows
Compress-Archive -Path . -DestinationPath intranet.zip
```

### Opción 3: Imágenes Docker
```bash
docker save -o intranet-images.tar intranet-frontend intranet-api postgres:15-alpine
```

## 🎯 Despliegue en Servidor Destino

### Requisitos Mínimos
- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM
- 5GB espacio en disco
- Puertos 80 y 3001 disponibles

### Pasos Rápidos

1. **Transferir el proyecto** (Git, archivo comprimido, etc.)

2. **Ejecutar script de despliegue**
   ```bash
   # Linux/Mac
   chmod +x deploy.sh
   ./deploy.sh
   
   # Windows
   .\deploy.ps1
   ```

3. **Verificar**
   - Frontend: http://localhost
   - API: http://localhost:3001/health

## 📝 Notas Importantes

### Para Desarrollo
- El backend usa bind mount (`./backend:/app`) para desarrollo en tiempo real
- Los cambios en el código se reflejan automáticamente
- El volumen `/app/node_modules` protege las dependencias

### Para Producción
- Considera remover el bind mount del backend
- Usa variables de entorno seguras (archivo `.env`)
- Configura HTTPS con certificados SSL
- Implementa autenticación y autorización
- Configura backups automáticos

## 🔗 Enlaces Útiles

- **Documentación Principal**: Ver `README.md`
- **Checklist de Transferencia**: Ver `TRANSFER_CHECKLIST.md`
- **Backup y Restauración**: Ver `BACKUP.md`
- **Tutorial Personalizado**: Ver `TUTORIAL_PROMPT.md`

## 🆘 Soporte

Si encuentras problemas:

1. Revisa `TRANSFER_CHECKLIST.md` - Problemas Comunes
2. Verifica logs: `docker compose logs -f`
3. Consulta `README.md` - Troubleshooting

## ✅ Estado del Proyecto

- ✅ Código fuente completo
- ✅ Dockerfiles optimizados
- ✅ docker-compose.yml configurado
- ✅ Documentación completa
- ✅ Scripts de despliegue
- ✅ .gitignore configurado
- ✅ Guías de backup y transferencia
- ✅ Listo para producción

---

**Versión**: 0.1.0  
**Última actualización**: 2025-12-07  
**Estado**: ✅ Listo para transferir
