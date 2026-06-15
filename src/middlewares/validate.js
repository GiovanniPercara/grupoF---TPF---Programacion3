import { validationResult } from 'express-validator';

const validate = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      ok: false,
      mensaje: 'Errores de validación',
      errores: errors.array()
});
  }

  next();
};


export default validate;