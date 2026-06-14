import pool from '../config/db.js';

const findPacienteById = async (id_paciente) => {
  const [rows] = await pool.query(
    `SELECT id_paciente FROM pacientes WHERE id_paciente = ?`,
    [id_paciente]
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

const actualizarObraSocial = async (id_paciente, id_obra_social) => {
  const [result] = await pool.query(
    `UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?`,
    [id_obra_social, id_paciente]
  );
  return result.affectedRows > 0;
};

export {
  findPacienteById,
  findObraSocialById,
  actualizarObraSocial
};
