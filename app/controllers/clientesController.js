// ClientesController.js
const db = require('../db');

// Importa la biblioteca bcrypt
const bcrypt = require('bcrypt');

// Obtener todos los Clientes
const obtenerClientes = (req, res) => {
  db.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

const obtenerClientePorId = (req, res) => {
  const clientId = req.params.id;
  db.query(
    //'SELECT * FROM Clientes WHERE idCliente = ?'
    'SELECT * FROM clientes Where idClientes = ?'
    , [clientId], (error, results) => {
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

// Crear un nuevo cliente
const crearCliente = (req, res) => {
  const { nombre, razonSocial, cuit, calle, altura, idEstadosCliente } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!nombre || !razonSocial || !cuit || !calle || !altura || !idEstadosCliente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  // Verificar si el cliente ya existe en la base de datos (por nombre de cliente)
  db.query(
    'SELECT * FROM clientes WHERE nombre = ?',
    [nombre],
    (error, results) => {
      if (error) {
        console.error('Error al verificar si el nombre ya existe:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (results.length > 0) {
          // Si ya existe un cliente con el mismo nombre de cliente, devuelve un error
          return res.status(409).json({ error: 'El nombre de cliente ya registrado' });
        }

        // Verificar si el cuit ya registrado
        db.query(
          'SELECT * FROM clientes WHERE cuit = ?',
          [cuit],
          (error, emailResults) => {
            if (error) {
              console.error('Error al verificar si el cuit ya registrado:', error);
              res.status(500).json({ error: 'Error interno del servidor' });
            } else {
              if (emailResults.length > 0) {
                // Si ya existe un cliente con el mismo correo cuit, devuelve un error
                return res.status(409).json({ error: 'El correo cuit ya está registrado' });
              }

              // Si el nombre de cliente y el cuit no están registrado procede a crear el cliente

              db.query(
                'INSERT INTO clientes (nombre, razonSocial, cuit, calle, altura, idEstadosCliente) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, razonSocial, cuit, calle, altura, idEstadosCliente],
                (insertError, result) => {
                  if (insertError) {
                    console.error('Error al crear el cliente:', insertError);
                    res.status(500).json({ error: 'Error interno del servidor' });
                  } else {
                    res.status(201).json({ mensaje: 'Cliente creado con éxito', id: result.insertId });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};



// Actualizar un Cliente por su ID
const actualizarCliente = (req, res) => {
  //alert("entro en actualizacion");
  const clientId = req.body.idClientes; // ID del cliente a actualizar
  const { nombre, razonSocial, cuit, calle, altura, idEstadosCliente } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!nombre || !razonSocial || !cuit || !calle || !altura || !idEstadosCliente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Actualizar el cliente en la base de datos 
  db.query(
    'UPDATE clientes SET nombre=?, razonSocial=?, cuit=?, calle=?, altura=?, idEstadosCliente=? WHERE idClientes = ?',
    [nombre, razonSocial, cuit, calle, altura, idEstadosCliente, clientId],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar el Cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Cliente no encontrado' });
        } else {
          res.json({ mensaje: 'Cliente actualizado con éxito' });
        }
      }
    });
};

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  // Otros métodos de controladores aquí
};
