const turnosRepository = require('../repositories/turnos.repository');

async function getTurnosMedico(medicoId) {
    return await turnosRepository.obtenerTurnosPorMedico(medicoId);
}
async function atenderTurno(turnoId, medicoId) {
    const turno = await turnosRepository.buscarTurnoPorId(turnoId);

    if (!turno) {
        throw {
            status: 404,
            message: 'Turno no encontrado'
        };
    }

    if (turno.id_medico !== medicoId) {
        throw {
            status:403,
            message: 'No autorizado para este turno'
        };
    }

    if (turno.atendido === 1) {
        throw {
            status: 400,
            message: 'El turno ya fue atendido'
        };
    }

    await turnosRepository.marcarTurnoAtendido(turnoId);
    return {
        message: 'Turno marcado como atendido'
    };
}

module.exports = {
    getTurnosMedico,
    atenderTurno
};
