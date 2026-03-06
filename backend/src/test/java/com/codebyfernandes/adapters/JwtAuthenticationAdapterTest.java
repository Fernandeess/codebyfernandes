package com.codebyfernandes.adapters.in.rest;

import com.codebyfernandes.domain.entities.User;
import com.codebyfernandes.domain.repositories.UserRepository;
import com.codebyfernandes.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for JwtAuthenticationAdapter.
 */
@DisplayName("JwtAuthenticationAdapter Tests")
class JwtAuthenticationAdapterTest {

    private JwtTokenProvider tokenProvider;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtAuthenticationAdapter authenticationAdapter;

    @BeforeEach
    void setUp() {
        tokenProvider = mock(JwtTokenProvider.class);
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        authenticationAdapter = new JwtAuthenticationAdapter(tokenProvider, userRepository, passwordEncoder);
    }

    @Test
    @DisplayName("Should generate token for valid credentials")
    void testAuthenticateWithValidCredentials() {
        // Arrange
        String username = "admin";
        String password = "admin123";
        String hashedPassword = "$2a$10$dXJ3SW6G7P50eS3q.v41beJ0hVZX1xBSL8mh/pUGX7zLeB9KWXyGm";
        String expectedToken = "jwt-token-12345";

        User user = User.builder()
                .id(1L)
                .username(username)
                .email("admin@example.com")
                .passwordHash(hashedPassword)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, hashedPassword)).thenReturn(true);
        when(tokenProvider.generateToken(username)).thenReturn(expectedToken);

        // Act
        String token = authenticationAdapter.authenticate(username, password);

        // Assert
        assertNotNull(token);
        assertEquals(expectedToken, token);
        verify(tokenProvider, times(1)).generateToken(username);
    }

    @Test
    @DisplayName("Should throw exception for invalid username")
    void testAuthenticateWithInvalidUsername() {
        // Arrange
        String username = "invaliduser";
        String password = "admin123";

        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                authenticationAdapter.authenticate(username, password)
        );
        verify(tokenProvider, never()).generateToken(anyString());
    }

    @Test
    @DisplayName("Should throw exception for invalid password")
    void testAuthenticateWithInvalidPassword() {
        // Arrange
        String username = "admin";
        String password = "wrongpassword";
        String hashedPassword = "$2a$10$dXJ3SW6G7P50eS3q.v41beJ0hVZX1xBSL8mh/pUGX7zLeB9KWXyGm";

        User user = User.builder()
                .id(1L)
                .username(username)
                .email("admin@example.com")
                .passwordHash(hashedPassword)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, hashedPassword)).thenReturn(false);

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                authenticationAdapter.authenticate(username, password)
        );
        verify(tokenProvider, never()).generateToken(anyString());
    }

    @Test
    @DisplayName("Should throw exception when user account is inactive")
    void testAuthenticateWithInactiveUser() {
        // Arrange
        String username = "admin";
        String password = "admin123";
        String hashedPassword = "$2a$10$dXJ3SW6G7P50eS3q.v41beJ0hVZX1xBSL8mh/pUGX7zLeB9KWXyGm";

        User user = User.builder()
                .id(1L)
                .username(username)
                .email("admin@example.com")
                .passwordHash(hashedPassword)
                .active(false)
                .createdAt(LocalDateTime.now())
                .build();

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                authenticationAdapter.authenticate(username, password)
        );
        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(tokenProvider, never()).generateToken(anyString());
    }

    @Test
    @DisplayName("Should throw exception when token provider fails")
    void testAuthenticateWhenTokenProviderFails() {
        // Arrange
        String username = "admin";
        String password = "admin123";
        String hashedPassword = "$2a$10$dXJ3SW6G7P50eS3q.v41beJ0hVZX1xBSL8mh/pUGX7zLeB9KWXyGm";

        User user = User.builder()
                .id(1L)
                .username(username)
                .email("admin@example.com")
                .passwordHash(hashedPassword)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, hashedPassword)).thenReturn(true);
        when(tokenProvider.generateToken(username))
                .thenThrow(new RuntimeException("Token generation failed"));

        // Act & Assert
        assertThrows(RuntimeException.class, () ->
                authenticationAdapter.authenticate(username, password)
        );
    }
}

