const CustomerDAL = require('./CustomerDAL');

class CustomerService {
  getCustomers() {
    return CustomerDAL.getCustomers();
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

  deleteCustomerById(customerId) {
    return CustomerDAL.deleteCustomerById(customerId);
  }

  updateCustomerById(customerDTO) {
    if (!customerDTO) return;
    return CustomerDAL.updateCustomerById(customerDTO.id, { ...customerDTO });
  }
}

module.exports = new CustomerService();
