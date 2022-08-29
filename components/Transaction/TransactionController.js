const CustomerService = require('./TransactionService');

class TransactionController {
  async getTransactions(req, res) {
    try {
      let page = req.query?.page || 0;
      let limit = req.query?.limit || 10;

      const transactions = await TransactionrService.getTransactions(
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

  async createTransaction(req, res) {
    try {
      const id = await TransactionService.createTransaction(req.body);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async getTransactionById(req, res) {
    try {
      const id = await TransactionService.getTransactionById(req.params.id);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteTransactionById(req, res) {
    try {
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
