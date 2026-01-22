import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const productosRef = collection(db, "productos");
const contenedor = document.getElementById("productos");

onSnapshot(productosRef, (snapshot) => {
    contenedor.innerHTML = "";
    snapshot.forEach((doc) => {
        const producto = doc.data();
        contenedor.innerHTML += `
      <div class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="price">$${producto.precio}</p>
        <button>Agregar al carrito</button>
      </div>
    `;
    });
});

onSnapshot(productosRef, (snapshot) => {
    contenedor.innerHTML = "";
    snapshot.forEach((doc) => {
        const producto = doc.data();
        const id = doc.id; // Obtenemos el ID del producto
        contenedor.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
                <a href="producto.html?id=${id}">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 250px; object-fit: cover; cursor: pointer;">
                </a>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title fw-bold">${producto.nombre}</h5>
                    <p class="card-text text-primary fs-5 fw-bold">$${producto.precio}</p>
                    <div class="mt-auto">
                        <a href="producto.html?id=${id}" class="btn btn-outline-primary rounded-pill w-100">
                            Ver detalles 👁️
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
});

onSnapshot(productosRef, (snapshot) => {
    contenedor.innerHTML = "";
    snapshot.forEach((doc) => {
        const producto = doc.data();
        const id = doc.id; // Obtenemos el ID del producto
        contenedor.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
                <a href="producto.html?id=${id}">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 250px; object-fit: cover; cursor: pointer;">
                </a>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title fw-bold">${producto.nombre}</h5>
                    <p class="card-text text-primary fs-5 fw-bold">$${producto.precio}</p>
                    <div class="mt-auto">
                        <a href="producto.html?id=${id}" class="btn btn-outline-primary rounded-pill w-100">
                            Ver detalles 👁️
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
});