// roles.js
const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estadosController');


// Ruta para obtener estados usuario 
router.get('/usuario', estadosController.obtenerEstadosUsuario);
// Ruta para obtener estados usuario 
router.get('/usuario/:id', estadosController.obtenerEstadosUsuarioPorId);

// Ruta para obtener estados cliente 
router.get('/cliente', estadosController.obtenerEstadosCliente);
// Ruta para obtener estados cliente 
router.get('/cliente/:id', estadosController.obtenerEstadosClientePorId);

// Ruta para obtener estados producto 
router.get('/producto', estadosController.obtenerEstadosProducto);
// Ruta para obtener estados producto por ID
router.get('/producto/:id', estadosController.obtenerEstadosProductoPorId);

module.exports = router; 
