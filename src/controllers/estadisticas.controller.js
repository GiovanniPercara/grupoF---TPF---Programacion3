import {
  obtenerEstadisticasAtenciones,
  obtenerEstadisticasPorMedico,
  obtenerEstadisticasPorObraSocial
} from '../services/estadisticas.service.js';

const estadisticasAtencionesController = async (req, res) => {
  try {
    const datos = await obtenerEstadisticasAtenciones();
    return res.status(200).json({ ok: true, data: datos });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

const estadisticasPorMedicoController = async (req, res) => {
  try {
    const datos = await obtenerEstadisticasPorMedico();
    return res.status(200).json({ ok: true, data: datos });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

const estadisticasPorObraSocialController = async (req, res) => {
  try {
    const datos = await obtenerEstadisticasPorObraSocial();
    return res.status(200).json({ ok: true, data: datos });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export {
  estadisticasAtencionesController,
  estadisticasPorMedicoController,
  estadisticasPorObraSocialController
};
