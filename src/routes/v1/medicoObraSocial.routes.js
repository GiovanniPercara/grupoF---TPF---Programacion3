/**
 * @swagger
 * tags:
 * name: Medico Obra Social
 * description: Coberturas médicas de profesionales
 */

/**
 * @swagger
 * /api/v1/medico-obra-social:
 * post:
 * summary: Asociar obra social a un médico
 * tags: [Medico Obra Social]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - id_medico
 * - id_obra_social
 * properties:
 * id_medico:
 * type: number
 * id_obra_social:
 * type: number
 * responses:
 * 201:
 * description: Obra social asociada al médico correctamente
 */
import express from 'express';

import { asociarMedicoObraSocialController } from '../../controllers/medicoObraSocial.controllers.js';
import { asociarMedicoObraSocialValidator } from '../../middlewares/medicoObraSocial.validator.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.post(
  '/',
  verificarToken,
  soloAdmin,
  asociarMedicoObraSocialValidator,
  validate,
  asociarMedicoObraSocialController
);

export default router;