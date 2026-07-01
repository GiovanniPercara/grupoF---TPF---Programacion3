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
<<<<<<< HEAD

const router = express.Router();

=======
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';

const router = express.Router();

// Gestión de pacientes: alta, listado, edición y baja lógica.
// Se restringe a Admin porque es la base para "Asociar pacientes con obras sociales",
// función exclusiva del rol Administrador según el enunciado.
router.use(verificarToken);
router.use(soloAdmin);

>>>>>>> nueva-rama-andrea
router.get('/', pacienteCtrl.getAll);
router.get('/:id', pacienteCtrl.getOne);
router.post('/', pacienteValidator, validate, pacienteCtrl.create);
router.put('/:id', pacienteValidator, validate, pacienteCtrl.edit);
router.delete('/:id', pacienteCtrl.remove);

export default router;
