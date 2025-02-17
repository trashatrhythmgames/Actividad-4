Instrucciones para Ejecutar la Aplicación
1. Requisitos Previos
Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

1.1 Node.js
Descarga e instala la versión más reciente de Node.js .
Verifica que Node.js esté instalado correctamente ejecutando los siguientes comandos en tu terminal:
bash
node -v
npm -v

Esto debería mostrar las versiones de Node.js y npm instaladas.
1.2 MongoDB
Necesitarás una base de datos MongoDB para almacenar los datos de la aplicación.
Puedes usar MongoDB Atlas (recomendado para desarrollo y producción).
O instalar MongoDB localmente siguiendo las instrucciones en MongoDB Download Center .

1.3 Git
Si clonaste el repositorio desde GitHub, asegúrate de tener Git instalado. Puedes descargarlo desde Git Downloads .
2. Clonar el Repositorio
Si aún no has clonado el repositorio, sigue estos pasos:

bash
git clone https://github.com/tu-usuario/gestion-productos.git
cd gestion-productos
Reemplaza tu-usuario con tu nombre de usuario de GitHub.

3. Instalar Dependencias
Una vez dentro de la carpeta del proyecto, instala las dependencias necesarias usando npm:

bash
npm install
Esto instalará todas las dependencias listadas en el archivo package.json.

4. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno:

env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<nombre-de-la-base-de-datos>?retryWrites=true&w=majority
JWT_SECRET=clave_secreta_para_jwt

PORT : Puerto en el que se ejecutará el servidor (por defecto, 3000).
MONGO_URI : Cadena de conexión a tu base de datos MongoDB. Si usas MongoDB Atlas, reemplaza <usuario>, <contraseña> y <nombre-de-la-base-de-datos> con tus credenciales.
JWT_SECRET : Clave secreta para firmar los tokens JWT. Usa una cadena segura.

5. Iniciar la Aplicación
5.1 Modo Desarrollo
Para ejecutar la aplicación en modo desarrollo (con reinicio automático gracias a nodemon), usa el siguiente comando:

bash
npm run dev
Esto iniciará el servidor en http://localhost:3000.

5.2 Modo Producción
Para ejecutar la aplicación en modo producción, usa el siguiente comando:

bash
npm start

6. Probar la Aplicación
6.1 Registro de Usuario
Registra un nuevo usuario enviando una solicitud POST a /auth/register. Puedes usar Postman o cualquier cliente HTTP.

URL : http://localhost:3000/auth/register
Método : POST
Cuerpo (JSON) :
json
⌄
{
  "nombre": "usuario1",
  "contraseña": "password123"
}
6.2 Inicio de Sesión
Inicia sesión para obtener un token JWT enviando una solicitud POST a /auth/login.

URL : http://localhost:3000/auth/login
Método : POST
Cuerpo (JSON) :
json
⌄
{
  "nombre": "usuario1",
  "contraseña": "password123"
}
Guarda el token JWT generado, ya que será necesario para acceder a las rutas protegidas.

6.3 Operaciones CRUD
Usa el token JWT para realizar operaciones CRUD en los productos. Asegúrate de incluir el token en los encabezados (Authorization: Bearer <token>).

Agregar un Producto
URL : http://localhost:3000/productos
Método : POST
Encabezados :

Authorization: Bearer <token>
Cuerpo (JSON) :
json
⌄
{
  "nombre": "Laptop",
  "descripcion": "Laptop gaming",
  "precio": 1500,
  "stock": 10
}
Obtener Todos los Productos
URL : http://localhost:3000/productos
Método : GET
Encabezados :
Authorization: Bearer <token>

Actualizar un Producto
URL : http://localhost:3000/productos/<id>
Método : PUT
Encabezados :
Authorization: Bearer <token>
Cuerpo (JSON) :
json
⌄
{
  "nombre": "Laptop Pro",
  "descripcion": "Laptop avanzada",
  "precio": 2000,
  "stock": 5
}

Eliminar un Producto
URL : http://localhost:3000/productos/<id>
Método : DELETE
Encabezados :
Authorization: Bearer <token>

7. Ejecutar Pruebas
Para ejecutar las pruebas unitarias automatizadas, usa el siguiente comando:
bash
npm test

Esto ejecutará las pruebas configuradas con Jest y verificará el funcionamiento de los controladores y rutas.
