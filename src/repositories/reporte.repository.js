import pool from "../config/db.js";

export const obtenerTurnosPaciente = async (idPaciente) => {
  const [rows] = await pool.query(
    `
    SELECT
      tr.id_turno_reserva,
      tr.fecha_hora,
      tr.valor_total,
      tr.atentido AS atendido
    FROM turnos_reservas tr
    WHERE tr.id_paciente = ?;
    `,
    [idPaciente],
  );

  return rows;
};