import pool from '../config/db.js';

//APLICANDO BREAD PACIENTES - PRIMERA ENTREGA 
// Se enlista todos los pacientes
const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM v_pacientes');
  return rows;
};

//  Obtiene un solo paciente.
const findByUsuarioId = async (id_usuario) => {
  const [rows] = await pool.query(
    'SELECT id_paciente FROM pacientes WHERE id_usuario = ?',
    [id_usuario]
  );
  return rows[0] || null;
};
// Crear nuevo paciente
const save = async (datos) => {
  const { id_usuario, id_obra_social } = datos;
  const [result] = await pool.query(
    'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)',
    [id_usuario, id_obra_social]
  );
  return result.insertId;
};

// Modifica obra social del paciente
const update = async (id, datos) => {
  const { id_obra_social } = datos;
  const [result] = await pool.query(
    'UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?',
    [id_obra_social, id]
  );
  return result.affectedRows > 0;
};

// Borrado lógico (Soft Delete)
const softDelete = async (id) => {
  const sql = `UPDATE usuarios u 
               JOIN pacientes p ON u.id_usuario = p.id_usuario 
               SET u.activo = 0 WHERE p.id_paciente = ?`;
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
};
export {
  findByUsuarioId,
  findAll,
  save,
  update,
  softDelete
};