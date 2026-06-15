import express from 'express';
import * as especialidadCtrl from '../../controllers/especialidades.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', verificarToken, authorize(2, 3), especialidadCtrl.getAll);
router.get('/:id', verificarToken, authorize(2, 3), especialidadCtrl.getOne);

export default router;