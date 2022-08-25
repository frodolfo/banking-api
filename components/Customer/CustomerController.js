const CustomerService = require('./CustomerService');

class CustomerController {
  async getCustomers(req, res) {
    try {
      const customers = await CustomerService.getCustomers();
      res.status(201).json(customers);
    } catch (err) {
      console.error(err);
    }
  }

  async createCustomer(req, res) {
    try {
      const id = await CustomerService.createCustomer(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerById(req, res) {
    try {
      const id = await CustomerService.getCustomerById(req.params.id);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerByName(req, res) {
    try {
      const id = await CustomerService.getCustomerByName(req.params.name);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCustomerById(req, res) {
    try {
      const id = await CustomerService.deleteCustomerById(req.params.id);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async updateCustomerById(req, res) {
    try {
      const id = await CustomerService.updateCustomerById(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new CustomerController();
