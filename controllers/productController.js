const productModel=require('../models/Product'); 
const {baseHtml,getProductCards,getNavBar}=require('../public/views');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
    }
});

const uploadimages = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpg|jpeg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error('Solo se permiten imágenes (.jpg, .jpeg, .png, .gif)'), false);
        }
    }
}).array('images',5);

const productController = {
    async showHome(req, res) {
        try {
            const novedades = await productModel.find({ isNew: true });
            const categorias = ["Colección", "Accesorios", "Calzado", "Promociones"];
    
            res.send(baseHtml(`
                <h1>Rose's Shop</h1>
                <h2>Últimas novedades</h2>
                ${getProductCards(novedades)}
    
                <h2>Categorías</h2>
                ${categorias.map(cat => `<a href="/products/category/${cat}">${cat}</a>`).join("<br>")}
            `));
        } catch (error) {
            console.error("Error cargando la home:", error);
            res.status(500).send("Error interno");
        }
    },
    

    async showProducts (req,res){
        try{
            const products = await productModel.find();
            const productCards = getProductCards(products);
            res.send( baseHtml(productCards));

        }
        catch(error){
            console.log('Error al obtener listado de productos',error);
            res.status(500).send(baseHtml('<p>Error al cargar productos</p>'));
        }
    },

    async showProductById (req,res){
        try{
            const product = await productModel.findById(req.params.id);
            if(!product){
                return res.status(404).send(baseHtml('<p> Product not found</p>'));
            }

            const productHtml = `
            <div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" style="width: 200px;">
                <p><strong>Descripción:</strong> ${product.description}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <p><strong>Categoría:</strong> ${product.categories}</p>
                <p><strong>Tallas disponibles:</strong> ${product.size.join(', ')}</p>
                 <p><strong>Nuevo:</strong> ${product.isNew ? 'Sí' : 'No'}</p>
            </div>
        `;
            res.send(baseHtml(productHtml));
        }
        catch(error){
            console.log('Error al obtener producto',error);
            res.status(500).send(baseHtml('<p>Error al obtener producto</p>'));
        }
    },

    async showNewProduct (req,res){
        try{
            const formHtml = `
            <h2>Añadir Nuevo Producto</h2>
            <form action="/dashboard" method="POST" enctype="multipart/form-data">
                <label>Nombre: <input type="text" name="name" required></label><br>
                
                <label>Descripción: <input type="text" name="description" required></label><br>
                
                <label>Precio: <input type="number" name="price" required></label><br>
                
                <label for="categories">Categorías</label>
                <select id="categories" name="categories" onchange="updateSubcat()">
                    <option value="colección">Colección</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Calzado">Calzado</option>
                </select>
                <br>
               
                <label for="size">Tallas</label><br>
                <label><input type="checkbox" name="size" value="XS"> XS</label><br>
                <label><input type="checkbox" name="size" value="S"> S</label><br>
                <label><input type="checkbox" name="size" value="M"> M</label><br>
                <label><input type="checkbox" name="size" value="L"> L</label><br>
                <label><input type="checkbox" name="size" value="XL"> XL</label><br>
                
                <label for= "image">Imagen</label><input type="file" name="images" accept=".jpg,.jpeg,.png,.gif" multiple><br>
                
                <label><input type="checkbox" name="isNew"> Incluir en novedades><br>

                
                <button type="submit">Crear Producto</button>
            </form>

        `;
        res.send(baseHtml(formHtml));
        }
        catch(error){
            console.log('Error al obtener producto',error);
            res.status(500).send(baseHtml('<p>Error al obtener producto</p>'));
        }
    },

    async createProduct (req,res){
        uploadimages(req,res,async(err)=>{
            if(err){
                console.log('Error en la subida de imagen',err);
                return res.status(500).send('<p>Error al subir imagen. Usa .jpg,.jpeg, .png,.gif')
            }

            try{
                const {name,description, price,categories, size } = req.body;

                const images = req.files ? req.files.map(file=>`/images/${file.filename}`) : [];
                if (images.length===0) {
                    return res.status(400).send('<p>Debe subir al menos una imagen para el producto.</p>');
                }

                const isNew = req.body.isNew === 'on'; 

                const newProduct = await productModel.create({
                    name,
                    description,
                    price,
                    categories,
                    size,
                    image:images,
                    isNew,
                    isPromotion,
                });
            
                res.redirect('/dashboard');
            }
            catch(error){
                console.log('Error al crear producto',error);
                res.status(500).send(baseHtml('<p>Error al  crear producto</p>'));
            }
    });
},

    async showEditProduct (req,res){
        try{
            const product = await productModel.findById(req.params.id);
            if(!product){
                return res.status(404).send(baseHtml('<p> Product not found</p>'));
            }
            const formHtml = `
            <h2>Editar Producto</h2>
            <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data">
                <label>Nombre: <input type="text" name="name" value="${product.name}" required></label><br>
                
                <label>Descripción: <input type="text" name="description" value="${product.description}" required></label><br>
                
                <label>Precio: <input type="number" name="price" value="${product.price}" required></label><br>
                
                <label for="categories">Categoría</label>
                
                <label><input type="checkbox" name="categories" value="Colección" 
                    ${product.categories.includes('Colección') ? "checked" : ""}> Colección</label><br>
                <label><input type="checkbox" name="categories" value="Accesorios" 
                    ${product.categories.includes('Accesorios') ? "checked" : ""}> Accesorios</label><br>
                <label><input type="checkbox" name="categories" value="Calzado" 
                    ${product.categories.includes('Calzado') ? "checked" : ""}> Calzado</label><br>
                <label><input type="checkbox" name="categories" value="Promociones" 
                    ${product.categories.includes('Promociones') ? "checked" : ""}> Promociones</label><br>

                <label><input type="checkbox" id="promotionCheckbox"> ¿Marcar como promoción?</label>

                <label for="size">Tallas</label>
                <label><input type="checkbox" name="size" value="XS" ${product.size.includes('XS') ? "checked" : ""}> XS</label><br>
                <label><input type="checkbox" name="size" value="S" ${product.size.includes('S') ? "checked" : ""}> S</label><br>
                <label><input type="checkbox" name="size" value="M" ${product.size.includes('M') ? "checked" : ""}> M</label><br>
                <label><input type="checkbox" name="size" value="L" ${product.size.includes('L') ? "checked" : ""}> L</label><br>
                <label><input type="checkbox" name="size" value="XL" ${product.size.includes('XL') ? "checked" : ""}> XL</label><br>

                <label for="images">Imágenes</label><input type="file" name="images"  accept=".jpg,.jpeg,.png,.gif" multiple><br>
                
                <label><input type="checkbox" name="isNew"> Incluir en novedades</label><br>

                
                <button type="submit">Actualizar Producto</button>
            </form>
        `;
        res.send(baseHtml(formHtml));
        }
        catch(error){
            console.log('Error al editar producto',error);
            res.status(500).send(baseHtml('<p>Error al  editar producto</p>'));
        }
    },

    async updateProduct (req,res){
        uploadimages(req, res, async (err) => {
            if (err) {
                console.log('Error en la subida de imagen', err);
                return res.status(500).send('<p>Error al subir imagen. Usa .jpg,.jpeg, .png,.gif</p>');
            }
            try{

                const { name, description, price, categories, size } = req.body;
                const images = req.files ? req.files.map(file => `/images/${file.filename}`) : [];
                const isNew = req.body.isNew === 'on'; 
                const isPromotion = req.body.isPromotion === 'on'; 
                // Actualizar producto, pero solo actualizamos las imágenes si se han subido nuevas
                const updatedData = {
                    name,
                    description,
                    price,
                    categories,
                    size,
                    ...(images.length > 0 && { image: images }),  // Solo actualizamos si hay nuevas imágenes
                    isNew,
                    isPromotion,
                };
                const productUpdated=await productModel.findByIdAndUpdate(req.params.productId,updatedData,{new:true});
                res.redirect('/dashboard');
            }
            catch(error){
                console.log('Error al actualizar producto',error);
                res.status(500).send(baseHtml('<p>Error al  actualizar producto</p>'));
            }
        });
    },
 
    async deleteProduct (req,res){
        try{
            const formHtml=`
            <form action="/dashboard/${req.params.id}?_method=DELETE" method="POST">
                <button type="submit">Eliminar</button>
            </form>`

            await productModel.findByIdAndDelete(req.params.id)
            res.redirect('/dashboard');
        }
        catch(error){
            console.log('Error al eliminar producto',error);
            res.status(500).send(baseHtml('<p>Error al eliminar producto</p>'));
        }
    },

    async showProductsByCategory(req, res) {
        try {
            const category = req.params.category;
            const products = await productModel.find({ categories: category });
    
            if (products.length === 0) {
                return res.send(baseHtml(`<p>No hay productos en la categoría: ${category}</p>`));
            }
    
            const productCards = getProductCards(products);
            res.send(baseHtml(`
                <h2>Productos en la categoría: ${category}</h2>
                ${productCards}
            `));
        } catch (error) {
            console.error('Error al obtener productos por categoría', error);
            res.status(500).send(baseHtml('<p>Error al cargar productos por categoría</p>'));
        }
    },
    
    async showPromotions(req, res) {
        try {
            const promotions = await productModel.find({ isPromotion: true });
    
            res.send(baseHtml(`
                <h1>Productos en Promoción</h1>
                ${getProductCards(promotions)}
                <a href="/">Volver al inicio</a>
            `));
        } catch (error) {
            console.error("Error cargando promociones:", error);
            res.status(500).send("Error interno");
        }
    }
    

    
}

module.exports=productController;
