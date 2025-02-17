const jwt = require('jsonwebtoken'); // Importa la librería JWT
require('dotenv').config(); // Carga las variables de entorno

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('Token recibido:', token); // Log para verificar el token

  if (!token) {
    console.log('No se proporcionó un token'); // Log si falta el token
    return res.status(401).send('Acceso denegado');
  }

  try {
    // Verifica el token usando la clave secreta
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded); // Log para verificar el contenido del token
    req.usuario = decoded; // Almacena los datos del usuario en la solicitud
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message); // Log para capturar errores
    res.status(403).send('Token inválido');
  }
};