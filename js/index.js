const btnCarrito = document.querySelector('.logo-carrito');
const containerCartaProductos = document.querySelector('.container-carta-productos');

btnCarrito.addEventListener('click', () => {
    containerCartaProductos.classList.toggle('hidden-cart');
});

const cartaProductos = document.querySelector('.carta-productos');
let rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productList = document.querySelector('.remeras');

// Cargar datos del localStorage al iniciar la página
let allProducts = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar datos en el localStorage
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(allProducts));
};

const totalCarrito = document.querySelector('.total-carrito');
const contadorProductos = document.querySelector('#contador-productos');

productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('comprar')) {
        const product = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h1').textContent,
            price: product.querySelector('h2').textContent,
        };

        const exist = allProducts.some((product) => product.title === infoProduct.title);

        if (exist) {
            const products = allProducts.map((product) => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                }
                return product;
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        guardarCarritoEnLocalStorage();
        showHTML();
    }
});

// Funcion mostrar html
const showHTML = () => {
    rowProduct.innerHTML = '';

    let total = 0;
    let totalProducts = 0;

    allProducts.forEach((product) => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('carta-productos');
        containerProduct.innerHTML = `
        <div class="info-carts">
            <span class="cantidad-producto-carrito pt10">${product.quantity}</span>
            <p class="titulo-producto-carrito pt10">${product.title}</p>
            <span class="precio-producto-carrito pt7">${product.price}</span>
        </div>
        <div class="cierre">
            <span class="material-symbols-outlined icon-close">close</span>
        </div>
        `;

        rowProduct.append(containerProduct);
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalProducts = totalProducts + product.quantity;
    });

    totalCarrito.innerText = `Total: $${total}`;
    contadorProductos.innerText = totalProducts;
};

showHTML();

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const productContainer = e.target.closest('.carta-productos');

        if (productContainer) {
            const title = productContainer.querySelector('.titulo-producto-carrito').textContent;

            allProducts = allProducts.filter((product) => product.title !== title);

            guardarCarritoEnLocalStorage();
            showHTML();
        }
    }
})