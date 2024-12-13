const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TypePokemon = require('./typePokemon.model');

const Pokemon = sequelize.define('Pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hp: {
        type: DataTypes.INTEGER
    },
    defense: {
        type: DataTypes.INTEGER
    },
    attack: {
        type: DataTypes.INTEGER
    },
    speed: {
        type: DataTypes.INTEGER
    },
    type_pokemon_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TypePokemon,
            key: 'id'
        }
    }
}, {
    tableName: 'pokemons',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Definir la relación entre Pokemon y TypePokemon
Pokemon.belongsTo(TypePokemon, {
    foreignKey: 'type_pokemon_id',
    as: 'type'
});

module.exports = Pokemon;