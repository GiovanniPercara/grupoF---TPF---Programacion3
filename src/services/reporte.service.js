import PDFDocument from "pdfkit";
import { obtenerTurnosPaciente } from "../repositories/reporte.repository.js";

const generarReportePaciente = async (idPaciente, res) => {
  const turnos = await obtenerTurnosPaciente(idPaciente);

  if (turnos.length === 0) {
    throw new Error("El paciente no posee turnos registrados");
  }

  const paciente = turnos[0];

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=reporte-paciente-${idPaciente}.pdf`,
  );

  doc.pipe(res);

  // Encabezado
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

  // Detalle de turnos
  let total = 0;

  turnos.forEach((turno, index) => {
    total += Number(turno.valor_total);

    const fecha = new Date(turno.fecha_hora).toLocaleDateString("es-AR");

    doc.text(`${index + 1}) Fecha: ${fecha}`);
    doc.text(`   Médico: ${turno.medico_nombre} ${turno.medico_apellido}`);
    doc.text(`   Especialidad: ${turno.especialidad}`);
    doc.text(`   Valor: $${Number(turno.valor_total).toFixed(2)}`);
    doc.text(`   Atendido: ${turno.atendido ? "Sí" : "No"}`);

    doc.moveDown();
  });

  // Resumen
  doc.text("========================================================");

  doc.moveDown();

  doc.fontSize(14).text(`Cantidad total de turnos: ${turnos.length}`);
  doc.text(`Total abonado: $${total.toFixed(2)}`);

  doc.moveDown(2);

  // Pie de página
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