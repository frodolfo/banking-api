const AccountService = require('./AccountService');

class AccountController {
  async getAccounts(req, res) {
    try {
      let page = req.query?.page || 0;
      let limit = req.query?.limit || 10;

      const accounts = await AccountService.getAccounts(page, limit);

      if (accounts.status && accounts.status === 'Failure') {
        res.status(404).json(accounts);
      }

      res.status(200).json(accounts);
    } catch (err) {
      console.error(err);
    }
  }

  async createAccount(req, res) {
    try {
      const account = await AccountService.createAccount(req.body);

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
      }

      res.status(201).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountsById(req, res) {
    try {
      const account = await AccountService.getAccountsById(req.params.id);

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountBalanceById(req, res) {
    try {
      const balance = await AccountService.getAccountBalanceById(req.params.id);

      if (balance.status && balance.status === 'Failure') {
        res.status(404).json(balance);
      }

      res.status(200).json(balance);
    } catch (err) {
      console.error(err);
    }
  }

  async depositByAccountId(req, res) {
    try {
      const account = await AccountService.depositByAccountId(
        req.params.id,
        req.body
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async withdrawByAccountId(req, res) {
    try {
      const account = await AccountService.withdrawByAccountId(
        req.params.id,
        req.body
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async transferAmountByAccountId(req, res) {
    try {
      const account = await AccountService.transferAmountByAccountId(
        req.params.id,
        req.body
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAccountById(req, res) {
    try {
      const id = await AccountService.deleteAccountById(req.params.id);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new AccountController();
