# PetStore

## Descripción
PetStore es una aplicación para la gestión de tiendas de mascotas. Permite a los usuarios buscar y comprar productos para sus mascotas, así como gestionar sus pedidos y perfiles. La aplicación está construida utilizando una arquitectura de microservicios.

## Arquitectura
- **Microservicios**: La aplicación está dividida en varios microservicios que se comunican entre sí.
- **Docker**: Cada microservicio se ejecuta en un contenedor Docker.
- **MongoDB**: Utilizamos MongoDB como base de datos para almacenar la información de los productos, usuarios y pedidos.
- **Axios**: Axios se utiliza para realizar las solicitudes HTTP entre los microservicios.

## Descripción del Proyecto
El proyecto PetStore es una aplicación web que permite a los usuarios explorar y comprar mascotas en línea. La aplicación está desarrollada utilizando una arquitectura de microservicios, donde cada servicio es responsable de una funcionalidad específica. A continuación, se detallan los componentes principales del proyecto:

### 1. API Gateway
- **Ubicación**: `api_gateway/`
- **Descripción**: Actúa como el punto de entrada unificado para las solicitudes de los clientes, redirigiendo las peticiones a los microservicios correspondientes.
- **Tecnologías utilizadas**: Express, JWT, Axios.

### 2. Servicios de Microservicios
#### Cart Service
- **Ubicación**: `cart-service/`
- **Descripción**: Gestiona las operaciones relacionadas con el carrito de compras, como agregar o eliminar productos.
- **Autenticación**: Protegido mediante JWT.
- **Conexión con otros servicios**: Utiliza Axios para comunicarse con el servicio de productos.

#### Categories Service
- **Ubicación**: `categories-service/`
- **Descripción**: Maneja las categorías de productos disponibles en la tienda.
- **Autenticación**: Protegido mediante JWT.

#### Orders Service
- **Ubicación**: `orders-service/`
- **Descripción**: Se encarga de la creación y gestión de los pedidos realizados por los clientes.
- **Autenticación**: Protegido mediante JWT.
- **Conexión**: Utiliza Axios para verificar productos en el carrito antes de proceder con la orden.

#### Products Service
- **Ubicación**: `products-service/`
- **Descripción**: Administra la información de los productos disponibles en la tienda.
- **Autenticación**: Protegido mediante JWT.

#### Reviews Service
- **Ubicación**: `reviews-service/`
- **Descripción**: Gestiona las reseñas y calificaciones que los clientes dejan sobre los productos.
- **Autenticación**: Protegido mediante JWT.

#### Users Service
- **Ubicación**: `users-service/`
- **Descripción**: Maneja la información y autenticación de los usuarios de la plataforma.
- **Tecnología de autenticación**: JWT (creación y verificación de tokens durante el inicio de sesión y registro).

### 3. Archivos Principales
- **docker-compose.yml**
  - **Descripción**: Define y configura los servicios de Docker para el proyecto, permitiendo su orquestación y despliegue conjunto.
- **package.json y package-lock.json**
  - **Descripción**: Contienen las dependencias y scripts necesarios para el entorno de Node.js utilizado en el proyecto.
  - **Dependencias clave**: Express, Axios, jsonwebtoken.
- **.gitignore**
  - **Descripción**: Especifica los archivos y directorios que Git debe ignorar, como dependencias instaladas y archivos de configuración locales.

### 4. Seguridad y Autenticación
- **JWT (JSON Web Tokens)**: Se utilizan para la autenticación y autorización de usuarios.
- **Axios**: Utilizado para realizar peticiones HTTP entre microservicios de manera eficiente.
- **Middleware de autenticación**: Cada servicio contiene un middleware que verifica la validez del token JWT antes de permitir el acceso a rutas protegidas.

## Instalación
1. Clona el repositorio:
    ```bash
    git clone https://github.com/belencstr/PetStore.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd PetStore
    ```
3. Instala las dependencias en todos los servicios:
    ```bash
    cd api_gateway && npm install
    cd ../cart-service && npm install
    cd ../categories-service && npm install
    cd ../orders-service && npm install
    cd ../products-service && npm install
    cd ../reviews-service && npm install
    cd ../users-service && npm install
    cd ..
    ```
4. Construye y levanta los contenedores Docker:
    ```bash
    docker-compose up --build
    ```

## Uso
1. Asegúrate de que los contenedores Docker están en funcionamiento:
    ```bash
    docker ps
    ```
2. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.
