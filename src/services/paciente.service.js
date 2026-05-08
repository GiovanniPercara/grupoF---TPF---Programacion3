import * as pacienteRepo from '../repositories/paciente.repository.js';

/**
 * B - Browse: Listar todos los pacientes
 */
export const listarTodo = async () => {
  return await pacienteRepo.findAll();
};

/**
 * R - Read: Buscar un paciente por su ID
 */
export const buscarPorId = async (id) => {
  const paciente = await pacienteRepo.findById(id);
  return paciente;
};

/**
 * A - Add: Crear un nuevo registro de paciente
 */
export const agregar = async (datos) => {
  // Aquí podrías agregar lógica extra, como verificar si el usuario ya es paciente
  const existe = await pacienteRepo.findByUsuarioId(datos.id_usuario);
  if (existe) {
    throw new Error('El usuario ya tiene un perfil de paciente asignado');
  }
  
  return await pacienteRepo.save(datos);
};

/**
 * E - Edit: Actualizar datos (como la obra social)
 */
export const editar = async (id, datos) => {
  const exito = await pacienteRepo.update(id, datos);
  if (!exito) {
    throw new Error('No se pudo actualizar el paciente o no hubo cambios');
  }
  return exito;
};

/**
 * D - Delete: Realizar el borrado lógico
 */
export const eliminarLogico = async (id) => {
  const exito = await pacienteRepo.softDelete(id);
  return exito;
};