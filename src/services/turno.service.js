import * as turnoRepository from '../repositories/turno.repository.js';

import * as pacienteRepository from '../repositories/paciente.repository.js';
import * as medicoRepository from '../repositories/medicos.repository.js';
import * as obraSocialRepository from '../repositories/obrasSociales.repository.js';

const crearTurno = async ({
  id_medico,
  id_paciente_usuario,
  id_obra_social,
  fecha_hora
}) => {

  const paciente = await pacienteRepository
    .findByUsuarioId(id_paciente_usuario);

  if (!paciente) {
    throw new Error('Paciente no encontrado');
  }

  const medico = await medicoRepository.findById(id_medico);
  if (!medico) {
    throw new Error('Médico no encontrado');
  }

  const obraSocial = await obraSocialRepository.findById(id_obra_social);
  if (!obraSocial) {
    throw new Error('Obra social no encontrada');
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

  const valor_total = obraSocial.es_particular === 1
    ? medico.valor_consulta
    : medico.valor_consulta - (obraSocial.porcentaje_descuento * medico.valor_consulta);

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

export {
  crearTurno,
  listarTurnosPaciente
};