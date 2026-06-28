/**
 * @swagger
 * tags:
 *   - name: Médicos
 *     description: Consulta de médicos
 */

/**
 * @swagger
 * /api/v1/medicos:
 *   get:
 *     summary: Listar médicos (filtro opcional por especialidad)
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_especialidad
 *         schema:
 *           type: integer
 *         description: Filtrar por especialidad
 *     responses:
 *       200:
 *         description: Lista de médicos
 */

import express from 'express';
import * as medicoCtrl from '../../controllers/medico.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', verificarToken, authorize(2, 3), medicoCtrl.getAll);

export default router;
