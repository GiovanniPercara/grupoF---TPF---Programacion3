import { check } from 'express-validator';

const registerValidator = [

    check('documento')
    .notEmpty().withMessage('El documento es obligatorio')
    .isNumeric().withMessage('El documento debe contener solo números')
    .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener entre 7 y 8 dígitos')
    .trim(),

    check('nombres')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isAlpha('es-ES').withMessage('El nombre solo debe contener letras')
    .trim(),

    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isAlpha('es-ES').withMessage('El apellido solo debe contener letras')
    .trim(),
    
    check('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail()
    .bail(),
    
    check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .withMessage('Debe tener mayúsculas, números y símbolos')

];

const loginValidator = [
  check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

export {
  registerValidator,
  loginValidator
};