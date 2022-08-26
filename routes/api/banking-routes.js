const router = require('express').Router();
const { AccountController, CustomerController } = require('../../components/');

// Customers routes
router.get('/customers', CustomerController.getCustomers);
router.get('/customers/ids/:id', CustomerController.getCustomerById);
router.get('/customers/names/:name', CustomerController.getCustomerByName);
router.post('/customers', CustomerController.createCustomer);
router.delete('/customers/ids/:id', CustomerController.deleteCustomerById);
router.put('/customers/ids/:id', CustomerController.updateCustomerById);

// Accounts routes
router.get('/accounts', AccountController.getAccounts);
router.get('/accounts/ids/:id', AccountController.getAccountById);
router.get(
  '/accounts/ids/:id/balance',
  AccountController.getAccountBalanceById
);
router.post('/accounts', AccountController.createAccount);
router.put('/accounts/ids/:id/deposit', AccountController.depositByAccountId);

router.delete('/accounts/ids/:id', AccountController.deleteAccountById);
// Transactions routes

module.exports = router;
