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
async function cargarProducto() {
    if (!idProducto) {
        detalleContenedor.innerHTML = `
            <div class="text-center text-danger">
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

            detalleContenedor.innerHTML = `
                <div class="row g-5 align-items-center">
                    <div class="col-md-6">
                        <img src="${producto.imagen}" class="img-fluid rounded shadow w-100" alt="${producto.nombre}" style="object-fit: cover; max-height: 500px;">
                    </div>
                    <div class="col-md-6 text-center text-md-start">
                        <h1 class="display-5 fw-bold text-primary mb-2">${producto.nombre}</h1>
                        <p class="fs-2 fw-bold text-dark mb-4">$${producto.precio}</p>
                        <p class="lead text-muted mb-5">$${producto.descripcion}</p>
                        <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                            <button class="btn btn-primary btn-lg rounded-pill px-5">
                                Agregar al carrito 🛒
                            </button>
                            <a href="https://wa.me/569XXXXXXXX?text=Hola,%20me%20interesa%20${producto.nombre}" 
                               class="btn btn-success btn-lg rounded-pill px-4" target="_blank">
                                Pedir por WhatsApp 📱
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            detalleContenedor.innerHTML = "<h3 class='text-center py-5'>El producto no existe o fue eliminado 😢</h3>";
        }
    } catch (error) {
        console.error("Error obteniendo producto:", error);
        detalleContenedor.innerHTML = `<h3 class='text-center py-5 text-danger'>Error de conexión: ${error.message}</h3>`;
    }
}

cargarProducto();