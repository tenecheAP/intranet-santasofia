# 📁 Gestión de Documentos - Guía de Uso

## Estructura de Carpetas

Los documentos de la intranet se organizan en las siguientes carpetas:

```
frontend/public/documentos/
├── calidad/              → Documentos de Gestión de Calidad
├── talento-humano/       → Documentos de Talento Humano
├── juridica/             → Documentos Jurídicos
└── contratacion/         → Documentos de Contratación
```

## 📝 Cómo Agregar un Documento

### Paso 1: Guardar el Archivo
Copia tu archivo (PDF, Word, Excel, etc.) en la carpeta correspondiente.

**Ejemplo:**
- Si tienes un "Manual de Calidad.pdf", guárdalo en:
  `frontend/public/documentos/calidad/Manual de Calidad.pdf`

### Paso 2: Registrar en la Intranet
1. Inicia sesión como administrador (usuario: `admin`, contraseña: `Isabella`)
2. Ve a **Gestión Documental**
3. Haz clic en **"Agregar Documento"**
4. Completa el formulario:
   - **Título**: Manual de Calidad 2024
   - **URL**: `/documentos/calidad/Manual de Calidad.pdf`
   - **Categoría**: Gestión de Calidad
   - **Tipo**: PDF
5. Haz clic en **"Guardar Documento"**

## 🌐 Formatos de URL

### Archivos Locales (en el servidor)
```
/documentos/calidad/manual.pdf
/documentos/talento-humano/reglamento.docx
```

### Archivos en Google Drive
```
https://drive.google.com/file/d/1ABC123XYZ/view
```

### Archivos en OneDrive
```
https://onedrive.live.com/embed?cid=ABC123&resid=XYZ
```

### Archivos en otro servidor
```
https://ejemplo.com/archivos/documento.pdf
```

## ⚠️ Notas Importantes

1. **Nombres de Archivo**: Evita espacios y caracteres especiales. Usa guiones:
   - ✅ `manual-de-calidad-2024.pdf`
   - ❌ `Manual de Calidad 2024.pdf`

2. **Tamaño de Archivos**: Para archivos muy grandes (>10MB), considera usar Google Drive u otro servicio en la nube.

3. **Seguridad**: Los archivos en `public/documentos/` son accesibles públicamente. Si necesitas documentos privados, considera implementar un backend con autenticación.

4. **Backup**: Haz copias de seguridad regulares de la carpeta `documentos/`.

## 🔄 Migración a Producción

Cuando despliegues la intranet en un servidor:

1. Copia la carpeta `documentos/` al servidor
2. O configura un servicio de almacenamiento en la nube
3. Actualiza las URLs en la base de datos (localStorage) según corresponda

## 📞 Soporte

Para más información sobre cómo configurar un backend con base de datos real, consulta la documentación del proyecto.
