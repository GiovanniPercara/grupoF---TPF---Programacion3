import express from 'express';

import { asociarMedicoEspecialidadController } from '../../controllers/medicoEspecialidad.controller.js';
import { asociarMedicoEspecialidadValidator } from '../../middlewares/medicoEspecialidad.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

// PUT /api/v1/medicos-especialidades
router.put(
  '/',
  verificarToken,
  soloAdmin,
  asociarMedicoEspecialidadValidator,
  validate,
  asociarMedicoEspecialidadController
);

export default router;

