# 💾 Guía de Backup y Restauración

Esta guía te ayudará a hacer backup y restaurar tu sistema de intranet.

## 📦 Backup Completo del Proyecto

### Opción 1: Backup de Archivos (Recomendado)

Este método hace backup de todo el código fuente y configuración:

**En Windows PowerShell:**
```powershell
# Crear carpeta de backups
New-Item -ItemType Directory -Force -Path ".\backups"

# Comprimir el proyecto (excluye node_modules y build)
$date = Get-Date -Format "yyyy-MM-dd_HHmm"
Compress-Archive -Path @(
    ".\backend\src",
    ".\backend\package.json",
    ".\backend\Dockerfile",
    ".\backend\server.js",
    ".\frontend\src",
    ".\frontend\public",
    ".\frontend\package.json",
    ".\frontend\Dockerfile",
    ".\frontend\nginx.conf",
    ".\docker-compose.yml",
    ".\README.md",
    ".\.env.example",
    ".\.gitignore"
) -DestinationPath ".\backups\intranet-backup-$date.zip"

Write-Host "✅ Backup creado: backups\intranet-backup-$date.zip"
```

**En Linux/Mac:**
```bash
# Crear carpeta de backups
mkdir -p backups

# Comprimir el proyecto
DATE=$(date +%Y-%m-%d_%H%M)
tar -czf "backups/intranet-backup-$DATE.tar.gz" \
    --exclude='node_modules' \
    --exclude='build' \
    --exclude='.git' \
    backend/ frontend/ docker-compose.yml README.md .env.example .gitignore

echo "✅ Backup creado: backups/intranet-backup-$DATE.tar.gz"
```

**En Windows PowerShell (IMPORTANTE: Configurar UTF-8 primero):**
```powershell
# Configurar la consola para usar UTF-8 (Vital para evitar caracteres extraños ├│ ñ)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$date = Get-Date -Format "yyyy-MM-dd_HHmm"
# Usar 'docker compose exec -T' para evitar problemas de TTY en la redirección
docker compose exec -T db pg_dump -U user_intranet intranet_db > "backup-db-$date.sql"
```

### Opción 2: Backup de Base de Datos (Universal)
Para asegurar la codificación correcta en cualquier sistema:

```bash
# Backup comprimido (Recomendado)
docker compose exec -T db pg_dump -U user_intranet intranet_db | gzip > backup-db-$(date +%Y-%m-%d).sql.gz
```

### Opción 3: Backup del Volumen Docker

Para hacer backup del volumen completo de datos:

```bash
# Detener los servicios
docker compose down

# Hacer backup del volumen
docker run --rm \
  -v intranet_db-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/db-volume-backup-$(date +%Y-%m-%d).tar.gz -C /data .

# Reiniciar los servicios
docker compose up -d
```

**En Windows PowerShell:**
```powershell
# Detener los servicios
docker compose down

# Hacer backup del volumen
$date = Get-Date -Format "yyyy-MM-dd_HHmm"
docker run --rm `
  -v intranet_db-data:/data `
  -v ${PWD}/backups:/backup `
  alpine tar czf /backup/db-volume-backup-$date.tar.gz -C /data .

# Reiniciar los servicios
docker compose up -d
```

## 🔄 Restauración del Proyecto

### Restaurar desde Backup de Archivos

**En Windows PowerShell:**
```powershell
# Extraer el backup
Expand-Archive -Path ".\backups\intranet-backup-2025-12-07_1130.zip" -DestinationPath ".\intranet-restored"

# Ir a la carpeta restaurada
cd intranet-restored

# Desplegar
.\deploy.ps1
```

**En Linux/Mac:**
```bash
# Extraer el backup
tar -xzf backups/intranet-backup-2025-12-07_1130.tar.gz -C ./intranet-restored

# Ir a la carpeta restaurada
cd intranet-restored

# Desplegar
chmod +x deploy.sh
./deploy.sh
```

### Restaurar Base de Datos

**Desde archivo SQL:**
```bash
# Copiar el backup al contenedor
docker cp backup-db-2025-12-07.sql intranet-db-1:/tmp/

# Restaurar
docker exec -it intranet-db-1 psql -U user_intranet -d intranet_db -f /tmp/backup-db-2025-12-07.sql
```

**Desde archivo SQL comprimido:**
```bash
# Descomprimir y restaurar
gunzip < backup-db-2025-12-07.sql.gz | docker exec -i intranet-db-1 psql -U user_intranet -d intranet_db
```

**En Windows PowerShell:**
```powershell
# Copiar el backup al contenedor
docker cp backup-db-2025-12-07.sql intranet-db-1:/tmp/

# Restaurar
docker exec -it intranet-db-1 psql -U user_intranet -d intranet_db -f /tmp/backup-db-2025-12-07.sql
```

### Restaurar Volumen Docker

```bash
# Detener los servicios
docker compose down

# Eliminar el volumen existente
docker volume rm intranet_db-data

# Crear nuevo volumen
docker volume create intranet_db-data

# Restaurar desde backup
docker run --rm \
  -v intranet_db-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/db-volume-backup-2025-12-07.tar.gz -C /data

# Reiniciar los servicios
docker compose up -d
```

**En Windows PowerShell:**
```powershell
# Detener los servicios
docker compose down

# Eliminar el volumen existente
docker volume rm intranet_db-data

# Crear nuevo volumen
docker volume create intranet_db-data

# Restaurar desde backup
docker run --rm `
  -v intranet_db-data:/data `
  -v ${PWD}/backups:/backup `
  alpine tar xzf /backup/db-volume-backup-2025-12-07.tar.gz -C /data

# Reiniciar los servicios
docker compose up -d
```

## 📋 Checklist de Backup Regular

Para mantener tu sistema seguro, se recomienda:

- [ ] **Diario**: Backup de la base de datos
- [ ] **Semanal**: Backup completo del proyecto
- [ ] **Mensual**: Backup del volumen Docker
- [ ] **Antes de cambios importantes**: Backup completo

## 🔐 Mejores Prácticas

1. **Automatiza los backups**: Usa cron (Linux) o Task Scheduler (Windows)
2. **Almacena en múltiples ubicaciones**: Local, nube, servidor remoto
3. **Prueba las restauraciones**: Verifica que los backups funcionen
4. **Encripta backups sensibles**: Usa GPG o herramientas similares
5. **Documenta el proceso**: Mantén esta guía actualizada

## 🚨 Recuperación de Desastres

Si pierdes todo y solo tienes el backup:

1. Instala Docker y Docker Compose
2. Extrae el backup del proyecto
3. Ejecuta el script de despliegue
4. Restaura la base de datos desde el backup
5. Verifica que todo funcione correctamente

## 📝 Script de Backup Automatizado

**Para Linux/Mac (agregar a crontab):**
```bash
#!/bin/bash
# backup-auto.sh

BACKUP_DIR="/ruta/a/backups"
DATE=$(date +%Y-%m-%d_%H%M)

# Backup de base de datos
docker exec intranet-db-1 pg_dump -U user_intranet intranet_db | gzip > "$BACKUP_DIR/db-$DATE.sql.gz"

# Limpiar backups antiguos (más de 30 días)
find $BACKUP_DIR -name "db-*.sql.gz" -mtime +30 -delete

echo "✅ Backup completado: $DATE"
```

**Para Windows (Task Scheduler):**
```powershell
# backup-auto.ps1

$BackupDir = "C:\backups\intranet"
$Date = Get-Date -Format "yyyy-MM-dd_HHmm"

# Crear directorio si no existe
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

# Backup de base de datos
docker exec intranet-db-1 pg_dump -U user_intranet intranet_db > "$BackupDir\db-$Date.sql"

# Comprimir
Compress-Archive -Path "$BackupDir\db-$Date.sql" -DestinationPath "$BackupDir\db-$Date.zip"
Remove-Item "$BackupDir\db-$Date.sql"

# Limpiar backups antiguos (más de 30 días)
Get-ChildItem -Path $BackupDir -Filter "db-*.zip" | 
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } | 
    Remove-Item

Write-Host "✅ Backup completado: $Date"
```

## 🔗 Recursos Adicionales

- [Documentación de pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
- [Docker Volumes Backup](https://docs.docker.com/storage/volumes/#back-up-restore-or-migrate-data-volumes)
- [Cron Tutorial](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/)
- [Windows Task Scheduler](https://docs.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page)

---

**Última actualización**: 2025-12-07
