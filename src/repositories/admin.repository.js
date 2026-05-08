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

export {
  findAllObrasSociales,
  createObraSocial,
  updateObraSocial
};