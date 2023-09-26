// roles.js
const express = require('express');
const router = express.Router();
const ubicacionesRacksController = require('../controllers/ubicacionesRacksController');


// Ruta para crear un nuevo Ubicaciones de los racks
router.get('/', ubicacionesRacksController.obtenerUbicacionesRacks);
// Ruta para crear un nuevo Ubicaciones de los racks por id
router.get('/', ubicacionesRacksController.obtenerUbicacionesRacksPorId);


module.exports = router;
