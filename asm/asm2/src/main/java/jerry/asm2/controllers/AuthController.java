package jerry.asm2.controllers;

import jerry.asm2.pojos.SystemAccount;
import jerry.asm2.repositories.AccountRepository;
import jerry.asm2.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody(required = false) LoginRequest body,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String password) {

        String effectiveEmail = body != null && body.email() != null ? body.email() : email;
        String effectivePassword = body != null && body.password() != null ? body.password() : password;

        if (effectiveEmail == null || effectivePassword == null) {
            throw new RuntimeException("Missing email or password");
        }

        SystemAccount acc = accountRepository.findByAccountEmail(effectiveEmail)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!acc.getAccountPassword().equals(effectivePassword)) {
            throw new RuntimeException("Invalid password");
        }
        if (acc.getEnabled() != null && !acc.getEnabled()) {
            throw new RuntimeException("Account is disabled");
        }
        String token = jwtUtil.generateToken(
                acc.getAccountEmail(),
                java.util.Map.of(
                        "id", acc.getAccountID(),
                        "name", acc.getAccountName(),
                        "role", acc.getAccountRole()
                )
        );

        // sanitize password before returning
        acc.setAccountPassword(null);
        return new AuthResponse(token, acc);
    }

    public record AuthResponse(String token, SystemAccount user) {}
    public record LoginRequest(String email, String password) {}

    @PostMapping("/logout")
    public java.util.Map<String, String> logout() {
        // Stateless JWT: client sẽ tự xóa token. Server chỉ trả về 200 OK.
        return java.util.Map.of("message", "Logged out");
    }
}
