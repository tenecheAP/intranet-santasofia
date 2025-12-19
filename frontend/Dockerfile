# --- FASE 1: BUILD (Compilación) ---
FROM node:18-alpine as builder

WORKDIR /app

# Argumento para la URL de la API (pasado desde docker-compose o comando build)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copia los archivos de configuración y dependencias
COPY package.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Compila la aplicación React (crea la carpeta 'build')
RUN npm run build

# --- FASE 2: RUN (Producción - Servir con Nginx) ---
FROM nginx:alpine

# Copia los archivos compilados de la carpeta 'build' al directorio de Nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Puerto por defecto de Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
