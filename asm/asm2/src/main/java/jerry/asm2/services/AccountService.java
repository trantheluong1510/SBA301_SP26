package jerry.asm2.services;

import jerry.asm2.pojos.SystemAccount;
import jerry.asm2.repositories.AccountRepository;
import jerry.asm2.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Override
    public List<SystemAccount> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public SystemAccount create(SystemAccount account) {
        if (accountRepository.existsByAccountEmail(account.getAccountEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (account.getEnabled() == null) {
            account.setEnabled(true);
        }
        return accountRepository.save(account);
    }

    @Override
    public SystemAccount update(Integer id, SystemAccount account) {
        SystemAccount exist = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        exist.setAccountName(account.getAccountName());
        exist.setAccountEmail(account.getAccountEmail());
        exist.setAccountRole(account.getAccountRole());
        // Only update enabled when provided; otherwise keep existing
        if (account.getEnabled() != null) {
            exist.setEnabled(account.getEnabled());
        } else if (exist.getEnabled() == null) {
            exist.setEnabled(true);
        }

        return accountRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (newsArticleRepository.existsByCreatedBy(account)) {
            throw new RuntimeException("Cannot delete account that created news");
        }
        accountRepository.delete(account);
    }

    @Override
    public SystemAccount setEnabled(Integer id, boolean value) {
        SystemAccount acc = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        acc.setEnabled(value);
        return accountRepository.save(acc);
    }
}

