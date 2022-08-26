const AccountService = require('./AccountService');

class AccountController {
  async getAccounts(req, res) {
    try {
      const accounts = await AccountService.getAccounts();
      res.status(201).json(accounts);
    } catch (err) {
      console.error(err);
    }
  }

  async createAccount(req, res) {
    try {
      const account = await AccountService.createAccount(req.body);
      res.status(201).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountById(req, res) {
    try {
      const account = await AccountService.getAccountById(req.params.id);
      res.status(201).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountBalanceById(req, res) {
    try {
      const balance = await AccountService.getAccountBalanceById(req.params.id);
      res.status(201).json(balance);
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
      res.status(201).json(account);
    } catch (err) {
      console.error(err);
    }
  }
  //   async getCustomerByName(req, res) {
  //     try {
  //       const id = await AccountService.getCustomerByName(req.params.name);
  //       res.status(201).json(id);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  async deleteAccountById(req, res) {
    try {
      const id = await AccountService.deleteAccountById(req.params.id);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }

  //   async updateCustomerById(req, res) {
  //     try {
  //       const id = await AccountService.updateCustomerById(req.body);
  //       res.status(201).json(id);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
}

module.exports = new AccountController();
