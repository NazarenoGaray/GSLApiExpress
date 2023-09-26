// materiales.js
const express = require('express');
const router = express.Router();
const materialesController = require('../controllers/materialesController');


// Ruta para obtener materiales
router.get('/', materialesController.obtenerMateriales);
// Ruta para obtener materiales por id
router.get('/:id', materialesController.obtenerMaterialesPorId);



module.exports = router;
