const customerService = require('./CustomerService');

class CustomerController {
  async createCustomer(req, res) {
    try {
      const id = customerService.createCustomer(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new CustomerController();
