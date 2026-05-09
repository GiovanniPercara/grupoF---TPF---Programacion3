import pool from '../config/db.js';

// LISTAR TODOS
const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM v_pacientes'
  );

  return rows;
};

// BUSCAR POR ID PACIENTE
const findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM v_pacientes WHERE id_paciente = ?',
    [id]
  );

  return rows[0] || null;
};

// BUSCAR POR ID USUARIO
const findByUsuarioId = async (id_usuario) => {
  const [rows] = await pool.query(
    'SELECT id_paciente FROM pacientes WHERE id_usuario = ?',
    [id_usuario]
  );

  return rows[0] || null;
};

// CREAR
const save = async (datos) => {
  const { id_usuario, id_obra_social } = datos;

  const [result] = await pool.query(
    'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)',
    [id_usuario, id_obra_social]
  );

  return result.insertId;
};

// EDITAR
const update = async (id, datos) => {
  const { id_obra_social } = datos;

  const [result] = await pool.query(
    'UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?',
    [id_obra_social, id]
  );

  return result.affectedRows > 0;
};

// DELETE LOGICO
const softDelete = async (id) => {
  const sql = `
    UPDATE usuarios u
    JOIN pacientes p ON u.id_usuario = p.id_usuario
    SET u.activo = 0
    WHERE p.id_paciente = ?
  `;

  const [result] = await pool.query(sql, [id]);

  return result.affectedRows > 0;
};

export {
  findAll,
  findById,
  findByUsuarioId,
  save,
  update,
  softDelete
};