import express from 'express';

import { asociarPacienteObraSocialController } from '../../controllers/pacienteObraSocial.controller.js';
import { asociarPacienteObraSocialValidator } from '../../middlewares/pacienteObraSocial.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();


router.put(
  '/',
  verificarToken,
  authorize(3),
  asociarPacienteObraSocialValidator,
  validate,
  asociarPacienteObraSocialController
);

export default router;
