import * as especialidadService from '../services/especialidades.service.js';

export const getAll = async (req, res) => {
  try {
    const especialidades = await especialidadService.listarTodo();
    return res.status(200).json({ ok: true, cantidad: especialidades.length, data: especialidades });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const especialidad = await especialidadService.buscarPorId(req.params.id);
    return res.status(200).json({ ok: true, data: especialidad });
  } catch (error) {
    if (error.message === 'Especialidad no encontrada') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    const id_especialidad = await especialidadService.crearEspecialidad(req.body);
    return res.status(201).json({
      ok: true,
      message: 'Especialidad creada correctamente',
      data: { id_especialidad, ...req.body },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const editar = async (req, res) => {
  try {
    await especialidadService.editarEspecialidad(req.params.id, req.body);
    return res.status(200).json({ ok: true, message: 'Especialidad actualizada correctamente' });
  } catch (error) {
    if (error.message === 'Especialidad no encontrada') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: error.message });
  }
};
