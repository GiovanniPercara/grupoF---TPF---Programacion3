import express from 'express';

import { asociarMedicoObraSocialController } from '../../controllers/medicoObraSocial.controllers.js';
import { asociarMedicoObraSocialValidator } from '../../middlewares/medicoObraSocial.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();


router.post(
  '/',
  verificarToken,
  soloAdmin,
  asociarMedicoObraSocialValidator,
  validate,
  asociarMedicoObraSocialController
);

export default router;