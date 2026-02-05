package jerry.lab6.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import jerry.lab6.dtos.LoginUserDto;
import jerry.lab6.dtos.RegisterUserDto;
import jerry.lab6.entities.User;
import jerry.lab6.responses.LoginResponse;
import jerry.lab6.configurations.JwtAuthenticationFilter;
import jerry.lab6.services.AuthenticationService;
import jerry.lab6.services.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthenticationController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    void signup_shouldReturnSavedUser() throws Exception {
        RegisterUserDto dto = new RegisterUserDto()
                .setEmail("1@gmail.com")
                .setPassword("123")
                .setFullName("Tran The Luong");

        User saved = new User();
        saved.setId(1);
        saved.setEmail("test@example.com");
        saved.setFullName("Tester");
        when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(saved);

        mockMvc.perform(post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.email", is("1@gmail.com")))
                .andExpect(jsonPath("$.fullName", is("Tran The Luong")));
    }

    @Test
    void login_shouldReturnTokenAndExpiry() throws Exception {
        LoginUserDto dto = new LoginUserDto()
                .setEmail("1@gmail.com")
                .setPassword("123");

        User authed = new User();
        authed.setEmail("user@example.com");
        when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(authed);
        when(jwtService.generateToken(authed)).thenReturn("jwt-token");
        when(jwtService.getJwtExpiration()).thenReturn(12345L);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", is("jwt-token")))
                .andExpect(jsonPath("$.expiresIn", is(12345)));
    }
}
