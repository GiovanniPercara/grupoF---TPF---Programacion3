import express from 'express';
import * as pCtrl from '../../controllers/paciente.controller.js';
import { pacienteValidator } from '../../middlewares/paciente.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.get('/', pCtrl.getAll);

router.get('/:id', pCtrl.getOne);

router.post('/', pacienteValidator, validate, pCtrl.create);

router.delete('/:id', pCtrl.remove);

export default router;