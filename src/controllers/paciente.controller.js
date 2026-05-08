import * as pService from '../services/paciente.service.js';
import { validationResult } from 'express-validator';

// GET TODOS
export const getAll = async (req, res) => {
  try {
    const pacientes = await pService.listarTodo();

    res.status(200).json(pacientes);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// GET POR ID
export const getOne = async (req, res) => {
  try {
    const paciente = await pService.buscarPorId(
      req.params.id
    );

    if (!paciente) {
      return res.status(404).json({
        mensaje: 'Paciente no encontrado'
      });
    }

    res.status(200).json(paciente);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// POST
export const create = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errores: errors.array()
      });
    }

    const id = await pService.agregar(req.body);

    res.status(201).json({
      mensaje: 'Paciente creado',
      id_paciente: id
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// PUT
export const edit = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errores: errors.array()
      });
    }

    const actualizado = await pService.editar(
      req.params.id,
      req.body
    );

    if (!actualizado) {
      return res.status(404).json({
        mensaje: 'Paciente no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Paciente actualizado'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// DELETE LÓGICO
export const remove = async (req, res) => {
  try {

    const eliminado = await pService.eliminarLogico(
      req.params.id
    );

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Paciente no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Soft delete realizado'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};