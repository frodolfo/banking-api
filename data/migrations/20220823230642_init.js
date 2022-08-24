/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('customers', (table) => {
      table.increments('id');
      table.text('name', 255).notNullable();
      table.timestamps(true, true);
    })
    .createTable('accounts', (table) => {
      table.increments('id');
      table.integer('customer_id').notNullable();
      table.text('type', 128).notNullable();
      table.numeric('balance').notNullable();
      table.timestamps(true, true);
    })
    .createTable('transactions', (table) => {
      table.increments();
      table.dateTime('transaction_date');
      table.integer('customer_id').notNullable();
      table.numeric('amount');
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('customers')
    .dropTableIfExists('accounts')
    .dropTableIfExists('transactions');
};
