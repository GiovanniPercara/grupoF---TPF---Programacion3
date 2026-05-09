import * as turnosService from '../services/turnosMedico.service.js';

const misTurnos = async (req, res) => {

  try {

    const medicoId = req.usuario.id_usuario;

    const turnos = await turnosService.getTurnosMedico(
      medicoId
    );

    return res.status(200).json({
      ok: true,
      cantidad: turnos.length,
      data: turnos
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      error: 'Error al obtener turnos'
    });
  }
};

const atenderTurno = async (req, res) => {

  try {

    const turnoId = parseInt(req.params.id);

    const medicoId = req.usuario.id_usuario;

    const resultado =
      await turnosService.atenderTurno(
        turnoId,
        medicoId
      );

    return res.status(200).json({
      ok: true,
      data: resultado
    });

  } catch (error) {

    return res.status(
      error.status || 500
    ).json({
      ok: false,
      error: error.message || 'Error interno'
    });
  }
};

export {
  misTurnos,
  atenderTurno
};