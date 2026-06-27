Te lo dejo listo para copiar y pegar, con formato prolijo tipo “README de entrega perfecta” y con estructura bien alineada 👇

````md
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

src/
│
├── config/
│
├── controllers/
│
├── middlewares/
│
├── repositories/
│
├── routes/
│   └── v1/
│
├── services/
│
├── uploads/
│
└── app.js
````

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


