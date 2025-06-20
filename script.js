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