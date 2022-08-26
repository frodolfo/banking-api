const AccountDAL = require('./AccountDAL');

class AccountService {
  getAccounts() {
    return AccountDAL.getAccounts();
  }

  createAccount(accountDTO) {
    if (!accountDTO) return;
    return AccountDAL.createAccount(accountDTO);
  }

  getAccountById(accountId) {
    return AccountDAL.getAccountById(accountId);
  }

  getAccountBalanceById(accountId) {
    return AccountDAL.getAccountBalanceById(accountId);
  }

  depositByAccountId(accountId, accountDTO) {
    if (!accountDTO) return;

    return AccountDAL.depositByAccountId(accountId, accountDTO.amount);
  }

  deleteAccountById(accountId) {
    return AccountDAL.deleteAccountById(accountId);
  }
}

module.exports = new AccountService();
