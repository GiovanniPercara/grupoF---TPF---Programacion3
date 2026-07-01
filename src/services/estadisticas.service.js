import * as estadisticasRepo from '../repositories/estadisticas.repository.js';

const obtenerEstadisticasAtenciones = async () => {
  return await estadisticasRepo.getEstadisticasAtenciones();
};

const obtenerEstadisticasPorMedico = async () => {
  return await estadisticasRepo.getEstadisticasPorMedico();
};

const obtenerEstadisticasPorObraSocial = async () => {
  return await estadisticasRepo.getEstadisticasPorObraSocial();
};

export {
  obtenerEstadisticasAtenciones,
  obtenerEstadisticasPorMedico,
  obtenerEstadisticasPorObraSocial
};
