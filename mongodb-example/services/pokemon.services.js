const PokemonRepository = require('../repository/pokemon.repository')



class PokemonServices { 

     constructor(){
        this.pokemonRepository = new PokemonRepository();
     }

     async createPokemon(pokemonData){
         console.log("pokemonData", pokemonData)

        return await this.pokemonRepository.create(pokemonData);
     }
}

module.exports = PokemonServices;