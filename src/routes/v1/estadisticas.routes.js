import express from 'express';

import {
  estadisticasAtencionesController,
  estadisticasPorMedicoController,
  estadisticasPorObraSocialController
} from '../../controllers/estadisticas.controller.js';

import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', verificarToken, soloAdmin, estadisticasAtencionesController);

router.get('/medicos', verificarToken, soloAdmin, estadisticasPorMedicoController);

router.get('/obras-sociales', verificarToken, soloAdmin, estadisticasPorObraSocialController);

export default router;