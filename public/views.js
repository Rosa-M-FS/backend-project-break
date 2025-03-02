
const  getProductCards=(products,inDashboard=false)=>{
    let html='';
    for (let product of products){
        html+=`
            <div class="product-card">
                <img src="${product.image.length ? product.image[0]:'/images/default.jpg'}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <a href="/products/${product._id}">Ver detalle</a>
            </div>
            ${inDashboard ? `
                <a href="/dashboard/${product._id}/edit">
                    <button style="background-color: blue; color: white; padding: 5px 10px; border: none; cursor: pointer;">
                        Editar
                    </button>
                </a>`:''}
        `;
    }
    return html; 

}

const getNavBar=(indashboard=false, isLogged = false)=>{
    let html=`
        <nav class="navBar">
            <a href="/">Home</a>
            
            <div class="dropdown">
                <a href="/products/categories/Novedades">Novedades</a>
                    <div class="dropdown-content">
                        <a href="/products/categories/novedades/camisas">Camisas</a>
                        <a href="/products/categories/novedades/vestidos">Vestidos</a>
                        <a href="/products/categories/novedades/faldas">Faldas</a>
                        <a href="/products/categories/novedades/pantalones">Pantalones</a>
                        <a href="/products/categories/novedades/camisetas">Camisetas</a>
                        <a href="/products/categories/novedades/tops">Tops</a>
                    </div>
            </div>
            
            <div class="dropdown">
                <a href="/products/categories/Colección">Colección</a>
                    <div class="dropdown-content">
                        <a href="/products/categories/colección/camisas">Camisas</a>
                        <a href="/products/categories/colección/vestidos">Vestidos</a>
                        <a href="/products/categories/colección/faldas">Faldas</a>
                        <a href="/products/categories/colección/pantalones">Pantalones</a>
                        <a href="/products/categories/colección/camisetas">Camisetas</a>
                        <a href="/products/categories/colección/tops">Tops</a>
                    </div>
            </div>
            
            <div class="dropdown">
                <a href="/products/categories/Accesorios">Accesorios</a>
                    <div class="dropdown-content">
                        <a href="/products/categories/accesorios/cinturones">Cinturones</a>
                        <a href="/products/categories/accesorios/cabello">Cabello</a>
                        <a href="/products/categories/accesorios/otros">Otros</a>
                    </div>
            </div>

            <div class="dropdown">
                <a href="/products/categories/Calzado">Calzado</a>
                    <div class="dropdown-content">
                        <a href="/products/categories/calzado/botas">Botas</a>
                        <a href="/products/categories/calzado/botines">Botines</a>
                        <a href="/products/categories/calzado/zapatos-planos">Zapatos Planos</a>
                        <a href="/products/categories/calzado/zapatos-tacon">Zapatos Tacón</a>
                        <a href="/products/categories/calzado/zapatillas">Zapatillas</a>
                </div>
            </div>
            
            <a href="/products/categories/promociones">Promociones</a>
        ${indashboard ? `<a href="/dashboard/new" class="newP-btn"> Añadir Producto</a>`: ''}
        
        ${isLogged ? 
            `<a href="#" class="logout-btn" onclick="logoutUser()">Logout</a>` : 
            `<a href="/login" class="login-btn">Login</a>`}
        </nav>

        <script>
            function logoutUser() {
                // Aquí deberías hacer una petición a tu backend para cerrar sesión
                fetch('/logout', { method: 'POST' })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            window.location.href = "/"; // Redirige al home tras cerrar sesión
                        }
                    })
                    .catch(error => console.error("Error al cerrar sesión:", error));
            }
        </script>
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