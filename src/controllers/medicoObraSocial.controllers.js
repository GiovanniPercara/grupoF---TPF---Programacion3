import { asociarMedicoObraSocial } from '../services/medicoObraSocial.service.js';

const asociarMedicoObraSocialController = async (req, res) => {
  try {
    const { id_medico, id_obra_social } = req.body;

    const resultado = await asociarMedicoObraSocial(id_medico, id_obra_social);

    return res.status(201).json({
      ok: true,
      message: 'Médico asociado a la obra social correctamente',
      data: resultado
    });

  } catch (error) {

    if (
      error.message === 'Médico no encontrado' ||
      error.message === 'Obra social no encontrada'
    ) {
      return res.status(404).json({ ok: false, error: error.message });
    }

    if (error.message === 'El médico ya está asociado a esa obra social') {
      return res.status(409).json({ ok: false, error: error.message });
    
    }

    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export {
  asociarMedicoObraSocialController
};
