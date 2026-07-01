import pool from "../config/db.js";

export const obtenerTurnosPaciente = async (idPaciente) => {
  const [turnos] = await pool.query(
    `
    SELECT
      tr.id_turno_reserva,
      tr.fecha_hora,
      tr.valor_total,
      tr.atendido,

      up.nombres AS paciente_nombre,
      up.apellido AS paciente_apellido,
      up.documento,

      um.nombres AS medico_nombre,
      um.apellido AS medico_apellido,

      e.nombre AS especialidad

    FROM turnos_reservas tr

    INNER JOIN pacientes p
      ON tr.id_paciente = p.id_paciente

    INNER JOIN usuarios up
      ON p.id_usuario = up.id_usuario

    INNER JOIN medicos m
      ON tr.id_medico = m.id_medico

    INNER JOIN usuarios um
      ON m.id_usuario = um.id_usuario

    INNER JOIN especialidades e
      ON m.id_especialidad = e.id_especialidad

    WHERE tr.id_paciente = ?

    ORDER BY tr.fecha_hora
    `,
    [idPaciente],
  );

  return turnos;
};