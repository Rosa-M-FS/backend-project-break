# Backend Project Break

Este proyecto es una API REST desarrollada con Node.js y Express, que maneja un sistema de productos con conexión a MongoDB. Permite realizar operaciones CRUD sobre los productos y ofrece diferentes endpoints para interactuar con los datos.

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework para manejar rutas y middleware
- **MongoDB** - Base de datos NoSQL para almacenar la información de los productos
- **Mongoose** - ODM para modelar los datos en MongoDB
- **Render** - Servicio en la nube para el despliegue del backend

## Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Rosa-M-FS/backend-project-break.git
   cd backend-project-break

2. Instalar dependencias
npm install

3. configurar las variables de entorno en el archivo .env incluir 
PORT=10000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<nombre_base_datos>

## Endpoints de la API
router.get('/', productController.showHome); 
ruta principal usando showHome para mostrar una tarjeta con novedades en la tienda y las categorias 
//visitor routes
router.get('/products',productController.showProducts);
router.get('/products/:id',productController.showProductById);

rutas get para el visitante de la tienda muestra los productos y el detalle de los mismos
//admin routes
router.get('/dashboard',productController.showProducts);
router.get('/dashboard/new',productController.showNewProduct);
router.post('/dashboard',productController.createProduct);
router.get('/dashboard/:productId',productController.showProductById);
router.get('/dashboard/:productId/edit',productController.showEditProduct);
router.put('/dashboard/:productId',productController.updateProduct);
router.delete('/dashboard/:productId/delete',productController.deleteProduct);
router.get('/products/category/*', productController.showProductsByCategory);
router.get('/products/promociones', productController.showPromotions);

rutas del dashboard para el administrador con las rutas get se muestran los productos al igual que para la vista del visitante. Además se crean, editan y eliminan los productos. Además como se han añadido categorias para filtrar los distintos productos por tipo se ha incluido una ruta para mostrar los productos con dicho filtro y se ha añadido la opción de al editar el articulo poder ponerlo o no en otra categoría de promoción. 


