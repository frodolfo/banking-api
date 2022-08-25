const router = require('express').Router();
const { CustomerController } = require('../../components/Customer/');

// TODO: delete this
console.log(
  'CustomerController.getCustomers: ',
  CustomerController.getCustomers
);

// Customers routes
router.get('/customers', CustomerController.getCustomers);
router.post('/customers', CustomerController.createCustomer);

// Accounts routes

// Transactions routes

module.exports = router;
