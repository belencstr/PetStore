# Users Service

Este es el servicio de usuarios para la aplicación PetStore.

## Configuración

Asegúrate de tener Docker instalado y configurado en tu máquina.

### Variables de entorno

Crea un archivo `.env` en el directorio raíz del proyecto con el siguiente contenido:

```
DB_URI=mongodb://mongo:27017
DB_NAME=usersDB
PORT=3001
JWT_SECRET=clave_super_secreta_123
JWT_EXPIRES_IN=1h
```

### Crear una red Docker personalizada

Primero, crea una red Docker personalizada:

```sh
docker network create petstore-network
```

### Ejecutar el contenedor de MongoDB en la red personalizada

Luego, ejecuta el contenedor de MongoDB en la red personalizada:

```sh
docker run -d --name mongo --network petstore-network -p 27017:27017 mongo
```

### Ejecutar el contenedor del servicio de usuarios en la red personalizada

Finalmente, ejecuta el contenedor del servicio de usuarios en la misma red:

```sh
docker run -p 3001:3000 --network petstore-network --env-file .env users-service
```

Esto debería resolver el problema de conexión a MongoDB.
