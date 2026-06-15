import pool from '../config/db.js';

// VERIFICA QUE EL MEDICO EXISTA
const findMedicoById = async (id_medico) => {
  const [rows] = await pool.query(
    `SELECT id_medico FROM medicos WHERE id_medico = ? AND activo = 1`,
    [id_medico]
  );
  return rows[0] || null;
};

// ACTUALIZA ESPECIALIDAD
const asociar = async (id_medico, id_especialidad) => {
  const [result] = await pool.query(
    `UPDATE medicos SET id_especialidad = ?
     WHERE id_medico = ? AND activo = 1`,
    [id_especialidad, id_medico]
  );
  return result.affectedRows > 0;
};

export {
  findMedicoById,
  asociar
};