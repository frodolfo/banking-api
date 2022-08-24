const customerDAL = require('./CustomerDAL');

class CustomerService {
  createCustomer(customerDTO) {
    const { name } = customerDTO;
    return customerDAL.createCustomer(name);
  }
}

module.exports = new CustomerService();
