import * as especialidadRepo from '../repositories/especialidades.repository.js';

export const listarTodo = async () => {
  return await especialidadRepo.findAll();
};

export const buscarPorId = async (id) => {
  const especialidad = await especialidadRepo.findById(id);
  if (!especialidad) throw new Error('Especialidad no encontrada');
  return especialidad;
};