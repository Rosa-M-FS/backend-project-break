//esto es bonus 
const express = require ('express');
const router = express.Router();  
const productModel=require('../models/Product')
const productController = require('../controllers/productController');
const {baseHtml,getProductCards,getNavBar}=require('../public/views');
//

router.get('/dashboard', authMiddleware, showDashboard);
