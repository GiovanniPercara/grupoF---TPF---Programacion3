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
export const actualizarEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_especialidad } = req.body;

    if (!id_especialidad) {
      return res.status(422).json({ ok: false, error: 'id_especialidad es obligatorio' });
    }

    await medicoService.actualizarEspecialidad(id, id_especialidad);

    return res.status(200).json({
      ok: true,
      message: 'Especialidad del médico actualizada correctamente'
    });
  } catch (error) {
    if (error.message === 'Médico no encontrado') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: error.message });
  }
};