import * as turnoRepository from '../repositories/turno.repository.js';

import * as pacienteRepository from '../repositories/paciente.repository.js';

const crearTurno = async ({
  id_medico,
  id_paciente_usuario,
  id_obra_social,
  fecha_hora,
  valor_total
}) => {

  const paciente = await pacienteRepository
    .findByUsuarioId(id_paciente_usuario);

  if (!paciente) {
    throw new Error('Paciente no encontrado');
  }

  const turnoExiste = await turnoRepository
    .findTurnoByMedicoAndFecha(
      id_medico,
      fecha_hora
    );

  if (turnoExiste) {
    throw new Error(
      'El médico ya tiene un turno en ese horario'
    );
  }

  const id_turno_reserva =
    await turnoRepository.createTurno({
      id_medico,
      id_paciente: paciente.id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total
    });

  return {
    id_turno_reserva,
    id_medico,
    id_paciente: paciente.id_paciente,
    id_obra_social,
    fecha_hora,
    valor_total,
    atendido: 0
  };
};

const listarTurnosPaciente = async (
  id_paciente_usuario
) => {

  const paciente = await pacienteRepository
    .findByUsuarioId(id_paciente_usuario);

  if (!paciente) {
    throw new Error('Paciente no encontrado');
  }

  return await turnoRepository
    .findTurnosByPaciente(
      paciente.id_paciente
    );
};

const editarTurno = async (
  id_turno_reserva,
  {
    id_medico,
    id_obra_social,
    fecha_hora
  }
) => {

  const turnoExiste = await turnoRepository
    .findTurnoByMedicoAndFecha(
      id_medico,
      fecha_hora
    );

  if (turnoExiste) {
    throw new Error(
      'El médico ya tiene un turno en ese horario'
    );
  }

  const actualizado =
    await turnoRepository.updateTurno(
      id_turno_reserva,
      {
        id_medico,
        id_obra_social,
        fecha_hora
      }
    );

  if (!actualizado) {
    throw new Error(
      'Turno no encontrado'
    );
  }

  return actualizado;
};

export {
  crearTurno,
  listarTurnosPaciente,
  editarTurno
};