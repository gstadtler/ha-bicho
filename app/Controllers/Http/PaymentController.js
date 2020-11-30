'use strict'

// SDK de Mercado Pago
const MercadoPago = require('mercadopago');

class PaymentController {
  async checkout({ request, auth }) {

    MercadoPago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    });

    const { id, abrigo, amount } = request.params;
    const donation = `Doação para o abrigo: ${abrigo}`;
    const user = await auth.getUser();
    const { username, email } = user;

    //Create purchase item object template
    const donate = {
      items: [
        {
          id: id,
          title: donation,
          description: donation,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],
      payer: {
        name: username,
        email: email,
      },
      back_urls: {
        success: process.env.ENV_HOST + "/payments/success",
        pending: process.env.ENV_HOST + "/payments/pending",
        failure: process.env.ENV_HOST + "/payments/failure",
      },
      auto_return: "approved",

    };

    //Generate init_point to checkout
    try {
      const response = await MercadoPago.preferences.create(donate);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PaymentController
