import { check } from 'express-validator';

const obraSocialValidator = [

  check('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 120 })
    .withMessage('El nombre debe tener entre 3 y 120 caracteres')
    .trim(),

  check('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ min: 2, max: 255 })
    .withMessage('La descripción debe tener entre 2 y 255 caracteres')
    .trim(),

  check('porcentaje_descuento')
    .notEmpty()
    .withMessage('El porcentaje de descuento es obligatorio')
    .isFloat({ min: 0, max: 100 })
    .withMessage('El porcentaje debe estar entre 0 y 100'),

  check('es_particular')
    .notEmpty()
    .withMessage('Debe indicar si es particular')
    .isIn([0, 1, true, false])
    .withMessage('es_particular debe ser 0 o 1')

];

const asociarMedicoObraSocialValidator = [

  check('id_medico')
    .notEmpty().withMessage('El médico es obligatorio')
    .isNumeric().withMessage('El médico debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número')
];

const asociarPacienteObraSocialValidator = [

  check('id_paciente')
    .notEmpty().withMessage('El paciente es obligatorio')
    .isNumeric().withMessage('El paciente debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número')
];

const especialidadValidator = [

  check('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 120 })
    .withMessage('El nombre debe tener entre 3 y 120 caracteres')
    .trim(),

  check('descripcion')
    .optional()
    .isLength({ max: 255 })
    .withMessage('La descripción no puede superar los 255 caracteres')
    .trim()

];

export {
  obraSocialValidator,
  asociarMedicoObraSocialValidator,
  asociarPacienteObraSocialValidator,
  especialidadValidator
};