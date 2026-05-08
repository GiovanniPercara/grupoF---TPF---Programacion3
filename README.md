grupoF---TPF---Programacion3

Pre-entrega de Trabajo Integrador — Programación III (Grupo F)

🧾 Descripción

Desarrollo de un BREAD de pacientes para un sistema de gestión de turnos clínicos.
La API permite gestionar pacientes mediante operaciones de crear, leer, actualizar y eliminar (soft delete).

Proyecto desarrollado con Node.js, Express y MySQL, aplicando arquitectura en capas.
 
 🏗️ Arquitectura

El proyecto utiliza una Arquitectura en Capas:

Routes: Definición de los puntos de entrada.

Controllers: Manejo de la lógica de las peticiones.

Services: Lógica de negocio principal.

Repositories: Interacción directa con la base de datos (MySQL).

👥 Integrantes

Lucia Allassia
Martina Ascona
Estrella Cardozo
Giovanni Percara
Andrea Natalia Segovia

⚠️ Importante

Las carpetas node_modules y el archivo .env no se encuentran incluidos en el repositorio.

Antes de ejecutar el proyecto es necesario:

instalar nuevamente las dependencias
crear y configurar el archivo .env
Esto se realizó por seguridad y buenas prácticas de desarrollo.

🛠️ Tecnologías

Runtime: Node.js

Framework: Express

Base de Datos: MySQL

Herramientas de Desarrollo: dotenv, cors, morgan, nodemon.

Testing: Bruno

📁 Estructura del proyecto
.
├── src/
│   ├── config/       # Conexión a DB
│   ├── controllers/  # Manejo de HTTP
│   ├── middlewares/  # Validaciones
│   ├── repositories/ # Consultas SQL
│   ├── routes/       # Endpoints
│   ├── services/     # Lógica de negocio
│   └── app.js        # Entry point
├── .env.example      # Referencia de variables
└── package.json      # Dependencias


🧪 Pruebas con Bruno

🔗 Base URL
http://localhost:3000/api/pacientes

📌 Endpoints disponibles
🔹 Obtener todos los pacientes
GET /api/pacientes
🔹 Obtener paciente por ID
GET /api/pacientes/:id

Ejemplo:
http://localhost:3000/api/pacientes/1

➕ Crear paciente
POST /api/pacientes
Body (JSON):
{
  "id_usuario": 5,
  "id_obra_social": 1
}

✏️ Actualizar paciente
PUT /api/pacientes/:id

Body:
{
  "id_obra_social": 2
}

🗑️ Eliminar paciente (Soft Delete)
DELETE /api/pacientes/:id

🔄 Flujo recomendado de prueba

GET → verificar datos existentes
POST → crear paciente
GET por ID → validar creación
PUT → actualizar datos
DELETE → desactivar paciente
GET → verificar cambios

🚀 Ejecución del proyecto
npm install
npm run dev

Servidor disponible en:

http://localhost:3000

📌 Notas Finales
Validaciones: Se utiliza express-validator para asegurar que los IDs sean numéricos y obligatorios.

Integridad: Los pacientes dependen de un usuario previo en la base de datos.

Vistas: La obtención de datos detallados se realiza mediante Views SQL para optimizar el rendimiento de las consultas