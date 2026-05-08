import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/v1/auth.routes.js';
import turnoRoutes from './routes/v1/turno.routes.js';
import pacienteRoutes from './routes/v1/paciente.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/turnos', turnoRoutes);
app.use('/api/pacientes', pacienteRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});