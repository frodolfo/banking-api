const TransactionDAL = require('./TransactionDAL');

class TransactionService {
  getTransactions(page, limit) {
    return TransactionDAL.getTransactions(page, limit);
  }

  createTransaction(transactionDTO) {
    if (!transactionDTO) return;
    const { name } = transactionDTO;
    return TransactionDAL.createTransaction(name);
  }

  getTransactionById(transactionId) {
    return TransactionDAL.getTransactionById(transactionId);
  }

  deleteTransactionById(transactionId) {
    return TransactionDAL.deleteTransactionById(transactionId);
  }
}

module.exports = new TransactionService();
