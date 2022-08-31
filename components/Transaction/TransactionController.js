const TransactionService = require('./TransactionService');

class TransactionController {
  async getTransactions(req, res) {
    try {
      let page = req.query?.page || 0;
      let limit = req.query?.limit || 10;

      const transactions = await TransactionService.getTransactions(
        page,
        limit
      );

      if (transactions.status && transactions.status === 'Failure') {
        res.status(404).json(transactions);
      }

      res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
    }
  }

  async createTransaction(req, res, next) {
    try {
      if (
        !req.body.customer_id ||
        !req.body.account_id ||
        !req.body.transaction_date ||
        !req.body.transaction_type ||
        !req.body.amount
      ) {
        const error = new Error(
          'Missing required parameters in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const id = await TransactionService.createTransaction(req.body);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async getTransactionsByCustomerId(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const transaction = await TransactionService.getTransactionsByCustomerId(
        req.params.id
      );

      if (transaction.status && transaction.status === 'Failure') {
        res.status(404).json(transaction);
      }

      res.status(200).json(transaction);
    } catch (err) {
      console.error(err);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const transaction = await TransactionService.getTransactionById(
        req.params.id
      );

      if (transaction.status && transaction.status === 'Failure') {
        res.status(404).json(transaction);
      }

      res.status(200).json(transaction);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteTransactionById(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const id = await TransactionService.deleteTransactionById(req.params.id);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new TransactionController();
