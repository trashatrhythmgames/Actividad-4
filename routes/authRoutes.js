const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, contraseña } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ nombre });
    if (usuarioExistente) {
      return res.status(400).send('El usuario ya existe');
    }
    const nuevoUsuario = new Usuario({ nombre, contraseña });
    await nuevoUsuario.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    res.status(500).send('Error al registrar el usuario');
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { nombre, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario || !(await usuario.compararContraseña(contraseña))) {
      return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error al iniciar sesión');
  }
});

module.exports = router;