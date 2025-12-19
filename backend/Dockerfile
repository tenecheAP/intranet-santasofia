FROM node:18-slim

WORKDIR /app

# Instala dependencias del sistema necesarias (postgresql-client para backups)
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copia e instala dependencias de Node.js
COPY package.json ./
RUN npm install --omit=dev

# Copia el código de la API
COPY . .

# Expone el puerto que usa Express/API
EXPOSE 3001

# Comando para iniciar la API
CMD [ "node", "server.js" ]