import * as authService from '../services/auth.service.js';

const loginController = async (req, res) => {

  try {

    const { email, password } = req.body;

    const resultado = await authService.login(email, password);

    res.json({
      ok: true,
      data: resultado
    });

  } catch (error) {

    res.status(401).json({
      ok: false,
      error: error.message
    });

  }

};

const registerController = async (req, res) => {
  try {
    const data = await authService.register(req.body);

    res.json({ ok: true, data });

  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    });
  }
};

export {
  loginController,
  registerController
};