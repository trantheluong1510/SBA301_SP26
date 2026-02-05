package jerry.lab6.services;

import jerry.lab6.entities.User;
import jerry.lab6.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void allUsers_shouldReturnUsersFromRepository() {
        User u1 = new User(); u1.setEmail("a@ex.com");
        User u2 = new User(); u2.setEmail("b@ex.com");

        when(userRepository.findAll()).thenReturn(Arrays.asList(u1, u2));

        List<User> list = userService.allUsers();
        assertThat(list).hasSize(2);
        assertThat(list.get(0).getEmail()).isEqualTo("a@ex.com");
        assertThat(list.get(1).getEmail()).isEqualTo("b@ex.com");
    }
}
