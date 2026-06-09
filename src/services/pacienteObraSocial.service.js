import * as pacienteObraSocialRepo from '../repositories/pacienteObraSocial.repository.js';

const asociarPacienteObraSocial = async (id_paciente, id_obra_social) => {

  const paciente = await pacienteObraSocialRepo.findPacienteById(id_paciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const obraSocial = await pacienteObraSocialRepo.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const exito = await pacienteObraSocialRepo.actualizarObraSocial(id_paciente, id_obra_social);
  if (!exito) throw new Error('No se pudo actualizar la obra social del paciente');

  return { id_paciente, id_obra_social };
};

export {
  asociarPacienteObraSocial
};
