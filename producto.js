import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA9YDOWM6ZKCriOECDgNeaZ_jXR9otmhNw",
    authDomain: "yoonnie-handmade.firebaseapp.com",
    databaseURL: "https://yoonnie-handmade-default-rtdb.firebaseio.com",
    projectId: "yoonnie-handmade",
    storageBucket: "yoonnie-handmade.firebasestorage.app",
    messagingSenderId: "1001154851705",
    appId: "1:1001154851705:web:27e9b33bb51a38792435a8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");
const detalleContenedor = document.getElementById("detalle");

function formatPrecioCLP(valor) {
    try {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Number(valor));
    } catch (e) {
        return `$${valor}`;
    }
}

async function cargarProducto() {
    if (!idProducto) {
        detalleContenedor.innerHTML = `
            <div class="text-center text-danger py-5">
                <h3>⚠️ Error: No seleccionaste ningún producto.</h3>
                <a href="index.html" class="btn btn-primary mt-3">Volver a la tienda</a>
            </div>`;
        return;
    }
    try {
        const docRef = doc(db, "productos", idProducto);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const producto = docSnap.data();
            const docId = docSnap.id;
            // Asegurar campos seguros
            const nombre = producto.nombre || 'Producto';
            const imagen = producto.imagen || 'img/posavasos.png';
            const precio = producto.precio || '0';
            const descripcion = producto.descripcion || '';

            // Actualizar breadcrumb si existe
            const breadcrumb = document.getElementById('breadcrumb-current');
            if (breadcrumb) breadcrumb.textContent = nombre;

            const whatsappMsg = encodeURIComponent(`Hola, me interesa ${nombre} (${formatPrecioCLP(precio)})`);
            const whatsappLink = `https://wa.me/569XXXXXXXX?text=${whatsappMsg}`;

            detalleContenedor.innerHTML = `
                <div class="row g-5 align-items-center">
                    <div class="col-md-6">
                        <img id="producto-imagen" src="${imagen}" class="img-fluid rounded shadow w-100" alt="${nombre}" loading="lazy" style="object-fit: cover; max-height: 500px; cursor: pointer;" role="button" tabindex="0">
                    </div>
                    <div class="col-md-6 text-center text-md-start">
                        <h1 class="display-5 fw-bold text-primary mb-2">${nombre}</h1>
                        <div class="mb-3">
                            <span class="price-badge">${formatPrecioCLP(precio)}</span>
                        </div>
                        <p class="lead text-muted mb-4">${descripcion}</p>

                        <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                            <button id="btn-add" class="btn btn-primary btn-lg rounded-pill px-5" aria-label="Agregar ${nombre} al carrito">
                                Agregar al carrito 🛒
                            </button>
                            <a href="${whatsappLink}" 
                               class="btn btn-success btn-lg rounded-pill px-4"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="Pedir ${nombre} por WhatsApp">
                                Pedir por WhatsApp 📱
                            </a>
                        </div>

                        <div class="mt-4 text-muted small">
                            <p class="mb-1">Envíos a todo Chile · Pago seguro · Hecho a mano</p>
                        </div>
                    </div>
                </div>
            `;

            // Añadir eventos: imagen -> abrir modal
            const imgEl = document.getElementById('producto-imagen');
            if (imgEl) {
                imgEl.addEventListener('click', () => {
                    const modalImg = document.getElementById('modal-image');
                    if (modalImg) modalImg.src = imgEl.src;
                    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
                    modal.show();
                });
                imgEl.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') imgEl.click();
                });
            }

            // Añadir evento al botón de agregar
            const btnAdd = document.getElementById('btn-add');
            if (btnAdd) {
                btnAdd.addEventListener('click', () => {
                    // Preferir usar la API del carrito si está disponible
                    if (window.YoonnieCart && typeof window.YoonnieCart.addItem === 'function') {
                        window.YoonnieCart.addItem({ id: docId, nombre, precio, imagen, cantidad: 1 });
                    } else {
                        // fallback: incrementar contador visual
                        const el = document.getElementById('cart-count');
                        if (el) el.textContent = String((Number(el.textContent) || 0) + 1);
                        // mostrar toast temporal si existe
                        const toastEl = document.getElementById('toast-carrito');
                        if (toastEl) {
                            toastEl.querySelector('.toast-body').textContent = `${nombre} añadido al carrito`;
                            const t = new bootstrap.Toast(toastEl);
                            t.show();
                        }
                    }
                });
            }

        } else {
            detalleContenedor.innerHTML = "<h3 class='text-center py-5'>El producto no existe o fue eliminado 😢</h3>";
        }
    } catch (error) {
        console.error("Error obteniendo producto:", error);
        detalleContenedor.innerHTML = `<h3 class='text-center py-5 text-danger'>Error de conexión: ${error.message}</h3>`;
    }
}

cargarProducto();