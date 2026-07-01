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

    // =====================================
    // TÍTULO
    // =====================================

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("black")
      .text("CLÍNICA GRUPO F", {
        align: "center",
      });

    doc
      .moveDown(0.3)
      .fontSize(14)
      .text("REPORTE DE TURNOS DEL PACIENTE", {
        align: "center",
      });

    doc.moveDown(1.5);

    // =====================================
    // DATOS DEL PACIENTE
    // =====================================

    const inicioY = doc.y;

    doc.rect(50, inicioY, 500, 85).stroke();

    doc.font("Helvetica").fontSize(12);

    doc.text(
      `Paciente: ${paciente.paciente_nombre} ${paciente.paciente_apellido}`,
      60,
      inicioY + 10
    );

    doc.text(`Documento: ${paciente.documento}`);

    doc.text(`Obra Social: ${paciente.obra_social}`);

    doc.text(
      `Fecha del reporte: ${new Date().toLocaleDateString("es-AR")}`
    );

    doc.moveDown(4);

    // =====================================
    // TABLA
    // =====================================

    const X_FECHA = 50;
    const X_MEDICO = 130;
    const X_ESPECIALIDAD = 300;
    const X_VALOR = 430;
    const X_ESTADO = 500;

    const headerY = doc.y;

    doc.font("Helvetica-Bold").fontSize(11);

    doc.text("Fecha", X_FECHA, headerY);
    doc.text("Médico", X_MEDICO, headerY);
    doc.text("Especialidad", X_ESPECIALIDAD, headerY);
    doc.text("Valor", X_VALOR, headerY);
    doc.text("Estado", X_ESTADO, headerY);

    doc
      .moveTo(50, headerY + 18)
      .lineTo(550, headerY + 18)
      .stroke();

    doc.font("Helvetica").fontSize(8);

    doc.y = headerY + 28;

    // =====================================
    // DETALLE DE TURNOS
    // =====================================

    let total = 0;

    turnos.forEach((turno) => {

      // Si la página se llena, crear otra
      if (doc.y > 720) {
        doc.addPage();

        const nuevoHeader = doc.y;

        doc.font("Helvetica-Bold").fontSize(11);

        doc.text("Fecha", X_FECHA, nuevoHeader);
        doc.text("Médico", X_MEDICO, nuevoHeader);
        doc.text("Especialidad", X_ESPECIALIDAD, nuevoHeader);
        doc.text("Valor", X_VALOR, nuevoHeader);
        doc.text("Estado", X_ESTADO, nuevoHeader);

        doc
          .moveTo(50, nuevoHeader + 18)
          .lineTo(550, nuevoHeader + 18)
          .stroke();

        doc.font("Helvetica").fontSize(10);

        doc.y = nuevoHeader + 28;
      }

      total += Number(turno.valor_total);

      const fecha = new Date(turno.fecha_hora).toLocaleDateString("es-AR");

      const filaY = doc.y;

      doc.text(fecha, X_FECHA, filaY);

      doc.text(
        `${turno.medico_nombre} ${turno.medico_apellido}`,
        X_MEDICO,
        filaY,
        {
          width: 150,
        }
      );

      doc.text(
        turno.especialidad,
        X_ESPECIALIDAD,
        filaY,
        {
          width: 100,
        }
      );

      doc.text(
        `$${Number(turno.valor_total).toFixed(2)}`,
        X_VALOR,
        filaY,
        {
          width: 55,
          align: "right",
        }
      );

      doc.text(
        turno.atendido ? "Sí" : "No",
        X_ESTADO,
        filaY
      );

      
      doc
        .moveTo(50, filaY + 18)
        .lineTo(550, filaY + 18)
        .stroke();

      doc.y = filaY + 24;
    });

    // =====================================
    // RESUMEN
    // =====================================

    doc.moveDown();

    const resumenY = doc.y;

    doc.rect(50, resumenY, 500, 55).stroke();

    doc.font("Helvetica-Bold").fontSize(10);

    doc.text(
      `Cantidad total de turnos: ${turnos.length}`,
      60,
      resumenY + 12
    );

    doc.text(
      `Total abonado: $${total.toFixed(2)}`,
      60,
      resumenY + 30
    );

    // =====================================
    // PIE DE PÁGINA
    // =====================================

    doc.moveDown(5);

    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("black")
      .text(
        `Reporte generado el ${new Date().toLocaleDateString("es-AR")}`,
        {
          align: "center",
        }
      );

    doc.text(
      "Sistema de Gestión Clínica - Grupo F",
      {
        align: "center",
      }
    );

    doc.end();
  });
};

export { generarReportePaciente };