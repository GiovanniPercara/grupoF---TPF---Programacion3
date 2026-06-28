import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './swagger.js';
import authRoutes from './routes/v1/auth.routes.js';
import especialidadesRoutes from './routes/v1/especialidades.routes.js';
import medicosRoutes from './routes/v1/medico.routes.js';
import pacientesRoutes from './routes/v1/paciente.routes.js';
import turnosRoutes from './routes/v1/turno.routes.js';
import turnosMedicoRoutes from './routes/v1/turnosMedico.routes.js';
import turnoAdminRoutes from './routes/v1/turnoAdmin.routes.js';
import adminRoutes from './routes/v1/admin.routes.js';
import estadisticasRoutes from './routes/v1/estadisticas.routes.js';
import reporteRoutes from './routes/v1/reporte.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.send('Servidor funcionando 🚀'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/especialidades', especialidadesRoutes);
app.use('/api/v1/medicos', medicosRoutes);
app.use('/api/v1/pacientes', pacientesRoutes);
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/turnos-medico', turnosMedicoRoutes);
app.use('/api/v1/admin/turnos', turnoAdminRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/estadisticas', estadisticasRoutes);
app.use('/api/v1/reportes', reporteRoutes);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));