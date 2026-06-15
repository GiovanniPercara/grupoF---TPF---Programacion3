import * as especialidadService from '../services/especialidades.service.js';

export const getAll = async (req, res) => {
  try {
    const especialidades = await especialidadService.listarTodo();
    return res.status(200).json({
      ok: true,
      data: especialidades
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const especialidad = await especialidadService.buscarPorId(req.params.id);
    return res.status(200).json({
      ok: true,
      data: especialidad
    });
  } catch (error) {
    if (error.message === 'Especialidad no encontrada') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: error.message });
  }
};