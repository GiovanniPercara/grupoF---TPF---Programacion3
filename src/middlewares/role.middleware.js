const authorize = (...rolesPermitidos) => {

  return (req, res, next) => {

    if (!rolesPermitidos.includes(req.usuario.rol)) {

      return res.status(403).json({
        ok: false,
        error: 'No tiene autorización'
      });

    }

    next();
  };
};

export { authorize };