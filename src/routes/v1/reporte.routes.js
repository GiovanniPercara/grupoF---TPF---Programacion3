/**
 * @swagger
 * tags:
 * name: Reportes
 * description: Descarga de documentos e informes clínicos
 */

/**
 * @swagger
 * /api/v1/reportes:
 * get:
 * summary: Descargar reporte en formato PDF con el historial general de la clínica usando un Stored Procedure
 * tags: [Reportes]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Archivo PDF del historial clínico generado exitosamente
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

router.get('/', verificarToken, reporteCtrl.getReporteGeneral);

router.get('/paciente/:id', verificarToken, reporteCtrl.getReportePaciente);

export default router;