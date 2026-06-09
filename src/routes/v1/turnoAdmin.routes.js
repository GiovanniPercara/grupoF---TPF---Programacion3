import express from 'express';

import { registrarTurnoAdminController } from '../../controllers/turnoAdmin.controller.js';
import { registrarTurnoAdminValidator } from '../../middlewares/turnoAdmin.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

// POST /api/v1/admin/turnos
router.post(
  '/',
  verificarToken,
  soloAdmin,
  registrarTurnoAdminValidator,
  validate,
  registrarTurnoAdminController
);

export default router;

