import * as reporteService from "../services/reporte.service.js";

export const getReportePaciente = async (req, res) => {
  try {
    const { id } = req.params;

    await reporteService.generarReportePaciente(id, res);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};