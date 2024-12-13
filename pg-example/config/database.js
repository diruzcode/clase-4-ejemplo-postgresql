const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pokedex', 'postgres', 'local', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false // Puedes habilitarlo para ver las consultas SQL
});

module.exports = {
    sequelize
};
