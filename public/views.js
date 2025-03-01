
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
                <a href="/products/novedades">Novedades</a>
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
                <a href="/products/colección">Colección</a>
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
                <a href="/products/accesorios">Accesorios</a>
                    <div class="dropdown-content">
                        <a href="/products/accesorios/cinturones">Cinturones</a>
                        <a href="/products/accesorios/cabello">Cabello</a>
                        <a href="/products/accesorios/otros">Otros</a>
                    </div>
            </div>

            <div class="dropdown">
                <a href="/products/calzado">Calzado</a>
                    <div class="dropdown-content">
                        <a href="/products/calzado/botas">Botas</a>
                        <a href="/products/calzado/botines">Botines</a>
                        <a href="/products/calzado/zapatos-planos">Zapatos Planos</a>
                        <a href="/products/calzado/zapatos-tacon">Zapatos Tacón</a>
                        <a href="/products/calzado/zapatillas">Zapatillas</a>
                </div>
            </div>
            
            <a href="/products/promociones">Promociones</a>
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