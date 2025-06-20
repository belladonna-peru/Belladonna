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
    imagen: "https://via.placeholder.com/200x200.png?text=Labial+Mate"
  },
  {
    nombre: "Base Líquida Natural",
    categoria: "base",
    marca: "zeena",
    precio: 55,
    imagen: "https://via.placeholder.com/200x200.png?text=Base+Líquida"
  },
  {
    nombre: "Sérum Hidratante",
    categoria: "cuidadopiel",
    marca: "masglo",
    precio: 60,
    imagen: "https://via.placeholder.com/200x200.png?text=Serum"
  }
];

// ============================
// FUNCIÓN: TOGGLE CARRITO
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
// FILTRO Y BUSCADOR DE PRODUCTOS
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

  const resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (categoria === "" || p.categoria === categoria) &&
    (marca === "" || p.marca === marca) &&
    p.precio <= precioMax
  );

  // Ordenar productos si se especifica
  if (orden === "precio-asc") resultado.sort((a, b) => a.precio - b.precio);
  else if (orden === "precio-desc") resultado.sort((a, b) => b.precio - a.precio);
  else if (orden === "nombre-asc") resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  else if (orden === "nombre-desc") resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));

  document.getElementById("precio-valor").textContent = `S/ ${precioMax}`;
  mostrarProductos(resultado);
}

// ============================
// CAMBIO DE VISTA GRID/LISTA
// ============================
function cambiarVista(vista) {
  const cont = document.getElementById("productos");
  if (!cont) return;
  cont.classList.toggle("grid", vista === 'grid');
  cont.classList.toggle("list", vista === 'list');
}

// ============================
// CAMBIO DE IMAGEN EN DETALLE
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

  let img = "";
  if (metodo === "yape") {
    img = '<img src="img/IMG_2346.jpeg" alt="Pago con Yape" style="max-width: 200px;">';
  } else if (metodo === "plin") {
    img = '<img src="img/plin_qr.jpeg" alt="Pago con Plin" style="max-width: 200px;">';
  } else if (metodo === "transferencia") {
    img = "<p>Realiza tu transferencia a la cuenta: 123-4567890-00 a nombre de Belladonna Perú</p>";
  }

  contenedor.innerHTML = img;
}

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar productos al cargar
  mostrarProductos(productos);

  // Formulario de pago
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

      msg.textContent = "✅ Gracias por tu compra, en breve te contactaremos para coordinar el envío.";
      msg.style.color = "#28a745";
      formPago.reset();
      document.getElementById("imagenPago").innerHTML = "";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
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
});

function mostrarImagenPago() {
  const metodo = document.getElementById("metodoPago").value;
  const contenedor = document.getElementById("imagenPago");

  let contenido = "";

  if (metodo === "yape") {
    contenido = `
      <p>Escanea el código QR de Yape:</p>
      <img src="img/yape_qr.jpg" alt="Yape QR" style="max-width: 220px; border-radius: 10px;">
    `;
  } else if (metodo === "plin") {
    contenido = `
      <p>Escanea el código QR de Plin:</p>
      <img src="img/plin_qr.jpg" alt="Plin QR" style="max-width: 220px; border-radius: 10px;">
    `;
  } else if (metodo === "transferencia") {
    contenido = `
      <p>Realiza la transferencia a:</p>
      <ul style="text-align: left; padding-left: 20px;">
        <li><strong>Banco:</strong> BCP</li>
        <li><strong>N° Cuenta:</strong> 191-23456789-0-12</li>
        <li><strong>CCI:</strong> 00219100234567890123</li>
        <li><strong>Nombre:</strong> Belladonna Perú</li>
      </ul>
    `;
  }

  contenedor.innerHTML = contenido;
}