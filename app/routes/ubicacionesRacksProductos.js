// productos.js
const express = require('express');
const router = express.Router();
const ubicacionesRacksProductosController = require('../controllers/ubicacionesRacksProductosController');

// Ruta para obtener todos los ubicacionProductos
router.get('/', ubicacionesRacksProductosController.obtenerUbicacionesRacksProductos);
// Ruta para obtener un ubicacionProductos por ID
router.get('/:id', ubicacionesRacksProductosController.obtenerUbicacionRacksProductoPorId);
// Ruta para crear un nuevo ubicacionProductos
router.post('/', ubicacionesRacksProductosController.crearUbicacionRacksProducto);
// Ruta para actualizar un ubicacionProductos
router.put('/', ubicacionesRacksProductosController.actualizarUbicacionRacksProducto);

// Ruta para eliminar un ubicacionProductos
//router.delete('/:id', ubicacionesProductosController.eliminarProducto);

module.exports = router;
