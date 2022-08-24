require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    // connection: `${process.env.DB_URL}`,
    connection:
      'postgres://hgxkudfy:MxxbIyP2Y_m2iybYhM5XJuvPUVfrA776@heffalump.db.elephantsql.com/hgxkudfy',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  testing: {
    client: 'pg',
    connection: `${process.env.DB_URL}`,
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  production: {
    client: 'pg',
    connection: `${process.env.DB_URL}`,
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },
};
