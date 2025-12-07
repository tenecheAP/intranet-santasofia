FROM node:18-slim

WORKDIR /app

# Copia e instala dependencias
COPY package.json ./
RUN npm install --omit=dev

# Copia el código de la API
COPY . .

# Expone el puerto que usa Express/API
EXPOSE 3001

# Comando para iniciar la API
CMD [ "node", "server.js" ]