const productModel=require('../models/Product');

const getProductCards=(products)=>{
    let html='';
    for (let product of products){
        html+=`
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <a href="/products/${product._id}">Ver detalle</a>
            </div>
        `;
    }
    return html;
}

const getNavBar=(indashboard=false)=>{
    let html=`
        <nav class="navBar">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/contact">contact</a>

        ${indashboard ? `<a href="/dashboard/new" class="newP-btn"> Añadir Producto</a>`: ''}
        </nav>
        `;
    return html;
}

const baseHtml=(content,inDashboard=false)=>{`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rose's Shop</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        ${getNavBar(inDashboard)}
        <main>
            ${content}
        </main>
        <footer>
            <p>© 2025 Rose's Shop</p>
        </footer>
    </body>
    </html>
    `;
}
const productController = {
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
            const product = await productModel.findById(req.params.productId);
            if(!product){
                return res.status(404).send(baseHtml('<p> Product not found</p>'));
            }
            res.send(baseHtml(product));
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
            <form action="/dashboard" method="POST">
                <label>Nombre: <input type="text" name="name" required></label><br>
                <label>Descripción: <input type="text" name="description" required></label><br>
                <label>Precio: <input type="number" name="price" required></label><br>
                <label>Imagen URL: <input type="text" name="image" required></label><br>
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
        try{
            const newProduct = await productModel.create(req.body);
            res.redirect('/dashboard');
        }
        catch(error){
            console.log('Error al crear producto',error);
            res.status(500).send(baseHtml('<p>Error al  crear producto</p>'));
        }
    },

    async showEditProduct (req,res){
        try{
            const product = await productModel.findById(req.params.productId);
            if(!product){
                return res.status(404).send(baseHtml('<p> Product not found</p>'));
            }
            const formHtml = `
            <h2>Editar Producto</h2>
            <form action="/dashboard/${product._id}?_method=PUT" method="POST">
                <label>Nombre: <input type="text" name="name" value="${product.name}" required></label><br>
                <label>Descripción: <input type="text" name="description" value="${product.description}" required></label><br>
                <label>Precio: <input type="number" name="price" value="${product.price}" required></label><br>
                <label>Imagen URL: <input type="text" name="image" value="${product.image}" required></label><br>
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
        try{
            const productUpadated=await productModel.findByIdAndUpdate(req.params.id,req.body);
            res.redirect('/dashboard');
        }
        catch(error){
            console.log('Error al actualizar producto',error);
            res.status(500).send(baseHtml('<p>Error al  actualizar producto</p>'));
        }
    },

    async deleteProduct (req,res){
        try{
            const productDeleted = await productModel.findByIdAndDelete(req.params.id)
            res.redirect('/dashboard');
        }
        catch(error){
            console.log('Error al eliminar producto',error);
            res.status(500).send(baseHtml('<p>Error al eliminar producto</p>'));
        }
    },
}
/* module.exports = { 
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct
};
 */
module.exports=productController;
