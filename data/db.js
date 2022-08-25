const knex = require('knex');
const knexfile = require('./knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];
const connection = knex(configOptions);

module.exports = connection;
