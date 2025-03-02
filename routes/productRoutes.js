const express = require ('express');
const router = express.Router();  
const productModel=require('../models/Product')
const productController = require('../controllers/productController');
const {baseHtml,getProductCards,getNavBar}=require('../public/views');
//
router.get('/', productController.showHome);
//visitor routes
router.get('/products',productController.showProducts);
router.get('/products/:id',productController.showProductById);
//admin routes
router.get('/dashboard',productController.showProducts);
router.get('/dashboard/new',productController.showNewProduct);
router.post('/dashboard',productController.createProduct);
router.get('/dashboard/:productId',productController.showProductById);
router.get('/dashboard/:productId/edit',productController.showEditProduct);
router.put('/dashboard/:productId',productController.updateProduct);
router.delete('/dashboard/:productId',productController.deleteProduct);
router.get('/products/category/:category', productController.showProductsByCategory);
router.get('/products/promociones', productController.showPromotions);


module.exports=router;