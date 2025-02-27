const express = require ('express');
const router = express.Router();
const productModel=require('../models/Product')
const productController = require('../controllers/productController');

//visitor routes
router.get('/products',productController.showProduct);
router.get('/products/:productId',productController.showProductById);
//admin routes
router.get('/dashboard',productController.showProduct);
router.get('/dashboard/new',productController.showNewProduct);
router.post('/dashboard',productController.createProduct);
router.get('/dashboard/:productId',productController.showProductById);
router.get('/dashboard/:productId/edit',productController.showEditProduct);
router.put('/dashboard/:productId',productController.updateProduct);
router.delete('/dashboard/:productId',productController.deleteProduct);

module.exports=router;