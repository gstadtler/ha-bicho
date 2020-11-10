'use strict'

const Abrigo = use("App/Models/Abrigo");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with abrigos
 */
class AbrigoController {
  /**
   * Show a list of all abrigos.
   * GET abrigos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const abrigos = await Abrigo.all()
    return abrigos;
  }

  /**
   * Create/save a new abrigo.
   * POST abrigos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only([
      'cnpj_cpf',
      'nome',
      'email',
      'descricao',
      'qtd_animais',
      'telefone',
      'rua',
      'numero',
      'cep',
      'bairro',
      'cidade',
      'uf',
    ]);
    const abrigo = await Abrigo.create({ ...data });

    return abrigo;
  }

  /**
   * Display a single abrigo.
   * GET abrigos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const abrigo = await Abrigo.findOrFail(params.id);
    return abrigo;
  }

  /**
   * Render a form to update an existing abrigo.
   * GET abrigos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update abrigo details.
   * PUT or PATCH abrigos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const abrigo = await Abrigo.findOrFail(params.id);
    const data = request.only([
      'nome',
      'email',
      'descricao',
      'qtd_animais',
      'telefone',
      'rua',
      'numero',
      'cep',
      'bairro',
      'cidade',
      'uf'
    ]);
    
    abrigo.merge(data);
    await abrigo.save();
    
    return abrigo;
  }

  /**
   * Delete a abrigo with id.
   * DELETE abrigos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const abrigo = await Abrigo.findOrFail(params.id);
    await abrigo.delete();
  }
}

module.exports = AbrigoController
