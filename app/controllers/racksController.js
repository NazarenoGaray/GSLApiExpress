// racksController.js
const db = require('../db');


// Obtener todos los racks
const obtenerRacks = (req, res) => {
  db.query('SELECT * FROM racks', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  obtenerRacks,
  // Otros métodos de controladores aquí
};
