const CustomerDAL = require('./CustomerDAL');

class CustomerService {
  getCustomers(page, limit) {
    return CustomerDAL.getCustomers(page, limit);
  }

  createCustomer(customerDTO) {
    if (!customerDTO) return;
    const { name } = customerDTO;
    return CustomerDAL.createCustomer(name);
  }

  getCustomerById(customerId) {
    return CustomerDAL.getCustomerById(customerId);
  }

  getCustomerByName(customerName) {
    return CustomerDAL.getCustomerByName(customerName);
  }

  getCustomerAccountsById(customerId) {
    return CustomerDAL.getCustomerAccountsById(customerId);
  }

  deleteCustomerById(customerId) {
    return CustomerDAL.deleteCustomerById(customerId);
  }

  updateCustomerById(customerId, customerDTO) {
    if (!customerId || !customerDTO) return;
    return CustomerDAL.updateCustomerById(customerId, customerDTO);
  }
}

module.exports = new CustomerService();
