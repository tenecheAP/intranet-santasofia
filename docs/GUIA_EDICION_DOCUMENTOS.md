# 📝 Guía de Edición de Documentos - Administrador

## ✅ Funcionalidad Implementada

Como administrador, puedes **editar cualquier documento** incluyendo cambiar su URL/path.

## 🎯 Cómo Editar un Documento

### Paso 1: Iniciar Sesión
1. Haz clic en **"Iniciar Sesión de Admin"** en la esquina superior derecha
2. Ingresa las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `Isabella`

### Paso 2: Ir a Gestión Documental
1. En el menú principal, haz clic en **"Documental"**
2. Verás todos los documentos listados

### Paso 3: Editar un Documento
1. **Localiza el documento** que quieres editar
2. En la esquina superior derecha de cada tarjeta de documento verás **dos botones**:
   - 🔵 **Botón Azul (Lápiz)** = Editar
   - 🔴 **Botón Rojo (Papelera)** = Eliminar

3. **Haz clic en el botón azul de editar** (ícono de lápiz)

### Paso 4: Modificar los Datos
Se abrirá el modal con el título **"Editar Documento"** y verás todos los campos prellenados:

- **Título del Documento**: Puedes cambiar el nombre
- **URL del Documento**: ⭐ **AQUÍ CAMBIAS EL PATH**
- **Categoría**: Puedes mover el documento a otra categoría
- **Tipo de Archivo**: Puedes cambiar el tipo (PDF, DOCX, etc.)

### Paso 5: Guardar Cambios
1. Modifica los campos que necesites (especialmente la URL)
2. Haz clic en **"Actualizar Documento"**
3. Verás un mensaje: "Documento actualizado correctamente"

## 📋 Ejemplo Práctico: Cambiar el Path

### Situación:
Tienes un documento con esta URL:
```
/documentos/calidad/manual-viejo.pdf
```

Y quieres cambiarlo a:
```
/documentos/calidad/manual-nuevo-2024.pdf
```

### Pasos:
1. Haz clic en el **botón de editar** (lápiz azul) del documento
2. En el campo **"URL del Documento"**, borra el texto actual
3. Escribe la nueva URL: `/documentos/calidad/manual-nuevo-2024.pdf`
4. Haz clic en **"Actualizar Documento"**
5. ✅ ¡Listo! El documento ahora apunta al nuevo archivo

## 🔄 Otras Ediciones Posibles

### Cambiar de Categoría
Si un documento está en "Gestión de Calidad" y quieres moverlo a "Talento Humano":
1. Edita el documento
2. Cambia el campo **"Categoría"** a "Talento Humano"
3. Guarda

### Cambiar el Tipo de Archivo
Si subiste un archivo como PDF pero era un Word:
1. Edita el documento
2. Cambia **"Tipo de Archivo"** de PDF a DOCX
3. Guarda

### Actualizar la Fecha
La fecha se actualiza automáticamente, pero puedes cambiarla manualmente si es necesario.

## ❌ Cancelar Edición

Si abres el modal de edición pero no quieres hacer cambios:
- Haz clic en el botón **"Cancelar"** (gris)
- O haz clic en la **X** en la esquina superior derecha
- Los cambios NO se guardarán

## 🗑️ Eliminar un Documento

Si quieres eliminar un documento completamente:
1. Haz clic en el **botón rojo** (papelera)
2. Confirma la eliminación en el mensaje que aparece
3. El documento se eliminará permanentemente

## 💾 Persistencia de Datos

Todos los cambios se guardan automáticamente en el navegador (localStorage), por lo que:
- ✅ Los cambios persisten al recargar la página
- ✅ No necesitas hacer nada adicional
- ⚠️ Si cambias de navegador o borras los datos del navegador, se perderán

## 🔒 Seguridad

- Solo los usuarios con rol de **administrador** pueden ver los botones de editar/eliminar
- Los usuarios normales solo pueden ver y descargar documentos
- Si cierras sesión, los botones de edición desaparecen

## 📞 Notas Importantes

1. **Verifica la URL**: Asegúrate de que el archivo existe en la ruta que especificas
2. **Formato correcto**: Las URLs locales deben empezar con `/documentos/`
3. **URLs externas**: También puedes usar URLs completas como `https://drive.google.com/...`

---

**¿Necesitas ayuda?** Si tienes problemas editando un documento, verifica que:
- Estás logueado como administrador
- Los botones de editar/eliminar son visibles en las tarjetas
- El modal se abre correctamente al hacer clic en editar
