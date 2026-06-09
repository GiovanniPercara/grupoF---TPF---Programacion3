import * as turnoAdminRepo from '../repositories/turnoAdmin.repository.js';

const registrarTurnoAdmin = async ({ id_medico, id_paciente, id_obra_social, fecha_hora }) => {

  const medico = await turnoAdminRepo.findMedicoById(id_medico);
  if (!medico) throw new Error('Médico no encontrado');

  const paciente = await turnoAdminRepo.findPacienteById(id_paciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const obraSocial = await turnoAdminRepo.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const turnoExiste = await turnoAdminRepo.findTurnoExistente(id_medico, fecha_hora);
  if (turnoExiste) throw new Error('El médico ya tiene un turno en ese horario');

  let valor_total;
  if (obraSocial.es_particular === 1) {
    valor_total = medico.valor_consulta;
  } else {
    valor_total = medico.valor_consulta - (obraSocial.porcentaje_descuento * medico.valor_consulta);
  }

  const id_turno_reserva = await turnoAdminRepo.createTurnoAdmin({
    id_medico,
    id_paciente,
    id_obra_social,
    fecha_hora,
    valor_total
  });

  return {
    id_turno_reserva,
    id_medico,
    id_paciente,
    id_obra_social,
    fecha_hora,
    valor_total,
    atentido: 0
  };
};

export {
  registrarTurnoAdmin
};
