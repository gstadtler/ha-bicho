'use strict'

// SDK de Mercado Pago
const MercadoPago = require('mercadopago');

class PaymentController {
  async checkout({ request }) {

    MercadoPago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    });

    const { id, description, amount } = request.params;
    const donation = `Doação para o abrigo: ${description}`;

    //Create purchase item object template
    const donate = {
      items: [
        {
          id: id,
          title: description,
          description: donation,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],

      auto_return: "all",
      back_urls: {
        success: process.env.ENV_HOST + "/payments/success",
        pending: process.env.ENV_HOST + "/payments/pending",
        failure: process.env.ENV_HOST + "/payments/failure",
      }

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
