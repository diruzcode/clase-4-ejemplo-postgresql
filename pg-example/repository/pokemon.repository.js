// repositories/pokemon.repository.js
const Pokemon = require('../models/pokemon.model');
const TypePokemon = require('../models/typePokemon.model');

class PokemonRepository {
    async create(pokemonData) {
        try {
            const pokemon = await Pokemon.create(pokemonData);
            return await this.findById(pokemon.id);
        } catch (error) {
            throw new Error(`Error al crear el Pokémon: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Pokemon.findByPk(id, {
                include: [{
                    model: TypePokemon,
                    as: 'type',
                    attributes: ['name']
                }]
            });
        } catch (error) {
            throw new Error(`Error al buscar el Pokémon: ${error.message}`);
        }
    }

    async findByNumber(number) {
        try {
            return await Pokemon.findOne({
                where: { number },
                include: [{
                    model: TypePokemon,
                    as: 'type',
                    attributes: ['name']
                }]
            });
        } catch (error) {
            throw new Error(`Error al buscar el Pokémon por número: ${error.message}`);
        }
    }

    async findAll(criteria = {}, pagination = { page: 1, limit: 10 }) {
        try {
            const { page, limit } = pagination;
            const offset = (page - 1) * limit;

            return await Pokemon.findAndCountAll({
                where: criteria,
                limit,
                offset,
                include: [{
                    model: TypePokemon,
                    as: 'type',
                    attributes: ['name']
                }],
                order: [['number', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al buscar Pokémon: ${error.message}`);
        }
    }

    async delete(number) {
        try {
            // Buscamos primero el Pokémon para asegurarnos de que existe
            const pokemon = await Pokemon.findOne({ where: { number } });
            
            if (!pokemon) {
                return null;
            }

            // Realizamos la eliminación
            await pokemon.destroy();
            
            return pokemon;
        } catch (error) {
            throw new Error(`Error al eliminar el Pokémon: ${error.message}`);
        }
    }
}

module.exports = new PokemonRepository();