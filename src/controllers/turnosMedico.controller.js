const turnosService = require('../services/turnos.service');

async function misTurnos(req, res){
    try{
        const medicoId = req.user.id;

        const turnos = await turnosService.getTurnosMedico(medicoId);

        res.json(turnos);
    }   catch (error) {
        res.status(500).json({
             error: 'Error al obtener turnos'
            });
    }
}

async function atenderTurno(req, res) {
    try{
        const turnoId = parseInt(req.params.id);
        const medicoId = req.user.id;
        const resultado = await turnosService.atenderTurno(
            turnoId,
            medicoId
        );

        res.status(200).json(resultado);

    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || 'Error interno'
        });
    }
    
}
module.exports = {
    misTurnos,
    atenderTurno
};
