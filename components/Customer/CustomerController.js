const CustomerService = require('./CustomerService');

class CustomerController {
  async getCustomers(req, res) {
    try {
      const customers = await CustomerService.getCustomers();

      if (customers.status && customers.status === 'Failure') {
        res.status(404).json(customers);
      }

      res.status(200).json(customers);
    } catch (err) {
      console.error(err);
    }
  }

  async createCustomer(req, res) {
    try {
      const id = await CustomerService.createCustomer(req.body);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerById(req, res) {
    try {
      const id = await CustomerService.getCustomerById(req.params.id);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerByName(req, res) {
    try {
      const id = await CustomerService.getCustomerByName(req.params.name);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
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

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new CustomerController();
