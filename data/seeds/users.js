/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { username: 'frodolfo', email: 'fred.rodolfo@gmail.com' },
    { username: 'fredrodolfo', email: 'frodolfo619@gmail.com' },
  ]);
};
