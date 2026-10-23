require("dotenv").config();
const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Configurar entorno (Sandbox o Live)
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (process.env.NODE_ENV === "production") {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

const client = new paypal.core.PayPalHttpClient(environment());

// Crear orden
app.post("/api/orders", async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "15", // ← Cambia el monto aquí
          },
          description: "VIP",
        },
      ],
    });

    const response = await client.execute(request);
    res.json({ id: response.result.id });
  } catch (err) {
    console.error("Error creando orden:", err);
    res.status(500).json({ error: "Error al crear la orden" });
  }
});

// Capturar pago
app.post("/api/orders/:orderId/capture", async (req, res) => {
  try {
    const { orderId } = req.params;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const response = await client.execute(request);
    res.json(response.result);
  } catch (err) {
    console.error("Error capturando pago:", err);
    res.status(500).json({ error: "Error al capturar el pago" });
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log("Recuerda poner tu Client ID y Secret en el archivo .env");
});
