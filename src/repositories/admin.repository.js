import pool from '../config/db.js';

// OBRAS SOCIALES

// LISTAR OBRAS SOCIALES
const findAllObrasSociales = async () => {
  const [rows] = await pool.query(
    `SELECT id_obra_social, nombre, descripcion, porcentaje_descuento, es_particular, activo
     FROM obras_sociales
     WHERE activo = 1
     ORDER BY nombre ASC`
  );

  return rows;
};

// CREAR OBRA SOCIAL
const createObraSocial = async ({ nombre, descripcion, porcentaje_descuento, es_particular }) => {
  const [result] = await pool.query(
    `INSERT INTO obras_sociales 
     (nombre, descripcion, porcentaje_descuento, es_particular, activo)
     VALUES (?, ?, ?, ?, 1)`,
    [nombre, descripcion, porcentaje_descuento, es_particular]
  );

  return result.insertId;
};

// EDITAR OBRA SOCIAL
const updateObraSocial = async (
  id_obra_social,
  { nombre, descripcion, porcentaje_descuento, es_particular }
) => {
  const [result] = await pool.query(
    `UPDATE obras_sociales
     SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
     WHERE id_obra_social = ?
     AND activo = 1`,
    [nombre, descripcion, porcentaje_descuento, es_particular, id_obra_social]
  );

  return result.affectedRows > 0;
};

// ASOCIAR MEDICO-OBRA SOCIAL

const findMedicoById = async (id_medico) => {
  const [rows] = await pool.query(
    `SELECT id_medico FROM medicos WHERE id_medico = ? AND activo = 1`,
    [id_medico]
  );
  return rows[0] || null;
};

const findObraSocialById = async (id_obra_social) => {
  const [rows] = await pool.query(
    `SELECT id_obra_social FROM obras_sociales WHERE id_obra_social = ? AND activo = 1`,
    [id_obra_social]
  );
  return rows[0] || null;
};

// Verifica si ya están asociados para no duplicar
const findAsociacion = async (id_medico, id_obra_social) => {
  const [rows] = await pool.query(
    `SELECT id_medico_obra_social FROM medicos_obras_sociales
     WHERE id_medico = ? AND id_obra_social = ? AND activo = 1`,
    [id_medico, id_obra_social]
  );
  return rows[0] || null;
};

const asociar = async (id_medico, id_obra_social) => {
  const [result] = await pool.query(
    `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo)
     VALUES (?, ?, 1)`,
    [id_medico, id_obra_social]
  );
  return result.insertId;
};

// ASOCIAR PACIENTE-OBRA SOCIAL

const findPacienteById = async (id_paciente) => {
  const [rows] = await pool.query(
    `SELECT id_paciente FROM pacientes WHERE id_paciente = ?`,
    [id_paciente]
  );
  return rows[0] || null;
};

//const findObraSocialById = async (id_obra_social) => {
  const [rows] = await pool.query(
    `SELECT id_obra_social FROM obras_sociales WHERE id_obra_social = ? AND activo = 1`,
    [id_obra_social]
  );
  return rows[0] || null;
//}; 


const actualizarObraSocial = async (id_paciente, id_obra_social) => {
  const [result] = await pool.query(
    `UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?`,
    [id_obra_social, id_paciente]
  );
  return result.affectedRows > 0;
};

// ESPECIALIDADES

const findAllEspecialidades = async () => {
  const [rows] = await pool.query(
    `SELECT id_especialidad, nombre, activo
     FROM especialidades
     WHERE activo = 1
     ORDER BY nombre ASC`
  );
  return rows;
};

const createEspecialidad = async ({ nombre }) => {
  const [result] = await pool.query(
    `INSERT INTO especialidades (nombre, activo)
     VALUES (?, 1)`,
    [nombre]
  );
  return result.insertId;
};

const updateEspecialidad = async (id_especialidad, { nombre }) => {
  const [result] = await pool.query(
    `UPDATE especialidades
     SET nombre = ?
     WHERE id_especialidad = ? AND activo = 1`,
    [nombre, id_especialidad]
  );
  return result.affectedRows > 0;
};


export {
  findAllObrasSociales,
  createObraSocial,
  updateObraSocial,
  findMedicoById,
  findObraSocialById,
  findAsociacion,
  asociar,
  findPacienteById,
  findObraSocialById,
  actualizarObraSocial,
  findAllEspecialidades,
  createEspecialidad,
  updateEspecialidad
};