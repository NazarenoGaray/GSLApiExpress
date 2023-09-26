// MaterialesController.js
const db = require('../db');


// Obtener todos los usuarios
const obtenerMateriales = (req, res) => {
  db.query('SELECT * FROM materiales_producto', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};
const obtenerMaterialesPorId = (req,res)=>{
  const materialId = req.params.id;
  db.query('SELECT * FROM materiales_producto WHERE idMaterialesProducto = ?',
  [materialId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Material no encontrado' });
      } else {
        res.json(results[0]);
      }
    }
  });
}

module.exports = {
  obtenerMateriales,
  obtenerMaterialesPorId
  // Otros métodos de controladores aquí
};
