/**
 * @swagger
 * tags:
 *   - name: ObrasSociales
 *     description: Gestión de obras sociales y asociaciones con médicos y pacientes (solo admin)
 */

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     summary: Listar obras sociales
 *     tags: [ObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 *   post:
 *     summary: Crear obra social
 *     tags: [ObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, descripcion, porcentaje_descuento, es_particular]
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       201:
 *         description: Obra social creada
 */

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   put:
 *     summary: Editar obra social
 *     tags: [ObrasSociales]
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
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       200:
 *         description: Obra social actualizada
 *       404:
 *         description: Obra social no encontrada
 */

/**
 * @swagger
 * /api/v1/obras-sociales/{id}/medicos:
 *   post:
 *     summary: Asociar un médico a una obra social
 *     tags: [ObrasSociales]
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
 *             required: [id_medico]
 *             properties:
 *               id_medico:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Médico asociado a la obra social
 *       404:
 *         description: Médico u obra social no encontrado
 *       409:
 *         description: El médico ya está asociado a esa obra social
 */

/**
 * @swagger
 * /api/v1/obras-sociales/{id}/pacientes:
 *   post:
 *     summary: Asociar un paciente a una obra social
 *     tags: [ObrasSociales]
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
 *             required: [id_paciente]
 *             properties:
 *               id_paciente:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Paciente asociado a la obra social
 *       404:
 *         description: Paciente u obra social no encontrado
 */

import express from 'express';
import {
  listarObrasSocialesController,
  crearObraSocialController,
  editarObraSocialController,
  asociarMedicoObraSocialController,
  asociarPacienteObraSocialController,
} from '../../controllers/obrasSociales.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import {
  obraSocialValidator,
  asociarMedicoObraSocialValidator,
  asociarPacienteObraSocialValidator,
} from '../../middlewares/obrasSociales.validator.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.use(verificarToken);
router.use(soloAdmin);

router.get('/', listarObrasSocialesController);
router.post('/', obraSocialValidator, validate, crearObraSocialController);
router.put('/:id', obraSocialValidator, validate, editarObraSocialController);
router.post('/:id/medicos', asociarMedicoObraSocialValidator, validate, asociarMedicoObraSocialController);
router.post('/:id/pacientes', asociarPacienteObraSocialValidator, validate, asociarPacienteObraSocialController);

export default router;
