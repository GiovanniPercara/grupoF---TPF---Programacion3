/**
 * @swagger
 * tags:
 *   - name: Pacientes
 *     description: Gestión de pacientes
 */

/**
 * @swagger
 * /api/v1/pacientes:
 *   get:
 *     summary: Listar pacientes
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *   post:
 *     summary: Crear paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_usuario, id_obra_social]
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_obra_social:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Paciente creado
 */

/**
 * @swagger
 * /api/v1/pacientes/{id}:
 *   get:
 *     summary: Obtener paciente por ID
 *     tags: [Pacientes]
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
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 *   put:
 *     summary: Editar paciente
 *     tags: [Pacientes]
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
 *         description: Paciente actualizado
 *   delete:
 *     summary: Eliminar paciente (soft delete)
 *     tags: [Pacientes]
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
 *         description: Paciente eliminado
 */

import express from 'express';
import * as pacienteCtrl from '../../controllers/paciente.controller.js';
import { pacienteValidator } from '../../middlewares/paciente.validator.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.get('/', pacienteCtrl.getAll);
router.get('/:id', pacienteCtrl.getOne);
router.post('/', pacienteValidator, validate, pacienteCtrl.create);
router.put('/:id', pacienteValidator, validate, pacienteCtrl.edit);
router.delete('/:id', pacienteCtrl.remove);

export default router;
