const router = require('express').Router();
const { AccountController } = require('../../components/');

// Accounts routes
router.get('/accounts', AccountController.getAccounts);
router.get('/accounts/ids/:id', AccountController.getAccountsById);
router.get(
  '/accounts/ids/:id/balance',
  AccountController.getAccountBalanceById
);
router.post('/accounts', AccountController.createAccount);
router.patch('/accounts/ids/:id/deposit', AccountController.depositByAccountId);
router.patch(
  '/accounts/ids/:id/withdraw',
  AccountController.withdrawByAccountId
);
router.patch(
  '/accounts/ids/:id/transfer',
  AccountController.transferAmountByAccountId
);
router.delete('/accounts/ids/:id', AccountController.deleteAccountById);

module.exports = router;
