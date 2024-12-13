const Pokemon = require('../models/pokemon.model')
const PokemonPG = require('../models/pokemon.model.pg')

class PokemonRepository { 

    async create(pokemonData) {
        const pokemon = new Pokemon(pokemonData);
        return await pokemon.save();
    }

    async createpg(pokemonData) {
        const pokemon = PokemonPG.create(pokemonData);
        return await pokemon.save();
    }
}

module.exports = PokemonRepository;