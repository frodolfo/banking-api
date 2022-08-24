/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('customers').del();
  await knex('customers').insert([
    {
      id: 1,
      name: 'Arisha Barron',
    },
    {
      id: 2,
      name: 'Branden Gibson',
    },
    {
      id: 3,
      name: 'Rhonda Church',
    },
    {
      id: 4,
      name: 'Georgina Hazel',
    },
  ]);
};
