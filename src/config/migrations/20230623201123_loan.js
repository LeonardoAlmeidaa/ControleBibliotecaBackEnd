exports.up = function(knex) {
    return knex.schema.createTable('loan', function (table) {
        table.increments('id').primary(),
        table.integer('id_user').unsigned().notNullable(),
        table.foreign('id_user').references('user.id'),
        table.integer('id_book').unsigned().notNullable(),
        table.foreign('id_book').references('book.id'),
        table.datetime('loan_start').notNullable(),
        table.datetime('loan_end').notNullable(),
        table.boolean('status').defaultTo(null),
        table.string('obs', 1000),
        table.timestamps(true,true),
        table.datetime('deleted_at').defaultTo(null) 
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('loan')
}
