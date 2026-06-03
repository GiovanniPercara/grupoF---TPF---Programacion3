import express from 'express';
import * as medicoCtrl from '../../controllers/medico.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', verificarToken, authorize(2, 3), medicoCtrl.getAll);

export default router;