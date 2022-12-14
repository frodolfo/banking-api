/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  const exists = await knex.schema.hasTable('users');

  if (!exists) {
    return knex.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.text('first_name', 128).notNullable();
      table.text('last_name', 128).notNullable();
      table.text('email', 255).notNullable();
      table.text('username', 255).notNullable();
      table.text('password', 255).notNullable();
      table
        .smallint('role_id')
        .notNullable()
        .references('id')
        .inTable('role')
        .onDelete('cascade');
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('users');
