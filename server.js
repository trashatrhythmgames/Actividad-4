const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/productoRoutes'); // Importa las rutas de productos
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/productos', productoRoutes); // Registra las rutas de productos
app.use('/auth', authRoutes); // Registra las rutas de autenticación

// Exportar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = server;