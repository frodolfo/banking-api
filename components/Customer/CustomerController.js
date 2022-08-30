const CustomerService = require('./CustomerService');

class CustomerController {
  async getCustomers(req, res) {
    try {
      let page = req.query?.page || 0;
      let limit = req.query?.limit || 10;

      const customers = await CustomerService.getCustomers(page, limit);

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

      res.status(200).json(id);
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

  async getCustomerAccountsById(req, res) {
    try {
      const accounts = await CustomerService.getCustomerAccountsById(
        req.params.id
      );

      if (accounts.status && accounts.status === 'Failure') {
        res.status(404).json(accounts);
      }

      res.status(200).json(accounts);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCustomerById(req, res) {
    try {
      const id = await CustomerService.deleteCustomerById(req.params.id);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
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
