// UbicacionesProductosController.js
const db = require('../db');

// Obtener todos los ubicaciones de los productos
const obtenerUbicacionesRacksProductos = (req, res) => {
  db.query('SELECT * FROM ubicaciones_racks_productos', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

const obtenerUbicacionRacksProductoPorId = (req, res) => {
  const ubicacionId = req.params.id;
  db.query(
    'SELECT * FROM ubicaciones_racks_productos Where idUbicacionesRacksProductos = ?'
    , [ubicacionId], (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Cliente no encontrado' });
        } else {
          res.json(results[0]);
        }
      }
    });
};

// Crear una nueva ubicacion de Prodcuto
const crearUbicacionRacksProducto = (req, res) => {
  const { idUbicacionesRacks, idProductos } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!idUbicacionesRacks || !idProductos) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'INSERT INTO ubicaciones_racks_productos (idUbicacionesRacks, idProductos) VALUES (?, ?)',
    [idUbicacionesRacks, idProductos],
    (insertError, result) => {
      if (insertError) {
        console.error('Error al crear el Producto:', insertError);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.status(201).json({ mensaje: 'Producto creado con éxito', id: result.insertId });
      }
    }
  );
};



// Actualizar un Ubicacopn del Producto por su ID
const actualizarUbicacionRacksProducto = (req, res) => {
  //alert("entro en actualizacion");
  const ubicacionId = req.body.idUbicacionesProducto; // ID ubicacion del Producto a actualizar
  const { idUbicacionesRacks, idProductos } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!idUbicacionesRacks || !idProductos) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  // Actualizar el cliente en la base de datos 
  db.query(
    'UPDATE ubicaciones_racks_productos SET idUbicacionesRacks=?, idProductos=? WHERE idUbicacionesRacksProducto = ?',
    [idUbicacionesRacks, idProductos, ubicacionId],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar la Ubicacion del Producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Ubicacion no encontrada' });
        } else {
          res.json({ mensaje: 'Ubicacion de Producto actualizado con éxito' });
        }
      }
    });
};

module.exports = {
  obtenerUbicacionesRacksProductos,
  obtenerUbicacionRacksProductoPorId,
  crearUbicacionRacksProducto,
  actualizarUbicacionRacksProducto,
  // Otros métodos de controladores aquí
};
