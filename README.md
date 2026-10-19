# 🏢 Sistema de Intranet

Sistema web de intranet corporativa construido con React, Node.js, Express y PostgreSQL, completamente dockerizado.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker**: versión 20.10 o superior
- **Docker Compose**: versión 2.0 o superior
- **Git** (opcional, para clonar el repositorio)

### Verificar instalación:
```bash
docker --version
docker compose version
```

## 🏗️ Arquitectura del Proyecto

```
intranet/
├── frontend/              # Aplicación React
│   ├── src/              # Código fuente React
│   ├── public/           # Archivos estáticos
│   ├── Dockerfile        # Imagen Docker del frontend
│   ├── nginx.conf        # Configuración de Nginx
│   └── package.json      # Dependencias de React
│
├── backend/              # API REST con Express
│   ├── src/              # Código fuente del API
│   │   ├── controllers/  # Controladores
│   │   ├── routes/       # Rutas de la API
│   │   └── db/           # Configuración de base de datos
│   ├── server.js         # Punto de entrada
│   ├── Dockerfile        # Imagen Docker del backend
│   └── package.json      # Dependencias de Node.js
│
├── docker-compose.yml    # Orquestación de servicios
├── .gitignore           # Archivos a ignorar en Git
└── README.md            # Este archivo
```

## 🚀 Instalación y Despliegue

### Opción 1: Despliegue Rápido (Recomendado)

1. **Clonar o copiar el proyecto**
   ```bash
   # Si usas Git:
   git clone <url-del-repositorio>
   cd intranet
   
   # O simplemente copia toda la carpeta del proyecto
   ```

2. **Construir e iniciar los contenedores**
   ```bash
   docker compose up -d --build
   ```

3. **Verificar que todo esté corriendo**
   ```bash
   docker compose ps
   ```

4. **Acceder a la aplicación**
   - Frontend: http://localhost
   - API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### Opción 2: Despliegue Paso a Paso

1. **Instalar dependencias locales del backend** (necesario para desarrollo)
   ```bash
   cd backend
   npm install
   cd ..
   ```

2. **Construir las imágenes Docker**
   ```bash
   docker compose build --no-cache
   ```

3. **Iniciar los servicios**
   ```bash
   docker compose up -d
   ```

4. **Ver los logs**
   ```bash
   docker compose logs -f
   ```

## 🔧 Configuración

### Variables de Entorno

El proyecto usa las siguientes variables de entorno configuradas en `docker-compose.yml`:

**Base de Datos (PostgreSQL):**
- `POSTGRES_USER`: user_intranet
- `POSTGRES_PASSWORD`: strong_password
- `POSTGRES_DB`: intranet_db

**Backend (API):**
- `NODE_ENV`: development
- `DB_HOST`: db
- `DB_PORT`: 5432
- `DB_USER`: user_intranet
- `DB_PASSWORD`: strong_password
- `DB_NAME`: intranet_db

### Cambiar Configuración

Para cambiar las credenciales de la base de datos u otras configuraciones:

1. Edita el archivo `docker-compose.yml`
2. Reconstruye los contenedores:
   ```bash
   docker compose down
   docker compose up -d --build
   ```

## 📦 Servicios Docker

El proyecto incluye 3 servicios:

### 1. **db** - Base de Datos PostgreSQL
- **Imagen**: postgres:15-alpine
- **Puerto**: 5432
- **Volumen**: db-data (persistencia de datos)

### 2. **api** - Backend API (Node.js/Express)
- **Puerto**: 3001
- **Dependencias**: Espera a que `db` esté saludable
- **Volúmenes**: 
  - `./backend:/app` (código fuente)
  - `/app/node_modules` (dependencias)

### 3. **frontend** - Frontend (React/Nginx)
- **Puerto**: 80
- **Dependencias**: Espera a que `api` esté lista

## 🛠️ Comandos Útiles

### Gestión de Contenedores

```bash
# Iniciar todos los servicios
docker compose up -d

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (¡CUIDADO! Borra datos de la BD)
docker compose down -v

# Reiniciar un servicio específico
docker compose restart api
docker compose restart frontend
docker compose restart db

# Ver estado de los servicios
docker compose ps

# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f api
docker compose logs -f frontend
docker compose logs -f db
```

### Reconstruir Imágenes

```bash
# Reconstruir todas las imágenes
docker compose build --no-cache

# Reconstruir una imagen específica
docker compose build --no-cache api
docker compose build --no-cache frontend

# Reconstruir e iniciar
docker compose up -d --build
```

### Acceder a los Contenedores

```bash
# Acceder al contenedor del backend
docker exec -it intranet-api-1 sh

# Acceder al contenedor de la base de datos
docker exec -it intranet-db-1 sh

# Ejecutar comandos en PostgreSQL
docker exec -it intranet-db-1 psql -U user_intranet -d intranet_db
```

### Limpieza

```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no usadas
docker image prune

# Eliminar todo (contenedores, imágenes, volúmenes)
docker system prune -a --volumes
```

## 🔍 Troubleshooting

### Problema: El backend no se conecta a la base de datos

**Solución:**
```bash
# Verificar que la BD esté saludable
docker compose ps

# Ver logs de la base de datos
docker compose logs db

# Reiniciar servicios
docker compose restart db
docker compose restart api
```

### Problema: Error "Cannot find module"

**Solución:**
```bash
# Instalar dependencias localmente
cd backend
npm install
cd ..

# Reiniciar el contenedor
docker compose restart api
```

### Problema: Puerto 80 ya está en uso

**Solución:**
```bash
# Opción 1: Detener el servicio que usa el puerto 80
# En Windows, puede ser IIS o Apache

# Opción 2: Cambiar el puerto en docker-compose.yml
# Edita la línea del frontend:
# ports:
#   - "8080:80"  # Cambia 80 por 8080 u otro puerto disponible
```

### Problema: Los cambios en el código no se reflejan

**Solución:**
```bash
# Para el backend (con volumen de desarrollo):
docker compose restart api

# Para el frontend (necesita rebuild):
docker compose up -d --build frontend
```

## 📤 Transferir a Otro Servidor

### Método 1: Usando Git (Recomendado)

1. **En el servidor origen:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **En el servidor destino:**
   ```bash
   git clone <url-del-repositorio>
   cd intranet
   docker compose up -d --build
   ```

### Método 2: Transferencia Manual

1. **Comprimir el proyecto** (excluye node_modules y build):
   ```bash
   # En Windows PowerShell:
   Compress-Archive -Path .\* -DestinationPath intranet.zip -Exclude node_modules,build
   ```

2. **Transferir el archivo** al servidor destino (FTP, SCP, etc.)

3. **En el servidor destino:**
   ```bash
   unzip intranet.zip
   cd intranet
   docker compose up -d --build
   ```

### Método 3: Exportar Imágenes Docker

1. **Guardar las imágenes:**
   ```bash
   docker save -o intranet-images.tar intranet-frontend intranet-api postgres:15-alpine
   ```

2. **Transferir el archivo .tar** al servidor destino

3. **En el servidor destino:**
   ```bash
   docker load -i intranet-images.tar
   docker compose up -d
   ```

### 🎯 Método 4: GitHub → PC Trabajo → Servidor (Recomendado para Entornos Corporativos)

Si necesitas desplegar desde GitHub a un servidor sin acceso directo a internet:

1. **Sube el proyecto a GitHub** desde tu PC personal
2. **Descarga en tu PC del trabajo** usando Git o GitHub Desktop
3. **Prepara el paquete de transferencia:**
   ```powershell
   .\preparar-transferencia.ps1
   ```
4. **Transfiere por USB o red interna** al servidor
5. **Despliega en el servidor:**
   ```powershell
   .\deploy.ps1
   ```

📖 **Para instrucciones detalladas paso a paso, consulta: `DEPLOY_GITHUB_TO_SERVER.md`**

## 🔐 Seguridad

### Para Producción:

1. **Cambiar credenciales de la base de datos**
2. **Usar variables de entorno** en lugar de valores hardcodeados
3. **Configurar HTTPS** con certificados SSL
4. **Limitar acceso a puertos** (usar firewall)
5. **Actualizar dependencias** regularmente

## 📝 Notas Importantes

- **Persistencia de Datos**: Los datos de PostgreSQL se guardan en el volumen `db-data`
- **Desarrollo**: El backend usa bind mount para desarrollo en tiempo real
- **Producción**: Para producción, considera usar imágenes optimizadas sin bind mounts
- **Backup**: Haz backup regular del volumen `db-data`

## 🆘 Soporte

Para más información sobre el proyecto, consulta:

### 📚 Guías de Documentación
- **`README.md`** - Este archivo (guía principal)
- **`DEPLOY_GITHUB_TO_SERVER.md`** - Despliegue desde GitHub al servidor
- **`TRANSFER_CHECKLIST.md`** - Checklist completo de transferencia
- **`BACKUP.md`** - Guía de backup y restauración
- **`PROJECT_STRUCTURE.md`** - Estructura detallada del proyecto
- **`TUTORIAL_PROMPT.md`** - Generar tutorial personalizado con IA

### 🔧 Scripts Útiles
- **`deploy.ps1`** / **`deploy.sh`** - Scripts de despliegue automatizado
- **`preparar-transferencia.ps1`** - Preparar paquete para transferir

### 🐳 Recursos Docker
- Logs de Docker: `docker compose logs -f`
- Documentación de Docker: https://docs.docker.com

## 📄 Licencia

[Especifica tu licencia aquí]

---

**Versión**: 0.1.0  
**Última actualización**: 2025-12-07
