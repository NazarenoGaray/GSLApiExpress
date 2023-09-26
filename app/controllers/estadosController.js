// estadosController.js
const db = require('../db');


// Obtener todos los estados
const obtenerEstadosUsuario = (req, res) => {
  db.query('SELECT * FROM estados_usuario', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    } 
  });
};

const obtenerEstadosUsuarioPorId = (req, res) => {
  const estadoId = req.params.id;
  db.query('SELECT * FROM estados_usuario WHERE idEstadosUsuario = ?'
  ,[estadoId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    } 
  });
};

const obtenerEstadosCliente = (req, res) => {
  db.query('SELECT * FROM estados_cliente', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    } 
  });
};

const obtenerEstadosClientePorId = (req, res) => {
  const estadoId = req.params.id;
  db.query('SELECT * FROM estados_cliente WHERE idEstadosCliente = ?'
  ,[estadoId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    } 
  });
};

const obtenerEstadosProducto = (req, res) => {
  db.query('SELECT * FROM estados_producto', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    } 
  });
};

const obtenerEstadosProductoPorId= (req, res) => {
  const estadoId = req.params.id;
  db.query('SELECT * FROM estados_producto WHERE idEstadosProducto = ?'
  ,[estadoId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    } 
  });
};

module.exports = {
  obtenerEstadosUsuario,
  obtenerEstadosUsuarioPorId,
  obtenerEstadosCliente,
  obtenerEstadosClientePorId,
  obtenerEstadosProducto,
  obtenerEstadosProductoPorId
  // Otros métodos de controladores aquí
};
