const CustomerService = require('./CustomerService');

class CustomerController {
  async getCustomers(req, res) {
    try {
      let page = req.query?.page || 0;
      let limit = req.query?.limit || 10;

      const customers = await CustomerService.getCustomers(page, limit);

      if (customers.status && customers.status === 'Failure') {
        res.status(404).json(customers);
      } else {
        res.status(200).json(customers);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createCustomer(req, res, next) {
    try {
      if (!req.body?.name) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const customer = await CustomerService.createCustomer(req.body);

      if (customer.status && customer.status === 'Failure') {
        res.status(404).json(customer);
      } else {
        res.status(200).json(customer);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      if (!req.params?.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const customer = await CustomerService.getCustomerById(req.params.id);

      if (customer.status && customer.status === 'Failure') {
        res.status(404).json(customer);
      } else {
        res.status(200).json(customer);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerByName(req, res, next) {
    try {
      if (!req.params?.name) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const customer = await CustomerService.getCustomerByName(req.params.name);

      if (customer.status && customer.status === 'Failure') {
        res.status(404).json(customer);
        res.end();
      } else {
        res.status(200).json(customer);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCustomerAccountsById(req, res, next) {
    try {
      if (!req.params?.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const accounts = await CustomerService.getCustomerAccountsById(
        req.params.id
      );

      if (accounts.status && accounts.status === 'Failure') {
        res.status(404).json(accounts);
      } else {
        res.status(200).json(accounts);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCustomerById(req, res, next) {
    try {
      if (!req.params?.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const deleteResult = await CustomerService.deleteCustomerById(
        req.params.id
      );

      if (deleteResult.status && deleteResult.status === 'Failure') {
        res.status(404).json(deleteResult);
      } else {
        res.status(200).json(deleteResult);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async updateCustomerById(req, res, next) {
    try {
      if (!req.params?.id || !req.body?.name) {
        const error = new Error(
          'Missing required parameters in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const customer = await CustomerService.updateCustomerById(
        req.params.id,
        req.body
      );

      if (customer.status && customer.status === 'Failure') {
        res.status(404).json(customer);
      } else {
        res.status(201).json(customer);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new CustomerController();
