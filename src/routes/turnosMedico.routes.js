const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnos.controller');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

//Obtener turnos propios
router.get(
    '/mis-turnos',
    auth,
    authorize(1),
    turnosController.misTurnos
);

// Marcar turno como atendido
router.patch(
    '/:id/atender',
    auth,
    authorize(1),
    turnosController.atenderTurno
)

module.exports =router;