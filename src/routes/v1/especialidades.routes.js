/**
 * @swagger
 * tags:
 *   - name: Especialidades
 *     description: Gestión de especialidades médicas
 */

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     summary: Listar especialidades
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *   post:
 *     summary: Crear especialidad (solo admin)
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Especialidad creada
 *       403:
 *         description: Acceso denegado
 */

/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   get:
 *     summary: Obtener especialidad por ID
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *       404:
 *         description: Especialidad no encontrada
 *   put:
 *     summary: Editar especialidad (solo admin)
 *     tags: [Especialidades]
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
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 *       404:
 *         description: Especialidad no encontrada
 */

import express from 'express';
import * as especialidadCtrl from '../../controllers/especialidades.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.get('/', verificarToken, authorize(1, 2, 3), especialidadCtrl.getAll);
router.get('/:id', verificarToken, authorize(1, 2, 3), especialidadCtrl.getOne);
router.post('/', verificarToken, soloAdmin, validate, especialidadCtrl.crear);
router.put('/:id', verificarToken, soloAdmin, validate, especialidadCtrl.editar);

export default router;
