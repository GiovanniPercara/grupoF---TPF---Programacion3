/**
 * @swagger
 * tags:
 *   - name: Turno Admin
 *     description: Gestión y altas globales de turnos por administrador
 */

/**
 * @swagger
 * /api/v1/turno-admin:
 *   post:
 *     summary: Registrar turno en el sistema como Administrador
 *     tags:
 *       - Turno Admin
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
 *               - fecha_hora
 *             properties:
 *               id_medico:
 *                 type: number
 *               fecha_hora:
 *                 type: string
 *                 example: "2026-06-11 10:00:00"
 *     responses:
 *       201:
 *         description: Turno de administración registrado
 */

import express from 'express';

import { registrarTurnoAdminController } from '../../controllers/turnoAdmin.controller.js';
import { registrarTurnoAdminValidator } from '../../middlewares/turnoAdmin.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.post(
  '/',
  verificarToken,
  soloAdmin,
  registrarTurnoAdminValidator,
  validate,
  registrarTurnoAdminController
);

export default router;