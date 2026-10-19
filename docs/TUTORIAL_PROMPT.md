# 📚 PROMPT PARA GENERAR TUTORIAL DEL PROYECTO INTRANET

## 🎯 INSTRUCCIONES PARA LA IA

Copia y pega el siguiente prompt a una IA (ChatGPT, Claude, Gemini, etc.) para generar tu tutorial personalizado:

---

## 📝 PROMPT COMPLETO

```
Soy un ingeniero de sistemas con poca experiencia en desarrollo web. Necesito que me crees un tutorial PRÁCTICO y CLARO (no muy técnico ni profundo) para entender mi proyecto de intranet.

El proyecto tiene la siguiente estructura:

**ARQUITECTURA:**
- Frontend: React 18 con React Router
- Backend: Node.js con Express
- Base de Datos: PostgreSQL 15
- Contenedores: Docker y Docker Compose
- Servidor Web: Nginx

**ESTRUCTURA DEL PROYECTO:**
```
intranet/
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── services/      # Llamadas a la API
│   │   └── App.js         # Componente principal
│   ├── public/            # Archivos estáticos
│   ├── Dockerfile         # Configuración Docker del frontend
│   └── package.json       # Dependencias de React
│
├── backend/               # API REST
│   ├── src/
│   │   ├── controllers/   # Lógica de negocio
│   │   ├── routes/        # Rutas de la API
│   │   └── db/            # Conexión a base de datos
│   ├── server.js          # Servidor Express
│   ├── Dockerfile         # Configuración Docker del backend
│   └── package.json       # Dependencias de Node.js
│
└── docker-compose.yml     # Orquestación de servicios
```

**TECNOLOGÍAS CLAVE:**
- React: Librería para interfaces de usuario
- Express: Framework para crear APIs
- PostgreSQL: Base de datos relacional
- Docker: Contenedores para aislar servicios
- Nginx: Servidor web para servir React

**FLUJO DE LA APLICACIÓN:**
1. Usuario accede al navegador (puerto 80)
2. Nginx sirve la aplicación React
3. React hace peticiones HTTP a la API (puerto 3001)
4. Express procesa las peticiones y consulta PostgreSQL
5. PostgreSQL devuelve datos al backend
6. Backend envía respuesta JSON al frontend
7. React muestra los datos al usuario

---

**CREA UN TUTORIAL QUE CUBRA:**

1. **Introducción Simple** (5 minutos de lectura)
   - ¿Qué es este proyecto y para qué sirve?
   - Arquitectura general en términos simples
   - Diagrama visual del flujo de datos

2. **Conceptos Básicos** (10 minutos)
   - ¿Qué es Frontend vs Backend? (con analogía simple)
   - ¿Qué hace React en mi proyecto?
   - ¿Qué hace Express en mi proyecto?
   - ¿Por qué PostgreSQL?
   - ¿Qué es Docker y por qué lo uso?

3. **Estructura del Proyecto** (10 minutos)
   - Explicación de cada carpeta principal
   - ¿Qué archivos son importantes y cuáles no debo tocar?
   - ¿Dónde está el código que probablemente modificaré?

4. **Cómo Funciona el Frontend** (15 minutos)
   - ¿Qué es un componente de React?
   - ¿Cómo se comunica con el backend?
   - Flujo: Usuario hace clic → ¿qué pasa?
   - Archivos clave: App.js, components/, pages/

5. **Cómo Funciona el Backend** (15 minutos)
   - ¿Qué es una API REST?
   - ¿Qué son las rutas y controladores?
   - ¿Cómo se conecta a la base de datos?
   - Archivos clave: server.js, routes/, controllers/

6. **Docker y Docker Compose** (10 minutos)
   - ¿Qué problema resuelve Docker?
   - ¿Qué hace docker-compose.yml?
   - Los 3 servicios: db, api, frontend
   - Comandos básicos que debo conocer

7. **Flujo de Datos Completo** (10 minutos)
   - Ejemplo práctico: "Usuario consulta lista de empleados"
   - Paso a paso desde el clic hasta ver los datos
   - Diagrama de secuencia simple

8. **Comandos Esenciales** (5 minutos)
   - Cómo iniciar el proyecto
   - Cómo detener el proyecto
   - Cómo ver logs
   - Cómo reiniciar un servicio

9. **Modificaciones Comunes** (10 minutos)
   - ¿Cómo agregar una nueva página?
   - ¿Cómo crear una nueva ruta en la API?
   - ¿Cómo modificar estilos?
   - Mejores prácticas básicas

10. **Troubleshooting Básico** (5 minutos)
    - Problemas comunes y soluciones
    - ¿Dónde buscar errores?
    - ¿Cómo reiniciar cuando algo falla?

---

**FORMATO DEL TUTORIAL:**
- Usa lenguaje simple y analogías
- Incluye ejemplos visuales (diagramas de texto ASCII)
- Evita jerga técnica compleja
- Enfócate en lo PRÁCTICO, no en teoría profunda
- Usa emojis para hacer más amigable la lectura
- Incluye secciones "💡 En Resumen" al final de cada tema
- Agrega "⚠️ Importante" para puntos clave

**TONO:**
- Amigable y didáctico
- Como si le explicaras a un colega junior
- Sin asumir conocimientos previos profundos
- Motivador y claro
```

---

## 🎨 TEMAS ADICIONALES OPCIONALES

Si quieres profundizar más en algún tema específico, puedes agregar al prompt:

### Para Frontend:
- "Explica el ciclo de vida de componentes React"
- "¿Cómo funciona React Router en mi proyecto?"
- "¿Qué son los hooks de React y cuáles uso?"

### Para Backend:
- "Explica middleware en Express"
- "¿Cómo funciona la autenticación JWT?" (si la tienes)
- "¿Qué es CORS y por qué lo necesito?"

### Para Base de Datos:
- "Comandos SQL básicos para PostgreSQL"
- "¿Cómo diseñar tablas relacionales?"
- "¿Qué son las migraciones de base de datos?"

### Para Docker:
- "Diferencia entre Dockerfile y docker-compose"
- "¿Qué son los volúmenes de Docker?"
- "¿Cómo funciona el networking entre contenedores?"

---

## 📌 CONSEJOS DE USO

1. **Copia el PROMPT COMPLETO** (todo lo que está en el bloque de código)
2. **Pégalo en tu IA favorita** (ChatGPT, Claude, Gemini)
3. **Guarda el tutorial generado** en un archivo markdown
4. **Léelo sección por sección** - no todo de una vez
5. **Practica mientras lees** - abre los archivos mencionados
6. **Agrega notas personales** conforme aprendas

---

## 🚀 SIGUIENTE PASO

Después de generar y leer el tutorial, puedes pedirle a la IA:

```
"Ahora créame un ejercicio práctico paso a paso para:
1. Agregar una nueva página 'Contactos' en el frontend
2. Crear una ruta GET /api/contactos en el backend
3. Conectar ambos para mostrar datos de prueba"
```

Esto te ayudará a aplicar lo aprendido de forma práctica.

---

## 📖 RECURSOS COMPLEMENTARIOS

Una vez entiendas tu proyecto, estos recursos te ayudarán:

- **React:** https://react.dev/learn
- **Express:** https://expressjs.com/es/starter/hello-world.html
- **Docker:** https://docs.docker.com/get-started/
- **PostgreSQL:** https://www.postgresql.org/docs/current/tutorial.html

---

**¡Éxito con tu aprendizaje! 🎓**
