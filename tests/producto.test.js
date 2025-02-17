const request = require('supertest');
const server = require('../server'); // Importa el servidor iniciado
const Producto = require('../models/Producto');
const mongoose = require('mongoose');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjExZDg2NjYyYmY0MzhlOGRkOTg2NyIsImlhdCI6MTczOTY2MTY3MiwiZXhwIjoxNzM5NjY1MjcyfQ.nLUTX-Ak-9z3pPYYMg9NI0z7TPo_GOnfD33rpAjAV1A'; // Reemplaza con tu token

// Limpiar la base de datos antes de cada prueba
beforeEach(async () => {
  await Producto.deleteMany({});
});

// Cerrar la conexión a MongoDB y el servidor después de todas las pruebas
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('POST /productos', () => {
  it('Debería crear un nuevo producto', async () => {
    const res = await request(server)
      .post('/productos')
      .set('Authorization', 'Bearer ${token}')
      .send({
        nombre: 'Laptop',
        descripcion: 'Laptop gaming',
        precio: 1500,
        stock: 10
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.nombre).toBe('Laptop');
  });

  it('Debería devolver un error si faltan campos obligatorios', async () => {
    const res = await request(server)
      .post('/productos')
      .set('Authorization', 'Bearer ${token}')
      .send({
        nombre: 'Laptop'
        // Falta descripción, precio y stock
      });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toContain('Faltan campos obligatorios');
  });
});

describe('GET /productos', () => {
  it('Debería obtener todos los productos', async () => {
    await Producto.create({
      nombre: 'Smartphone',
      descripcion: 'Teléfono inteligente',
      precio: 800,
      stock: 20
    });

    const res = await request(server)
      .get('/productos')
      .set('Authorization', 'Bearer ${token}');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].nombre).toBe('Smartphone');
  });
});

describe('PUT /productos/:id', () => {
  it('Debería actualizar un producto existente', async () => {
    const producto = await Producto.create({
      nombre: 'Tablet',
      descripcion: 'Tablet básica',
      precio: 300,
      stock: 15
    });

    const res = await request(server)
      .put(`/productos/${producto._id}`)
      .set('Authorization', 'Bearer ${token}')
      .send({
        nombre: 'Tablet Pro',
        descripcion: 'Tablet avanzada',
        precio: 500,
        stock: 10
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.nombre).toBe('Tablet Pro');
    expect(res.body.precio).toBe(500);
  });

  it('Debería devolver un error si el producto no existe', async () => {
    const res = await request(server)
      .put('/productos/64c3f9b2e4b0f9b2e4b0f9b2') // ID inexistente
      .set('Authorization', 'Bearer ${token}')
      .send({
        nombre: 'Tablet Pro',
        descripcion: 'Tablet avanzada',
        precio: 500,
        stock: 10
      });

    expect(res.statusCode).toEqual(404);
    expect(res.text).toContain('Producto no encontrado');
  });
});

describe('DELETE /productos/:id', () => {
  it('Debería eliminar un producto existente', async () => {
    const producto = await Producto.create({
      nombre: 'Monitor',
      descripcion: 'Monitor LED',
      precio: 200,
      stock: 5
    });

    const res = await request(server)
      .delete(`/productos/${producto._id}`)
      .set('Authorization', 'Bearer ${token}');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Producto eliminado');
  });

  it('Debería devolver un error si el producto no existe', async () => {
    const res = await request(server)
      .delete('/productos/64c3f9b2e4b0f9b2e4b0f9b2') // ID inexistente
      .set('Authorization', 'Bearer ${token}');

    expect(res.statusCode).toEqual(404);
    expect(res.text).toContain('Producto no encontrado');
  });
});