import * as pacienteRepo from '../repositories/paciente.repository.js';

export const listarTodo = async () => {
  return await pacienteRepo.findAll();
};

export const buscarPorId = async (id_usuario) => {
  return await pacienteRepo.findByUsuarioId(id_usuario);
};

export const agregar = async (datos) => {
  // Lógica: No permitir crear un paciente si el usuario ya tiene perfil
  const existe = await pacienteRepo.findByUsuarioId(datos.id_usuario);
  if (existe) throw new Error('El usuario ya tiene un perfil de paciente');
  
  return await pacienteRepo.save(datos);
};

export const editar = async (id, datos) => {
  const exito = await pacienteRepo.update(id, datos);
  if (!exito) throw new Error('No se pudo actualizar o el paciente no existe');
  return exito;
};

export const eliminarLogico = async (id) => {
  const exito = await pacienteRepo.softDelete(id);
  if (!exito) throw new Error('Paciente no encontrado para eliminar');
  return exito;
};