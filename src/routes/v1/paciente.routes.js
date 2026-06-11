/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gestión de pacientes
 */

/**
 * @swagger
 * /api/v1/pacientes:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *
 *   post:
 *     summary: Crear paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_obra_social
 *             properties:
 *               id_usuario:
 *                 type: number
 *               id_obra_social:
 *                 type: number
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *
 *   put:
 *     summary: Editar paciente
 *     tags: [Pacientes]
 *
 *   delete:
 *     summary: Eliminar paciente (soft delete)
 *     tags: [Pacientes]
 */
import express from 'express';
import * as pCtrl from '../../controllers/paciente.controller.js';
import { pacienteValidator } from '../../middlewares/paciente.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.get('/', pCtrl.getAll);

router.get('/:id', pCtrl.getOne);

router.post('/', pacienteValidator, validate, pCtrl.create);

router.put('/:id', pacienteValidator, validate, pCtrl.edit); 

router.delete('/:id', pCtrl.remove);

export default router;