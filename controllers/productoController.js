const Producto = require('../models/Producto');

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).send('Error al obtener los productos');
  }
};

exports.agregarProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    const nuevoProducto = new Producto({ nombre, descripcion, precio, stock });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).send('Error al agregar el producto');
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    const producto = await Producto.findByIdAndUpdate(id, { nombre, descripcion, precio, stock }, { new: true });
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).send('Error al actualizar el producto');
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.status(200).send('Producto eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar el producto');
  }
};