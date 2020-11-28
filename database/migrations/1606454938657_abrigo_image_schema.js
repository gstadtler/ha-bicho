'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AbrigoImageSchema extends Schema {
  up () {
    this.create('abrigo_images', (table) => {
      table.increments()
      table
        .integer('abrigo_id')
        .unsigned()
        .references('id')
        .inTable('abrigos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('abrigo_images')
  }
}

module.exports = AbrigoImageSchema
