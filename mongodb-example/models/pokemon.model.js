const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['fire', 'water', 'ghost', 'electric', 'normal']
    },
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        speed: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;