import express from 'express';

import {
  crearTurnoController,
  listarTurnosController,
  editarTurnoController
}
from '../../controllers/turno.controller.js';

import {
  crearTurnoValidator,
  editarTurnoValidator
}
from '../../middlewares/turno.validator.js';

import {
  verificarToken,
  verificarRol
}
from '../../middlewares/auth.middleware.js';

import validate from '../../middlewares/validate.js';

const router = express.Router();


// RESERVAR TURNO pacientes
router.post('/',verificarToken,verificarRol(2),crearTurnoValidator,validate,crearTurnoController);

// EDITAR TURNO pacientes
router.put('/:id',verificarToken,verificarRol(2),editarTurnoValidator,validate,editarTurnoController);

// LISTAR TURNOS PROPIOS pacientes
router.get('/',verificarToken,verificarRol(2),listarTurnosController);

export default router;