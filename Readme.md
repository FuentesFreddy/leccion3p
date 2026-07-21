# Consumo de API REST con JSONPlaceholder

## Descripción

Este proyecto consiste en una aplicación desarrollada con **TypeScript**, **JavaScript**, **HTML** y **CSS** que consume la API pública **JSONPlaceholder** mediante solicitudes HTTP.

La aplicación permite consultar y manipular el recurso **/posts**, implementando las operaciones principales de una API REST, incluyendo la obtención, creación, actualización y eliminación simulada de publicaciones.

La API utilizada es:

https://jsonplaceholder.typicode.com

---

# Integrante

- Freddy Joel Fuentes Escobar

---

# Tecnologías Utilizadas

- TypeScript
- JavaScript
- HTML5
- CSS3
- Fetch API
- Node.js
- Docker

---

# Estructura del Proyecto

```
LECCION3P/
│
├── app.ts
├── app.js
├── index.html
├── styles.css
├── Dockerfile
├── .dockerignore
└── Readme.md
```

---

# Funcionalidades

La aplicación permite realizar las siguientes operaciones:

- Obtener todas las publicaciones (GET).
- Consultar una publicación mediante su identificador (GET).
- Filtrar publicaciones por usuario (GET).
- Crear una nueva publicación (POST).
- Actualizar el título de una publicación (PATCH).
- Simular la eliminación de una publicación (DELETE).
- Manejar errores de conexión y respuestas HTTP incorrectas.

Cada publicación muestra:

- ID de la publicación.
- ID del usuario.
- Título.
- Contenido.

---

# Métodos HTTP Utilizados

## GET

Permite obtener información desde el servidor.

Se utiliza para:

- Listar todas las publicaciones.
- Buscar una publicación por ID.
- Filtrar publicaciones por usuario.

---

## POST

Permite crear un nuevo recurso.

En este proyecto se utiliza para crear una nueva publicación.

---

## PATCH

Permite actualizar parcialmente un recurso existente.

En este proyecto únicamente se modifica el título de una publicación.

---

## DELETE

Permite eliminar un recurso.

JSONPlaceholder únicamente simula esta operación, por lo que la información no desaparece permanentemente.

---

# Ejecución con Node.js

## 1. Instalar TypeScript (si es necesario)

```bash
npm install -g typescript
```

## 2. Compilar el archivo TypeScript

```bash
tsc app.ts
```

Esto generará el archivo:

```
app.js
```

## 3. Ejecutar la aplicación

```bash
node app.js
```

---

# Ejecución desde el Navegador

La interfaz gráfica puede ejecutarse simplemente abriendo el archivo:

```
index.html
```

Puede hacerse con doble clic o seleccionando:

```
Abrir con → Navegador Web
```

---

# Ejecución con Docker

## Construir la imagen

```bash
docker build -t jsonplaceholder-api .
```

## Ejecutar el contenedor

```bash
docker run -d -p 8080:80 --name jsonplaceholder-app jsonplaceholder-api
```

## Abrir la aplicación

```
http://localhost:8080
```

---

# Consideraciones

- JSONPlaceholder simula las operaciones POST, PATCH y DELETE.
- Los cambios realizados no se almacenan permanentemente.
- El código está organizado utilizando funciones con nombres descriptivos para facilitar su mantenimiento y comprensión.

---

# Evidencias

El repositorio incluye capturas de pantalla correspondientes a:

- Consulta de todas las publicaciones.
- Consulta por ID.
- Consulta por usuario.
- Creación de una publicación.
- Actualización de una publicación.
- Eliminación simulada.
- Manejo de errores.

---

# Autor

Freddy Joel Fuentes Escobar