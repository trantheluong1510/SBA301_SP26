package jerry.asm2.controllers;

import jerry.asm2.pojos.SystemAccount;
import jerry.asm2.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/login")
    public SystemAccount login(
            @RequestParam String email,
            @RequestParam String password) {

        SystemAccount acc = accountRepository.findByAccountEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!acc.getAccountPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        if (acc.getEnabled() != null && !acc.getEnabled()) {
            throw new RuntimeException("Account is disabled");
        }
        return acc;
    }
}
