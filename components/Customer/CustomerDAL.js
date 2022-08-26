const db = require('../../data/db');

class CustomerDAL {
  /**
   *
   * @returns Array of customer objects
   */
  async getCustomers() {
    try {
      const customers = await db('customers').orderBy('name', 'ASC');

      return { status: 'Success', data: customers };
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
      if (!customerName) throw error;

      const [id] = await db('customers')
        .insert({ name: `${customerName}` })
        .returning(['id', 'name']);

      return { status: 'Success', data: id };
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
      if (!customerId) throw error;

      const [id, name] = await db('customers')
        .where({ id: `${customerId}` })
        .returning(['id', 'name']);

      return { status: 'Success', data: { id, name } };
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
      if (!customerName) throw error;

      const [id, name] = await db('customers')
        .where({
          name: `${customerName}`,
        })
        .returning(['id', 'name']);

      if (!id || !name) throw error;

      return { status: 'Success', data: { id, name } };
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
      if (!customerId) throw error;

      const success = await db('customers')
        .where({ id: `${customerId}` })
        .del();

      console.log('success: ', success);

      if (success === 1) {
        return {
          status: 'Success',
          message: `Customer with ID ${customerId} has been deleted successfully`,
        };
      } else {
        return {
          status: 'Failure',
          message: `Customer with ID ${customerId} could not be found`,
        };
      }
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
      if (!customerId || !customerData) throw error;

      const [customer] = await db('customers')
        .where({ id: `${customerId}` })
        .update({ ...customerData }, ['id', 'name']);

      return { status: 'Success', data: customer };
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
