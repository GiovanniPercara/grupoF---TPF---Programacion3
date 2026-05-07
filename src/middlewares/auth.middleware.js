import jwt from 'jsonwebtoken';
const verificarToken = (req, res, next) => {

  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ ok: false, error: 'Token requerido' });
  }

  try {
    // Verificar token y guardar datos en req.usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id_usuario, rol }
    next();

  } catch (error) {
    return res.status(401).json({ ok: false, error: 'Token inválido o expirado' });
  }
};

export { verificarToken };