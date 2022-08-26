const db = require('../../data/db');

class AccountDAL {
  /**
   *
   * @returns Array of accounts objects
   */
  async getAccounts() {
    try {
      const accounts = await db('accounts');

      return accounts;
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
      const [account] = await db('accounts')
        .insert({ ...accountData })
        .returning(['id', 'account_type', 'customer_id']);

      return account;
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
      const [account] = await db('accounts')
        .where({ id: `${accountId}` })
        .returning(['id', 'account_type', 'customer_id', 'balance']);

      return account;
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
    if (!accountId) return;

    const [balance] = await db('accounts')
      .select('balance')
      .where({ id: `${accountId}` });

    return balance;
  }

  /**
   *
   * @param {String} accountId - account UUID
   * @param {Number} amount - deposit amount
   * @returns {Object} account detqils
   */
  async depositByAccountId(accountId, amount) {
    if (!accountId || !amount) return;

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

    return account;
  }

  /**
   *
   * @param {String} accountId - customer UUID
   * @returns {String} result message
   */
  async deleteAccountById(accountId) {
    try {
      const success = await db('accounts')
        .where({ id: `${accountId}` })
        .del();

      return success === 1
        ? {
            result: `Account with ID ${accountId} has been deleted successfully`,
          }
        : { result: `Account with ID ${accountId} could not be found` };
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = new AccountDAL();
