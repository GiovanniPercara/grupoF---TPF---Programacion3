import express from 'express';

import {crearTurnoController,listarTurnosController} from '../../controllers/turno.controller.js';
import {crearTurnoValidator} from '../../middlewares/turno.validator.js';
import {verificarToken} from '../../middlewares/auth.middleware.js';

import validate from '../../middlewares/validate.js';

const router = express.Router();

// POST /api/turnos — crear turno
router.post('/',verificarToken,crearTurnoValidator,validate,crearTurnoController);

// GET /api/turnos — listar turnos propios
router.get('/',verificarToken,listarTurnosController);

export default router;