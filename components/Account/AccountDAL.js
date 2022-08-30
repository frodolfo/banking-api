const { TransactionDAL } = require('../Transaction/');
const { error } = require('console');
const db = require('../../data/db');

class AccountDAL {
  /**
   *
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
   *
   * @param {Object} accountData - account payload
   * @returns {Object} account details
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

      const [transaction] = TransactionDAL.createTransaction({
        account_id: account?.id,
        customer_id: account?.customer_id,
        amount: account?.balance,
        transaction_type: 'Activation',
        transaction_date: account?.created_at,
      });

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
   *
   * @param {String} accountId - account UUID
   * @returns
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

      if (account) {
        // accountDetails = JSON.stringify(account);
        accountDetails = account;
      }
      // Log this transaction
      if (accountDetails?.id && accountDetails?.created_at) {
        // TODO: delete this
        console.log('successful deposit');

        let transactionDetails = {
          account_id: accountDetails.id,
          customer_id: accountDetails.customer_id,
          amount: parseFloat(accountDetails.amount),
          transaction_type: 'Deposit',
          transaction_date: accountDetails.created_at,
        };

        await TransactionDAL.createTransaction(transactionDetails);
      }

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

      if (!fromAccountId || !toAccountId || !amount || isNaN(amount))
        throw error;

      const { status, data } = await this.getAccountBalanceById(fromAccountId);
      if (status === 'Failure') throw error;

      const fromCurrentBalance = parseFloat(data.balance);

      const withdrawResponse = await this.withdrawByAccountId(
        fromAccountId,
        amount
      );

      if (withdrawResponse.status === 'Failure') {
        // Insufficient Funds
        return withdrawResponse;
      }

      const depositResponse = await this.depositByAccountId(
        toAccountId,
        amount
      );

      if (depositResponse.status === 'Failure') {
        return depositResponse;
      }

      return {
        status: 'Success',
        data: {
          fromAccount: withdrawResponse,
          toAccount: depositResponse,
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
