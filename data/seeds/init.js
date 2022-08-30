const customers = require('../mock/customers');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('customers').del();
  // Load sample customers entries
  await knex('customers').insert(customers);
};
