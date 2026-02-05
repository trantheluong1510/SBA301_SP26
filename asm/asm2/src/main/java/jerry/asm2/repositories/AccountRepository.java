package jerry.asm2.repositories;

import jerry.asm2.pojos.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository
        extends JpaRepository<SystemAccount, Integer> {

    Optional<SystemAccount> findByAccountEmail(String email);

    boolean existsByAccountEmail(String email);
}
