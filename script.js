// === Datos de productos simulados ===
const productos = [
  {
    id: 1,
    nombre: "Labial Teddy Tint Maybelline",
    precio: 29.90,
    imagen: "img/labial1.jpg",
    categoria: "Maquillaje"
  },
  {
    id: 2,
    nombre: "Crema Facial Hidratante Nivea",
    precio: 34.90,
    imagen: "img/crema1.jpg",
    categoria: "Cuidado de la piel"
  },
  {
    id: 3,
    nombre: "Shampoo Pantene 2 en 1",
    precio: 21.50,
    imagen: "img/shampoo1.jpg",
    categoria: "Cabello"
  },
  {
    id: 4,
    nombre: "Perfume Elegance Rosé",
    precio: 89.00,
    imagen: "img/perfume1.jpg",
    categoria: "Fragancias"
  }
];

// === Mostrar productos dinámicamente ===
function mostrarProductos(lista) {
  const contenedor = document.getElementById("gridProductos");
  contenedor.innerHTML = "";

  lista.forEach(prod => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>S/ ${prod.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// === Buscador ===
function buscarProducto() {
  const texto = document.getElementById("searchInput").value.toLowerCase();
  const resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)
  );
  mostrarProductos(resultado);
}

// === Carrito (simulado) ===
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert(`Agregaste "${producto.nombre}" al carrito.`);
}

function actualizarContadorCarrito() {
  const contador = document.querySelector(".cart-count");
  contador.textContent = carrito.length;
}

// === Inicializar al cargar ===
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
  actualizarContadorCarrito();
});
