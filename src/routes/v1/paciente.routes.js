import express from 'express';
import * as pCtrl from '../../controllers/paciente.controller.js';
import { pacienteValidator } from '../../middlewares/paciente.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

// obtiene todos los pacientes
router.get('/', verificarToken, pCtrl.getAll);

// Obtener un paciente por ID
router.get('/:id', verificarToken, pCtrl.getOne);

// Crea un nuevo paciente
router.post('/', verificarToken, pacienteValidator, validate, pCtrl.create);

// Elimina un paciente por ID 
router.delete('/:id', verificarToken, pCtrl.remove);

export default router;