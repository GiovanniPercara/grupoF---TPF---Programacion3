import express from 'express';

import { registrarTurnoAdminController } from '../../controllers/turnoAdmin.controllers.js';
import { registrarTurnoAdminValidator } from '../../middlewares/turnoAdmin.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

// POST /api/v1/admin/turnos
router.post(
  '/',
  verificarToken,
  authorize(3),
  registrarTurnoAdminValidator,
  validate,
  registrarTurnoAdminController
);

export default router;

