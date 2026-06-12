/**
 * @swagger
 * tags:
 * name: Turnos Médico
 * description: Endpoints exclusivos de gestión médica para profesionales independientes
 */

/**
 * @swagger
 * /api/v1/turnos-medico/mis-turnos:
 * get:
 * summary: Obtener el listado de turnos asignados al médico logueado
 * tags: [Turnos Médico]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Agenda de turnos obtenida exitosamente
 */

/**
 * @swagger
 * /api/v1/turnos-medico/{id}/atender:
 * patch:
 * summary: Marcar un turno específico como Atendido
 * tags: [Turnos Médico]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Estado del turno modificado con éxito a atendido
 */
import express from 'express';

import {misTurnos, atenderTurno} from '../../controllers/turnosMedico.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import {authorize} from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/mis-turnos',
  verificarToken,
  authorize(1),
  misTurnos
);

router.patch(
  '/:id/atender',
  verificarToken,
  authorize(1),
  atenderTurno
);

export default router;