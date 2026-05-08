import crypto from 'crypto';
import jwt from 'jsonwebtoken';


import {findByEmail,findByDocumento,createUsuario} from '../repositories/auth.repository.js';

const login = async (email, password) => {const usuario = await findByEmail(email);

  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  const hash = crypto
    .createHash('sha256')
    .update(password.trim())
    .digest('hex');

  if (hash !== usuario.contrasenia) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    {
      id_usuario: usuario.id_usuario,
      rol: usuario.rol
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '8h'
    }
  );

  const { contrasenia, ...usuarioSeguro } = usuario;

  return {
    usuario: usuarioSeguro,
    token
  };
};

const register = async ({
  documento,
  nombres,
  apellido,
  email,
  password
}) => {

  const docExiste = await findByDocumento(documento);

  if (docExiste) {
    throw new Error('El documento ya está registrado');
  }

  const emailExiste = await findByEmail(email);

  if (emailExiste) {
    throw new Error('El email ya está registrado');
  }

  const hash = crypto
    .createHash('sha256')
    .update(password.trim())
    .digest('hex');

  const id_usuario = await createUsuario({
    documento,
    nombres,
    apellido,
    email,
    hash
  });

  return {
    id_usuario,
    documento,
    nombres,
    apellido,
    email
  };
};

export {
  login,
  register
};