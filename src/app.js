import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/v1/auth.routes.js';
import turnoRoutes from './routes/v1/turno.routes.js';
import pacienteRoutes from './routes/v1/paciente.routes.js';
import adminRoutes from './routes/v1/admin.routes.js';
import medicoEspecialidadRoutes from './routes/v1/medicoEspecialidad.routes.js';
// verificar que existan o corregir las rutas de los archivos importados
// import medicoObraSocialRoutes from './routes/v1/medicoObraSocial.routes.js';
import turnoAdminRoutes from './routes/v1/turnoAdmin.routes.js';
import estadisticasRoutes from './routes/v1/estadisticas.routes.js';
import turnosMedicoRoutes from './routes/v1/turnosMedico.routes.js';
import reporteRoutes from './routes/v1/reporte.routes.js';
import medicoRoutes from './routes/v1/medico.routes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/turnos', turnoRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/turnos-medico', turnosMedicoRoutes);
app.use('/api/v1/medicos-especialidades', medicoEspecialidadRoutes);
// app.use('/api/v1/medicos-obras-sociales', medicoObraSocialRoutes);
app.use('/api/v1/admin/turnos', turnoAdminRoutes);
app.use('/api/v1/estadisticas', estadisticasRoutes);
app.use('/api/v1/reportes', reporteRoutes);
app.use('/api/v1/medicos', medicoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});