
# 🏥 GRUPO F — TPF Programación III

---

## 📌 Descripción del proyecto

API REST desarrollada con Node.js, Express y MySQL, siguiendo una arquitectura en capas (Layered Architecture) para garantizar escalabilidad, mantenibilidad y separación de responsabilidades.

El sistema permite la gestión de una clínica médica, incluyendo:
usuarios, pacientes, médicos, turnos, especialidades, obras sociales, estadísticas y reportes.

---

## 🏗️ Arquitectura del proyecto

El proyecto está organizado en capas:

### 🔹 Routes
Define los endpoints de la API y conecta las rutas con los controladores.

### 🔹 Controllers
Gestionan las solicitudes HTTP, validan parámetros básicos y devuelven respuestas.

### 🔹 Services
Contienen la lógica de negocio principal del sistema.

### 🔹 Repositories
Encargados del acceso a la base de datos MySQL.

### 🔹 Middlewares
Incluyen:
- Autenticación con JWT  
- Autorización por roles  
- Validaciones de datos  
- Manejo de errores  
- Upload de archivos (Multer)

### 🔹 Validaciones
Uso de express-validator para asegurar integridad de datos.

### 🔹 Config
Configuración de base de datos y entorno.

---

## 🧑‍💻 Integrantes

- Lucía Allassia  
- Martina Ascona  
- Estrella Cardozo  
- Giovanni Percara  
- Andrea Natalia Segovia  

---

## 🛠️ Tecnologías utilizadas

- Node.js  
- Express  
- MySQL  
- Sequelize  
- JWT (JSON Web Token)  
- Multer  
- dotenv  
- cors  
- morgan  
- nodemon  
- express-validator  
- Swagger (documentación API)  
- Bruno (testing de endpoints)

---

## 📁 Estructura del proyecto

```txt
.
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.js
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── admin.controllers.js
│   │   ├── auth.controller.js
│   │   ├── especialidades.controller.js
│   │   ├── estadisticas.controller.js
│   │   ├── medico.controller.js
│   │   ├── medicoEspecialidad.controller.js
│   │   ├── paciente.controller.js
│   │   ├── reporte.controller.js
│   │   ├── turnoAdmin.controller.js
│   │   ├── turno.controller.js
│   │   └── turnosMedico.controller.js
│   ├── middlewares
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── multerUpload.middleware.js
│   │   ├── validate.js
│   │   └── validators...
│   ├── repositories
│   │   ├── admin.repository.js
│   │   ├── auth.repository.js
│   │   ├── medico.repository.js
│   │   ├── paciente.repository.js
│   │   └── ...
│   ├── routes
│   │   └── v1
│   │       ├── admin.routes.js
│   │       ├── auth.routes.js
│   │       ├── medico.routes.js
│   │       ├── paciente.routes.js
│   │       └── ...
│   ├── services
│   │   ├── admin.service.js
│   │   ├── auth.service.js
│   │   ├── medico.service.js
│   │   ├── paciente.service.js
│   │   └── ...
│   ├── swagger.js
│   └── app.js
└── uploads
    └── ( IMAGEN/Foto perfil paciente)

``` 
## 🚀 Instalación y ejecución

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Crear archivo .env

Configurar variables de entorno:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=3000
```

### 3️⃣ Ejecutar el proyecto

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

## 📌 Documentación API

Swagger disponible en:

```
http://localhost:3000/api-docs
```

---

## ⚠️ Notas importantes

* ❌ No se incluye node_modules
* ❌ No se incluye .env
* ✔️ Ejecutar `npm install` antes de iniciar
* ✔️ La base de datos MySQL debe estar configurada previamente

---

## 🧠 Buenas prácticas aplicadas

* Arquitectura en capas
* Separación de responsabilidades
* Validación de datos con express-validator
* Seguridad con JWT
* Uso de variables de entorno
* Organización modular del backend

---

## 📎 Observaciones finales

El sistema implementa una API REST completa con autenticación, manejo de roles y documentación interactiva mediante Swagger.


