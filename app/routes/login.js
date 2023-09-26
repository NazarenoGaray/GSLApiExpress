// login.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


// Ruta para crear un nuevo usuario
router.post('/', loginController.validarCredenciales);

// Ruta para actualizar un usuario
//router.put('/:id', loginController.actualizarcontraseña);

// Ruta para eliminar un usuario
//router.delete('/:id', loginController.eliminarUsuario);

module.exports = router;
