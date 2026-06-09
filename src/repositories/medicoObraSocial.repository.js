import pool from '../config/db.js';

const findMedicoById = async (id_medico) => {
  const [rows] = await pool.query(
    `SELECT id_medico FROM medicos WHERE id_medico = ? AND activo = 1`,
    [id_medico]
  );
  return rows[0] || null;
};

const findObraSocialById = async (id_obra_social) => {
  const [rows] = await pool.query(
    `SELECT id_obra_social FROM obras_sociales WHERE id_obra_social = ? AND activo = 1`,
    [id_obra_social]
  );
  return rows[0] || null;
};

// Verifica si ya están asociados para no duplicar
const findAsociacion = async (id_medico, id_obra_social) => {
  const [rows] = await pool.query(
    `SELECT id_medico_obra_social FROM medicos_obras_sociales
     WHERE id_medico = ? AND id_obra_social = ? AND activo = 1`,
    [id_medico, id_obra_social]
  );
  return rows[0] || null;
};

const asociar = async (id_medico, id_obra_social) => {
  const [result] = await pool.query(
    `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo)
     VALUES (?, ?, 1)`,
    [id_medico, id_obra_social]
  );
  return result.insertId;
};

export {
  findMedicoById,
  findObraSocialById,
  findAsociacion,
  asociar
};
