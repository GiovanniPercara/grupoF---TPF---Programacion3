/**
 * @swagger
 * tags:
 * name: Paciente Obra Social
 * description: Gestión de obras sociales de pacientes
 */

/**
 * @swagger
 * /api/v1/paciente-obra-social:
 * put:
 * summary: Asociar u actualizar obra social de un paciente
 * tags: [Paciente Obra Social]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - id_paciente
 * - id_obra_social
 * - nro_afiliado
 * properties:
 * id_paciente:
 * type: number
 * id_obra_social:
 * type: number
 * nro_afiliado:
 * type: string
 * responses:
 * 200:
 * description: Asociación exitosa
 */
import express from 'express';

import { asociarPacienteObraSocialController } from '../../controllers/pacienteObraSocial.controller.js';
import { asociarPacienteObraSocialValidator } from '../../middlewares/pacienteObraSocial.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.put(
  '/',
  verificarToken,
  soloAdmin,
  asociarPacienteObraSocialValidator,
  validate,
  asociarPacienteObraSocialController
);

export default router;