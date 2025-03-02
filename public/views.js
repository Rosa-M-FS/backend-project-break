
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
            
            <div class="dropdown">
                <a href="/products/Novedades">Novedades</a>
                    <div class="dropdown-content">
                        <a href="/products/novedades/camisas">Camisas</a>
                        <a href="/products/novedades/vestidos">Vestidos</a>
                        <a href="/products/novedades/faldas">Faldas</a>
                        <a href="/products/novedades/pantalones">Pantalones</a>
                        <a href="/products/novedades/camisetas">Camisetas</a>
                        <a href="/products/novedades/tops">Tops</a>
                    </div>
            </div>
            
            <div class="dropdown">
                <a href="/products/category/Colección">Colección</a>
                    <div class="dropdown-content">
                        <a href="/products/category/colección/camisas">Camisas</a>
                        <a href="/products/category/colección/vestidos">Vestidos</a>
                        <a href="/products/category/colección/faldas">Faldas</a>
                        <a href="/products/category/colección/pantalones">Pantalones</a>
                        <a href="/products/category/colección/camisetas">Camisetas</a>
                        <a href="/products/category/colección/tops">Tops</a>
                    </div>
            </div>
            
            <div class="dropdown">
                <a href="/products/category/Accesorios">Accesorios</a>
                    <div class="dropdown-content">
                        <a href="/products/category/accesorios/cinturones">Cinturones</a>
                        <a href="/products/category/accesorios/cabello">Cabello</a>
                        <a href="/products/category/accesorios/otros">Otros</a>
                    </div>
            </div>

            <div class="dropdown">
                <a href="/products/category/Calzado">Calzado</a>
                    <div class="dropdown-content">
                        <a href="/products/category/calzado/botas">Botas</a>
                        <a href="/products/category/calzado/botines">Botines</a>
                        <a href="/products/category/calzado/zapatos-planos">Zapatos Planos</a>
                        <a href="/products/category/calzado/zapatos-tacon">Zapatos Tacón</a>
                        <a href="/products/category/calzado/zapatillas">Zapatillas</a>
                </div>
            </div>
            
            <a href="/products/category/promociones">Promociones</a>
        ${indashboard ? `<a href="/dashboard/new" class="newP-btn"> Añadir Producto</a>`: ''}
        </nav>
        `;
    return html;
}


const baseHtml=(content,inDashboard=false)=>{
    return`
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

module.exports = {baseHtml,getNavBar,getProductCards};