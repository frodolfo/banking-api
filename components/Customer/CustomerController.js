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

  async getCustomerByName(req, res) {
    try {
      // TODO: delete this
      console.log('*** Inside CustomerController.getCustomer');
      console.log('req.body: ', req.body);

      const id = CustomerService.getCustomerByName(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new CustomerController();
