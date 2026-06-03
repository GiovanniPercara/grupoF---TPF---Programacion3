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

export { findAll, findByEspecialidad };