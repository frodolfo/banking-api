const AccountService = require('./AccountService');

class AccountController {
  async getAccounts(req, res) {
    // #swagger.description = 'Retrieves a list of accounts'
    try {
      let page = req.query?.page || 0;
      let limit = req.query?.limit || 10;

      const accounts = await AccountService.getAccounts(page, limit);

      if (accounts.status && accounts.status === 'Failure') {
        res.status(404).json(accounts);
        return;
      }

      res.status(200).json(accounts);
    } catch (err) {
      console.error(err);
    }
  }

  async createAccount(req, res, next) {
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Creates a new account for a customer',
        schema: {
            customer_id: '41008f71-aa9c-412c-96c6-04cae893033c',
            account_type: 'Savings',
            balance: 5000.00
        }
    } */
    try {
      if (
        !req.body.customer_id ||
        !req.body.account_type ||
        !req.body.balance
      ) {
        const error = new Error(
          'Missing required parameters in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const account = await AccountService.createAccount(req.body);

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
        return;
      }

      res.status(201).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountDetailsById(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const account = await AccountService.getAccountDetailsById(req.params.id);

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
        return;
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountsByCustomerId(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const account = await AccountService.getAccountsByCustomerId(
        req.params.id
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
        return;
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async getAccountBalanceById(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const balance = await AccountService.getAccountBalanceById(req.params.id);

      if (balance.status && balance.status === 'Failure') {
        res.status(404).json(balance);
        return;
      }

      res.status(200).json(balance);
    } catch (err) {
      console.error(err);
    }
  }

  async depositByAccountId(req, res, next) {
    try {
      if (!req.params.id || !req.body.amount) {
        const error = new Error(
          'Missing required parameters in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const account = await AccountService.depositByAccountId(
        req.params.id,
        req.body
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
        return;
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async withdrawByAccountId(req, res, next) {
    try {
      if (!req.params.id || !req.body.amount) {
        const error = new Error(
          'Missing required parameters in request payload'
        );
        return next(error);
      }

      const account = await AccountService.withdrawByAccountId(
        req.params.id,
        req.body
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
        return;
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async transferAmountByAccountId(req, res, next) {
    try {
      if (!req.params.id || !req.body.toAccountId || !req.body.amount) {
        const error = new Error(
          'Missing required parameters in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const account = await AccountService.transferAmountByAccountId(
        req.params.id,
        req.body
      );

      if (account.status && account.status === 'Failure') {
        res.status(404).json(account);
        return;
      }

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAccountById(req, res, next) {
    try {
      if (!req.params.id) {
        const error = new Error(
          'Missing required parameter in request payload'
        );
        error.code = 422;
        return next(error);
      }

      const id = await AccountService.deleteAccountById(req.params.id);

      if (id.status && id.status === 'Failure') {
        res.status(404).json(id);
        return;
      }

      res.status(200).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new AccountController();
