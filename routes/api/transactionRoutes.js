const router = require('express').Router();
const { TransactionController } = require('../../components/');

// Customers routes
router.get('/transactions', TransactionController.getTransactions);
router.get('/transactions/ids/:id', TransactionController.getTransactionById);
router.post('/transactions', TransactionController.createTransaction);
router.delete(
  '/transactions/ids/:id',
  TransactionController.deleteTransactionById
);

module.exports = router;
