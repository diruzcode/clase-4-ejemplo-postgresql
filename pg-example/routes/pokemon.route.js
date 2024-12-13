// routes/pokemon.routes.js
const express = require('express');
const router = express.Router();
const PokemonService = require('../services/pokemon.services');
const { ErrorHandler, RequestValidator } = require('../middleware');

// Crear un nuevo Pokémon
router.post('/', 
    RequestValidator.validatePokemon,
    ErrorHandler.catchAsync(async (req, res) => {
        const pokemon = await PokemonService.createPokemon(req.body);
        res.status(201).json({
            success: true,
            data: pokemon,
            message: 'Pokémon creado exitosamente'
        });
    })
);

// Obtener todos los Pokémon con paginación y filtros opcionales
router.get('/',
    ErrorHandler.catchAsync(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filters = {
            ...(req.query.type && { type_pokemon_id: req.query.type }),
            ...(req.query.name && { name: req.query.name })
        };
        
        const result = await PokemonService.getAllPokemon(page, limit, filters);
        res.json({
            success: true,
            data: result.pokemons,
            pagination: result.pagination
        });
    })
);

// Obtener un Pokémon por número
router.get('/:number',
    ErrorHandler.catchAsync(async (req, res) => {
        const number = parseInt(req.params.number);
        const pokemon = await PokemonService.getPokemonByNumber(number);
        
        res.json({
            success: true,
            data: pokemon
        });
    })
);

// Actualizar un Pokémon
router.put('/:number',
    RequestValidator.validatePokemon,
    ErrorHandler.catchAsync(async (req, res) => {
        const number = parseInt(req.params.number);
        const updatedPokemon = await PokemonService.updatePokemon(number, req.body);
        
        res.json({
            success: true,
            data: updatedPokemon,
            message: 'Pokémon actualizado exitosamente'
        });
    })
);

// Eliminar un Pokémon
router.delete('/:number',
    ErrorHandler.catchAsync(async (req, res) => {
        const number = parseInt(req.params.number);
        await PokemonService.deletePokemon(number);
        
        res.json({
            success: true,
            message: 'Pokémon eliminado exitosamente'
        });
    })
);

// Obtener Pokémon por tipo
router.get('/type/:typeId',
    ErrorHandler.catchAsync(async (req, res) => {
        const typeId = parseInt(req.params.typeId);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await PokemonService.getPokemonByType(typeId, page, limit);
        res.json({
            success: true,
            data: result.pokemons,
            pagination: result.pagination
        });
    })
);

module.exports = router;