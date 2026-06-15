import { check } from 'express-validator';

const crearTurnoValidator = [check('id_medico')
    .notEmpty().withMessage('El médico es obligatorio')
    .isNumeric().withMessage('El médico debe ser un número'),

  check('id_obra_social')
    .notEmpty().withMessage('La obra social es obligatoria')
    .isNumeric().withMessage('La obra social debe ser un número'),

  check('fecha_hora')
    .notEmpty().withMessage('La fecha y hora es obligatoria')

    .isISO8601()
    .withMessage('Formato de fecha inválido')

    .custom((value) => {

      const fechaTurno = new Date(value);
      const ahora = new Date();

      if (fechaTurno <= ahora) {
        throw new Error(
          'La fecha del turno debe ser posterior a la actual'
        );
      }

      return true;
    }),

  check('valor_total')
    .notEmpty().withMessage('El valor total es obligatorio')
    .isDecimal().withMessage('El valor total debe ser un número decimal'),
];
const editarTurnoValidator = [ check('id_medico')
    .optional()
    .isNumeric()
    .withMessage('El médico debe ser un número'),

  check('id_obra_social')
    .optional()
    .isNumeric()
    .withMessage('La obra social debe ser un número'),

  check('fecha_hora')
    .optional()

    .isISO8601()
    .withMessage('Formato de fecha inválido')

    .custom((value) => {

      const fechaTurno = new Date(value);
      const ahora = new Date();

      if (fechaTurno <= ahora) {
        throw new Error(
          'La fecha del turno debe ser posterior a la actual'
        );
      }

      return true;
    })
];
export {
  crearTurnoValidator,
  editarTurnoValidator
};