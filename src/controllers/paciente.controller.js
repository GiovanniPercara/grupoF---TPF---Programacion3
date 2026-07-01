import * as pService from '../services/paciente.service.js';
import { validationResult } from 'express-validator';

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


export const getOne = async (req, res) => {
  try {
    const paciente = await pService.buscarPorId(req.params.id);

    res.status(200).json(paciente);

  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      return res.status(404).json({
        mensaje: error.message
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};


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


export const edit = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errores: errors.array()
      });
    }

    await pService.editar(req.params.id, req.body);

    res.status(200).json({
      mensaje: 'Paciente actualizado'
    });

  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      return res.status(404).json({
        mensaje: error.message
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};


export const remove = async (req, res) => {
  try {
    await pService.eliminarLogico(req.params.id);

    res.status(200).json({
      mensaje: 'Soft delete realizado'
    });

  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      return res.status(404).json({
        mensaje: error.message
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};