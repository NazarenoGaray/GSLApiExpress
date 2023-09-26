// ProductosController.js
const db = require('../db');

// Obtener todos los Productos
const obtenerProductos = (req, res) => {
  db.query('SELECT * FROM productos', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

const obtenerProductoPorId = (req, res) => {
  const productoId = req.params.id;
  db.query(
    'SELECT * FROM productos Where idProductos = ?'
    , [productoId], (error, results) => {
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

// Crear un nuevo Prodcuto
const crearProducto = (req, res) => {
  const { nombre, idMaterialesProducto, cantidad, idClientes, idEstadosProducto } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!nombre || !idMaterialesProducto || !cantidad || !idClientes || !idEstadosProducto) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  // Verificar si el producto y material ya existe en la base de datos (por nombre de cliente)
  db.query(
    'SELECT * FROM productos WHERE nombre = ? and idMaterialesProducto = ?',
    [nombre,idMaterialesProducto],
    (error, results) => {
      if (error) {
        console.error('Error al verificar si el nombre ya existe:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (results.length > 0) {
          // Si ya existe un producto del mismo material, devuelve un error
          return res.status(409).json({ error: 'El nombre de Producto ya registrado' });
        }
        // Si el nombre del producto y el material no están registrado procede a crear el cliente

        db.query(
          'INSERT INTO productos (nombre, idMaterialesProducto, cantidad, idClientes, idEstadosProducto) VALUES (?, ?, ?, ?, ?)',
          [nombre, idMaterialesProducto, cantidad, idClientes, idEstadosProducto],
          (insertError, result) => {
            if (insertError) {
              console.error('Error al crear el Producto:', insertError);
              res.status(500).json({ error: 'Error interno del servidor' });
            } else {
              res.status(201).json({ mensaje: 'Producto creado con éxito', id: result.insertId });
            }
          }
        );
      }
    }
  );
};



// Actualizar un Producto por su ID
const actualizarProducto = (req, res) => {
  //alert("entro en actualizacion");
  const productId = req.body.idProductos; // ID del Producto a actualizar
  const { nombre, idMaterialesProducto, cantidad, idClientes, idEstadosProducto } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!nombre || !idMaterialesProducto || !cantidad || !idClientes || !idEstadosProducto) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Actualizar el cliente en la base de datos 
  db.query(
    'UPDATE productos SET nombre=?, idMaterialesProducto=?, cantidad=?, idClientes=?, idEstadosProducto=? WHERE idProductos = ?',
    [nombre, idMaterialesProducto, cantidad, idClientes, idEstadosProducto, productId],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar el Producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Producto no encontrado' });
        } else {
          res.json({ mensaje: 'Producto actualizado con éxito' });
        }
      }
    });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  // Otros métodos de controladores aquí
};
