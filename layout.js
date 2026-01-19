export function cargarLayout() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
                <img src="img/logo.png" alt="Logo" width="40" height="40">
                <span class="text-primary fw-bold">Yoonnie handmade</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="index.html">Tienda</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">Sobre mí</a></li>
                    <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
                    <li class="nav-item ms-lg-3">
                        <a class="btn btn-outline-primary rounded-pill px-4" href="carrito.html">
                            🛒 <span id="cart-count">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
    const footerHTML = `
    <footer class="bg-white text-center py-4 mt-auto border-top">
        <div class="container">
            <p class="mb-0 text-muted">© 2026 Yoonnie handmade · Hecho con 💜</p>
        </div>
    </footer>`;
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

export function crearItemCarrito(producto) {
    return `
    <div class="card border-0 shadow-sm p-3 mb-3">
        <div class="d-flex align-items-center gap-3">
            <img src="${producto.imagen}" class="rounded" width="80" height="80" style="object-fit: cover;" alt="${producto.nombre}">
            <div class="flex-grow-1">
                <h5 class="mb-0 fw-bold">${producto.nombre}</h5>
                <p class="text-primary mb-0 fw-bold">$${producto.precio}</p>
            </div>
            <button class="btn btn-sm btn-outline-danger rounded-circle btn-eliminar" data-id="${producto.id}">
                🗑️
            </button>
        </div>
    </div>
    `;
}