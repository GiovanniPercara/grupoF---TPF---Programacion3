import express from 'express';

import { asociarMedicoEspecialidadController } from '../../controllers/medicoEspecialidad.controller.js';
import { asociarMedicoEspecialidadValidator } from '../../middlewares/medicoEspecialidad.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.put(
  '/',
  verificarToken,
  authorize(3),
  asociarMedicoEspecialidadValidator,
  validate,
  asociarMedicoEspecialidadController
);

export default router;

