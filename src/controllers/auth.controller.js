import { login, register } from '../services/auth.service.js';

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await login(email, password);

    return res.status(200).json({
      ok: true,
      message: 'Login correcto',
      data: {
        usuario: resultado.usuario,
        token: resultado.token
      }
    });

  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ ok: false, error: error.message });
    }
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};


const registerController = async (req, res) => {
  try {
    // Si el usuario subió una foto, construimos la ruta para guardarla en la base de datos, si no, dejamos el campo vacío
    const fotoPath = req.file ? `/uploads/${req.file.filename}` : '';

    const { documento, nombres, apellido, email, password } = req.body;

    const usuario = await register({ 
      documento, 
      nombres, 
      apellido, 
      email, 
      password,
      foto_path: fotoPath 
    });

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      data: usuario
    });

  } catch (error) {
    if (error.message === 'El documento ya está registrado' ||
        error.message === 'El email ya está registrado') {
      return res.status(409).json({ ok: false, error: error.message });
    }
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

export { loginController, registerController };