
GRUPO F ---TPF---Programacion3

Entrega de Trabajo Integrador — Programación III (Grupo F)

🧾 Descripción

Proyecto desarrollado con Node.js, Express y MySQL, aplicando arquitectura en capas.
 
 🏗️ El proyecto sigue una Arquitectura en Capas para garantizar la separación de responsabilidades, la mantenibilidad y la escalabilidad del código.

Routes: Define los puntos de entrada (endpoints) y vincula las rutas con los controladores correspondientes.

Controllers: Gestiona la lógica de las peticiones HTTP (recepción de parámetros, validación inicial y envío de respuestas).

Services: Contiene la lógica de negocio principal y orquestación de procesos. Es el núcleo donde se decide el comportamiento del sistema.

Repositories: Encargados de la persistencia de datos mediante la interacción directa con MySQL utilizando Sequelize.

Middlewares: Capa transversal encargada de la autenticación (JWT), autorización y manejo centralizado de errores.

DTOs / Validations: Capa de transferencia de datos y validación de esquemas (usando express-validator) para asegurar que solo lleguen datos correctos a los servicios.

Models: Definición de la estructura de las tablas en la base de datos (ORM Sequelize).

👥 Integrantes

Lucía Allassia
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


├─src/

│   ├── config/       
│   ├── controllers/  
│   ├── middlewares/  
│   ├── repositories/
    ├── repositorie/
 
│   ├── routes/      
│   ├── services/     
│   └── app.js        
└── package.json      


├─upload/

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
