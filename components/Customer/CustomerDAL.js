const db = require('../../data/db');

class CustomerDAL {
  /**
   *
   * @returns Array of customer objects
   */
  async getCustomers() {
    const customers = await db('customers').orderBy('name', 'ASC');

    return customers;
  }

  /**
   *
   * @param {String} customerName
   * @returns {uuid} id of customer
   */
  async createCustomer(customerName) {
    const [id] = await db('customers')
      .insert({ name: `${customerName}` })
      .returning(['id', 'name']);

    return id;
  }

  async getCustomerByName(fullName) {
    // TODO: delete these
    console.log('*** inside CustomerDAL.getCustomerByName');
    console.log('custName: ', fullName);

    const [id, name] = await db('customers').where({ name: `${fullName}` });

    return { id, name };
  }
}

module.exports = new CustomerDAL();
