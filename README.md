# PayPal Quick Start Integration (SDK v6)

Integración mínima de **PayPal Checkout** siguiendo la guía oficial actualizada.

## Pasos para usarlo

1. Copia `.env.example` a `.env` y pon tus credenciales de Sandbox:
   ```
   PAYPAL_CLIENT_ID=tu_client_id
   PAYPAL_CLIENT_SECRET=tu_secret
   ```

2. En `public/index.html` cambia `YOUR_CLIENT_ID` por tu Client ID real.

3. Instala dependencias y corre:
   ```bash
   npm install
   node server.js
   ```

4. Abre: `http://localhost:3000`

## Notas

- El monto está fijo en **$10.00 USD** (cámbialo en `server.js`).
- Está configurado en **Sandbox** por defecto.
- Para producción: cambia `NODE_ENV=production` y usa las credenciales Live.
- El cliente puede pagar con **Visa/Mastercard** sin tener cuenta de PayPal.

## Obtener credenciales

1. Ve a [developer.paypal.com](https://developer.paypal.com)
2. Dashboard → Apps & Credentials → Create App
3. Copia Client ID y Secret (Sandbox)
