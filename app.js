// app.js
const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./app/routes/usuarios');
const clientesRoutes = require('./app/routes/clientes');
const loginRoutes = require('./app/routes/login');
const rolesRoutes = require('./app/routes/roles');
const racksRoutes = require('./app/routes/racks');
const estadosRoutes = require('./app/routes/estados');
const materialesRoutes = require('./app/routes/materiales');
const ProductosRoutes = require('./app/routes/productos');
const ubicacionRacks = require('./app/routes/ubicacionesRacks');
const ubicacionRacksProductos = require('./app/routes/ubicacionesRacksProductos');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

// Middleware para habilitar CORS
app.use(cors());
// Middleware para analizar las solicitudes JSON
app.use(bodyParser.json());

// Ruta de ejemplo para obtener datos de la base de datos
app.use('/usuarios',usuariosRoutes);
app.use('/clientes',clientesRoutes);
app.use('/login',loginRoutes);
app.use('/roles',rolesRoutes);
app.use('/racks',racksRoutes);
app.use('/estado',estadosRoutes);
app.use('/materiales',materialesRoutes);
app.use('/productos',ProductosRoutes);
app.use('/ubicacionRacks',ubicacionRacks);
app.use('/ubicacionRacksProductos',ubicacionRacksProductos);


app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
