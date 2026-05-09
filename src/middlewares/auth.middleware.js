import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      error: 'Token requerido'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: 'Token requerido'
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      ok: false,
      error: 'Token inválido o expirado'
    });
  }
};



const verificarRol = (...rolesPermitidos) => {

  return (req, res, next) => {

    const rolUsuario = req.usuario.rol;

    if (!rolesPermitidos.includes(rolUsuario)) {

      return res.status(403).json({
        ok: false,
        error: 'Acceso denegado'
      });
    }

    next();
  };
};

export {
  verificarToken,
  verificarRol
};