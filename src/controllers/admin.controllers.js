import * as adminService from '../services/admin.service.js';


const listarObrasSocialesController = async (req, res) => {

  try {

    const obrasSociales =
      await adminService.listarObrasSociales();

    return res.status(200).json({
      ok: true,
      cantidad: obrasSociales.length,
      data: obrasSociales
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      error: 'Error interno del servidor'
    });

  }
};

const crearObraSocialController = async (req, res) => {

  try {

    const id_obra_social =
      await adminService.crearObraSocial(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Obra social creada correctamente',
      data: {
        id_obra_social,
        ...req.body
      }
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      error: 'Error interno del servidor'
    });

  }
};

const editarObraSocialController = async (req, res) => {

  try {

    const { id } = req.params;

    await adminService.editarObraSocial(
      id,
      req.body
    );

    return res.status(200).json({
      ok: true,
      message: 'Obra social actualizada correctamente'
    });

  } catch (error) {

    if (error.message === 'Obra social no encontrada') {

      return res.status(404).json({
        ok: false,
        error: error.message
      });

    }

    return res.status(500).json({
      ok: false,
      error: 'Error interno del servidor'
    });

  }
};

export {
  listarObrasSocialesController,
  crearObraSocialController,
  editarObraSocialController
};