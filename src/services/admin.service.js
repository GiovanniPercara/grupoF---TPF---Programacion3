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
  listarEspecialidades,
  crearEspecialidad,
  editarEspecialidad
};