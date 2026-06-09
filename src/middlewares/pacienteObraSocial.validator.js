import { check } from 'express-validator';

const asociarPacienteObraSocialValidator = [

  check('id_paciente')
    .notEmpty().withMessage('El paciente es obligatorio')
    .isNumeric().withMessage('El paciente debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número')
];

export {
  asociarPacienteObraSocialValidator
};
