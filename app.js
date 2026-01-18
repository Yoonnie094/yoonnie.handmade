// 🔥 Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚙️ Configuración Firebase (TU PROYECTO)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "yoonnie-handmade.firebaseapp.com",
    projectId: "yoonnie-handmade",
    storageBucket: "yoonnie-handmade.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

// 🚀 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📦 Referencia a colección
const productosRef = collection(db, "productos");

// 🎯 Contenedor HTML
const contenedor = document.getElementById("productos");

// ⚡ Escucha en TIEMPO REAL
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
