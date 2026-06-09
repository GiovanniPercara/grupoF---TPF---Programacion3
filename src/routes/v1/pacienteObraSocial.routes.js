import express from 'express';

import { asociarPacienteObraSocialController } from '../../controllers/pacienteObraSocial.controller.js';
import { asociarPacienteObraSocialValidator } from '../../middlewares/pacienteObraSocial.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();


router.put(
  '/',
  verificarToken,
  soloAdmin,
  asociarPacienteObraSocialValidator,
  validate,
  asociarPacienteObraSocialController
);

export default router;
