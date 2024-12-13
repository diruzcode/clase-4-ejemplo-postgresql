// services/pokemon.service.js
const PokemonRepository = require('../repository/pokemon.repository');

class PokemonService {
    async createPokemon(pokemonData) {
        try {
            // Validaciones de negocio
            this.validatePokemonData(pokemonData);
            
            // Verificar si ya existe un Pokémon con ese número
            const existingPokemon = await PokemonRepository.findByNumber(pokemonData.number);
            if (existingPokemon) {
                throw new Error(`Ya existe un Pokémon con el número ${pokemonData.number}`);
            }

            return await PokemonRepository.create(pokemonData);
        } catch (error) {
            throw error;
        }
    }

    validatePokemonData(data) {
        if (!data.number || data.number < 1) {
            throw new Error('El número de Pokémon es inválido');
        }
        if (!data.name || data.name.trim().length === 0) {
            throw new Error('El nombre del Pokémon es requerido');
        }
        if (!data.type_pokemon_id) {
            throw new Error('El tipo de Pokémon es requerido');
        }
        // Validar que los stats sean números positivos si están presentes
        const stats = ['hp', 'attack', 'defense', 'speed'];
        stats.forEach(stat => {
            if (data[stat] !== undefined && (isNaN(data[stat]) || data[stat] < 0)) {
                throw new Error(`El valor de ${stat} debe ser un número positivo`);
            }
        });
    }

    async getPokemonByNumber(number) {
        const pokemon = await PokemonRepository.findByNumber(number);
        if (!pokemon) {
            throw new Error(`No se encontró un Pokémon con el número ${number}`);
        }
        return pokemon;
    }

    async deletePokemon(number) {
        // Validamos que el número sea válido
        if (!number || number < 1) {
            throw new Error('El número de Pokémon debe ser un número positivo');
        }

        // Intentamos eliminar el Pokémon
        const deletedPokemon = await PokemonRepository.delete(number);

        // Si no se encontró el Pokémon, lanzamos un error
        if (!deletedPokemon) {
            throw new Error(`No se encontró un Pokémon con el número ${number}`);
        }

        return {
            message: `El Pokémon ${deletedPokemon.name} ha sido eliminado exitosamente`,
            deletedPokemon
        };
    }

    async getAllPokemon(page = 1, limit = 10, criteria = {}) {
        const result = await PokemonRepository.findAll(criteria, { page, limit });
        return {
            pokemons: result.rows,
            pagination: {
                total: result.count,
                page,
                limit,
                totalPages: Math.ceil(result.count / limit)
            }
        };
    }
}

module.exports = new PokemonService();