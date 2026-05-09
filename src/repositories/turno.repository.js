import pool from '../config/db.js';


const findTurnoByMedicoAndFecha = async (id_medico, fecha_hora) => {
  const [rows] = await pool.query(
    `SELECT id_turno_reserva FROM turnos_reservas
     WHERE id_medico = ? AND fecha_hora = ? AND activo = 1`,
    [id_medico, fecha_hora]
  );
  return rows[0] || null;
};


const findTurnosByPaciente = async (id_paciente) => {
  const [rows] = await pool.query(
    `SELECT
      id_turno_reserva,
      id_paciente,
      id_medico,
      id_obra_social,
      fecha_hora,
      valor_total,
      atendido,
      activo
     FROM turnos_reservas
     WHERE id_paciente = ? AND activo = 1
     ORDER BY fecha_hora ASC`,
    [id_paciente]
  );
  return rows;
};

const createTurno = async ({ id_medico, id_paciente, id_obra_social, fecha_hora, valor_total }) => {
  const [result] = await pool.query(
    `INSERT INTO turnos_reservas
      (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atendido, activo)
     VALUES (?, ?, ?, ?, ?, 0, 1)`,
    [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]
  );
  return result.insertId;
};


const updateTurno = async (id_turno_reserva, { id_medico, id_obra_social, fecha_hora }) => {
  const [result] = await pool.query(
    `UPDATE turnos_reservas
     SET id_medico = ?, id_obra_social = ?, fecha_hora = ?
     WHERE id_turno_reserva = ? AND activo = 1`,
    [id_medico, id_obra_social, fecha_hora, id_turno_reserva]
  );
  return result.affectedRows > 0;
};


export {
  findTurnoByMedicoAndFecha,
  findTurnosByPaciente,
  createTurno,
  updateTurno
};