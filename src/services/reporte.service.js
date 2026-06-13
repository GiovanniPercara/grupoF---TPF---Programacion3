import PDFDocument from "pdfkit";
import pool from "../config/db.js";

const generarReportePaciente = async (idPaciente, res) => {
  const [turnos] = await pool.query(
    `
        SELECT

            tr.id_turno_reserva,
            tr.fecha_hora,
            tr.valor_total,
            tr.atentido,

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

  if (turnos.length === 0) {
    throw new Error("El paciente no posee turnos registrados");
  }

  const paciente = turnos[0];

  const doc = new PDFDocument({
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=reporte-paciente-${idPaciente}.pdf`,
  );

  doc.pipe(res);

  // =========================
  // ENCABEZADO
  // =========================

  doc.fontSize(24).text("CLINICA GRUPO F", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(18).text("REPORTE DE TURNOS DEL PACIENTE", {
    align: "center",
  });

  doc.moveDown(2);

  doc
    .fontSize(12)
    .text(
      `Paciente: ${paciente.paciente_nombre} ${paciente.paciente_apellido}`,
    );

  doc.text(`Documento: ${paciente.documento}`);

  doc.text(`Fecha de generación: ${new Date().toLocaleDateString("es-AR")}`);

  doc.moveDown(2);

  doc.text("========================================================");

  doc.moveDown();

  // =========================
  // DETALLE DE TURNOS
  // =========================

  let total = 0;

  turnos.forEach((turno, index) => {
    total += Number(turno.valor_total);

    const fecha = new Date(turno.fecha_hora).toLocaleDateString("es-AR");

    doc.text(`${index + 1}) Fecha: ${fecha}`);

    doc.text(`   Médico: ${turno.medico_nombre} ${turno.medico_apellido}`);

    doc.text(`   Especialidad: ${turno.especialidad}`);

    doc.text(`   Valor: $${Number(turno.valor_total).toFixed(2)}`);

    doc.text(`   Atendido: ${turno.atentido ? "Si" : "N"}`);

    doc.moveDown();
  });

  // =========================
  // RESUMEN
  // =========================

  doc.text("========================================================");

  doc.moveDown();

  doc.fontSize(14).text(`Cantidad total de turnos: ${turnos.length}`);

  doc.text(`Total abonado: $${total.toFixed(2)}`);

  doc.moveDown(2);

  // =========================
  // PIE DE PAGINA
  // =========================

  doc
    .fontSize(10)
    .text(`Reporte generado el ${new Date().toLocaleDateString("es-AR")}`, {
      align: "center",
    });

  doc.text("Sistema de Gestión Clínica Grupo F", {
    align: "center",
  });

  doc.end();
};

export { generarReportePaciente };
