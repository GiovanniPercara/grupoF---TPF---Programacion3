import { check } from 'express-validator';

const registrarTurnoAdminValidator = [

  check('id_medico')
    .notEmpty().withMessage('El médico es obligatorio')
    .isNumeric().withMessage('El médico debe ser un número'),

  check('id_paciente')
    .notEmpty().withMessage('El paciente es obligatorio')
    .isNumeric().withMessage('El paciente debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número'),

  check('fecha_hora')
    .notEmpty().withMessage('La fecha y hora es obligatoria')
    .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DDTHH:MM:SS)')
];

export {
  registrarTurnoAdminValidator
};

