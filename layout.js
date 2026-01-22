export function cargarLayout() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" aria-label="Navegación principal">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary" href="index.html">
                <img 
                    src="img/logo.png" 
                    alt="Logo Yoonnie Handmade" 
                    width="40" 
                    height="40" 
                    loading="lazy"
                >
                <span>Yoonnie Handmade</span>
            </a>

            <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Abrir menú"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center gap-2">
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">Sobre mí</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contacto.html">Contacto</a>
                    </li>
                    <li class="nav-item ms-lg-3">
                        <a 
                            class="btn btn-outline-primary rounded-pill px-4 d-flex align-items-center gap-2"
                            href="carrito.html"
                            aria-label="Ver carrito"
                        >
                            <img 
                                src="https://img.icons8.com/ios-filled/24/000000/shopping-bag.png" 
                                alt=""
                                width="20"
                                height="20"
                            >
                            <span id="cart-count" class="fw-bold">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;

    const footerHTML = `
    <footer class="bg-white text-center py-4 mt-auto border-top">
        <div class="container">
            <p class="mb-0 text-muted small">
                © <span id="footer-year"></span> Yoonnie Handmade · Hecho con 💜
            </p>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    document.getElementById('footer-year').textContent = new Date().getFullYear();
}

export function crearItemCarrito(producto) {
    return `
    <div class="card border-0 shadow-sm p-3 mb-3" data-id="${producto.id}">
        <div class="d-flex align-items-center gap-3">
            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}" 
                class="rounded"
                width="80" 
                height="80"
                style="object-fit: cover;"
                loading="lazy"
            >

            <div class="flex-grow-1">
                <h5 class="mb-1 fw-semibold">${producto.nombre}</h5>
                <p class="text-primary mb-0 fw-bold">$${producto.precio}</p>
            </div>

            <button 
                class="btn btn-sm btn-outline-danger rounded-circle btn-eliminar"
                data-id="${producto.id}"
                aria-label="Eliminar producto"
                title="Eliminar"
            >
                🗑️
            </button>
        </div>
    </div>
    `;
}
