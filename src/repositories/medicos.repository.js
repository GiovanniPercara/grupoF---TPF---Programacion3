import pool from '../config/db.js';

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM v_medicos');
  return rows;
};

const findByEspecialidad = async (id_especialidad) => {
  const [rows] = await pool.query(
    `SELECT v.* FROM v_medicos v
     JOIN medicos m ON v.id_medico = m.id_medico
     WHERE m.id_especialidad = ?`,
    [id_especialidad]
  );
  return rows;
};

const actualizarEspecialidad = async (id_medico, id_especialidad) => {
  const [result] = await pool.query(
    `UPDATE medicos SET id_especialidad = ? WHERE id_medico = ? AND activo = 1`,
    [id_especialidad, id_medico]
  );
  return result.affectedRows > 0;
};

export { findAll, findByEspecialidad, actualizarEspecialidad };