import PDFDocument from 'pdfkit';
import * as turnoRepo from '../repositories/turno.repository.js';
import pool from '../config/db.js'; 

export const generarPdfHistorialClinica = async (res) => {
    const [rows] = await pool.query('CALL sp_historial_turnos_clinica()');
    const turnos = rows[0]; // MySQL devuelve un array donde la primera posición contiene las filas del SP

    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-historial-clinica.pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Historial General de Turnos - Clínica Grupo F', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Reporte institucional generado el: ${new Date().toLocaleDateString()}`);
    doc.text(`Cantidad total de turnos procesados en el sistema: ${turnos.length}`);
    doc.moveDown();

    turnos.forEach((t, i) => {
        doc.text(`${i + 1}. Fecha: ${t.fecha_hora} | Médico ID: ${t.id_medico} | Paciente ID: ${t.id_paciente} | Total: $${t.valor_total}`);
    });

    doc.end();
};

export const generarPdfTurnosPaciente = async (id_paciente, res) => {
    const turnos = await turnoRepo.findTurnosByPaciente(id_paciente);
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-turnos.pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Informe de Turnos - Clínica Grupo F', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Resumen de turnos para el paciente ID: ${id_paciente}`);
    doc.text(`Cantidad total de turnos encontrados: ${turnos.length}`);
    doc.moveDown();
    
    turnos.forEach((t, i) => {
        doc.text(`${i + 1}. Fecha: ${t.fecha_hora} - Valor: $${t.valor_total} - Atendido: ${t.atentido ? 'Sí' : 'No'}`);
    });
    doc.end();
};