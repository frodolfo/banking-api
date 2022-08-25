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

  getCustomerByName(customerDTO) {
    // TODO: delete these
    console.log('*** inside CustomerService.getCustomerByName');
    console.log('customerDTO:', customerDTO);

    const { name } = customerDTO;
    return customerDAL.getCustomerByName(name);
  }
}

module.exports = new CustomerService();
