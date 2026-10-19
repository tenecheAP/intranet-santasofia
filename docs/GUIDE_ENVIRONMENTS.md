# Guía de Ambientes: Desarrollo vs. Producción

Este proyecto está configurado para trabajar en dos ambientes distintos: **Desarrollo** y **Producción**. Aquí te explicamos cómo funcionan y cómo cambiar entre ellos.

## 1. Ambiente de Desarrollo (Development)

**Objetivo:** Para programar y ver cambios en tiempo real.
- **Frontend:** Usa `react-scripts start` (hot-reloading). Si cambias un archivo, el navegador se actualiza solo.
- **Backend:** Usa `nodemon` (o similar) y monta el código como volumen. Reinicia el servidor al detectar cambios.
- **Archivo de configuración:** `docker-compose.yml`

**Cómo iniciar en Desarrollo:**
```powershell
docker compose -f docker-compose.yml up --build
```
> Nota: El script `deploy.ps1` actual usa esta configuración por defecto.

---

## 2. Ambiente de Producción (Production)

**Objetivo:** Para el servidor final. Rápido, seguro y optimizado.
- **Frontend:** Se compila (`npm run build`) a archivos estáticos (HTML/CSS/JS) y se sirve con **Nginx**. Es mucho más rápido pero no detecta cambios en vivo.
- **Backend:** Se ejecuta en modo optimizado, sin herramientas de desarrollo instaladas.
- **Archivo de configuración:** `docker-compose.prod.yml`

**Cómo iniciar en Producción:**
```powershell
# 1. Detener contenedores antiguos
docker compose down

# 2. Iniciar usando el archivo de producción
docker compose -f docker-compose.prod.yml up --build -d
```

## Resumen de Comandos

| Acción | Comando |
|--------|---------|
| **Iniciar Desarrollo** | `docker compose -f docker-compose.yml up --build` |
| **Iniciar Producción** | `docker compose -f docker-compose.prod.yml up --build -d` |
| **Detener Todo** | `docker compose down` |

### ¿Cómo saber si estoy en Producción?
- Si abres las herramientas de desarrollador en el navegador (F12) y ves que los archivos JS están minificados/ilegibles, estás en Producción.
- Si ves el icono de React Developer Tools gris o indicando "Production build", estás en Producción.
- Si los cambios en el código NO se reflejan automáticamente, estás en Producción.
