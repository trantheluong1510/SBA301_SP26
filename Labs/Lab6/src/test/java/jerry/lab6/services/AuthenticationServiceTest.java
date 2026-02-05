package jerry.lab6.services;

import jerry.lab6.dtos.LoginUserDto;
import jerry.lab6.dtos.RegisterUserDto;
import jerry.lab6.entities.User;
import jerry.lab6.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        // authenticationService instantiated with @InjectMocks
    }

    @Test
    void signup_shouldEncodePasswordAndSaveUser() {
        RegisterUserDto dto = new RegisterUserDto()
                .setEmail("test@example.com")
                .setPassword("rawpass")
                .setFullName("Tester");

        when(passwordEncoder.encode("rawpass")).thenReturn("encoded");

        User saved = new User();
        saved.setId(1);
        saved.setEmail("test@example.com");
        saved.setFullName("Tester");
        saved.setPassword("encoded");
        when(userRepository.save(any(User.class))).thenReturn(saved);

        User result = authenticationService.signup(dto);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository, times(1)).save(captor.capture());
        User toSave = captor.getValue();
        assertThat(toSave.getEmail()).isEqualTo("test@example.com");
        assertThat(toSave.getFullName()).isEqualTo("Tester");
        assertThat(toSave.getPassword()).isEqualTo("encoded");

        assertThat(result.getId()).isEqualTo(1);
    }

    @Test
    void authenticate_shouldAuthenticateAndReturnUser() {
        LoginUserDto dto = new LoginUserDto()
                .setEmail("user@ex.com")
                .setPassword("pw");

        User found = new User();
        found.setEmail("user@ex.com");
        when(userRepository.findByEmail("user@ex.com")).thenReturn(Optional.of(found));

        User result = authenticationService.authenticate(dto);

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        assertThat(result).isSameAs(found);
    }

    @Test
    void authenticate_shouldThrowWhenUserNotFound() {
        LoginUserDto dto = new LoginUserDto()
                .setEmail("missing@ex.com")
                .setPassword("pw");
        when(userRepository.findByEmail("missing@ex.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.authenticate(dto))
                .isInstanceOf(NoSuchElementException.class);
    }
}
