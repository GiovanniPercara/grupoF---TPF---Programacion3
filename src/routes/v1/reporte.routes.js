import { Router } from "express";
import { getReportePaciente } from "../../controllers/reporte.controller.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/reportes/paciente/{id}:
 *   get:
 *     summary: Genera un reporte PDF de los turnos de un paciente
 *     description: Devuelve un archivo PDF con el detalle de todos los turnos asociados a un paciente específico.
 *     tags: [Reportes]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *
 *       401:
 *         description: No autorizado
 *
 *       404:
 *         description: El paciente no posee turnos registrados
 *
 *       500:
 *         description: Error interno del servidor
 */

router.get(
  "/paciente/:id",
  verificarToken,
  getReportePaciente
);

export default router;