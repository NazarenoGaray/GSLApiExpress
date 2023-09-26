// productos.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para obtener todos los productos
router.get('/', productosController.obtenerProductos);
// Ruta para obtener un Productos por ID
router.get('/:id', productosController.obtenerProductoPorId);
// Ruta para crear un nuevo Productos
router.post('/', productosController.crearProducto);
// Ruta para actualizar un Productos
router.put('/', productosController.actualizarProducto);

// Ruta para eliminar un Productos
//router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
