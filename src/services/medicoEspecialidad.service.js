import * as medicoEspecialidadRepo from '../repositories/medicoEspecialidad.repository.js';

const asociarMedicoEspecialidad = async (id_medico, id_especialidad) => {

  // VERIFICA QUE EL MEDICO EXISTA
  const medico = await medicoEspecialidadRepo.findMedicoById(id_medico);
  if (!medico) throw new Error('Médico no encontrado');

  const exito = await medicoEspecialidadRepo.asociar(id_medico, id_especialidad);
  if (!exito) throw new Error('No se pudo asociar el médico con la especialidad');

  return exito;
};

export {
  asociarMedicoEspecialidad
};