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
   * @param {String} customerName - customer full name
   * @returns {Object} id of customer
   */
  async createCustomer(customerName) {
    const [id] = await db('customers')
      .insert({ name: `${customerName}` })
      .returning(['id', 'name']);

    return id;
  }

  /**
   *
   * @param {String} customerId - customer UUID
   * @returns {Object} id and name
   */
  async getCustomerById(customerId) {
    const [id, name] = await db('customers')
      .where({ id: `${customerId}` })
      .returning(['id', 'name']);

    return { id, name };
  }

  /**
   *
   * @param {String} customerName - customer name
   * @returns {Object} id and name
   */
  async getCustomerByName(customerName) {
    const [id, name] = await db('customers')
      .where({
        name: `${customerName}`,
      })
      .returning(['id', 'name']);

    return { id, name };
  }

  /**
   *
   * @param {String} customerId - customer UUID
   * @returns {String} result message
   */
  async deleteCustomerById(customerId) {
    try {
      const success = await db('customers')
        .where({ id: `${customerId}` })
        .del();

      return success === 1
        ? {
            result: `Customer with ID ${customerId} has been deleted successfully`,
          }
        : { result: `Customer with ID ${customerId} could not be found` };
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   *
   * @param {String} customerId - customer UUID
   * @param {Object} customerData - customer object
   * @returns {Object} id and name - customer UUID and full name
   */
  async updateCustomerById(customerId, customerData) {
    try {
      const [customer] = await db('customers')
        .where({ id: `${customerId}` })
        .update({ ...customerData }, ['id', 'name']);

      return customer;
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new CustomerDAL();
