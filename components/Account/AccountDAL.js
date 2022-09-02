const { TransactionDAL } = require('../Transaction');
const { error } = require('console');
const db = require('../../data/db');

/** Class representing the Account Data Layer */
class AccountDAL {
  /**
   * Get All Accounts
   * @param {Number} pageNum - page number
   * @param {Number} maxRecords - maximum number of records per page
   * @returns
   */
  async getAccounts(pageNum, maxRecords) {
    let pageOffset = !isNaN(pageNum) ? (pageNum > 0 ? pageNum - 1 : 0) : 0;
    let maxPerPage = !isNaN(maxRecords) ? (maxRecords > 0 ? maxRecords : 1) : 1;

    try {
      const accounts = await db('accounts')
        .limit(maxPerPage)
        .offset(pageOffset * maxPerPage, { skipBinding: true });

      return { status: 'Success', data: accounts };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve list of accounts`,
        code: err.code,
        severity: err.severity,
      };
      return errRes;
    }
  }

  /**
   * Create a new account
   * @param {object} accountData - account payload
   * @returns {object} account details
   */
  async createAccount(accountData) {
    try {
      if (!accountData) throw error;

      const [account] = await db('accounts')
        .insert({ ...accountData })
        .returning([
          'id',
          'account_type',
          'customer_id',
          'balance',
          'created_at',
        ]);

      const transactionDetails = {
        account_id: account?.id,
        customer_id: account?.customer_id,
        amount: account?.balance,
        transaction_type: 'Activation',
        transaction_date: account?.created_at,
      };

      // Log transaction
      await TransactionDAL.createTransaction(transactionDetails);

      return { status: 'Success', data: account };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not create new account`,
        code: err.code,
        severity: err.severity,
        payload: accountData,
      };

      return errRes;
    }
  }

  /**
   * Get Account Details by Account ID
   * @param {string} accountId - account UUID
   * @returns {object} Account Details
   */
  async getAccountDetailsById(accountId) {
    try {
      if (!accountId) throw error;

      const account = await db('accounts')
        .where({ id: `${accountId}` })
        .returning(['id', 'account_type', 'customer_id', 'balance']);

      return { status: 'Success', data: account };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve account details for account ID: ${accountId}`,
        code: err.code,
        severity: err.severity,
      };
      return errRes;
    }
  }

  /**
   *
   * @param {String} accountId - account UUID
   * @returns {Object} account detqils
   */
  async getAccountsByCustomerId(customerId) {
    try {
      if (!customerId) throw error;

      const account = await db('accounts')
        .where({ customer_id: `${customerId}` })
        .returning(['id', 'account_type', 'customer_id', 'balance']);

      if (!Array.isArray(account) || account.length === 0) throw error;

      return { status: 'Success', data: account };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve accounts for customer ID: ${customerId}`,
        code: err.code,
        severity: err.severity,
      };
      return errRes;
    }
  }

  /**
   *
   * @param {String} accountId
   * @returns
   */
  async getAccountBalanceById(accountId) {
    try {
      if (!accountId) throw error;

      const [balance] = await db('accounts')
        .select('balance')
        .where({ id: `${accountId}` });

      return { status: 'Success', data: balance };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve account balance for account ID: ${accountId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} accountId - account UUID
   * @param {Number} amount - deposit amount
   * @returns {Object} account detqils
   */
  async depositByAccountId(accountId, amount) {
    try {
      if (!accountId || !amount) throw error;

      let { status, data } = await this.getAccountBalanceById(accountId);

      if (status === 'Failure') throw error;

      let newBalance = parseFloat(data.balance || 0.0) + parseFloat(amount);
      let accountDetails;

      const [account] = await db('accounts')
        .where({ id: `${accountId}` })
        .update({ balance: newBalance }, [
          'id',
          'account_type',
          'customer_id',
          'balance',
          'created_at',
        ]);

      const transactionDetails = {
        account_id: account?.id,
        customer_id: account?.customer_id,
        amount: account?.balance,
        transaction_type: 'Deposit',
        transaction_date: account?.created_at,
      };

      // Log transaction
      await TransactionDAL.createTransaction(transactionDetails);

      return { status: 'Success', data: account };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not make a deposit for account ID: ${accountId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} accountId - account UUID
   * @param {Float} amount - amount to withdraw
   * @returns
   */
  async withdrawByAccountId(accountId, amount) {
    try {
      if (!accountId || !amount) throw error;

      let { status, data } = await this.getAccountBalanceById(accountId);

      if (status === 'Failure') throw error;

      let newBalance = parseFloat(data.balance || 0.0) - parseFloat(amount);

      if (newBalance < 0.0) {
        // Insufficient Funds - throw an errors
        return { status: 'Failure', message: 'Insufficient funds' };
      }

      const [account] = await db('accounts')
        .where({ id: `${accountId}` })
        .update({ balance: newBalance }, [
          'id',
          'account_type',
          'customer_id',
          'balance',
        ]);

      const transactionDetails = {
        account_id: account?.id,
        customer_id: account?.customer_id,
        amount: account?.balance,
        transaction_type: 'Withdrawal',
        transaction_date: account?.created_at,
      };

      await TransactionDAL.createTransaction(transactionDetails);

      return { status: 'Success', data: account };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not make a deposit for account ID: ${accountId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} fromAccountId - source account UUID
   * @param {Object} transferData - transfer payload
   * @returns
   */
  async transferAmountByAccountId(fromAccountId, transferData) {
    try {
      if (!transferData) throw error;
      const { toAccountId, amount } = transferData;
      let transactionDetails;

      if (!fromAccountId || !toAccountId || !amount || isNaN(amount))
        throw error;

      const { status, data } = await this.getAccountBalanceById(fromAccountId);
      if (status === 'Failure') throw error;

      const withdrawResponse = await this.withdrawByAccountId(
        fromAccountId,
        amount
      );

      if (withdrawResponse.status === 'Failure') {
        // Insufficient Funds
        return withdrawResponse;
      }

      transactionDetails = {
        account_id: withdrawResponse?.id,
        customer_id: withdrawResponse?.customer_id,
        amount: withdrawResponse?.balance,
        transaction_type: 'Transfer',
        transaction_date: withdrawResponse?.created_at,
      };

      await TransactionDAL.createTransaction(transactionDetails);

      const depositResponse = await this.depositByAccountId(
        toAccountId,
        amount
      );

      if (depositResponse.status === 'Failure') {
        return depositResponse;
      }

      transactionDetails = {
        account_id: depositResponse?.id,
        customer_id: depositResponse?.customer_id,
        amount: depositResponse?.balance,
        transaction_type: 'Receive',
        transaction_date: depositResponse?.created_at,
      };

      await TransactionDAL.createTransaction(transactionDetails);

      return {
        status: 'Success',
        data: {
          fromAccount: withdrawResponse.data,
          toAccount: depositResponse.data,
          transferredAmount: amount,
        },
      };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not fulfill transfer`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }

  /**
   *
   * @param {String} accountId - customer UUID
   * @returns {String} result message
   */
  async deleteAccountById(accountId) {
    try {
      if (!accountId) throw error;

      const success = await db('accounts')
        .where({ id: `${accountId}` })
        .del();

      if (success === 1) {
        return {
          status: 'Success',
          message: `Account with ID ${accountId} has been deleted successfully`,
        };
      } else {
        return {
          status: 'Failure',
          message: `Account with ID ${accountId} could not be found`,
        };
      }
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not delete account with ID: ${accountId}`,
        code: err.code,
        severity: err.severity,
      };

      return errRes;
    }
  }
}

module.exports = new AccountDAL();
