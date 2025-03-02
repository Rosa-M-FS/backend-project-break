const express = require ('express');
const router = express.Router();  
const productModel=require('../models/Product')
const productController = require('../controllers/productController');
const {baseHtml,getProductCards,getNavBar}=require('../public/views');
//
router.get('/', (req, res) => {
    res.send(baseHtml('<h1>Bienvenido a Rose\'s Shop</h1><p>Explora nuestros productos <a href="/products">aquí</a></p>'))

});
//visitor routes
router.get('/products',productController.showProducts);
router.get('/products/catgegory/:productId',productController.showProductById);
//admin routes
router.get('/dashboard',productController.showProducts);
router.get('/dashboard/new',productController.showNewProduct);
router.post('/dashboard',productController.createProduct);
router.get('/dashboard/:productId',productController.showProductById);
router.get('/dashboard/:productId/edit',productController.showEditProduct);
router.put('/dashboard/:productId',productController.updateProduct);
router.delete('/dashboard/:productId',productController.deleteProduct);

module.exports=router;