import pool from '../config/db.js';

export const obtenerTurnosPaciente = async (idPaciente) => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM turnos_reservas
        WHERE id_paciente = ?
        AND activo = 1
        ORDER BY fecha_hora
        `,
        [idPaciente]
    );

    return rows;
};