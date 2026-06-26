import * as adminRepository from '../repositories/admin.repository.js';

// OBRAS SOCIALES

const listarObrasSociales = async () => {
  return await adminRepository.findAllObrasSociales();
};

const crearObraSocial = async (obraSocial) => {
  return await adminRepository.createObraSocial(obraSocial);
};

const editarObraSocial = async (
  id_obra_social,
  obraSocial
) => {

  const actualizado =
    await adminRepository.updateObraSocial(
      id_obra_social,
      obraSocial
    );

  if (!actualizado) {
    throw new Error('Obra social no encontrada');
  }

  return actualizado;
};

const asociarMedicoObraSocial = async (id_medico, id_obra_social) => {

  const medico = await adminRepository.findMedicoById();
  if (!medico) throw new Error('Médico no encontrado');

  const obraSocial = await adminRepository.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  // Evita registros duplicados
  const yaAsociado = await adminRepository.findAsociacion(id_medico, id_obra_social);
  if (yaAsociado) throw new Error('El médico ya está asociado a esa obra social');

  const id = await adminRepository.asociar(id_medico, id_obra_social);

  return { id_medico_obra_social: id, id_medico, id_obra_social };
};

const asociarPacienteObraSocial = async (id_paciente, id_obra_social) => {

  const paciente = await adminRepository.findPacienteById(id_paciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const obraSocial = await adminRepository.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  const exito = await adminRepository.actualizarObraSocial(id_paciente, id_obra_social);
  if (!exito) throw new Error('No se pudo actualizar la obra social del paciente');

  return { id_paciente, id_obra_social };
};


// ESPECIALIDADES

const listarEspecialidades = async () => {
  return await adminRepository.findAllEspecialidades();
};

const crearEspecialidad = async (
  especialidad
) => {
  return await adminRepository.createEspecialidad(
    especialidad
  );
};

const editarEspecialidad = async (
  id_especialidad,
  especialidad
) => {

  const actualizado =
    await adminRepository.updateEspecialidad(
      id_especialidad,
      especialidad
    );

  if (!actualizado) {
    throw new Error(
      'Especialidad no encontrada'
    );
  }

  return actualizado;
};

export {
  listarObrasSociales,
  crearObraSocial,
  editarObraSocial,
  asociarMedicoObraSocial,
  asociarPacienteObraSocial,
  listarEspecialidades,
  crearEspecialidad,
  editarEspecialidad
};