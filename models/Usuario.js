const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
});

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

UsuarioSchema.methods.compararContraseña = async function (contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);