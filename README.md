
# 🏥 GRUPO F — TPF Programación III

---

## 🧑‍💻 Integrantes

- Lucía Allassia
- Martina Ascona
- Estrella Cardozo
- Giovanni Percara
- Andrea Natalia Segovia

---

## 🔧 Correcciones aplicadas (Trabajo Final Integrador - Recuperatorio)

### 1. CRUD 

**Corrección indicada:** *"La ruta medicoEspecialidad no es necesaria, se puede resolver con PUT en el acceso a datos de medicos. Lo mismo con medicoObraSocial y pacienteObraSocial."*

**Qué hicimos:**
- Eliminamos `medicoEspecialidad.routes.js`, `.controller.js`, `.service.js`, `.repository.js`
- Eliminamos `medicoObraSocial.routes.js` y `medicoEspecialidad.validator.js`
- La asociación médico–especialidad se resuelve con PUT /api/v1/medicos/:id/especialidad en la capa de médicos
- La asociación médico–obra social se resuelve con `POST /api/v1/admin/obras-sociales/:id/medicos` que ya existía 
- La asociación paciente–obra social se resuelve con `POST /api/v1/admin/obras-sociales/:id/pacientes`, corrigiendo el bug que leía `id_medico` del body en lugar de `id_paciente`

---

### 2. Reglas de negocio 

**Corrección indicada:** *"Mal implementado la creación del reporte. Acceden a los datos desde el servicio: reporte.service.js. Falta una capa de datos."*


**Qué hicimos:**
- El acceso a datos quedó exclusivamente en `reporte.repository.js`
- El service ahora solo contiene la lógica de negocio: busca los datos usando el repository y genera el PDF, devolviendo un `Buffer`
- El controller es el único que maneja `res`: recibe el buffer del service, configura los headers y envía el PDF al cliente

---

### 3. Funcionalidades técnicas — No se usaban transacciones MySQL

**Corrección indicada:** *"No usan transacciones de MySQL."*

**Qué hicimos:**
- Implementamos `beginTransaction`, `commit` y `rollback` en `createTurnoAdmin` dentro de `turnoAdmin.repository.js`
- La transacción garantiza que si el INSERT en `turnos_reservas` falla por cualquier motivo, se ejecuta el `rollback` automáticamente y no queda ningún registro a medias en la base de datos

---

### 4. Diseño REST 

**Corrección indicada:** *"Rutas innecesarias o mal nombradas. Ejemplo: post('/especialidades') debería estar en la ruta de especialidades, no en la ruta de admin."*


**Qué hicimos:**
- Consolidamos las cuatro operaciones bajo `/api/v1/especialidades`
- `GET /especialidades` y `GET /especialidades/:id` → accesible para los tres roles
- `POST /especialidades` y `PUT /especialidades/:id` → solo administrador, protegido con el middleware `soloAdmin`
- Eliminamos `GET /medicos/especialidades` que era una ruta duplicada
- Eliminamos las rutas de especialidades que estaban dentro de `admin.routes.js`
- Creamos `especialidades.controller.js`, `especialidades.service.js` y `especialidades.repository.js` para que el recurso tenga su propia capa completa

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


## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MySQL
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
│   │   ├── paciente.controller.js
│   │   ├── reporte.controller.js
│   │   ├── turnoAdmin.controller.js
│   │   ├── turno.controller.js
│   │   └── turnosMedico.controller.js
│   ├── middlewares
│   │   ├── admin.middleware.js
│   │   ├── admin.validator.js
│   │   ├── auth.middleware.js
│   │   ├── auth.validator.js
│   │   ├── multerUpload.middleware.js
│   │   ├── paciente.validator.js
│   │   ├── role.middleware.js
│   │   ├── turno.validator.js
│   │   ├── turnoAdmin.validator.js
│   │   └── validate.js
│   ├── repositories
│   │   ├── admin.repository.js
│   │   ├── auth.repository.js
│   │   ├── especialidades.repository.js
│   │   ├── estadisticas.repository.js
│   │   ├── medicos.repository.js
│   │   ├── paciente.repository.js
│   │   ├── reporte.repository.js
│   │   ├── turno.repository.js
│   │   ├── turnoAdmin.repository.js
│   │   └── turnosMedico.repository.js
│   ├── routes
│   │   └── v1
│   │       ├── admin.routes.js
│   │       ├── auth.routes.js
│   │       ├── especialidades.routes.js
│   │       ├── estadisticas.routes.js
│   │       ├── medico.routes.js
│   │       ├── paciente.routes.js
│   │       ├── reporte.routes.js
│   │       ├── turno.routes.js
│   │       ├── turnoAdmin.routes.js
│   │       └── turnosMedico.routes.js
│   ├── services
│   │   ├── admin.service.js
│   │   ├── auth.service.js
│   │   ├── especialidades.service.js
│   │   ├── estadisticas.service.js
│   │   ├── medico.service.js
│   │   ├── paciente.service.js
│   │   ├── reporte.service.js
│   │   ├── turno.service.js
│   │   ├── turnoAdmin.service.js
│   │   └── turnosMedico.service.js
│   └── swagger.js
└── uploads
    └── (fotos de perfil de usuarios)
```

---

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
DB_PORT=
JWT_SECRET=
PORT=3000
```

### 3️⃣ Ejecutar el proyecto

```bash
npm run dev
```

Servidor disponible en:

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

- ❌ No se incluye `node_modules`
- ❌ No se incluye `.env`
- ✔️ Ejecutar `npm install` antes de iniciar
- ✔️ La base de datos MySQL debe estar configurada previamente

---

## 🧠 Buenas prácticas aplicadas

- Arquitectura en capas
- Separación de responsabilidades
- Validación de datos con express-validator
- Seguridad con JWT
- Uso de variables de entorno
- Transacciones MySQL en operaciones críticas
- Organización modular del backend
- Soft delete en todas las entidades

---

## 📎 Observaciones finales

El sistema implementa una API REST completa con autenticación, manejo de roles y documentación interactiva mediante Swagger.
