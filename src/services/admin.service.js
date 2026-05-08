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

export {
  listarObrasSociales,
  crearObraSocial,
  editarObraSocial
};