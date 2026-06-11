/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: Gestión de turnos
 */

/**
 * @swagger
 * /api/v1/turnos:
 *   post:
 *     summary: Crear turno
 *     tags: [Turnos]
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
 *               - id_obra_social
 *               - fecha_hora
 *               - valor_total
 *             properties:
 *               id_medico:
 *                 type: number
 *               id_obra_social:
 *                 type: number
 *               fecha_hora:
 *                 type: string
 *                 example: "2026-06-11 10:00:00"
 *               valor_total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Turno creado
 */

/**
 * @swagger
 * /api/v1/turnos:
 *   get:
 *     summary: Listar turnos del paciente
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos
 */
import express from 'express';

import {crearTurnoController,listarTurnosController} from '../../controllers/turno.controller.js';
import {crearTurnoValidator} from '../../middlewares/turno.validator.js';
import {verificarToken} from '../../middlewares/auth.middleware.js';

import validate from '../../middlewares/validate.js';

const router = express.Router();

// POST /api/turnos — crear turno
router.post('/',verificarToken,crearTurnoValidator,validate,crearTurnoController);

// GET /api/turnos — listar turnos propios
router.get('/',verificarToken,listarTurnosController);

export default router;