// clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Ruta para obtener todos los clientes
router.get('/', clientesController.obtenerClientes);
// Ruta para obtener un cliente por ID
router.get('/:id', clientesController.obtenerClientePorId);
// Ruta para crear un nuevo cliente
router.post('/', clientesController.crearCliente);
// Ruta para actualizar un cliente
router.put('/', clientesController.actualizarCliente);

// Ruta para eliminar un cliente
//router.delete('/:id', clientesController.eliminarcliente);

module.exports = router;
