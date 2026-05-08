import pool from '../config/db.js';

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? AND activo = 1',
    [email]
  );
  return rows[0] || null;
};

const findByDocumento = async (documento) => {
  const [rows] = await pool.query(
    'SELECT id_usuario FROM usuarios WHERE documento = ?',
    [documento]
  );
  return rows[0] || null;
};

const createUsuario = async ({ documento, nombres, apellido, email, hash }) => {
  const [result] = await pool.query(
    `INSERT INTO usuarios (documento, nombres, apellido, email, contrasenia, foto_path, rol, activo)
     VALUES (?, ?, ?, ?, ?, '', 2, 1)`,
    [documento, nombres, apellido, email, hash]
  );
  return result.insertId;
};

export {
  findByEmail,
  findByDocumento,
  createUsuario
};