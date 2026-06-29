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

const create = async ({ nombre }) => {
  const [result] = await pool.query(
    'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)',
    [nombre]
  );
  return result.insertId;
};

const update = async (id, { nombre }) => {
  const [result] = await pool.query(
    'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1',
    [nombre, id]
  );
  return result.affectedRows > 0;
};

export { findAll, findById, create, update };