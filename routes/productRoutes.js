const express = require ('express');
const router = express.Router();  
const productModel=require('../models/Product')
const productController = require('../controllers/productController');
const {baseHtml,getProductCards,getNavBar}=require('../public/views');
//
router.get('/', (req, res) => {
    try {
        const categories = ["Novedades", "Colección", "Accesorios", "Calzado", "Promociones"];
        const productsByCategory = await Promise.all(categories.map(async (category) => {
            return {
                category,
                products: await productModel.find({ categories: category })
            };
        }));

        const categoryCardsHtml = productsByCategory.map(category => {
            const productCards = getProductCards(category.products);
            return `
                <section>
                    <h2>${category.category}</h2>
                    <div class="category-cards">
                        ${productCards}
                    </div>
                </section>
            `;
        }).join('');
    res.send(baseHtml(categoryCardsHtml));
    }catch(error){
        console.log('Error cargando productos por categorías:', error);
        res.status(500).send(baseHtml('<p>Error al cargar productos por categorías</p>'));
    }

});
//visitor routes
router.get('/products',productController.showProducts);
router.get('/products/:productId',productController.showProductById);
//admin routes
router.get('/dashboard',productController.showProducts);
router.get('/dashboard/new',productController.showNewProduct);
router.post('/dashboard',productController.createProduct);
router.get('/dashboard/:productId',productController.showProductById);
router.get('/dashboard/:productId/edit',productController.showEditProduct);
router.put('/dashboard/:productId',productController.updateProduct);
router.delete('/dashboard/:productId',productController.deleteProduct);

module.exports=router;