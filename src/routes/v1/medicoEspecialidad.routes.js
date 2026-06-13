/**
 * @swagger
 * tags:
 *   - name: Medico Especialidad
 *     description: Especialidades de profesionales médicos
 */

/**
 * @swagger
 * /api/v1/medico-especialidad:
 *   put:
 *     summary: Asociar especialidad a un médico
 *     tags:
 *       - Medico Especialidad
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - id_especialidad
 *             properties:
 *               id_medico:
 *                 type: number
 *               id_especialidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Especialidad vinculada con éxito
 */

import express from 'express';

import { asociarMedicoEspecialidadController } from '../../controllers/medicoEspecialidad.controller.js';
import { asociarMedicoEspecialidadValidator } from '../../middlewares/medicoEspecialidad.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.put(
  '/',
  verificarToken,
  soloAdmin,
  asociarMedicoEspecialidadValidator,
  validate,
  asociarMedicoEspecialidadController
);

export default router;