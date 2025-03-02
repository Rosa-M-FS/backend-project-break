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
router.get('/dashboard/:id',productController.showProductById);
router.get('/dashboard/:id/edit',productController.showEditProduct);
router.put('/dashboard/:id',productController.updateProduct);
router.delete('/dashboard/:id/delete',productController.deleteProduct);
router.get('/products/categories/:category', productController.showProductsByCategory);
router.get('/products/promotions', productController.showPromotions);

module.exports=router;