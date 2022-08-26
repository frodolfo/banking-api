const { error } = require('console');
const db = require('../../data/db');

class AccountDAL {
  /**
   *
   * @returns Array of accounts objects
   */
  async getAccounts() {
    try {
      const accounts = await db('accounts');

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
        .returning(['id', 'account_type', 'customer_id']);

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
   * @returns {Object} account detqils
   */
  async getAccountById(accountId) {
    try {
      if (!accountId) throw error;

      const [account] = await db('accounts')
        .where({ id: `${accountId}` })
        .returning(['id', 'account_type', 'customer_id', 'balance']);

      return { status: 'Success', data: account };
    } catch (err) {
      const errRes = {
        status: 'Failure',
        description: `Could not retrieve account with ID: ${accountId}`,
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

      let { balance } = await this.getAccountBalanceById(accountId);
      let newBalance = parseFloat(balance) + parseFloat(amount);

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
