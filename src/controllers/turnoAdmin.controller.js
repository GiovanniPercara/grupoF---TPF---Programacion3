import { registrarTurnoAdmin } from '../services/turnoAdmin.service.js';

const registrarTurnoAdminController = async (req, res) => {
  try {
    const { id_medico, id_paciente, id_obra_social, fecha_hora } = req.body;

    const turno = await registrarTurnoAdmin({
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora
    });

    return res.status(201).json({
      ok: true,
      message: 'Turno registrado correctamente',
      data: turno
    });

  } catch (error) {

    if (
      error.message === 'Médico no encontrado' ||
      error.message === 'Paciente no encontrado' ||
      error.message === 'Obra social no encontrada'
    ) {
      return res.status(404).json({ ok: false, error: error.message });
    }

    if (error.message === 'El médico ya tiene un turno en ese horario') {
      return res.status(409).json({ ok: false, error: error.message });
    }

    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export {
  registrarTurnoAdminController
};
