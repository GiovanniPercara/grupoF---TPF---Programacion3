import pool from '../config/db.js';

const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM especialidades WHERE activo = 1'
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1',
    [id]
  );
  return rows[0] || null;
};

export { findAll, findById };