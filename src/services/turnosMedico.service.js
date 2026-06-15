import * as turnosRepository from '../repositories/turnosMedico.repository.js';

const getTurnosMedico = async (id_usuario) => {
  const medico = await turnosRepository.findMedicoByUsuarioId(id_usuario);
  if (!medico) throw { status: 404, message: 'Médico no encontrado' };
  return await turnosRepository.obtenerTurnosPorMedico(medico.id_medico);
};

const atenderTurno = async (turnoId, id_usuario) => {
  const medico = await turnosRepository.findMedicoByUsuarioId(id_usuario);
  if (!medico) throw { status: 404, message: 'Médico no encontrado' };

  const turno = await turnosRepository.buscarTurnoPorId(turnoId);
  if (!turno) throw { status: 404, message: 'Turno no encontrado' };

  if (turno.id_medico !== medico.id_medico) {
    throw { status: 403, message: 'No autorizado para este turno' };
  }

  if (turno.atendido === 1) {
    throw { status: 400, message: 'El turno ya fue atendido' };
  }

  await turnosRepository.marcarTurnoAtendido(turnoId);
  return { message: 'Turno marcado como atendido' };
};

export {
  getTurnosMedico,
  atenderTurno
};