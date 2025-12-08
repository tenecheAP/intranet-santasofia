# 📱 Guía de Configuración de Aplicativos

Esta guía te ayudará a agregar y configurar los enlaces de tus aplicativos externos en la intranet.

---

## 📋 Aplicativos Configurados

Los siguientes aplicativos están listos para configurar:

1. ✅ **Actas nacimiento/defunción** - Registros Civiles
2. ✅ **Almera** - Gestión
3. ✅ **Gestión de Conocimiento** - Gestión
4. ✅ **Hosvital** - Sistemas Médicos
5. ✅ **Mesa de Ayuda** - Soporte
6. ✅ **Normas Clínicas** - Documentación
7. ✅ **Ruta de la Acreditación** - Calidad
8. ✅ **Seguridad del Paciente** - Calidad
9. ✅ **Sevenet** - Calidad
10. ✅ **Software Web** - Sistemas
11. ✅ **Ssofthia Wiki** - Documentación

---

## 🔧 Cómo Agregar los Enlaces (URLs)

### Paso 1: Abrir el Archivo de Configuración

Abre el archivo: `frontend/src/data/aplicativos.js`

### Paso 2: Agregar las URLs

Busca cada aplicativo y agrega su URL en el campo `url`:

```javascript
{
  id: 'hosvital',
  nombre: 'Hosvital',
  descripcion: 'Sistema de información hospitalaria',
  url: 'https://hosvital.tudominio.com',  // ← Agrega la URL aquí
  categoria: 'Sistemas Médicos',
  icono: '🏥',
  activo: true
}
```

### Paso 3: Ejemplo Completo

```javascript
export const aplicativos = [
  {
    id: 'actas-nacimiento',
    nombre: 'Actas nacimiento/defunción',
    descripcion: 'Sistema de registro y consulta de actas de nacimiento y defunción',
    url: 'http://192.168.1.100/actas',  // URL interna
    categoria: 'Registros Civiles',
    icono: '📋',
    activo: true
  },
  {
    id: 'hosvital',
    nombre: 'Hosvital',
    descripcion: 'Sistema de información hospitalaria',
    url: 'https://hosvital.hospital.com',  // URL externa
    categoria: 'Sistemas Médicos',
    icono: '🏥',
    activo: true
  },
  // ... resto de aplicativos
];
```

---

## 🎨 Personalización

### Cambiar el Icono

Puedes cambiar el emoji/icono de cada aplicativo:

```javascript
icono: '🏥',  // Hospital
icono: '📚',  // Libro (conocimiento)
icono: '🎫',  // Ticket (soporte)
icono: '📋',  // Clipboard (documentos)
icono: '🛡️',  // Escudo (seguridad)
```

**Emojis sugeridos:**
- 🏥 Hospital
- 📚 Biblioteca/Conocimiento
- 📋 Documentos
- 🎫 Tickets/Soporte
- 🛡️ Seguridad
- ⚠️ Alertas/Eventos
- 🌐 Web
- 📝 Wiki/Notas
- 📦 Almacén
- 🎯 Objetivos/Metas

### Cambiar la Categoría

Puedes organizar los aplicativos en diferentes categorías:

```javascript
categoria: 'Sistemas Médicos',
categoria: 'Gestión',
categoria: 'Calidad',
categoria: 'Documentación',
categoria: 'Soporte',
categoria: 'Registros Civiles',
```

### Desactivar un Aplicativo

Si un aplicativo no está disponible temporalmente:

```javascript
activo: false,  // No se mostrará en la lista
```

---

## 📝 Agregar Nuevos Aplicativos

Para agregar un nuevo aplicativo, agrega un objeto al array:

```javascript
export const aplicativos = [
  // ... aplicativos existentes
  
  {
    id: 'nuevo-sistema',  // ID único (sin espacios, minúsculas)
    nombre: 'Nombre del Sistema',
    descripcion: 'Descripción breve del sistema',
    url: 'https://sistema.ejemplo.com',
    categoria: 'Categoría Apropiada',
    icono: '🆕',
    activo: true
  }
];
```

---

## 🔗 Tipos de URLs Soportadas

### URLs Internas (Red Local)
```javascript
url: 'http://192.168.1.100/sistema'
url: 'http://servidor-interno/aplicativo'
```

### URLs Externas (Internet)
```javascript
url: 'https://sistema.ejemplo.com'
url: 'https://app.proveedor.com/login'
```

### URLs con Puerto Específico
```javascript
url: 'http://192.168.1.50:8080/app'
url: 'https://servidor.local:3000'
```

---

## 🚀 Aplicar los Cambios

### Opción 1: Desarrollo Local

Si estás en desarrollo local:

```bash
# Los cambios se aplicarán automáticamente
# Solo guarda el archivo y recarga el navegador
```

### Opción 2: Producción (Docker)

Si ya está desplegado en Docker:

```bash
# Reconstruir el frontend
docker compose up -d --build frontend

# O reiniciar todo
docker compose down
docker compose up -d --build
```

---

## 📊 Estructura de Categorías Actual

Las categorías actuales son:

1. **Calidad** (3 aplicativos)
   - Ruta de la Acreditación
   - Seguridad del Paciente
   - Sevenet

2. **Documentación** (2 aplicativos)
   - Normas Clínicas
   - Ssofthia Wiki

3. **Gestión** (2 aplicativos)
   - Almera
   - Gestión de Conocimiento

4. **Registros Civiles** (1 aplicativo)
   - Actas nacimiento/defunción

5. **Sistemas** (1 aplicativo)
   - Software Web

6. **Sistemas Médicos** (1 aplicativo)
   - Hosvital

7. **Soporte** (1 aplicativo)
   - Mesa de Ayuda

---

## ✅ Checklist de Configuración

- [ ] Abrir `frontend/src/data/aplicativos.js`
- [ ] Agregar URL de **Actas nacimiento/defunción**
- [ ] Agregar URL de **Almera**
- [ ] Agregar URL de **Gestión de Conocimiento**
- [ ] Agregar URL de **Hosvital**
- [ ] Agregar URL de **Mesa de Ayuda**
- [ ] Agregar URL de **Normas Clínicas**
- [ ] Agregar URL de **Ruta de la Acreditación**
- [ ] Agregar URL de **Seguridad del Paciente**
- [ ] Agregar URL de **Sevenet**
- [ ] Agregar URL de **Software Web**
- [ ] Agregar URL de **Ssofthia Wiki**
- [ ] Guardar el archivo
- [ ] Reconstruir el frontend (si es necesario)
- [ ] Probar cada enlace

---

## 🎯 Ejemplo Completo de Configuración

```javascript
// frontend/src/data/aplicativos.js

export const aplicativos = [
  {
    id: 'hosvital',
    nombre: 'Hosvital',
    descripcion: 'Sistema de información hospitalaria',
    url: 'http://192.168.1.50/hosvital',  // ← URL configurada
    categoria: 'Sistemas Médicos',
    icono: '🏥',
    activo: true
  },
  {
    id: 'mesa-ayuda',
    nombre: 'Mesa de Ayuda',
    descripcion: 'Sistema de tickets y soporte técnico',
    url: 'https://soporte.hospital.com',  // ← URL configurada
    categoria: 'Soporte',
    icono: '🎫',
    activo: true
  },
  // ... resto de aplicativos
];
```

---

## 🔍 Verificación

### Probar en el Navegador

1. Accede a: `http://localhost/aplicativos`
2. Verifica que aparezcan todos los aplicativos
3. Haz clic en cada tarjeta para probar el enlace
4. Si un enlace no está configurado, aparecerá un mensaje de alerta

### Búsqueda y Filtros

- **Búsqueda**: Escribe en el campo de búsqueda para filtrar
- **Categorías**: Haz clic en los botones de categoría para filtrar
- **Todas**: Muestra todos los aplicativos activos

---

## 🆘 Solución de Problemas

### Problema: El aplicativo no aparece

**Solución:**
- Verifica que `activo: true`
- Revisa que no haya errores de sintaxis en el archivo
- Recarga la página con Ctrl + F5

### Problema: El enlace no funciona

**Solución:**
- Verifica que la URL sea correcta
- Asegúrate de incluir `http://` o `https://`
- Prueba la URL directamente en el navegador

### Problema: Los cambios no se ven

**Solución:**
```bash
# Reconstruir el frontend
docker compose up -d --build frontend

# O limpiar caché del navegador
Ctrl + Shift + Delete
```

---

## 📞 Soporte

Para más información:
- Consulta `README.md` para comandos de Docker
- Revisa `DEPLOY_GITHUB_TO_SERVER.md` para despliegue
- Verifica logs: `docker compose logs frontend`

---

**Última actualización**: 2025-12-07  
**Archivo de configuración**: `frontend/src/data/aplicativos.js`
