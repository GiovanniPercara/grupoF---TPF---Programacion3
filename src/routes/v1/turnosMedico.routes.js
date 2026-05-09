import express from 'express';

import {misTurnos, atenderTurno} from '../../controllers/turnosMedico.controller.js';

import { verificarToken } from '../../middlewares/auth.middleware.js';

import {authorize} from '../../middlewares/role.middleware.js';

const router = express.Router();

// Obtener turnos propios
router.get(
  '/mis-turnos',
  verificarToken,
  authorize(1),
  misTurnos
);

// Marcar turno como atendido
router.patch(
  '/:id/atender',
  verificarToken,
  authorize(1),
  atenderTurno
);

export default router;