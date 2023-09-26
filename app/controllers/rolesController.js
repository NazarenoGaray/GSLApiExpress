// rolesController.js
const db = require('../db');


// Obtener todos los usuarios
const obtenerRoles = (req, res) => {
  db.query('SELECT * FROM roles', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};
const obtenerRolesPorId = (req,res)=>{
  const rolId = req.params.id;
  db.query('SELECT * FROM roles WHERE idRol = ?',
  [rolId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
      } else {
        res.json(results[0]);
      }
    }
  });
}

module.exports = {
  obtenerRoles,
  obtenerRolesPorId
  // Otros métodos de controladores aquí
};
