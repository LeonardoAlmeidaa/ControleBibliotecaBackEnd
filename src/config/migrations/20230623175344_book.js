exports.up = function(knex) {
    return knex.schema.createTable('book', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable,
        table.string('gender'),
        table.string('author'),
        table.string('quantity_pages', 5),
        table.datetime('date_acquisition'),
        table.boolean('status').defaultTo(true),
        table.string('obs', 1000),
        table.timestamps(true,true),
        table.datetime('deleted_at').defaultTo(null)
    })
}
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('book')
}