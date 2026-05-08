import { crearTurno, listarTurnosPaciente } 
from '../services/turno.service.js';

const crearTurnoController = async (req, res) => {
  try {
    const { id_medico, id_obra_social, fecha_hora, valor_total } = req.body;

    const id_paciente_usuario = req.usuario.id_usuario;

    const turno = await crearTurno({
      id_medico,
      id_paciente_usuario,
      id_obra_social,
      fecha_hora,
      valor_total
    });

    return res.status(201).json({
      ok: true,
      message: 'Turno reservado correctamente',
      data: turno
    });

  } catch (error) {

    if (error.message === 'El médico ya tiene un turno en ese horario') {
      return res.status(409).json({
        ok: false,
        error: error.message
      });
    }

    if (error.message === 'Paciente no encontrado') {
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

const listarTurnosController = async (req, res) => {
  try {

    const id_paciente_usuario = req.usuario.id_usuario;

    const turnos = await listarTurnosPaciente(id_paciente_usuario);

    return res.status(200).json({
      ok: true,
      cantidad: turnos.length,
      data:turnos
    });

  } catch (error) {

    if (error.message === 'Paciente no encontrado') {
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
  crearTurnoController,
  listarTurnosController
};