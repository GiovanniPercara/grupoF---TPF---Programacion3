import pool from '../config/db.js';

const obtenerTurnosPorMedico = async (
  medicoId
) => {

  const [rows] = await pool.query(
    `
    SELECT 
      t.id_turno_reserva,
      t.fecha_hora,
      p.id_paciente,
      os.nombre AS obra_social,
      t.atendido
    FROM turnos_reservas t
    JOIN pacientes p
      ON t.id_paciente = p.id_paciente
    JOIN obras_sociales os
      ON t.id_obra_social = os.id_obra_social
    WHERE t.id_medico = ?
      AND t.activo = 1
    `,
    [medicoId]
  );

  return rows;
};

const buscarTurnoPorId = async (
  turnoId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM turnos_reservas
    WHERE id_turno_reserva = ?
      AND activo = 1
    `,
    [turnoId]
  );

  return rows[0];
};

const marcarTurnoAtendido = async (
  turnoId
) => {

  const [result] = await pool.query(
    `
    UPDATE turnos_reservas
    SET atendido = 1
    WHERE id_turno_reserva = ?
    `,
    [turnoId]
  );

  return result;
};

export {
  obtenerTurnosPorMedico,
  buscarTurnoPorId,
  marcarTurnoAtendido
};