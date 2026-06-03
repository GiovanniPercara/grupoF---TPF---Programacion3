import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/v1/auth.routes.js';
import turnoRoutes from './routes/v1/turno.routes.js';
import pacienteRoutes from './routes/v1/paciente.routes.js';
import turnosMedicoRoutes from './routes/v1/turnosMedico.routes.js';
import especialidadRoutes from './routes/v1/especialidades.routes.js';
import medicoRoutes from './routes/v1/medico.routes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/turnos', turnoRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/turnos-medico', turnosMedicoRoutes);
app.use('/api/v1/especialidades', especialidadRoutes);
app.use('/api/v1/medicos', medicoRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});