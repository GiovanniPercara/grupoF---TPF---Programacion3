import express from 'express';

import {
  listarObrasSocialesController,
  crearObraSocialController,
  editarObraSocialController
} from '../../controllers/admin.controllers.js';

import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';

import {
  obraSocialValidator
} from '../../middlewares/admin.validator.js';

import validate from '../../middlewares/validate.js';

const router = express.Router();

router.use(verificarToken);
router.use(soloAdmin);



//// OBRAS SOCIALES ////

// LISTAR
router.get(
  '/obras-sociales',
  listarObrasSocialesController
);

// CREAR
router.post(
  '/obras-sociales',
  obraSocialValidator,
  validate,
  crearObraSocialController
);

// EDITAR
router.put(
  '/obras-sociales/:id',
  obraSocialValidator,
  validate,
  editarObraSocialController
);

//// ESPECIALIDADES ////

router.get(
  '/especialidades',
  listarEspecialidadesController
);

router.post(
  '/especialidades',
  especialidadValidator,
  validate,
  crearEspecialidadController
);

router.put(
  '/especialidades/:id',
  especialidadValidator,
  validate,
  editarEspecialidadController
);

export default router;