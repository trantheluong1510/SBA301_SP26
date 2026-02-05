package jerry.asm2.services;

import jerry.asm2.pojos.SystemAccount;

import java.util.List;

public interface IAccountService {
    List<SystemAccount> findAll();
    SystemAccount create(SystemAccount account);
    SystemAccount update(Integer id, SystemAccount account);
    void delete(Integer id);
    SystemAccount setEnabled(Integer id, boolean value);
}
