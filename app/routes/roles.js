// roles.js
const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');


// Ruta para obtener roles
router.get('/', rolesController.obtenerRoles);
// Ruta para obtener roles por id
router.get('/:id', rolesController.obtenerRolesPorId);


module.exports = router;
