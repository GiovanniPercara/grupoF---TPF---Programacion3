/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Gestión administrativa
 */

/**
 * @swagger
 * /api/v1/admin/obras-sociales:
 *   get:
 *     summary: Listar obras sociales
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 *   post:
 *     summary: Crear obra social
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Obra social creada
 */

/**
 * @swagger
 * /api/v1/admin/obras-sociales/{id}:
 *   put:
 *     summary: Editar obra social
 *     tags:
 *       - Admin
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
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Obra social actualizada
 */

/**
 * @swagger
 * /api/v1/admin/especialidades:
 *   get:
 *     summary: Listar especialidades
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *   post:
 *     summary: Crear especialidad
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Especialidad creada
 */

/**
 * @swagger
 * /api/v1/admin/especialidades/{id}:
 *   put:
 *     summary: Editar especialidad
 *     tags:
 *       - Admin
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
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 */

import express from 'express';

import {
  listarObrasSocialesController,
  crearObraSocialController,
  editarObraSocialController,
  asociarMedicoObraSocialController,
  asociarPacienteObraSocialController,
  listarEspecialidadesController,
  crearEspecialidadController,
  editarEspecialidadController
} from '../../controllers/admin.controllers.js';

import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';

import {
  obraSocialValidator,
  asociarMedicoObraSocialValidator,
  asociarPacienteObraSocialValidator,
  especialidadValidator
} from '../../middlewares/admin.validator.js';

import validate from '../../middlewares/validate.js';

const router = express.Router();

router.use(verificarToken);
router.use(soloAdmin);

// OBRAS SOCIALES
router.get('/obras-sociales', listarObrasSocialesController);
router.post('/obras-sociales', obraSocialValidator, validate, crearObraSocialController);
router.put('/obras-sociales/:id', obraSocialValidator, validate, editarObraSocialController);
router.post('/obras-sociales/:id/medicos', asociarMedicoObraSocialValidator, validate, asociarMedicoObraSocialController);
router.post('/obras-sociales/:id/pacientes', asociarPacienteObraSocialValidator, validate, asociarPacienteObraSocialController);

// ESPECIALIDADES
router.get('/especialidades', listarEspecialidadesController);
router.post('/especialidades', especialidadValidator, validate, crearEspecialidadController);
router.put('/especialidades/:id', especialidadValidator, validate, editarEspecialidadController);

export default router;