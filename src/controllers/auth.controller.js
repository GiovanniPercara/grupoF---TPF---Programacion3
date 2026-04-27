const { login } = require('../services/auth.service');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await login(email, password);

    res.json({
      message: 'Login correcto',
      usuario
    });

  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { loginController };