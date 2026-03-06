package com.codebyfernandes.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User entity representing a system user with credentials.
 * This entity is part of the Domain Layer in Hexagonal Architecture.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String username;
    private String email;
    private String passwordHash; // BCrypt hashed password
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;
}
