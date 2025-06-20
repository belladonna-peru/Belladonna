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