const express = require('express');
const router = express.Router();
const { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } = require('../controllers/productoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas
router.get('/', authMiddleware, obtenerProductos);
router.post('/', authMiddleware, agregarProducto);
router.put('/:id', authMiddleware, actualizarProducto);
router.delete('/:id', authMiddleware, eliminarProducto);

module.exports = router;