import { asociarMedicoEspecialidad } from '../services/medicoEspecialidad.service.js';

const asociarMedicoEspecialidadController = async (req, res) => {
  try {
    const { id_medico, id_especialidad } = req.body;

    await asociarMedicoEspecialidad(id_medico, id_especialidad);

    return res.status(200).json({
      ok: true,
      message: 'Médico asociado a la especialidad correctamente'
    });

  } catch (error) {

    if (error.message === 'Médico no encontrado') {
      return res.status(404).json({
        ok: false,
        error: error.message
      });
    }

    return res.status(500).json({
      ok: false,
      error: 'Error interno del servidor'
    });
  }
};

export {
  asociarMedicoEspecialidadController
};
