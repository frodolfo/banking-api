const router = require('express').Router();
const { CustomerController } = require('../../components/');

// Customers routes
router.get('/customers', CustomerController.getCustomers);
router.get('/customers/ids/:id', CustomerController.getCustomerById);
router.get(
  '/customers/ids/:id/accounts',
  CustomerController.getCustomerAccountsById
);
router.get('/customers/names/:name', CustomerController.getCustomerByName);
router.post('/customers', CustomerController.createCustomer);
router.delete('/customers/ids/:id', CustomerController.deleteCustomerById);
router.patch('/customers/ids/:id', CustomerController.updateCustomerById);

module.exports = router;
