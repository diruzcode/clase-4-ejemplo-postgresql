exports.up = function(knex) {
    return knex.schema.createTable('type_pokemon', table => {
        // Creamos la tabla de tipos de Pokémon
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('type_pokemon');
};

