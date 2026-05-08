import { check } from 'express-validator';

const crearTurnoValidator = [

  check('id_medico')
    .notEmpty().withMessage('El médico es obligatorio')
    .isNumeric().withMessage('El médico debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número'),

  check('fecha_hora')
    .notEmpty().withMessage('La fecha y hora es obligatoria')
    .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DD HH:MM:SS)'),

  check('valor_total')
    .notEmpty().withMessage('El valor total es obligatorio')
    .isDecimal().withMessage('El valor total debe ser un número decimal'),
];

export {
  crearTurnoValidator
};