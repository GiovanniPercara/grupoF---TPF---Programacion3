import PDFDocument from 'pdfkit';
import * as turnoRepo from '../repositories/turno.repository.js';

export const generarPdfTurnosPaciente = async (id_paciente, res) => {
    // Buscamos los turnos del paciente usando tu repositorio existente
    const turnos = await turnoRepo.findTurnosByPaciente(id_paciente); 

    const doc = new PDFDocument();
    
    // Configuración para que el navegador descargue el archivo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-turnos.pdf');

    doc.pipe(res);

    // Encabezado del PDF (Requisito de reglas de negocio)
    doc.fontSize(20).text('Informe de Turnos - Clínica Grupo F', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Resumen de turnos para el paciente ID: ${id_paciente}`);
    doc.text(`Cantidad total de turnos encontrados: ${turnos.length}`);
    doc.moveDown();

    // Listado de turnos
    turnos.forEach((t, i) => {
        doc.text(`${i + 1}. Fecha: ${t.fecha_hora} - Valor: $${t.valor_total} - Atendido: ${t.atentido ? 'Sí' : 'No'}`);
    });

    doc.end();
};