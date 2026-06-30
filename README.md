# 🏥 GRUPO F — TPF Programación III (Recuperatorio)

## 🧑‍💻 Integrantes
- Lucía Allassia
- Martina Ascona
- Estrella Cardozo
- Giovanni Percara
- Andrea Natalia Segovia

---

## 🔧 Correcciones Aplicadas

### 1. CRUD y Simplificación de Rutas
* **Feedback:** *Eliminar rutas intermedias redundantes (`medicoEspecialidad`, `medicoObraSocial`, `pacienteObraSocial`).*
* **Solución:** 
  * Se eliminaron por completo las rutas e interfaces de `medicoEspecialidad` y anexos.
  * La asociación Médico–Especialidad se absorbió mediante el método: `PUT /api/v1/medicos/:id/especialidad`.
  * Las asociaciones de obras sociales se unificaron bajo el recurso administrativo correspondiente (`POST /api/v1/admin/obras-sociales/:id/medicos` y `POST /api/v1/admin/obras-sociales/:id/pacientes`), subsanando el bug de lectura de IDs en el cuerpo de la petición.

### 2. Reglas de Negocio (Capa de Datos en Reportes)
* **Feedback:** *Mal implementado el reporte, `reporte.service.js` accedía directo a los datos.*
* **Solución:** Se aplicó una estricta separación de responsabilidades. Toda consulta SQL y llamadas al procedimiento almacenado se movieron a `reporte.repository.js`. El servicio ahora procesa puramente la lógica de negocio (generación del Buffer del PDF) y el controlador despacha la respuesta HTTP.

### 3. Funcionalidades Técnicas (Transacciones MySQL)
* **Feedback:** *Falta de transacciones en la persistencia.*
* **Solución:** Se integró el flujo de transacciones (`beginTransaction`, `commit`, `rollback`) mediante `mysql2` en `createTurnoAdmin` (`turnoAdmin.repository.js`), asegurando la atomicidad y la consistencia en tablas críticas como `turnos_reservas`.

### 4. Diseño REST (Rutas e Inyección de Middleware)
* **Feedback:** *Ruta `post('/especialidades')` mal ubicada dentro de admin.*
* **Solución:** Se modularizó el recurso de forma independiente bajo `/api/v1/especialidades`. Los métodos de consulta (`GET`) quedaron públicos para los roles del sistema, mientras que la creación (`POST`) y edición (`PUT`) se resguardan bajo el middleware de restricción de accesos `soloAdmin`.

---

## 🏗️ Arquitectura y Tecnologías
API REST bajo una **Arquitectura en Capas (Layered Architecture)** estructurada en: *Routes -> Middlewares/Validators -> Controllers -> Services -> Repositories*.

* **Core:** Node.js, Express, MySQL (`mysql2`).
* **Seguridad:** JWT (Autenticación y Autorización por Roles).
* **Validaciones y Utilidades:** `express-validator`, `multer` (archivos), `dotenv`, `cors`, `morgan`.
* **Documentación y Pruebas:** Swagger UI (`/api-docs`) y Bruno.

---

## 📁 Estructura del Proyecto

```txt
.
├── README.md
├── package.json
├── src
│   ├── app.js
│   ├── config/          # Conexión DB (db.js)
│   ├── controllers/     # Controladores de recursos y auth
│   ├── middlewares/     # JWT, Roles, Multer y express-validator
│   ├── repositories/    # Capa de Acceso a Datos (Consultas SQL / SP)
│   ├── routes/v1/       # Endpoints modulares de la API
│   ├── services/        # Lógica de negocio pura
│   └── swagger.js       # Configuración de documentación
└── uploads/             # Almacenamiento de imágenes de perfil


🚀 Instalación y Ejecución
Instalar dependencias:

Bash
npm install
Configurar el entorno: Crear un archivo .env en la raíz del proyecto siguiendo esta plantilla:

Fragmento de código
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=prog3_turnos
DB_PORT=3306
JWT_SECRET=tu_clave_secreta
Iniciar en modo desarrollo:

Bash
npm run dev
El servidor correrá en: http://localhost:3000

Documentación interactiva de la API (Swagger): http://localhost:3000/api-docs

🧠 Buenas Prácticas Relevantes
Separación de capas: Controladores libres de queries SQL, Servicios libres de objetos res de Express.

Manejo transaccional: Persistencia segura en operaciones concurrentes de turnos.

Integridad de datos: Sanitización rigurosa de entradas y persistencia con Soft Delete.
