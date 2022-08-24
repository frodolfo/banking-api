/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('customers').del();
  await knex('customers').insert([
    {
      name: 'Arisha Barron',
    },
    {
      name: 'Branden Gibson',
    },
    {
      name: 'Rhonda Church',
    },
    {
      name: 'Georgina Hazel',
    },
  ]);
};
