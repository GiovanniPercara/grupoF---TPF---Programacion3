import pool from '../config/db.js';

const getEstadisticasAtenciones = async () => {
  const [rows] = await pool.query(`CALL sp_estadisticas_atenciones()`);
  return rows[0];
};

const getEstadisticasPorMedico = async () => {
  const [rows] = await pool.query(`CALL sp_estadisticas_por_medico()`);
  return rows[0];
};

const getEstadisticasPorObraSocial = async () => {
  const [rows] = await pool.query(`CALL sp_estadisticas_por_obra_social()`);
  return rows[0];
};

export {
  getEstadisticasAtenciones,
  getEstadisticasPorMedico,
  getEstadisticasPorObraSocial
};
