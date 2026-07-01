# 🏥 Grupo F — TPF Programación III (Recuperatorio)

Sistema de gestión de turnos para clínica, desarrollado con **Node.js + Express + MySQL**, siguiendo una arquitectura en capas y aplicando autenticación/autorización por roles con JWT.

## 🧑‍💻 Integrantes
- Lucía Allassia
- Martina Ascona
- Estrella Cardozo
- Giovanni Percara
- Andrea Natalia Segovia

---

## 🔧 Correcciones aplicadas (recuperatorio)

### 1. CRUD y simplificación de rutas
**Feedback:** la ruta `medicoEspecialidad` no es necesaria, se puede resolver con `PUT` en el acceso a datos de médicos. Lo mismo con `medicoObraSocial` (resolver con `POST` en el acceso a datos de obra social) y con `pacienteObraSocial`.

**Solución:**
- Se eliminaron las rutas, controladores y validators independientes de `medicoEspecialidad`.
- La asociación Médico–Especialidad se absorbió como una actualización del propio recurso médico: `PUT /api/v1/medicos/:id/especialidad`.
- La asociación Médico–Obra Social y Paciente–Obra Social se resolvieron como sub-recursos del propio recurso obra social, evitando rutas intermedias:
  - `POST /api/v1/obras-sociales/:id/medicos`
  - `POST /api/v1/obras-sociales/:id/pacientes`
- De paso se corrigió el bug de lectura de IDs: antes se esperaba el ID en la URL de una ruta intermedia; ahora el ID de médico/paciente viaja en el body (`id_medico` / `id_paciente`) y el ID de la obra social en el path param, evitando ambigüedades.

### 2. Reglas de negocio — capa de datos en reportes
**Feedback:** el reporte está mal implementado, `reporte.service.js` accedía directo a los datos.

**Solución:** se separaron responsabilidades siguiendo el patrón repository:
- `reporte.repository.js` concentra toda la consulta SQL (JOIN de turnos, pacientes, médicos y especialidades).
- `reporte.service.js` ya no ejecuta queries: solo recibe los datos y genera el `Buffer` del PDF con `pdfkit`.
- `reporte.controller.js` se limita a invocar al servicio y despachar la respuesta HTTP (`Content-Type: application/pdf`).

### 3. Funcionalidades técnicas — transacciones MySQL
**Feedback:** falta de transacciones en la persistencia.

**Solución:** se incorporó el flujo transaccional de `mysql2` (`beginTransaction` / `commit` / `rollback`) en `turnoAdmin.repository.js`, dentro de `createTurnoAdmin`, para que el registro de un turno por parte del administrador sea atómico y no deje datos inconsistentes en `turnos_reservas` ante un error a mitad de camino.

### 4. Diseño REST — rutas e inyección de middleware
**Feedback:** la ruta `post('/especialidades')` estaba mal ubicada dentro de `admin`.

**Solución:** se modularizó `especialidades` como recurso independiente bajo `/api/v1/especialidades`, separado de `admin`:
- `GET /` y `GET /:id` quedaron accesibles para los roles habilitados del sistema (médico, paciente, admin).
- `POST /` y `PUT /:id` quedaron protegidos por el middleware `soloAdmin`.

Como consecuencia de unificar las asociaciones de obras sociales bajo su propio recurso (punto 1), se eliminaron por completo los archivos `admin.routes.js`, `admin.controllers.js`, `admin.service.js`, `admin.repository.js` y `admin.validator.js`, que habían quedado duplicados respecto de `obrasSociales.*` sin estar referenciados en `app.js`.

---

## 🏗️ Arquitectura y tecnologías

Arquitectura en capas: `Routes → Middlewares/Validators → Controllers → Services → Repositories`.

| Categoría | Tecnología |
|---|---|
| Core | Node.js, Express 5, MySQL (`mysql2`) |
| Seguridad | JWT (autenticación) + autorización por roles |
| Validación | `express-validator` |
| Archivos | `multer` (foto de perfil en registro) |
| Config | `dotenv`, `cors` |
| Logging | `morgan` |
| Reportes | `pdfkit` (PDF en memoria, vía Buffer) |
| Documentación | Swagger UI (`swagger-jsdoc` + `swagger-ui-express`) en `/api-docs` |
| Testing manual | Bruno |

---

## 👥 Roles y funcionalidades

| Rol | Valor | Funcionalidades |
|---|---|---|
| **Médico** | `1` | Iniciar sesión · Listar turnos propios (`GET /api/v1/turnos-medico/mis-turnos`) · Marcar turno como atendido (`PATCH /api/v1/turnos-medico/:id/atender`) |
| **Paciente** | `2` | Iniciar sesión · Crear reservas propias (`POST /api/v1/turnos`) · Listar turnos propios (`GET /api/v1/turnos`) · Listar especialidades (`GET /api/v1/especialidades`) · Listar médicos, todos o por especialidad (`GET /api/v1/medicos?id_especialidad=`) |
| **Administrador** | `3` | Iniciar sesión · CRUD especialidades · Asociar médico–especialidad · CRUD obras sociales · Asociar médico–obra social · Asociar paciente–obra social · Registrar turno para paciente/médico/fecha (`POST /api/v1/admin/turnos`) · Estadísticas de atenciones (`GET /api/v1/estadisticas`) |

La autorización se resuelve con dos middlewares: `soloAdmin` (rol `3` exclusivo) y `authorize(...roles)` (lista blanca de roles permitidos), ambos aplicados sobre `req.usuario` una vez validado el JWT por `verificarToken`.

---

## 📌 Reglas de negocio implementadas

- **Cálculo de `valor_total`** en `turnos_reservas`:
  - Si `obras_sociales.es_particular = 0` → `valor_total = medicos.valor_consulta - (obras_sociales.porcentaje_descuento * medicos.valor_consulta)`
  - Si `obras_sociales.es_particular = 1` → `valor_total = medicos.valor_consulta`
- **Soft delete:** ningún registro se borra físicamente; se utiliza el campo `activo`. Toda consulta de lectura filtra por `activo = 1`.
- **Estadísticas exclusivamente por stored procedures:** `sp_estadisticas_atenciones`, `sp_estadisticas_por_medico` y `sp_estadisticas_por_obra_social`, invocados desde `estadisticas.repository.js` vía `CALL`.
- **Reportes en PDF:** el endpoint `GET /api/v1/reportes/paciente/:id` genera un PDF con el detalle de turnos del paciente (fecha, médico, especialidad, valor, si fue atendido) y un resumen con cantidad total de turnos y monto abonado.

---

## 📁 Estructura del proyecto

```txt
.
├── README.md
├── package.json
├── database/
│   └── prog3_turnos.sql   # Esquema + datos + stored procedures
├── src/
│   ├── app.js
│   ├── config/             # Conexión a MySQL (db.js)
│   ├── controllers/        # Despachan la respuesta HTTP
│   ├── middlewares/        # JWT, roles, multer, express-validator
│   ├── repositories/       # Única capa con acceso a SQL / stored procedures
│   ├── routes/v1/          # Endpoints modulares de la API
│   ├── services/           # Lógica de negocio pura (sin SQL, sin objetos de Express)
│   └── swagger.js          # Configuración de Swagger
└── uploads/                 # Fotos de perfil subidas con multer
```

---

## 🚀 Instalación y ejecución

**1. Instalar dependencias**
```bash
npm install
```

**2. Configurar el entorno**

Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=prog3_turnos
DB_PORT=3306
JWT_SECRET=tu_clave_secreta
```

**3. Cargar la base de datos**

Importar `database/prog3_turnos.sql` en MySQL (crea el esquema, carga datos y los stored procedures).

**4. Iniciar en modo desarrollo**
```bash
npm run dev
```

- API: `http://localhost:3000`
- Documentación interactiva (Swagger): `http://localhost:3000/api-docs`

---

## 🧠 Buenas prácticas aplicadas

- **Separación de capas:** los controladores no ejecutan queries SQL y los servicios no conocen objetos `req`/`res` de Express.
- **Manejo transaccional:** persistencia atómica en la creación de turnos por parte del administrador.
- **Integridad de datos:** validación de entradas con `express-validator` y persistencia con soft delete (`activo`).
- **Autorización explícita:** cada ruta declara qué roles pueden acceder, sin dejar endpoints implícitamente abiertos.
