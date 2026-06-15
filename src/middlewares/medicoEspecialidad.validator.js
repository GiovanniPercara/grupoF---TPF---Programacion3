import { check } from 'express-validator';

const asociarMedicoEspecialidadValidator = [

  check('id_medico')
    .notEmpty().withMessage('El médico es obligatorio')
    .isNumeric().withMessage('El médico debe ser un número'),

  check('id_especialidad')
    .notEmpty().withMessage('La especialidad es obligatoria')
    .isNumeric().withMessage('La especialidad debe ser un número')
];

export {
  asociarMedicoEspecialidadValidator
};
