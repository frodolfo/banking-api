const customerDAL = require('./CustomerDAL');

class CustomerService {
  getCustomers() {
    return customerDAL.getCustomers();
  }

  createCustomer(customerDTO) {
    if (!customerDTO) return;
    const { name } = customerDTO;
    return customerDAL.createCustomer(name);
  }

  getCustomerById(customerId) {
    return customerDAL.getCustomerById(customerId);
  }

  getCustomerByName(customerName) {
    return customerDAL.getCustomerByName(customerName);
  }

  deleteCustomerById(customerId) {
    return customerDAL.deleteCustomerById(customerId);
  }

  updateCustomerById(customerDTO) {
    if (!customerDTO) return;
    return customerDAL.updateCustomerById(customerDTO.id, { ...customerDTO });
  }
}

module.exports = new CustomerService();
