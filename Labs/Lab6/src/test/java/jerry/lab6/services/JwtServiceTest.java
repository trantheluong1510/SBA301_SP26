package jerry.lab6.services;

import jerry.lab6.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private JwtService jwtService;

    private User user;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        // Create a 32-byte secret and Base64-encode it for HS256
        byte[] raw = new byte[32];
        for (int i = 0; i < raw.length; i++) raw[i] = (byte) (i + 1);
        String secret = Base64.getEncoder().encodeToString(raw);
        ReflectionTestUtils.setField(jwtService, "secretKey", secret);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 3600000L); // 1 hour

        user = new User();
        user.setEmail("user@example.com");
        user.setPassword("pass");
        user.setFullName("User");
    }

    @Test
    void generateAndValidateToken_shouldWork() {
        String token = jwtService.generateToken(user);
        assertThat(token).isNotBlank();

        String username = jwtService.extractUsername(token);
        assertThat(username).isEqualTo("user@example.com");

        boolean valid = jwtService.isTokenValid(token, user);
        assertThat(valid).isTrue();
    }
}
