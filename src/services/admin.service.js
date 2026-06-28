import * as adminRepository from '../repositories/admin.repository.js';

export const listarObrasSociales = async () => {
  return await adminRepository.findAllObrasSociales();
};

export const crearObraSocial = async (obraSocial) => {
  return await adminRepository.createObraSocial(obraSocial);
};

export const editarObraSocial = async (id_obra_social, obraSocial) => {
  const actualizado = await adminRepository.updateObraSocial(id_obra_social, obraSocial);
  if (!actualizado) throw new Error('Obra social no encontrada');
  return actualizado;
};

export const asociarMedicoObraSocial = async (id_medico, id_obra_social) => {
  const medico = await adminRepository.findMedicoById(id_medico);
  if (!medico) throw new Error('Médico no encontrado');

  const obraSocial = await adminRepository.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const yaAsociado = await adminRepository.findAsociacion(id_medico, id_obra_social);
  if (yaAsociado) throw new Error('El médico ya está asociado a esa obra social');

  const id = await adminRepository.asociar(id_medico, id_obra_social);
  return { id_medico_obra_social: id, id_medico, id_obra_social };
};

export const asociarPacienteObraSocial = async (id_paciente, id_obra_social) => {
  const paciente = await adminRepository.findPacienteById(id_paciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const obraSocial = await adminRepository.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const exito = await adminRepository.actualizarObraSocial(id_paciente, id_obra_social);
  if (!exito) throw new Error('No se pudo actualizar la obra social del paciente');

  return { id_paciente, id_obra_social };
};