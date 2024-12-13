exports.up = function(knex) {
    return knex.schema.createTable('pokemons', table => {
        // Creamos la tabla principal de Pokémon
        table.increments('id').primary();
        table.integer('number').notNullable().unique();
        table.string('name').notNullable();
        table.integer('hp');
        table.integer('defense');
        table.integer('attack');
        table.integer('speed');
        
        // Referencia al tipo de Pokémon
        table.integer('type_pokemon_id')
            .references('id')
            .inTable('type_pokemon')
            .onDelete('SET NULL');

        // Campos para timestamps y soft delete
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pokemons');
};
