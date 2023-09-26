// loginController.js
const db = require('../db');
const jwt = require('jsonwebtoken');

// Importa la biblioteca bcrypt
const bcrypt = require('bcrypt');

// Configura la conexión a la base de datos MySQL

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

function validarCredenciales(req, res) {
  const { usuario, contraseña } = req.body;

  // Consulta a la base de datos para verificar las credenciales
  const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
  db.query(sql, [usuario, contraseña], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    } else if (results.length === 1) {
      const { idUsuario } = results[0];

      // Si las credenciales son válidas, genera un token JWT
      const token = jwt.sign(
        {
          idUsuario,
          usuario
          // Puedes incluir otros datos en el token si es necesario
        },
        'clave_secreta', // Tu clave secreta para firmar el token
        { expiresIn: '1h' } // Tiempo de vida del token (por ejemplo, 1 hora)
      );

      // Devuelve el token en la respuesta
      res.json({ token });
    } else {
      // Si las credenciales no son válidas, devuelve un mensaje de error
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
}
function validarCredencialess (req, res) {
  const { usuario, contraseña } = req.body;
  const contraseñaUsuario = contraseña.toString();
  // Consulta a la base de datos para obtener la contraseña almacenada en forma segura
  const sql = 'SELECT idUsuario, contraseña AS contraseñaHash FROM usuarios WHERE usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    } else if (results.length === 1) {
      const { idUsuario, contraseñaHash } = results[0];
      bcrypt.hash(contraseñaUsuario, 10, (hashError, contraseña2) => {
        if (hashError) {
          console.error('Error al generar el hash de la contraseña:', hashError);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
        console.log('Contraseña2 pasada por bcrypt:', contraseña2);
      });
      console.log('Contraseña proporcionada:', contraseña);
      console.log('Contraseña almacenada:', contraseñaHash);

      // Compara la contraseña proporcionada con la contraseña almacenada en forma segura
      bcrypt.compare(contraseña, contraseñaHash, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error('Error al comparar contraseñas:', bcryptErr);
          res.status(500).json({ error: 'Error interno del servidor'});
        } else if (isMatch) {
          // Si las credenciales son válidas, genera un token JWT
          const token = jwt.sign(
            {
              idUsuario,
              usuario
              // Puedes incluir otros datos en el token si es necesario
            },
            'clave_secreta', // Tu clave secreta para firmar el token
            { expiresIn: '1h' } // Tiempo de vida del token (por ejemplo, 1 hora)
          );

          // Devuelve el token en la respuesta
          res.json({ token });
        } else {
          // Si las credenciales no son válidas, devuelve un mensaje de error
          res.status(401).json({ mensaje: 'Credenciales incorrectass',isMatch });
        }
      });
    } else {
      // Si no se encontró un usuario con el nombre de usuario proporcionado, devuelve un mensaje de error
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
}

module.exports = {
  validarCredenciales,
};
