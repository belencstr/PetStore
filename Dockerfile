# Imagen base
FROM node:16

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de dependencia
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la app
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
