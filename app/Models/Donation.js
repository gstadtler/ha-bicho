'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Donation extends Model {
  abrigo () {
    return this.belongsTo('App/Models/Abrigo')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Donation
