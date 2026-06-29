import * as medicoRepo from '../repositories/medicos.repository.js';

export const listarTodo = async () => {
  return await medicoRepo.findAll();
};

export const listarPorEspecialidad = async (id_especialidad) => {
  return await medicoRepo.findByEspecialidad(id_especialidad);
};
export const actualizarEspecialidad = async (id_medico, id_especialidad) => {
  const actualizado = await medicoRepo.actualizarEspecialidad(id_medico, id_especialidad);
  if (!actualizado) throw new Error('Médico no encontrado');
  return actualizado;
};