import { check } from 'express-validator';

const asociarMedicoObraSocialValidator = [

  check('id_medico')
    .notEmpty().withMessage('El médico es obligatorio')
    .isNumeric().withMessage('El médico debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número')
];

export {
  asociarMedicoObraSocialValidator
};
