import { asociarPacienteObraSocial } from '../services/pacienteObraSocial.service.js';

const asociarPacienteObraSocialController = async (req, res) => {
  try {
    const { id_paciente, id_obra_social } = req.body;

    const resultado = await asociarPacienteObraSocial(id_paciente, id_obra_social);

    return res.status(200).json({
      ok: true,
      message: 'Paciente asociado a la obra social correctamente',
      data: resultado
    });

  } catch (error) {

    if (
      error.message === 'Paciente no encontrado' ||
      error.message === 'Obra social no encontrada'
    ) {
      return res.status(404).json({ ok: false, error: error.message });
    }

    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
  }
};

export {
  asociarPacienteObraSocialController
};
