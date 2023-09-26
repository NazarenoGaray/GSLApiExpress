// racksController.js
const db = require('../db');


// Obtener todos los racks
const obtenerUbicacionesRacks = (req, res) => {
  db.query('SELECT * FROM ubicaciones_racks', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};
const obtenerUbicacionesRacksPorId = (req, res) => {
  const ubicacionId = req.params.id;
  db.query('SELECT * FROM ubicaciones_racks WHERE idUbicacionesRacks = ?',
  [ubicacionId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  obtenerUbicacionesRacks,
  obtenerUbicacionesRacksPorId
  // Otros métodos de controladores aquí
};
