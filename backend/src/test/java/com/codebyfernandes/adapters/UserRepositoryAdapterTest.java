package com.codebyfernandes.adapters.out.persistence;

import com.codebyfernandes.domain.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for UserRepositoryAdapter.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("UserRepositoryAdapter Tests")
class UserRepositoryAdapterTest {

    @Mock
    private JpaUserRepository jpaUserRepository;

    private UserRepositoryAdapter userRepositoryAdapter;

    @BeforeEach
    void setUp() {
        userRepositoryAdapter = new UserRepositoryAdapter(jpaUserRepository);
    }

    @Test
    @DisplayName("Should save user successfully")
    void testSaveUser() {
        // Arrange
        User user = User.builder()
                .username("testuser")
                .email("test@example.com")
                .passwordHash("$2a$10$hashedPassword")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        UserEntity userEntity = UserEntity.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .passwordHash("$2a$10$hashedPassword")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(jpaUserRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        // Act
        User savedUser = userRepositoryAdapter.save(user);

        // Assert
        assertNotNull(savedUser);
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("test@example.com", savedUser.getEmail());
        verify(jpaUserRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    @DisplayName("Should find user by id")
    void testFindUserById() {
        // Arrange
        UserEntity userEntity = UserEntity.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .passwordHash("$2a$10$hashedPassword")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(jpaUserRepository.findById(1L)).thenReturn(Optional.of(userEntity));

        // Act
        Optional<User> foundUser = userRepositoryAdapter.findById(1L);

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
        verify(jpaUserRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Should find user by username")
    void testFindUserByUsername() {
        // Arrange
        UserEntity userEntity = UserEntity.builder()
                .id(1L)
                .username("admin")
                .email("admin@example.com")
                .passwordHash("$2a$10$hashedPassword")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(jpaUserRepository.findByUsername("admin")).thenReturn(Optional.of(userEntity));

        // Act
        Optional<User> foundUser = userRepositoryAdapter.findByUsername("admin");

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("admin", foundUser.get().getUsername());
        verify(jpaUserRepository, times(1)).findByUsername("admin");
    }

    @Test
    @DisplayName("Should find user by email")
    void testFindUserByEmail() {
        // Arrange
        UserEntity userEntity = UserEntity.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .passwordHash("$2a$10$hashedPassword")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(jpaUserRepository.findByEmail("test@example.com")).thenReturn(Optional.of(userEntity));

        // Act
        Optional<User> foundUser = userRepositoryAdapter.findByEmail("test@example.com");

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("test@example.com", foundUser.get().getEmail());
        verify(jpaUserRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    @DisplayName("Should delete user by id")
    void testDeleteUserById() {
        // Act
        userRepositoryAdapter.deleteById(1L);

        // Assert
        verify(jpaUserRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Should update user successfully")
    void testUpdateUser() {
        // Arrange
        User user = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .passwordHash("$2a$10$newHashedPassword")
                .active(true)
                .updatedAt(LocalDateTime.now())
                .build();

        UserEntity userEntity = UserEntity.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .passwordHash("$2a$10$newHashedPassword")
                .active(true)
                .updatedAt(LocalDateTime.now())
                .build();

        when(jpaUserRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        // Act
        userRepositoryAdapter.update(user);

        // Assert
        verify(jpaUserRepository, times(1)).save(any(UserEntity.class));
    }

    @Test
    @DisplayName("Should return empty Optional when user not found")
    void testFindUserNotFound() {
        // Arrange
        when(jpaUserRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<User> foundUser = userRepositoryAdapter.findById(999L);

        // Assert
        assertTrue(foundUser.isEmpty());
        verify(jpaUserRepository, times(1)).findById(999L);
    }
}
