const express = require('express');
const router = express.Router();
const PokemonServices = require('./services/pokemon.services');
const connectDB = require('./repository/db');

router.post('/v1/pokemon', async(req, res) => {
    try {
        console.log("aqui vamos a crear un pokemon")
        const _pokemonService = new PokemonServices()
        const newPokemon = await _pokemonService.createPokemon(req.body)

        res.status(201).json({
            data: newPokemon
        })
    } catch (error) {
        console.log("error", error)
        console.log("aqui vamos a caer por errores")
    }
})


const app = express();
app.use(express.json());

app.use("/", router);


const startServer = async() => {
    try {
        await connectDB();
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log("Mi api pokedex")
        })
    
    } catch (error) {
        console.log("error", error)
    }
}

startServer()