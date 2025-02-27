// knexfile.js
module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        host: 'localhost',
        database: 'clase-5-docker',
        user: 'postgres',
        password: 'local2'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './src/database/migrations'
      },
      seeds: {
        directory: './src/database/seeds'
      }
    },
    production: {
      client: 'postgresql',
      connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './src/database/migrations'
      }
    }
  };
  