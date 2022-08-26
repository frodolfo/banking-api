const router = require('express').Router();
const { AccountController } = require('../../components/');

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

module.exports = router;
