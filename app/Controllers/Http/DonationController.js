'use strict'

const Donation = use("App/Models/Donation");
const Abrigo = use("App/Models/Abrigo");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with donations
 */
class DonationController {
  /**
   * Show a list of all donations.
   * GET donations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const donations = await Donation.all()
    return donations;
  }

  /**
   * Create/save a new donation.
   * POST donations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const abrigo = await Abrigo.findOrFail(params.abrigoId)
    const user = await User.findOrFail(params.userId)

    const abrigoId = abrigo.id;
    const userId = user.id;

    const data = request.only('quantia')

    const donation = await Donation.create({ abrigo_id: abrigoId, user_id: userId, ...data });

    return donation;
  }

  /**
   * Display a single donation.
   * GET donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const donation = await Donation.findOrFail(params.id);
    const abrigo = await donation.abrigo().fetch();
    const { quantia } = donation;
    const { nome } = abrigo;

    return response.json({ nome, quantia });
  }

  /**
   * Render a form to update an existing donation.
   * GET donations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update donation details.
   * PUT or PATCH donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a donation with id.
   * DELETE donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DonationController
