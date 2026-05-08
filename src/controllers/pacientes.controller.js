import * as pService from '../services/paciente.service.js';

export const getAll = async (req, res) => {
  try {
    const pacientes = await pService.listarTodo();
    res.status(200).json({ ok: true, pacientes });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const paciente = await pService.buscarPorId(req.params.id);
    paciente 
      ? res.status(200).json({ ok: true, paciente }) 
      : res.status(404).json({ ok: false, mensaje: 'Paciente no encontrado' });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const id = await pService.agregar(req.body);
    res.status(201).json({ ok: true, mensaje: 'Paciente creado', id_paciente: id });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const exito = await pService.eliminarLogico(req.params.id);
    exito 
      ? res.status(200).json({ ok: true, mensaje: 'Borrado lógico realizado' }) 
      : res.status(404).json({ ok: false, mensaje: 'Paciente no encontrado' });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};