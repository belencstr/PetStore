# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencia
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la app
COPY . .

# Exponer el puerto
EXPOSE 3003

# Comando para iniciar la app
CMD ["node", "index.js"]
