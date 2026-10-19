# ✅ Checklist de Clonación y Despliegue

## 📋 Requisitos Previos

### En la máquina de destino:

- [ ] Docker Desktop instalado y funcionando
- [ ] Git instalado
- [ ] Acceso a internet (para clonar el repositorio)
- [ ] Puerto 80 disponible (para el frontend)
- [ ] Puerto 3001 disponible (para el backend API)
- [ ] Puerto 5432 disponible (para PostgreSQL)

---

## 🔄 Proceso de Clonación

### Paso 1: Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/[tu-usuario]/intranet-santasofia.git

# Entrar a la carpeta del proyecto
cd intranet-santasofia
```

**Verificación:**
- [ ] La carpeta `backend` existe
- [ ] La carpeta `frontend` existe
- [ ] El archivo `docker-compose.yml` existe

---

### Paso 2: Copiar Archivos No Incluidos en GitHub

#### A) Base de Datos (si quieres migrar datos existentes)

**En la máquina original:**
```bash
# Hacer backup de la base de datos
docker exec intranet-db-1 pg_dump -U user_intranet intranet_db > backup.sql
```

**Copiar el archivo `backup.sql` a la máquina nueva** (USB, red, etc.)

- [ ] Archivo `backup.sql` copiado a la máquina nueva

---

#### B) Archivos Subidos por Usuarios (si existen)

**Carpetas a copiar:**

1. **Imágenes de sliders/noticias:**
   ```
   backend/uploads/
   ```
   - [ ] Carpeta `backend/uploads/` copiada (si existe)

2. **Documentos locales:**
   ```
   frontend/public/documentos/
   ```
   - [ ] Carpeta `frontend/public/documentos/` copiada (si existe)

**Nota:** Si no tienes archivos subidos, puedes omitir este paso.

---

### Paso 3: Iniciar los Servicios Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Esperar a que los servicios estén listos (30-60 segundos)
```

**Verificación:**
```bash
# Ver el estado de los contenedores
docker-compose ps
```

**Deberías ver:**
- [ ] `intranet-db-1` - Estado: `Up` (healthy)
- [ ] `intranet-api-1` - Estado: `Up`
- [ ] `intranet-frontend-1` - Estado: `Up`

---

### Paso 4: Restaurar Base de Datos (Opcional)

**Solo si copiaste el archivo `backup.sql` en el Paso 2A:**

```bash
# Restaurar la base de datos
docker exec -i intranet-db-1 psql -U user_intranet intranet_db < backup.sql
```

- [ ] Base de datos restaurada exitosamente

**Verificar datos:**
```bash
# Ver cuántos registros hay en cada tabla
docker exec intranet-db-1 psql -U user_intranet -d intranet_db -c "SELECT 'directorio' as tabla, COUNT(*) FROM directorio UNION ALL SELECT 'documentos', COUNT(*) FROM documentos UNION ALL SELECT 'noticias', COUNT(*) FROM noticias;"
```

---

### Paso 5: Verificar Funcionamiento

#### A) Verificar Frontend

1. Abrir navegador en: `http://localhost`

**Verificar:**
- [ ] La página principal carga correctamente
- [ ] El header y menú se muestran
- [ ] No hay errores en la consola del navegador (F12)

---

#### B) Verificar Backend API

```bash
# Probar endpoint de salud
curl http://localhost:3001/health
```

**Debería responder:**
```json
{"status":"ok"}
```

- [ ] API responde correctamente

---

#### C) Verificar Base de Datos

```bash
# Conectarse a la base de datos
docker exec -it intranet-db-1 psql -U user_intranet -d intranet_db

# Dentro de PostgreSQL, ejecutar:
\dt  # Ver tablas
\q   # Salir
```

**Verificar:**
- [ ] Tablas creadas: `usuarios`, `documentos`, `directorio`, `noticias`, `anuncios`

---

### Paso 6: Probar Funcionalidades Principales

#### A) Directorio Telefónico

1. Ir a: `http://localhost/directorio`

**Verificar:**
- [ ] Se muestran las extensiones telefónicas
- [ ] La búsqueda funciona
- [ ] Se pueden copiar extensiones al hacer clic

---

#### B) Gestión Documental

1. Ir a: `http://localhost/documental`

**Verificar:**
- [ ] Se muestran los documentos (si restauraste la BD)
- [ ] Se pueden filtrar por categoría
- [ ] La búsqueda funciona

---

#### C) Noticias

1. Ir a: `http://localhost/noticias`

**Verificar:**
- [ ] Se muestran las noticias (si restauraste la BD)
- [ ] Se puede hacer clic en una noticia para ver el detalle

---

#### D) Administración (si eres admin)

1. Ir a: `http://localhost/admin/directorio`

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

**Verificar:**
- [ ] Puedes iniciar sesión
- [ ] Puedes agregar/editar/eliminar extensiones
- [ ] Puedes agregar/editar/eliminar documentos
- [ ] Puedes agregar/editar/eliminar noticias

---

## 🔧 Solución de Problemas

### Problema: Los contenedores no inician

```bash
# Ver logs de los contenedores
docker-compose logs

# Ver logs de un contenedor específico
docker-compose logs frontend
docker-compose logs api
docker-compose logs db
```

---

### Problema: Error de conexión a la base de datos

```bash
# Verificar que la base de datos esté saludable
docker-compose ps

# Reiniciar la base de datos
docker-compose restart db

# Esperar 10 segundos y reiniciar el backend
docker-compose restart api
```

---

### Problema: Puerto 80 ya está en uso

**Opción 1: Cambiar el puerto del frontend**

Editar `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "8080:3000"  # Cambiar 80 por 8080
```

Luego acceder a: `http://localhost:8080`

**Opción 2: Detener el servicio que usa el puerto 80**
```bash
# En Windows, ver qué usa el puerto 80
netstat -ano | findstr :80

# Detener el proceso (reemplaza PID con el número que te dio el comando anterior)
taskkill /PID [PID] /F
```

---

### Problema: No se muestran los documentos/noticias

**Causa:** No restauraste la base de datos o está vacía.

**Solución:**
1. Restaurar el backup (Paso 4)
2. O agregar contenido manualmente desde el panel de administración

---

## 📊 Verificación Final

### Checklist de Verificación Completa:

- [ ] Todos los contenedores están corriendo (`docker-compose ps`)
- [ ] Frontend accesible en `http://localhost`
- [ ] Backend API responde en `http://localhost:3001/health`
- [ ] Base de datos tiene las tablas necesarias
- [ ] Directorio telefónico funciona
- [ ] Gestión documental funciona
- [ ] Noticias funcionan
- [ ] Panel de administración accesible (si eres admin)
- [ ] No hay errores en los logs (`docker-compose logs`)

---

## 🎉 ¡Despliegue Exitoso!

Si todos los checks están marcados, la intranet está funcionando correctamente en la nueva máquina.

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs`
2. Verifica la documentación en `README.md`
3. Consulta `PROJECT_STRUCTURE.md` para entender la arquitectura

---

## 🔄 Actualizaciones Futuras

Para actualizar el código en el futuro:

```bash
# Detener los servicios
docker-compose down

# Actualizar el código desde GitHub
git pull origin main

# Reiniciar los servicios
docker-compose up -d --build
```

**Nota:** Si hay cambios en la base de datos (nuevas tablas/columnas), puede que necesites ejecutar migraciones adicionales.

---

**Fecha de creación:** 2025-12-12  
**Versión:** 1.0
