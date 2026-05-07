const db = require('../config/db');

async function obtenerTurnosPorMedico(medicoId) {
    const [rows] = await db.query(
        `SELECT 
        t.id_turno_reserva,
        t.fecha_hora,
        p.id_paciente,
        os.nombre AS obra_social
     FROM turnos_reservas t
     JOIN pacientes p ON t.id_paciente = p.id_paciente
     JOIN obras_sociales os ON t.id_obra_social = os.id_obra_social
     WHERE t.id_medico = ?
     AND t.activo = 1`,
    [medicoId]
);
return rows;

}
//////////////////////////////////////////////////////
async function buscarTurnoPorId(turnoId) {
    const [rows] = await db.query(
        `SELECT *
         FROM turnos_reservas
         WHERE id_turno_reserva = ?
         AND activo = 1`,
         [turnoId]
    );

    return rows[0];
    
}

async function marcarTurnoAtendido(turnoId) {
    const [result] = await db.query(
     `UPDATE turnos_reservas
     SET atendido = 1
     WHERE id_turno_reserva = ?`,
     [turnoId]
);

return result;

}

module.exports = {
    obtenerTurnosPorMedico,
    buscarTurnoPorId,
    marcarTurnoAtendido
};