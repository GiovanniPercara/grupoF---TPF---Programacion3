import { check } from 'express-validator';

export const especialidadValidator = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 120 }).withMessage('El nombre debe tener entre 3 y 120 caracteres')
    .trim(),
];
