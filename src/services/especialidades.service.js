import * as especialidadRepo from '../repositories/especialidades.repository.js';

export const listarTodo = async () => {
  return await especialidadRepo.findAll();
};

export const buscarPorId = async (id) => {
  const especialidad = await especialidadRepo.findById(id);
  if (!especialidad) throw new Error('Especialidad no encontrada');
  return especialidad;
};

export const crearEspecialidad = async (datos) => {
  return await especialidadRepo.create(datos);
};

export const editarEspecialidad = async (id, datos) => {
  const actualizado = await especialidadRepo.update(id, datos);
  if (!actualizado) throw new Error('Especialidad no encontrada');
  return actualizado;
};