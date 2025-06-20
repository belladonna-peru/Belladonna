// Cotizador de envío
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

// Mensaje de pago simulado
document.addEventListener("DOMContentLoaded", () => {
  const formPago = document.getElementById("formPago");
  const msg = document.getElementById("pago-msg");

  if (formPago) {
    formPago.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.textContent = "Gracias por tu compra, en breve te contactaremos para coordinar el envío.";
      formPago.reset();
    });
  }
});

// Carrito de compras
let carrito = [];
let total = 0;

function toggleCarrito() {
  document.getElementById("carrito").classList.toggle("abierto");
}

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
  contador.textContent = carrito.length;
}

function finalizarCompra() {
  alert("Gracias por tu compra 🛍️");
  carrito = [];
  actualizarCarrito();
  toggleCarrito();
}

function mostrarImagenPago() {
  const metodo = document.getElementById("metodoPago").value;
  const imagenDiv = document.getElementById("imagenPago");

  let ruta = "";
  if (metodo === "yape") ruta = "img/yape.png";
  else if (metodo === "plin") ruta = "img/plin.png";
  else if (metodo === "transferencia") ruta = "img/transferencia.png";
  else ruta = "";

  if (ruta) {
    imagenDiv.innerHTML = `<img src="${ruta}" alt="${metodo}" style="max-width: 250px; border-radius: 10px;">`;
  } else {
    imagenDiv.innerHTML = "";
  }
}

// Validación y mensaje
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

      msg.textContent = "✅ Gracias por tu compra, en breve te contactaremos para coordinar el envío.";
      msg.style.color = "#28a745";
      formPago.reset();
      document.getElementById("imagenPago").innerHTML = "";
    });
  }
});
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

