import * as medicoService from '../services/medico.service.js';

export const getAll = async (req, res) => {
  try {
    const { id_especialidad } = req.query;

    const medicos = id_especialidad
      ? await medicoService.listarPorEspecialidad(id_especialidad)
      : await medicoService.listarTodo();

    return res.status(200).json({
      ok: true,
      cantidad: medicos.length,
      data: medicos
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};