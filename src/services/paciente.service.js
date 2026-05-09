import * as pacienteRepo from '../repositories/paciente.repository.js';

export const listarTodo = async () => {
  return await pacienteRepo.findAll();
};

export const buscarPorId = async (id) => {
  const paciente = await pacienteRepo.findById(id);
  if (!paciente) throw new Error('Paciente no encontrado');
  return paciente;
};


export const agregar = async (datos) => {
  const id = await pacienteRepo.save(datos);
  return id;
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