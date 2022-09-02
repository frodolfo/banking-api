require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    // connection: `${process.env.DB_URL}`,
    // connection:
    //   'postgres://hgxkudfy:MxxbIyP2Y_m2iybYhM5XJuvPUVfrA776@heffalump.db.elephantsql.com/hgxkudfy',
    // connection: 'postgres://postgres:password@localhost:5432/onward',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env_DB_DATABASE || 'onward',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: '../migrations',
    },
    seeds: { directory: '../seeds' },
  },

  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env_DB_DATABASE || 'onward_test',
    },
    migrations: {
      directory: '../migrations',
    },
    seeds: { directory: '../seeds' },
  },

  production: {
    client: 'pg',
    connection: `${process.env.DB_URL}`,
    migrations: {
      directory: '../migrations',
    },
    seeds: { directory: '../seeds' },
  },
};
