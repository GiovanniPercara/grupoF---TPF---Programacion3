import * as adminService from '../services/admin.service.js';

export const listarObrasSocialesController = async (req, res) => {
  try {
    const obrasSociales = await adminService.listarObrasSociales();
    return res.status(200).json({ ok: true, cantidad: obrasSociales.length, data: obrasSociales });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export const crearObraSocialController = async (req, res) => {
  try {
    const id_obra_social = await adminService.crearObraSocial(req.body);
    return res.status(201).json({
      ok: true,
      message: 'Obra social creada correctamente',
      data: { id_obra_social, ...req.body },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export const editarObraSocialController = async (req, res) => {
  try {
    await adminService.editarObraSocial(req.params.id, req.body);
    return res.status(200).json({ ok: true, message: 'Obra social actualizada correctamente' });
  } catch (error) {
    if (error.message === 'Obra social no encontrada') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export const asociarMedicoObraSocialController = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_medico } = req.body;

    const resultado = await adminService.asociarMedicoObraSocial(id_medico, id);
    return res.status(201).json({
      ok: true,
      message: 'Médico asociado a la obra social correctamente',
      data: resultado,
    });
  } catch (error) {
    if (error.message === 'Médico no encontrado' || error.message === 'Obra social no encontrada') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    if (error.message === 'El médico ya está asociado a esa obra social') {
      return res.status(409).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export const asociarPacienteObraSocialController = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_paciente } = req.body;

    const resultado = await adminService.asociarPacienteObraSocial(id_paciente, id);
    return res.status(200).json({
      ok: true,
      message: 'Paciente asociado a la obra social correctamente',
      data: resultado,
    });
  } catch (error) {
    if (error.message === 'Paciente no encontrado' || error.message === 'Obra social no encontrada') {
      return res.status(404).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};
