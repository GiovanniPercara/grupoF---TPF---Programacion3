import pool from '../config/db.js';

const findByUsuarioId = async (id_usuario) => {
  const [rows] = await pool.query(
    'SELECT id_paciente FROM pacientes WHERE id_usuario = ?',
    [id_usuario]
  );
  return rows[0] || null;
};

export {
  findByUsuarioId
};