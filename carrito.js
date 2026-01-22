// carrito.js — Gestión de carrito (localStorage) y render profesional

(function () {
    const STORAGE_KEY = 'yoonnie_cart';

    function formatPrecioCLP(valor) {
        try {
            return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Number(valor));
        } catch (e) {
            return `$${valor}`;
        }
    }

    function loadCart() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed;
        } catch (e) {
            console.error('Error parsing cart from localStorage', e);
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
            updateCartCount(cart);
        } catch (e) {
            console.error('Error saving cart to localStorage', e);
        }
    }

    function updateCartCount(cart) {
        const el = document.getElementById('cart-count');
        if (!el) return;
        el.textContent = String((cart || []).reduce((s, it) => s + (Number(it.cantidad) || 0), 0));
    }

    function createToast(message, variant = 'success') {
        // Crear toast dinámico y mostrarlo
        const container = document.createElement('div');
        container.className = 'position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = 1080;
        container.innerHTML = `
            <div class="toast align-items-center text-bg-${variant} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
                </div>
            </div>
        `;
        document.body.appendChild(container);
        const toastEl = container.querySelector('.toast');
        const toast = new bootstrap.Toast(toastEl, { delay: 2800 });
        toast.show();
        toastEl.addEventListener('hidden.bs.toast', () => { container.remove(); });
    }

    function renderCart() {
        const cart = loadCart();
        const cartLoading = document.querySelector('.cart-loading');
        const cartContent = document.getElementById('cart-content');
        const cartEmpty = document.querySelector('.cart-empty');
        const cartItemsEl = document.querySelector('.cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        const cartCodeEl = document.getElementById('cart-code');

        if (!cartLoading || !cartContent || !cartEmpty || !cartItemsEl || !cartTotalEl) return;

        // Simular una pequeña carga
        cartLoading.classList.remove('d-none');
        cartContent.classList.add('d-none');
        cartEmpty.classList.add('d-none');

        setTimeout(() => {
            if (!cart || cart.length === 0) {
                cartLoading.classList.add('d-none');
                cartContent.classList.add('d-none');
                cartEmpty.classList.remove('d-none');
                updateCartCount([]);
                return;
            }

            cartLoading.classList.add('d-none');
            cartContent.classList.remove('d-none');
            cartEmpty.classList.add('d-none');

            // Render items
            cartItemsEl.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const itemTotal = (Number(item.precio) || 0) * (Number(item.cantidad) || 1);
                total += itemTotal;

                const li = document.createElement('div');
                li.className = 'list-group-item';
                li.setAttribute('data-id', item.id);
                li.innerHTML = `
                    <div class="item-thumb">
                        <img src="${item.imagen || 'img/posavasos.png'}" alt="${item.nombre || ''}">
                    </div>
                    <div class="item-meta px-2">
                        <h6 class="mb-1">${item.nombre || 'Producto'}</h6>
                        <div class="small text-muted">Precio unitario: <span class="item-price">${formatPrecioCLP(item.precio)}</span></div>
                    </div>
                    <div class="ms-auto text-end">
                        <div class="fw-bold">${formatPrecioCLP(itemTotal)}</div>
                        <div class="d-flex align-items-center gap-2 mt-2 justify-content-end">
                            <input type="number" min="1" value="${item.cantidad || 1}" class="form-control form-control-sm qty" style="width:76px;">
                            <button class="btn btn-sm btn-outline-danger btn-remove">Eliminar</button>
                        </div>
                    </div>
                `;

                // eventos en el li
                const qtyInput = li.querySelector('.qty');
                const removeBtn = li.querySelector('.btn-remove');

                qtyInput.addEventListener('change', (e) => {
                    let v = Number(e.target.value) || 1;
                    if (v < 1) v = 1;
                    e.target.value = v;
                    // actualizar carrito
                    const c = loadCart();
                    const idx = c.findIndex(i => i.id === item.id);
                    if (idx >= 0) {
                        c[idx].cantidad = v;
                        saveCart(c);
                        renderCart();
                    }
                });

                removeBtn.addEventListener('click', () => {
                    let c = loadCart();
                    c = c.filter(i => i.id !== item.id);
                    saveCart(c);
                    createSmallDelayRender();
                    createToast('Artículo eliminado del carrito', 'light');
                });

                cartItemsEl.appendChild(li);
            });

            cartTotalEl.textContent = formatPrecioCLP(total);
            // Código de compra aleatorio (breve)
            const code = 'YH-' + Date.now().toString(36).toUpperCase().slice(-6);
            if (cartCodeEl) cartCodeEl.textContent = code;

            updateCartCount(cart);

            // Handler checkout
            const btnCheckout = document.getElementById('btn-checkout');
            if (btnCheckout) {
                btnCheckout.onclick = () => {
                    // si carrito vacío
                    const currentCart = loadCart();
                    if (!currentCart || currentCart.length === 0) {
                        createToast('Tu carrito está vacío', 'warning');
                        return;
                    }
                    // Limpiar carrito
                    saveCart([]);
                    renderCart();
                    createToast('Compra finalizada. Gracias por tu compra 💜', 'success');
                };
            }

        }, 250); // pequeña latencia para efecto
    }

    function createSmallDelayRender() {
        // pequeña espera para permitir animación o UX
        setTimeout(renderCart, 200);
    }

    // Exponer una forma de añadir item desde consola o desde otras páginas
    window.YoonnieCart = {
        addItem(item) {
            try {
                const cart = loadCart();
                const idx = cart.findIndex(i => i.id === item.id);
                if (idx >= 0) {
                    cart[idx].cantidad = (Number(cart[idx].cantidad) || 0) + (Number(item.cantidad) || 1);
                } else {
                    cart.push({
                        id: item.id,
                        nombre: item.nombre,
                        precio: item.precio,
                        imagen: item.imagen,
                        cantidad: item.cantidad || 1
                    });
                }
                saveCart(cart);
                createToast('Añadido al carrito', 'success');
                renderCart();
            } catch (e) {
                console.error('Error adding item', e);
            }
        },
        clear() {
            saveCart([]);
            renderCart();
        }
    };

    // Iniciar render
    document.addEventListener('DOMContentLoaded', renderCart);
})();
