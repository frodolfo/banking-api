const TransactionDAL = require('./TransactionDAL');

class TransactionService {
  getTransactions(page, limit) {
    return TransactionDAL.getTransactions(page, limit);
  }

  createTransaction(transactionDTO) {
    if (!transactionDTO) return;

    return TransactionDAL.createTransaction(transactionDTO);
  }

  getTransactionsByCustomerId(customerId) {
    return TransactionDAL.getTransactionsByCustomerId(customerId);
  }

  getTransactionById(transactionId) {
    return TransactionDAL.getTransactionById(transactionId);
  }

  deleteTransactionById(transactionId) {
    return TransactionDAL.deleteTransactionById(transactionId);
  }
}

module.exports = new TransactionService();
