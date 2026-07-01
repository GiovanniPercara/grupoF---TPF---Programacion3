const soloAdmin = (req, res, next) => {

  if (!req.usuario) {

    return res.status(401).json({
      ok: false,
      error: 'Usuario no autenticado'
    });

  }

  if (req.usuario.rol !== 3) {

    return res.status(403).json({
      ok: false,
      error: 'Acceso permitido solo para administradores'
    });

  }

  next();
};

export {
  soloAdmin
};