const db = require('../../data/db');

class CustomerDAL {
  /**
   *
   * @returns Array of customer objects
   */
  async getCustomers() {
    try {
      const customers = await db('customers').orderBy('name', 'ASC');

      return customers;
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve list of customers`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} customerName - customer full name
   * @returns {Object} id of customer
   */
  async createCustomer(customerName) {
    try {
      const [id] = await db('customers')
        .insert({ name: `${customerName}` })
        .returning(['id', 'name']);

      return id;
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not create new customer`,
        code: err.code,
        severity: err.severity,
        payload: { name: `${customerName}` },
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} customerId - customer UUID
   * @returns {Object} id and name
   */
  async getCustomerById(customerId) {
    try {
      const [id, name] = await db('customers')
        .where({ id: `${customerId}` })
        .returning(['id', 'name']);

      return { id, name };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve customer with ID: ${customerId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} customerName - customer name
   * @returns {Object} id and name
   */
  async getCustomerByName(customerName) {
    try {
      const [id, name] = await db('customers')
        .where({
          name: `${customerName}`,
        })
        .returning(['id', 'name']);

      return { id, name };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve customer with name: ${customerName}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
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
      const errRes = {
        status: 'Failure',
        description: `Could not delete customer with ID: ${customerId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
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
      const errRes = {
        status: 'Failure',
        description: `Could not update customer with ID: ${customerId}`,
        code: err.code,
        severity: err.severity,
        payload: customerData,
      };

      return errRes;
    }
  }
}

module.exports = new CustomerDAL();
