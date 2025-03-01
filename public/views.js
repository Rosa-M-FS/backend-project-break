
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