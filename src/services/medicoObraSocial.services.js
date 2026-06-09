import * as medicoObraSocialRepo from '../repositories/medicoObraSocial.repository.js';

const asociarMedicoObraSocial = async (id_medico, id_obra_social) => {

  const medico = await medicoObraSocialRepo.findMedicoById(id_medico);
  if (!medico) throw new Error('Médico no encontrado');

  const obraSocial = await medicoObraSocialRepo.findObraSocialById(id_obra_social);
  if (!obraSocial) throw new Error('Obra social no encontrada');

  // Evita registros duplicados
  const yaAsociado = await medicoObraSocialRepo.findAsociacion(id_medico, id_obra_social);
  if (yaAsociado) throw new Error('El médico ya está asociado a esa obra social');

  const id = await medicoObraSocialRepo.asociar(id_medico, id_obra_social);

  return { id_medico_obra_social: id, id_medico, id_obra_social };
};

export {
  asociarMedicoObraSocial
};
