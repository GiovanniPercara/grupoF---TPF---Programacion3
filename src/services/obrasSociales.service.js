import * as obraSocialRepo from '../repositories/obrasSociales.repository.js';
import * as medicoRepo from '../repositories/medicos.repository.js';
import * as pacienteRepo from '../repositories/paciente.repository.js';

export const listarObrasSociales = async () => {
  return await obraSocialRepo.findAll();
};

export const crearObraSocial = async (obraSocial) => {
  return await obraSocialRepo.create(obraSocial);
};

export const editarObraSocial = async (id_obra_social, obraSocial) => {
  const actualizado = await obraSocialRepo.update(id_obra_social, obraSocial);
  if (!actualizado) throw new Error('Obra social no encontrada');
  return actualizado;
};

export const asociarMedicoObraSocial = async (id_medico, id_obra_social) => {
  const medico = await medicoRepo.findById(id_medico);
  if (!medico) throw new Error('Médico no encontrado');

  const obraSocial = await obraSocialRepo.findById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const yaAsociado = await obraSocialRepo.findAsociacionMedico(id_medico, id_obra_social);
  if (yaAsociado) throw new Error('El médico ya está asociado a esa obra social');

  const id = await obraSocialRepo.asociarMedico(id_medico, id_obra_social);
  return { id_medico_obra_social: id, id_medico, id_obra_social };
};

export const asociarPacienteObraSocial = async (id_paciente, id_obra_social) => {
  const paciente = await pacienteRepo.findById(id_paciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const obraSocial = await obraSocialRepo.findById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const exito = await obraSocialRepo.asociarPaciente(id_paciente, id_obra_social);
  if (!exito) throw new Error('No se pudo actualizar la obra social del paciente');

  return { id_paciente, id_obra_social };
};
