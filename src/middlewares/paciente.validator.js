import { check } from 'express-validator';

export const pacienteValidator = [
  check('id_usuario')
    .notEmpty().withMessage('El ID de usuario es obligatorio')
    .isInt().withMessage('Debe ser un número entero'),
  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isInt().withMessage('Debe ser un número entero')
];