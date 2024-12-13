const knex = require('knex');
const knexfile = require('../../knexfile');

// Elegimos la configuración según el ambiente
const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

// Creamos la instancia de conexión
const connection = knex(config);

module.exports = connection;