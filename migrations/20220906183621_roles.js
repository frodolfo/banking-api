/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  const exists = await knex.schema.hasTable('roles');

  if (!exists) {
    return knex.schema.createTable('roles', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.text('first_name', 128).notNullable();
      table.text('last_name', 128).notNullable();
      table.text('email', 255).notNullable();
      table.text('password', 255).notNullable();
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('roles');
