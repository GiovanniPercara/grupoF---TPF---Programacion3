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

/**
 * @swagger
 * /api/v1/medicos/{id}/especialidad:
 *   put:
 *     summary: Actualizar especialidad de un médico (solo admin)
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_especialidad]
 *             properties:
 *               id_especialidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Especialidad actualizada correctamente
 *       404:
 *         description: Médico no encontrado
 */

import express from 'express';
import * as medicoCtrl from '../../controllers/medico.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', verificarToken, authorize(2, 3), medicoCtrl.getAll);
router.put('/:id/especialidad', verificarToken, soloAdmin, medicoCtrl.actualizarEspecialidad);

export default router;
