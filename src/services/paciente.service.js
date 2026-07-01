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
  const existe = await pacienteRepo.findById(id);
  if (!existe) throw new Error('Paciente no encontrado');

  return await pacienteRepo.update(id, datos);
};

export const eliminarLogico = async (id) => {
  const existe = await pacienteRepo.findById(id);
  if (!existe) throw new Error('Paciente no encontrado');

  return await pacienteRepo.softDelete(id);
};


<<<<<<< HEAD
export const asignarObraSocial = async (id_paciente, id_obra_social) => {
  const existe = await pacienteRepo.findById(id_paciente);
  if (!existe) throw new Error('Paciente no encontrado');

  return await pacienteRepo.assignObraSocial(
    id_paciente,
    id_obra_social
  );
};
=======
>>>>>>> nueva-rama-andrea
