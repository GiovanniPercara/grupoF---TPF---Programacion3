import * as turnosRepository
from '../repositories/turnosMedico.repository.js';

const getTurnosMedico = async (medicoId) => {

  return await turnosRepository.obtenerTurnosPorMedico(
    medicoId
  );
};

const atenderTurno = async (
  turnoId,
  medicoId
) => {

  const turno =
    await turnosRepository.buscarTurnoPorId(
      turnoId
    );

  if (!turno) {

    throw {
      status: 404,
      message: 'Turno no encontrado'
    };
  }

  if (turno.id_medico !== medicoId) {

    throw {
      status: 403,
      message: 'No autorizado para este turno'
    };
  }

  if (turno.atendido === 1) {

    throw {
      status: 400,
      message: 'El turno ya fue atendido'
    };
  }

  await turnosRepository.marcarTurnoAtendido(
    turnoId
  );

  return {
    message: 'Turno marcado como atendido'
  };
};

export {
  getTurnosMedico,
  atenderTurno
};