/**
 * @swagger
 * tags:
 * name: Reportes
 * description: Descarga de documentos e informes clínicos
 */

/**
 * @swagger
 * /api/v1/reportes/paciente/{id}:
 * get:
 * summary: Descargar reporte en formato PDF de un paciente específico
 * tags: [Reportes]
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
 * description: Archivo PDF del reporte generado y descargado correctamente
 */
import { Router } from 'express';
import * as reporteCtrl from '../../controllers/reporte.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/paciente/:id', verificarToken, reporteCtrl.getReportePaciente);

export default router;