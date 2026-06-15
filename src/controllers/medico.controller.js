import * as medicoService from '../services/medico.service.js';

export const getAll = async (req, res) => {
  try {
    const { especialidad } = req.query;

    const medicos = especialidad
      ? await medicoService.listarPorEspecialidad(especialidad)
      : await medicoService.listarTodo();

    return res.status(200).json({
      ok: true,
      data: medicos
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};