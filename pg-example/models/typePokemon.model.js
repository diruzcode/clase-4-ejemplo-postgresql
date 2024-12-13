const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TypePokemon = sequelize.define('TypePokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'type_pokemon',
    timestamps: false
});

module.exports = TypePokemon;