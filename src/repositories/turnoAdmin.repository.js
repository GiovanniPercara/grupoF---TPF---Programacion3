import pool from '../config/db.js';

const findMedicoById = async (id_medico) => {
  const [rows] = await pool.query(
    `SELECT m.id_medico, m.valor_consulta
     FROM medicos m
     JOIN usuarios u ON m.id_usuario = u.id_usuario
     WHERE m.id_medico = ? AND u.activo = 1`,
    [id_medico]
  );
  return rows[0] || null;
};

const findPacienteById = async (id_paciente) => {
  const [rows] = await pool.query(
    `SELECT p.id_paciente
     FROM pacientes p
     JOIN usuarios u ON p.id_usuario = u.id_usuario
     WHERE p.id_paciente = ? AND u.activo = 1`,
    [id_paciente]
  );
  return rows[0] || null;
};

const findObraSocialById = async (id_obra_social) => {
  const [rows] = await pool.query(
    `SELECT id_obra_social, porcentaje_descuento, es_particular
     FROM obras_sociales WHERE id_obra_social = ? AND activo = 1`,
    [id_obra_social]
  );
  return rows[0] || null;
};

const findTurnoExistente = async (id_medico, fecha_hora) => {
  const [rows] = await pool.query(
    `SELECT id_turno_reserva FROM turnos_reservas
     WHERE id_medico = ? AND fecha_hora = ? AND activo = 1`,
    [id_medico, fecha_hora]
  );
  return rows[0] || null;
};

const createTurnoAdmin = async ({ id_medico, id_paciente, id_obra_social, fecha_hora, valor_total }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO turnos_reservas
        (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atendido, activo)
       VALUES (?, ?, ?, ?, ?, 0, 1)`,
      [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]
    );

    await connection.commit();
    return result.insertId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  findMedicoById,
  findPacienteById,
  findObraSocialById,
  findTurnoExistente,
  createTurnoAdmin
};