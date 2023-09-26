// roles.js
const express = require('express');
const router = express.Router();
const racksController = require('../controllers/racksController');


// Ruta para crear un nuevo racks
router.get('/', racksController.obtenerRacks);



module.exports = router;
