import { Router } from 'express';
import * as reporteCtrl from '../../controllers/reporte.controller.js';
import { verificarToken } from '../../middlewares/auth.middleware.js';

const router = Router();

// Endpoint para descargar el reporte de un paciente
router.get('/paciente/:id', verificarToken, reporteCtrl.getReportePaciente);

export default router;
