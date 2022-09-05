const db = require('../../data/db');

class TransactionDAL {
  /**
   *
   * @param {Number} pageNum - page number
   * @param {Number} maxRecords - maximum number of records per page
   * @returns Array of transaction objects
   */
  async getTransactions(pageNum, maxRecords) {
    let pageOffset = !isNaN(pageNum) ? (pageNum > 0 ? pageNum - 1 : 0) : 0;
    let maxPerPage = !isNaN(maxRecords) ? (maxRecords > 0 ? maxRecords : 1) : 1;

    try {
      const transactions = await db('transactions')
        .limit(maxPerPage)
        .offset(pageOffset * maxPerPage, { skipBinding: true })
        .orderBy('transaction_date', 'ASC');

      return { status: 'Success', data: transactions };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve list of transactions`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} customerName - customer full name
   * @returns {Object} transaction details
   */
  async createTransaction(transactionDTO) {
    try {
      if (!transactionDTO) throw error;

      const [transaction] = await db('transactions')
        .insert({
          customer_id: transactionDTO?.customer_id,
          account_id: transactionDTO?.account_id,
          transaction_date: transactionDTO?.transaction_date,
          transaction_type: transactionDTO?.transaction_type,
          amount: transactionDTO?.amount,
        })
        .returning([
          'id',
          'customer_id',
          'account_id',
          'transaction_type',
          'transaction_date',
          'amount',
        ]);

      return { status: 'Success', data: transaction };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not create new transaction`,
        code: err.code,
        severity: err.severity,
        payload: { transaction: `${transactionDTO}` },
      };

      return errRes;
    }
  }

  async getTransactionsByCustomerId(customerId) {
    try {
      if (!customerId) throw error;

      const transactions = await db('transactions')
        .where({ customer_id: `${customerId}` })
        .returning([
          'id',
          'customer_id',
          'account_id',
          'transaction_type',
          'transaction_date',
          'amount',
        ]);

      return { status: 'Success', data: transactions };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not list of transactions for customer with ID: ${customerId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} transactionId - transaction UUID
   * @returns {Object} transaction details
   */
  async getTransactionById(transactionId) {
    try {
      if (!transactionId) throw error;

      const [transaction] = await db('transactions')
        .where({ id: `${transactionId}` })
        .returning(['id', 'customer_id', 'transaction_date', 'amount']);

      return { status: 'Success', data: transaction };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve customer with ID: ${transactionId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} transactionId - customer UUID
   * @returns {String} result message
   */
  async deleteTransactionById(transactionId) {
    try {
      if (!transactionId) throw error;

      const success = await db('transactions')
        .where({ id: `${transactionId}` })
        .del();

      if (success === 1) {
        return {
          status: 'Success',
          message: `Transaction with ID ${transactionId} has been deleted successfully`,
        };
      } else {
        return {
          status: 'Failure',
          message: `Transaction with ID ${transactionId} could not be found`,
        };
      }
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not delete transaction with ID: ${transactionId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }
}

module.exports = new TransactionDAL();
