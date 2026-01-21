export function cargarLayout() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
                <img src="img/logo.png" alt="Logo" width="40" height="40">
                <span class="text-primary fw-bold"><a class="nav-link" href="index.html">Yoonnie Handmade</a></span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="about.html">Sobre mí</a></li>
                    <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
                    <li class="nav-item ms-lg-3">
                        <a class="btn btn-outline-primary rounded-pill px-4" href="carrito.html">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"/>
</svg> <span id="cart-count">0</span>
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