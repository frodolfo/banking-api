const AccountDAL = require('./AccountDAL');

class AccountService {
  getAccounts(page, limit) {
    return AccountDAL.getAccounts(page, limit);
  }

  createAccount(accountDTO) {
    if (!accountDTO) return;
    return AccountDAL.createAccount(accountDTO);
  }

  getAccountsById(accountId) {
    return AccountDAL.getAccountsById(accountId);
  }

  getAccountBalanceById(accountId) {
    return AccountDAL.getAccountBalanceById(accountId);
  }

  depositByAccountId(accountId, accountDTO) {
    if (!accountDTO) return;

    return AccountDAL.depositByAccountId(accountId, accountDTO.amount);
  }

  withdrawByAccountId(accountId, accountDTO) {
    if (!accountDTO) return;

    return AccountDAL.withdrawByAccountId(accountId, accountDTO.amount);
  }

  transferAmountByAccountId(accountId, transferDTO) {
    if (!accountId || !transferDTO) return;

    return AccountDAL.transferAmountByAccountId(accountId, transferDTO);
  }

  deleteAccountById(accountId) {
    if (!accountId) return;

    return AccountDAL.deleteAccountById(accountId);
  }
}

module.exports = new AccountService();
