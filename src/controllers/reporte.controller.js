import * as reporteService from "../services/reporte.service.js";


export const getReportePaciente = async (req, res) => {
  try {
    const { id } = req.params;


    const { buffer, nombreArchivo } = await reporteService.generarReportePaciente(id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${nombreArchivo}"`);
    res.send(buffer);

  } catch (error) {

    const status = error.message === "El paciente no posee turnos registrados" ? 404 : 500;

    return res.status(status).json({
      ok: false,
      error: error.message,
    });
  }
};