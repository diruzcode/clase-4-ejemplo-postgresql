exports.seed = function(knex) {
    // Primero limpiamos la tabla
    return knex('type_pokemon').del()
        .then(function () {
            // Insertamos los tipos básicos
            return knex('type_pokemon').insert([
                { name: 'Fire' },
                { name: 'Water' },
                { name: 'Ghost' },
                { name: 'Electric' },
                { name: 'Normal' }
            ]);
        });
};
