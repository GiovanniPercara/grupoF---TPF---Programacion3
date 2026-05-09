import { login, register } from '../services/auth.service.js';

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await login(email, password);

    return res.status(200).json({
      ok: true,
      data: {
      message: 'Login correcto',
      usuario: resultado.usuario,
      token: resultado.token
      }
    });

  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

const registerController = async (req, res) => {
  try {
    const { documento, nombres, apellido, email, password } = req.body;
    const usuario = await register({ documento, nombres, apellido, email, password });

    return res.status(201).json({
      ok: true,
      data: {
        message: 'Usuario registrado correctamente',
      usuario
      }
    });

  } catch (error) {
    if (error.message === 'El documento ya está registrado' ||
        error.message === 'El email ya está registrado') {
      return res.status(409).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export { loginController, registerController };