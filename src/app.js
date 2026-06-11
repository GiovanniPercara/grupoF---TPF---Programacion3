import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/v1/auth.routes.js';
import turnoRoutes from './routes/v1/turno.routes.js';
import pacienteRoutes from './routes/v1/paciente.routes.js';
import adminRoutes from './routes/v1/admin.routes.js';

import medicoEspecialidadRoutes from './routes/v1/medicoEspecialidad.routes.js';
import medicoObraSocialRoutes from './routes/v1/medicoObraSocial.routes.js';
import pacienteObraSocialRoutes from './routes/v1/pacienteObraSocial.routes.js';
import turnoAdminRoutes from './routes/v1/turnoAdmin.routes.js';
import estadisticasRoutes from './routes/v1/estadisticas.routes.js';
import turnosMedicoRoutes from './routes/v1/turnosMedico.routes.js';
import reporteRoutes from './routes/v1/reporte.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/turnos', turnoRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/turnos-medico', turnosMedicoRoutes);
const PORT = process.env.PORT || 3000;

app.use('/api/v1/medicos-especialidades', medicoEspecialidadRoutes);
app.use('/api/v1/medicos-obras-sociales', medicoObraSocialRoutes);
app.use('/api/v1/pacientes-obras-sociales', pacienteObraSocialRoutes);
app.use('/api/v1/admin/turnos', turnoAdminRoutes);
app.use('/api/v1/estadisticas', estadisticasRoutes);
app.use('/api/v1/reportes', reporteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
