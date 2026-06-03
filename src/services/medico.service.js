import * as medicoRepo from '../repositories/medicos.repository.js';

export const listarTodo = async () => {
  return await medicoRepo.findAll();
};

export const listarPorEspecialidad = async (id_especialidad) => {
  return await medicoRepo.findByEspecialidad(id_especialidad);
};