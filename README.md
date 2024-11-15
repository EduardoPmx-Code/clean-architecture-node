# Node.js Clean Architecture Template

Este proyecto es un **template** diseñado para mostrar cómo implementar la **Clean Architecture** utilizando **Node.js** y **TypeScript**. El objetivo es proporcionar una base sólida para construir aplicaciones escalables y mantenibles, siguiendo principios de diseño limpio.

---

## Requisitos Mínimos

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes requisitos previos:

- [Node.js](https://nodejs.org) v18+  
- [Docker](https://www.docker.com/)

---

## Configuración del Proyecto

### Paso 1: Clonar el repositorio

Clona este repositorio en tu máquina local:  
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>


---
### Paso 2: Copiar el archivo .env.template

Este proyecto incluye un archivo .env.template con las configuraciones necesarias. Copia este archivo y renómbralo a .env:

cp .env.template .env

---
### Paso 3: Instalar las dependencias
Instala las dependencias del proyecto ejecutando:

npm install


---

### Ejecución del Proyecto
---
Opción 1: Usando Docker
Construye y ejecuta los servicios definidos en el archivo docker-compose.yml:

bash

docker-compose up --build
El servidor estará disponible en http://localhost:3000.

---

Opción 2: Sin Docker
Asegúrate de tener una instancia de MongoDB ejecutándose localmente o en un servidor.

Inicia el servidor localmente:

bash

npm run dev


----
### Endpoints Disponibles
---------------------------------
POST /api/auth/login
Inicia sesión con un usuario existente.
Request Body:

json

{
  "email": "usuario@example.com",
  "password": "123456"
}


---------------------------------
POST /api/auth/register
Registra un nuevo usuario.
Request Body:

json

{
  "email": "usuario@example.com",
  "password": "123456",
  "name": "John Doe"
}

------------------------------------
GET /api/users/
Obtiene la lista de usuarios registrados.
Middleware: Requiere un token JWT válido para la autenticación.

Headers:

json

{
  "Authorization": "Bearer JWT_TOKEN"
}