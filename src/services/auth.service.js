const crypto = require('crypto');
const pool = require('../config/db');

const login = async (email, password) => {

  // 🔹 Buscar usuario
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? AND activo = 1',
    [email]
  );

  const usuario = rows[0];

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // 🔹 Generar hash
  const hash = crypto
    .createHash('sha256')
    .update(password.trim())
    .digest('hex');


  // 🔹 Comparar
  if (hash !== usuario.contrasenia) {
    throw new Error('Contraseña incorrecta');
  }

  return usuario;
};

module.exports = { login };