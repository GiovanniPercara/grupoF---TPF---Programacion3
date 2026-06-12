/**
 * @swagger
 * tags:
 * name: Estadísticas
 * description: Métricas globales del sistema accesibles para el rol Admin
 */

/**
 * @swagger
 * /api/v1/estadisticas:
 * get:
 * summary: Obtener estadísticas generales de atenciones clínicas
 * tags: [Estadísticas]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Datos estadísticos globales recuperados
 */

/**
 * @swagger
 * /api/v1/estadisticas/medicos:
 * get:
 * summary: Obtener métricas y rendimiento filtrado por médico
 * tags: [Estadísticas]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Estadísticas de médicos cargadas
 */

/**
 * @swagger
 * /api/v1/estadisticas/obras-sociales:
 * get:
 * summary: Obtener volumen de uso discriminado por Obra Social
 * tags: [Estadísticas]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Métricas de obras sociales devueltas con éxito
 */
import express from 'express';

import {
  estadisticasAtencionesController,
  estadisticasPorMedicoController,
  estadisticasPorObraSocialController
} from '../../controllers/estadisticas.controller.js';

import { verificarToken } from '../../middlewares/auth.middleware.js';
import { soloAdmin } from '../../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', verificarToken, soloAdmin, estadisticasAtencionesController);
router.get('/medicos', verificarToken, soloAdmin, estadisticasPorMedicoController);
router.get('/obras-sociales', verificarToken, soloAdmin, estadisticasPorObraSocialController);

export default router;