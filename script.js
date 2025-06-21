// ============================
// VARIABLES GLOBALES
// ============================
let carrito = [];
let total = 0;

const productos = [
  {
    nombre: "Labial Mate Rosa",
    categoria: "labial",
    marca: "maybelline",
    precio: 45,
    imagen: "img/labial1.jpg",
    oferta: 39.9,
    descripcion: "Color intenso de larga duración con acabado mate.",
    uso: "Aplicar directamente sobre los labios limpios y secos.",
    recomendacion: 4,
    tonalidades: [
      { nombre: "Rosa Claro", imagen: "img/labial1.jpg" },
      { nombre: "Rosa Intenso", imagen: "img/labial2.jpg" },
      { nombre: "Fucsia", imagen: "img/labial3.jpg" }
    ]
  },
  {
    nombre: "Base Líquida Natural",
    categoria: "base",
    marca: "zeena",
    precio: 55,
    imagen: "img/base1.jpg"
  },
  {
    nombre: "Sérum Hidratante",
    categoria: "cuidadopiel",
    marca: "masglo",
    precio: 60,
    imagen: "img/serum.jpg"
  }
  {
  nombre: "Base Líquida Natural",
  categoria: "base",
  marca: "zeena",
  tipoPiel: "mixta",
  acabado: "natural",
  beneficios: ["hidratante", "ligera"],
  tono: "Beige Claro",
  precio: 55,
  imagen: "img/base1.jpg"
}
];

// ============================
// TOGGLE CARRITO
// ============================
function toggleCarrito() {
  document.getElementById("carrito").classList.toggle("abierto");
}

// ============================
// FUNCIONES DEL CARRITO
// ============================
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total-carrito");
  const contador = document.getElementById("contador-carrito");

  lista.innerHTML = "";
  total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - S/ ${item.precio.toFixed(2)}`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalSpan.textContent = `S/ ${total.toFixed(2)}`;
  if (contador) contador.textContent = carrito.length;
}

function finalizarCompra() {
  alert("Gracias por tu compra 🛍️");
  carrito = [];
  actualizarCarrito();
  toggleCarrito();
}

// ============================
// FILTRAR PRODUCTOS
// ============================
function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  lista.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h4>${prod.nombre}</h4>
      <p>S/ ${prod.precio.toFixed(2)}</p>
      <button class="cart-btn" onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function filtrarProductos() {
  const texto = (document.getElementById("buscar") || {}).value?.toLowerCase() || "";
  const categoria = document.getElementById("categoria")?.value || "";
  const marca = document.getElementById("marca")?.value || "";
  const precioMax = parseFloat(document.getElementById("precio")?.value || "100");
  const orden = document.getElementById("orden")?.value || "";

  let resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (categoria === "" || p.categoria === categoria) &&
    (marca === "" || p.marca === marca) &&
    p.precio <= precioMax
  );

  if (orden === "precio-asc") resultado.sort((a, b) => a.precio - b.precio);
  else if (orden === "precio-desc") resultado.sort((a, b) => b.precio - a.precio);
  else if (orden === "nombre-asc") resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  else if (orden === "nombre-desc") resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));

  document.getElementById("precio-valor").textContent = `S/ ${precioMax}`;
  mostrarProductos(resultado);
}

// ============================
// CAMBIO DE IMAGEN DETALLE
// ============================
function cambiarImagen(imagen) {
  const imagenPrincipal = document.getElementById("imagenPrincipal");
  if (imagenPrincipal && imagen?.src) {
    imagenPrincipal.src = imagen.src;
  }
}

// ============================
// COTIZADOR DE ENVÍO
// ============================
function cotizarEnvio() {
  const ciudad = document.getElementById("ciudad").value;
  const resultado = document.getElementById("resultado-envio");
  let precio = "S/ 0.00";

  if (ciudad === "lima") precio = "S/ 8.00";
  else if (ciudad === "arequipa") precio = "S/ 12.00";
  else if (ciudad === "cusco") precio = "S/ 15.00";
  else if (ciudad === "otros") precio = "S/ 20.00";

  resultado.textContent = ciudad ? `Costo de envío: ${precio}` : "Por favor, selecciona una ciudad.";
}

// ============================
// FORMULARIO DE PAGO
// ============================
function mostrarImagenPago() {
  const metodo = document.getElementById("metodoPago").value;
  const contenedor = document.getElementById("imagenPago");
  let contenido = "";

  if (metodo === "yape") {
    contenido = `<p>Escanea el código QR de Yape:</p><img src="img/yape_qr.jpg" alt="Yape QR" style="max-width: 220px; border-radius: 10px;">`;
  } else if (metodo === "plin") {
    contenido = `<p>Escanea el código QR de Plin:</p><img src="img/plin_qr.jpg" alt="Plin QR" style="max-width: 220px; border-radius: 10px;">`;
  } else if (metodo === "transferencia") {
    contenido = `<p>Realiza la transferencia a:</p><ul><li>Banco: BCP</li><li>Cuenta: 191-23456789-0-12</li><li>CCI: 00219100234567890123</li><li>Nombre: Belladonna Perú</li></ul>`;
  }

  contenedor.innerHTML = contenido;
}

// ============================
// MENÚ HAMBURGUESA
// ============================
function toggleMenu() {
  document.getElementById("menu").classList.toggle("abierto");
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);

  const formPago = document.getElementById("formPago");
  const msg = document.getElementById("pago-msg");

  if (formPago) {
    formPago.addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const direccion = document.getElementById("direccion").value.trim();
      const metodo = document.getElementById("metodoPago").value;

      if (!nombre || !correo || !direccion || !metodo) {
        msg.textContent = "Por favor, completa todos los campos.";
        msg.style.color = "crimson";
        return;
      }

      msg.textContent = "✅ Gracias por tu compra. En breve te contactaremos.";
      msg.style.color = "#28a745";
      formPago.reset();
      document.getElementById("imagenPago").innerHTML = "";
    });
  }

  // Submenús en móviles
  document.querySelectorAll(".submenu > a").forEach(enlace => {
    enlace.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle("activo");
      }
    });
  });
});

// ============================
// SECCIÓN DETALLE DINÁMICO
// ============================
function mostrarDetalleProducto(producto) {
  document.getElementById("detalle-nombre").textContent = producto.nombre;
  document.getElementById("detalle-precio").textContent = `S/ ${producto.precio.toFixed(2)}`;
  document.getElementById("detalle-oferta").textContent = producto.oferta ? `S/ ${producto.oferta.toFixed(2)}` : "—";
  document.getElementById("detalle-descripcion").textContent = producto.descripcion;
  document.getElementById("detalle-uso").textContent = producto.uso;
  document.getElementById("detalle-img").src = producto.imagen;

  // Estrellas
  const estrellas = "⭐".repeat(producto.recomendacion);
  document.getElementById("detalle-estrellas").textContent = estrellas;

  // Tonalidades
  const tonosDiv = document.getElementById("detalle-tonos");
  tonosDiv.innerHTML = "";
  if (producto.tonalidades) {
    producto.tonalidades.forEach(t => {
      const btn = document.createElement("button");
      btn.textContent = t.nombre;
      btn.className = "tono-btn";
      btn.onclick = () => {
        document.getElementById("detalle-img").src = t.imagen;
        document.getElementById("detalle-nombre").textContent = t.nombre;
      };
      tonosDiv.appendChild(btn);
    });
  }

  // Agregar al carrito desde detalle
  const btn = document.getElementById("btn-agregar-detalle");
  btn.onclick = () => agregarAlCarrito(producto.nombre, producto.precio);

  document.getElementById("detalle-dinamico").classList.remove("oculto");
}

function cerrarDetalle() {
  document.getElementById("detalle-dinamico").classList.add("oculto");
}
