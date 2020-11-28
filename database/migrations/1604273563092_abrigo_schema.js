'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AbrigoSchema extends Schema {
  up () {
    this.create('abrigos', (table) => {
      table.increments()
      table.bigint('cnpj_cpf', 14).notNullable().unique()
      table.string('nome').notNullable()
      table.string('email').notNullable().unique()
      table.text('descricao').notNullable()
      table.text('historia')
      table.integer('qtd_animais').notNullable()
      table.bigint('telefone').notNullable()
      table.string('rua').notNullable()
      table.integer('numero').notNullable()
      table.integer('cep', 8).notNullable()
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.string('uf').notNullable()
      table.decimal('latitude', 9, 6)
      table.decimal('longitude', 9, 6)
      table.timestamps()
    })
  }

  down () {
    this.drop('abrigos')
  }
}

module.exports = AbrigoSchema
