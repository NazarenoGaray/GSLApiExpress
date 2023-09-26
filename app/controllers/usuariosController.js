// usuariosController.js
const db = require('../db');

// Importa la biblioteca bcrypt
const bcrypt = require('bcrypt');
const {encript, compare} = require('../helpers/handleBcrypt');


// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

const obtenerUsuarioPorId = (req, res) => {
  const userId = req.params.id;
  db.query(
    'SELECT u.*,r.rol rol,e.estado AS estado FROM usuarios AS u INNER JOIN estados_usuario AS e ON u.idEstadosUsuario = e.idEstadosUsuario INNER JOIN roles AS r ON u.idRol = r.idRol WHERE u.idUsuario = ? '
    , [userId], (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
          res.json(results[0]);
        }
      }
    });
};

const crearUsuario = (req, res) => {
  const { nombre, apellido, telefono, correo, usuario, contraseña, idRol, idEstadosUsuario } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!nombre || !apellido || !telefono || !correo || !usuario || !contraseña || !idRol || !idEstadosUsuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario ya existe en la base de datos (por nombre de usuario)
  db.query(
    'SELECT * FROM usuarios WHERE usuario = ?',
    [usuario],
    (error, results) => {
      if (error) {
        console.error('Error al verificar si el usuario ya existe:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (results.length > 0) {
          // Si ya existe un usuario con el mismo nombre de usuario, devuelve un error
          return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }

        // Verificar si el correo electrónico ya está en uso
        db.query(
          'SELECT * FROM usuarios WHERE correo = ?',
          [correo],
          (error, emailResults) => {
            if (error) {
              console.error('Error al verificar si el correo electrónico ya está en uso:', error);
              res.status(500).json({ error: 'Error interno del servidor' });
            } else {
              if (emailResults.length > 0) {
                // Si ya existe un usuario con el mismo correo electrónico, devuelve un error
                return res.status(409).json({ error: 'El correo electrónico ya está en uso' });
              }

              // Si el nombre de usuario y el correo electrónico no están en uso, procede a crear el usuario
              // Genera un hash de la contraseña y realiza la inserción en la base de datos
              bcrypt.hash(contraseña, 10, (hashError, hash) => {
                if (hashError) {
                  console.error('Error al generar el hash de la contraseña:', hashError);
                  res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                  // Insertar el nuevo usuario en la base de datos utilizando el hash de la contraseña
                  db.query(
                    'INSERT INTO usuarios (nombre, apellido, telefono, correo, usuario, contraseña, idRol, idEstadosUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [nombre, apellido, telefono, correo, usuario, hash, idRol, idEstadosUsuario],
                    (insertError, result) => {
                      if (insertError) {
                        console.error('Error al crear el usuario:', insertError);
                        res.status(500).json({ error: 'Error interno del servidor' });
                      } else {
                        res.status(201).json({ mensaje: 'Usuario creado con éxito', id: result.insertId });
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
};



// Actualizar un usuario por su ID
const actualizarUsuario = (req, res) => {
  //alert("entro en actualizacion");
  const userId = req.body.idUsuario; // ID del usuario a actualizar
  const { nombre, apellido, telefono, correo, usuario, contraseña, idRol, idEstadosUsuario } = req.body;

  // Verificar si se proporcionan todos los campos requeridos
  if (!nombre || !apellido || !telefono || !correo || !usuario || !contraseña || !idRol || !idEstadosUsuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  bcrypt.hash(contraseña, 10, (hashError, hash) => {
    if (hashError) {
      console.error('Error al generar el hash de la contraseña:', hashError);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      // Actualizar el usuario en la base de datos
      db.query(
        'UPDATE usuarios SET nombre=?, apellido=?, telefono=?, correo=?, usuario=?, contraseña=?, idRol=?, idEstadosUsuario=? WHERE idUsuario = ?',
        [nombre, apellido, telefono, correo, usuario, hash, idRol, idEstadosUsuario, userId],
        (error, result) => {
          if (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
          } else {
            if (result.affectedRows === 0) {
              res.status(404).json({ error: 'Usuario no encontrado' });
            } else {
              res.json({ mensaje: 'Usuario actualizado con éxito' });
            }
          }
        }
      );
    }
  });
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  // Otros métodos de controladores aquí
};
