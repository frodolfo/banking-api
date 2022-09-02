/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  const exists = await knex.schema.hasTable('transactions');

  if (!exists) {
    return knex.schema.createTable('transactions', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('customer_id')
        .notNullable()
        .references('id')
        .inTable('customers')
        .onDelete('cascade');
      table
        .uuid('account_id')
        .notNullable()
        .references('id')
        .inTable('accounts')
        .onDelete('cascade');
      table
        .enu('transaction_type', [
          'Activation',
          'Deposit',
          'Withdrawal',
          'Transfer',
          'Receive',
        ])
        .notNullable();
      table.dateTime('transaction_date');
      table.decimal('amount', 14, 2).notNullable();
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('transactions');
