exports.up = function (knex) {
  return knex.schema.alterTable('loan', (table) => {
    table.string('status').notNullable().alter()
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('loan', (table) => {
    table.dropColumns('status')
  })
}
