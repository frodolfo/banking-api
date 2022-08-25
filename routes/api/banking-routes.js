const router = require('express').Router();
const { CustomerController } = require('../../components/Customer/');

// Customers routes
router.get('/customers', CustomerController.getCustomers);
router.get('/customers/ids/:id', CustomerController.getCustomerById);
router.get('/customers/names/:name', CustomerController.getCustomerByName);
router.post('/customers', CustomerController.createCustomer);
router.delete('/customers/ids/:id', CustomerController.deleteCustomerById);
router.put('/customers/ids/:id', CustomerController.updateCustomerById);

// Accounts routes

// Transactions routes

module.exports = router;
