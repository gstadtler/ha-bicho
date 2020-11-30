'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonationSchema extends Schema {
  up () {
    this.create('donations', (table) => {
      table.increments()
      table
        .integer('abrigo_id')
        .unsigned()
        .references('id')
        .inTable('abrigos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.decimal('quantia').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('donations')
  }
}

module.exports = DonationSchema
