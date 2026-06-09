import express from 'express';

import { asociarMedicoObraSocialController } from '../../controllers/medicoObraSocial.controller.js';
import { asociarMedicoObraSocialValidator } from '../../middlewares/medicoObraSocial.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

// POST /api/v1/medicos-obras-sociales
router.post(
  '/',
  verificarToken,
  authorize(3),
  asociarMedicoObraSocialValidator,
  validate,
  asociarMedicoObraSocialController
);

export default router;