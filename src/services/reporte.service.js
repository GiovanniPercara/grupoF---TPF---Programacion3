import PDFDocument from "pdfkit";
import { obtenerTurnosPaciente } from "../repositories/reporte.repository.js";


const generarReportePaciente = async (idPaciente) => {

  const turnos = await obtenerTurnosPaciente(idPaciente);

  if (turnos.length === 0) {
    throw new Error("El paciente no posee turnos registrados");
  }

  const paciente = turnos[0];

  
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

  
    doc.on("data", (chunk) => chunks.push(chunk));

    
    doc.on("end", () => {
      resolve({
        buffer: Buffer.concat(chunks),
        nombreArchivo: `reporte-paciente-${idPaciente}.pdf`,
      });
    });

    doc.on("error", reject);


<<<<<<< HEAD
    doc.fontSize(24).text("CLINICA GRUPO F", { align: "center" });
=======
    doc.fontSize(24).text("CLINICA", { align: "center" });
>>>>>>> nueva-rama-andrea
    doc.moveDown();
    doc.fontSize(18).text("REPORTE DE TURNOS DEL PACIENTE", { align: "center" });
    doc.moveDown(2);

    doc
      .fontSize(12)
      .text(`Paciente: ${paciente.paciente_nombre} ${paciente.paciente_apellido}`);
    doc.text(`Documento: ${paciente.documento}`);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString("es-AR")}`);

    doc.moveDown(2);
    doc.text("========================================================");
    doc.moveDown();

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

    doc.text("========================================================");
    doc.moveDown();
    doc.fontSize(14).text(`Cantidad total de turnos: ${turnos.length}`);
    doc.text(`Total abonado: $${total.toFixed(2)}`);
    doc.moveDown(2);

    doc
      .fontSize(10)
      .text(`Reporte generado el ${new Date().toLocaleDateString("es-AR")}`, {
        align: "center",
      });
    doc.text("Sistema de Gestión Clínica Grupo F", { align: "center" });

    
    doc.end();
  });
};

export { generarReportePaciente };